import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutForm:FormGroup;

  constructor( public formBuilder: FormBuilder, public router: Router, public activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ['',[ Validators.required]],
      lastname: ['',[ Validators.required]],
      email: ['',[ Validators.required]],
      phone:['',[ Validators.required]],
      
        });
  }
  Payment(){
    this.router.navigate(['paymentmethod']);
  }
}
