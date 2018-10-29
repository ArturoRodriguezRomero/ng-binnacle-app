import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetActivitiesByDatesRequest } from '../../../../shared/store/activities/activities.actions';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from '../../../../shared/store/activities/activities.state';
import { startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import {
  SetSelectedDate,
  GetImputedDaysByDatesRequest
} from '../../../../shared/store/calendar/calendar.actions';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { GetHolidaysRequest } from 'src/app/shared/store/holidays/holidays.actions';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, AfterViewChecked {
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

  ngAfterViewChecked() {}

  toggleCalendarMenu() {
    this.isCalendarMenuDeployed = !this.isCalendarMenuDeployed;
  }

  changeSelectedDate(newDate: Date) {
    this.store
      .selectOnce(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        this.store.dispatch(new SetSelectedDate(newDate));
        this.isCalendarMenuDeployed = false;
      });
  }

  scrollToSelectedDate() {
    this.store
      .select(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        if (this.dayList) {
          //console.warn(selectedDate);
          const day = selectedDate.getDate();
          const days = this.dayList.nativeElement.querySelectorAll('.day');
          const selectedDay = days[day - 1];

          //console.log(selectedDay.getBoundingClientRect().top);

          window.scrollTo({
            top: selectedDay.getBoundingClientRect().top,
            behavior: 'instant'
          });

          //console.log(selectedDay);
        }
      });
  }
}
