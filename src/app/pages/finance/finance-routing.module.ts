import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { CheckComponent } from './check/check.component';
import { CheckListComponent } from './check-list/check-list.component';

const routes: Routes = [
  {path:'wallets',component:WalletComponent},
  {path:'wallet/:id',component:WalletDetailsComponent},
  {path:'check-add',component:CheckComponent},
  {path:'check',component:CheckListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
