import { Component, OnInit } from '@angular/core';
import { Recouvrement } from '../model/recouvrement.model';
import { RecouvrementService } from '../services/recouvrement.service';
import { DebiteurService } from '../services/debiteur.service';
import { Debiteur } from '../model/debiteur.model';

@Component({
  selector: 'app-recouvrement',
  templateUrl: './recouvrement.component.html',
  styleUrls: ['./recouvrement.component.css']
})
export class RecouvrementComponent implements OnInit {
  recouvrements: Recouvrement[] = [];
  debiteurs: Debiteur[] = [];
  repartitionMontants: { [recouvrementId: number]: { [risqueId: number]: number } } = {};

  constructor(
    private recouvrementService: RecouvrementService,
    private debiteurService: DebiteurService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }


fetchData(): void {
  this.recouvrementService.getAll().subscribe({
    next: (recouvrements) => {
      console.log('Recouvrements reçus:', recouvrements);
      this.recouvrements = recouvrements;
      
      this.debiteurService.getDebiteurs().subscribe({
        next: (debiteurs) => {
          console.log('Débiteurs reçus:', debiteurs);
          this.debiteurs = debiteurs;
        },
        error: (err) => console.error('Erreur chargement débiteurs:', err)
      });
    },
    error: (err) => console.error('Erreur chargement recouvrements:', err)
  });
}

  valider(recouvrement: Recouvrement): void {
    const repartition = this.repartitionMontants[recouvrement.id];
    
    // 1. Vérification si la répartition existe
    if (!repartition || Object.keys(repartition).length === 0) {
        alert('Veuillez définir la répartition des montants');
        return;
    }

    // 2. Vérification de la somme totale
    const totalReparti = Object.values(repartition).reduce((sum, montant) => sum + montant, 0);
    const tolerance = 0.01;

    if (Math.abs(totalReparti - recouvrement.montant) > tolerance) {
        alert(`La somme répartie (${totalReparti.toFixed(2)} DT) ne correspond pas au montant du recouvrement (${recouvrement.montant.toFixed(2)} DT)`);
        return;
    }

    // 3. Vérification des montants par risque
    const risquesEnErreur = [];
    for (const [risqueId, montantAffecte] of Object.entries(repartition)) {
        const risque = recouvrement.dossier?.risques?.find(r => r.id === +risqueId);
        
        if (risque) {
            const soldeDisponible = risque.montantPrincipale; // ou risque.montantPrincipale selon votre modèle
            
            if (montantAffecte > soldeDisponible) {
                risquesEnErreur.push({
                    numRisque: risque.num,
                    montantAffecte,
                    soldeDisponible
                });
            }
        }
    }

    // 4. Affichage des erreurs par risque si nécessaire
    if (risquesEnErreur.length > 0) {
        let message = 'Les montants suivants dépassent le solde disponible:\n\n';
        
        risquesEnErreur.forEach(risque => {
            message += `- Risque ${risque.numRisque}: `;
            message += `${risque.montantAffecte.toFixed(2)} DT > ${risque.soldeDisponible.toFixed(2)} DT (solde)\n`;
        });

        alert(message);
        return;
    }

    // 5. Si tout est valide, appel au backend
    this.recouvrementService.validerRecouvrement(recouvrement.id, repartition).subscribe({
        next: () => {
            alert('Recouvrement validé avec succès !');
            this.fetchData();
        },
        error: (err) => {
            let errorMessage = 'Erreur lors de la validation';
            
            if (err.error?.message) {
                if (err.error.message.includes("dépasse le montant principal")) {
                    errorMessage = `Le montant dépasse le solde disponible pour un risque`;
                } else {
                    errorMessage = err.error.message;
                }
            }

            alert(errorMessage);
        }
    });
}

//   valider(recouvrement: Recouvrement): void {
//     const repartition = this.repartitionMontants[recouvrement.id];
    
//     // Vérification côté front pour anticiper l'erreur
//     const totalReparti = Object.values(repartition).reduce((sum, montant) => sum + montant, 0);
//     const tolerance = 0.01; // Tolérance pour les erreurs d'arrondi

//     if (Math.abs(totalReparti - recouvrement.montant) > tolerance) {
//         alert(`La somme répartie (${totalReparti} DT) ne correspond pas au montant du recouvrement (${recouvrement.montant} DT)`);
//         return;
//     }

//     this.recouvrementService.validerRecouvrement(recouvrement.id, repartition).subscribe({
//         next: () => {
//             alert('Recouvrement validé avec succès !');
//             this.fetchData(); // Rafraîchir les données
//         },
//         error: (err) => {
//             if (err.error?.message?.includes("La somme répartie ne correspond pas")) {
//                 // Erreur spécifique du backend
//                 alert(`Erreur: ${err.error.message}`);
//             } else {
//                 // Autres erreurs
//                 alert('Erreur lors de la validation : ' + (err.error?.message || err.message));
//             }
//         }
//     });
// }

  refuser(id: number): void {
    this.recouvrementService.refuserRecouvrement(id).subscribe(() => {
      this.fetchData();
    });
  }

  setRepartition(recouvrementId: number, risqueId: number, montant: number): void {
    if (!this.repartitionMontants[recouvrementId]) {
      this.repartitionMontants[recouvrementId] = {};
    }
    this.repartitionMontants[recouvrementId][risqueId] = montant;
  }

  setRepartitionFromEvent(recId: number, risqueId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);
    this.setRepartition(recId, risqueId, value);
  }
}
