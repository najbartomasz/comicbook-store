import { Provider, ProviderToken } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { configureTestingModule } from './configurator/test-bed.configurator';

export const setupService = <ServiceType>(service: ProviderToken<ServiceType>, moduleMetadata?: TestModuleMetadata) => {
    const { providers, ...rest } = moduleMetadata ?? { providers: [] };
    configureTestingModule(TestBed, { providers: [providers && [...providers as Provider[], service]], ...rest });
    return TestBed.inject(service);
};
