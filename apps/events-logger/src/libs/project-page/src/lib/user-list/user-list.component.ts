import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@models';

@Component({
    selector: 'hands-on-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnChanges {
    type: User = {} as User;
    dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
    @Input() data: User[] = [];

    constructor() {
        this.dataSource.data = this.data;
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
            columnDef: 'role',
            header: 'Role',
            cell: (element: User) => `${element.role}`,
        },
        {
            columnDef: 'createdDate',
            header: 'Created Date',
            cell: (element: User) =>
                `${new Date(Date.parse(element.createdDate!)).toLocaleString(
                    'en-US'
                )}`,
        },
        {
            columnDef: 'actions',
            header: 'Actions',
            cell: (element: User) => `${element.id}`,
        },
    ];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.dataSource.data = this.data;
        }
    }
}
