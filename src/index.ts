import { ValidationSchema, ValidationSchemaPluginConfig } from "./types";
import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import {
  EnumTypeDefinitionNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  InputValueDefinitionNode,
  ScalarTypeDefinitionNode,
  visit,
  NamedTypeNode,
  TypeNode,
  ListTypeNode,
  NonNullTypeNode,
  NameNode,
} from "graphql";
import { transformSchemaAST } from "@graphql-codegen/schema-ast";

export const plugin: PluginFunction<ValidationSchemaPluginConfig> = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: ValidationSchemaPluginConfig
): Promise<Types.PluginOutput> => {
  const { inputObjects, enums, scalars } = retrieveSchema(schema, config);

  return {
    prepend: [importSchema(config.schema)],
    content: [
      generateYupSchema({ inputObjects, enums, scalars }),
    ].join("\n"),
  };
};

const importSchema = (schema?: ValidationSchema): string => {
  if (schema === "yup") {
    return `import * as yup from 'yup'`;
  }
  // TODO(codehex): support zod
  return `import * as yup from 'yup'`;
};

interface Nodes {
  inputObjects: InputObjectTypeDefinitionNode[];
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
}

const retrieveSchema = (
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

const generateYupSchema = ({ inputObjects, enums, scalars }: Nodes): string => {
  return inputObjects
    .map((inputObject) =>
      generateInputObjectYupSchema({ inputObject, enums, scalars })
    )
    .join("\n\n");
};

interface InputObjectGeneratorParams {
  inputObject: InputObjectTypeDefinitionNode;
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
}

const generateInputObjectYupSchema = ({
  inputObject,
  enums,
  scalars,
}: InputObjectGeneratorParams): string => {
  const name = inputObject.name.value;
  const { fields } = inputObject;
  if (!fields) return ``;

  const shape = fields
    .map((field) =>
      generateInputObjectFieldYupSchema({
        field,
        enums,
        scalars,
        indentCount: 2,
      })
    )
    .join(",\n");
  return [
    `export function ${name}Schema(): yup.SchemaOf<${name}> {`,
    indent(`return yup.object({`),
    shape,
    indent("})"),
    `}`,
  ].join("\n");
};

interface InputObjectFieldGeneratorParams {
  field: InputValueDefinitionNode;
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
  indentCount?: number;
}

const generateInputObjectFieldYupSchema = ({
  field,
  enums,
  scalars,
  indentCount,
}: InputObjectFieldGeneratorParams): string => {
  // TOOD(codehex): handle directive
  let schema = generateInputObjectFieldTypeYupSchema({
    type: field.type,
    enums,
    scalars,
  })
  return indent(
    `${field.name.value}: ${maybeLazy(field.type, schema)}`,
    indentCount
  );
};

interface InputObjectFieldTypeGeneratorParams {
  type: TypeNode;
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
}

const generateInputObjectFieldTypeYupSchema = ({
  type,
  enums,
  scalars,
}: InputObjectFieldTypeGeneratorParams): string => {
  if (isListType(type)) {
    return `yup.array().of(${generateInputObjectFieldTypeYupSchema({
      type: type.type,
      enums,
      scalars,
    })})`;
  }
  if (isNonNullType(type)) {
    const schema = generateInputObjectFieldTypeYupSchema({
      type: type.type,
      enums,
      scalars,
    })
    return maybeLazy(type.type, `${schema}.required()`);
  }
  if (isNamedType(type)) {
    return generateNameNodeYupSchema({
      node: type.name,
      enums,
      scalars,
    });
  }
  console.warn("unhandled type:", type);
  return "";
};

interface NameNodeGeneratorParams {
  node: NameNode;
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
}

const generateNameNodeYupSchema = ({
  node,
  enums,
  scalars,
}: NameNodeGeneratorParams): string => {
  if (isRef(node.value)) {
    return `${node.value}Schema()`;
  }
  if (isString(node.value)) {
    return `yup.string()`;
  }
  if (isBoolean(node.value)) {
    return `yup.boolean()`;
  }
  if (isNumber(node.value)) {
    return `yup.number()`;
  }
  if (enums[node.value]) {
    const enumdef = enums[node.value];
    return `yup.mixed().oneOf(Object.values(${enumdef.name.value}))`;
  }
  if (scalars[node.value]) {
    console.warn("unhandled scalar:", scalars[node.value]);
    return "yup.mixed()";
  }
  console.warn("unhandled name:", node);
  return "yup.mixed()";
};

const isListType = (typ: TypeNode): typ is ListTypeNode =>
  typ.kind === "ListType";
const isNonNullType = (typ: TypeNode): typ is NonNullTypeNode =>
  typ.kind === "NonNullType";
const isNamedType = (typ: TypeNode): typ is NamedTypeNode =>
  typ.kind === "NamedType";

const isRef = (kind: string) => kind.includes("Input");
const isBoolean = (kind: string) => kind === "Boolean";
const isString = (kind: string) => ["ID", "String"].includes(kind);
const isNumber = (kind: string) => ["Int", "Float"].includes(kind);

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isRef(type.name.value)) {
    // https://github.com/jquense/yup/issues/1283#issuecomment-786559444
    return `yup.lazy(() => ${schema}) as never`;
  }
  return schema
}