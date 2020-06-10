import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService,private _router: Router) {}

  ngOnInit(): void {}

  SignIn(email,password){
    this.authService.SignIn(email, password).then((res)=>{
      this._router.navigate(['/dashboard']);
    });
  }

  /*
async function isEmployee() {
  // Find all dinosaurs whose height is exactly 25 meters.
  var ref = await firebase.database().ref("Employee/");
  var result = false;
  await ref.once("value")
    .then(function (results, err) {
      Object.entries(results.val()).forEach(element => {
          console.log(element)
        if (element[0] == localStorage["uid"]) {
            result = true
          }
      });;
    })
  return result;
}
  
  */
}

