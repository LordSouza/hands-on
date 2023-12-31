import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '@models';

@Component({
    selector: 'hands-on-entry',
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.css',
})
export class EntryComponent implements OnInit {
    @Input() entry: Entry = {} as Entry;
    images!: {
        itemImageSrc: string;
        thumbnailImageSrc: string;
        alt: string;
        title: string;
    }[];
    tabs: { title: string; content: string; type: string }[] = [];
    responsiveOptions: { breakpoint: string; numVisible: number }[] = [];

    constructor() {}

    ngOnInit() {
        this.tabs = [
            { title: 'Files', content: 'Tab 1 Content', type: 'doc' },
            { title: 'Pictures', content: 'Tab 2 Content', type: 'img' },
            { title: 'Videos', content: 'Tab 3 Content', type: 'video' },
            { title: 'Download', content: 'Tab 3 Content', type: 'video' },
        ];
        this.images = [
            {
                itemImageSrc:
                    'https://blobstorageeventslogger.blob.core.windows.net/files/0lz3xyqr.fsh_10_11_2023.png',
                thumbnailImageSrc:
                    'https://blobstorageeventslogger.blob.core.windows.net/files/0lz3xyqr.fsh_10_11_2023.png',
                alt: '',
                title: '',
            },
            {
                itemImageSrc:
                    'https://blobstorageeventslogger.blob.core.windows.net/files/3oujm4vh.4xq_10_11_2023.png',
                thumbnailImageSrc:
                    'https://blobstorageeventslogger.blob.core.windows.net/files/3oujm4vh.4xq_10_11_2023.png',
                alt: '',
                title: '',
            },
        ];
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5,
            },
            {
                breakpoint: '768px',
                numVisible: 3,
            },
            {
                breakpoint: '560px',
                numVisible: 1,
            },
        ];
    }
}
