import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { homePageRoutes } from './lib.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { EntryComponent } from './entry/entry.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homePageRoutes),
    InfiniteScrollModule,
  ],
  declarations: [HomePageComponent, EntryComponent],
})
export class HomePageModule {}
