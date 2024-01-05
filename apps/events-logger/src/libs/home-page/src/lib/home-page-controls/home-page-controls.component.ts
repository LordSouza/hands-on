import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Entry, Project, User } from '@models';
import { ProjectsService, UserService } from '@services';

@Component({
    selector: 'hands-on-home-page-controls',
    templateUrl: './home-page-controls.component.html',
    styleUrl: './home-page-controls.component.css',
})
export class HomePageControlsComponent implements OnInit {
    hasFiles: boolean | undefined = undefined;
    projectsNames: Project[] = [];
    usersNames: User[] = [];
    formGroup!: FormGroup;

    @Input() entryArray!: Entry[];
    @Output() filter: EventEmitter<{
        hasFiles: boolean;
        selectedProject: string;
        selectedUser: string;
        description: string;
    }> = new EventEmitter<{
        hasFiles: boolean;
        selectedProject: string;
        selectedUser: string;
        description: string;
    }>();

    constructor(
        private projectServise: ProjectsService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.projectServise.fetchAllProjects().subscribe((projects) => {
            for (const project of projects) {
                if (this.checkProjects(this.projectsNames, project.project)) {
                    this.projectsNames.push(project.project);
                }
            }
        });
        this.userService.fetchAllUsers().subscribe((users) => {
            for (const user of users) {
                if (this.checkUsers(this.usersNames, user)) {
                    this.usersNames.push(user);
                }
            }
        });
        this.formGroup = new FormGroup({
            hasFiles: new FormControl<boolean>(false),
            selectedProject: new FormControl<string>(''),
            selectedUser: new FormControl<string>(''),
            description: new FormControl<string>(''),
        });
    }

    checkProjects(projectArray: Project[], project: Project) {
        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === project.id) {
                return false;
            }
        }
        return true;
    }
    checkUsers(userArray: User[], user: User) {
        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i].id === user.id) {
                return false;
            }
        }
        return true;
    }
    checkValues() {
        this.filter.emit(this.formGroup.value);
    }
}
