import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { notifierOptions } from './shared/misc/notifier-config';
import { NotifierModule } from 'angular-notifier';
import { NgxsModule } from '@ngxs/store';
import { CalendarState } from './shared/store/calendar/calendar.state';
import { HolidaysState } from './shared/store/holidays/holidays.state';
import { ActivitiesState } from './shared/store/activities/activities.state';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationDrawerComponent } from './shared/components/navigation-drawer/navigation-drawer.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NotifierModule.withConfig(notifierOptions),
        NgxsModule.forRoot([CalendarState, HolidaysState, ActivitiesState]),
        HttpClientTestingModule
      ],
      declarations: [AppComponent, NavigationDrawerComponent],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
