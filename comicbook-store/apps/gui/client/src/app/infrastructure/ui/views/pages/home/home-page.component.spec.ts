import { FeatureFactory as FactoryFactoryToken } from '@di/feature';
import { BrandingProviderFeature, BrandingProviderFeatureId, FeatureFactory } from '@feature';
import { screen, within } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { setupComponent } from '@testing/fixtures';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    test('displays brandings', async () => {
        // Given, When
        const brandingProviderFeatureMock = mock<BrandingProviderFeature>();
        brandingProviderFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'DC BLACK LABEL' },
            { id: 3, name: 'J. P. FANTASTICA' }
        ]), asyncScheduler));
        const featureFactoryMock = mock<FeatureFactory>();
        featureFactoryMock.create.calledWith(BrandingProviderFeatureId).mockReturnValueOnce(brandingProviderFeatureMock)
        await setupComponent(HomePageComponent, {
            providers: [
                { provide: FactoryFactoryToken, useValue: featureFactoryMock }
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
        const brandingProviderFeatureMock = mock<BrandingProviderFeature>();
        brandingProviderFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        const featureFactoryMock = mock<FeatureFactory>();
        featureFactoryMock.create.calledWith(BrandingProviderFeatureId).mockReturnValueOnce(brandingProviderFeatureMock)
        await setupComponent(HomePageComponent, {
            providers: [
                { provide: FactoryFactoryToken, useValue: featureFactoryMock }
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
        const brandingProviderFeatureMock = mock<BrandingProviderFeature>();
        brandingProviderFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        const featureFactoryMock = mock<FeatureFactory>();
        featureFactoryMock.create.calledWith(BrandingProviderFeatureId).mockReturnValueOnce(brandingProviderFeatureMock)
        await setupComponent(HomePageComponent, {
            providers: [
                { provide: FactoryFactoryToken, useValue: featureFactoryMock }
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
        const brandingProviderFeatureMock = mock<BrandingProviderFeature>();
        brandingProviderFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        const featureFactoryMock = mock<FeatureFactory>();
        featureFactoryMock.create.calledWith(BrandingProviderFeatureId).mockReturnValueOnce(brandingProviderFeatureMock)
        await setupComponent(HomePageComponent, {
            providers: [
                { provide: FactoryFactoryToken, useValue: featureFactoryMock }
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
        const brandingProviderFeatureMock = mock<BrandingProviderFeature>();
        brandingProviderFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }
        ]), asyncScheduler));
        const featureFactoryMock = mock<FeatureFactory>();
        featureFactoryMock.create.calledWith(BrandingProviderFeatureId).mockReturnValueOnce(brandingProviderFeatureMock)
        await setupComponent(HomePageComponent, {
            providers: [
                { provide: FactoryFactoryToken, useValue: featureFactoryMock }
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
