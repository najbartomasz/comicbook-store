import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => (
    next(req.clone({ url: `/api${req.url}` }))
);
