import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DebiteurDto } from '../model/debiteur-dto.model';
import { Debiteur } from '../model/debiteur.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CreateDebiteurRequest } from '../model/CreateDebiteurRequest';

@Injectable({
  providedIn: 'root'
})
export class DebiteurService {
  private apiUrl = `${environment.apiBaseUrl}/api/debiteurs`;

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

   getDebiteurs(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}`, {
    headers: this.getAuthHeaders()
  });
}

creerDebiteurAvecPersonneExistante(request: CreateDebiteurRequest): Observable<Debiteur> {
  return this.http.post<Debiteur>(`${this.apiUrl}/avec-personne-existante`, request, {
    headers: this.getAuthHeaders()
  });
}


  searchDebiteurs(criteria: {
    nom?: string;
    cin?: string;
    numeroDossier?: number;
    numContentieux?: number;
  }): Observable<DebiteurDto[]> {
    let params = new HttpParams();
    
    if (criteria.nom) params = params.append('nom', criteria.nom);
    if (criteria.cin) params = params.append('cin', criteria.cin);
    if (criteria.numeroDossier) params = params.append('numeroDossier', criteria.numeroDossier.toString());
    if (criteria.numContentieux) params = params.append('numContentieux', criteria.numContentieux.toString());

    return this.http.get<DebiteurDto[]>(`${this.apiUrl}/search`, { 
      params,
      headers: this.getAuthHeaders() 
    });
  }

  getByNumContentieux(num: number): Observable<DebiteurDto[]> {
    return this.http.get<DebiteurDto[]>(`${this.apiUrl}/contentieux/${num}`, {
      headers: this.getAuthHeaders()
    });
  }


  getByNumeroDossier(num: number): Observable<DebiteurDto> {
  return this.http.get<DebiteurDto>(`${this.apiUrl}/by-dossier/${num}`, {
    headers: this.getAuthHeaders()
  }).pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération du débiteur:', error);
      return throwError(error);
    })
  );
}

  createDebiteur(debiteur: Omit<Debiteur, 'numContentieux'>): Observable<Debiteur> {
    return this.http.post<Debiteur>(this.apiUrl, debiteur, {
      headers: this.getAuthHeaders()
    });
  }

 assignReporter(debiteurId: number, rapporteurNom: string): Observable<any> {
  // Vérification des IDs
  if (!debiteurId) {
    throw new Error('ID débiteur invalide');
  }

  return this.http.post(
    `${this.apiUrl}/${debiteurId}/assign-reporter`,
    { rapporteur: rapporteurNom },
    { headers: this.getAuthHeaders() } // Ajout des headers d'authentification
  );
}

}