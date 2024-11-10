import { HttpInterceptorFn } from '@angular/common/http';

export const withUrlInterceptor = (): HttpInterceptorFn => (
    (req, next) => (
        next(req.clone({ url: `/api${req.url}` }))
    )
);
