import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RisqueService } from '../services/risque.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  userRoles: string[] = [];
  isFeesResponsible: boolean = false;

  // Ajoutez ces méthodes à votre composant
risksReadyForClosure: any[] = [];

  constructor( public authService: AuthService,private router: Router, public riskService:RisqueService ) {}

  ngOnInit() {
    // Récupérer les rôles de l'utilisateur connecté
    this.userRoles = this.authService.getCurrentUserRoles();
    
    // Vérifier si l'utilisateur a le rôle responsable des frais
    this.isFeesResponsible = this.userRoles.includes('RESONSABLE FRAIS');
     this.loadRisksReadyForClosure();
  }
  

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  loadRisksReadyForClosure() {
  // Appel API pour récupérer les risques avec montant principal à 0 mais non clôturés
  this.riskService.getRisksWithZeroPrincipal().subscribe(
    (risks) => {
      this.risksReadyForClosure = risks;
      console.log(this.risksReadyForClosure);
    },
    (error) => {
      console.error('Erreur lors du chargement des risques', error);
    }
  );
}

verifyRiskFees(riskId: number) {
  // Redirige vers la page de vérification des frais pour ce risque
  this.router.navigate(['/gestion-frais'], { queryParams: { riskId } });
}

closeRisk(riskId: number) {
  this.riskService.closeRisk(riskId).subscribe(
    (response) => {
      // Recharger la liste après clôture
      this.loadRisksReadyForClosure();
      // Afficher un message de succès
      alert('Risque clôturé avec succès');
    },
    (error) => {
      console.error('Erreur lors de la clôture du risque', error);
      alert('Erreur lors de la clôture du risque');
    }
  );
}

}
