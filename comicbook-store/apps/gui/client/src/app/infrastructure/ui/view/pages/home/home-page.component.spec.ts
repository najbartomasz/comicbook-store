import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { render, screen, within } from '@testing-library/angular';
import { GetBrandingsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    const setup = async (brandings: ComicBookCategoryItem[]) => {
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
        const brandings = within(screen.getByTestId('category-item-listing'));
        expect(brandings.queryByText('MARVEL NOW!')).toBeVisible();
        expect(brandings.queryByText('DC BLACK LABEL')).toBeVisible();
        expect(brandings.queryByText('J. P. FANTASTICA')).toBeVisible();
    });
});
