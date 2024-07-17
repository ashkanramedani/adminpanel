import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IFingerScannerForm } from 'src/app/interfaces/IFingerScannerForm';
import { IFingerScannerReport } from 'src/app/interfaces/IFingerScannerReport';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-finger-print-step',
  templateUrl: './finger-print-step.component.html',
})
export class FingerPrintStepComponent implements OnInit{
  response_fingerprint_report: IFingerScannerReport[] = []
  isOpenFingerEdit: boolean = false
  FingerprintForm: FormGroup
  FingerScannerResponse: IFingerScannerForm
  table_header:string[]=[]
  @Input() id: any
  @Input() year: number
  @Input() month: number

  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.FingerprintForm = this.formBuilder.group({
      Date: new FormControl('', [Validators.required]),
      Enter: new FormControl('', [Validators.required]),
      Exit: new FormControl('', [Validators.required])
    })
    this.table_header = ["ردیف", " تاریخ ", "ساعت ورود  ", "ساعت خروج", ""]
    this.GetFingerScannerReport()

  }
  GetFingerScannerReport(){
    this.http.getAll(`${Domain.GetFingerScannerReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_fingerprint_report = response.Fingerprint_scanner_report
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
          this.FingerprintForm.controls["Date"].patchValue(moment(this.FingerScannerResponse.Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
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
      let FingerScannerForm: IFingerScannerForm =
      {
        created_fk_by: this.FingerScannerResponse.created_fk_by,
        description: this.FingerScannerResponse.description,
        user_fk_id: this.FingerScannerResponse.user_fk_id,
        Date: moment.from(this.FingerprintForm.controls.Date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
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

}
