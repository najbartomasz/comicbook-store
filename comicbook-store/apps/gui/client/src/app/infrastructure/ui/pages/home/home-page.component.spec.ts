import { TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    const setup = async () => {
        await TestBed.configureTestingModule({
            imports: [HomePageComponent]
        }).compileComponents();
        const fixture = TestBed.createComponent(HomePageComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        return component;
    };

    test('should create', async () => {
        const component = await setup();
        expect(component).toBeTruthy();
    });
});
