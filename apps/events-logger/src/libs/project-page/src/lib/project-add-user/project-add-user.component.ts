import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@models';
import { ProjectsUserService, UserService } from '@services';

@Component({
    selector: 'hands-on-project-add-user',
    templateUrl: './project-add-user.component.html',
    styleUrl: './project-add-user.component.css',
})
export class ProjectAddUserComponent implements OnInit {
    @Input() dataProject: User[] = [];
    // make a observable to update the paret component
    @Output() dataParent = new EventEmitter<User>();

    type: User = {} as User;
    dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
    roles = ['manager', 'worker'];
    role = 'worker';
    selectedUser = {} as User;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private projectsUserService: ProjectsUserService
    ) {}
    ngOnInit(): void {
        this.userService.fetchAllUsers().subscribe(
            (res) => {
                for (const userProject of this.dataProject) {
                    for (const user of res) {
                        if (userProject.id == user.id) {
                            res.splice(res.indexOf(user), 1);
                        }
                    }
                }

                this.dataSource.data = res;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    columns = [
        {
            columnDef: 'picture',
            header: '',
            cell: (element: User) =>
                `${
                    element.photoPath
                        ? element.photoPath
                        : 'assets/avatar-placeholder.jpg'
                }`,
        },
        {
            columnDef: 'name',
            header: 'Name',
            cell: (element: User) => `${element.name}`,
        },
        {
            columnDef: 'createdDate',
            header: 'Created Date',
            cell: (element: User) =>
                `${new Date(Date.parse(element.createdDate!)).toLocaleString(
                    'en-US'
                )}`,
        },
    ];

    onSelectUser(Event: User) {
        this.selectedUser = Event;
    }
    onAddUser() {
        this.projectsUserService.addUserToProject(
            this.route.snapshot.params['id'],
            this.selectedUser.id!,
            this.role
        );

        this.dataSource.data.splice(
            this.dataSource.data.indexOf(this.selectedUser),
            1
        );
        this.dataParent.emit(this.selectedUser);
        this.dataSource._updateChangeSubscription();
    }
}
