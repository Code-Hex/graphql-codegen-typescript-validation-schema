import {
  isBoolean,
  isNumber,
  isRef,
  isString,
  isNonNullType,
  isListType,
  isNamedType,
} from "./../graphql";
import { Nodes } from "./../types";
import {
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  InputValueDefinitionNode,
  NameNode,
  TypeNode,
} from "graphql";
import { indent } from "@graphql-codegen/visitor-plugin-common";

interface InputObjectFieldGeneratorParams {
  field: InputValueDefinitionNode;
  indentCount?: number;
}

export const ImportYup = (): string => `import * as yup from 'yup'`

export class YupGenerator {
  private inputObjects: InputObjectTypeDefinitionNode[];
  private enums: Record<string, EnumTypeDefinitionNode>;
  private scalars: Record<string, ScalarTypeDefinitionNode>;

  constructor({ inputObjects, enums, scalars }: Nodes) {
    this.inputObjects = inputObjects;
    this.enums = enums;
    this.scalars = scalars;
  }

  public generate(): string {
    return this.inputObjects
      .map((inputObject) => this.generateInputObjectYupSchema(inputObject))
      .join("\n\n");
  }

  protected generateInputObjectYupSchema(
    inputObject: InputObjectTypeDefinitionNode
  ): string {
    const name = inputObject.name.value;
    const { fields } = inputObject;
    if (!fields) return ``;

    const shape = fields
      .map((field) =>
        this.generateInputObjectFieldYupSchema({
          field,
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
  }

  protected generateInputObjectFieldYupSchema = ({
    field,
    indentCount,
  }: InputObjectFieldGeneratorParams): string => {
    // TOOD(codehex): handle directive
    let schema = this.generateInputObjectFieldTypeYupSchema(field.type);
    return indent(
      `${field.name.value}: ${maybeLazy(field.type, schema)}`,
      indentCount
    );
  };

  protected generateInputObjectFieldTypeYupSchema = (
    type: TypeNode
  ): string => {
    if (isListType(type)) {
      return `yup.array().of(${this.generateInputObjectFieldTypeYupSchema(
        type.type
      )})`;
    }
    if (isNonNullType(type)) {
      const schema = this.generateInputObjectFieldTypeYupSchema(type.type);
      return maybeLazy(type.type, `${schema}.required()`);
    }
    if (isNamedType(type)) {
      return this.generateNameNodeYupSchema(type.name);
    }
    console.warn("unhandled type:", type);
    return "";
  };

  protected generateNameNodeYupSchema = (node: NameNode): string => {
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
    if (this.enums[node.value]) {
      const enumdef = this.enums[node.value];
      return `yup.mixed().oneOf(Object.values(${enumdef.name.value}))`;
    }
    if (this.scalars[node.value]) {
      console.warn("unhandled scalar:", this.scalars[node.value]);
      return "yup.mixed()";
    }
    console.warn("unhandled name:", node);
    return "yup.mixed()";
  };
}

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isRef(type.name.value)) {
    // https://github.com/jquense/yup/issues/1283#issuecomment-786559444
    return `yup.lazy(() => ${schema}) as never`;
  }
  return schema;
};
