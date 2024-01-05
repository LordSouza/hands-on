import { Route } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const homePageRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  { path: '', component: HomePageComponent },
];
