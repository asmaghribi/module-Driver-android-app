import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Drivers } from '../models/drivers';
import { Storage } from  '@ionic/storage';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.page.html',
  styleUrls: ['./consultation.page.scss'],
})
export class ConsultationPage implements OnInit {
 
  Name:string;
  constructor( public router: Router, public activatedRoute: ActivatedRoute, private http:HttpClient, public apiService: ApiService,  private storage: Storage ) {
    
    
   }

  ngOnInit() {
  }
  ionViewWillEnter() {
    console.log(this.storage);
      this.storage.get("Name").then((valeur ) => {
      this.Name = valeur;
    });
  }
}
