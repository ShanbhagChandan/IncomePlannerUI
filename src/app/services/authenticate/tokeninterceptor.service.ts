import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private autenticationService:AuthenticationService, private router:Router) { }

  intercept(req:any,next:any){
    let tokenizedreq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.autenticationService.GetToken()}`
      }
    })
    return next.handle(tokenizedreq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          this.autenticationService.RemoveToken();
          this.router.navigate(['Login']);
        }
        return throwError(() => error);
      })
    );
    
  }
}
