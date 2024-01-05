import { Component, OnInit } from '@angular/core';
import { Entry } from '@models';

import { EntryService } from '@services';

@Component({
    selector: 'hands-on-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
    isFilter: boolean = false;
    isLoading: boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 10;
    entryArray: Entry[] = [];
    hasFiles?: boolean | undefined = undefined;
    selectedProject: string | undefined = undefined;
    selectedUser: string | undefined = undefined;
    description: string | undefined = undefined;
    isOpen: boolean = false;

    constructor(private entryService: EntryService) {}

    ngOnInit(): void {
        this.loadData();
    }

    toggleLoading = () => (this.isLoading = !this.isLoading);

    // it will be called when this component gets initialized.
    loadData = (
        hasfiles?: boolean,
        selectedProject?: string,
        selectedUser?: string,
        description?: string
    ) => {
        this.toggleLoading();

        this.entryService
            .fetchAllEntries(
                this.currentPage,
                this.itemsPerPage,
                selectedUser,
                selectedProject,
                description,
                hasfiles
            )
            .subscribe({
                next: (response) => (this.entryArray = response),
                error: (err) => console.log(err),
                complete: () => this.toggleLoading(),
            });
    };

    // this method will be called on scrolling the page
    appendData = () => {
        this.toggleLoading();
        this.entryService
            .fetchAllEntries(
                this.currentPage,
                this.itemsPerPage,
                this.selectedUser,
                this.selectedProject,
                this.description,
                this.hasFiles
            )
            .subscribe({
                next: (response) =>
                    (this.entryArray = [...this.entryArray, ...response]),
                error: (err) => console.log(err),
                complete: () => this.toggleLoading(),
            });
    };
    onFilter($event: {
        hasFiles: boolean;
        selectedProject: string;
        selectedUser: string;
        description: string;
    }) {
        this.currentPage = 1;
        this.selectedProject = $event.selectedProject;
        this.selectedUser = $event.selectedUser;
        this.description = $event.description;
        this.hasFiles = $event.hasFiles;

        this.loadData(
            $event.hasFiles,
            $event.selectedProject,
            $event.selectedUser,
            $event.description
        );
    }

    onScroll = () => {
        this.currentPage++;
        this.appendData();
    };

    onReset() {
        this.currentPage = 1;
        this.selectedProject = undefined;
        this.selectedUser = undefined;
        this.description = undefined;
        this.hasFiles = undefined;
        this.loadData();
        this.isFilter = false;
    }
}
