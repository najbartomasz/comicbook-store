import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { withUrlInterceptor } from './url.interceptor';

describe('urlInterceptor', () => {
    test('adds prefix to url', () => {
        // Given
        const req = new HttpRequest('GET', '/path');
        const nextMock: HttpHandlerFn = jest.fn();
        const urlInterceptor = withUrlInterceptor();

        // When
        urlInterceptor(req, nextMock);

        // Then
        expect(nextMock).toHaveBeenCalledWith(req.clone({ url: `/api/path` }));
    });
});
