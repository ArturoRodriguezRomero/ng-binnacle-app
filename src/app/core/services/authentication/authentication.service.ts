import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../../shared/models/Credentials';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse } from 'src/app/shared/models/AuthenticationResponse';
import { Endpoints } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authentication: AuthenticationResponse;

  constructor(private http: HttpClient) {}

  tryAuthenticate(credentials: Credentials) {
    const data = `username=${credentials.username}&password=${
      credentials.password
    }&grant_type=password`;

    return this.http.post(`${Endpoints.Authentication.getToken()}`, data, {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(
          environment.clientId + ':' + environment.clientSecret
        )}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  tryRefreshAuthentication() {
    const data = `grant_type=refresh_token&refresh_token=${
      this.authentication.refresh_token
    }`;
    return this.http.post(`${Endpoints.Authentication.getToken()}`, data, {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(
          environment.clientId + ':' + environment.clientSecret
        )}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  getAuthentication() {
    return this.authentication;
  }

  setAuthentication(authentication: AuthenticationResponse) {
    this.authentication = authentication;
  }
}
