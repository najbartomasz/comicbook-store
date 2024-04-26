import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { mock } from 'jest-mock-extended';
import { BrandingFeature } from './branding.feature';
import { of } from 'rxjs';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';

describe('BrandingFeature', () => {
    test('provides comicbook brandings', () => {
        // Given
        const comicbookBrandings: ComicBookBranding[] = [
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL NOW! 2.0' }
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

    test('provides comicbook branding details', () => {
        // Given
        const comicbookBrandingDetails: ComicBookBrandingDetails = { id: 1, name: 'MARVEL NOW!' };
        const brandingRepositoryMock = mock<BrandingRepository>();
        brandingRepositoryMock.getBrandingDetails.calledWith(1).mockReturnValueOnce(of(comicbookBrandingDetails));
        const brandingFeature = new BrandingFeature(brandingRepositoryMock);

        // When
        let receivedComicbookBrandingDetails: ComicBookBrandingDetails | undefined;
        brandingFeature.getBrandingDetails(1).subscribe((brandings) => {
            receivedComicbookBrandingDetails = brandings;
        });

        // Then
        expect(receivedComicbookBrandingDetails).toStrictEqual(comicbookBrandingDetails);
    });
});
