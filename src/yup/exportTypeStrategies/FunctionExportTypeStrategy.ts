import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import { Kind } from 'graphql';

import { ExportTypeStrategy } from './ExportTypeStrategy';

export class FunctionExportTypeStrategy implements ExportTypeStrategy {
  objectTypeDefinition(name: string, typeName: string, shape: string, appendArguments: string): string {
    return (
      new DeclarationBlock({})
        .export()
        .asKind('function')
        .withName(`${name}Schema(): yup.ObjectSchema<${name}>`)
        .withBlock(
          [
            indent(`return yup.object({`),
            indent(`__typename: yup.string<'${typeName}'>().optional(),`, 2),
            shape,
            indent('}).strict()'),
          ].join('\n')
        ).string + appendArguments
    );
  }

  unionTypeDefinition(unionName: string, unionElements: string): string {
    return new DeclarationBlock({})
      .export()
      .asKind('function')
      .withName(`${unionName}Schema(): yup.MixedSchema<${unionName}>`)
      .withBlock(indent(`return union<${unionName}>(${unionElements})`)).string;
  }

  inputObjectTypeDefinition(name: string, shape: string): string {
    return new DeclarationBlock({})
      .export()
      .asKind('function')
      .withName(`${name}Schema(): yup.ObjectSchema<${name}>`)
      .withBlock([indent(`return yup.object({`), shape, indent('}).strict()')].join('\n')).string;
  }

  schemaEvaluation(schema: string, kind?: Kind): string {
    // enum は関数出力形式でも定数として出力する
    if (kind === Kind.ENUM_TYPE_DEFINITION) return schema;

    return `${schema}()`;
  }
}
