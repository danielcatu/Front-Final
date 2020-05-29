import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {}

  getCompany() {
    return this.companyList = this.firebase.list('Company');
  }
  
}
