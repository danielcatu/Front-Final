import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass'],
})
export class CreateEmployeeComponent implements OnInit {
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void { }

  createEmpl(name: string, image: string, dir: string, email: string, password: string) {
    this.companyService.newEmployee(name, image, dir, email, password).then(()=>{
      window.alert("creado con exito")
    });
  }
}
