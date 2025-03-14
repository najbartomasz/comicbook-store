import { setupComponent } from '@comicbook-store/testing/angular';
import { screen, within } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    test('renders header with "ComicBook Store" title', async () => {
        // Given, When
        await setupComponent(AppComponent);

        // Then
        expect(within(screen.getByRole('banner')).getByText('ComicBook Store')).toBeVisible();
    });
});
