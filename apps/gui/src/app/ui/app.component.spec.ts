import { setupComponent } from '@comicbook-store/testing/angular';
import { screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    test('should render title', async () => {
        // Given, When
        await setupComponent(AppComponent);

        // Then
        expect(screen.getByText('ComicBook Store')).toBeVisible();
    });
});
