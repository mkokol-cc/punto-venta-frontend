import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';
import { inject } from '@angular/core';


const routeToNavigate = '/login'
export const authAdminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const sesionService = inject(SesionService)
  try {
    const role = await sesionService.validateRole(); // Espera el valor del servicio
    if (role === 'ADMINISTRADOR') {
      return true;
    } else {
      router.navigateByUrl(routeToNavigate)
      return false;
    }
  } catch (error) {
    router.navigateByUrl(routeToNavigate)
    return false;
  }
};
export const authUserGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const sesionService = inject(SesionService)
  try {
    const role = await sesionService.validateRole(); // Espera el valor del servicio
    if (role === 'VENDEDOR' || role === 'ADMINISTRADOR') {
      return true;
    } else {
      router.navigateByUrl(routeToNavigate)
      return false;
    }
  } catch (error) {
    router.navigateByUrl(routeToNavigate)
    return false; // Bloquear acceso en caso de error
  }
};
