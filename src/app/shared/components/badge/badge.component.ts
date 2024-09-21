import { Component, inject, Input, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IStatusAll } from 'src/app/interfaces/IStatus';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'n-badge',
  templateUrl: './badge.component.html',
})
export class BadgeComponent implements OnInit {
  ngOnInit(): void {

  }
  isOpenEdit: boolean = false
  statusData: IStatusAll[] = []
  @Input() title: string
  @Input() form_id: string
   new_status_id: string=''
  @Input() db: string
  isLoading:boolean=false
  private readonly http=inject(HttpService)
  private readonly alertServices=inject(AlertifyService)

  getStatusData() {
    this.http.getAll(Domain.GetStatus).subscribe((res) => {
      this.statusData = res
      this.isOpenEdit=true
    })
  }
  setColor(title: string) {
    let color: string = ""
    switch (title) {
      case 'submitted':
        color = "!text-[#3498db]"
        break;
      case 'approved':
        color = "!text-[#2ecc71]"
        break;
      case 'rejected':
        color = "!text-[#e74c3c]"
        break;
      case 'pending':
        color = "!text-[#f39c12]"
        break;
      case 'cancelled':
        color = "!text-[#95a5a6]"
        break;
      case 'Deleted':
        color = "!text-[#34495e]"
        break;
      default:
        color = "!text-[#a3a3a3]"
        break;
    }
    return (color)
  }


  closeEdit(){
    this.isOpenEdit=false
  }
  changeStatus(){
    this.isLoading=true
    this.http.put(`${Domain.PutStatus}/form/${this.db}/status/${this.form_id}/${this.new_status_id}`).subscribe((res)=>{
      console.log(res)
      //this.isOpenEdit=false
      window.location.reload();
      //this.alertServices.success("تغییر وضعیت با موفقیت انجام شد");
    })
    this.isLoading=false
  }
}
