import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ActivityFormState } from 'src/app/shared/store/activity-form/activity-form.state';
import { ActivitiesState } from 'src/app/shared/store/activities/activities.state';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { notifierServiceStub } from 'src/app/core/services/__mocks__/notifier.service.stub';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GetOrganizationsRequest,
  GetRolesByProjectIdRequest,
  GetProjectsByOrganizationIdRequest,
  UnsetRoles,
  UnsetProjects
} from 'src/app/shared/store/activity-form/activity-form.actions';
import { ModelsMock } from 'src/app/shared/__mocks__/models.mock';
import { of } from 'rxjs';
import { Role } from 'src/app/shared/models/Role';
import { Organization } from 'src/app/shared/models/Organization';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectFormComponent, LoadingSpinnerComponent],
      imports: [
        RouterTestingModule,
        NgSelectModule,
        FormsModule,
        NgxsModule.forRoot([ActivityFormState, ActivitiesState]),
        HttpClientModule
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
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch @Action(GetOrganizations) @onNgInit', () => {
    spyOn(component.store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetOrganizationsRequest()
    );
  });

  it('should get activities from the state if there are enough', () => {
    component.neededActivitiesAmount = 1;
    spyOn(component.store, 'selectOnce').and.returnValue(
      of({ activities: [ModelsMock.ActivityDay, ModelsMock.ActivityDay] })
    );
    spyOn(
      component,
      'setPreviousMonthActivitiesFromLocalState'
    ).and.callThrough();

    component.getPreviousMonthActivities();

    expect(
      component.setPreviousMonthActivitiesFromLocalState
    ).toHaveBeenCalled();
  });

  it('should get activities from server if there are not enough in the state', () => {
    component.neededActivitiesAmount = 10;
    spyOn(component.store, 'selectOnce').and.returnValue(
      of({ activities: [ModelsMock.ActivityDay, ModelsMock.ActivityDay] })
    );
    spyOn(component, 'setPreviousMonthActivitiesFromServer').and.callThrough();

    component.getPreviousMonthActivities();

    expect(component.setPreviousMonthActivitiesFromServer).toHaveBeenCalled();
  });

  it('should return correct recent project roles getRecentProjectRoles()', () => {});

  it('should select role correctly #onShortcurClick', () => {
    const expected = { id: 1, project: { id: 1, organization: { id: 1 } } };
    component.roleId = 5;
    spyOn(component.store, 'dispatch').and.callThrough();
    spyOn(component, 'notifyParent').and.callThrough();

    component.onShortcutClick(<Role>expected);

    expect(component.roleId).toEqual(expected.id);
    expect(component.projectId).toEqual(expected.project.id);
    expect(component.organizationId).toEqual(expected.project.organization.id);

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetProjectsByOrganizationIdRequest(expected.project.organization.id)
    );

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetRolesByProjectIdRequest(expected.project.id)
    );

    expect(component.notifyParent).toHaveBeenCalled();
  });

  it('should select organization and un-select project and role #onOrganizationChange()', () => {
    const expected = { id: 1 };
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onOrganizationChange(expected);

    expect(component.organizationId).toEqual(expected.id);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetProjectsByOrganizationIdRequest(expected.id)
    );
    expect(component.store.dispatch).toHaveBeenCalledWith(new UnsetRoles());
    expect(component.store.dispatch).toHaveBeenCalledWith(new UnsetProjects());
  });

  it('should select project and un-select role #onProjectChange()', () => {
    const expected = { id: 1 };
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onProjectChange(expected);

    expect(component.projectId).toEqual(expected.id);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetRolesByProjectIdRequest(expected.id)
    );
    expect(component.store.dispatch).toHaveBeenCalledWith(new UnsetRoles());
  });

  it('should set roleId to role #onRoleChange', () => {
    const expected = { id: 1 };

    component.onRoleChange(expected);

    expect(component.roleId).toEqual(expected.id);
  });

  it('should #notifyParent() #onOrganizationChange()', () => {
    const expected = { id: 1 };
    spyOn(component, 'notifyParent').and.callThrough();

    component.onOrganizationChange(expected);

    expect(component.notifyParent).toHaveBeenCalled();
  });

  it('should #notifyParent() #onProjectChange()', () => {
    const expected = { id: 1 };
    spyOn(component, 'notifyParent').and.callThrough();

    component.onProjectChange(expected);

    expect(component.notifyParent).toHaveBeenCalled();
  });

  it('should #notifyParent() #onRoleChange()', () => {
    const expected = { id: 1 };
    spyOn(component, 'notifyParent').and.callThrough();

    component.onRoleChange(expected);

    expect(component.notifyParent).toHaveBeenCalled();
  });
});
