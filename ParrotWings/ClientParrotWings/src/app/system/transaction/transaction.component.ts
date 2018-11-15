import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Transaction } from 'src/app/shared/models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {
  aSubB: Subscription;
  aSubU: Subscription;
  users: User[] = [];
  user: User;
  currentUserId = "";
  userID : string = "";
  BalancePW: string = "";
  isLoaded = false;
  credit = "CREDIT"; 
  message: Message;

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.userID = localStorage.getItem('userID');
    this.aSubB = this.dataService.getBalance(this.userID)
    .subscribe((BalancePW: string) => {
      this.BalancePW = BalancePW;
    });
    this.aSubU = this.dataService.getUsers(this.userID)
    .subscribe((users: User[]) =>{
      this.users= users; 
      this.isLoaded = true;
    });
  }
  onSubmit(form: NgForm) {
    let {amount} = form.value;
    if (amount <= this.BalancePW)
    {
      if (this.currentUserId != "")
      {
        let now: Date = new Date();
        const transaction = new Transaction(this.userID, this.credit, this.currentUserId, amount, now);
        this.dataService.addTransaction(transaction)
        .subscribe((BalancePW: string) =>{
          this.BalancePW = BalancePW;
          this.message.text = "Транзакция успешно проведена.";
          this.message.type = 'success';
          window.setTimeout(() => this.message.text = '', 5000)
        }); 
      } 
      else 
      {
        this.message.text = "Не выбран получатель транзакции.";
        this.message.type = 'danger';
        window.setTimeout(() => this.message.text = '', 5000);
      }
    }
    else 
    {
      this.message.text = "Недостаточно средств на балансе.";
      this.message.type = 'danger';
      window.setTimeout(() => this.message.text = '', 5000);
    }
  }
  ngOnDestroy() {
    if (this.aSubB) this.aSubB.unsubscribe();
    if (this.aSubU) this.aSubU.unsubscribe();
  }
}


