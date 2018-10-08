import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { UserState } from './user.state';
import { SetUser, UnsetUser } from './user.actions';
import { ModelsMock } from '../../__mocks__/models.mock';

describe('User State', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])]
    });
    store = TestBed.get(Store);
  });

  it('should set #user to payload when @Action Set User', () => {
    store.dispatch(new SetUser(ModelsMock.User));

    store.selectOnce(state => state.user.user).subscribe(user => {
      expect(user).toEqual(ModelsMock.User);
    });
  });

  it('should unset #user when @Action Unset User', () => {
    store.dispatch(new UnsetUser());

    store.selectOnce(state => state.user.user).subscribe(user => {
      expect(user).toEqual(undefined);
    });
  });
});
