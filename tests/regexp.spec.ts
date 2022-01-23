import { isConvertableRegexp } from '../src/regexp';

describe('isConvertableRegexp', () => {
  describe('match', () => {
    test.each([
      '//',
      '/hello/',
      '/hello/d',
      '/hello/g',
      '/hello/i',
      '/hello/m',
      '/hello/s',
      '/hello/u',
      '/hello/y',
      '/hello/dgimsuy',
      `/\\w+\\s/g`,
      // eslint-disable-next-line no-useless-escape
      `/^[a-z]+:[\\\/]$/i`,
      // eslint-disable-next-line no-useless-escape
      `/^(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\\1\d{4}$/`,
    ])('%s', maybeRegexp => {
      expect(isConvertableRegexp(maybeRegexp)).toBeTruthy();
    });
  });
  describe('does not match', () => {
    test.each(['hello', '/world', 'world/', 'https://example.com/', '  /hello/', '/hello/d  ', '/hello/dgimsuy  '])(
      '%s',
      maybeRegexp => {
        expect(isConvertableRegexp(maybeRegexp)).toBeFalsy();
      }
    );
  });
});
