import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccountDetails } from 'src/app/models/bankaccountdetails';
import { ItemPriceData } from 'src/app/models/itempricedata';
import { ItemTableData } from 'src/app/models/itemtabledata';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly rootUrl = 'http://localhost:7646/Api/';
  constructor(private http: HttpClient) { }

  GetWeatherForcast(){
    return this.http.get(this.rootUrl + '/weatherforecast');
  }

  getExpensesDetails(){
    return this.http.get('/assets/data.json');
  }

  getExpensesTableDetails(){
    return this.http.get(this.rootUrl + 'Expense/GetExpenseTable');
  }

  getItemsTableDetails(tableId:number){
    return this.http.get(this.rootUrl + 'Expense/GetItemsTable?tableId='+tableId);
  }

  postExpensesTableDetails(data: ItemTableData){
    return this.http.post(this.rootUrl + 'Expense/PostExpenseTable',data);
  }

  postExpensesItemDetails(tableId: number,data: ItemPriceData){
    return this.http.post(this.rootUrl + 'Expense/PostItemsTable?tableId=' + tableId,data);
  }
  
  deleteExpensesTableDetails(tableId:number){
    return this.http.post(this.rootUrl + 'Expense/DeleteExpenseTable?tableId=' + tableId,'');
  }

  deleteExpensesItemDetails(id:number){
    return this.http.post(this.rootUrl + 'Expense/DeleteItemsTable?id=' + id,'');
  }

  getExpensesCharts(){
    return this.http.get(this.rootUrl + 'ExpenseCharts/GetExpenseCharts');
  }

  getBankAccounts(){
    return this.http.get(this.rootUrl + 'Banking/GetBankAccounts');
  }

  postBankAccounts(data: BankAccountDetails){
    return this.http.post(this.rootUrl + 'Banking/PostBankAccounts',data);
  }

  deleteBankAccounts(id: number){
    return this.http.post(this.rootUrl + 'Banking/DeleteBankAccounts?accountId=' + id,'');
  }
}
