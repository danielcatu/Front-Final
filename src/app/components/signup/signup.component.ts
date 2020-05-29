import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  corporationObj: string;
  constructor(private companyService:CompanyService) { }

  ngOnInit(): void {
  }
  productList:any[];

  async signup(palabra:string){
    console.log(palabra);

    // console.log(await this.companyService.getCompany());
    console.log(this.companyService.getCompany().snapshotChanges().forEach(item => {
      this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          console.log(x);
        });
    }));
  }

}
