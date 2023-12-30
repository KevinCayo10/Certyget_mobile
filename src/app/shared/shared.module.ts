import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomInputComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [
    CustomInputComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
  ],
})
export class SharedModule {}
