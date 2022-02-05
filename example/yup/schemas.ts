import * as yup from 'yup'
import { AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, HttpInput, HttpMethod, LayoutInput, PageInput, PageType } from '../types'

export function AttributeInputSchema(): yup.SchemaOf<AttributeInput> {
  return yup.object({
    key: yup.string(),
    val: yup.string()
  })
}

export const ButtonComponentTypeSchema = yup.mixed().oneOf([ButtonComponentType.Button, ButtonComponentType.Submit]);

export function ComponentInputSchema(): yup.SchemaOf<ComponentInput> {
  return yup.object({
    child: yup.lazy(() => ComponentInputSchema()) as never,
    childrens: yup.array().of(yup.lazy(() => ComponentInputSchema()) as never).optional(),
    event: yup.lazy(() => EventInputSchema()) as never,
    name: yup.string().defined(),
    type: ButtonComponentTypeSchema.required()
  })
}

export function DropDownComponentInputSchema(): yup.SchemaOf<DropDownComponentInput> {
  return yup.object({
    dropdownComponent: yup.lazy(() => ComponentInputSchema()) as never,
    getEvent: yup.lazy(() => EventInputSchema().required()) as never
  })
}

export function EventArgumentInputSchema(): yup.SchemaOf<EventArgumentInput> {
  return yup.object({
    name: yup.string().defined().min(5),
    value: yup.string().defined().matches(/^foo/)
  })
}

export function EventInputSchema(): yup.SchemaOf<EventInput> {
  return yup.object({
    arguments: yup.array().of(yup.lazy(() => EventArgumentInputSchema().required()) as never).required(),
    options: yup.array().of(EventOptionTypeSchema.required()).optional()
  })
}

export const EventOptionTypeSchema = yup.mixed().oneOf([EventOptionType.Reload, EventOptionType.Retry]);

export function HttpInputSchema(): yup.SchemaOf<HttpInput> {
  return yup.object({
    method: HttpMethodSchema,
    url: yup.mixed().required()
  })
}

export const HttpMethodSchema = yup.mixed().oneOf([HttpMethod.Get, HttpMethod.Post]);

export function LayoutInputSchema(): yup.SchemaOf<LayoutInput> {
  return yup.object({
    dropdown: yup.lazy(() => DropDownComponentInputSchema()) as never
  })
}

export function PageInputSchema(): yup.SchemaOf<PageInput> {
  return yup.object({
    attributes: yup.array().of(yup.lazy(() => AttributeInputSchema().required()) as never).optional(),
    date: yup.mixed(),
    height: yup.number().required(),
    id: yup.string().defined(),
    layout: yup.lazy(() => LayoutInputSchema().required()) as never,
    pageType: PageTypeSchema.required(),
    postIDs: yup.array().of(yup.string().defined()).optional(),
    show: yup.boolean().required(),
    tags: yup.array().of(yup.string()).optional(),
    title: yup.string().defined(),
    width: yup.number().required()
  })
}

export const PageTypeSchema = yup.mixed().oneOf([PageType.BasicAuth, PageType.Lp, PageType.Restricted, PageType.Service]);
