import { Injectable, NgZone } from '@angular/core';

import { User } from '../models/user';
import { Company } from '../models/company';
import { AngularFireDatabase, AngularFireList, QueryFn, SnapshotAction } from 'angularfire2/database';
import Swal from 'sweetalert2'


import { environment } from '../../environments/environment';
import { promise } from 'protractor';
import { functions } from 'firebase';
import { registerLocaleData } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList: AngularFireList<any>;
  fire = require("firebase");
  constructor(private firebase: AngularFireDatabase, public ngZone: NgZone) {
    this.companyList = this.firebase.list('Company');
  }

  getCompany = async (): Promise<Company> => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    let result: Company;
    const ref = await this.fire.database().ref("Company/").once("value")
      .then((results, err) => {
        Object.entries(results.val()).forEach(element => {
          if (element[0] == user.uid) {
            result = element[1] as unknown as Company;
          }
        });;
      })
    return result;
  }

  getCompanys = async () => {
    await this.companyList.snapshotChanges().subscribe((item) => {
      item.map((company) => {
        let companys = company.payload.toJSON();
        companys['$key'] = company.key;
        return companys;
      });
    });
  };

  setCompany = (company: Company) => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    // this.refCompany("/" + user.uid);
    return this.companyList.set("/" + user.uid, company)
  }

  getEmployees = () => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    console.log(user.uid)
    return this.firebase.list("Employee/", (ref) => ref.orderByChild("company").equalTo(user.uid));
  }

  getEmployee = (uid) => {
    console.log("entro undefuke", uid)
    console.log(uid)
    return this.firebase.list("Employee/" + uid);
  }

  newEmployee(name: string, image: string, dir: string, email: string, password: string) {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    const employee: Employee = {
      company: user.uid,
      dir: dir,
      image: image,
      name: name
    }
    const disableurs = this.fire.functions().httpsCallable('createUsr');
    return disableurs({ email: email, password: password }).then(userRecord => {
      console.log(userRecord)

      this.fire
      .database()
      .ref("Employee/" + userRecord.uid)
      .set(employee)

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

  // newEmployee(name: string, image: string, dir: string, email: string, password: string) {
  //   let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
  //   const employee: Employee = {
  //     company: user.uid,
  //     dir: dir,
  //     image: image,
  //     name: name
  //   }
  //   let secondaryApp = require("firebase");;
  //   return secondaryApp
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password).then(() => {
  //       // autenticacion con firebase
  //       secondaryApp.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //           let suid = secondaryApp.auth().currentUser.uid;
  //           this.fire
  //             .database()
  //             .ref("Employee/" + suid)
  //             .set(employee)
  //         }
  //       });
  //     })
  // }
}
interface Employee {
  company: string,
  dir: string,
  image: string,
  name: string
}