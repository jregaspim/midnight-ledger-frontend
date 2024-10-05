import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8082/api/v1/transactions';

  constructor(private http: HttpClient) { }

  getAllTransactionByType(transactionType: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + "/" + transactionType, { headers });
  }

  getAllTransaction(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  saveTransaction(transaction: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, transaction, { headers });
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
