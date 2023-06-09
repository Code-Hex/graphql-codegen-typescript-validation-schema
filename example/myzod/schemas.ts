import * as myzod from 'myzod'
import { Admin, AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, Guest, HttpInput, HttpMethod, LayoutInput, PageInput, PageType, User } from '../types'

export const definedNonNullAnySchema = myzod.object({});

export const ButtonComponentTypeSchema = myzod.enum(ButtonComponentType);

export const EventOptionTypeSchema = myzod.enum(EventOptionType);

export const HttpMethodSchema = myzod.enum(HttpMethod);

export const PageTypeSchema = myzod.enum(PageType);

export function AdminSchema(): myzod.Type<Admin> {
  return myzod.object({
    __typename: myzod.literal('Admin').optional(),
    lastModifiedAt: definedNonNullAnySchema.optional().nullable()
  })
}

export function AttributeInputSchema(): myzod.Type<AttributeInput> {
  return myzod.object({
    key: myzod.string().optional().nullable(),
    val: myzod.string().optional().nullable()
  })
}

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

export function GuestSchema(): myzod.Type<Guest> {
  return myzod.object({
    __typename: myzod.literal('Guest').optional(),
    lastLoggedIn: definedNonNullAnySchema.optional().nullable()
  })
}

export function HttpInputSchema(): myzod.Type<HttpInput> {
  return myzod.object({
    method: HttpMethodSchema.optional().nullable(),
    url: definedNonNullAnySchema
  })
}

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

export function UserSchema(): myzod.Type<User> {
  return myzod.object({
    __typename: myzod.literal('User').optional(),
    createdAt: definedNonNullAnySchema.optional().nullable(),
    email: myzod.string().optional().nullable(),
    id: myzod.string().optional().nullable(),
    kind: UserKindSchema().optional().nullable(),
    name: myzod.string().optional().nullable(),
    password: myzod.string().optional().nullable(),
    updatedAt: definedNonNullAnySchema.optional().nullable()
  })
}

export function UserKindSchema() {
  return myzod.union([AdminSchema(), GuestSchema()])
}
