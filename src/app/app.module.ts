import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderfooterComponent } from './headerfooter/headerfooter.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProduitsComponent } from './produits/produits.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionDebiteurComponent } from './gestion-debiteur/gestion-debiteur.component';
import { DebiteurDetailsComponent } from './debiteur-details/debiteur-details.component';
import { DossierSearchComponent } from './dossier-search/dossier-search.component';
import { DateParserInterceptor } from './date-parser-interceptor.interceptor';
import { RisqueOperationsComponent } from './risque-operations/risque-operations.component';
import { DossierOperationsComponent } from './dossier-operations/dossier-operations.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserRoleManagementComponent } from './user-role-management/user-role-management.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AjouterDossierComponent } from './ajouter-dossier/ajouter-dossier.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ListeDebiteursComponent } from './liste-debiteurs/liste-debiteurs.component';

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
    ListeDebiteursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DateParserInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
