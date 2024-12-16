import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule} from '@angular/forms';
import { CreatePlanningPageRoutingModule } from './create-planning-routing.module';

import { CreatePlanningPage } from './create-planning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatePlanningPageRoutingModule
  ],
  declarations: [CreatePlanningPage]
})
export class CreatePlanningPageModule {}
