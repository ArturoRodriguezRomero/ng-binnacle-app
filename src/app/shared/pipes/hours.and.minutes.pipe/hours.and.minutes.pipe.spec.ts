import { HoursAndMinutesPipe } from './hours.and.minutes.pipe';

describe('Hours And Minutes Pipe', () => {
  let pipe: HoursAndMinutesPipe;

  beforeEach(() => {
    pipe = new HoursAndMinutesPipe();
  });

  it('should return proper formated date', () => {
    const input = 145;
    const expected = '2:25';

    const result = pipe.transform(input);

    expect(result).toEqual(expected, '2:25');
  });

  it('should return proper formated date', () => {
    const input = 15;
    const expected = '0:15';

    const result = pipe.transform(input);

    expect(result).toEqual(expected, '0:15');
  });

  it('should return proper formated date', () => {
    const input = 120;
    const expected = '2';

    const result = pipe.transform(input);

    expect(result).toEqual(expected, '2');
  });

  it('should return proper formated date', () => {
    const input = 125;
    const expected = '2:05';

    const result = pipe.transform(input);

    expect(result).toEqual(expected, '2:05');
  });
});
