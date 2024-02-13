import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IPostWriter } from 'src/app/interfaces/IPostWriter';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employees-users',
  templateUrl: './employees-users.component.html',
})
export class EmployeesUsersComponent implements OnInit {

  employees_list: IPostWriter[] = [];
  is_open_employees_list: boolean = false;
  added_employee_array: string[] = []
  @Output() employees_array_output = new EventEmitter<string[]>();
  employe_name: string

  constructor(private http: HttpService) { }
  ngOnInit(): void {
    this.GetEmployeesList()
  }
  GetEmployeesList() {
    this.http.getAll(Domain.GetEmployees).subscribe((response) => {
      this.employees_list = response;
    });
  }
  OpenEmployeesList() {
    this.is_open_employees_list = !this.is_open_employees_list
  }

  AddFromList(id: number, fname: string, lname: string) {
    if (
      id != null &&
      !this.added_employee_array.includes(fname + ' ' + lname)
    ) {
      this.added_employee_array.push(fname + ' ' + lname);
      this.employees_array_output.emit(this.added_employee_array)
    }
  }
  RemoveEmployeeArray(index: number) {
    this.added_employee_array.splice(index, 1);
    this.employees_array_output.emit(this.added_employee_array)
  }
  AddManually() {
    if (this.employe_name.length > 0) {
      this.added_employee_array.push( this.employe_name);
      this.employees_array_output.emit(this.added_employee_array)
      this.employe_name = "";
    }
  }
}
