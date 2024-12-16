import { Component, OnInit } from '@angular/core';
import { PlanningTrip } from '../models/PlannigTrip';
import { Type2LabelMapping, TypeEnum } from '../models/TypeTrip.enum';
import { PlanningService } from '../service/planning.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-planning',
  templateUrl: './edit-planning.page.html',
  styleUrls: ['./edit-planning.page.scss'],
})
export class EditPlanningPage implements OnInit {

  tripPlan: PlanningTrip = new PlanningTrip();
  public Type2LabelMapping = Type2LabelMapping;
  public types = Object.values(TypeEnum);
  tripList: PlanningTrip[]; 
  id: number;
  companyId: number;
  planForm: FormGroup;
  isSubmitted = false;
  


  constructor(private servicePlan: PlanningService,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public formBuilder: FormBuilder) {}

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
      reservationNB: ['',[Validators.required]],
      companyId: ['',[Validators.required]],
    }) 
    
    if (this.activatedRoute.snapshot.params["id"]) {
      this.id = this.activatedRoute.snapshot.params["id"];
    }

    //get item details using id
    this.servicePlan.getPlanTrip(this.id, this.companyId).subscribe(response => {
      this.tripPlan = response;
      this.planForm.patchValue({
        departCity : this.tripPlan.departCity,
        departDate: this.tripPlan.departDate,
        departHour: this.tripPlan.departHour,
        arrivalCity: this.tripPlan.arrivalCity,
        arrivalDate: this.tripPlan.arrivalDate,
        arrivalHour: this.tripPlan.arrivalHour,
        type : this.tripPlan.type,
        tripPrice : this.tripPlan.tripPrice,
        reservationNB : this.tripPlan.reservationNB,
        companyId: this.tripPlan.companyId,

      })
    })


  }

  update() {
    this.servicePlan.editPlanTrip(this.id,this.planForm.value).subscribe( response => {
      console.log("palnnification modifiee :", this.planForm.value)
      this.router.navigate(['planning-trip']);  
    })
  }

}
