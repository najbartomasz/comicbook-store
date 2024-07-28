import { CategoryItem } from '@core/models/category-item.model';
import { render, screen } from '@testing-library/angular';
import { CategoryItemListingComponent } from './category-item-listing.component';

describe('CategoryListingComponent', () => {
    const setup = async ({ categoryItems, maxColumns }: { categoryItems: CategoryItem[]; maxColumns: number }) => {
        const { fixture } = await render(CategoryItemListingComponent, {
            componentInputs: {
                categoryItems,
                maxColumns
            }
        });
        fixture.autoDetectChanges();
    };

    test('displays provided category items with additional `add new` item', async () => {
        // Given
        await setup({
            categoryItems: [{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }],
            maxColumns: 2
        });

        // When, Then
        const categoryItems = screen.getAllByTestId('category-item');
        expect(categoryItems).toHaveLength(2);
        expect(categoryItems[0]).toHaveTextContent('MARVEL NOW!');
        expect(categoryItems[1]).toHaveTextContent('MARVEL NOW! 2.0');
    });
});
