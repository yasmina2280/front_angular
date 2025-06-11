import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';
import { Recouvrement } from '../model/recouvrement.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecouvrementService {

  private apiUrl = 'http://localhost:3000/api/recouvrements';

   constructor(private http: HttpClient,private authService: AuthService) {}

     private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        console.log('JWT Token:', token);
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
      }
    

  getAll(): Observable<Recouvrement[]> {
    return this.http.get<Recouvrement[]>(`${this.apiUrl}`,{
  headers: this.getAuthHeaders()
});
  }

  

//   validerRecouvrement(id: number, repartition: { [risqueId: number]: number }): Observable<Recouvrement> {
//     return this.http.post<Recouvrement>(`${this.apiUrl}/${id}/valider`, repartition,{
//   headers: this.getAuthHeaders()
// });
//   }

  validerRecouvrement(id: number, repartition: { [risqueId: number]: number }): Observable<Recouvrement> {
    return this.http.post<Recouvrement>(`${this.apiUrl}/${id}/valider`, repartition, {
        headers: this.getAuthHeaders()
    }).pipe(
        catchError((error: HttpErrorResponse) => {
            // Vous pouvez transformer l'erreur ici si nécessaire
            return throwError(() => error);
        })
    );
}

  refuserRecouvrement(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/refuser`, {},{
  headers: this.getAuthHeaders()
});
  }
}
