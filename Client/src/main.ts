import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {register as register_swiper } from 'swiper/element-bundle'
register_swiper();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
