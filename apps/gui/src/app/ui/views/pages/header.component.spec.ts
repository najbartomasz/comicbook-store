import { setupComponent } from '@comicbook-store/testing/angular';
import { screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    test('renders "ComicBook Store" title', async () => {
        // Given, When
        await setupComponent(HeaderComponent);

        // Then
        expect(screen.getByText('ComicBook Store')).toBeVisible();
    });
});
