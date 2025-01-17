
import { Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from'@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {Validators,ValidatorFn, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  private base_path = 'http://localhost:3000';

  @ViewChild('resetSlider') resetSlider;
  submitAttempt: boolean;
  slideOneForm: any;
  slides: any;
  store: any;
  //code : string ="123";
  empty:boolean ;
  disabled : boolean;
  EmailData={
    Email:''
  };
  passwordData={
    password:''
  };
   id='';
   errorMessage = '';

  constructor(public formBuilder: FormBuilder,private http:HttpClient, private router: Router) {}

 userData: any = {};
  ngOnInit() {
    this.slideOneForm = this.formBuilder.group({
      Email:['',Validators.compose([Validators.required])],
     /* code:['',Validators.compose([
        Validators.required])],*/
      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      confirmPassword:['',[Validators.required,this.equalto('password')]]
    });

  }
  get formControls() { return this.slideOneForm.controls; }

//password

equalto(field_name): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
  let input = control.value;
  let isValid=control.root.value[field_name]==input
  if(!isValid)
  return { 'equalTo': {isValid} }
  else
  return null;
  };
  }
//previous next

next($event? : any){
  const value = $event.target|| $event.srcElement || $event.currentTarget;
  const idAttribute = value.attributes.id;
  if (idAttribute?.nodeValue === "Email") {
   this.verifyEmail();
  }
  else {
    this.resetSlider.slideNext();
  }
}
checkValue(event){
  console.log(event.detail.value);
}
prev(){
  this.resetSlider.slidePrev();
}
 update() {
    this.submitAttempt = true;
  if(!this.slideOneForm.valid){
      this.resetSlider.slideTo(0);
  }
  else {
    console.log(this.slideOneForm.value);
    this.http.put(`${this.base_path}/userCompany/${this.id }`,this.slideOneForm.value).toPromise().then((data:any)=>{

      this.router.navigate(['/login']);

    });
}
 }
//verify Email

verifyEmail()
{
const Email = this.slideOneForm.value.Email;
this.http.get(`${this.base_path}/users/?Email=${Email}`)
.subscribe((data:Array<any>) => {
if (data.length)
{
  console.log(data);
  this.id=data[0].id;

 // this.verifyCode(this.slideOneForm.value.code);
this.resetSlider.slideNext();
} else {
  this.errorMessage = "Email does not exist!";
  console.log(this.errorMessage);
}
});
}
verifEmail() {
if (this.slideOneForm.value.Email.length === 0)
{
return true ;
}
else {
 return false;
}
}
//verify code

 /* verifyCode(value:string) {
  if (this.code === value) {
   this.disabled = false ;
  }
  else {
    this.disabled = true ;
  }
}*/
}
