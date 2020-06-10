import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  preguntas: Pregunta[];
  constructor(private test: TestService) { }

  ngOnInit(): void {
    this.getQuest();
  }
  async getQuest(){
    this.preguntas=await this.test.getQuestion() as unknown as Pregunta[];
  }

}
class Pregunta {
  question: string = "";
  panswer: string[] = ["", "", "", ""];
  answer: string = "";
  value: string = "";
}
