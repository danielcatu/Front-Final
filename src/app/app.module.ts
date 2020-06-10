import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AuthService } from "./services/auth.service";
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/dashboard/employees/employees.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { CreateEmployeeComponent } from './components/dashboard/create-employee/create-employee.component';
import { MessageComponent } from './components/dashboard/others/message/message.component';
import { TestComponent } from './components/test/test.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, SignupComponent, DashboardComponent, EmployeesComponent, ProfileInfoComponent, CreateEmployeeComponent, MessageComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
