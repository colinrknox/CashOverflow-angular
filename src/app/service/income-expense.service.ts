import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BankAccount } from '../model/bank-account'

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(
    private http: HttpClient,
    private cookieServ: CookieService

  ) { }

  /**
   * Added headers to cope with CORS errors
   * @author Cameron, Amir, Chandra
   */
  sendTransactionData(transactionForm) {

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": this.cookieServ.get("token")
    });
    let options = { headers: httpHeaders };

    return this.http.post(`${environment.apiURL}/transaction`, transactionForm, options);

  }

  // getAccounts(): Observable<BankAccount[]> {
  //   let httpHeaders = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //     "Authorization": this.cookieServ.get("token")
  //   });
  //   let options = { headers: httpHeaders };

  //   return this.http.get(`${environment.apiURL}/getAccounts`, options)
  //   .map(res => {
  //     return res.json().results.map(BankAccount => { 
  //       return new BankAccount( 
  //           BankAccount.name,
  //           BankAccount.
  //       );
  //     });
  //   });
  // }
}