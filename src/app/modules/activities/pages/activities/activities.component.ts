import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from '../../../../shared/store/activities/activities.state';

import { SetSelectedDate } from '../../../../shared/store/calendar/calendar.actions';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';
import { endOfMonth } from 'date-fns';
import { ShowNavigationDrawer } from 'src/app/shared/store/navigation-drawer/navigation-drawer.actions';
import {
  LockScroll,
  UnlockScroll
} from 'src/app/shared/store/page-scroll/page-scroll.actions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Select(state => state.activities)
  activitiesState$: Observable<ActivitiesStateModel>;

  @Select(state => state.calendar)
  calendarState$: Observable<CalendarStateModel>;

  @Select(state => state.holidays)
  holidaysState$: Observable<HolidaysStateModel>;

  @ViewChild('monthButtonLabel')
  monthButtonLabel: ElementRef;

  @ViewChild('dayList')
  dayList: ElementRef;

  isCalendarMenuDeployed: boolean = false;

  constructor(public store: Store) {}

  ngOnInit() {}

  toggleCalendarMenu() {
    this.isCalendarMenuDeployed = !this.isCalendarMenuDeployed;
    this.isCalendarMenuDeployed
      ? this.store.dispatch(new LockScroll())
      : this.store.dispatch(new UnlockScroll());
  }

  changeSelectedDate(newDate: Date) {
    this.store.dispatch(new SetSelectedDate(endOfMonth(newDate)));
    this.store.dispatch(new UnlockScroll());
    this.isCalendarMenuDeployed = false;
  }

  showNavigationDrawer() {
    this.store.dispatch(new ShowNavigationDrawer());
    this.store.dispatch(new LockScroll());
  }

  scrollToSelectedDay(date: Date) {
    const day = document.querySelector(`#day-${date.getDate() - 1}`);
    this.scrollToElement(day, -150);
  }

  scrollToElement(element, offset) {
    window.scrollTo({
      top: element.offsetTop + offset,
      behavior: 'smooth'
    });
  }
}
