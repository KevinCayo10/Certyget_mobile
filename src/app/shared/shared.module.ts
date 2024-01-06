import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidationCerComponent } from './components/validation-cer/validation-cer.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    ValidationCerComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    CustomInputComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    ValidationCerComponent,
  ],
})
export class SharedModule {}
