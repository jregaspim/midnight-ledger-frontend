import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialGoalRequest, FinancialGoalResponse, SavingProgressResponse } from '../model/financial-goal.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialGoalService {
  private apiUrl = 'http://localhost:8082/api/v1/financial-goal';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || ''; // Provide a default value to prevent errors
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllFinancialGoals(): Observable<any> { // Updated method name for clarity
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getAllFinancialGoalSavingProgressTotalPerMonth(): Observable<SavingProgressResponse> {
    return this.http.get<SavingProgressResponse>(`${this.apiUrl}/savings-progress`, { headers: this.getAuthHeaders() });
  }

  saveFinancialGoal(financialGoal: FinancialGoalRequest): Observable<FinancialGoalResponse> { // Specify return type
    return this.http.post<FinancialGoalResponse>(this.apiUrl, financialGoal, { headers: this.getAuthHeaders() });
  }

  updateCurrentAmount(id: number, currentAmount: number): Observable<void> { // Specify return type
    return this.http.patch<void>(`${this.apiUrl}/${id}/updateCurrentAmount`, { currentAmount }, { headers: this.getAuthHeaders() });
  }
}
