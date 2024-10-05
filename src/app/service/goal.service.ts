import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialGoalRequest } from '../model/financial-goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {


  private apiUrl = 'http://localhost:8082/api/v1/financial-goal';

  constructor(private http: HttpClient) { }

  getAllFinancialGoal(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  saveFinancialGoal(financialGoal: FinancialGoalRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, financialGoal, { headers });
  }

  updateCurrentAmount(id: number, currentAmount: number) {
    return this.http.patch(this.apiUrl + '/' + id + '/updateCurrentAmount', { currentAmount });
  }

}
