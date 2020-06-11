import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

//sweetAlert2
import Swal from 'sweetalert2'

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
      result ? 
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Ha sido creado con exito',
        showConfirmButton: false,
      })
      :
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha habido un error',
        showConfirmButton: false,
      })
    })
  }
}

class Pregunta {
  question: string = "";
  panswer: string[] = ["", "", "", ""];
  answer: string = "";
  value: string = "";
}
