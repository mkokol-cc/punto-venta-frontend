import { HttpInterceptorFn } from '@angular/common/http';

export const messageInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
