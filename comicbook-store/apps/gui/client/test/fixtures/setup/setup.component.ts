import { Type } from '@angular/core';
import { render, RenderComponentOptions } from '@testing-library/angular';

export const setup = async <ComponentType>(component: Type<ComponentType>, options?: RenderComponentOptions<ComponentType>) => {
    const renderResults = await render(component, options);
    renderResults.fixture.autoDetectChanges();
    return renderResults;
};
