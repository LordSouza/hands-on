import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectPageRoutes } from './lib.routes';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectElementComponent } from './project-element/project-element.component';
import { ProjectAddUserComponent } from './project-add-user/project-add-user.component';
import { ProjectCreateUserComponent } from './project-create-user/project-create-user.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(projectPageRoutes)],
    declarations: [
        ProjectPageComponent,
        ProjectListComponent,
        ProjectElementComponent,
        ProjectAddUserComponent,
        ProjectCreateUserComponent,
    ],
})
export class ProjectPageModule {}
