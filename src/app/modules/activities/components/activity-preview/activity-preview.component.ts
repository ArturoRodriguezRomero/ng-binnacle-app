import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivityDetailStateModel } from 'src/app/shared/store/activity-detail/activity-detail.state';
import { UnsetActivityDetail } from 'src/app/shared/store/activity-detail/activity-detail.actions';
import { UnlockScroll } from 'src/app/shared/store/page-scroll/page-scroll.actions';

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.css']
})
export class ActivityPreviewComponent implements OnInit {
  @Select(state => state.activityDetail)
  activityDetailState$: Observable<ActivityDetailStateModel>;

  constructor(private store: Store) {}

  ngOnInit() {}

  onContainerClick() {
    this.store.dispatch(new UnsetActivityDetail());
    this.store.dispatch(new UnlockScroll());
  }
}
