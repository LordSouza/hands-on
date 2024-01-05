import { Route } from '@angular/router';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectElementComponent } from './project-element/project-element.component';

export const projectPageRoutes: Route[] = [
    {
        path: '',
        component: ProjectPageComponent,
        children: [
            {
                path: '',
                component: ProjectListComponent,
            },
            {
                path: 'create',
                component: ProjectCreateComponent,
            },
            {
                path: ':id',
                component: ProjectElementComponent,
            },
        ],
    },
];
