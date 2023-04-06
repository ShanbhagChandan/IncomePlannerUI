import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly rootUrl = 'http://localhost:7646';
  constructor(private http: HttpClient) { }

  GetWeatherForcast(){
    return this.http.get(this.rootUrl + '/weatherforecast');
  }
}
