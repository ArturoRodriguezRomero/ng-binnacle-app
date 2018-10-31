import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFormComponent } from './time-form.component';
import { FormsModule } from '@angular/forms';
import { format, addMinutes } from 'date-fns';

describe('TimeFormComponent', () => {
  let component: TimeFormComponent;
  let fixture: ComponentFixture<TimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeFormComponent],
      imports: [FormsModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set activity value from @Input values', () => {
    component.activityStartDate = new Date();
    component.activityDuration = 75;

    component.setActivityValue();

    expect(component.startTime).toEqual(format(new Date(), 'kk:mm'));
    expect(component.endTime).toEqual(
      format(addMinutes(new Date(), 75), 'kk:mm')
    );
    expect(component.durationHours).toEqual(1);
    expect(component.durationMinutes).toEqual(15);
  });

  it('should notify parent properly', () => {
    component.activityStartDate = new Date('2018-1-1');
    component.startTime = '13:30';
    component.durationHours = 1;
    component.durationMinutes = 15;
    spyOn(component.onChange, 'emit').and.callThrough();

    component.notifyParent();

    expect(component.onChange.emit).toHaveBeenCalledWith({
      startDate: new Date('2018-01-01:13:30'),
      duration: 1 * 60 + 15
    });
  });

  it('should update #durationInput #onTimeChange', () => {
    component.startTime = '09:00';
    component.endTime = '13:15';
    component.activityStartDate = new Date();

    component.onTimeChange();

    expect(component.durationHours).toEqual(4);
    expect(component.durationMinutes).toEqual(15);
  });

  it('should set end time to start time #onTimeChange if endTime is before startTime', () => {
    component.startTime = '09:00';
    component.endTime = '08:15';
    component.activityStartDate = new Date();

    component.onTimeChange();

    expect(component.endTime).toEqual(component.startTime);
  });

  it('should notifyParent() #onTimeChange', () => {
    spyOn(component, 'notifyParent').and.callThrough();

    component.onTimeChange();

    expect(component.notifyParent).toHaveBeenCalled();
  });

  it('should update #endTimeInput #onDurationChange', () => {
    component.startTime = '09:00';
    component.activityStartDate = new Date();
    component.durationHours = 1;
    component.durationMinutes = 15;

    component.onDurationChange();

    expect(component.endTime).toEqual('10:15');
  });

  it('should notifyParent() #onDurationChange', () => {
    spyOn(component, 'notifyParent').and.callThrough();

    component.onDurationChange();

    expect(component.notifyParent).toHaveBeenCalled();
  });

  it('should return correct difference between times', () => {
    const minutes = component.getDifferenceInMinutesBetweenTimes(
      '9:00',
      '10:15',
      new Date()
    );

    expect(minutes).toEqual(75);
  });
});
