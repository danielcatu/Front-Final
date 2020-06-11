import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {
  employees: any[];
  close: boolean=true;
  constructor(private _testService: TestService) { }

  ngOnInit(): void {
    this.message();
  }

  async message() {
    this._testService.onTest(this.getTest);
  }
  getTest = (answer, uid) => {
    this.employees = [];
    answer.forEach((ans) => {
      if (ans.val().questionary) {
        if (ans.val().company == uid) {
          let date = ans.val().questionary.date;
          this.employees.push({
            key: ans.key,
            strDate: new Date(date).toLocaleString(),
            ...ans.val(),
          });
        }
      }
      this.close=false;
    });
  }
  changeClose() {
    console.log("hola")
    this.close =!this.close;
  }
}
