import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '@models';

@Component({
    selector: 'hands-on-entry',
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.css',
})
export class EntryComponent implements OnInit {
    @Input() entry: Entry = {} as Entry;
    tabs: {
        title: string;
        content?: { name: string; url: string }[];
        type: string;
    }[] = [];

    constructor() {}

    ngOnInit() {
        this.tabs = [
            { title: 'Files', content: [], type: 'doc' },
            { title: 'Pictures', content: [], type: 'img' },
            { title: 'Videos', content: [], type: 'video' },
            { title: 'Download', content: [], type: 'all' },
        ];

        for (const file in this.entry.filesUrl) {
            // check if file is a image
            if (
                this.entry.filesUrl[file].endsWith('jpg') ||
                this.entry.filesUrl[file].endsWith('png') ||
                this.entry.filesUrl[file].endsWith('WebP') ||
                this.entry.filesUrl[file].endsWith('avif') ||
                this.entry.filesUrl[file].endsWith('jpeg')
            ) {
                this.tabs[1].content?.push({
                    name: this.entry.filesUrl[file].split('/')[4],
                    url: this.entry.filesUrl[file],
                });
                this.tabs[3].content?.push({
                    name: this.entry.filesUrl[file].split('/')[4],
                    url: this.entry.filesUrl[file],
                });
            }
            // check if file is a video
            else if (
                this.entry.filesUrl[file].endsWith('mp4') ||
                this.entry.filesUrl[file].endsWith('mov') ||
                this.entry.filesUrl[file].endsWith('avi') ||
                this.entry.filesUrl[file].endsWith('wmv') ||
                this.entry.filesUrl[file].endsWith('flv') ||
                this.entry.filesUrl[file].endsWith('webm')
            ) {
                this.tabs[2].content?.push({
                    name: this.entry.filesUrl[file].split('/')[4],
                    url: this.entry.filesUrl[file],
                });
                this.tabs[3].content?.push({
                    name: this.entry.filesUrl[file].split('/')[4],
                    url: this.entry.filesUrl[file],
                });
            }
            // check if file is a document
            else if (
                this.entry.filesUrl[file].endsWith('pdf') ||
                this.entry.filesUrl[file].endsWith('doc') ||
                this.entry.filesUrl[file].endsWith('docx') ||
                this.entry.filesUrl[file].endsWith('xls') ||
                this.entry.filesUrl[file].endsWith('xlsx')
            ) {
                this.tabs[0].content?.push({
                    name: this.entry.filesUrl[file].split('/')[4],
                    url: this.entry.filesUrl[file],
                });
                this.tabs[3].content?.push({
                    name: this.entry.filesUrl[file].split('/')[4],
                    url: this.entry.filesUrl[file],
                });
            } else {
                continue;
            }
        }
    }
}
