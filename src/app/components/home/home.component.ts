import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';
//modules
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, private _router: Router, private homeService: HomeService) { }

  ngOnInit(): void { }

  async SignIn(email, password) {
    await this.authService.SignIn(email, password).then((user) => {
      this.homeService.isEmployee(user as unknown as User).then(employee => {
        if (employee) {
          this._router.navigate(['/test']);
        } else {
          this._router.navigate(['/dashboard']);
        }
      });
    });
  }
}

