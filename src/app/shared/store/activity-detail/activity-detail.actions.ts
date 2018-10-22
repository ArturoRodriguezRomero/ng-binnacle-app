import { Activity } from '../../models/Activity';

export class SetActivityDetail {
  static readonly type = '[activity detail store] Set Activity Detail';
  constructor(public activity: Activity) {}
}

export class UnsetActivityDetail {
  static readonly type = '[activity detail store] Unset Activity Detail';
  constructor() {}
}
