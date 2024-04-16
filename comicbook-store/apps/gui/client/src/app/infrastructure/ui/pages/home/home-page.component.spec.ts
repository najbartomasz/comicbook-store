import { render } from '@testing-library/angular';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    test('should create', async () => {
        const { fixture } = await render(HomePageComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
