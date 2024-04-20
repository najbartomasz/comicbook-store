import { HttpClient } from '@api/interfaces/http-client.interface';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { BrandingNetworkService } from './branding-network-service';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';

describe('BrandingNetworkService', () => {
    test('provides list of all comicbook brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get.calledWith('/brandings').mockReturnValueOnce(of([{ name: 'MARVEL NOW!' }, { name: 'MARVEL CLASSIC' }]));
        const brandingNetworkService = new BrandingNetworkService(LoggerMockFixture.loggerFactory, httpClientMock);

        // When
        let receivedComicbookBrandings: ComicBookBranding[] | undefined;
        brandingNetworkService.getBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });

        // Then
        expect(receivedComicbookBrandings).toStrictEqual([
            { name: 'MARVEL NOW!' },
            { name: 'MARVEL CLASSIC' }
        ]);
    });
});
