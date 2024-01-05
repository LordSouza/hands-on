import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { homePageRoutes } from './lib.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { EntryComponent } from './entry/entry.component';
import { CarouselModule } from '@hands-on/carousel';
import { HomePageControlsComponent } from './home-page-controls/home-page-controls.component';
import { CreateEntryComponent } from './create-entry/create-entry.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {
    OverlayContainer,
    FullscreenOverlayContainer,
    OverlayModule,
} from '@angular/cdk/overlay';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(homePageRoutes),
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        FieldsetModule,
        AvatarModule,
        MatTabsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        CarouselModule,
        MatCheckboxModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        OverlayModule,
        FileUploadModule,
    ],
    declarations: [
        HomePageComponent,
        EntryComponent,
        HomePageControlsComponent,
        CreateEntryComponent,
    ],
    providers: [
        { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    ],
})
export class HomePageModule {}
