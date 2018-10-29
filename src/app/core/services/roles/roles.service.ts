import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Role } from 'src/app/shared/models/Role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getByProjectId(id: number) {
    return this.http.get<Array<Role>>(Endpoints.Roles.getByProjectId(id));
  }
}
