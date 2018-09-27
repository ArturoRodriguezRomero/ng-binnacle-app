import { State } from '@ngxs/store';

export interface ActivitiesStoreModel {
  loading: boolean;
}

@State<ActivitiesStoreModel>({
  name: 'activities',
  defaults: {
    loading: false
  }
})
export class ActivitiesState {}
