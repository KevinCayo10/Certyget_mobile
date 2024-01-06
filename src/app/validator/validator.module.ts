import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatorPageRoutingModule } from './validator-routing.module';

import { ValidatorPage } from './validator.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [ValidatorPage],
})
export class ValidatorPageModule {}
