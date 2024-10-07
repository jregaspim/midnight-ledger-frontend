import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecurringTransactionService {

  private apiUrl = 'http://localhost:8082/api/v1/recurring-transactions';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    // Retrieve the token from localStorage (or another secure location)
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token as a Bearer token
    });
  }

  getAllRecurringTransaction(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  saveRecurringTransaction(recurringTransaction: any): Observable<any> {
    return this.http.post(this.apiUrl, recurringTransaction, { headers: this.getAuthHeaders() });
  }

  deleteRecurringTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

}
