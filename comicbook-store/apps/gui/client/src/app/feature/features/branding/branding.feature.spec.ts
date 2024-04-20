import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { mock } from 'jest-mock-extended';
import { BrandingFeature } from './branding.feature';
import { of } from 'rxjs';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';

describe('BrandingFeature', () => {
    test('provides comicbook brandings', () => {
        // Given
        const comicbookBrandings = [
            { name: 'MARVEL NOW!' },
            { name: 'MARVEL NOW! 2.0' }
        ];
        const brandingRepositoryMock = mock<BrandingRepository>();
        brandingRepositoryMock.getBrandings.calledWith().mockReturnValueOnce(of(comicbookBrandings));
        const brandingFeature = new BrandingFeature(brandingRepositoryMock);

        // When
        let receivedComicbookBrandings: ComicBookBranding[] | undefined;
        brandingFeature.getBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });

        // Then
        expect(receivedComicbookBrandings).toStrictEqual(comicbookBrandings);
    });
});
