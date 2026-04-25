// Common GraphQL schema strings shared across multiple spec files.
// Use these constants instead of re-declaring identical schema strings per test.

export const PRIMITIVE_NON_NULL_SCHEMA = /* GraphQL */ `
  input PrimitiveInput {
    a: ID!
    b: String!
    c: Boolean!
    d: Int!
    e: Float!
  }
`;

export const PRIMITIVE_NULLABLE_SCHEMA = /* GraphQL */ `
  input PrimitiveInput {
    a: ID
    b: String
    c: Boolean
    d: Int
    e: Float
    z: String! # no defined check
  }
`;

export const ARRAY_INPUT_SCHEMA = /* GraphQL */ `
  input ArrayInput {
    a: [String]
    b: [String!]
    c: [String!]!
    d: [[String]]
    e: [[String]!]
    f: [[String]!]!
  }
`;

export const REF_INPUT_SCHEMA = /* GraphQL */ `
  input AInput {
    b: BInput!
  }
  input BInput {
    c: CInput!
  }
  input CInput {
    a: AInput!
  }
`;

export const NESTED_INPUT_SCHEMA = /* GraphQL */ `
  input NestedInput {
    child: NestedInput
    childrens: [NestedInput]
  }
`;

export const ENUM_SCHEMA = /* GraphQL */ `
  enum PageType {
    PUBLIC
    BASIC_AUTH
  }
  input PageInput {
    pageType: PageType!
  }
`;

export const CAMELCASE_SCHEMA = /* GraphQL */ `
  input HTTPInput {
    method: HTTPMethod
    url: URL!
  }

  enum HTTPMethod {
    GET
    POST
  }

  scalar URL # unknown scalar, should be any (definedNonNullAnySchema)
`;

export const SCALARS_SCHEMA = /* GraphQL */ `
  input Say {
    phrase: Text!
    times: Count!
  }

  scalar Count
  scalar Text
`;
