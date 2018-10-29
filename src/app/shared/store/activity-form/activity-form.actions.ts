import { Activity } from '../../models/Activity';
import { HttpErrorResponse } from '@angular/common/http';
import { Organization } from '../../models/Organization';
import { Project } from '../../models/Project';
import { Role } from '../../models/Role';
import { ActivityFormValue } from 'src/app/modules/activities/pages/activity-form/activity-form.component';

export class SetFormDate {
  static readonly type = '[activity form store] Set Form Date';
  constructor(public date: Date) {}
}

export class SetFormActivity {
  static readonly type = '[activity form store] Set Form Activity';
  constructor(public activity: Activity) {}
}

export class SaveActivityRequest {
  static readonly type = '[activity form store] Save Activity Request';
  constructor(public activity: ActivityFormValue) {}
}

export class SaveActivitySuccess {
  static readonly type = '[activity form store] Save Activity Success';
  constructor(public activity: Activity) {}
}

export class SaveActivityError {
  static readonly type = '[activity form store] Save Activity Error';
  constructor(public error: HttpErrorResponse) {}
}

export class DeleteActivityRequest {
  static readonly type = '[activity form store] Delete Activity Request';
  constructor(public activity: ActivityFormValue) {}
}

export class DeleteActivitySuccess {
  static readonly type = '[activity form store] Delete Activity Success';
  constructor(public activity: Activity) {}
}

export class DeleteActivityError {
  static readonly type = '[activity form store] Delete Activity Error';
  constructor(public error: HttpErrorResponse) {}
}

export class ModifyActivityRequest {
  static readonly type = '[activity form store] Modify Activity Request';
  constructor(public activity: ActivityFormValue) {}
}

export class ModifyActivitySuccess {
  static readonly type = '[activity form store] Modify Activity Success';
  constructor(public activity: Activity) {}
}

export class ModifyActivityError {
  static readonly type = '[activity form store] Modify Activity Error';
  constructor(public error: HttpErrorResponse) {}
}

export class GetPreviousMonthActivitiesRequest {
  static readonly type =
    '[activity form store] Get Previous Month Activities Request';
  constructor(public date: Date) {}
}

export class GetPreviousMonthActivitiesSuccess {
  static readonly type =
    '[activity form store] Get Previous Month Activities Success';
  constructor(public activities: Activity[]) {}
}

export class GetPreviousMonthActivitiesError {
  static readonly type =
    '[activity form store] Get Previous Month Activities Error';
  constructor(public error: HttpErrorResponse) {}
}

export class GetOrganizationsRequest {
  static readonly type = '[activity form store] Get Organizations Request';
  constructor() {}
}

export class GetOrganizationsSuccess {
  static readonly type = '[activity form store] Get Organizations Success';
  constructor(public organizations: Organization[]) {}
}

export class GetOrganizationsError {
  static readonly type = '[activity form store] Get Organizations Error';
  constructor(public error: HttpErrorResponse) {}
}

export class UnsetOrganizations {
  static readonly type = '[activity form store] Unset Organizations';
  constructor() {}
}

export class GetProjectsByOrganizationIdRequest {
  static readonly type =
    '[activity form store] Get Projects By Organization Request';
  constructor(public id: number) {}
}

export class GetProjectsByOrganizationIdSuccess {
  static readonly type =
    '[activity form store] Get Projects By Organization Success';
  constructor(public projects: Project[]) {}
}

export class GetProjectsByOrganizationIdError {
  static readonly type =
    '[activity form store] Get Projects By Organization Error';
  constructor(public error: HttpErrorResponse) {}
}

export class UnsetProjects {
  static readonly type = '[activity form store] Unset Projects';
  constructor() {}
}

export class GetRolesByProjectIdRequest {
  static readonly type = '[activity form store] Get Roles By Project Request';
  constructor(public id: number) {}
}

export class GetRolesByProjectIdSuccess {
  static readonly type = '[activity form store] Get Roles By Project Success';
  constructor(public roles: Role[]) {}
}

export class GetRolesByProjectIdError {
  static readonly type = '[activity form store] Get Roles By Project Error';
  constructor(public error: HttpErrorResponse) {}
}

export class UnsetRoles {
  static readonly type = '[activity form store] Unset Roles';
  constructor() {}
}
