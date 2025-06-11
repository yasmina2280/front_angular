// creer-debiteur-personne-existante.component.ts
import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { DebiteurService } from '../services/debiteur.service';

import { HttpErrorResponse } from '@angular/common/http';
import { DossierService } from '../services/dossier.service';
import { Personne } from '../model/person.model';
import { CreateDebiteurRequest } from '../model/CreateDebiteurRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creer-debiteur-personne-existante',
  templateUrl: './creer-debiteur-personne-existante.component.html',
  styleUrls: ['./creer-debiteur-personne-existante.component.css']
})
export class CreerDebiteurPersonneExistanteComponent implements OnInit {

  creerDebiteurForm: FormGroup;
  personnes: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private debiteurService: DebiteurService,
    private personneService: PersonneService
  ) {
    this.creerDebiteurForm = this.fb.group({
      personneId: ['', Validators.required],
      numeroDossier: [''],
      rapporteur: [''],
      numContentieux: [''],
      dateTransfert: [''],
      soldeRecouvrement: ['', [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadPersonnes();
  }

  loadPersonnes(): void {
    this.isLoading = true;
    this.personneService.getAllPersonnes().subscribe({
      next: (personnes) => {
        this.personnes = personnes.filter(p => !p.isDebiteur);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des personnes';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  creerDebiteur(): void {
    if (this.creerDebiteurForm.invalid) {
      this.errorMessage = 'Veuillez sélectionner une personne';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.creerDebiteurForm.value;
    const request = {
      personneId: formValue.personneId,
      numeroDossier: formValue.numeroDossier || null,
      rapporteur: formValue.rapporteur || null,
      numContentieux: formValue.numContentieux,
      dateTransfert: formValue.dateTransfert,
      soldeRecouvrement: formValue.soldeRecouvrement
    };

    this.debiteurService.creerDebiteurAvecPersonneExistante(request).subscribe({
      next: () => {
        this.successMessage = 'Débiteur créé avec succès';
        this.creerDebiteurForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de la création du débiteur';
        this.isLoading = false;
      }
    });
  }

  // In your component class
get soldeRecouvrement() {
  return this.creerDebiteurForm.get('soldeRecouvrement');
}
}