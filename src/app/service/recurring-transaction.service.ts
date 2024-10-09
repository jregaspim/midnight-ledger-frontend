import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecurringTransactionRequest } from '../model/recurring-transaction.model';

@Injectable({
  providedIn: 'root',
})
export class RecurringTransactionService {
  private apiUrl = 'http://localhost:8082/api/v1/recurring-transactions';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllRecurringTransactions(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  saveRecurringTransaction(recurringTransaction: RecurringTransactionRequest): Observable<RecurringTransactionRequest> {
    return this.http.post<RecurringTransactionRequest>(this.apiUrl, recurringTransaction, { headers: this.getAuthHeaders() });
  }

  deleteRecurringTransaction(id: number): Observable<void> { // Specify return type
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
