import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  alert(title: string, message: string,okCallback: () => any,lableTitle:string){
    alertify.alert(title,message, () => { okCallback(); } ).set('label', lableTitle); ;
  }
  confirm(title: string, message: string, okCallback: () => any, cancelCallback: () => any) {
    alertify.confirm(title, message, () => { okCallback(); }
      , () => { cancelCallback(); })
      .set('labels', { ok: 'بله', cancel: 'خیر' });
  }

  success(message: string) {
    alertify.set('notifier', 'delay', 5);
    alertify.set('notifier', 'position', 'top-center');
    alertify.success(message);
  }

  error(message: string) {
    alertify.set('notifier', 'delay', 5);
    alertify.set('notifier', 'position', 'top-center');
    alertify.error(message);
  }
  warning(message: string) {
    alertify.set('notifier', 'delay', 5);
    alertify.set('notifier', 'position', 'top-center');
    alertify.warning(message);
  }
  message(message: string) {
    alertify.set('notifier', 'delay', 5);
    alertify.set('notifier', 'position', 'top-center');
    alertify.message(message);
  }
}
