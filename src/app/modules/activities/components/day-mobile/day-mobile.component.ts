import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-mobile',
  templateUrl: './day-mobile.component.html',
  styleUrls: ['./day-mobile.component.css']
})
export class DayMobileComponent implements OnInit {
  @Input()
  date: Date;
  @Input()
  activities = [];
  @Input()
  totalHours: number;

  constructor() {}

  ngOnInit() {}
}
