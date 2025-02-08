import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    it('should render title', async () => {
        const { fixture } = await render(AppComponent)
        fixture.autoDetectChanges();

        expect(screen.getByText('ComicBook Store')).toBeVisible()
    });
});
