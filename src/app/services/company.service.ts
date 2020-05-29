import { Injectable, NgZone } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase, public ngZone: NgZone) {
    this.companyList = this.firebase.list('Company');
  }

  getCompany() {
    var companyList: any[];
    this.companyList = this.firebase.list('Company');
    return new Promise<any>((resolve, reject) => {
        this.companyList.snapshotChanges().subscribe((item) => {
          companyList = [];
          const orderPromises = item.map((element) => {
            let x = element.payload.toJSON();
            x['$key'] = element.key;
            companyList.push(x);
          });
          Promise.all(orderPromises).then(() => {
            resolve(companyList);
          });
        });
      });
  }
}
