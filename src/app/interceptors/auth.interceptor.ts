import { HttpInterceptorFn } from '@angular/common/http';
import { SesionService } from '../services/sesion.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sesionService = inject(SesionService)
  if (!req.url.includes('/login')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sesionService.getToken()}`
      }
    })
    console.log(req)
  }
  return next(req);
};
