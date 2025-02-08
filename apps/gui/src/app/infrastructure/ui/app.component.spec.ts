import { setupComponent } from '@comicbook-store/testing/angular';
import { screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    it('should render title', async () => {
        await setupComponent(AppComponent)

        expect(screen.getByText('ComicBook Store')).toBeVisible()
    });
});
