import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Trip } from '../models/trip';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements OnInit {
  private base_path = `${environment.API_ENTRYPOINT}`;
 
  tripData:Trip[];
 
 Departure:string;
 Arrival:string;
 Outbound:Date;

  constructor(public apiService: ApiService, public router: Router, public activatedRoute: ActivatedRoute) { 
   
  }

  ngOnInit() {

   this.activatedRoute.queryParams.subscribe(params => {
      console.log(params); 

      this.Departure = params.Departure;
      console.log(this.Departure);
      this.Arrival = params.Arrival;
      console.log(this.Arrival);
      this.Outbound = params.Outbound;
      console.log(this.Outbound); 
      
    }
  
);

      this.apiService.getTrip(this.Departure,this.Arrival, this.Outbound).subscribe(response => {
          console.log(response);
          this.tripData = response;}) 
       
        }
  book(){
    
  }
  }
  

  
   
 

