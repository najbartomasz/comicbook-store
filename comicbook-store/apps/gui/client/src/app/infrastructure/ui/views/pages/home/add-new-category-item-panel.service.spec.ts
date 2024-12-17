import { setupService } from '@testing/fixtures';
import { DynamicComponentRef, DynamicSlidingPanelComponentFactoryService } from '@ui/services';
import { AddNewCategoryItemFormComponent } from '@ui/views/components';
import { mock } from 'jest-mock-extended';
import { AddNewCategoryItemPanelService } from './add-new-category-item-panel.service';

describe('AddNewCategoryItemPanelService', () => {
    test('opens the add new category item panel', () => {
        // Given
        const dynamicSlidingPanelComponentFactoryServiceMock = mock<DynamicSlidingPanelComponentFactoryService>();
        dynamicSlidingPanelComponentFactoryServiceMock.create
            .calledWith(AddNewCategoryItemFormComponent)
            .mockReturnValue(new DynamicComponentRef());
        const addNewCategoryItemPanelService = setupService(AddNewCategoryItemPanelService, {
            providers: [
                { provide: DynamicSlidingPanelComponentFactoryService, useValue: dynamicSlidingPanelComponentFactoryServiceMock }
            ]
        });

        // When
        addNewCategoryItemPanelService.open();

        // Then
        expect(dynamicSlidingPanelComponentFactoryServiceMock.create).toHaveBeenCalledTimes(1);
        expect(dynamicSlidingPanelComponentFactoryServiceMock.create).toHaveBeenCalledWith(AddNewCategoryItemFormComponent);
    });
});
