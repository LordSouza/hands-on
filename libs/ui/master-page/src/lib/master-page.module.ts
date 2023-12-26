import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { masterPageRoutes } from './lib.routes';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { MasterPageComponent } from './master-page/master-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(masterPageRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ButtonModule,
    SidebarModule,
  ],
  declarations: [
    MasterPageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],

  exports: [MasterPageComponent],
})
export class MasterPageModule {}
