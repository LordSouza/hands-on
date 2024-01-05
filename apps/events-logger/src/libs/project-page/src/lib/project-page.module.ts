import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { projectPageRoutes } from './lib.routes';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectElementComponent } from './project-element/project-element.component';
import { ProjectAddUserComponent } from './project-add-user/project-add-user.component';
import { ProjectCreateUserComponent } from './project-create-user/project-create-user.component';
import { TableModule } from '@hands-on/table';

import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserListComponent } from './user-list/user-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(projectPageRoutes),
        TableModule,
        MatIconModule,
        MatFormField,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
    ],
    declarations: [
        ProjectPageComponent,
        ProjectListComponent,
        ProjectElementComponent,
        ProjectAddUserComponent,
        ProjectCreateUserComponent,
        UserListComponent,
        ProjectCreateComponent,
    ],
})
export class ProjectPageModule {}
