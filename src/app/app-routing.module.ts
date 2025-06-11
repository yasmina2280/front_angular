import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderfooterComponent} from "./headerfooter/headerfooter.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ProduitsComponent} from "./produits/produits.component";
import {UsersComponent} from "./users/users.component";
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { GestionDebiteurComponent } from './gestion-debiteur/gestion-debiteur.component';
import { DebiteurDetailsComponent } from './debiteur-details/debiteur-details.component';
import { DossierSearchComponent } from './dossier-search/dossier-search.component';
import { RisqueOperationsComponent } from './risque-operations/risque-operations.component';
import { DossierOperationsComponent } from './dossier-operations/dossier-operations.component';
import { UserRoleManagementComponent } from './user-role-management/user-role-management.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AjouterDossierComponent } from './ajouter-dossier/ajouter-dossier.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ListeDebiteursComponent } from './liste-debiteurs/liste-debiteurs.component';
import { FraisComponent } from './frais/frais.component';
import { RecouvrementComponent } from './recouvrement/recouvrement.component';
import { CreerDebiteurPersonneExistanteComponent } from './creer-debiteur-personne-existante/creer-debiteur-personne-existante.component';
import { GestionRisqueComponent } from './gestion-risque/gestion-risque.component';
import { ModifierRisqueComponent } from './modifier-risque/modifier-risque.component';

const routes: Routes = [
 {

  path:'acceuil', component: HeaderfooterComponent,
  children:[  {path:'', component:HomeComponent},
    {path:'produits', component:ProduitsComponent},
    {path:'users', component: UsersComponent}

  ]
},
  {path:'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent },
  {path: 'dashboard', component: DashboardComponent },
  { path: 'admin/roles', component: UserRoleManagementComponent},
  { path: 'ajouter-dossier', component: AjouterDossierComponent},
  { path: 'lister-deb-rap', component: ListeUtilisateursComponent},
  { path: 'lister-debiteur', component: ListeDebiteursComponent},
  { path: 'risques/modifier/:id', component: ModifierRisqueComponent},
 

  { path: 'unauthorized', component: UnauthorizedComponent },

 
  { 
    path: 'gestion-debiteur', 
    component: GestionDebiteurComponent 
  },
  { 
    path: 'gestion-risque', 
    component:GestionRisqueComponent
  },
  { 
    path: 'gestion-frais', 
    component:FraisComponent
  },
    { 
    path: 'gestion-recouvrement', 
    component:RecouvrementComponent
  },
   { 
    path: 'creerDebiteur', 
    component:CreerDebiteurPersonneExistanteComponent
  },


  { 
    path: 'debiteur-details', 
    component: DebiteurDetailsComponent 
  },
  { 
    path: 'dossiers-recherche', 
    component: DossierSearchComponent
  },
  { 
    path: 'risque-operations', 
    component: RisqueOperationsComponent,
    data: { title: 'Gestion des Opérations' } 
  },
  { path: 'dossier-operations', component: DossierOperationsComponent },
  
  {path:'**', redirectTo:'acceuil'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
