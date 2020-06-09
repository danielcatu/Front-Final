import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {

  constructor(private companyService: CompanyService) { 
    this.employees=[]
  }
  employees: any[];
  ngOnInit(): void {
    this.getEmployess();
  }
  getEmployess() {
    this.companyService.getEmployees().snapshotChanges().subscribe((item) => {
      let aux = item.map((company) => {
        let companys = company.payload.toJSON();
        companys['$key'] = company.key;
        this.employees.push(companys);;
      })
    })
  }
}

