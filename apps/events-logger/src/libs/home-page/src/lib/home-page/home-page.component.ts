import { Component, OnInit } from '@angular/core';
import { Entry } from '@models';

import { EntryService } from '@services';

@Component({
    selector: 'hands-on-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
    entryArray: Entry[] = [];

    constructor(private entryService: EntryService) {}

    ngOnInit(): void {
        this.entryService.fetchAllEntries().subscribe((entries) => {
            this.entryArray = entries;
        });
    }
}
