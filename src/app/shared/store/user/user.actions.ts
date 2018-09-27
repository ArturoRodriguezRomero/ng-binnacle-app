import { Credentials } from '../../models/Credentials';
import { User } from '../../models/User';

export class SetUser {
  static readonly type = '[user store] Set User';
  constructor(public payload: User) {}
}

export class UnsetUser {
  static readonly type = '[user store] Unset User';
  constructor() {}
}
