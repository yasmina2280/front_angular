import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public authService: AuthService, // Doit être public pour le template
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  shouldShowNavbar(): boolean {
  const hiddenRoutes = ['/login', '/register', '/verifEmail','/acceuil'];
  return !hiddenRoutes.includes(this.router.url);
}
}