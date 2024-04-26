import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { render, screen } from '@testing-library/angular';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { ComicbooksPageComponent } from './comicbooks-page.component';
import { GetBrandingDetailsUseCase } from '@feature/interfaces/use-case/get-branding-details.use-case';
import { GetBrandingDetailsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { mock } from 'jest-mock-extended';
import { Subject, of } from 'rxjs';

describe('ComicbooksPageComponent', () => {
    const setup = async (id: number, getBrandingDetailsUseCaseMock: GetBrandingDetailsUseCase) => {
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
        const comicbookBrandingDetails: ComicBookBrandingDetails = { id: 1, name: 'MARVEL NOW!' };
        const getBrandingDetailsUseCaseMock = mock<GetBrandingDetailsUseCase>();
        getBrandingDetailsUseCaseMock.getBrandingDetails.calledWith(comicbookBrandingDetails.id)
            .mockReturnValueOnce(of(comicbookBrandingDetails));
        await setup(comicbookBrandingDetails.id, getBrandingDetailsUseCaseMock);

        // When, Then
        expect(screen.queryByText('MARVEL NOW!')).toBeInTheDocument();
    });

    test('displays loading indication when comicboobs are not yet available', async () => {
        // Given
        const comicbookBrandingDetails: ComicBookBrandingDetails = { id: 1, name: 'MARVEL NOW!' };
        const getBrandingDetailsUseCaseMock = mock<GetBrandingDetailsUseCase>();
        getBrandingDetailsUseCaseMock.getBrandingDetails.calledWith(comicbookBrandingDetails.id)
            .mockReturnValueOnce(new Subject<ComicBookBrandingDetails>());
        await setup(comicbookBrandingDetails.id, getBrandingDetailsUseCaseMock);

        // When, Then
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });
});
