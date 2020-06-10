import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {
  employees: any[];

  constructor(private companyService: CompanyService, public authService: AuthService) {
    this.employees = []
  }

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

