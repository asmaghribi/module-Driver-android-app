import { Component, OnInit } from '@angular/core';
import { PlanningTrip } from '../models/PlannigTrip';
import { Type2LabelMapping, TypeEnum } from '../models/TypeTrip.enum';
import { PlanningService } from '../service/planning.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import * as moment from 'moment';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.page.html',
  styleUrls: ['./create-planning.page.scss'],
})
export class CreatePlanningPage implements OnInit {

  //date = moment().format("YYYY-MM-DD");
  myDate: String = new Date().toISOString();
  myDate1: String = new Date().toISOString();
  tripPlan: PlanningTrip = new PlanningTrip();
  public Type2LabelMapping = Type2LabelMapping;
  public types = Object.values(TypeEnum);
  private tutorialHidden: boolean = true;
  tripList: PlanningTrip[]; 
  planForm: FormGroup;
  isSubmitted = false;
  defaultIdx:number;
  companyId= 1;

  constructor(private servicePlan: PlanningService, 
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public formBuilder: FormBuilder) { 

               
              }

  ngOnInit() {
    this.planForm = this.formBuilder.group({
      departCity: ['',[Validators.required]],
      departDate: ['',[Validators.required]],
      departHour: ['',[Validators.required]],
      arrivalCity: ['',[Validators.required]],
      arrivalDate: ['',[Validators.required]],
      arrivalHour: ['',[Validators.required]],
      type: ['',[Validators.required]],
      tripPrice: ['',[Validators.required]],
      //reservationNB: ['',[Validators.required]],
      companyId: [this.companyId,[Validators.required]],

    })
    this.defaultIdx = 0 ;
    this.tripPlan.type = this.types[this.defaultIdx];
    
  }
  logForm(){
    console.log(this.planForm.value);
  }

  addPlanningTrip(){
    this.isSubmitted = true;
    if (!this.planForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.tripPlan.companyId = this.companyId;
      console.log(this.planForm.value)
      this.servicePlan.createPlanTrip(this.planForm.value).subscribe((result) => {
        
        console.log("trip ajoutee : ",this.tripPlan);
        this.router.navigate(['planning-trip']);
      });
    }
   
    
   
  }

}
