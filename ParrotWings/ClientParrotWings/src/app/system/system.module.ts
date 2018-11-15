import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction/transaction.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from '../shared/directives/dropdown.directive';
import { HistoryComponent } from './history/history.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    SystemComponent,
    DropdownDirective,
    TransactionComponent,
    HeaderComponent,
    SidebarComponent,
    HistoryComponent,
    FilterPipe 
  ]
})
export class SystemModule {}






