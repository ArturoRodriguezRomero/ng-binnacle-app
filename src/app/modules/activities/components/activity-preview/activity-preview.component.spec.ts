import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPreviewComponent } from './activity-preview.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe/truncate.pipe';
import { ActivityDetailState } from 'src/app/shared/store/activity-detail/activity-detail.state';
import { NgxsModule } from '@ngxs/store';

describe('ActivityPreviewComponent', () => {
  let component: ActivityPreviewComponent;
  let fixture: ComponentFixture<ActivityPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityPreviewComponent,
        CalculateEndDatePipe,
        HoursAndMinutesPipe,
        TruncatePipe
      ],
      imports: [NgxsModule.forRoot([ActivityDetailState])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
