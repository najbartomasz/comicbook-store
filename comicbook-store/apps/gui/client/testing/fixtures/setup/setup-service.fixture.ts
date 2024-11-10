import { ProviderToken } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { configureTestingModule } from './configurator/test-bed.configurator';

export const setupService = <ServiceType>(service: ProviderToken<ServiceType>, moduleMetadata?: TestModuleMetadata) => {
    configureTestingModule(TestBed, moduleMetadata);
    return TestBed.inject(service);
};
