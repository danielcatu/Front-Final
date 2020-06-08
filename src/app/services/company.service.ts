import { Injectable, NgZone } from '@angular/core';


import { User } from '../models/user';
import { Company } from '../models/company';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase, public ngZone: NgZone) {
    this.companyList = this.firebase.list('Company');
  }
  refCompany = (ref: String) => this.companyList = this.firebase.list('Company' + ref);
  getCompany = async () => {
    await this.companyList.snapshotChanges().subscribe((item) => {
      item.map((company) => {
        let companys = company.payload.toJSON();
        companys['$key'] = company.key;
        return companys;
      });
    });
  };

  setCompany = async (company:Company) => {
    let user: User = JSON.parse(localStorage.getItem('user')) as unknown as User;
    // this.refCompany("/" + user.uid);
    console.log(user.uid)
    await this.companyList.set("/"+user.uid,company)
  }
}