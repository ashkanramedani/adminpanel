import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IFingerScannerSingle } from 'src/app/interfaces/IFingerScanner';
import { IFingerScannerUpdate } from 'src/app/interfaces/IFingerScannerForm';
import { IFingerScannerReport } from 'src/app/interfaces/IFingerScannerReport';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-finger-print-step',
  templateUrl: './finger-print-step.component.html',
})
export class FingerPrintStepComponent implements OnInit{
  math = Math;
  isLoading:boolean=false
  response_fingerprint_report={} as IFingerScannerReport
  isOpenFingerEdit: boolean = false
  FingerprintForm: FormGroup
  FingerScannerResponse: IFingerScannerSingle
  table_header:string[]=[]
  @Input() id: any
  @Input() year: number
  @Input() month: number

  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.FingerprintForm = this.formBuilder.group({
      Enter: new FormControl('', [Validators.required]),
      Exit: new FormControl('', [Validators.required])
    })
    this.table_header = ["ردیف", " تاریخ ", "ساعت ورود  ", "ساعت خروج", "زمان (دقیقه)", "امکانات"]
    this.GetFingerScannerReport()

  }
  GetFingerScannerReport(){
    this.isLoading=true
    this.http.getAll(`${Domain.GetFingerScannerReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_fingerprint_report = response
      this.isLoading=false
    })
  }
  OpenFingerEdit(id: string) {
    this.http
      .get(Domain.GetFingerScanner, id)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.isOpenFingerEdit = true
          this.FingerScannerResponse = response;
          this.FingerprintForm.controls["Enter"].patchValue(this.FingerScannerResponse.Enter);
          this.FingerprintForm.controls["Exit"].patchValue(this.FingerScannerResponse.Exit);
        },
        error: (error) => {

        }
      })
  }
  CloseFingerEdit() {
    this.isOpenFingerEdit = false
  }
  onSubmitFingerprint() {
    if (this.FingerprintForm.invalid) {
      this.FingerprintForm.markAllAsTouched();
      return;
    }
    if (this.FingerScannerResponse != null) {
      let FingerScannerForm: IFingerScannerUpdate =
      {
        created_fk_by: this.FingerScannerResponse.created_fk_by,
        description: this.FingerScannerResponse.description,
        //Date:this.FingerScannerResponse.Date,
        Enter: this.FingerprintForm.controls.Enter.value,
        Exit: this.FingerprintForm.controls.Exit.value,
        fingerprint_scanner_pk_id: this.FingerScannerResponse.fingerprint_scanner_pk_id
      }
      this.http.put(Domain.PutFingerScanner, FingerScannerForm, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.GetFingerScannerReport()
        this.isOpenFingerEdit = false
      }
      )
    }
    else {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
    }
  }
  RemoveItem(id?: string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${Domain.DeleteFingerScanner}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetFingerScannerReport()
              this.alertServices.success('آیتم با موفقیت حذف شد');
            }
            else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
          });
      },
      () => { }
    );
  }
  get sortData() {
    return this.response_fingerprint_report.Fingerprint_scanner_report.sort((a, b) => {
      return <any>new Date(a.Date) - <any>new Date(b.Date);
    });
  }
}
