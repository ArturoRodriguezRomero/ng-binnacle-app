import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { notifierOptions } from './shared/misc/notifier-config';
import { NotifierModule } from 'angular-notifier';
import { NgxsModule } from '@ngxs/store';
import { CalendarState } from './shared/store/calendar/calendar.state';
import { HolidaysState } from './shared/store/holidays/holidays.state';
import { ActivitiesState } from './shared/store/activities/activities.state';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GetHolidaysRequest } from './shared/store/holidays/holidays.actions';
import { startOfMonth, endOfMonth } from 'date-fns';
import { GetActivitiesByDatesRequest } from './shared/store/activities/activities.actions';
import { GetImputedDaysByDatesRequest } from './shared/store/calendar/calendar.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NotifierModule.withConfig(notifierOptions),
        NgxsModule.forRoot([CalendarState, HolidaysState, ActivitiesState]),
        HttpClientTestingModule
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should dispatch @Action(GetActivitiesByDatesRequest) and @Action(GetImputedDaysByDatesRequest) if new Date is different than #selectedMonth when #State.selectedDate changes', () => {
    const selectedMonth = new Date('2018-1-1');
    const newSelectedDate = new Date('2018-2-2');

    const expectedFirstDate = startOfMonth(newSelectedDate);
    const expectedLastDate = endOfMonth(newSelectedDate);

    component.selectedMonth = selectedMonth;
    spyOn(component.store, 'select').and.returnValue(of(newSelectedDate));
    spyOn(component.store, 'dispatch').and.callThrough();

    component.subscribeToSelectedDateChanged();

    expect(component.store.dispatch).toHaveBeenCalledTimes(2);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetActivitiesByDatesRequest(expectedFirstDate, expectedLastDate)
    );
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetImputedDaysByDatesRequest(expectedFirstDate, expectedLastDate)
    );
    expect(component.selectedMonth).toEqual(newSelectedDate);
  });

  it('should not dispatch @Action(GetActivitiesByDatesRequest) and @Action(GetImputedDaysByDatesRequest) if new Date equals #selectedMonth when #State.selectedDate changes', () => {
    const selectedMonth = new Date('2018-1-1');
    const newSelectedDate = new Date('2018-1-2');

    component.selectedMonth = selectedMonth;
    spyOn(component.store, 'select').and.returnValue(of(newSelectedDate));
    spyOn(component.store, 'dispatch').and.callThrough();

    component.subscribeToSelectedDateChanged();

    expect(component.store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch @Action(GetHolidaysRequest) if holidayState.public holidays is empty on #OnInit', () => {
    spyOn(component.store, 'selectOnce').and.returnValue(
      of({ publicHolidays: [] })
    );
    spyOn(component.store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetHolidaysRequest()
    );
  });

  it('should not dispatch @Action(GetHolidaysRequest) if holidayState.public holidays is not empty on #OnInit', () => {
    spyOn(component.store, 'selectOnce').and.returnValue(
      of({ publicHolidays: ['test', 'test', 'test'] })
    );
    spyOn(component.store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(component.store.dispatch).toHaveBeenCalledTimes(0);
  });
});
