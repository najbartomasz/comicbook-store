import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { GetBrandingDetailsUseCase } from '@feature/interfaces/use-case/get-branding-details.use-case';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { render, screen } from '@testing-library/angular';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { GetBrandingDetailsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { mock } from 'jest-mock-extended';
import { Subject, of } from 'rxjs';
import { ComicbooksPageComponent } from './comicbooks-page.component';

describe('ComicbooksPageComponent', () => {
    const setup = async (id: ComicBookCategoryItem['id'], getBrandingDetailsUseCaseMock: GetBrandingDetailsUseCase) => {
        await render(ComicbooksPageComponent, {
            componentInputs: {
                id
            },
            providers: [
                { provide: LoggerFactoryToken, useValue: LoggerMockFixture.loggerFactory },
                { provide: GetBrandingDetailsUseCaseToken, useValue: getBrandingDetailsUseCaseMock }
            ]
        });
    };

    test('displays list of comicbooks for a given branding', async () => {
        // Given
        const comicbookBrandingDetails: ComicBookCategoryItemDetails = { id: 1, name: 'MARVEL NOW!' };
        const getBrandingDetailsUseCaseMock = mock<GetBrandingDetailsUseCase>();
        getBrandingDetailsUseCaseMock.getBrandingDetails.calledWith(comicbookBrandingDetails.id)
            .mockReturnValueOnce(of(comicbookBrandingDetails));
        await setup(comicbookBrandingDetails.id, getBrandingDetailsUseCaseMock);

        // When, Then
        expect(screen.queryByText('MARVEL NOW!')).toBeInTheDocument();
    });

    test('displays loading indication when comicboobs are not yet available', async () => {
        // Given
        const comicbookBrandingDetails: ComicBookCategoryItemDetails = { id: 1, name: 'MARVEL NOW!' };
        const getBrandingDetailsUseCaseMock = mock<GetBrandingDetailsUseCase>();
        getBrandingDetailsUseCaseMock.getBrandingDetails.calledWith(comicbookBrandingDetails.id)
            .mockReturnValueOnce(new Subject<ComicBookCategoryItemDetails>());
        await setup(comicbookBrandingDetails.id, getBrandingDetailsUseCaseMock);

        // When, Then
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });
});
