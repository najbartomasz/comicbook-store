import { HttpClient } from '@core/models';
import { HttpClient as HttpClientToken } from '@di/api';
import { screen, within } from '@testing-library/angular';
import { setupComponent } from '@testing/fixtures';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    test('displays brandings', async () => {
        // Given, When
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get
            .calledWith('/data-warehouse/brandings')
            .mockReturnValueOnce(scheduled(of([
                { id: 1, name: 'MARVEL NOW!' },
                { id: 2, name: 'DC BLACK LABEL' },
                { id: 3, name: 'J. P. FANTASTICA' }
            ]), asyncScheduler)
        );
        await setupComponent(HomePageComponent, {
            providers: [
                { provide: HttpClientToken, useValue: httpClientMock }
            ]
        });
        await jest.runAllTimersAsync();

        // Then
        const brandings = within(screen.getByTestId('category-item-listing'));
        expect(brandings.queryByText('MARVEL NOW!')).toBeVisible();
        expect(brandings.queryByText('DC BLACK LABEL')).toBeVisible();
        expect(brandings.queryByText('J. P. FANTASTICA')).toBeVisible();
    });
});
