import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
//models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  firebase = require("firebase");
  constructor(private fire: AngularFireDatabase) {
  }

  addQuestion(question) {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;

    return this.firebase
      .database()
      .ref("Company/" + user.uid + "/questions")
      .set(question).then(() => {
        return true;
      }).catch(() => {
        return false;
      });
  }

  async getQuestion() {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;

    var company = await this.firebase
      .database()
      .ref("Employee/" + user.uid)
      .once("value");
    company = company.val()["company"];
    var questions = await this.firebase
      .database()
      .ref("Company/" + company)
      .once("value");
    questions = questions.val()["questions"];
    console.log(questions);
    return questions;
  }

  addAnswer(answer) {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;

    return this.firebase
      .database()
      .ref("Employee/" + user.uid + "/questionary")
      .set(answer)
  }

  async getResults(uid) {
    console.log('yes')
    var results = await this.firebase
      .database()
      .ref("Employee/" + uid + "/questionary")
      .once("value");
    results = results.val();
    console.log(results)
    return results;
  }

  async deleteResults(uid) {
    var results = await this.firebase
      .database()
      .ref("Employee/" + uid + "/questionary");
    results = results.remove();
  }

  async gestTest() {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    var company = await this.firebase.database().ref("Employee/");
    var answer = await company.orderByChild("questionary/date").once("value");
    let employee = [];
    await answer.forEach((ans) => {
      if (ans.val().questionary) {
        if (ans.val().company == user.uid) {
          let date = ans.val().questionary.date;
          employee.push({
            key: ans.key,
            strDate: new Date(date).toLocaleString(),
            ...ans.val(),
          });
        }
      }
    });
    return employee;
  }

  async onTest(funt) {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    // Find all dinosaurs whose height is exactly 25 meters.
    var company = await this.firebase.database().ref("Employee/");
    return company
      .orderByChild("questionary/date")
      .on("value", (results) => funt(results, user.uid));
  }
}
