import { Injectable } from '@angular/core';
import { BankAccount } from '../model/bank-account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private getBankAccountsUrl = 'http://localhost:9001/api/account/getBankAccounts';
  private createBankAccountsUrl = 'http://localhost:9001/api/account/createBankAccount';

  constructor(private myHttpClient: HttpClient, private cookieServ: CookieService) { }

  /**
   * This method access the endpoint in the server and requests a
   * list of all bank accounts with the id of the current user.
   * 
   * Note: this method needs to be altered with the JWT protocol.
   * 
   * @returns BankAccount[] - an array of json objects of the BankAccount type.
   */
  async getUserBankAccounts(): Promise<BankAccount[]> {
    try {
      const responsePayload = await fetch(this.getBankAccountsUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.cookieServ.get("Authorization") }
      });
      const ourJSON = await responsePayload.json();
      return ourJSON;
    }catch(stuff){
      console.log("Something went wrong!",stuff);
      return [];
    }
  }

  /**
   * This method access the endpoint in the server and sends a
   * bankAccount object so that it can be saved in the satabase.
   * 
   * @param bankAccount - BankAccount object without all parameters of BankAccount.
   * @returns 
   */
  async setUserBankAccounts(bankAccount: object): Promise<BankAccount[]> {
    try {
      const responsePayload = await fetch(this.createBankAccountsUrl, { method: 'POST',headers:{'Content-Type': 'application/json', 'Authorization': this.cookieServ.get("Authorization") }, body: JSON.stringify(bankAccount)});
      const ourJSON = await responsePayload.json();
      return ourJSON;
    }catch(stuff){
      console.log("Something went wrong!",stuff);
      return [];
    }
  }

  // setUserBankAccounts2(bankAccount: object): object {
  //   const httpPost = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   console.log("inside set user bank account, this is our object:", bankAccount);
  //   return this.myHttpClient.post<BankAccount>(this.setBankAccountsUrl, bankAccount, httpPost);
  // }
}