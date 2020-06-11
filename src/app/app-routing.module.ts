import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateEmployeeComponent } from './components/dashboard/create-employee/create-employee.component';
import { CreateQuestionComponent } from './components/dashboard/create-question/create-question.component';
import { TestComponent } from './components/test/test.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee/:uid', component: CreateEmployeeComponent },
  { path: 'employee', component: CreateEmployeeComponent },
  { path: 'test', component: TestComponent },
  { path: 'crQuestion', component: CreateQuestionComponent },
  { path: 'result/:uid', component: ResultComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
