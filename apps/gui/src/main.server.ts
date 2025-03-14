import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { AppComponent } from './app/ui/app.component';

const bootstrap = async () => bootstrapApplication(AppComponent, config);

export default bootstrap;
