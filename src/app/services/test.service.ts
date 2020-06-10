import { Injectable } from '@angular/core';
//models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  firebase = require("this.firebase");
  constructor() { }

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
    var results = await this.firebase
      .database()
      .ref("Employee/" + uid + "/questionary")
      .once("value");
    results = results.val();
    return results;
  }

  async deleteResults(uid) {
    var results = await this.firebase
      .database()
      .ref("Employee/" + uid + "/questionary");
    results = results.remove();
  }

  async gestTest(uid) {
    // Find all dinosaurs whose height is exactly 25 meters.
    var employee = [];
    var company = await this.firebase.database().ref("Employee/");
    var answer = await company.orderByChild("questionary/date").once("value");
    await answer.forEach((ans) => {
      if (ans.val().questionary) {
        if (ans.val().company == uid) {
          employee.push({
            key: ans.key,
            ...ans.val(),
          });
        }
      }
    });
    return employee;
  }

  async onTest(uid, message) {
    // Find all dinosaurs whose height is exactly 25 meters.
    var company = await this.firebase.database().ref("Employee/");
    return company
      .orderByChild("questionary/date")
      .on("child_changed", message);
  } 
}
