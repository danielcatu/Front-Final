import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
//models
import { User } from '../models/user';
import { auth } from 'firebase/app';
import Swal from 'sweetalert2'

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  firebase = require("firebase");
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }


  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          //window.alert('Login');
          // this.router.navigate(['dashboard']);
        });
        return (result.user)
        this.SetUserData(result.user);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        // this.SetUserData(result.user);
        return this.SignIn(email, password).then(() => {
          return this.afAuth.auth.onAuthStateChanged((user) => {
            this.SetUserData(user);
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          showConfirmButton: false,
        })
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  getCurrentUser(): User {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    return user;
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Password reset email sent, check your inbox.',
          showConfirmButton: false,
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          showConfirmButton: false,
        })
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          showConfirmButton: false,
        })
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }
  //User manage
  disableEmp(uid) {
    const disableurs = this.firebase.functions().httpsCallable('disableUsr');
    disableurs({ uid: uid }).then(result => {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Usuario Deshabilitado',
        showConfirmButton: false,
      })
    })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          showConfirmButton: false,
        })
      });

  }

  enableEmp(uid) {
    const disableurs = this.firebase.functions().httpsCallable('enableUsr');
    disableurs({ uid: uid }).then(result => {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Usuario habilitado',
        showConfirmButton: false,
      })
    })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          showConfirmButton: false,
        })
      });
  }

  deleteEmpl(uid) {
    this.firebase
      .database()
      .ref("Employee/" + uid).set(null).then(() => {
        const deleteurs = this.firebase.functions().httpsCallable('deleteUsr');
        deleteurs({ uid: uid }).then(result => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Usuario Eliminado',
            showConfirmButton: false,
          })
        })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
              showConfirmButton: false,
            })
          });
      });

  }

  updateEmpl(suid, company) {
    return this.firebase
      .database()
      .ref("Employee/" + suid)
      .update(company)
  }

  createUrs(email, password) {
    const disableurs = this.firebase.functions().httpsCallable('createUsr');
    disableurs({ email: email, password: password }).then(result => {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Usuario habilitado',
        showConfirmButton: false,
      })
    })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          showConfirmButton: false,
        })
      });
  }

}
