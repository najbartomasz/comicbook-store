import { HttpClient, HttpResponse } from '@angular/common/http';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { HttpClientAdapter } from './http-client.adapter';

describe('HttpClientAdapter', () => {
    test('provides get method results', () => {
        // Given
        const angularHttpClientMock = mock<HttpClient>();
        angularHttpClientMock.get.calledWith('https://cbs.com').mockReturnValueOnce(
            scheduled(of(new HttpResponse({ body: {}, status: 200 })), asyncScheduler)
        );
        const httpClientAdapter = new HttpClientAdapter(angularHttpClientMock);

        // When, Then
        expect(httpClientAdapter.get('https://cbs.com/')).toBe(angularHttpClientMock.get('https://cbs.com/'));
    });

    test('provides post method results', () => {
        // Given
        const angularHttpClientMock = mock<HttpClient>();
        angularHttpClientMock.post.calledWith('https://cbs.com', { name: 'MARVEL NOW!' }).mockReturnValueOnce(
            scheduled(of(new HttpResponse({ body: {}, status: 204 })), asyncScheduler)
        );
        const httpClientAdapter = new HttpClientAdapter(angularHttpClientMock);

        // When, Then
        expect(httpClientAdapter.post('https://cbs.com/', { name: 'MARVEL NOW!' }))
            .toBe(angularHttpClientMock.post('https://cbs.com/', { name: 'MARVEL NOW!' }));
    });
});
