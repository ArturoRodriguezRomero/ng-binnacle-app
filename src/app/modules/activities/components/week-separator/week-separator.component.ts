import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { startOfWeek, eachDayOfInterval } from 'date-fns';
import { isSameDay } from 'date-fns/esm';
import { ActivitiesService } from '../../../../core/services/activities/activities.service';

@Component({
  selector: 'app-week-separator',
  templateUrl: './week-separator.component.html',
  styleUrls: ['./week-separator.component.css']
})
export class WeekSeparatorComponent implements OnInit {
  monday: Date;
  @Input()
  sunday: Date;

  totalMinutes = 0;

  @Select(state => state.activities.activities)
  activities$: Observable<any>;

  constructor(public activitiesService: ActivitiesService) {}

  ngOnInit() {
    this.getMonday();
    this.setUpTotalMinutes();
  }

  getMonday() {
    this.monday = startOfWeek(this.sunday, { weekStartsOn: 1 });
  }

  setUpTotalMinutes() {
    this.activities$.subscribe(activities => {
      const mondayIndex = activities.findIndex(day =>
        isSameDay(day.date, this.monday)
      );
      const sundayIndex = activities.findIndex(day => day.date == this.sunday);

      if (this.isDayIndexFromPreviousMonth(mondayIndex)) {
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
    this.activitiesService
      .getActivitiesTimeByDates(this.monday, this.sunday)
      .subscribe(activitiesTime => {
        this.totalMinutes = activitiesTime;
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
}
