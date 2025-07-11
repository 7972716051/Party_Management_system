import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './app/model/user';


@Injectable({
  providedIn: 'root'
})
// auth.service.ts
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<User> {
    const url = `${this.apiUrl}/login?username=${credentials.username}&password=${credentials.password}`;
    return this.http.get<User>(url);
  }

  setUsername(username: string) {
    localStorage.setItem('loggedInUser', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('loggedInUser');
  }
}