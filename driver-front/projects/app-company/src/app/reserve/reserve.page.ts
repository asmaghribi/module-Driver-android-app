import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage implements OnInit {

  myDate = new Date().toISOString();

  selectedVal: string ;
  cities:City[];
  currentNumber:number;
  reservForm: FormGroup;

  
  constructor(private http:HttpClient,
     private apiService: ApiService,
      public activeRoute:ActivatedRoute,
      public formBuilder: FormBuilder,
      public router: Router) {
   
   }

  ngOnInit() {
    //let Departure = this.activeRoute.snapshot.paramMap.get('Departure')
   // console.log(Departure);

   this.reservForm = this.formBuilder.group({
    Departure: ['',[ Validators.required]],
    Arrival: ['',[ Validators.required]],
    Return: ['',[ Validators.required]],
    Outbound:['',[ Validators.required]],
    
      });

    this.apiService.getCities().subscribe(response => {
      console.log(response);
      this.cities = response;})
      
           }
  dateChanged(date) {
    console.log(date.detail.value);
    console.log(this.myDate);
           }
  cityChanged(city){
    console.log(city.detail.value);
           }
  Search(){
       this.router.navigate(['/trip-list'], { queryParams: { Departure: this.reservForm.get('Departure').value, 'Arrival': this.reservForm.get('Arrival').value, 'Outbound': this.reservForm.get('Outbound').value } });
           }
   NumChanged(currentNumber){
      console.log(currentNumber.detail.value);
           }
   
 
    
}
