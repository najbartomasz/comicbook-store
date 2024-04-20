import { render, screen } from '@testing-library/angular';
import { HomePageComponent } from './home-page.component';
import { BrandingFeature } from '@features/branding/branding.feature';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
    const setup = async (brandingFeatureMock: BrandingFeature) => {
        await render(HomePageComponent, {
            providers: [
                { provide: BrandingFeature, useValue: brandingFeatureMock }
            ]
        });
    };

    test('displays brandings', async () => {
        // Given
        const brandingFeatureMock = mock<BrandingFeature>();
        brandingFeatureMock.getBrandings.calledWith().mockReturnValueOnce(of([
            { name: 'MARVEL NOW!' },
            { name: 'DC BLACK LABEL' }
        ]));
        await setup(brandingFeatureMock);

        // When, Then
        expect(screen.getAllByTestId('branding')).toHaveLength(2);
    });
});
