import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/shared/models/Organization';
import { Project } from 'src/app/shared/models/Project';
import { Role } from 'src/app/shared/models/Role';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivitiesStateModel } from 'src/app/shared/store/activities/activities.state';
import {
  GetPreviousMonthActivitiesRequest,
  GetOrganizationsRequest,
  GetProjectsByOrganizationIdRequest,
  GetRolesByProjectIdRequest,
  UnsetProjects,
  UnsetRoles
} from 'src/app/shared/store/activity-form/activity-form.actions';
import { take } from 'rxjs/operators';

export interface ProjectFormOutputModel {
  organizationId: number;
  projectId: number;
  roleId: number;
}

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Input()
  date: Date;
  @Input()
  activityProjectRole: Role;

  @Output()
  onChange = new EventEmitter<ProjectFormOutputModel>();

  @Select(state => state.activityForm.organizations)
  organizations$: Observable<Organization[]>;
  @Select(state => state.activityForm.organizationsLoading)
  organizationsLoading$: Observable<boolean>;

  @Select(state => state.activityForm.projects)
  projects$: Observable<Project[]>;
  @Select(state => state.activityForm.projectsLoading)
  projectsLoading$: Observable<boolean>;

  @Select(state => state.activityForm.roles)
  roles$: Observable<Role[]>;
  @Select(state => state.activityForm.rolesLoading)
  rolesLoading$: Observable<boolean>;

  @Select(state => state.activityForm.previousMonthActivitiesLoading)
  previousMonthActivitiesLoading$: Observable<boolean>;

  previousMonthActivities: Activity[];

  recentProjectRoles: Role[];

  organizationId: number;
  projectId: number;
  roleId: number;

  constructor(private store: Store) {}

  ngOnInit() {
    this.getOrganizations();
    this.getPreviousMonthActivities();
  }

  getPreviousMonthActivities() {
    console.warn('ESTO SE LLAMA NG ON INIT');
    this.store
      .selectOnce(state => state.activities)
      .subscribe((activitiesState: ActivitiesStateModel) => {
        console.warn('STATE SELECT ONE ACTIVITIES SUBSCRIBE');
        const totalActivitiesAmount = this.getTotalAmountOfActivities(
          activitiesState.activities
        );
        if (this.areThereEnoughActivities(totalActivitiesAmount)) {
          this.setPreviousMonthActivitiesFromServer();
        } else {
          this.setPreviousMonthActivitiesFromLocalState(
            activitiesState.activities
          );
        }
      });
  }

  setPreviousMonthActivitiesFromLocalState(activities) {
    this.previousMonthActivities = activities;
    this.recentProjectRoles = this.getRecentProjectRoles(activities);
    console.log('local state', this.recentProjectRoles, 'from', activities);
    if (this.activityProjectRole) {
      this.setProyectControlsValue();
    }
  }

  setPreviousMonthActivitiesFromServer() {
    console.warn('set Previous Month Activities From Server');
    this.store.dispatch(new GetPreviousMonthActivitiesRequest(this.date));

    this.store
      .select(state => state.activityForm.previousMonthActivities)
      .pipe(take(2))
      .subscribe(activities => {
        console.warn('STATE ACTIVITY FORM PREVIOUS MONTH SELECT');
        this.previousMonthActivities = activities;
        this.recentProjectRoles = this.getRecentProjectRoles(activities);
        console.log('server ', this.recentProjectRoles, 'from', activities);
        if (this.activityProjectRole) {
          this.setProyectControlsValue();
        }
      });
  }

  setProyectToLastImputedActivity(activities: Array<any>) {
    const allActivities = this.getAllActivities(activities);
    const lastImputedActivity = this.getLastImputedActivity(allActivities);

    this.activityProjectRole = lastImputedActivity.projectRole;
    this.roleId = lastImputedActivity.projectRole.id;
    this.projectId = lastImputedActivity.projectRole.project.id;
    this.organizationId =
      lastImputedActivity.projectRole.project.organization.id;

    this.setProyectControlsValue();
  }

  setProyectControlsValue() {
    this.organizationId = this.activityProjectRole.project.organization.id;

    this.getProjectsByOrganizationId();

    this.projectId = this.activityProjectRole.project.id;

    this.getRolesByProjectId();

    this.roleId = this.activityProjectRole.id;

    this.notifyParent();
  }

  getRecentProjectRoles(activities: Array<any>) {
    const allActivities = this.getAllActivities(activities);

    const projectRoles = allActivities.reduce((projectRoles, activity) => {
      return [...projectRoles, ...activity.projectRole];
    }, []);

    const uniqueProjectRoles = this.removeDuplicates(projectRoles, 'id');

    return uniqueProjectRoles;
  }

  getAllActivities(activities: Array<any>) {
    return activities.reduce((allActivities, activity) => {
      return [...allActivities, ...activity.activities];
    }, []);
  }

  getLastImputedActivity(activities: Array<any>): Activity {
    return activities[activities.length - 1];
  }

  getTotalAmountOfActivities(activities) {
    return activities.reduce(
      (totalActivities, activity) =>
        totalActivities + activity.activities.length,
      0
    );
  }

  onShortcutClick(role: Role) {
    if (role.id != this.roleId) {
      this.roleId = role.id;
      this.projectId = role.project.id;
      this.organizationId = role.project.organization.id;

      this.getRolesByProjectId();
      this.getProjectsByOrganizationId();

      this.notifyParent();
    }
  }

  onOrganizationChange(organization) {
    if (this.hasSelectedAValue(organization)) {
      this.organizationId = organization.id;
      this.getProjectsByOrganizationId();
    }
    this.unsetRoles();
    this.unsetProjects();
    this.notifyParent();
  }

  onProjectChange(project) {
    if (this.hasSelectedAValue(project)) {
      this.projectId = project.id;
      this.getRolesByProjectId();
    }
    this.unsetRoles();
    this.notifyParent();
  }

  onRoleChange(role) {
    if (this.hasSelectedAValue(role)) {
      this.roleId = role.id;
    }
    this.notifyParent();
  }

  getProjectsByOrganizationId() {
    this.store.dispatch(
      new GetProjectsByOrganizationIdRequest(this.organizationId)
    );
  }

  getRolesByProjectId() {
    this.store.dispatch(new GetRolesByProjectIdRequest(this.projectId));
  }

  unsetProjects() {
    this.projectId = null;
    this.store.dispatch(new UnsetProjects());
  }

  unsetRoles() {
    this.roleId = null;
    this.store.dispatch(new UnsetRoles());
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  areThereEnoughActivities(amount: number) {
    return amount < 10;
  }

  hasSelectedAValue(event) {
    return event != undefined;
  }

  getOrganizations() {
    this.store.dispatch(new GetOrganizationsRequest());
  }

  notifyParent() {
    this.onChange.emit({
      projectId: this.projectId,
      organizationId: this.organizationId,
      roleId: this.roleId
    });
  }
}
