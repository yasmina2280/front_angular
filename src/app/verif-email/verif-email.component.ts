import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  err: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    this.loading = true;
    this.err = '';

    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        this.authService.login(this.user).subscribe({
          next: (data) => {
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.loading = false;
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        if (err.error.errorCode === "INVALID_TOKEN") {
          this.err = "Code invalide !";
        } else if (err.error.errorCode === "EXPIRED_TOKEN") {
          this.err = "Code expiré !";
        }
      }
    });
  }
}