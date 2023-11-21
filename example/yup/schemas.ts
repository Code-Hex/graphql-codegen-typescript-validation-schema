import * as yup from 'yup'
import { Admin, AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, Guest, HttpInput, HttpMethod, LayoutInput, Mutation, MutationHelloArgs, MyType, MyTypeFooArgs, PageInput, PageType, User, UserKind } from '../types'

export const ButtonComponentTypeSchema = yup.string<ButtonComponentType>().oneOf([ButtonComponentType.Button, ButtonComponentType.Submit]);

export const EventOptionTypeSchema = yup.string<EventOptionType>().oneOf([EventOptionType.Reload, EventOptionType.Retry]);

export const HttpMethodSchema = yup.string<HttpMethod>().oneOf([HttpMethod.Get, HttpMethod.Post]);

export const PageTypeSchema = yup.string<PageType>().oneOf([PageType.BasicAuth, PageType.Lp, PageType.Restricted, PageType.Service]);

function union<T extends {}>(...schemas: ReadonlyArray<yup.Schema<T>>): yup.MixedSchema<T> {
  return yup.mixed<T>().test({
    test: (value) => schemas.some((schema) => schema.isValidSync(value))
  }).defined()
}

export function AdminSchema(): yup.ObjectSchema<Admin> {
  return yup.object({
    __typename: yup.string<'Admin'>(),
    lastModifiedAt: yup.mixed().nullable()
  }).strict()
}

export function AttributeInputSchema(): yup.ObjectSchema<AttributeInput> {
  return yup.object({
    key: yup.string().nullable(),
    val: yup.string().nullable()
  }).strict()
}

export function ComponentInputSchema(): yup.ObjectSchema<ComponentInput> {
  return yup.object({
    child: ComponentInputSchema().nullable(),
    childrens: yup.array(ComponentInputSchema().nullable().defined()).nullable(),
    event: EventInputSchema().nullable(),
    name: yup.string().nonNullable().defined(),
    type: ButtonComponentTypeSchema.nonNullable().defined()
  }).strict()
}

export function DropDownComponentInputSchema(): yup.ObjectSchema<DropDownComponentInput> {
  return yup.object({
    dropdownComponent: ComponentInputSchema().nullable(),
    getEvent: EventInputSchema().nonNullable().defined()
  }).strict()
}

export function EventArgumentInputSchema(): yup.ObjectSchema<EventArgumentInput> {
  return yup.object({
    favorites: yup.array(yup.string().maxLength(16).nonNullable().defined()).size(5).nonNullable().defined(),
    name: yup.lazy(() => yup.string().varchar().required_without("nickname").nonNullable().defined()),
    nickname: yup.lazy(() => yup.string().sometimes("nickname", schema => schema.varchar().max(10).required_without("name")).nullable()),
    value: yup.string().startsWith("Sir").nonNullable().defined()
  }).strict()
}

export function EventInputSchema(): yup.ObjectSchema<EventInput> {
  return yup.object({
    arguments: yup.array(EventArgumentInputSchema().nonNullable().defined()).nonNullable().defined(),
    options: yup.array(EventOptionTypeSchema.nonNullable().defined()).nullable()
  }).strict()
}

export function GuestSchema(): yup.ObjectSchema<Guest> {
  return yup.object({
    __typename: yup.string<'Guest'>(),
    lastLoggedIn: yup.mixed().nullable()
  }).strict()
}

export function HttpInputSchema(): yup.ObjectSchema<HttpInput> {
  return yup.object({
    method: HttpMethodSchema.nullable(),
    url: yup.mixed().nonNullable().defined()
  }).strict()
}

export function LayoutInputSchema(): yup.ObjectSchema<LayoutInput> {
  return yup.object({
    dropdown: DropDownComponentInputSchema().nullable()
  }).strict()
}

export function MutationSchema(): yup.ObjectSchema<Mutation> {
  return yup.object({
    __typename: yup.string<'Mutation'>(),
    hello: yup.string().nullable()
  }).strict()
}

export function MutationHelloArgsSchema(): yup.ObjectSchema<MutationHelloArgs> {
  return yup.object({
    message: yup.string().required().min(5).nonNullable().defined()
  }).strict()
}

export function MyTypeSchema(): yup.ObjectSchema<MyType> {
  return yup.object({
    __typename: yup.string<'MyType'>(),
    foo: yup.string().nullable()
  }).strict()
}

export function MyTypeFooArgsSchema(): yup.ObjectSchema<MyTypeFooArgs> {
  return yup.object({
    a: yup.string().nullable(),
    b: yup.number().nonNullable().defined(),
    c: yup.boolean().nullable(),
    d: yup.number().nonNullable().defined()
  }).strict()
}

export function PageInputSchema(): yup.ObjectSchema<PageInput> {
  return yup.object({
    attributes: yup.array(AttributeInputSchema().nonNullable().defined()).nullable(),
    date: yup.mixed().nullable(),
    height: yup.number().nonNullable().defined(),
    id: yup.string().nonNullable().defined(),
    layout: LayoutInputSchema().nonNullable().defined(),
    pageType: PageTypeSchema.nonNullable().defined(),
    postIDs: yup.array(yup.string().nonNullable().defined()).nullable(),
    show: yup.boolean().nonNullable().defined(),
    tags: yup.array(yup.string().nullable().defined()).nullable(),
    title: yup.string().nonNullable().defined(),
    width: yup.number().nonNullable().defined()
  }).strict()
}

export function UserSchema(): yup.ObjectSchema<User> {
  return yup.object({
    __typename: yup.string<'User'>(),
    createdAt: yup.mixed().nullable(),
    email: yup.string().nullable(),
    id: yup.string().nullable(),
    kind: UserKindSchema().nullable(),
    name: yup.string().nullable(),
    password: yup.string().nullable(),
    updatedAt: yup.mixed().nullable()
  }).strict()
}

export function UserKindSchema(): yup.MixedSchema<UserKind> {
  return union<UserKind>(AdminSchema(), GuestSchema())
}
