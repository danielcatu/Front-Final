import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { Company } from 'src/app/models/company';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  corporationObj: string;
  constructor(private companyService: CompanyService, private authService: AuthService,public router: Router) { }

  ngOnInit(): void { }
  productList: any[];

  signup(
    name: string,
    doctype: string,
    dni: string,
    cimage: string,
    cname: string,
    tel: string,
    email: string,
    password: string
  ) {
    console.log(email)
    this.authService.SignUp(email, password).then(() => {
      let company = new Company(name, doctype, dni, cimage, cname, tel);

      this.companyService.setCompany(company).then(() => {
        //redirect
      })
    })
    // console.log(await this.companyService.getCompany());
  }
}
