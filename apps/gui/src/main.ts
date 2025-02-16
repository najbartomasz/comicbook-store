import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/infrastructure/ui/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
});
