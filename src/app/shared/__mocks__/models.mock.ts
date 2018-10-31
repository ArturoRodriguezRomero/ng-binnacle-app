import { Activity } from '../models/Activity';

export namespace ModelsMock {
  export const Credentials = {
    username: 'username',
    password: 'password'
  };

  export const User = {
    id: 1,
    login: 'login',
    name: 'name'
  };

  export const Organization = {
    id: 1,
    name: 'name'
  };

  export const Project = {
    id: 1,
    name: 'name',
    open: true,
    organization: Organization
  };

  export const Role = {
    id: 1,
    name: 'name',
    project: Project
  };

  export const Activity = {
    id: 1,
    startDate: new Date(),
    duration: 60,
    description: 'description',
    projectRole: Role,
    userId: 1,
    billable: true
  };

  export const ActivityDay = {
    activities: [Activity, Activity, Activity],
    date: new Date(),
    total_hours: 1
  };

  export const PrivateHoliday = {
    beginDate: new Date(),
    finalDate: new Date(),
    state: 'ACCEPTED',
    userId: 1
  };

  export const PublicHoliday = {
    date: new Date(),
    description: 'description'
  };
}
