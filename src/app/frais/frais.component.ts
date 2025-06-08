import { Component, OnInit } from '@angular/core';
import { FraisService } from '../services/frais.service';
import { Frais } from '../model/frais.model';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
})
export class FraisComponent implements OnInit {

  fraisList: any[] = [];

  constructor(private fraisService: FraisService) {}

  ngOnInit(): void {
    this.chargerFrais();
  }

 chargerFrais(): void {
  this.fraisService.getFraisEnAttente().subscribe({
    next: (data) => {
      console.log('Données reçues :', data); // ← Ajoute ceci
      this.fraisList = data;
    },
    error: (err) => console.error(err)
  });
}


  validerFrais(id: number): void {
    this.fraisService.validerFrais(id).subscribe({
      next: (operation) => {
        alert("Frais validé et opération créée !");
        this.chargerFrais(); // rafraîchir la liste
      },
      error: (err) => {
        alert("Erreur lors de la validation : " + err.error.message);
      }
    });
  }

  refuserFrais(id: number) {
  this.fraisService.refuserFrais(id).subscribe(() => {
    this.chargerFrais(); // Recharge la liste après refus
  });
}

getNumeroDossier(frais: Frais): string {
  return frais.risque?.dossier?.numero?.toString() || '-';
}



}
