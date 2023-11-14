import * as yup from 'yup'
import { Admin, AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, Guest, HttpInput, HttpMethod, LayoutInput, Mutation, MutationHelloArgs, MyType, MyTypeFooArgs, PageInput, PageType, User, UserKind } from '../types'

export const ButtonComponentTypeSchema = yup.string<ButtonComponentType>().oneOf([ButtonComponentType.Button, ButtonComponentType.Submit]);

export const EventOptionTypeSchema = yup.string<EventOptionType>().oneOf([EventOptionType.Reload, EventOptionType.Retry]);

export const HttpMethodSchema = yup.string<HttpMethod>().oneOf([HttpMethod.Get, HttpMethod.Post]);

export const PageTypeSchema = yup.string<PageType>().oneOf([PageType.BasicAuth, PageType.Lp, PageType.Restricted, PageType.Service]);

function union<T extends {}>(...schemas: ReadonlyArray<yup.Schema<T>>): yup.MixedSchema<T> {
  return yup.mixed<T>().test({
    test: (value) => schemas.some((schema) => schema.isValidSync(value))
  })
}

export function AdminSchema(): yup.ObjectSchema<Admin> {
  return yup.object({
    __typename: yup.string<'Admin'>().optional(),
    lastModifiedAt: yup.mixed().nullable().optional()
  }).strict()
}

export function AttributeInputSchema(): yup.ObjectSchema<AttributeInput> {
  return yup.object({
    key: yup.string().nullable().optional(),
    val: yup.string().nullable().optional()
  }).strict()
}

export function ComponentInputSchema(): yup.ObjectSchema<ComponentInput> {
  return yup.object({
    child: ComponentInputSchema().optional(),
    childrens: yup.array(ComponentInputSchema()).nullable().optional(),
    event: EventInputSchema().optional(),
    name: yup.string().defined().nonNullable(),
    type: ButtonComponentTypeSchema.defined().nonNullable()
  }).strict()
}

export function DropDownComponentInputSchema(): yup.ObjectSchema<DropDownComponentInput> {
  return yup.object({
    dropdownComponent: ComponentInputSchema().optional(),
    getEvent: EventInputSchema().defined().nonNullable()
  }).strict()
}

export function EventArgumentInputSchema(): yup.ObjectSchema<EventArgumentInput> {
  return yup.object({
    favorites: yup.array(yup.string().maxLength(16).defined().nonNullable()).size(5),
    name: yup.string().varchar().defined().nonNullable(),
    value: yup.string().startsWith("Sir").defined().nonNullable()
  }).strict()
}

export function EventInputSchema(): yup.ObjectSchema<EventInput> {
  return yup.object({
    arguments: yup.array(EventArgumentInputSchema().defined().nonNullable()),
    options: yup.array(EventOptionTypeSchema.defined().nonNullable()).nullable().optional()
  }).strict()
}

export function GuestSchema(): yup.ObjectSchema<Guest> {
  return yup.object({
    __typename: yup.string<'Guest'>().optional(),
    lastLoggedIn: yup.mixed().nullable().optional()
  }).strict()
}

export function HttpInputSchema(): yup.ObjectSchema<HttpInput> {
  return yup.object({
    method: HttpMethodSchema.nullable().optional(),
    url: yup.mixed().defined().nonNullable()
  }).strict()
}

export function LayoutInputSchema(): yup.ObjectSchema<LayoutInput> {
  return yup.object({
    dropdown: DropDownComponentInputSchema().optional()
  }).strict()
}

export function MutationSchema(): yup.ObjectSchema<Mutation> {
  return yup.object({
    __typename: yup.string<'Mutation'>().optional(),
    hello: yup.string().nullable().optional()
  }).strict()
}

export function MutationHelloArgsSchema(): yup.ObjectSchema<MutationHelloArgs> {
  return yup.object({
    message: yup.string().required().min(5).defined().nonNullable()
  }).strict()
}

export function MyTypeSchema(): yup.ObjectSchema<MyType> {
  return yup.object({
    __typename: yup.string<'MyType'>().optional(),
    foo: yup.string().nullable().optional()
  }).strict()
}

export function MyTypeFooArgsSchema(): yup.ObjectSchema<MyTypeFooArgs> {
  return yup.object({
    a: yup.string().nullable().optional(),
    b: yup.number().defined().nonNullable(),
    c: yup.boolean().nullable().optional(),
    d: yup.number().defined().nonNullable()
  }).strict()
}

export function PageInputSchema(): yup.ObjectSchema<PageInput> {
  return yup.object({
    attributes: yup.array(AttributeInputSchema().defined().nonNullable()).nullable().optional(),
    date: yup.mixed().nullable().optional(),
    height: yup.number().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    layout: LayoutInputSchema().defined().nonNullable(),
    pageType: PageTypeSchema.defined().nonNullable(),
    postIDs: yup.array(yup.string().defined().nonNullable()).nullable().optional(),
    show: yup.boolean().defined().nonNullable(),
    tags: yup.array(yup.string().nullable()).nullable().optional(),
    title: yup.string().defined().nonNullable(),
    width: yup.number().defined().nonNullable()
  }).strict()
}

export function UserSchema(): yup.ObjectSchema<User> {
  return yup.object({
    __typename: yup.string<'User'>().optional(),
    createdAt: yup.mixed().nullable().optional(),
    email: yup.string().nullable().optional(),
    id: yup.string().nullable().optional(),
    kind: UserKindSchema().nullable().optional(),
    name: yup.string().nullable().optional(),
    password: yup.string().nullable().optional(),
    updatedAt: yup.mixed().nullable().optional()
  }).strict()
}

export function UserKindSchema(): yup.MixedSchema<UserKind> {
  return union<UserKind>(AdminSchema(), GuestSchema())
}
