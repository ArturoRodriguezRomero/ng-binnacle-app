import { TruncatePipe } from './truncate.pipe';

describe('Truncate Pipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should not truncate if value.length is lesser than limit', () => {
    const value = 'test';
    const limit = 5;
    const expected = 'test';

    const result = pipe.transform(value, limit);

    expect(result).toEqual(expected);
  });

  it('should add ellipsis if value.length is greater than limit', () => {
    const value = 'this is a test';
    const limit = 9;
    const expected = 'this is a...';

    const result = pipe.transform(value, limit);

    expect(result).toEqual(expected);
  });

  it('should add ellipsis if value.length is lesser than limit', () => {
    const value = 'this is a test';
    const limit = 25;
    const expected = 'this is a test';

    const result = pipe.transform(value, limit);

    expect(result).toEqual(expected);
  });

  it('should not split words if complete words is enabled', () => {
    const value = 'this is a very-long-test-that-doesnt-fit';
    const limit = 16;
    const expected = 'this is a...';

    const result = pipe.transform(value, limit, true);

    expect(result).toEqual(expected);
  });

  it('should add the wanter ellipsis', () => {
    const value = 'this is a test';
    const limit = 10;
    const ellipsis = '_im an ellipsis, look at me!_';
    const expected = 'this is a' + ellipsis;

    const result = pipe.transform(value, limit, true, ellipsis);

    expect(result).toEqual(expected);
  });

  it('should return empty string when value is null', () => {
    const value = null;
    const limit = 10;
    const ellipsis = '_im an ellipsis, look at me!_';
    const expected = '';

    const result = pipe.transform(value, limit, true, ellipsis);

    expect(result).toEqual(expected);
  });
});
