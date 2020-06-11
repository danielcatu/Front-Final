import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { getTestBed } from '@angular/core/testing';
import { HomeService } from 'src/app/services/home.service';
import { User } from '../../models/user';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.sass'],
})
export class ResultComponent implements OnInit {
    private uid: String;
    isEmployee: boolean;
    message: string;
    private results: [];

    constructor(
        private testService: TestService,
        private _activeRoute: ActivatedRoute,
        private _route: ActivatedRoute,
        private homeService: HomeService
    ) {
        this.message = 'Loading...';
        this.uid = this._route.snapshot.paramMap.get('uid');
        this.isEmpl();
    }

    ngOnInit(): void {
        this.getTest();
    }

    async getTest() {
        let answer = await this.testService.getResults(this.uid);

        if (answer) {
            let total = (parseFloat(answer.grade) / parseInt(answer.total)) * 100;
            this.message = answer.grade + '/' + answer.total;
        } else {
            this.message = "No ha hecho la prueba"
        }
    }
    isEmpl() {
        let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
        this.homeService.isEmployee((user as unknown) as User).then((employee) => {
            console.log("is Employee",employee);
            if (employee) {
                this.isEmployee = true;
            } else {
                this.isEmployee = false;
            }
        });
    }

    deteleTest() {
        this.testService.deleteResults(this.uid).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Test Eliminado con éxito',
            });
        });
    }
}
