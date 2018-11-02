import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Activity } from 'src/app/shared/models/Activity';
import { Store, Select } from '@ngxs/store';
import { ActivityFormStateModel } from 'src/app/shared/store/activity-form/activity-form.state';
import { startOfHour, addHours, getHours } from 'date-fns';
import { Observable } from 'rxjs';
import { TimeFormOutputModel } from '../../components/time-form/time-form.component';
import { ProjectFormOutputModel } from '../../components/project-form/project-form.component';
import {
  SaveActivityRequest,
  ModifyActivityRequest,
  DeleteActivityRequest
} from 'src/app/shared/store/activity-form/activity-form.actions';

export class ActivityFormValue {
  id?: number;
  startDate: Date;
  duration: number;
  description: string = '';
  roleId: number;
  billable: boolean = false;
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

  @ViewChild('timeForm')
  timeForm: ElementRef;

  @ViewChild('descriptionForm')
  descriptionForm: ElementRef;

  @ViewChild('projectForm')
  projectForm: ElementRef;

  showErrors: boolean = false;
  showDeleteCard: boolean = false;

  constructor(public store: Store) {}

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
          this.getLastImputedActivity();
        } else {
          this.isModifying = true;
          this.activity = activityFormState.activity;
          this.fillInputsWithActivityValues(this.activity);
        }
      });
  }

  getLastImputedActivity() {
    this.store
      .selectOnce(state => state.activities.activities)
      .subscribe((activities: Array<Activity>) => {
        if (activities.length > 0) {
          const lastActivity = activities[activities.length - 1];
          lastActivity.startDate = addHours(
            startOfHour(this.date),
            getHours(new Date())
          );
          lastActivity.duration = 60;
          lastActivity.description = '';
          this.activity = lastActivity;
          this.fillInputsWithActivityValues(this.activity);
        } else {
          this.activity = {
            startDate: addHours(startOfHour(this.date), getHours(new Date())),
            billable: false,
            description: '',
            duration: 60
          };
        }
      });
  }

  fillInputsWithActivityValues(activity: Activity) {
    this.formValue.startDate = activity.startDate;
    this.formValue.duration = activity.duration;
    this.formValue.billable = activity.billable;
    this.formValue.description = activity.description;
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
    if (this.isFormValid()) {
      if (this.isModifying) {
        this.formValue.id = this.activity.id;
        this.store.dispatch(new ModifyActivityRequest(this.formValue));
      } else {
        this.store.dispatch(new SaveActivityRequest(this.formValue));
      }
    } else {
      this.showErrors = true;
      this.scrollToInvalidForm();
    }
  }

  onDeleteButton() {
    this.showDeleteCard = true;
  }

  onDeleteActivity() {
    this.formValue.id = this.activity.id;
    this.store.dispatch(new DeleteActivityRequest(this.formValue));
  }

  hideDeleteCard() {
    this.showDeleteCard = false;
  }

  scrollToInvalidForm() {
    let element;
    if (!this.isRoleValid()) {
      element = this.projectForm.nativeElement;
    }
    if (!this.isDescriptionValid()) {
      element = this.descriptionForm.nativeElement;
    }

    if (!this.isDurationValid()) {
      element = this.timeForm.nativeElement;
    }
    this.scrollToElement(element);
  }

  isFormValid() {
    return (
      this.formValue.startDate &&
      this.isDurationValid() &&
      this.isDescriptionValid() &&
      this.isRoleValid()
    );
  }

  scrollToElement(element) {
    window.scrollTo({
      top: element.offsetTop - 50,
      behavior: 'smooth'
    });
  }

  isDurationValid() {
    return this.formValue.duration > 0;
  }

  isDescriptionValid() {
    return this.formValue.description != '';
  }

  isRoleValid() {
    return this.formValue.roleId;
  }
}
