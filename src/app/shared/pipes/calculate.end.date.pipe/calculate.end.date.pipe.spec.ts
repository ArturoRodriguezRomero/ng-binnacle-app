import { CalculateEndDatePipe } from './calculate.end.date.pipe';

describe('Calculate End Date Pipe', () => {
  let pipe: CalculateEndDatePipe;

  beforeEach(() => {
    pipe = new CalculateEndDatePipe();
  });

  it('should return true when date is sunday', () => {
    const startDate = new Date('2018-10-28:12:00');
    const minutes = 75;
    const expected = new Date('2018-10-28:13:15');

    const result = pipe.transform(startDate, minutes);

    expect(result).toEqual(expected, '75 minutes later');
  });
});
