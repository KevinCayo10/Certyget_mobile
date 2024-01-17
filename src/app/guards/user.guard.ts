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
  // Constructor con inyección de servicio y router
  constructor(private service: ServiceService, private router: Router) {}
  // Método de interfaz CanActivate para verificar si el usuario puede acceder a una ruta
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Obtener la información del usuario desde el almacenamiento local
    let user = JSON.parse(localStorage.getItem('user_info') || '{}');
    // Verificar si el usuario tiene información válida
    if (user.apellido?.trim().length > 0 && user.cedula?.trim().length > 0) {
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
