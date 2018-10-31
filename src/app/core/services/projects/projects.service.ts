import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Project } from 'src/app/shared/models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getByOrganizationId(id: number) {
    return this.http.get<Array<Project>>(
      Endpoints.Projects.getByOrganziationId(id)
    );
  }
}
