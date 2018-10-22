import { IsSundayPipe } from './is.sunday.pipe';

describe('Is Sunday Pipe', () => {
  let pipe: IsSundayPipe;

  beforeEach(() => {
    pipe = new IsSundayPipe();
  });

  it('should return true when date is sunday', () => {
    const input = new Date('2018-10-28');
    const expected = true;

    const result = pipe.transform(input);

    expect(result).toBe(expected, 'true');
  });

  it('should return false when date is not sunday', () => {
    const input = new Date('2018-10-29');
    const expected = false;

    const result = pipe.transform(input);

    expect(result).toEqual(expected, 'false');
  });
});
