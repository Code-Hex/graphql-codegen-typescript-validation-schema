import * as myzod from 'myzod'
import { PageType, HttpMethod, HttpInput, EventOptionType, EventArgumentInput, EventInput, ComponentInput, DropDownComponentInput, LayoutInput, ButtonComponentType, AttributeInput, PageInput, Guest, Admin, User } from '../types'

export const definedNonNullAnySchema = myzod.object({});

export const PageTypeSchema = myzod.enum(PageType);

export const HttpMethodSchema = myzod.enum(HttpMethod);

export const EventOptionTypeSchema = myzod.enum(EventOptionType);

export const ButtonComponentTypeSchema = myzod.enum(ButtonComponentType);

export const HttpInputSchema: myzod.Type<HttpInput> = myzod.object({
    method: HttpMethodSchema.optional().nullable(),
    url: definedNonNullAnySchema
});

export const EventArgumentInputSchema: myzod.Type<EventArgumentInput> = myzod.object({
    name: myzod.string().min(5),
    value: myzod.string().pattern(/^foo/)
});

export const EventInputSchema: myzod.Type<EventInput> = myzod.object({
    arguments: myzod.array(myzod.lazy(() => EventArgumentInputSchema)),
    options: myzod.array(EventOptionTypeSchema).optional().nullable()
});

export const ComponentInputSchema: myzod.Type<ComponentInput> = myzod.object({
    child: myzod.lazy(() => ComponentInputSchema.optional().nullable()),
    childrens: myzod.array(myzod.lazy(() => ComponentInputSchema.nullable())).optional().nullable(),
    event: myzod.lazy(() => EventInputSchema.optional().nullable()),
    name: myzod.string(),
    type: ButtonComponentTypeSchema
});

export const DropDownComponentInputSchema: myzod.Type<DropDownComponentInput> = myzod.object({
    dropdownComponent: myzod.lazy(() => ComponentInputSchema.optional().nullable()),
    getEvent: myzod.lazy(() => EventInputSchema)
});

export const LayoutInputSchema: myzod.Type<LayoutInput> = myzod.object({
    dropdown: myzod.lazy(() => DropDownComponentInputSchema.optional().nullable())
});

export const AttributeInputSchema: myzod.Type<AttributeInput> = myzod.object({
    key: myzod.string().optional().nullable(),
    val: myzod.string().optional().nullable()
});

export const PageInputSchema: myzod.Type<PageInput> = myzod.object({
    attributes: myzod.array(myzod.lazy(() => AttributeInputSchema)).optional().nullable(),
    date: definedNonNullAnySchema.optional().nullable(),
    height: myzod.number(),
    id: myzod.string(),
    layout: myzod.lazy(() => LayoutInputSchema),
    pageType: PageTypeSchema,
    postIDs: myzod.array(myzod.string()).optional().nullable(),
    show: myzod.boolean(),
    tags: myzod.array(myzod.string().nullable()).optional().nullable(),
    title: myzod.string(),
    width: myzod.number()
});

export const GuestSchema: myzod.Type<Guest> = myzod.object({
    __typename: myzod.literal('Guest').optional(),
    lastLoggedIn: definedNonNullAnySchema.optional().nullable()
});

export const AdminSchema: myzod.Type<Admin> = myzod.object({
    __typename: myzod.literal('Admin').optional(),
    lastModifiedAt: definedNonNullAnySchema.optional().nullable()
});

export const UserKindSchema = myzod.union([AdminSchema, GuestSchema]);

export const UserSchema: myzod.Type<User> = myzod.object({
    __typename: myzod.literal('User').optional(),
    createdAt: definedNonNullAnySchema.optional().nullable(),
    email: myzod.string().optional().nullable(),
    id: myzod.string().optional().nullable(),
    kind: UserKindSchema.optional().nullable(),
    name: myzod.string().optional().nullable(),
    password: myzod.string().optional().nullable(),
    updatedAt: definedNonNullAnySchema.optional().nullable()
});
