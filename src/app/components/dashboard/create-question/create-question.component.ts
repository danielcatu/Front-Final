import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.sass']
})
export class CreateQuestionComponent implements OnInit {

  preguntas: Pregunta[];
  constructor(private testService: TestService) {
    this.preguntas = [new Pregunta, new Pregunta, new Pregunta, new Pregunta, new Pregunta];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.testService.addQuestion(this.preguntas).then(result => {
      result ? window.alert('Ha sido creado con exito') : window.alert('Ha habido un error');
    })
  }
}

class Pregunta {
  question: string = "";
  panswer: string[] = ["", "", "", ""];
  answer: string = "";
  value: string = "";
}
