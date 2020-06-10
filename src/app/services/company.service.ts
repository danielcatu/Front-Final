import { Injectable, NgZone } from '@angular/core';


import { User } from '../models/user';
import { Company } from '../models/company';
import { AngularFireDatabase, AngularFireList, QueryFn, SnapshotAction } from 'angularfire2/database';
import { promise } from 'protractor';
import { functions } from 'firebase';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList: AngularFireList<any>;
  fire = require("firebase");
  constructor(private firebase: AngularFireDatabase, public ngZone: NgZone) {
    this.companyList = this.firebase.list('Company');
  }

  getCompany = async () :Promise<Company> => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    let result: Company;
    const ref = await this.fire.database().ref("Company/").once("value")
      .then((results, err) => {
        Object.entries(results.val()).forEach(element => {
          if (element[0] == user.uid) {
            result = element[1] as unknown as Company;
          }
        });;
      })
    return result;
  }

  getCompanys = async () => {
    await this.companyList.snapshotChanges().subscribe((item) => {
      item.map((company) => {
        let companys = company.payload.toJSON();
        companys['$key'] = company.key;
        return companys;
      });
    });
  };

  setCompany = (company: Company) => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    // this.refCompany("/" + user.uid);
    return this.companyList.set("/" + user.uid, company)
  }

  getEmployees = () => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    console.log(user.uid)
    return this.firebase.list("Employee/", (ref) => ref.orderByChild("company").equalTo(user.uid));
  }

}