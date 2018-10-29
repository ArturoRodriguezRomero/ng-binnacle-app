import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from 'src/app/shared/models/Organization';
import { Endpoints } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Array<Organization>>(Endpoints.Organizations.getAll());
  }
}
