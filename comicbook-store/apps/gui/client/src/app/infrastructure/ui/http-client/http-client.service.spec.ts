import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';
import { HttpResponse } from '@angular/common/http';

describe('HttpClientService', () => {
    const setup = () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        return {
            httpClient: TestBed.inject(HttpClientService),
            httpTestingController: TestBed.inject(HttpTestingController)
        };
    };

    test('provides get response body to subscriber', () => {
        // Given
        const response = new HttpResponse({ status: 200, body: { data: 1 } });
        const { httpClient, httpTestingController } = setup();
        let receivedResponse: HttpResponse<{ data: number }> | undefined;
        httpClient.get<HttpResponse<{ data: number }>>('/path').subscribe((getResponse) => {
            receivedResponse = getResponse;
        });

        // When
        const testRequest = httpTestingController.expectOne('/path');
        testRequest.flush(response);

        // Then
        expect(testRequest.request.method).toBe('GET');
        expect(receivedResponse).toStrictEqual(response);
        httpTestingController.verify();
    });
});
