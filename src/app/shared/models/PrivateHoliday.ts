export interface PrivateHoliday {
  beginDate: Date;
  endDate: Date;
  state: 'ACCEPTED' | 'REJECTED';
  userId: number;
}
