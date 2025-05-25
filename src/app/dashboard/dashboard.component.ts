import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  userRoles: string[] = [];
  isFeesResponsible: boolean = false;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
    // Récupérer les rôles de l'utilisateur connecté
    this.userRoles = this.authService.getCurrentUserRoles();
    
    // Vérifier si l'utilisateur a le rôle responsable des frais
    this.isFeesResponsible = this.userRoles.includes('RESONSABLE FRAIS');
  }
  

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
