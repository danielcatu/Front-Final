import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.sass']
})
export class CreateQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    console.log("hola")
    console.log(event.c)
  }

}
