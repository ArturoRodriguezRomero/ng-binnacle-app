import { Activity } from './Activity';

export interface ActivityDay {
  date: Date;
  activities: Activity[];
  total_hours: number;
}
