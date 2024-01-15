import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'certificate',
    loadChildren: () => import('./certificate/certificate.module').then( m => m.CertificatePageModule),
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
