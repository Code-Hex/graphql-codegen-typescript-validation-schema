import { z } from 'zod'
import { AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, HttpInput, HttpMethod, LayoutInput, PageInput, PageType, User } from '../types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function AttributeInputSchema(): z.ZodObject<Properties<AttributeInput>> {
  return z.object({
    key: z.string().nullish(),
    val: z.string().nullish()
  })
}

export const ButtonComponentTypeSchema = z.nativeEnum(ButtonComponentType);

export function ComponentInputSchema(): z.ZodObject<Properties<ComponentInput>> {
  return z.object({
    child: z.lazy(() => ComponentInputSchema().nullish()),
    childrens: z.array(z.lazy(() => ComponentInputSchema().nullable())).nullish(),
    event: z.lazy(() => EventInputSchema().nullish()),
    name: z.string(),
    type: ButtonComponentTypeSchema
  })
}

export function DropDownComponentInputSchema(): z.ZodObject<Properties<DropDownComponentInput>> {
  return z.object({
    dropdownComponent: z.lazy(() => ComponentInputSchema().nullish()),
    getEvent: z.lazy(() => EventInputSchema())
  })
}

export function EventArgumentInputSchema(): z.ZodObject<Properties<EventArgumentInput>> {
  return z.object({
    name: z.string().min(5),
    value: z.string().regex(/^foo/, "message")
  })
}

export function EventInputSchema(): z.ZodObject<Properties<EventInput>> {
  return z.object({
    arguments: z.array(z.lazy(() => EventArgumentInputSchema())),
    options: z.array(EventOptionTypeSchema).nullish()
  })
}

export const EventOptionTypeSchema = z.nativeEnum(EventOptionType);

export function HttpInputSchema(): z.ZodObject<Properties<HttpInput>> {
  return z.object({
    method: HttpMethodSchema.nullish(),
    url: definedNonNullAnySchema
  })
}

export const HttpMethodSchema = z.nativeEnum(HttpMethod);

export function LayoutInputSchema(): z.ZodObject<Properties<LayoutInput>> {
  return z.object({
    dropdown: z.lazy(() => DropDownComponentInputSchema().nullish())
  })
}

export function PageInputSchema(): z.ZodObject<Properties<PageInput>> {
  return z.object({
    attributes: z.array(z.lazy(() => AttributeInputSchema())).nullish(),
    date: definedNonNullAnySchema.nullish(),
    height: z.number(),
    id: z.string(),
    layout: z.lazy(() => LayoutInputSchema()),
    pageType: PageTypeSchema,
    postIDs: z.array(z.string()).nullish(),
    show: z.boolean(),
    tags: z.array(z.string().nullable()).nullish(),
    title: z.string(),
    width: z.number()
  })
}

export const PageTypeSchema = z.nativeEnum(PageType);

export function UserSchema(): z.ZodObject<Properties<User>> {
  return z.object({
    __typename: z.literal('User').optional(),
    createdAt: definedNonNullAnySchema.nullish(),
    email: z.string().nullish(),
    id: z.string().nullish(),
    name: z.string().nullish(),
    password: z.string().nullish(),
    updatedAt: definedNonNullAnySchema.nullish()
  })
}
