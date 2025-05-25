import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

import { Dossier } from '../model/dossier.model';
import { Risque } from '../model/risque.model';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {
  private apiUrl = `${environment.apiBaseUrl}/api/risques`;

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

  getAllRisques(): Observable<Risque[]> {
    return this.http.get<Risque[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  createRisque(dossierId: number, risque: Risque): Observable<Risque> {
    return this.http.post<Risque>(`${this.apiUrl}/${dossierId}`, risque, {
      headers: this.getAuthHeaders()
    });
  }

  getRisqueByNum(num: string): Observable<Risque> {
    return this.http.get<Risque>(`${this.apiUrl}/${num}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateRisque(id: number, risque: Risque): Observable<Risque> {
    return this.http.put<Risque>(`${this.apiUrl}/${id}`, risque, {
      headers: this.getAuthHeaders()
    });
  }

  deleteRisque(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}