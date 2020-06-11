import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  preguntas: Pregunta[];
  answer: Answer;
  constructor(private testService: TestService, private _router: Router) {
    this.answer = new Answer();
  }

  ngOnInit(): void {
    this.getQuest();
  }
  async getQuest() {
    this.preguntas = ((await this.testService.getQuestion()) as unknown) as Pregunta[];
  }

  onSubmit() {
    this.calcGrades().then(async () => {
      let user: User = (JSON.parse(
        localStorage.getItem('user')
      ) as unknown) as User;
      let uid = user.uid;
      this._router.navigate(['/result/'+uid,  ]);
    });
  }
  async calcGrades() {
    this.answer.grade = '0';
    this.answer.total = '0';
    this.answer.date = new Date().getTime();
    await this.preguntas.forEach((pregunta, index) => {
      if (pregunta.answer == this.answer.answers[index]) {
        this.answer.grade =
          parseInt(this.answer.grade) + parseInt(pregunta.value) / 5 + '';
      }
      this.answer.total =
        parseInt(this.answer.total) + parseInt(pregunta.value) / 5 + '';
    });
    this.testService.addAnswer(this.answer).then((ans) => {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Enviado Perfecto',
        showConfirmButton: false,
      })
    });
  }
}
class Pregunta {
  question: string = '';
  panswer: string[] = ['', '', '', ''];
  answer: string = '';
  value: string = '';
}
class Answer {
  answers: string[] = ['0', '0', '0', '0', '0'];
  grade: string = '0';
  total: string = '0';
  date: number;
}
