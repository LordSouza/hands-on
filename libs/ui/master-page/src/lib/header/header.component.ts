import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@hands-on/service/auth';

@Component({
    selector: 'hands-on-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    sidebarVisible: boolean = false;

    isLoginMode: boolean = false;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit() {
        this.authService.isLoginMode.subscribe(
            (item) => (this.isLoginMode = item)
        );
    }

    onMenuClick() {
        this.sidebarVisible = !this.sidebarVisible;
    }

    authRegister() {
        this.router.navigate(['/auth/register'], {});
    }

    authLogin() {
        this.router.navigate(['/auth/login'], {});
    }

    authLogout() {
        this.authService.logout();
    }

    onClickHome() {
        if (this.isLoginMode) {
            this.router.navigate(['/home'], {});
        } else {
            this.router.navigate(['/'], {});
        }
    }
}
