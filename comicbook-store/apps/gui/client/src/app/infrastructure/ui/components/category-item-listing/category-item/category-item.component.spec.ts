import { setup } from '@test/fixtures/setup/setup.component';
import { screen } from '@testing-library/angular';
import { CategoryItemComponent } from './category-item.component';

describe('CategoryItemComponent', () => {
    test('displays category item name', async () => {
        // Given
        await setup(CategoryItemComponent, {
            componentInputs: {
                item: { id: 1, name: 'MARVEL NOW!' }
            }
        });

        // When, Then
        expect(screen.queryByText('MARVEL NOW!')).toBeVisible();
    });
});
