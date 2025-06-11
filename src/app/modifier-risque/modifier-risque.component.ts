import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Risque } from '../model/risque.model';
import { RisqueService } from '../services/risque.service'; // <-- Use RisqueService instead of DossierService

@Component({
  selector: 'app-modifier-risque',
  templateUrl: './modifier-risque.component.html',
  styleUrls: ['./modifier-risque.component.css']
})
export class ModifierRisqueComponent implements OnInit {
  risqueForm!: FormGroup;
  risqueId!: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private risqueService: RisqueService, // <-- use RisqueService here
    private toastr: ToastrService,
    public  router: Router
  ) {}

  ngOnInit(): void {
    this.risqueId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadRisque();
  }

initForm() {
  this.risqueForm = this.fb.group({
    num: [{value: '', disabled: true}, Validators.required],               // Lecture seule
    soldePrincipale: [0, Validators.required],
    montantPrincipale: [0, Validators.required],
    interetConventionnel: [0, Validators.required],
    montantInteretRetard: [0, Validators.required],
    soldeInteretConventionnel: [0, Validators.required],
    soldeInteretRetard: [0, Validators.required],
    dossierId: [{value: '', disabled: true}, Validators.required],          // Lecture seule
    natureId: [{value: '', disabled: true}, Validators.required],           // Lecture seule
    stadeId: [{value: '', disabled: true}, Validators.required]             // Lecture seule
  });
}

loadRisque() {
  this.isLoading = true;
  this.risqueService.getRisqueById(this.risqueId).subscribe({
    next: (risque) => {
      // Pour un champ désactivé (disabled), patchValue fonctionne mais ne l'active pas
      this.risqueForm.patchValue({
        num: risque.num,
        soldePrincipale: risque.soldePrincipale,
        montantPrincipale: risque.montantPrincipale,
        interetConventionnel: risque.interetConventionnel,
        montantInteretRetard: risque.montantInteretRetard,
        soldeInteretConventionnel: risque.soldeInteretConventionnel,
        soldeInteretRetard: risque.soldeInteretRetard,
        // dossierId: risque.dossier.numero,
        // natureId: risque.nature.id,
        // stadeId: risque.stade.libelle
      });
      this.isLoading = false;
    },
    error: (err) => {
      this.toastr.error('Erreur lors du chargement du risque');
      this.isLoading = false;
    }
  });
}


 onSubmit() {
  if (this.risqueForm.invalid) {
    this.toastr.warning('Veuillez remplir tous les champs requis');
    return;
  }

  // Récupérer la valeur complète, même pour les champs désactivés
  const formValue = this.risqueForm.getRawValue();

  const updatedRisque: Risque = {
    id: this.risqueId,
    ...formValue
  };

  this.risqueService.updateRisque(this.risqueId, updatedRisque).subscribe({
    next: () => {
      
      alert('Risque modifié avec succès');
      this.router.navigate(['/gestion-recouvrement']); // ou autre route
    },
    error: (err) => {
      alert('Erreur lors de la modification du risque');
      this.toastr.error('Erreur lors de la modification du risque');
      console.error(err);
    }
  });
}

}
