import { Component, OnInit } from '@angular/core';
//services
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/services/auth.service';
//Models
import { User } from '../../../models/user';
import { Company } from '../../../models/company';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.sass']
})
export class ProfileInfoComponent implements OnInit {
  company: Company
  currentUser: User
  constructor(private companyService: CompanyService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.company = await this.companyService.getCompany();
    this.currentUser = await this.authService.getCurrentUser();
  }

}
