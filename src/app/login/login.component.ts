import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  erreur = 0;
  message: string = "login ou mot de passe erronés..";

  constructor(private authService: AuthService, private router: Router) { }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.erreur = 1;
        if (err.error.errorCause === 'disabled') {
          this.message = "Utilisateur désactivé, Veuillez contacter votre Administrateur";
        }
      }
    });
  }
}
