import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { AppComponent } from './app/infrastructure/ui/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
