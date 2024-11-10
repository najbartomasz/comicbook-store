import { OutputEmitterRef } from '@angular/core';
import { screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { setupComponent } from '@testing/fixtures';
import { mock } from 'jest-mock-extended';
import { CategoryItemListingComponent } from './category-item-listing.component';

describe('CategoryListingComponent', () => {
    test('displays provided category items with additional `add new` item', async () => {
        // Given
        await setupComponent(CategoryItemListingComponent, {
            inputs: {
                categoryItems: [{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }],
                maxColumns: 2
            }
        });

        // When, Then
        const categoryItems = screen.getAllByTestId('category-item');
        expect(categoryItems).toHaveLength(3);
        expect(categoryItems[0]).toHaveTextContent('MARVEL NOW!');
        expect(categoryItems[1]).toHaveTextContent('MARVEL NOW! 2.0');
        expect(categoryItems[2]).toHaveTextContent('+');
    });

    test('displays only `add new` item when no category items are provided', async () => {
        // Given
        await setupComponent(CategoryItemListingComponent, {
            inputs: {
                categoryItems: [],
                maxColumns: 3
            }
        });

        // When, Then
        const categoryItems = screen.getAllByTestId('category-item');
        expect(categoryItems).toHaveLength(1);
        expect(categoryItems[0]).toHaveTextContent('+');
    });

    test('emits event when `add new` item is selected', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const outputEmitterRefMock = mock<OutputEmitterRef<void>>();
        await setupComponent(CategoryItemListingComponent, {
            inputs: {
                categoryItems: [],
                maxColumns: 3
            },
            on: {
                addNewCategoryItem: () => {
                    outputEmitterRefMock.emit();
                }
            }
        });

        // When
        await user.click(screen.getByText('+'));

        // Then
        expect(outputEmitterRefMock.emit).toHaveBeenCalledTimes(1);
    });
});
