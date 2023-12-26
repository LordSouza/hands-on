import { Component, Input } from '@angular/core';

@Component({
    selector: 'hands-on-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    @Input() sidebarVisible: boolean = false;
}
