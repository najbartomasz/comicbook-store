import { GetBrandingsFeature } from '@feature/branding/get-brandings.feature.injection-token';
import { GetBrandings } from '@feature/branding/get-brandings.interface';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen, within } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    test('displays brandings', async () => {
        // Given, When
        const getBrandingsFeatureMock = mock<GetBrandings>();
        getBrandingsFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'DC BLACK LABEL' },
            { id: 3, name: 'J. P. FANTASTICA' }
        ]), asyncScheduler));
        await setup(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsFeatureMock }
            ]
        });
        jest.runAllTimers();

        // Then
        const brandings = within(screen.getByTestId('category-item-listing'));
        expect(brandings.queryByText('MARVEL NOW!')).toBeVisible();
        expect(brandings.queryByText('DC BLACK LABEL')).toBeVisible();
        expect(brandings.queryByText('J. P. FANTASTICA')).toBeVisible();
    });

    test('opens `add new category item` form on `add new` button click', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const getBrandingsFeatureMock = mock<GetBrandings>();
        getBrandingsFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        await setup(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsFeatureMock }
            ]
        });
        jest.runAllTimers();

        // When
        await user.click(screen.getByText('+'));

        // Then
        expect(screen.queryByTestId('dynamic-add-new-category-form')).toBeVisible();
    });

    test('hides `add new category item` form on submit', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const getBrandingsFeatureMock = mock<GetBrandings>();
        getBrandingsFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        await setup(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsFeatureMock }
            ]
        });
        jest.runAllTimers();
        await user.click(screen.getByText('+'));

        // When
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        // Then
        expect(screen.queryByTestId('dynamic-add-new-category-form')).not.toBeInTheDocument();
    });

    test('hides `add new category item` form on Enter key press', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const getBrandingsFeatureMock = mock<GetBrandings>();
        getBrandingsFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        await setup(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsFeatureMock }
            ]
        });
        jest.runAllTimers();
        await user.click(screen.getByText('+'));

        // When
        await user.keyboard('{Enter}');

        // Then
        expect(screen.queryByTestId('dynamic-add-new-category-form')).not.toBeInTheDocument();
    });

    test('hides `add new category item` form on Esc key press', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const getBrandingsFeatureMock = mock<GetBrandings>();
        getBrandingsFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        await setup(HomePageComponent, {
            providers: [
                { provide: GetBrandingsFeature, useValue: getBrandingsFeatureMock }
            ]
        });
        jest.runAllTimers();
        await user.click(screen.getByText('+'));

        // When
        await user.keyboard('{Esc}');

        // Then
        expect(screen.queryByTestId('dynamic-add-new-category-form')).not.toBeInTheDocument();
    });
});
