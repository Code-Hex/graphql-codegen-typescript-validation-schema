import { TsValidationMethodCallMapper } from './TsValidationMethodCallMapper';

describe('TsValidationMethodCallMapper', () => {
  const mapper = new TsValidationMethodCallMapper(
    {
      regex: 'matches',
    },
    ['exists']
  );

  test.each([
    ['email:rfc', '.email("rfc")'],
    ['in:true,false', '.in(true,false)'],
    ['between:0,255', '.between(0,255)'],
    ['matches:/test/gi', '.matches(/test/gi)'],
    ['exists:users,id', undefined],
  ])('map %s', (rule, expected) => {
    expect(mapper.create(rule)?.toString()).toBe(expected);
  });
});
