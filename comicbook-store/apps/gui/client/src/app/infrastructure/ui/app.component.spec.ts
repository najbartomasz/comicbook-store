import { screen } from '@testing-library/angular';
import { setupComponent } from '@testing/fixtures';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    test('is up and running', async () => {
        // Given
        await setupComponent(AppComponent);

        // When, Then
        expect(screen.queryByRole('main')).toBeVisible();
    });
});
