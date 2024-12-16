import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { PlanningTripPageRoutingModule } from './planning-trip-routing.module';

import { PlanningTripPage } from './planning-trip.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    PlanningTripPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PlanningTripPage]
})
export class PlanningTripPageModule {}
