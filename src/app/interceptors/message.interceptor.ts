import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';

export const messageInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(event => {//el tap solo actua si no hay errores
      console.log('Response:', event); // Muestra la respuesta en consola
    }),
    catchError((error: HttpErrorResponse) => {//actua cuando hay errores
      console.error('Error occurred:', error);
      // Personalizar el error o transformarlo antes de propagarlo
      const customError = {
        status: error.status,
        message: 'Custom error message',
        originalError: error.error,
      };
      return throwError(() => customError); // Propagar un error personalizado
    })
  );
};
