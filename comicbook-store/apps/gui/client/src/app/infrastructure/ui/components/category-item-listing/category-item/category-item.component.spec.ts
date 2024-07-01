import { CategoryItem } from '@core/models/category-item.model';
import { render, screen } from '@testing-library/angular';
import { CategoryItemComponent } from './category-item.component';

describe('CategoryItemComponent', () => {
    const setup = async (item: CategoryItem) => {
        const { fixture } = await render(CategoryItemComponent, {
            componentInputs: {
                item
            }
        });
        fixture.autoDetectChanges();
    };

    test('displays category item name', async () => {
        // Given, When
        const item: CategoryItem = {
            id: 1,
            name: 'MARVEL NOW!'
        };
        await setup(item);

        // Then
        expect(screen.queryByText('MARVEL NOW!')).toBeVisible();
    });
});
