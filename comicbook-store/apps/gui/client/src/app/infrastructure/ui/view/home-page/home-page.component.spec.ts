import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { render, screen } from '@testing-library/angular';
import { GetBrandingsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    const setup = async (getBrandingsUseCase: GetBrandingsUseCase) => {
        await render(HomePageComponent, {
            providers: [
                { provide: GetBrandingsUseCaseToken, useValue: getBrandingsUseCase }
            ]
        });
    };

    test('displays brandings', async () => {
        // Given
        const brandingFeatureMock = mock<GetBrandingsUseCase>();
        brandingFeatureMock.getBrandings.calledWith().mockReturnValueOnce(of([
            { name: 'MARVEL NOW!' },
            { name: 'DC BLACK LABEL' },
            { name: 'J. P. FANTASTICA' }
        ]));
        await setup(brandingFeatureMock);

        // When, Then
        const brandings = screen.getAllByTestId('branding');
        expect(brandings).toHaveLength(3);
        expect(brandings[0]).toHaveTextContent('MARVEL NOW!');
        expect(brandings[1]).toHaveTextContent('DC BLACK LABEL');
        expect(brandings[2]).toHaveTextContent('J. P. FANTASTICA');
    });
});
