import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Dossier } from '../model/dossier.model';
import { Risque } from '../model/risque.model';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private apiUrl = `${environment.apiBaseUrl}/api/dossiers`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Créer un nouveau dossier
  createDossier(dossier: Dossier): Observable<Dossier> {
    return this.http.post<Dossier>(this.apiUrl, dossier, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer tous les dossiers
  getAllDossiers(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un dossier par son numéro
  getByNumero(numero: string): Observable<Dossier> {
    return this.http.get<Dossier>(`${this.apiUrl}/numero/${numero}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer les risques d'un dossier
  getRisquesByDossier(numero: number): Observable<Risque[]> {
    return this.http.get<Risque[]>(`${this.apiUrl}/${numero}/risques`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Rechercher des dossiers selon des critères
  searchDossiers(criteria: any): Observable<Dossier[]> {
    let params = new HttpParams();
    Object.keys(criteria).forEach(key => {
      if (criteria[key]) {
        params = params.append(key, criteria[key]);
      }
    });
    return this.http.get<Dossier[]>(`${this.apiUrl}/search`, {
      params,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion centralisée des erreurs
  private handleError(error: any) {
    console.error('Une erreur est survenue:', error);
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}