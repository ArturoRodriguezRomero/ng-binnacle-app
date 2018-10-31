import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFormComponent } from './activity-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeFormComponent } from '../../components/time-form/time-form.component';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxsModule } from '@ngxs/store';
import { ActivityFormState } from 'src/app/shared/store/activity-form/activity-form.state';
import { NotifierService } from 'angular-notifier';
import { notifierServiceStub } from 'src/app/core/services/__mocks__/notifier.service.stub';
import { ActivitiesState } from 'src/app/shared/store/activities/activities.state';
import { ModelsMock } from 'src/app/shared/__mocks__/models.mock';
import { of } from 'rxjs';
import { addHours, startOfHour, getHours } from 'date-fns';

describe('ActivityFormComponent', () => {
  let component: ActivityFormComponent;
  let fixture: ComponentFixture<ActivityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityFormComponent,
        TimeFormComponent,
        ProjectFormComponent,
        LoadingSpinnerComponent
      ],
      imports: [
        NgxsModule.forRoot([ActivityFormState, ActivitiesState]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        NgSelectModule
      ],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get activity form data from state if it exists', () => {
    const expected = { activity: ModelsMock.Activity, date: new Date() };
    spyOn(component.store, 'selectOnce').and.returnValue(of(expected));
    spyOn(component, 'fillInputsWithActivityValues').and.callThrough();

    component.ngOnInit();

    expect(component.activity).toEqual(expected.activity);
    expect(component.fillInputsWithActivityValues).toHaveBeenCalled();
    expect(component.isModifying).toEqual(true);
  });

  it('should get activity form data from state if it does not exists', () => {
    const expected = { activity: null, date: new Date() };
    spyOn(component.store, 'selectOnce').and.returnValue(of(expected));

    component.ngOnInit();

    expect(component.activity).toEqual({
      startDate: addHours(startOfHour(expected.date), getHours(new Date())),
      billable: false,
      description: '',
      duration: 60
    });
  });

  it('should fill inputs when #fillInputsWithActivityValues', () => {
    component.fillInputsWithActivityValues(ModelsMock.Activity);

    expect(component.formValue.startDate).toEqual(
      ModelsMock.Activity.startDate
    );
    expect(component.formValue.duration).toEqual(ModelsMock.Activity.duration);
    expect(component.formValue.billable).toEqual(ModelsMock.Activity.billable);
    expect(component.formValue.description).toEqual(
      ModelsMock.Activity.description
    );
    expect(component.formValue.roleId).toEqual(
      ModelsMock.Activity.projectRole.id
    );
  });

  it('should set time form when #onTimeFormChange', () => {
    component.onTimeFormChange({ startDate: new Date(), duration: 100 });

    expect(component.formValue.startDate).toEqual(new Date());
    expect(component.formValue.duration).toEqual(100);
  });

  it('should set time form when #onProjectRoleChange', () => {
    component.onProjectRoleChange({ roleId: 1 });

    expect(component.formValue.roleId).toEqual(1);
  });

  it('should show errors and scroll to invalid form if form is not valid', () => {
    spyOn(component, 'isFormValid').and.returnValue(false);
    spyOn(component, 'scrollToInvalidForm').and.callThrough();

    component.onSaveActivity();

    expect(component.showErrors).toEqual(true);
    expect(component.scrollToInvalidForm).toHaveBeenCalled();
  });

  it('should dispatch @Action(ModifyActivityRequest) if form is valid and #isModyfing', () => {
    component.activity = ModelsMock.Activity;
    component.isModifying = true;
    spyOn(component, 'isFormValid').and.returnValue(true);
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onSaveActivity();

    expect(component.formValue.id).toEqual(ModelsMock.Activity.id);
    expect(component.store.dispatch).toHaveBeenCalled();
  });

  it('should dispatch @Action(ModifyActivityRequest) if form is valid and #isModyfing is false', () => {
    component.activity = ModelsMock.Activity;
    component.isModifying = false;
    spyOn(component, 'isFormValid').and.returnValue(true);
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onSaveActivity();

    expect(component.store.dispatch).toHaveBeenCalled();
  });
});
