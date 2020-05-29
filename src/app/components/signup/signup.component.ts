import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  corporationObj: string;
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}
  productList: any[];

  signup(palabra: string) {
    console.log(this.companyService.getCompany().then(solve=>{
      console.log(solve)
    }));

    // console.log(await this.companyService.getCompany());
  }
}
