import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { isSameDay, endOfWeek } from 'date-fns';
import { ActivitiesService } from '../../../../core/services/activities/activities.service';

@Component({
  selector: 'app-week-separator',
  templateUrl: './week-separator.component.html',
  styleUrls: ['./week-separator.component.css']
})
export class WeekSeparatorComponent implements OnInit {
  sunday: Date;
  @Input()
  monday: Date;

  totalMinutes = 0;

  @Select(state => state.activities)
  activitiesState$: Observable<any>;

  isLoadingFromServer = false;

  constructor(
    public activitiesService: ActivitiesService,
    public store: Store
  ) {}

  ngOnInit() {
    this.getSunday();
    this.setUpTotalMinutes();
  }

  getSunday() {
    this.sunday = endOfWeek(this.monday, { weekStartsOn: 1 });
  }

  setUpTotalMinutes() {
    this.store
      .selectOnce(state => state.activities.activities)
      .subscribe(activities => {
        const mondayIndex = activities.findIndex(day =>
          isSameDay(day.date, this.monday)
        );
        const sundayIndex = activities.findIndex(
          day => day.date == this.sunday
        );

        if (this.isDayIndexFromNextMonth(sundayIndex)) {
          this.calculateTotalMinutesFromServer();
        } else {
          this.calculateTotalMinutesFromLocalActivities(
            activities,
            mondayIndex,
            sundayIndex
          );
        }
      });
  }

  calculateTotalMinutesFromLocalActivities(
    activities,
    mondayIndex: number,
    sundayIndex: number
  ) {
    const weekDays = activities.slice(mondayIndex, sundayIndex + 1);
    this.totalMinutes = this.getTotalMinutesOfWeek(weekDays);
  }

  calculateTotalMinutesFromServer() {
    this.isLoadingFromServer = true;
    this.activitiesService
      .getActivitiesTimeByDates(this.monday, this.sunday)
      .subscribe(activitiesTime => {
        this.totalMinutes = activitiesTime;
        this.isLoadingFromServer = false;
      });
  }

  getTotalMinutesOfWeek(weekDays) {
    return weekDays.reduce(
      (weekMinutes, currentDay) => weekMinutes + currentDay.total_hours,
      0
    );
  }

  isDayIndexFromPreviousMonth(mondayIndex: number) {
    return mondayIndex == -1;
  }

  isDayIndexFromNextMonth(sundayIndex: number) {
    return sundayIndex == -1;
  }
}
