export interface PrivateHoliday {
  beginDate: Date;
  finalDate: Date;
  state: 'ACCEPTED' | 'REJECTED';
  userId: number;
}
