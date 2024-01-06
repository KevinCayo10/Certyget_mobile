import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatorPage } from './validator.page';

const routes: Routes = [
  {
    path: '',
    component: ValidatorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidatorPageRoutingModule {}
