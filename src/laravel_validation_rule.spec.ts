import { describe, test, expect } from 'vitest';
import { codify, parse, ValidationMethod } from './laravel_validation_rule';

describe('parse', () => {
  test.each<[string, ValidationMethod]>([
    [
      'integer',
      {
        name: 'integer',
        args: [],
      },
    ],
    [
      'email:rfc',
      {
        name: 'email',
        args: ['rfc'],
      },
    ],
    [
      'between:0,255',
      {
        name: 'between',
        args: [0, 255],
      },
    ],
    [
      'in:0,1,3.14,true,false,foo,bar',
      {
        name: 'in',
        args: [0, 1, 3.14, true, false, 'foo', 'bar'],
      },
    ],
  ])('%s', (input, expected) => {
    expect(parse(input)).toEqual(expected);
  });
});

describe('codify', () => {
  test.each<[ValidationMethod, string]>([
    [
      {
        name: 'between',
        args: [0, 255],
      },
      '.between(0,255)',
    ],
    [
      {
        name: 'in',
        args: [true, false],
      },
      '.in(true,false)',
    ],
    [
      {
        name: 'in',
        args: ['foo', 'bar'],
      },
      '.in("foo","bar")',
    ],
  ])('numeric args', (input, expected) => {
    expect(codify(input)).toBe(expected);
  });
});
