import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { HttpClientAdapter } from './http-client.adapter';

describe('HttpClientAdapter', () => {
    const setup = (angularHttpClient: HttpClient) => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: angularHttpClient }
            ]
        });
        return {
            httpClientAdapter: new HttpClientAdapter(TestBed.inject(HttpClient))
        };
    };

    test('provides get method results', () => {
        // Given
        const angularHttpClientMock = mock<HttpClient>();
        angularHttpClientMock.get.calledWith('https://cbs.com').mockReturnValueOnce(
            scheduled(of(new HttpResponse({ body: {}, status: 200 })), asyncScheduler)
        );
        const { httpClientAdapter } = setup(angularHttpClientMock);

        // When, Then
        expect(httpClientAdapter.get('https://cbs.com/')).toBe(angularHttpClientMock.get('https://cbs.com/'));
    });
});
