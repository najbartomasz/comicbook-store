import { HttpInterceptorFn } from '@angular/common/http';

export const withUrlInterceptor = (): HttpInterceptorFn => (
    (req, next) => {
        const url = req.url.startsWith('/') ? req.url : `/${req.url}`;
        return next(req.clone({ url: `/v1${url}` }));
    }
);
