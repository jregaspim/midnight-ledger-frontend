import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserSettings } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = 'http://localhost:8082/api/v1/app-settings';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAppSettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  saveAppSettings(userSettings: UserSettings): Observable<any> {
    return this.http.post(this.apiUrl, userSettings, { headers: this.getAuthHeaders() });
  }

}
