import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt } from '../model/debt.model';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private apiUrl = 'http://localhost:8082/api/v1/debts'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    // Retrieve the token from localStorage (or another secure location)
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token as a Bearer token
    });
  }


  getDebts(): Observable<Debt[]> {
    return this.http.get<Debt[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createDebt(debt: Debt): Observable<any> {
    return this.http.post(this.apiUrl, debt, { headers: this.getAuthHeaders() });
  }

  deleteDebt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
