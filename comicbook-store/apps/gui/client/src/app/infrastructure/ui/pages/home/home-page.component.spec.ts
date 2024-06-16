import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { GetBrandingsFeature } from '@feature/brandings/get-brandings.feature.injection-token';
import { GetBrandings } from '@feature/brandings/get-brandings.interface';
import { render, screen, within } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    const setup = async (brandings: ComicBookCategoryItem[]) => {
        const getBrandingsUseCaseMock = mock<GetBrandings>();
        getBrandingsUseCaseMock.getBrandings.calledWith().mockReturnValueOnce(of(brandings));
        await render(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsUseCaseMock }
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
