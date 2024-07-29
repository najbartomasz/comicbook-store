import { setup } from '@test/fixtures/setup/setup.component';
import { screen } from '@testing-library/angular';
import { CategoryItemListingComponent } from './category-item-listing.component';

describe('CategoryListingComponent', () => {
    test('displays provided category items', async () => {
        // Given
        await setup(CategoryItemListingComponent, {
            componentInputs: {
                categoryItems: [{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }],
                maxColumns: 2
            }
        });

        // When, Then
        const categoryItems = screen.getAllByTestId('category-item');
        expect(categoryItems).toHaveLength(2);
        expect(categoryItems[0]).toHaveTextContent('MARVEL NOW!');
        expect(categoryItems[1]).toHaveTextContent('MARVEL NOW! 2.0');
    });
});
