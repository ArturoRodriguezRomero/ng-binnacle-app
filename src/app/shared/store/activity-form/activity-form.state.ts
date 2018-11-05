import { Activity } from '../../models/Activity';
import { Organization } from '../../models/Organization';
import { Project } from '../../models/Project';
import { Role } from '../../models/Role';
import { State, Store, StateContext, Action } from '@ngxs/store';
import {
  SaveActivityRequest,
  SaveActivitySuccess,
  SaveActivityError,
  SetFormDate,
  SetFormActivity,
  GetOrganizationsRequest,
  GetOrganizationsSuccess,
  GetOrganizationsError,
  GetProjectsByOrganizationIdRequest,
  GetProjectsByOrganizationIdSuccess,
  GetProjectsByOrganizationIdError,
  GetRolesByProjectIdRequest,
  GetRolesByProjectIdSuccess,
  GetRolesByProjectIdError,
  UnsetRoles,
  UnsetProjects,
  UnsetOrganizations,
  GetPreviousMonthActivitiesRequest,
  GetPreviousMonthActivitiesSuccess,
  GetPreviousMonthActivitiesError,
  ModifyActivityRequest,
  ModifyActivitySuccess,
  ModifyActivityError,
  DeleteActivityRequest,
  DeleteActivitySuccess,
  DeleteActivityError
} from './activity-form.actions';
import { ErrorHandlerService } from 'src/app/core/handlers/error/error-handler.service';
import { ActivitiesService } from 'src/app/core/services/activities/activities.service';
import { OrganizationsService } from 'src/app/core/services/organizations/organizations.service';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { RolesService } from 'src/app/core/services/roles/roles.service';
import { subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { GetActivitiesByDatesRequest } from '../activities/activities.actions';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

export interface ActivityFormStateModel {
  date: Date;
  activity: Activity;

  databaseChangeLoading: boolean;

  previousMonthActivities: Activity[];
  previousMonthActivitiesLoading: boolean;

  organizations: Organization[];
  organizationsLoading: boolean;

  projects: Project[];
  projectsLoading: boolean;

  roles: Role[];
  rolesLoading: boolean;
}

@State<ActivityFormStateModel>({
  name: 'activityForm',
  defaults: {
    date: new Date(),
    activity: null,
    databaseChangeLoading: false,
    previousMonthActivities: [],
    previousMonthActivitiesLoading: false,
    organizations: [],
    organizationsLoading: false,
    projects: [],
    projectsLoading: false,
    roles: [],
    rolesLoading: false
  }
})
export class ActivityFormState {
  constructor(
    private store: Store,
    private router: Router,
    private activitiesService: ActivitiesService,
    private organizationsService: OrganizationsService,
    private projectsService: ProjectsService,
    private rolesService: RolesService,
    private errorHandlerService: ErrorHandlerService,
    private zone: NgZone
  ) {}

  @Action(SetFormDate)
  SetFormDate(
    stateContext: StateContext<ActivityFormStateModel>,
    action: SetFormDate
  ) {
    stateContext.patchState({ date: action.date });
  }

  @Action(SetFormActivity)
  SetFormActivity(
    stateContext: StateContext<ActivityFormStateModel>,
    action: SetFormActivity
  ) {
    stateContext.patchState({ activity: action.activity });
  }

  @Action(SaveActivityRequest)
  SaveActivityRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: SaveActivityRequest
  ) {
    stateContext.patchState({ databaseChangeLoading: true });
    this.activitiesService.saveNewActivity(action.activity).subscribe(
      activity => {
        this.store.dispatch(new SaveActivitySuccess(activity));
      },
      error => {
        this.store.dispatch(new SaveActivityError(error));
      }
    );
  }

  @Action(SaveActivitySuccess)
  SaveActivitySuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: SaveActivitySuccess
  ) {
    stateContext.patchState({ databaseChangeLoading: false });

    this.store.dispatch(
      new GetActivitiesByDatesRequest(
        startOfMonth(stateContext.getState().date),
        endOfMonth(stateContext.getState().date)
      )
    );
    this.zone.run(() => {
      this.router.navigate(['/activities']);
    });
  }

  @Action(SaveActivityError)
  SaveActivityError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: SaveActivityError
  ) {
    stateContext.patchState({ databaseChangeLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(ModifyActivityRequest)
  ModifyActivityRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: ModifyActivityRequest
  ) {
    stateContext.patchState({ databaseChangeLoading: true });
    this.activitiesService.modifyActivity(action.activity).subscribe(
      activity => {
        this.store.dispatch(new SaveActivitySuccess(activity));
      },
      error => {
        this.store.dispatch(new SaveActivityError(error));
      }
    );
  }

  @Action(ModifyActivitySuccess)
  ModifyActivitySuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: ModifyActivitySuccess
  ) {
    stateContext.patchState({ databaseChangeLoading: false });
    this.store.dispatch(
      new GetActivitiesByDatesRequest(
        startOfMonth(stateContext.getState().date),
        endOfMonth(stateContext.getState().date)
      )
    );
    this.zone.run(() => {
      this.router.navigate(['/activities']);
    });
  }

  @Action(ModifyActivityError)
  ModifyActivityError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: ModifyActivityError
  ) {
    stateContext.patchState({ databaseChangeLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(DeleteActivityRequest)
  DeleteActivityRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: DeleteActivityRequest
  ) {
    stateContext.patchState({ databaseChangeLoading: true });
    this.activitiesService.deleteActivity(action.activity).subscribe(
      activity => {
        this.store.dispatch(new SaveActivitySuccess(activity));
      },
      error => {
        this.store.dispatch(new SaveActivityError(error));
      }
    );
  }

  @Action(DeleteActivitySuccess)
  DeleteActivitySuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: DeleteActivitySuccess
  ) {
    stateContext.patchState({ databaseChangeLoading: false });
    this.store.dispatch(
      new GetActivitiesByDatesRequest(
        startOfMonth(stateContext.getState().date),
        endOfMonth(stateContext.getState().date)
      )
    );
    this.zone.run(() => {
      this.router.navigate(['/activities']);
    });
  }

  @Action(DeleteActivityError)
  DeleteActivityError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: DeleteActivityError
  ) {
    stateContext.patchState({ databaseChangeLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(GetPreviousMonthActivitiesRequest)
  GetPreviousMonthActivitiesRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetPreviousMonthActivitiesRequest
  ) {
    stateContext.patchState({
      previousMonthActivitiesLoading: true
    });
    this.activitiesService
      .getActivitiesByDates(
        subMonths(startOfMonth(action.date), 1),
        action.date
      )
      .subscribe(
        days => {
          this.store.dispatch(
            new GetPreviousMonthActivitiesSuccess(this.getActivities(days))
          );
        },
        error => {
          this.store.dispatch(new GetPreviousMonthActivitiesError(error));
        }
      );
  }

  @Action(GetPreviousMonthActivitiesSuccess)
  GetPreviousMonthActivitiesSuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetPreviousMonthActivitiesSuccess
  ) {
    stateContext.patchState({
      previousMonthActivitiesLoading: false,
      previousMonthActivities: action.activities
    });
  }

  getActivities(days: Array<any>) {
    return days.reduce((allActivities, activity) => {
      return [...allActivities, ...activity.activities];
    }, []);
  }

  @Action(GetPreviousMonthActivitiesError)
  GetPreviousMonthActivitiesError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetPreviousMonthActivitiesError
  ) {
    stateContext.patchState({ previousMonthActivitiesLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(GetOrganizationsRequest)
  GetOrganizationsRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetOrganizationsRequest
  ) {
    stateContext.patchState({
      organizationsLoading: true
    });
    this.organizationsService.getAll().subscribe(
      organizations => {
        this.store.dispatch(new GetOrganizationsSuccess(organizations));
      },
      error => {
        this.store.dispatch(new GetOrganizationsError(error));
      }
    );
  }

  @Action(GetOrganizationsSuccess)
  GetOrganizationsSuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetOrganizationsSuccess
  ) {
    stateContext.patchState({
      organizationsLoading: false,
      organizations: action.organizations
    });
  }

  @Action(GetOrganizationsError)
  GetOrganizationsError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetOrganizationsError
  ) {
    stateContext.patchState({ organizationsLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(UnsetOrganizations)
  UnsetOrganizations(
    stateContext: StateContext<ActivityFormStateModel>,
    action: UnsetOrganizations
  ) {
    stateContext.patchState({ organizations: [] });
  }

  @Action(GetProjectsByOrganizationIdRequest)
  GetProjectsByOrganizationIdRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetProjectsByOrganizationIdRequest
  ) {
    stateContext.patchState({
      projectsLoading: true
    });
    this.projectsService.getByOrganizationId(action.id).subscribe(
      projects => {
        this.store.dispatch(new GetProjectsByOrganizationIdSuccess(projects));
      },
      error => {
        this.store.dispatch(new GetProjectsByOrganizationIdError(error));
      }
    );
  }

  @Action(GetProjectsByOrganizationIdSuccess)
  GetProjectsByOrganizationIdSuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetProjectsByOrganizationIdSuccess
  ) {
    stateContext.patchState({
      projectsLoading: false,
      projects: action.projects
    });
  }

  @Action(GetProjectsByOrganizationIdError)
  GetProjectsByOrganizationIdError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetProjectsByOrganizationIdError
  ) {
    stateContext.patchState({ projectsLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(UnsetProjects)
  UnsetProjects(
    stateContext: StateContext<ActivityFormStateModel>,
    action: UnsetProjects
  ) {
    stateContext.patchState({ projects: [] });
  }

  @Action(GetRolesByProjectIdRequest)
  GetRolesByProjectIdRequest(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetRolesByProjectIdRequest
  ) {
    stateContext.patchState({
      rolesLoading: true
    });
    this.rolesService.getByProjectId(action.id).subscribe(
      roles => {
        this.store.dispatch(new GetRolesByProjectIdSuccess(roles));
      },
      error => {
        this.store.dispatch(new GetRolesByProjectIdError(error));
      }
    );
  }

  @Action(GetRolesByProjectIdSuccess)
  GetRolesByProjectIdSuccess(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetRolesByProjectIdSuccess
  ) {
    stateContext.patchState({
      rolesLoading: false,
      roles: action.roles
    });
  }

  @Action(GetRolesByProjectIdError)
  GetRolesByProjectIdError(
    stateContext: StateContext<ActivityFormStateModel>,
    action: GetRolesByProjectIdError
  ) {
    stateContext.patchState({ rolesLoading: false });
    this.errorHandlerService.throw(action.error);
  }

  @Action(UnsetRoles)
  UnsetRoles(
    stateContext: StateContext<ActivityFormStateModel>,
    action: UnsetRoles
  ) {
    stateContext.patchState({ roles: [] });
  }
}
