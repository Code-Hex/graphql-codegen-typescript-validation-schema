import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import { Kind } from 'graphql';

import { ExportTypeStrategy } from './ExportTypeStrategy';

export class ConstExportTypeStrategy implements ExportTypeStrategy {
  objectTypeDefinition(name: string, typeName: string, shape: string, appendArguments: string): string {
    return (
      new DeclarationBlock({})
        .export()
        .asKind('const')
        .withName(`${name}Schema: yup.ObjectSchema<${name}>`)
        .withContent(
          [`yup.object({`, indent(`__typename: yup.string<'${typeName}'>(),`, 2), shape, '}).strict()'].join('\n')
        ).string + appendArguments
    );
  }

  unionTypeDefinition(unionName: string, unionElements: string): string {
    return new DeclarationBlock({})
      .export()
      .asKind('const')
      .withName(`${unionName}Schema: yup.MixedSchema<${unionName}>`)
      .withContent(`union<${unionName}>(${unionElements})`).string;
  }

  inputObjectTypeDefinition(name: string, shape: string): string {
    return new DeclarationBlock({})
      .export()
      .asKind('const')
      .withName(`${name}Schema: yup.ObjectSchema<${name}>`)
      .withContent(['yup.object({', shape, '}).strict()'].join('\n')).string;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schemaEvaluation(schema: string, _kind: Kind | null): string {
    return schema;
  }
}
