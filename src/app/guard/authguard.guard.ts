import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authenticate/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthenticationService){}

  canActivate():boolean {
    if(this.authService.LoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['Login']);
      return false;
    }
    
  }

  
}
