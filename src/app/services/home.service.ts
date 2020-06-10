import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userData: any; // Save logged in user data
  firebase = require("firebase");
  constructor() { }

  async isEmployee(user: User) {
    var result = false;
    var ref = await this.firebase.database().ref("Employee/").ref.once("value")
      .then((results, err) => {
        Object.entries(results.val()).forEach(element => {
          if (element[0] == user.uid) {
            result = true
          }
        });
      });
    return result;
  }

}
