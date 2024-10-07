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

  getAllFinancialGoal(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  getAllFinancialGoalSavingProgressTotalPerMonth(): Observable<SavingProgressResponse> {
    return this.http.get<SavingProgressResponse>(this.apiUrl + '/savings-progress');
  }

  saveFinancialGoal(financialGoal: FinancialGoalRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, financialGoal, { headers });
  }

  updateCurrentAmount(id: number, currentAmount: number) {
    return this.http.patch(this.apiUrl + '/' + id + '/updateCurrentAmount', { currentAmount });
  }

}
