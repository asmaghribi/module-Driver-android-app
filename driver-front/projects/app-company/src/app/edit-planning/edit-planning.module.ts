import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule} from '@angular/forms';
import { EditPlanningPageRoutingModule } from './edit-planning-routing.module';

import { EditPlanningPage } from './edit-planning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditPlanningPageRoutingModule
  ],
  declarations: [EditPlanningPage]
})
export class EditPlanningPageModule {}
