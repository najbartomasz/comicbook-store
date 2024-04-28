import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { render, screen } from '@testing-library/angular';
import { GetBrandingsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';

describe('HomePageComponent', () => {
    const setup = async (brandings: ComicBookBranding[]) => {
        const getBrandingsUseCaseMock = mock<GetBrandingsUseCase>();
        getBrandingsUseCaseMock.getBrandings.calledWith().mockReturnValueOnce(of(brandings));
        await render(HomePageComponent, {
            providers: [
                { provide: GetBrandingsUseCaseToken, useValue: getBrandingsUseCaseMock }
            ]
        });
    };

    test('displays brandings', async () => {
        // Given
        await setup([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'DC BLACK LABEL' },
            { id: 3, name: 'J. P. FANTASTICA' }
        ]);

        // When, Then
        const brandings = screen.getAllByTestId('category-list-item');
        expect(brandings).toHaveLength(3);
        expect(brandings[0]).toHaveTextContent('MARVEL NOW!');
        expect(brandings[1]).toHaveTextContent('DC BLACK LABEL');
        expect(brandings[2]).toHaveTextContent('J. P. FANTASTICA');
    });
});
