import type {
  Types,
} from '@graphql-codegen/plugin-helpers';
import type {
  FieldDefinitionNode,
  GraphQLSchema,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
} from 'graphql';

import type { ValidationSchemaPluginConfig } from './config.js';
import type { SchemaVisitor } from './types.js';
import { Visitor } from './visitor.js';

export abstract class BaseSchemaVisitor implements SchemaVisitor {
  protected importTypes: string[] = [];
  protected importValueTypes: string[] = [];
  protected enumDeclarations: string[] = [];

  constructor(
    protected schema: GraphQLSchema,
    protected config: ValidationSchemaPluginConfig,
  ) {}

  abstract importValidationSchema(): string;

  buildImports(): string[] {
    if (this.config.importFrom && this.importTypes.length > 0) {
      const namedImportPrefix = this.config.useTypeImports ? 'type ' : '';
      const importValueTypes = [...new Set(this.importValueTypes)];
      const importTypes = [...new Set(this.importTypes)]
        .filter(type => this.config.useTypeImports !== true || !importValueTypes.includes(type));

      const importCore = this.config.schemaNamespacedImportName
        ? `* as ${this.config.schemaNamespacedImportName}`
        : `${namedImportPrefix}{ ${importTypes.join(', ')} }`;

      const imports = [this.importValidationSchema()];

      if (this.config.schemaNamespacedImportName) {
        imports.push(`import ${importCore} from '${this.config.importFrom}'`);
        return imports;
      }

      if (this.config.useTypeImports === true && importValueTypes.length > 0)
        imports.push(`import { ${importValueTypes.join(', ')} } from '${this.config.importFrom}'`);

      if (importTypes.length > 0)
        imports.push(`import ${importCore} from '${this.config.importFrom}'`);

      return imports;
    }
    return [this.importValidationSchema()];
  }

  abstract initialEmit(): string;

  buildOperationDefinitions(_documents: Types.DocumentFile[]): string[] {
    return [];
  }

  createVisitor(scalarDirection: 'input' | 'output' | 'both'): Visitor {
    return new Visitor(scalarDirection, this.schema, this.config);
  }

  protected abstract buildInputFields(
    fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[],
    visitor: Visitor,
    name: string,
    description?: string
  ): string;

  protected buildTypeDefinitionArguments(
    node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
    visitor: Visitor,
  ) {
    return visitor.buildArgumentsSchemaBlock(node, (typeName, field) => {
      this.importTypes.push(typeName);
      return this.buildInputFields(field.arguments ?? [], visitor, typeName);
    });
  }
}
