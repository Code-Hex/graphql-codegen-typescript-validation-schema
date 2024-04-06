import { isConvertableRegexp } from '../src/regexp';

describe('isConvertableRegexp', () => {
  describe('match', () => {
    it.each([
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

      `/^[a-z]+:[\\\/]$/i`,

      `/^(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\\1\d{4}$/`,
    ])('%s', (maybeRegexp) => {
      expect(isConvertableRegexp(maybeRegexp)).toBeTruthy();
    });
  });
  describe('does not match', () => {
    it.each(['hello', '/world', 'world/', 'https://example.com/', '  /hello/', '/hello/d  ', '/hello/dgimsuy  '])(
      '%s',
      (maybeRegexp) => {
        expect(isConvertableRegexp(maybeRegexp)).toBeFalsy();
      },
    );
  });
});
