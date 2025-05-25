import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierService } from '../services/dossier.service';
import { Dossier } from '../model/dossier.model';


@Component({
  selector: 'app-ajouter-dossier',
  templateUrl: './ajouter-dossier.component.html',
  styleUrls: ['./ajouter-dossier.component.css']
})
export class AjouterDossierComponent {
  dossierForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dossierService: DossierService
  ) {
    this.dossierForm = this.fb.group({
      etat: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.dossierForm.valid) {
      const dossier: Dossier = this.dossierForm.value;

      this.dossierService.createDossier(dossier).subscribe({
        next: (res) => {
          this.successMessage = 'Dossier ajouté avec succès';
          this.dossierForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'ajout du dossier';
          console.error(err);
        }
      });
    }
  }
}
