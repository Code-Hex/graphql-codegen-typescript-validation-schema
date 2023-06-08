import { z } from 'zod'
import { PageType, HttpMethod, HttpInput, EventOptionType, EventArgumentInput, EventInput, ComponentInput, DropDownComponentInput, LayoutInput, ButtonComponentType, AttributeInput, PageInput, Guest, Admin, User } from '../types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const PageTypeSchema = z.nativeEnum(PageType);

export const HttpMethodSchema = z.nativeEnum(HttpMethod);

export const EventOptionTypeSchema = z.nativeEnum(EventOptionType);

export const ButtonComponentTypeSchema = z.nativeEnum(ButtonComponentType);

export const HttpInputSchema: z.ZodObject<Properties<HttpInput>> = z.object({
    method: HttpMethodSchema.nullish(),
    url: definedNonNullAnySchema
});

export const EventArgumentInputSchema: z.ZodObject<Properties<EventArgumentInput>> = z.object({
    name: z.string().min(5),
    value: z.string().regex(/^foo/, "message")
});

export const EventInputSchema: z.ZodObject<Properties<EventInput>> = z.object({
    arguments: z.array(z.lazy(() => EventArgumentInputSchema)),
    options: z.array(EventOptionTypeSchema).nullish()
});

export const ComponentInputSchema: z.ZodObject<Properties<ComponentInput>> = z.object({
    child: z.lazy(() => ComponentInputSchema.nullish()),
    childrens: z.array(z.lazy(() => ComponentInputSchema.nullable())).nullish(),
    event: z.lazy(() => EventInputSchema.nullish()),
    name: z.string(),
    type: ButtonComponentTypeSchema
});

export const DropDownComponentInputSchema: z.ZodObject<Properties<DropDownComponentInput>> = z.object({
    dropdownComponent: z.lazy(() => ComponentInputSchema.nullish()),
    getEvent: z.lazy(() => EventInputSchema)
});

export const LayoutInputSchema: z.ZodObject<Properties<LayoutInput>> = z.object({
    dropdown: z.lazy(() => DropDownComponentInputSchema.nullish())
});

export const AttributeInputSchema: z.ZodObject<Properties<AttributeInput>> = z.object({
    key: z.string().nullish(),
    val: z.string().nullish()
});

export const PageInputSchema: z.ZodObject<Properties<PageInput>> = z.object({
    attributes: z.array(z.lazy(() => AttributeInputSchema)).nullish(),
    date: definedNonNullAnySchema.nullish(),
    height: z.number(),
    id: z.string(),
    layout: z.lazy(() => LayoutInputSchema),
    pageType: PageTypeSchema,
    postIDs: z.array(z.string()).nullish(),
    show: z.boolean(),
    tags: z.array(z.string().nullable()).nullish(),
    title: z.string(),
    width: z.number()
});

export const GuestSchema: z.ZodObject<Properties<Guest>> = z.object({
    __typename: z.literal('Guest').optional(),
    lastLoggedIn: definedNonNullAnySchema.nullish()
});

export const AdminSchema: z.ZodObject<Properties<Admin>> = z.object({
    __typename: z.literal('Admin').optional(),
    lastModifiedAt: definedNonNullAnySchema.nullish()
});

export const UserKindSchema = z.union([AdminSchema, GuestSchema]);

export const UserSchema: z.ZodObject<Properties<User>> = z.object({
    __typename: z.literal('User').optional(),
    createdAt: definedNonNullAnySchema.nullish(),
    email: z.string().nullish(),
    id: z.string().nullish(),
    kind: UserKindSchema.nullish(),
    name: z.string().nullish(),
    password: z.string().nullish(),
    updatedAt: definedNonNullAnySchema.nullish()
});
