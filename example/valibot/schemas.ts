import * as v from 'valibot'
import { AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, HttpInput, HttpMethod, LayoutInput, PageInput, PageType } from '../types'

export const ButtonComponentTypeSchema = v.enum_(ButtonComponentType);

export const EventOptionTypeSchema = v.enum_(EventOptionType);

export const HttpMethodSchema = v.enum_(HttpMethod);

export const PageTypeSchema = v.enum_(PageType);

export function AttributeInputSchema() {
  return v.object({
    key: v.nullish(v.string()),
    val: v.nullish(v.string())
  })
}

export function ComponentInputSchema(): v.GenericSchema<ComponentInput> {
  return v.object({
    child: v.lazy(() => v.nullish(ComponentInputSchema())),
    childrens: v.nullish(v.array(v.lazy(() => v.nullable(ComponentInputSchema())))),
    event: v.lazy(() => v.nullish(EventInputSchema())),
    name: v.string(),
    type: ButtonComponentTypeSchema
  })
}

export function DropDownComponentInputSchema() {
  return v.object({
    dropdownComponent: v.lazy(() => v.nullish(ComponentInputSchema())),
    getEvent: v.lazy(() => EventInputSchema())
  })
}

export function EventArgumentInputSchema(): v.GenericSchema<EventArgumentInput> {
  return v.object({
    name: v.pipe(v.string(), v.minLength(5)),
    value: v.pipe(v.string(), v.regex(/^foo/, "message"))
  })
}

type Infer1 = v.InferOutput<ReturnType<typeof EventArgumentInputSchema>>;

const ESchema = v.object({
  name: v.pipe(v.string(), v.minLength(5)),
  value: v.pipe(v.string(), v.regex(/^foo/, "message"))
});

type Infer2 = v.InferOutput<typeof ESchema>;

// const obj = v.object({ value: v.pipe(v.string(), v.minLength(5)) })
// // const obj = v.pipe(v.string(), v.minLength(5));
// type Infer1 = v.InferOutput<typeof obj>;

// // const str2: v.ObjectSchema<Readonly<{ value: v.SchemaWithPipe<[v.StringSchema<undefined>, v.MinLengthAction<string, 5, undefined>]> }>, undefined> = v.object({ value: v.pipe(v.string(), v.minLength(5)) })
// // const str2: v.ObjectSchema<Readonly<{ value: Omit<v.GenericSchema<string>, '_types' | '_run'> }>, undefined> = v.object({ value: v.pipe(v.string(), v.minLength(5)) })
// // const str2: v.GenericSchema<string> = v.pipe(v.string(), v.minLength(5));
// const obj2: v.GenericSchema<{ value: string }> = v.object({ value: v.pipe(v.string(), v.minLength(5)) })
// type Infer2 = v.InferOutput<typeof obj2>;

// 型が一致しているか確認するためのチェック
export const typeCheck: Infer1 extends Infer2
  ? Infer2 extends Infer1
  ? true
  : false
  : false = true;


export function EventInputSchema() {
  return v.object({
    arguments: v.array(v.lazy(() => EventArgumentInputSchema())),
    options: v.nullish(v.array(EventOptionTypeSchema))
  })
}

export function HttpInputSchema() {
  return v.object({
    method: v.nullish(HttpMethodSchema),
    url: v.any()
  })
}

export function LayoutInputSchema() {
  return v.object({
    dropdown: v.lazy(() => v.nullish(DropDownComponentInputSchema()))
  })
}

export function PageInputSchema() {
  return v.object({
    attributes: v.nullish(v.array(v.lazy(() => AttributeInputSchema()))),
    date: v.nullish(v.any()),
    height: v.number(),
    id: v.string(),
    layout: v.lazy(() => LayoutInputSchema()),
    pageType: PageTypeSchema,
    postIDs: v.nullish(v.array(v.string())),
    show: v.boolean(),
    tags: v.nullish(v.array(v.nullable(v.string()))),
    title: v.string(),
    width: v.number()
  })
}
