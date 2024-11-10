import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { configureTestingModule } from './configurator/test-bed.configurator';

export const setupModule = (moduleMetadata?: TestModuleMetadata) => {
    configureTestingModule(TestBed, moduleMetadata);
};
