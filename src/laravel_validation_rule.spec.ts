import { describe, test, expect } from 'vitest';
import { codify, parse } from './laravel_validation_rule';

describe('parse', () => {
  test('only method name', () => {
    expect(parse('integer')).toEqual({
      name: 'integer',
      args: [],
    });
  });
  test('method name and single arg', () => {
    expect(parse('email:rfc')).toEqual({
      name: 'email',
      args: ['rfc'],
    });
  });
  test('method name and multiple args', () => {
    expect(parse('between:0,255')).toEqual({
      name: 'between',
      args: [0, 255],
    });
  });
  test('mixed arguments', () => {
    expect(parse('in:0,1,3.14,true,false,foo,bar')).toEqual({
      name: 'in',
      args: [0, 1, 3.14, true, false, 'foo', 'bar'],
    });
  });
});

describe('codify', () => {
  test('numeric args', () => {
    expect(
      codify({
        name: 'between',
        args: [0, 255],
      })
    ).toBe('.between(0,255)');
  });
  test('boolean args', () => {
    expect(
      codify({
        name: 'in',
        args: [true, false],
      })
    ).toBe('.in(true,false)');
  });
  test('string args', () => {
    expect(
      codify({
        name: 'in',
        args: ['foo', 'bar'],
      })
    ).toBe('.in("foo","bar")');
  });
});
