import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  private apiUrl = 'http://localhost:3000/api/frais'; // adapte à ton URL backend

  constructor(private http: HttpClient,private authService: AuthService) {}

   private getAuthHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      console.log('JWT Token:', token);
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
  

  getFraisEnAttente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`,{
  headers: this.getAuthHeaders()
});
  }

  validerFrais(fraisId: number): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl}/${fraisId}/valider`,
    {},
    { headers: this.getAuthHeaders() }
  );
}

refuserFrais(fraisId: number): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${fraisId}/rejeter`, {}, {
   
    headers: this.getAuthHeaders()
  });
}

}
