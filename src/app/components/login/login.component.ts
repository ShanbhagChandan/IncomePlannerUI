import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authenticate/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: LoginUser = { UserName: '', Password: '' }

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      textFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required])
    }
    );
  }

  OnSubmit(formDirective: FormGroupDirective) {
    if (this.loginForm.valid) {
      this.user.UserName = this.loginForm.value.textFormControl;
      this.user.Password = this.loginForm.value.passwordFormControl;

      this.authenticationService.LoginUser(this.user)
        .subscribe((data: any) => {
          if (data.token!=null && data.token!=undefined) {
            formDirective.resetForm();
            this.loginForm.reset();
            this.authenticationService.SetToken(data.token);
            this.router.navigate(['Dashboard']);
          }
        });
    }
  }

}
