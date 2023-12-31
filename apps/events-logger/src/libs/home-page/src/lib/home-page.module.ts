import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { homePageRoutes } from './lib.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { EntryComponent } from './entry/entry.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { GalleriaModule } from 'primeng/galleria';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(homePageRoutes),
        InfiniteScrollModule,
        FieldsetModule,
        AvatarModule,
        GalleriaModule,
        MatTabsModule,
    ],
    declarations: [HomePageComponent, EntryComponent],
})
export class HomePageModule {}
