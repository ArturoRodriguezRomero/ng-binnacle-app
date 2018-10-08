import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../../shared/models/Activity';

@Component({
  selector: 'app-activity-card-mobile',
  templateUrl: './activity-card-mobile.component.html',
  styleUrls: ['./activity-card-mobile.component.css']
})
export class ActivityCardMobileComponent implements OnInit {
  @Input()
  activity: Activity;

  constructor() {}

  ngOnInit() {}
}
