import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Store, Select, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from '../../../../shared/store/activities/activities.state';

import { SetSelectedDate } from '../../../../shared/store/calendar/calendar.actions';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';
import { endOfMonth, isSameMonth } from 'date-fns';
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
export class ActivitiesComponent implements OnInit, AfterViewInit {
  @Select(state => state.activities)
  activitiesState$: Observable<ActivitiesStateModel>;

  @Select(state => state.calendar)
  calendarState$: Observable<CalendarStateModel>;

  @Select(state => state.holidays)
  holidaysState$: Observable<HolidaysStateModel>;

  @ViewChild('monthButtonLabel')
  monthButtonLabel: ElementRef;

  @ViewChildren('dayList')
  dayList: QueryList<any>;
  isDayListRendered: boolean = false;

  isCalendarMenuDeployed: boolean = false;

  constructor(public store: Store, public actions$: Actions) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scrollToSelectedDayFromState();
    this.subscribeToSelectedDateChanged();
  }

  toggleCalendarMenu() {
    this.isCalendarMenuDeployed = !this.isCalendarMenuDeployed;
    this.isCalendarMenuDeployed
      ? this.store.dispatch(new LockScroll())
      : this.store.dispatch(new UnlockScroll());
  }

  changeSelectedDate(newDate: Date) {
    this.isCalendarMenuDeployed = false;
    this.store.dispatch(new UnlockScroll());
    this.store.dispatch(new SetSelectedDate(newDate));
  }

  showNavigationDrawer() {
    this.store.dispatch(new ShowNavigationDrawer());
    this.store.dispatch(new LockScroll());
  }

  subscribeToSelectedDateChanged() {
    this.dayList.changes.subscribe(queryList => {
      this.onDayListChanged();
    });

    this.actions$
      .pipe(ofActionDispatched(SetSelectedDate))
      .subscribe((action: SetSelectedDate) => {
        this.onSetSelectedDateDispatched(action.date);
      });
  }

  onDayListChanged() {
    this.scrollToSelectedDayFromState();
  }

  scrollToSelectedDayFromState() {
    this.store
      .selectOnce(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        this.isDayListRendered = this.getIsListRendered(selectedDate);
        this.scrollToSelectedDay(selectedDate);
      });
  }

  onSetSelectedDateDispatched(date: Date) {
    this.scrollToSelectedDay(date);
  }

  scrollToSelectedDay(date: Date) {
    if (this.isDayListRendered) {
      const day = document.querySelector(`#day-${date.getDate() - 1}`);
      this.scrollToElement(day, -129);
    }
  }

  scrollToElement(element, offset) {
    window.scrollTo({
      top: element.offsetTop + offset,
      behavior: 'instant'
    });
  }

  getIsListRendered(date: Date) {
    return this.dayList.length > 0 && isSameMonth(this.dayList.last.date, date);
  }
}
