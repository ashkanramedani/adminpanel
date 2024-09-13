import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  {path:'wallets',component:WalletComponent},
  {path:'wallet/:id',component:WalletDetailsComponent},
  {path:'check',component:CheckComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
