import { Credentials } from '../../../shared/models/Credentials';
import { of } from 'rxjs';
import { ModelsMock } from '../../../shared/__mocks__/models.mock';

export const authenticationServiceStub = {
  endpoint: 'endpoint',
  token: 'token',
  checkUser(credentials: Credentials) {
    return of(ModelsMock.User);
  },
  getToken() {
    return of();
  }
};
