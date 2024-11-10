import { Route } from '@angular/router';
import { HomePageComponent } from '@ui/views/pages';

export const appRoutes: Route[] = [
    { path: '', component: HomePageComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
