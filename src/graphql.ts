import {
  ListTypeNode,
  NonNullTypeNode,
  NamedTypeNode,
  TypeNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  visit,
} from "graphql";
import { transformSchemaAST } from "@graphql-codegen/schema-ast";
import { Nodes, ValidationSchemaPluginConfig } from "./types";

export const isListType = (typ: TypeNode): typ is ListTypeNode =>
  typ.kind === "ListType";
export const isNonNullType = (typ: TypeNode): typ is NonNullTypeNode =>
  typ.kind === "NonNullType";
export const isNamedType = (typ: TypeNode): typ is NamedTypeNode =>
  typ.kind === "NamedType";

export const isRef = (kind: string) => kind.includes("Input");
export const isBoolean = (kind: string) => kind === "Boolean";
export const isString = (kind: string) => ["ID", "String"].includes(kind);
export const isNumber = (kind: string) => ["Int", "Float"].includes(kind);


export const retrieveSchema = (
  schema: GraphQLSchema,
  config: ValidationSchemaPluginConfig
): Nodes => {
  const { ast } = transformSchemaAST(schema, config);

  const inputObjects: InputObjectTypeDefinitionNode[] = [];
  const enums: Record<string, EnumTypeDefinitionNode> = {};
  const scalars: Record<string, ScalarTypeDefinitionNode> = {};

  visit(ast, {
    leave: {
      InputObjectTypeDefinition: (node) => {
        inputObjects.unshift(node);
      },
      EnumTypeDefinition: (node) => {
        if (node.values) {
          enums[node.name.value] = node;
        }
      },
      ScalarTypeDefinition: (node) => {
        scalars[node.name.value] = node;
      },
    },
  });

  return { inputObjects, enums, scalars };
};
