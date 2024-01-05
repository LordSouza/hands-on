import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'hands-on-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    @Input() sidebarVisible: boolean = false;
    @Output() sidebarVisibleChange: EventEmitter<boolean> =
        new EventEmitter<boolean>();

    onHide() {
        this.sidebarVisibleChange.emit(false);
    }
}
