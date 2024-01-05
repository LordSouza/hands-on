import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Project } from '@models';
import { ProjectsService } from '@services';

@Component({
    selector: 'hands-on-project-element',
    templateUrl: './project-element.component.html',
    styleUrl: './project-element.component.css',
})
export class ProjectElementComponent implements OnInit {
    dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
    project: Project = {} as Project;
    addUser: boolean = false;
    createUser: boolean = false;

    constructor(
        private projectsService: ProjectsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.fetchAllUsers();
    }

    fetchAllUsers() {
        this.projectsService
            .fetchProject(this.route.snapshot.params['id'])
            .subscribe(
                (res) => {
                    this.project = res;
                    this.dataSource.data = res.users!;
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    onAddUpdateUser() {
        this.fetchAllUsers();
        this.dataSource._updateChangeSubscription();
    }

    onback() {
        this.router.navigateByUrl('/projects');
    }

    onAddUser() {
        this.addUser = !this.addUser;
        if (this.addUser == false) {
            this.onAddUpdateUser();
        }
    }

    onCreateUser() {
        this.createUser = !this.createUser;
        if (this.createUser == false) {
            this.onAddUpdateUser();
        }
    }

    onDelete() {
        this.projectsService.deleteProject(this.project.id!).subscribe(
            (res) => {
                console.log(res);
                this.router.navigateByUrl('/projects');
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
