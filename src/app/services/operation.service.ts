import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Operation } from '../model/operation.model';


@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private apiUrl = `${environment.apiBaseUrl}/api/operations`;

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

  getAllOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  createOperation(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(this.apiUrl, operation, {
      headers: this.getAuthHeaders()
    });
  }

  getOperationById(id: number): Observable<Operation> {
    return this.http.get<Operation>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getOperationsByRisque(risqueId: number): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.apiUrl}/risque/${risqueId}`, {
      headers: this.getAuthHeaders()
    });
  }


  updateOperation(id: number, operation: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${this.apiUrl}/${id}`, operation, {
      headers: this.getAuthHeaders()
    });
  }

  deleteOperation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}