import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { SesionService } from '../services/sesion.service';

export const messageInterceptor: HttpInterceptorFn = (req, next) => {
  const sesionService = inject(SesionService)
  return next(req).pipe(
    tap(event => {//el tap solo actua si no hay errores
      if(!req.url.includes("/login")){
        if(req.method=="POST"){
          sesionService.response("Los datos se guardaron correctamente.",false);
        }else if(req.method=="PUT"){
          sesionService.response("Los datos se editaron correctamente.",false);
        }
      }
      console.log('Response:', event); // Muestra la respuesta en consola
      //sesionService.response("Exito",false);
    }),
    catchError((error: HttpErrorResponse) => {//actua cuando hay errores
      console.error('Error occurred:', error.error);
      if(error.status==401){
        if(req.url.includes("/login")){
          sesionService.response(<string>error.error,true);
        }else{
          sesionService.logout()
          sesionService.response("Tu sesión expiró, ingresa nuevamente.",true);
        }
      }else if(error.status==0){
        sesionService.response("Error inesperado.",true);
      }else{
        sesionService.response(<string>error.error,true);
      }
      return throwError(() => error); // Propagar un error personalizado
    })
  );
};
