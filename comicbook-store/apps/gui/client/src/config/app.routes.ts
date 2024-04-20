import { Route } from '@angular/router';
import { HomePageComponent } from '@ui/view/home-page/home-page.component';

export const appRoutes: Route[] = [
    { path: '', component: HomePageComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
