import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@hands-on/landing-page').then((m) => m.LandingPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@hands-on/auth').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@hands-on/home-page').then((m) => m.HomePageModule),
  },
];
