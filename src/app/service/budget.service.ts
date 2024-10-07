import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetRequest } from '../model/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private apiUrl = 'http://localhost:8082/api/v1/budget';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    // Retrieve the token from localStorage (or another secure location)
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token as a Bearer token
    });
  }

  getAllBudget(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  saveBudget(budget: BudgetRequest): Observable<any> {
    return this.http.post(this.apiUrl, budget, { headers: this.getAuthHeaders() });
  }
}
