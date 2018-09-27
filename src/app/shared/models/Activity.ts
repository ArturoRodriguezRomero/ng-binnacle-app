import { Role } from './Role';

export interface Activity {
  id?: number;
  startDate: Date;
  duration: number;
  description: string;
  projectRole?: Role;
  userId?: number;
  billable: boolean;
}
