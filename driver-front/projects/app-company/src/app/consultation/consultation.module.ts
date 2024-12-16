import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationPageRoutingModule } from './consultation-routing.module';

import { ConsultationPage } from './consultation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConsultationPage]
})
export class ConsultationPageModule {}
