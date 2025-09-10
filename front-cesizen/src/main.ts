import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appRouting } from './app/app.routes';
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: "https://c9e4a50db16ae985f2b9063a5e6d9fc0@o4509994799857664.ingest.de.sentry.io/4509994811719760",
  sendDefaultPii: true
});

bootstrapApplication(AppComponent, {
  providers: [
    appRouting,
    importProvidersFrom(HttpClientModule)
  ]
});
