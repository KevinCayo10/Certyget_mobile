import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../home/services/service.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private service: ServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = JSON.parse(localStorage.getItem('user_info') || '{}');

    if (
      user.apellido?.trim().length > 0 &&
      user.cedula?.trim().length > 0
    ) {
      console.log('El usuario existe', user);
      return true;
    } else {
      console.log('El usuario no existe');
      localStorage.removeItem('user_info');
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
