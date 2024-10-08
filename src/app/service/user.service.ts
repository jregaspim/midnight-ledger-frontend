import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8082/api/v1/user/current-user';

  constructor(private http: HttpClient) { }

  token: string = "";

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Include the token as a Bearer token
    });
  }

  getCurrentUser(token: string): Observable<User> {
    this.token = token;
    return this.http.get<User>(this.apiUrl, { headers: this.getAuthHeaders() });
  }


}
