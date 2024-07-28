import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'dropdown-users',
  templateUrl: './drop-down-users.component.html',
})
export class DropDownUsersComponent implements OnInit{
ngOnInit(): void {
this.getUserseData()
}
@Input() title:string=''
@Input() control: any;

selectedValue:any
private http=inject(HttpService)
users: IUsers[] = []

getUserseData() {
  this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
    this.users = response;
  })
}
}
