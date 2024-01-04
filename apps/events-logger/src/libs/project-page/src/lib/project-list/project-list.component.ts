import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectRespose } from '@models';
import { ProjectsService } from '@services';

@Component({
    selector: 'hands-on-project-list',
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
    type: ProjectRespose = {} as ProjectRespose;
    dataSource: MatTableDataSource<ProjectRespose> =
        new MatTableDataSource<ProjectRespose>();

    columns = [
        {
            columnDef: 'name',
            header: 'Name',
            cell: (element: ProjectRespose) => `${element.project.name}`,
        },
        {
            columnDef: 'createdDate',
            header: 'Created Date',
            cell: (element: ProjectRespose) =>
                `${new Date(
                    Date.parse(element.project.createdDate!)
                ).toLocaleString('en-US')}`,
        },
        {
            columnDef: 'actions',
            header: 'Actions',
            cell: (element: ProjectRespose) => `${element.project.id}`,
        },
    ];

    constructor(
        private projectService: ProjectsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.projectService.fetchAllProjects().subscribe((projects) => {
            this.dataSource.data = projects;
        });
    }

    onCreateProject() {
        this.router.navigate(['/projects/create'], {});
    }
}
