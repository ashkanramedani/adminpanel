import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceRoutingModule } from './finance-routing.module';
import { WalletComponent } from './wallet/wallet.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { CheckComponent } from './check/check.component';
import { CheckFinalComponent } from './check/check-final/check-final.component';
import { CheckInfoComponent } from './check/check-info/check-info.component';
import { CheckTermComponent } from './check/check-term/check-term.component';
import { CheckListComponent } from './check-list/check-list.component';


@NgModule({
  declarations: [CheckListComponent,WalletComponent,WalletDetailsComponent,CheckComponent,CheckFinalComponent,CheckInfoComponent,CheckTermComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    NgPersianDatepickerModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class FinanceModule { }
