import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, OnDestroy, OnInit, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, Subscription } from 'rxjs';

@Directive({
  selector: '[InputWithComma]',
  providers: [DecimalPipe]
})
export class InputWithCommaDirective  {
  constructor(private _inputEl: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    if (this._inputEl.nativeElement.value === '-') return;
  let commasRemoved = this._inputEl.nativeElement.value.replace(/,/g, ''); 
    let toInt: number;
    let toLocale: string;
    if (commasRemoved.split('.').length > 1) {
      let decimal =isNaN(parseInt(commasRemoved.split('.')[1]))? '':(commasRemoved.split('.')[1]);
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US') + '.' + decimal;
    } else {
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US');
    }
    if (toLocale === 'NaN') {
      this._inputEl.nativeElement.value = '';
    } else {
      this._inputEl.nativeElement.value = toLocale;
    }
  }
}

// export class InputWithCommaDirective implements OnInit, OnDestroy {

//   private subscription: Subscription;

//   constructor(private ngControl: NgControl, private decimal: DecimalPipe) {
//   }

//   ngOnInit() {
//     const control = this.ngControl.control!;
//     this.subscription =  control.valueChanges.pipe(
//       map(value => {
//         const parts = value.toString().split(".");
//         parts[0] = this.decimal.transform(parts[0].replace(/,/g, ''));
//         return parts.join('.');
//       })
//     ).subscribe(v => control.setValue(v, { emitEvent: false }));
//   }

//   ngOnDestroy() {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
// }
