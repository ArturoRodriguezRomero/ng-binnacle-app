import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivityDetailStateModel } from 'src/app/shared/store/activity-detail/activity-detail.state';

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.css']
})
export class ActivityPreviewComponent implements OnInit {
  @Select(state => state.activityDetail)
  activityDetailState$: Observable<ActivityDetailStateModel>;

  constructor() {}

  ngOnInit() {}
}
