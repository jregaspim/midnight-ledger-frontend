import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecurringTransactionService {

  private apiUrl = 'http://localhost:8082/api/v1/recurring-transactions';

  constructor(private http: HttpClient) { }

  getAllRecurringTransaction(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  saveRecurringTransaction(recurringTransaction: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, recurringTransaction, { headers });
  }

  deleteRecurringTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
