import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TransactionComponent } from './transaction/transaction.component';
import { SystemComponent } from './system.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {path: 'system', component: SystemComponent, canActivate: [AuthGuard], children: [
    {path: 'transaction', component: TransactionComponent},
    {path: 'history', component: HistoryComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
