import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { BrandingFeature } from './branding.feature';

describe('BrandingFeature', () => {
    test('provides comicbook brandings', () => {
        // Given
        const comicbookBrandings: ComicBookCategoryItem[] = [
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL NOW! 2.0' }
        ];
        const brandingRepositoryMock = mock<BrandingRepository>();
        brandingRepositoryMock.getBrandings.calledWith().mockReturnValueOnce(of(comicbookBrandings));
        const brandingFeature = new BrandingFeature(brandingRepositoryMock);

        // When
        let receivedComicbookBrandings: ComicBookCategoryItem[] | undefined;
        brandingFeature.getBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });

        // Then
        expect(receivedComicbookBrandings).toStrictEqual(comicbookBrandings);
    });

    test('provides comicbook branding details', () => {
        // Given
        const comicbookBrandingDetails: ComicBookCategoryItemDetails = { id: 1, name: 'MARVEL NOW!' };
        const brandingRepositoryMock = mock<BrandingRepository>();
        brandingRepositoryMock.getBrandingDetails.calledWith(1).mockReturnValueOnce(of(comicbookBrandingDetails));
        const brandingFeature = new BrandingFeature(brandingRepositoryMock);

        // When
        let receivedComicbookBrandingDetails: ComicBookCategoryItemDetails | undefined;
        brandingFeature.getBrandingDetails(1).subscribe((brandings) => {
            receivedComicbookBrandingDetails = brandings;
        });

        // Then
        expect(receivedComicbookBrandingDetails).toStrictEqual(comicbookBrandingDetails);
    });
});
