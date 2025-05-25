import { Component, OnInit } from '@angular/core';
import { DossierService } from '../services/dossier.service';
import { Risque } from '../model/risque.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dossier-operations',
  templateUrl: './dossier-operations.component.html',
  styleUrls: ['./dossier-operations.component.css']
})
export class DossierOperationsComponent implements OnInit {
  numeroDossier: number | null = null;
  risques: Risque[] = [];
  selectedRisque: Risque | null = null;
  isLoading = false;

  constructor(
    private dossierService: DossierService,
    private toastr: ToastrService
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
}