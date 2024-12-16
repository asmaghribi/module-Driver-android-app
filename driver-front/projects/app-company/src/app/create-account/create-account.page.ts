import { Component, OnInit,ViewChild, ViewChildren, QueryList } from '@angular/core';
import {HttpClient} from'@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import {Validators,ValidatorFn, AbstractControl} from '@angular/forms';
import { Router, } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { Company } from '../models/company';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private base_path = `${environment.API_ENTRYPOINT}`;
 
  @ViewChild('signupSlider') signupSlider;
  disabled : boolean;
  EmailData={ Email:''};
  selectedVal: number ;
  companies:Company[];
  UserCompanyProfile: FormGroup;

constructor(public formBuilder: FormBuilder,private http:HttpClient, private router: Router , private apiService: ApiService) {
 }

 ngOnInit() {
  this.apiService.getCompanies().subscribe(response => {
    console.log(response);
    this.companies = response;} )

  this.UserCompanyProfile= new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    Email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    confirmPassword:new FormControl('',[Validators.required,this.equalto('password')]),
    companyId:new FormControl({
      name: new FormControl()
    }),
  });
 }
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
  //create account
  save(){
  this.http.post(this.base_path+"/userCompany",this.UserCompanyProfile.value).toPromise().then((data:any)=>{
    this.router.navigate(['/login']);
  });
  
    }   
//verifyEmail

verifyEmail()
{
  const Email = this.UserCompanyProfile.value.Email;
 this.http.get(`${this.base_path}/userCompany/?Email=${Email}`)
  .subscribe((data:Array<any>) => {
  if (data.length)
  {
    this.router.navigate(['/login']);
 } 
});

}
}

