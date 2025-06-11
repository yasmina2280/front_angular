import { Component } from '@angular/core';
import { Risque } from '../model/risque.model';
import { DossierService } from '../services/dossier.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestion-risque',
  templateUrl: './gestion-risque.component.html',
  styleUrls: ['./gestion-risque.component.css']
})
export class GestionRisqueComponent {

   numeroDossier: number | null = null;
    risques: Risque[] = [];
    selectedRisque: Risque | null = null;
    isLoading = false;
  
    constructor(
      private dossierService: DossierService,
      private toastr: ToastrService,
       private router: Router
    ) {}
  
    ngOnInit(): void {}
  
    searchDossier(): void {
      if (!this.numeroDossier) {
        this.toastr.warning('Veuillez entrer un numéro de dossier');
        return;
      }
  
      this.isLoading = true;
      this.risques = [];
      this.selectedRisque = null;
  
      this.dossierService.getRisquesByDossier(this.numeroDossier)
        .subscribe({
          next: (risques) => {
            this.risques = risques;
            this.isLoading = false;
            if (risques.length === 0) {
              this.toastr.info('Aucun risque trouvé pour ce dossier');
            }
          },
          error: (err) => {
            this.toastr.error('Erreur lors de la recherche');
            console.error(err);
            this.isLoading = false;
          }
        });
    }
  
  
selectRisque(risque: Risque): void {
  this.selectedRisque = risque;
}

modifierRisque(): void {
  if (!this.selectedRisque) {
    this.toastr.warning('Aucun risque sélectionné');
    return;
  }

  this.router.navigate(['/risques/modifier', this.selectedRisque.id]);
}


}
