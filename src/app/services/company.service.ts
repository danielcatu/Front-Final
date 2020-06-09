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
  constructor(private firebase: AngularFireDatabase, public ngZone: NgZone) {
    this.companyList = this.firebase.list('Company');
  }
  refCompany = (ref: String, fun: QueryFn) => this.companyList = this.firebase.list(ref + "", fun);
  getCompany = async () => {
    await this.companyList.snapshotChanges().subscribe((item) => {
      item.map((company) => {
        let companys = company.payload.toJSON();
        companys['$key'] = company.key;
        return companys;
      });
    });
  };

  setCompany = async (company: Company) => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    // this.refCompany("/" + user.uid);
    console.log(user.uid)
    await this.companyList.set("/" + user.uid, company)
  }

  getEmployees = () => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    console.log(user.uid)
    return  this.firebase.list("Employee/", (ref) => ref.orderByChild("company").equalTo(user.uid));
}


}