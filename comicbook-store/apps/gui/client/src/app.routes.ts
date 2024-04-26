import { Route } from '@angular/router';
import { ComicbooksPageComponent } from '@ui/view/pages/comicbooks/comicbooks-page.component';
import { HomePageComponent } from '@ui/view/pages/home/home-page.component';

export const appRoutes: Route[] = [
    { path: '', component: HomePageComponent },
    { path: 'comicbooks/:id', component: ComicbooksPageComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
