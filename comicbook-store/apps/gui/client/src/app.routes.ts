import { Route } from '@angular/router';
import { HomePageComponent } from '@ui/pages/home/home-page.component';

export const appRoutes: Route[] = [
    { path: '', component: HomePageComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
