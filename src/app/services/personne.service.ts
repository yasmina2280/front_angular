import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Personne } from '../model/person.model';


@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = `${environment.apiBaseUrl}/api/personnes`;

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

  getAllPersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  createPersonne(personne: Personne): Observable<Personne> {
    return this.http.post<Personne>(this.apiUrl, personne, {
      headers: this.getAuthHeaders()
    });
  }

  getPersonneById(id: number): Observable<Personne> {
    return this.http.get<Personne>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  deletePersonne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}