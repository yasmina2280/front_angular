import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isloggedIn && this.authService.isAdmin()) {
      return true;
    }

    // Redirection si pas admin
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
