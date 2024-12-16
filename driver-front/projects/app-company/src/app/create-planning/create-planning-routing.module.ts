import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePlanningPage } from './create-planning.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePlanningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePlanningPageRoutingModule {}
