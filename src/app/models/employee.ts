export class Employee {
  name: string;
  doctype: string;
  dni: string;
  cimage: string;
  cname: string;
  tel: string;
  constructor(
    name: string,
    doctype: string,
    dni: string,
    cimage: string,
    cname: string,
    tel: string
  ) {
    this.name = name;
    this.doctype = doctype;
    this.dni = dni;
    this.cimage = cimage;
    this.cname = cname;
    this.tel = tel;
  }
}
