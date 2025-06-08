import { DebiteurService } from './../services/debiteur.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})
export class ListeUtilisateursComponent implements OnInit {
  users: any[] = [];
  debiteurs: any[] = [];

  // Dans votre composant
selectedUser: any = null;
selectedDebiteur: any = null;


  constructor(private userService: AuthService,private debiteurService: DebiteurService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
    this.chargerDebiteurs();
  }

  // chargerUtilisateurs(): void {
  //   this.userService.getAllUsers().subscribe({
  //     next: (data) => this.users = data,
  //     error: (err) => console.error('Erreur lors du chargement des utilisateurs', err)
  //   });
  // }

selectUser(user: any) {
  this.selectedUser = user;
  console.log('Utilisateur sélectionné:', user);
}

selectDebiteur(debiteur: any) {
  this.selectedDebiteur = debiteur;
  console.log('Débiteur sélectionné:', debiteur);
}

  chargerUtilisateurs(): void {
  this.userService.getAllUsers().subscribe({
    next: (data) => {
      console.log('Utilisateurs chargés:', data);
      this.users = data.filter(user =>
        user.roles.some((role: any) => role.role === 'USER')
      );
    },
    error: (err) => console.error('Erreur lors du chargement des utilisateurs', err)
  });
}



  chargerDebiteurs(): void {
    this.debiteurService.getDebiteurs().subscribe({
      next: (data) => this.debiteurs = data,
      error: (err) => console.error('Erreur lors du chargement des débiteurs', err)
    });
  }

assignReporter() {
    if (this.selectedUser && this.selectedDebiteur) {
        const nomRapporteur = this.selectedUser.username;
        console.log("Debtor ID being assigned:", this.selectedDebiteur.numContentieux);
        
        this.debiteurService.assignReporter(
            this.selectedDebiteur.numContentieux,
            nomRapporteur
        ).subscribe({
            next: (updatedDebiteur) => {
                // Mise à jour locale
                const index = this.debiteurs.findIndex(d => d.numContentieux === updatedDebiteur.numContentieux);
                if (index !== -1) {
                    this.debiteurs[index] = updatedDebiteur;
                }

                // ✅ Alerte de confirmation
                alert(`Rapporteur ${nomRapporteur} assigné au débiteur ${updatedDebiteur.numContentieux}.`);

                // Réinitialisation
                this.selectedUser = null;
                this.selectedDebiteur = null;
            },
            error: (err) => console.error(err)
        });
    }
}

}
