import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Injectable()
export class DataService {

  private getUsersUrl = '/api/values/getUsers';
  private getBalanceUrl = '/api/values/getBalance';
  private addTransactionUrl = '/api/values/addTransaction';
  private getTransactionsUrl = '/api/values/getTransactions';
  
  constructor(private http: HttpClient) {
    
  }

  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(this.addTransactionUrl, transaction).pipe(
      map(response => {
        var BalancePw = response;
          return BalancePw;      
  }));
  }
  getBalance(userID: string) : Observable<any> {
    return this.http.get(this.getBalanceUrl.concat(`/${userID}`)).pipe(
        map(response => {
          var BalancePw = response;
          return BalancePw;    
    }));
  }
  getUsers(userID: string) : Observable<any> {
    return this.http.get(this.getUsersUrl.concat(`/${userID}`)).pipe(
        map(response => {
          let users: Array<User> = new Array;
          users = <User[]> response;  
          return users;    
    }));
  }

  getTransactions(userID: string) : Observable<any> {
    return this.http.get(this.getTransactionsUrl.concat(`/${userID}`)).pipe(
        map(response => {
          // console.log(response);
          let transactions: Array<Transaction> = new Array;
          transactions = <Transaction[]> response;  
          return transactions;    
    }));
  }
}
