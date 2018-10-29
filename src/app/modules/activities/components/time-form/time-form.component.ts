import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  addMinutes,
  parse,
  format,
  isBefore,
  differenceInMinutes
} from 'date-fns';

export interface TimeFormOutputModel {
  startDate: Date;
  duration: number;
}

@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.css']
})
export class TimeFormComponent implements OnInit {
  @Input()
  activityStartDate: Date;
  @Input()
  activityDuration: number;

  @Output()
  onChange = new EventEmitter<TimeFormOutputModel>();

  startTime;
  endTime;
  duration: number;

  constructor() {}

  ngOnInit() {
    this.setActivityValue();
    this.notifyParent();
  }

  setActivityValue() {
    this.startTime = format(this.activityStartDate, 'kk:mm');
    this.endTime = this.getEndTime(
      this.activityStartDate,
      this.activityDuration
    );
    this.duration = this.activityDuration;
  }

  notifyParent() {
    this.onChange.emit({
      startDate: new Date(
        format(this.activityStartDate, 'yyyy-MM-dd:') + this.startTime
      ),
      duration: this.duration
    });
  }

  onTimeChange() {
    this.updateDurationInput();
    if (this.isEndTimeAfterStartTime()) {
      this.setEndTimeValueToStartTimeValue();
    }
    this.notifyParent();
  }

  onDurationChange() {
    this.updateEndTimeInput();
    if (!this.isDurationValid()) {
      this.setDurationToZero();
    }
    this.notifyParent();
  }

  updateDurationInput() {
    this.duration = this.getDifferenceInMinutesBetweenTimes(
      this.startTime,
      this.endTime,
      this.activityStartDate
    );
  }

  updateEndTimeInput() {
    const startDate = parse(this.startTime, 'HH:mm', this.activityStartDate);
    const endDate = addMinutes(startDate, this.duration);

    this.endTime = format(endDate, 'kk:mm');
  }

  isEndTimeAfterStartTime() {
    const startDate = parse(this.startTime, 'HH:mm', this.activityStartDate);
    const endDate = parse(this.endTime, 'HH:mm', this.activityStartDate);

    return isBefore(endDate, startDate);
  }

  setEndTimeValueToStartTimeValue() {
    this.endTime = this.startTime;
    this.onTimeChange();
  }

  isDurationValid() {
    return this.duration >= 0;
  }

  setDurationToZero() {
    this.duration = 0;
    this.updateEndTimeInput();
  }

  getEndTime(startDate: Date, minutes: number) {
    return format(this.getEndTimeDate(startDate, minutes), 'kk:mm');
  }

  getEndTimeDate(startDate: Date, minutes: number) {
    return addMinutes(startDate, minutes);
  }

  getDifferenceInMinutesBetweenTimes(startTime, endTime, baseDate: Date) {
    const startDate = parse(startTime, 'HH:mm', baseDate);
    const endDate = parse(endTime, 'HH:mm', baseDate);

    return differenceInMinutes(endDate, startDate);
  }
}
