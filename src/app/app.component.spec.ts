import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { notifierOptions } from './shared/misc/notifier-config';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { NotifierContainerComponent } from 'angular-notifier/src/components/notifier-container.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NotifierModule.withConfig(notifierOptions)
      ],
      declarations: [AppComponent],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
