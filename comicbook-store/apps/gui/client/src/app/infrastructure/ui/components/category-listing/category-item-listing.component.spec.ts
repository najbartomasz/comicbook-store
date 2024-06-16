import { render, screen } from '@testing-library/angular';
import { CategoryItemListingComponent } from './category-item-listing.component';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';

describe('CategoryListingComponent', () => {
    const setup = async (categoryItems: ComicBookCategoryItem[]) => {
        await render(CategoryItemListingComponent, {
            componentInputs: {
                categoryItems
            }
        });
    };

    test('displays provided category items', async () => {
        // Given
        await setup([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL NOW! 2.0' }
        ]);

        // When, Then
        const categoryItems = screen.getAllByTestId('category-item');
        expect(categoryItems).toHaveLength(2);
        expect(categoryItems[0]).toHaveTextContent(/^MARVEL NOW!$/u);
        expect(categoryItems[1]).toHaveTextContent(/^MARVEL NOW! 2.0$/u);
    });
});
