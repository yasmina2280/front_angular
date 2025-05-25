import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dossier } from '../model/dossier.model';
import { Risque } from '../model/risque.model';
import { DossierService } from '../services/dossier.service';
import { DebiteurService } from '../services/debiteur.service';
import { Debiteur } from '../model/debiteur.model';
import { Personne, TypePersonne } from '../model/person.model';

@Component({
  selector: 'app-dossier-search',
  templateUrl: './dossier-search.component.html',
  styleUrls: ['./dossier-search.component.css']
})
export class DossierSearchComponent {
  numeroDossier: number | undefined;
  dossier: Dossier | null = null;
  risques: Risque[] = [];
  debiteur: Debiteur | null = null;
  isLoading = false;

  constructor(
    private dossierService: DossierService,
    private debiteurService: DebiteurService,
    private toastr: ToastrService
  ) {}

  searchDossier(): void {
    if (!this.numeroDossier) {
      this.toastr.warning('Veuillez entrer un numéro de dossier', 'Attention');
      return;
    }

    this.isLoading = true;
    this.dossier = null;
    this.risques = [];
    this.debiteur = null;

    // Récupérer les risques du dossier
    this.dossierService.getRisquesByDossier(this.numeroDossier).subscribe({
      next: (risques) => {
        this.risques = risques;
        if (risques.length > 0) {
          this.dossier = { numero: this.numeroDossier, etat: 'Chargé', risques };
        }
        this.loadDebiteur();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }
private loadDebiteur(): void {
  if (!this.numeroDossier) {
    this.isLoading = false;
    return;
  }

  this.debiteurService.getByNumeroDossier(this.numeroDossier).subscribe({
    next: (debiteur) => {
      this.debiteur = {
        numContentieux: debiteur.numContentieux,
        dateTransfert: new Date(debiteur.dateTransfert),
        soldeRecouvrement: debiteur.soldeRecouvrement,
        rapporteur: debiteur.rapporteur,
        personne: debiteur.personne,
        dossier: {
          numero: debiteur.numeroDossier,
          etat: 'Inconnu', 
          risques: this.risques
        }
      };
      this.isLoading = false;
    },
    error: (err) => {
      console.warn('Aucun débiteur trouvé pour ce dossier');
      this.debiteur = null;
      this.isLoading = false;
    }
  });
}

displayPersonneDetails(personne: Personne): string {
  let details = `${personne.nom} ${personne.prenom}`;
  
  if (personne.dateNaissance) {
    const dob = typeof personne.dateNaissance === 'string' 
      ? new Date(personne.dateNaissance) 
      : personne.dateNaissance;
    details += `\nNé(e) le: ${dob.toLocaleDateString('fr-FR')}`;
  }
  
  details += `\nCIN: ${personne.cin}`;
  details += `\nType: ${this.translateType(personne.typePersonne)}`;
  
  if (personne.typePersonne === TypePersonne.MORALE && personne.raisonSociale) {
    details += `\nRaison sociale: ${personne.raisonSociale}`;
  }
  
  return details;
}

private translateType(type: TypePersonne): string {
  return type === TypePersonne.PHYSIQUE ? 'Personne Physique' : 'Personne Morale';
}

  private handleError(err: any): void {
    this.isLoading = false;
    this.toastr.error('Erreur lors de la recherche', 'Erreur');
    console.error(err);
  }
}