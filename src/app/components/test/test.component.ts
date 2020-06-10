import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  preguntas: Pregunta[];
  answer: Answer;
  constructor(private testService: TestService) {
    this.answer = new Answer();
  }

  ngOnInit(): void {
    this.getQuest();
  }
  async getQuest() {
    this.preguntas = await this.testService.getQuestion() as unknown as Pregunta[];
  }
  onSubmit() {
    this.calcGrades()
  }
  async calcGrades() {
    this.answer.grade = "0";
    this.answer.total = "0";
    await this.preguntas.forEach((pregunta, index) => {
      if (pregunta.answer == this.answer.answers[index]) {
        this.answer.grade = (parseInt(this.answer.grade) + (parseInt(pregunta.value) / 5)) + "";
      }
      this.answer.total = (parseInt(this.answer.total) + (parseInt(pregunta.value) / 5)) + "";
    })
    this.testService.addAnswer(this.answer).then(ans=>{
      window.alert("Enviado Perfecto")
    });
  }

}
class Pregunta {
  question: string = "";
  panswer: string[] = ["", "", "", ""];
  answer: string = "";
  value: string = "";
}
class Answer {
  answers: string[] = ["0", "0", "0", "0", "0"];
  grade: string = "0";
  total: string = "0";
  date: Date;
}
