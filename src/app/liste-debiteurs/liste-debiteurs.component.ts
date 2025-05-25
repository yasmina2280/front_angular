import { Component, OnInit } from '@angular/core';

import { DebiteurService } from '../services/debiteur.service';
import { Debiteur } from '../model/debiteur.model';

@Component({
  selector: 'app-liste-debiteurs',
  templateUrl: './liste-debiteurs.component.html',
  styleUrls: ['./liste-debiteurs.component.css']
})
export class ListeDebiteursComponent implements OnInit {
  debiteurs: Debiteur[] = [];
  loading = false;
  errorMessage = '';

  // Pour la pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private debiteursService: DebiteurService) {}

  ngOnInit(): void {
    this.chargerDebiteurs();
  }

  
  chargerDebiteurs(): void {
    this.debiteursService.getDebiteurs().subscribe({
      next: (data) => this.debiteurs = data,
      error: (err) => console.error('Erreur lors du chargement des débiteurs', err)
    });
  }


}