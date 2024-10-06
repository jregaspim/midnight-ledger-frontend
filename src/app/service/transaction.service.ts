import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionReponse } from '../model/transaction.model';

interface MonthlyData {
  EXPENSES: [];
  INCOME: [];
}
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

  getYearlyData(year: string): Observable<MonthlyData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<MonthlyData>(this.apiUrl + "/year/" + year, { headers });
  }

  getAllTransaction(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  saveTransaction(transaction: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, transaction, { headers });
  }

  getMonthlyTransactionData(transactionType: string, year: number, month: number): Observable<{ [key: string]: string }> {

    const url = `${this.apiUrl}/${transactionType}/by-date`;

    let params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());

    return this.http.get<{ [key: string]: string }>(url, { params });

  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
