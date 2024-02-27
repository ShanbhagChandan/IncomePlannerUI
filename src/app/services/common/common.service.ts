import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly rootUrl = 'http://localhost:7646/Api/';
  constructor(private http: HttpClient) { }

  GetFinacialYears(){
    return this.http.get(this.rootUrl + 'Common/FinancialYears');
  }
}
