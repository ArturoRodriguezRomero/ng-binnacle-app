import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from 'src/app/shared/models/Organization';
import { Endpoints } from '../endpoints';
import { Project } from 'src/app/shared/models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getByOrganization(id: number) {
    return this.http.get<Array<Project>>(
      Endpoints.Projects.getByOrganziationId(id)
    );
  }
}
