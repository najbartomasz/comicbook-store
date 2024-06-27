import { GetBrandingsFeature } from '@feature/brandings/get-brandings.feature.injection-token';
import { GetBrandings } from '@feature/brandings/get-brandings.interface';
import { render, screen, within } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    const setup = async (getBrandingsFeature: GetBrandings) => {
        const { fixture } = await render(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsFeature }
            ]
        });
        fixture.autoDetectChanges();
    };

    test('displays brandings', async () => {
        // Given, When
        const getBrandingsFeature = mock<GetBrandings>();
        getBrandingsFeature.getBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'DC BLACK LABEL' },
            { id: 3, name: 'J. P. FANTASTICA' }
        ]), asyncScheduler));
        await setup(getBrandingsFeature);
        jest.runAllTimers();

        // Then
        const brandings = within(screen.getByTestId('category-item-listing'));
        expect(brandings.queryByText('MARVEL NOW!')).toBeVisible();
        expect(brandings.queryByText('DC BLACK LABEL')).toBeVisible();
        expect(brandings.queryByText('J. P. FANTASTICA')).toBeVisible();
    });
});
