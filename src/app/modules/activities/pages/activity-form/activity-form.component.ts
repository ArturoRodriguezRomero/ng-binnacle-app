import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/models/Activity';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select, Actions } from '@ngxs/store';
import { ActivityFormStateModel } from 'src/app/shared/store/activity-form/activity-form.state';
import {
  startOfHour,
  addHours,
  getHours,
  startOfMonth,
  endOfMonth
} from 'date-fns';
import { Observable } from 'rxjs';
import { TimeFormOutputModel } from '../../components/time-form/time-form.component';
import { ProjectFormOutputModel } from '../../components/project-form/project-form.component';
import {
  SaveActivityRequest,
  ModifyActivityRequest,
  DeleteActivityRequest
} from 'src/app/shared/store/activity-form/activity-form.actions';
import { GetActivitiesByDatesRequest } from 'src/app/shared/store/activities/activities.actions';

export class ActivityFormValue {
  id?: number;
  startDate: Date;
  duration: number;
  description: string;
  //projectId: number;
  roleId: number;
  //organizationId: number;
  billable: boolean;
}

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  date: Date;
  activity: Activity;

  isModifying: boolean = false;

  @Select(state => state.activityForm.databaseChangeLoading)
  databaseChangeLoading$: Observable<boolean>;

  formValue: ActivityFormValue = new ActivityFormValue();

  constructor(private store: Store) {}

  ngOnInit() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    this.getFormDataFromState();
  }

  getFormDataFromState() {
    this.store
      .selectOnce(state => state.activityForm)
      .subscribe((activityFormState: ActivityFormStateModel) => {
        this.date = activityFormState.date;
        if (activityFormState.activity == null) {
          this.activity = {
            startDate: addHours(startOfHour(this.date), getHours(new Date())),
            billable: false,
            description: '',
            duration: 60
          };
        } else {
          this.isModifying = true;
          this.activity = activityFormState.activity;
        }
        if (this.isModifying) {
          this.fillInputsWithActivityValues(this.activity);
        }
      });
  }

  fillInputsWithActivityValues(activity: Activity) {
    this.formValue.startDate = activity.startDate;
    this.formValue.duration = activity.duration;
    this.formValue.billable = activity.billable;
    this.formValue.description = activity.description;
    activity.projectRole.project.organization.id;
    this.formValue.roleId = activity.projectRole.id;
  }

  onTimeFormChange(timeFormOutput: TimeFormOutputModel) {
    this.formValue.startDate = timeFormOutput.startDate;
    this.formValue.duration = timeFormOutput.duration;
  }

  onProjectRoleChange(projectFormOutput: ProjectFormOutputModel) {
    this.formValue.roleId = projectFormOutput.roleId;
  }

  onSaveActivity() {
    console.log(this.formValue);
    if (this.isModifying) {
      this.formValue.id = this.activity.id;
      this.store.dispatch(new SaveActivityRequest(this.formValue));
    } else {
      this.store.dispatch(new ModifyActivityRequest(this.formValue));
    }
  }

  onDeleteActivity() {
    this.formValue.id = this.activity.id;
    this.store.dispatch(new DeleteActivityRequest(this.formValue));
  }

  isFormValid() {
    return true;
  }
}
