import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSeparatorComponent } from './week-separator.component';
import { HoursAndMinutesPipe } from '../../../../shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { ActivitiesState } from '../../../../shared/store/activities/activities.state';
import { NotifierService } from 'angular-notifier';
import { of } from 'rxjs';
import { ActivitiesService } from '../../../../core/services/activities/activities.service';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { activitiesServiceStub } from 'src/app/core/services/__mocks__/activities.service.stub';
import { IsMondayPipe } from 'src/app/shared/pipes/is.monday.pipe/is.monday.pipe';

describe('WeekSeparatorComponent', () => {
  let component: WeekSeparatorComponent;
  let fixture: ComponentFixture<WeekSeparatorComponent>;

  let notifierServiceStub = { notify: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeekSeparatorComponent,
        HoursAndMinutesPipe,
        LoadingSpinnerComponent,
        IsMondayPipe
      ],
      imports: [HttpClientModule, NgxsModule.forRoot([ActivitiesState])],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        },
        {
          provide: ActivitiesService,
          useValue: activitiesServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekSeparatorComponent);
    component = fixture.componentInstance;

    component.monday = new Date('2018-7-1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should #getSunday and #setUpTotalMinutes when #ngOnInit', () => {
    spyOn(component, 'getSunday').and.callThrough();
    spyOn(component, 'setUpTotalMinutes').and.callThrough();

    component.ngOnInit();

    expect(component.getSunday).toHaveBeenCalled();
    expect(component.setUpTotalMinutes).toHaveBeenCalled();
  });

  it('should #getMonday correctly', () => {
    component.monday = new Date('2018-10-1');

    component.getSunday();

    expect(component.monday).toEqual(new Date('2018-10-1'));
  });

  it('should call #calculateTotalMinutesFromServer when sunday is from next month', () => {
    const activitiesMock = [
      {
        date: '2018-09-01T00:00:00.000+0200'
      },
      {
        date: '2018-09-02T00:00:00.000+0200'
      }
    ];
    Object.defineProperty(component, 'activitiesState$', { writable: true });
    component.activitiesState$ = of(activitiesMock);
    component.sunday = new Date('2018-09-02');
    component.getSunday();
    spyOn(component, 'calculateTotalMinutesFromServer').and.callThrough();

    component.setUpTotalMinutes();

    expect(component.calculateTotalMinutesFromServer).toHaveBeenCalled();
  });

  it('should call #calculateTotalMinutesFromLocalActivities when sunday is already in the local activities', () => {
    const activitiesMock = [
      {
        date: new Date('2018-10-1')
      },
      {
        date: new Date('2018-10-7')
      }
    ];
    component.monday = new Date('2018-10-1');
    component.getSunday();
    console.log(component.monday);
    console.log(component.sunday);
    spyOn(component.store, 'selectOnce').and.returnValue(of(activitiesMock));

    spyOn(
      component,
      'calculateTotalMinutesFromLocalActivities'
    ).and.callThrough();

    component.setUpTotalMinutes();

    expect(
      component.calculateTotalMinutesFromLocalActivities
    ).toHaveBeenCalled();
  });

  it('should set #totalMinutes correcty when #calculateTotalMinutesFromLocalActivities', () => {
    const activitiesMock = [
      {
        date: '2018-09-02T00:00:00.000+0200',
        total_hours: 10
      },
      {
        date: '2018-09-03T00:00:00.000+0200',
        total_hours: 10
      },
      {
        date: '2018-09-09T00:00:00.000+0200',
        total_hours: 10
      },
      {
        date: '2018-09-10T00:00:00.000+0200',
        total_hours: 10
      }
    ];

    component.calculateTotalMinutesFromLocalActivities(activitiesMock, 1, 2);

    expect(component.totalMinutes).toEqual(20);
  });

  it('should set #totalMinutes correctly when #calculateTotalMinutesFromServer', () => {
    const monday = new Date('2018-09-03');
    const sunday = new Date('2018-09-09');
    component.monday = monday;
    component.sunday = sunday;

    spyOn(
      component.activitiesService,
      'getActivitiesTimeByDates'
    ).and.returnValue(of(120));

    component.calculateTotalMinutesFromServer();

    expect(
      component.activitiesService.getActivitiesTimeByDates
    ).toHaveBeenCalledWith(monday, sunday);

    expect(component.totalMinutes).toEqual(120);
  });

  it('should return total minutes when #getTotalMinutesOfWeek', () => {
    const weekDays = [
      { total_hours: 10 },
      { total_hours: 10 },
      { total_hours: 10 }
    ];

    expect(component.getTotalMinutesOfWeek(weekDays)).toEqual(30, '30');
  });

  it('should return true when #isDayIndexFromPreviousMonth argument is -1', () => {
    expect(component.isDayIndexFromPreviousMonth(-1)).toBe(true);
  });

  it('should return false when #isDayIndexFromPreviousMonth argument is not -1', () => {
    expect(component.isDayIndexFromPreviousMonth(1)).toBe(false);
    expect(component.isDayIndexFromPreviousMonth(-10)).toBe(false);
    expect(component.isDayIndexFromPreviousMonth(-1213123)).toBe(false);
    expect(component.isDayIndexFromPreviousMonth(1234982394823482)).toBe(false);
  });
});
