import { Project } from './Project';

export interface Role {
  id: number;
  name: string;
  project: Project;
}
