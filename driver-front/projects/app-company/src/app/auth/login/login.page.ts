
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  'src/app/auth/user';
import { AuthService } from  '../auth.service';
import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private storage: Storage) { 
    
  }

  loginForm: FormGroup;
  isSubmitted  =  false;
  errorMessage = '';
  isLoginFailed = false;
  email: string;
  remember:boolean;
  password: string;
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required])],
        remember :['']
    });
     
  }

get formControls() { return this.loginForm.controls; }

login(form){
  console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
  
  this.authService.login(this.loginForm.value).subscribe((res)=>{
    console.log(this.storage);
    console.log(this.authService.isLoggedIn());
    this.router.navigateByUrl('folder/outbox');},
   err => {
    this.errorMessage = err.error.message;
    console.log(this.errorMessage);
    this.isLoginFailed = true;
  });

}
}
