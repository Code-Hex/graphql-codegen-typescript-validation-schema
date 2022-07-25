export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  URL: any;
};

export type AttributeInput = {
  key?: InputMaybe<Scalars['String']>;
  val?: InputMaybe<Scalars['String']>;
};

export enum ButtonComponentType {
  Button = 'BUTTON',
  Submit = 'SUBMIT'
}

export type ComponentInput = {
  child?: InputMaybe<ComponentInput>;
  childrens?: InputMaybe<Array<InputMaybe<ComponentInput>>>;
  event?: InputMaybe<EventInput>;
  name: Scalars['String'];
  type: ButtonComponentType;
};

export type DropDownComponentInput = {
  dropdownComponent?: InputMaybe<ComponentInput>;
  getEvent: EventInput;
};

export type EventArgumentInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type EventInput = {
  arguments: Array<EventArgumentInput>;
  options?: InputMaybe<Array<EventOptionType>>;
};

export enum EventOptionType {
  Reload = 'RELOAD',
  Retry = 'RETRY'
}

export type HttpInput = {
  method?: InputMaybe<HttpMethod>;
  url: Scalars['URL'];
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST'
}

export type LayoutInput = {
  dropdown?: InputMaybe<DropDownComponentInput>;
};

export type PageInput = {
  attributes?: InputMaybe<Array<AttributeInput>>;
  date?: InputMaybe<Scalars['Date']>;
  height: Scalars['Float'];
  id: Scalars['ID'];
  layout: LayoutInput;
  pageType: PageType;
  postIDs?: InputMaybe<Array<Scalars['ID']>>;
  show: Scalars['Boolean'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
  width: Scalars['Int'];
};

export enum PageType {
  BasicAuth = 'BASIC_AUTH',
  Lp = 'LP',
  Restricted = 'RESTRICTED',
  Service = 'SERVICE'
}

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};
