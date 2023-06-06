import * as yup from 'yup'
import { Admin, AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, Guest, HttpInput, HttpMethod, LayoutInput, PageInput, PageType, User, UserKind } from '../types'

export const ButtonComponentTypeSchema = yup.string<ButtonComponentType>().oneOf([ButtonComponentType.Button, ButtonComponentType.Submit]).defined();

export const EventOptionTypeSchema = yup.string<EventOptionType>().oneOf([EventOptionType.Reload, EventOptionType.Retry]).defined();

export const HttpMethodSchema = yup.string<HttpMethod>().oneOf([HttpMethod.Get, HttpMethod.Post]).defined();

export const PageTypeSchema = yup.string<PageType>().oneOf([PageType.BasicAuth, PageType.Lp, PageType.Restricted, PageType.Service]).defined();

function union<T extends {}>(...schemas: ReadonlyArray<yup.Schema<T>>): yup.MixedSchema<T> {
  return yup.mixed<T>().test({
    test: (value) => schemas.some((schema) => schema.isValidSync(value))
  }).defined()
}

export const AdminSchema: yup.ObjectSchema<Admin> = yup.object({
    __typename: yup.string<'Admin'>().optional(),
    lastModifiedAt: yup.mixed().nullable().optional()
});

export const AttributeInputSchema: yup.ObjectSchema<AttributeInput> = yup.object({
    key: yup.string().defined().nullable().optional(),
    val: yup.string().defined().nullable().optional()
});

export const ComponentInputSchema: yup.ObjectSchema<ComponentInput> = yup.object({
    child: yup.lazy(() => ComponentInputSchema).optional(),
    childrens: yup.array(yup.lazy(() => ComponentInputSchema)).defined().nullable().optional(),
    event: yup.lazy(() => EventInputSchema).optional(),
    name: yup.string().defined().nonNullable(),
    type: ButtonComponentTypeSchema.nonNullable()
});

export const DropDownComponentInputSchema: yup.ObjectSchema<DropDownComponentInput> = yup.object({
    dropdownComponent: yup.lazy(() => ComponentInputSchema).optional(),
    getEvent: yup.lazy(() => EventInputSchema.nonNullable())
});

export const EventArgumentInputSchema: yup.ObjectSchema<EventArgumentInput> = yup.object({
    name: yup.string().defined().nonNullable().min(5),
    value: yup.string().defined().nonNullable().matches(/^foo/)
});

export const EventInputSchema: yup.ObjectSchema<EventInput> = yup.object({
    arguments: yup.array(yup.lazy(() => EventArgumentInputSchema.nonNullable())).defined(),
    options: yup.array(EventOptionTypeSchema.nonNullable()).defined().nullable().optional()
});

export const GuestSchema: yup.ObjectSchema<Guest> = yup.object({
    __typename: yup.string<'Guest'>().optional(),
    lastLoggedIn: yup.mixed().nullable().optional()
});

export const HttpInputSchema: yup.ObjectSchema<HttpInput> = yup.object({
    method: HttpMethodSchema.nullable().optional(),
    url: yup.mixed().nonNullable()
});

export const LayoutInputSchema: yup.ObjectSchema<LayoutInput> = yup.object({
    dropdown: yup.lazy(() => DropDownComponentInputSchema).optional()
});

export const PageInputSchema: yup.ObjectSchema<PageInput> = yup.object({
    attributes: yup.array(yup.lazy(() => AttributeInputSchema.nonNullable())).defined().nullable().optional(),
    date: yup.mixed().nullable().optional(),
    height: yup.number().defined().nonNullable(),
    id: yup.string().defined().nonNullable(),
    layout: yup.lazy(() => LayoutInputSchema.nonNullable()),
    pageType: PageTypeSchema.nonNullable(),
    postIDs: yup.array(yup.string().defined().nonNullable()).defined().nullable().optional(),
    show: yup.boolean().defined().nonNullable(),
    tags: yup.array(yup.string().defined().nullable()).defined().nullable().optional(),
    title: yup.string().defined().nonNullable(),
    width: yup.number().defined().nonNullable()
});

export const UserSchema: yup.ObjectSchema<User> = yup.object({
    __typename: yup.string<'User'>().optional(),
    createdAt: yup.mixed().nullable().optional(),
    email: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nullable().optional(),
    kind: UserKindSchema.nullable().optional(),
    name: yup.string().defined().nullable().optional(),
    password: yup.string().defined().nullable().optional(),
    updatedAt: yup.mixed().nullable().optional()
});

export const UserKindSchema: yup.MixedSchema<UserKind> = union<UserKind>(AdminSchema, GuestSchema);
