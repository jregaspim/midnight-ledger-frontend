import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialGoalRequest, SavingProgressResponse } from '../model/financial-goal.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialGoalService {

  private apiUrl = 'http://localhost:8082/api/v1/financial-goal';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    // Retrieve the token from localStorage (or another secure location)
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token as a Bearer token
    });
  }

  getAllFinancialGoal(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getAllFinancialGoalSavingProgressTotalPerMonth(): Observable<SavingProgressResponse> {
    return this.http.get<SavingProgressResponse>(`${this.apiUrl}/savings-progress`, { headers: this.getAuthHeaders() });
  }

  saveFinancialGoal(financialGoal: FinancialGoalRequest): Observable<any> {
    return this.http.post(this.apiUrl, financialGoal, { headers: this.getAuthHeaders() });
  }

  updateCurrentAmount(id: number, currentAmount: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/updateCurrentAmount`, { currentAmount }, { headers: this.getAuthHeaders() });
  }
}
