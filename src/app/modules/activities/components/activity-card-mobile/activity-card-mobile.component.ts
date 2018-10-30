import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../../shared/models/Activity';
import { Store } from '@ngxs/store';
import {
  SetActivityDetail,
  UnsetActivityDetail
} from 'src/app/shared/store/activity-detail/activity-detail.actions';
import { Router } from '@angular/router';
import {
  SetFormDate,
  SetFormActivity
} from 'src/app/shared/store/activity-form/activity-form.actions';

@Component({
  selector: 'app-activity-card-mobile',
  templateUrl: './activity-card-mobile.component.html',
  styleUrls: ['./activity-card-mobile.component.css']
})
export class ActivityCardMobileComponent implements OnInit {
  @Input()
  activity: Activity;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.store.dispatch(new SetFormDate(this.activity.startDate));
    this.store.dispatch(new SetFormActivity(this.activity));
    this.router.navigate([`activities/${this.activity.id}`]);
  }

  onLongPress() {
    this.dispatchSetActivityDetail();
  }

  dispatchSetActivityDetail() {
    this.store.dispatch(new SetActivityDetail(this.activity));
  }

  dispatchUnsetActivityDetail() {
    this.store.dispatch(new UnsetActivityDetail());
  }
}
