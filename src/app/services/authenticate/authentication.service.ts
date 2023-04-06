import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from 'src/app/models/login';
import { RegisterUser } from 'src/app/models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly rootUrl = 'http://localhost:7646';
  constructor(private http: HttpClient) { }

  registerUser(user : RegisterUser){
    return this.http.post(this.rootUrl + '/Api/User/Register', user);
  }

  LoginUser(user : LoginUser){
    return this.http.post(this.rootUrl + '/Api/User/Login', user);
  }

  SetToken(token:string){
    localStorage.setItem('token',token);
  }

  LoggedIn(){
    return !!localStorage.getItem('token');
  }

  GetToken(){
    return localStorage.getItem('token');
  }

  RemoveToken(){
     localStorage.removeItem('token')
  }
}
