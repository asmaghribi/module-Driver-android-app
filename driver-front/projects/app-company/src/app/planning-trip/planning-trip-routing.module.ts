import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanningTripPage } from './planning-trip.page';

const routes: Routes = [
  {
    path: '',
    component: PlanningTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningTripPageRoutingModule {}
