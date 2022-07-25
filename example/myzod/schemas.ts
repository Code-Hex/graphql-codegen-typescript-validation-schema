import * as myzod from 'myzod'
import { AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, HttpInput, HttpMethod, LayoutInput, PageInput, PageType, User } from '../types'

export const definedNonNullAnySchema = myzod.object({});

export function AttributeInputSchema(): myzod.Type<AttributeInput> {
  return myzod.object({
    key: myzod.string().optional().nullable(),
    val: myzod.string().optional().nullable()
  })
}

export const ButtonComponentTypeSchema = myzod.enum(ButtonComponentType);

export function ComponentInputSchema(): myzod.Type<ComponentInput> {
  return myzod.object({
    child: myzod.lazy(() => ComponentInputSchema().optional().nullable()),
    childrens: myzod.array(myzod.lazy(() => ComponentInputSchema().nullable())).optional().nullable(),
    event: myzod.lazy(() => EventInputSchema().optional().nullable()),
    name: myzod.string(),
    type: ButtonComponentTypeSchema
  })
}

export function DropDownComponentInputSchema(): myzod.Type<DropDownComponentInput> {
  return myzod.object({
    dropdownComponent: myzod.lazy(() => ComponentInputSchema().optional().nullable()),
    getEvent: myzod.lazy(() => EventInputSchema())
  })
}

export function EventArgumentInputSchema(): myzod.Type<EventArgumentInput> {
  return myzod.object({
    name: myzod.string().min(5),
    value: myzod.string().pattern(/^foo/)
  })
}

export function EventInputSchema(): myzod.Type<EventInput> {
  return myzod.object({
    arguments: myzod.array(myzod.lazy(() => EventArgumentInputSchema())),
    options: myzod.array(EventOptionTypeSchema).optional().nullable()
  })
}

export const EventOptionTypeSchema = myzod.enum(EventOptionType);

export function HttpInputSchema(): myzod.Type<HttpInput> {
  return myzod.object({
    method: HttpMethodSchema.optional().nullable(),
    url: definedNonNullAnySchema
  })
}

export const HttpMethodSchema = myzod.enum(HttpMethod);

export function LayoutInputSchema(): myzod.Type<LayoutInput> {
  return myzod.object({
    dropdown: myzod.lazy(() => DropDownComponentInputSchema().optional().nullable())
  })
}

export function PageInputSchema(): myzod.Type<PageInput> {
  return myzod.object({
    attributes: myzod.array(myzod.lazy(() => AttributeInputSchema())).optional().nullable(),
    date: definedNonNullAnySchema.optional().nullable(),
    height: myzod.number(),
    id: myzod.string(),
    layout: myzod.lazy(() => LayoutInputSchema()),
    pageType: PageTypeSchema,
    postIDs: myzod.array(myzod.string()).optional().nullable(),
    show: myzod.boolean(),
    tags: myzod.array(myzod.string().nullable()).optional().nullable(),
    title: myzod.string(),
    width: myzod.number()
  })
}

export const PageTypeSchema = myzod.enum(PageType);

export function UserSchema(): myzod.Type<User> {
  return myzod.object({
    __typename: myzod.literal('User').optional(),
    createdAt: definedNonNullAnySchema.optional().nullable(),
    email: myzod.string().optional().nullable(),
    id: myzod.string().optional().nullable(),
    name: myzod.string().optional().nullable(),
    password: myzod.string().optional().nullable(),
    updatedAt: definedNonNullAnySchema.optional().nullable()
  })
}
