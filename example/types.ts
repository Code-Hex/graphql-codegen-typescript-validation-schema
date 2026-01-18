export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  lastModifiedAt?: Maybe<Scalars['Date']['output']>;
};

export type AttributeInput =
  { key: Scalars['String']['input']; val?: never; }
  |  { key?: never; val: Scalars['String']['input']; };

export enum ButtonComponentType {
  Button = 'BUTTON',
  Submit = 'SUBMIT'
}

export type Comment = {
  __typename?: 'Comment';
  replies?: Maybe<Array<Comment>>;
};

export type ComponentInput =
  { child: ComponentInput; childrens?: never; event?: never; name?: never; type?: never; }
  |  { child?: never; childrens: Array<InputMaybe<ComponentInput>>; event?: never; name?: never; type?: never; }
  |  { child?: never; childrens?: never; event: EventInput; name?: never; type?: never; }
  |  { child?: never; childrens?: never; event?: never; name: Scalars['String']['input']; type?: never; }
  |  { child?: never; childrens?: never; event?: never; name?: never; type: ButtonComponentType; };

export type DropDownComponentInput =
  { dropdownComponent: ComponentInput; getEvent?: never; }
  |  { dropdownComponent?: never; getEvent: EventInput; };

export type EventArgumentInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type EventInput = {
  arguments: Array<EventArgumentInput>;
  options?: InputMaybe<Array<EventOptionType>>;
};

export enum EventOptionType {
  Reload = 'RELOAD',
  Retry = 'RETRY'
}

export type Guest = {
  __typename?: 'Guest';
  lastLoggedIn?: Maybe<Scalars['Date']['output']>;
};

export type HttpInput =
  { method: HttpMethod; url?: never; }
  |  { method?: never; url: Scalars['URL']['input']; };

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST'
}

export type LayoutInput = {
  dropdown?: InputMaybe<DropDownComponentInput>;
};

export type MyType = {
  __typename?: 'MyType';
  foo?: Maybe<Scalars['String']['output']>;
};


export type MyTypeFooArgs = {
  a?: InputMaybe<Scalars['String']['input']>;
  b: Scalars['Int']['input'];
  c?: InputMaybe<Scalars['Boolean']['input']>;
  d: Scalars['Float']['input'];
};

export type Namer = {
  name?: Maybe<Scalars['String']['output']>;
};

export type PageInput =
  { attributes: Array<AttributeInput>; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date: Scalars['Date']['input']; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height: Scalars['Float']['input']; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id: Scalars['ID']['input']; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout: LayoutInput; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType: PageType; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs: Array<InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>>; postIDs2?: never; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2: Array<Array<InputMaybe<Scalars['ID']['input']>>>; show?: never; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show: Scalars['Boolean']['input']; tags?: never; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags: Array<InputMaybe<Scalars['String']['input']>>; title?: never; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title: Scalars['String']['input']; width?: never; }
  |  { attributes?: never; date?: never; height?: never; id?: never; layout?: never; pageType?: never; postIDs?: never; postIDs2?: never; show?: never; tags?: never; title?: never; width: Scalars['Int']['input']; };

export enum PageType {
  BasicAuth = 'BASIC_AUTH',
  Lp = 'LP',
  Restricted = 'RESTRICTED',
  Service = 'SERVICE'
}

export type User = Namer & {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  kind?: Maybe<UserKind>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type UserKind = Admin | Guest;
