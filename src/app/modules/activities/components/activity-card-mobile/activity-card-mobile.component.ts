import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../../shared/models/Activity';
import { Store } from '@ngxs/store';
import { SetActivityDetail } from 'src/app/shared/store/activity-detail/activity-detail.actions';
import { Router } from '@angular/router';
import {
  SetFormDate,
  SetFormActivity
} from 'src/app/shared/store/activity-form/activity-form.actions';
import { LockScroll } from 'src/app/shared/store/page-scroll/page-scroll.actions';

@Component({
  selector: 'app-activity-card-mobile',
  templateUrl: './activity-card-mobile.component.html',
  styleUrls: ['./activity-card-mobile.component.css']
})
export class ActivityCardMobileComponent implements OnInit {
  @Input()
  activity: Activity;

  constructor(public store: Store, public router: Router) {}

  ngOnInit() {}

  onClick() {
    this.store.dispatch(new SetFormDate(this.activity.startDate));
    this.store.dispatch(new SetFormActivity(this.activity));
    this.router.navigate([`activities/${this.activity.id}`]);
  }

  onLongPress() {
    this.store.dispatch(new SetActivityDetail(this.activity));
    this.store.dispatch(new LockScroll());
  }
}
