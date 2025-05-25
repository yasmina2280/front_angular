import { Component } from '@angular/core';
import { DebiteurService } from '../services/debiteur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { DebiteurDto } from '../model/debiteur-dto.model';

@Component({
  selector: 'app-gestion-debiteur',
  templateUrl: './gestion-debiteur.component.html',
  styleUrls: ['./gestion-debiteur.component.css']
})
export class GestionDebiteurComponent {
  searchOptions = [
    { id: 1, name: 'Par nom', icon: 'fa-user' },
    { id: 2, name: 'Par CIN', icon: 'fa-id-card' },
    { id: 3, name: 'Par numéro de dossier', icon: 'fa-folder' },
    { id: 4, name: 'Par numéro de contentieux', icon: 'fa-file-invoice' }
  ];

  selectedOption: number | null = null;
  searchValue: string = '';

  constructor(
    private debiteurService: DebiteurService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  selectOption(optionId: number): void {
    this.selectedOption = optionId;
    this.searchValue = '';
    this.toastr.info(`Veuillez entrer ${this.getOptionName(optionId).toLowerCase()}`, 'Recherche', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }

  search(): void {
    if (!this.searchValue.trim()) {
      this.toastr.warning('Veuillez entrer une valeur de recherche', 'Attention');
      return;
    }

    let searchObservable: Observable<DebiteurDto | DebiteurDto[]>;
    switch(this.selectedOption) {
      case 1: // Nom
        searchObservable = this.debiteurService.searchDebiteurs({ nom: this.searchValue });
        break;
      case 2: // CIN
        searchObservable = this.debiteurService.searchDebiteurs({ cin: this.searchValue });
        break;
      case 3: // Numéro dossier
        searchObservable = this.debiteurService.getByNumeroDossier(+this.searchValue);
        break;
      case 4: // Contentieux
        searchObservable = this.debiteurService.getByNumContentieux(+this.searchValue);
        break;
      default:
        this.toastr.error('Option de recherche invalide', 'Erreur');
        return;
    }

    searchObservable.subscribe({
      next: (result: DebiteurDto | DebiteurDto[]) => {
        if ((Array.isArray(result) && result.length === 0) || !result) {
          this.toastr.warning('Aucun débiteur trouvé', 'Résultat');
        } else {
          const debiteurs = Array.isArray(result) ? result : [result];
          this.router.navigate(['/debiteur-details'], { 
            state: { debiteurs } 
          });
        }
      },
      error: (err: any) => {
        this.toastr.error('Erreur lors de la recherche', 'Erreur');
        console.error(err);
      }
    });
  }

  getOptionName(optionId: number): string {
    return this.searchOptions.find(o => o.id === optionId)?.name || '';
  }
}