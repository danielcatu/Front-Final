import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//services
import { CompanyService } from '../../../services/company.service';
import { AuthService } from 'src/app/services/auth.service';

//sweetAlert2
import Swal from 'sweetalert2'


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass'],
})
export class CreateEmployeeComponent implements OnInit {
  uid: string;
  Empl: Employee;

  constructor(private companyService: CompanyService, private _route: ActivatedRoute, private _authService: AuthService) {
    this.Empl= new Employee();
   }

  ngOnInit(): void {
    this.uid = this._route.snapshot.paramMap.get("uid")
    this.uid?this.getEmpl():null;
  }

  createEmpl(email: string, password: string) {
    // console.log(this.companyService.createUrs(email, password))
    this.companyService.newEmployee(this.Empl.name, this.Empl.image, this.Empl.dir, email, password).then(() => {
      //sweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text:'creado con exito',
        showConfirmButton: false,
      });
  })
}

  getEmpl() {
    this.companyService.getEmployee(this.uid).snapshotChanges().subscribe((item) => {
      let aux = item.map((company, index) => {
        let companys = company.payload.toJSON();
        this.Empl[company.key] = companys as unknown as string;
        console.log( this.Empl[company.key])
      })
    })
  }
  updateEmpl() {
    this._authService.updateEmpl(this.uid, this.Empl).then(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        showConfirmButton: false,
      });
    })
  }

  params(email: string, password: string) {
    !this.uid ? this.createEmpl(email, password) : this.updateEmpl()
  }

}
class Employee {
  dir: string = "";
  image: string = "";
  name: string = "";
}