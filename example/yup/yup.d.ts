import { AnyObject, Flags, Maybe, Schema } from 'yup';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    maxLength(size: number): this;
    varchar(): this;
    sometimes(callback: (schema: this) => this): this;
    startsWith(str: string): this;
    required_without(str: string): this;
  }

  interface ArraySchema<TIn extends any[] | null | undefined, TContext, TDefault = undefined, TFlags extends Flags = ''>
    extends Schema<TIn, TContext, TDefault, TFlags> {
    size(size: number): this;
  }

  interface MixedSchema<TType extends Maybe<AnyPresentValue> = AnyPresentValue | undefined, TContext = AnyObject, TDefault = undefined, TFlags extends Flags = ''> extends Schema<TType, TContext, TDefault, TFlags> {
    union(schemas: Record<string, Schema>): this
  }
}
