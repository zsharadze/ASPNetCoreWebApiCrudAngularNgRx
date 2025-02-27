import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

//am guiditaa gaketebuli
//link: https://dev.to/codecraftjs/step-by-step-guide-for-ngrx-with-angular-16-30jd
//Development New-shi Angular2 foldershi: Step-By-Step Guide for integrating NgRx State Management with Angular 16! - DEV Community.html
