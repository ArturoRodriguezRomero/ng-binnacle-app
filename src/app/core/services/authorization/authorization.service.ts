import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../../../shared/models/Credentials';
import { User } from '../../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private endpoint = 'user';
  private token = '';

  constructor(private http: HttpClient) {}

  checkUser(credentials: Credentials) {
    const token = btoa(credentials.username + ':' + credentials.password);
    this.token = token;
    return this.http.post<User>(this.endpoint, this.token);
  }

  getToken() {
    return this.token;
  }
}
