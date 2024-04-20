import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { HttpClient } from '../http-client/http-client.interface';
import { BrandingNetworkService } from './branding-network-service';

describe('BrandingNetworkService', () => {
    test('provides list of all comicbook brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get.calledWith('/brandings').mockReturnValueOnce(of([{ name: 'MARVEL NOW!' }, { name: 'MARVEL CLASSIC' }]));
        const brandingNetworkService = new BrandingNetworkService(httpClientMock);
        let comicbookBrandings: ComicBookBranding[] | undefined;

        // When
        brandingNetworkService.getBrandings().subscribe((brandings) => {
            comicbookBrandings = brandings;
        });

        // Then
        expect(comicbookBrandings).toStrictEqual([
            { name: 'MARVEL NOW!' },
            { name: 'MARVEL CLASSIC' }
        ]);
    });
});
