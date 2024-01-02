import { Component, OnInit } from '@angular/core';
import { Entry } from '@models';

import { EntryService } from '@services';

@Component({
    selector: 'hands-on-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
    isLoading = false;
    currentPage = 1;
    itemsPerPage = 10;
    entryArray: Entry[] = [];

    constructor(private entryService: EntryService) {}

    ngOnInit(): void {
        this.loadData();
    }

    toggleLoading = () => (this.isLoading = !this.isLoading);

    // it will be called when this component gets initialized.
    loadData = () => {
        this.toggleLoading();
        this.entryService
            .fetchAllEntries(this.currentPage, this.itemsPerPage)
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
            .fetchAllEntries(this.currentPage, this.itemsPerPage)
            .subscribe({
                next: (response) =>
                    (this.entryArray = [...this.entryArray, ...response]),
                error: (err) => console.log(err),
                complete: () => this.toggleLoading(),
            });
    };

    onScroll = () => {
        this.currentPage++;
        this.appendData();
        console.log(this.currentPage);
    };
}
