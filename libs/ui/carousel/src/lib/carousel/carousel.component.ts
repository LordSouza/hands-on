import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hands-on-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
    contentSelected: { name: string; url: string } = { name: '', url: '' };
    @Input() typeContent: string = '';
    @Input() tab: {
        title: string;
        content?: { name: string; url: string }[];
        type: string;
    } = { title: '', content: [], type: '' };

    ngOnInit() {
        if (this.tab.content != undefined && this.tab.content.length > 0) {
            this.contentSelected = this.tab.content[0];
        }
    }

    privImg() {
        if (this.tab.content == undefined || this.tab.content.length == 0) {
            return;
        }
        for (let i = 0; i < this.tab.content.length; i++) {
            if (this.contentSelected == this.tab.content[i]) {
                if (i == 0) {
                    this.contentSelected =
                        this.tab.content[this.tab.content.length - 1];
                    return;
                }
                this.contentSelected = this.tab.content[i - 1];
                return;
            }
        }
    }
    nextImg() {
        if (this.tab.content == undefined || this.tab.content.length == 0) {
            return;
        }
        for (let i = 0; i < this.tab.content.length; i++) {
            if (this.contentSelected == this.tab.content[i]) {
                if (i == this.tab.content.length - 1) {
                    this.contentSelected = this.tab.content[0];
                    return;
                }
                this.contentSelected = this.tab.content[i + 1];
                return;
            }
        }
    }

    selectImg(photo: { name: string; url: string }) {
        this.contentSelected = photo;
    }
}
