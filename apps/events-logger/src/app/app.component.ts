import { Component, OnInit } from '@angular/core';
import { AuthService } from '@hands-on/service/auth';

@Component({
  selector: 'hands-on-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
