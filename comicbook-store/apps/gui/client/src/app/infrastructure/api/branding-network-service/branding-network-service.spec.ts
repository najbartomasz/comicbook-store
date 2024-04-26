import { HttpClient } from '@api/interfaces/http-client.interface';
import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { BrandingNetworkService } from './branding-network-service';

describe('BrandingNetworkService', () => {
    test('provides list of all comicbook brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get.calledWith('/brandings').mockReturnValueOnce(of([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL CLASSIC' }
        ]));
        const brandingNetworkService = new BrandingNetworkService(httpClientMock);

        // When
        let receivedComicbookBrandings: ComicBookBranding[] | undefined;
        brandingNetworkService.getBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });

        // Then
        expect(receivedComicbookBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL CLASSIC' }
        ]);
    });

    test('provide comicbook branding details', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get.calledWith('/brandings/2').mockReturnValueOnce(of([{ id: 2, name: 'MARVEL CLASSIC' }]));
        const brandingNetworkService = new BrandingNetworkService(httpClientMock);

        // When
        let receivedComicbookBrandingDetails: ComicBookBrandingDetails | undefined;
        brandingNetworkService.getBrandingDetails(2).subscribe((brandingDetails) => {
            receivedComicbookBrandingDetails = brandingDetails;
        });

        // Then
        expect(receivedComicbookBrandingDetails).toStrictEqual([
            { id: 2, name: 'MARVEL CLASSIC' }
        ]);
    });
});
