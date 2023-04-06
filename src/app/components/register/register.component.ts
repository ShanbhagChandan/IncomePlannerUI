import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/register';
import { AuthenticationService } from 'src/app/services/authenticate/authentication.service';
import { ConfirmPasswordValidator } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  panelOpenState = false;
  user:RegisterUser={UserName:'',Email:'',Password:'',ConfirmPassword:''};
  loginForm: FormGroup;
  passwordPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{3,}$";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      textFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPasswordFormControl: new FormControl('', [Validators.required])
    },
    {validator: ConfirmPasswordValidator("passwordFormControl", "confirmPasswordFormControl")}
    );
  }


  OnSubmit(formDirective: FormGroupDirective) {
    if(this.loginForm.valid){
      this.user.UserName = this.loginForm.value.textFormControl;
      this.user.Email = this.loginForm.value.emailFormControl;
      this.user.Password = this.loginForm.value.passwordFormControl;
      this.user.ConfirmPassword = this.loginForm.value.confirmPasswordFormControl;

      this.authenticationService.registerUser(this.user)
      .subscribe((data: any) => {
        if (data.status == "Success") {
          // this.loginForm.reset(this.loginForm.value);
          formDirective.resetForm();
          this.loginForm.reset();
          this.router.navigate(['Login']);
          console.log(data.message)
        }
        else
          console.log(data.message)
      });
    }
  }
}
