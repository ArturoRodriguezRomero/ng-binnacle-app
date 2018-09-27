import { Organization } from './Organization';

export interface Project {
  id: number;
  name: string;
  open: boolean;
  organization: Organization;
}
