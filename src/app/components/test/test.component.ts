import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private test: TestService) { }

  ngOnInit(): void {
    this.test.getQuestion();
  }

}
