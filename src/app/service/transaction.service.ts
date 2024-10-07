import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyData, TransactionReponse } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8082/api/v1/transactions';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    // Retrieve the token from localStorage (or another secure location)
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token as a Bearer token
    });
  }

  getAllTransactionByType(transactionType: string): Observable<any> {
    return this.http.get(this.apiUrl + "/" + transactionType, { headers: this.getAuthHeaders() });
  }

  getYearlyData(year: string): Observable<MonthlyData> {
    return this.http.get<MonthlyData>(this.apiUrl + "/year/" + year, { headers: this.getAuthHeaders() });
  }

  getAllTransaction(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getTopTransaction(transactionType: string): Observable<any> {
    return this.http.get(this.apiUrl + "/top/" + transactionType, { headers: this.getAuthHeaders() });
  }

  saveTransaction(transaction: any): Observable<any> {
    return this.http.post(this.apiUrl, transaction, { headers: this.getAuthHeaders() });
  }

  getMonthlyTransactionData(transactionType: string, year: number, month: number): Observable<{ [key: string]: string }> {
    const url = `${this.apiUrl}/${transactionType}/by-date`;
    let params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());

    return this.http.get<{ [key: string]: string }>(url, { headers: this.getAuthHeaders(), params });
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

}
