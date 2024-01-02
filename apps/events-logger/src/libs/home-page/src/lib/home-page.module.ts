import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { homePageRoutes } from './lib.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { EntryComponent } from './entry/entry.component';
import { CarouselModule } from '@hands-on/carousel';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomePageControlsComponent } from './home-page-controls/home-page-controls.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(homePageRoutes),
        InfiniteScrollModule,
        FieldsetModule,
        AvatarModule,
        ImageModule,
        MatTabsModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        GalleriaModule,
        MatCardModule,
        CarouselModule,
    ],
    declarations: [
        HomePageComponent,
        EntryComponent,
        HomePageControlsComponent,
    ],
})
export class HomePageModule {}
