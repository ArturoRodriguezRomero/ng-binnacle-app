import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../../shared/models/Activity';
import { Store } from '@ngxs/store';
import {
  SetActivityDetail,
  UnsetActivityDetail
} from 'src/app/shared/store/activity-detail/activity-detail.actions';

@Component({
  selector: 'app-activity-card-mobile',
  templateUrl: './activity-card-mobile.component.html',
  styleUrls: ['./activity-card-mobile.component.css']
})
export class ActivityCardMobileComponent implements OnInit {
  @Input()
  activity: Activity;

  constructor(private store: Store) {}

  ngOnInit() {}

  onLongPress() {
    this.dispatchSetActivityDetail();
  }

  onLongPressEnd() {
    this.dispatchUnsetActivityDetail();
  }

  dispatchSetActivityDetail() {
    this.store.dispatch(new SetActivityDetail(this.activity));
  }

  dispatchUnsetActivityDetail() {
    this.store.dispatch(new UnsetActivityDetail());
  }
}
