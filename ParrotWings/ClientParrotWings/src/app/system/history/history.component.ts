import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  isLoaded = false;
  message: Message;
  transactions: Transaction[] = [];
  userID : string = "";
  BalancePW: string = "";
  searchValue = '';
  searchPlaceholder = 'Тип';
  searchField = 'TypeOperation';
  aSubB: Subscription; 
  aSubT: Subscription;

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.userID = localStorage.getItem('userID');
    this.aSubB = this.dataService.getBalance(this.userID)
    .subscribe((BalancePW: string) => {
      this.BalancePW = BalancePW;
      
    });
    this.aSubT = this.dataService.getTransactions(this.userID)
    .subscribe((transactions: Transaction[]) => {
      this.transactions = transactions; 
      this.isLoaded = true;
    });
  }

  changeCriteria(field: string) {
    const namesMap = {
      TypeOperation: 'Тип',
      UserToId: 'Получил/Отправил',
      SumPw: 'Отправлено',
      ResultPw: 'Остаток',
      TransactionTime: 'Дата/Время'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

  ngOnDestroy() {
    if (this.aSubB) this.aSubB.unsubscribe();
    if (this.aSubT) this.aSubT.unsubscribe();
  }

}

