import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly rootUrl = 'http://localhost:7646/Api/';
  constructor(private http: HttpClient) { }

  GetRegimes(){
    return this.http.get(this.rootUrl + 'Common/Regimes');
  }

  GetFinacialYears(){
    return this.http.get(this.rootUrl + 'Common/FinancialYears');
  }

  GetBanks(){
    return this.http.get(this.rootUrl + 'Common/Banks');
  }

  GetAccountTypes(){
    return this.http.get(this.rootUrl + 'Common/AccountTypes');
  }
}
