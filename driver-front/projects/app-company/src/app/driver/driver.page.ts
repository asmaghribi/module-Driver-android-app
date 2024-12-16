import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DriverListPage } from '../driver-list/driver-list.page';
import { Drivers } from '../models/drivers';
import { Button } from 'protractor';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Company } from '../models/company';



@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})

export class DriverPage implements OnInit {
  data: Drivers;
  slideOneForm: any;
  slides: any;
  isSubmitted = false;
  companies:Company[];
  constructor(public apiService: ApiService, public formBuilder: FormBuilder,private http:HttpClient, private router: Router, private alertCtrl: AlertController
    ) { 
      this.data = new Drivers();
      
  }
 
 
  ngOnInit() {
    this.apiService.getCompanies().subscribe(response => {
      console.log(response);
      this.companies = response;})

    this.slideOneForm = this.formBuilder.group({
      Name: ['',[ Validators.required]],
      LastName: ['',[ Validators.required]],
      Email: ['',[ Validators.required]],
      PhoneNumber:['',[ Validators.required]],
      companyId:new FormControl({
        name: new FormControl()
      }),
  });
    }
  
 
  
  save(){
    this.isSubmitted=true;
    if(!this.slideOneForm.valid){
      return false;
    }
    else{
    this.apiService.createItem(this.data).subscribe(async (Response) => { 

     let alert = await this.alertCtrl.create({
    header: "",
    subHeader: "",
    message: "Driver added!",
    buttons: [
      {
        text: "Great",
        handler:() =>{
  
        }
      }
    ]
  });
  
  alert.present();
  
   });

  }
}
}
