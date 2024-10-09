import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserSettings } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = 'http://localhost:8082/api/v1/app-settings';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getAppSettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  saveAppSettings(userSettings: UserSettings): Observable<void> {
    return this.http.post<void>(this.apiUrl, userSettings, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
