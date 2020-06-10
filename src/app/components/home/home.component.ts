import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, private _router: Router, private homeService: HomeService) { }

  ngOnInit(): void { }

    async SignIn(email, password) {
    await this.authService.SignIn(email, password).then(async () => {
      await this.homeService.isEmployee().then(employee => {
        console.log(employee)
        if (employee) {
          console.log('nope')
          this._router.navigate(['/test']);
        } else {
          console.log('yeih')
          this._router.navigate(['/dashboard']);
        }
      });
    })
    .catch(error=>{
      console.log(error)
    })
  }
}

