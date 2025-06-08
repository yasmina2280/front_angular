import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Debiteur';
  
  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.router.navigate(['/acceuil']);
    }
    
    // Initialize feather icons
    feather.replace();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}