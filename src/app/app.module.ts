import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

// Third-party Modules
import { ToastrModule } from 'ngx-toastr';

// Application Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderfooterComponent } from './headerfooter/headerfooter.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProduitsComponent } from './produits/produits.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionDebiteurComponent } from './gestion-debiteur/gestion-debiteur.component';
import { DebiteurDetailsComponent } from './debiteur-details/debiteur-details.component';
import { DossierSearchComponent } from './dossier-search/dossier-search.component';
import { RisqueOperationsComponent } from './risque-operations/risque-operations.component';
import { DossierOperationsComponent } from './dossier-operations/dossier-operations.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserRoleManagementComponent } from './user-role-management/user-role-management.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AjouterDossierComponent } from './ajouter-dossier/ajouter-dossier.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ListeDebiteursComponent } from './liste-debiteurs/liste-debiteurs.component';
import { FraisComponent } from './frais/frais.component';

// Interceptors
import { DateParserInterceptor } from './date-parser-interceptor.interceptor';
import { RecouvrementComponent } from './recouvrement/recouvrement.component';
import { CreerDebiteurPersonneExistanteComponent } from './creer-debiteur-personne-existante/creer-debiteur-personne-existante.component';
import { GestionRisqueComponent } from './gestion-risque/gestion-risque.component';
import { ModifierRisqueComponent } from './modifier-risque/modifier-risque.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderfooterComponent,
    HomeComponent,
    UsersComponent,
    ProduitsComponent,
    LoginComponent,
    RegisterComponent,
    VerifEmailComponent,
    DashboardComponent,
    GestionDebiteurComponent,
    DebiteurDetailsComponent,
    DossierSearchComponent,
    RisqueOperationsComponent,
    DossierOperationsComponent,
    NavbarComponent,
    UserRoleManagementComponent,
    UnauthorizedComponent,
    AjouterDossierComponent,
    ListeUtilisateursComponent,
    ListeDebiteursComponent,
    FraisComponent,
    RecouvrementComponent,
    CreerDebiteurPersonneExistanteComponent,
    GestionRisqueComponent,
    ModifierRisqueComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Angular Material Modules
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    
    // Third-party Modules
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    
    // Application Routing (should be last)
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DateParserInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }