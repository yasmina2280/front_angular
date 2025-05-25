import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    console.log('JWT Token:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  

  createDossier(dossier: Dossier): Observable<Dossier> {
   
    return this.http.post<Dossier>(this.apiUrl, dossier, {
  headers: this.getAuthHeaders()
});
  }


  

  getAllDossiers(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getRisquesByDossier(numero: number): Observable<Risque[]> {
    return this.http.get<Risque[]>(`${this.apiUrl}/${numero}/risques`, {
      headers: this.getAuthHeaders()
    });
  }

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
    });
  }
}