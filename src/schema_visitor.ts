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
  protected enumDeclarations: string[] = [];

  constructor(
    protected schema: GraphQLSchema,
    protected config: ValidationSchemaPluginConfig,
  ) {}

  abstract importValidationSchema(): string;

  buildImports(): string[] {
    if (this.config.importFrom && this.importTypes.length > 0) {
      const namedImportPrefix = this.config.useTypeImports ? 'type ' : '';

      const importCore = this.config.schemaNamespacedImportName
        ? `* as ${this.config.schemaNamespacedImportName}`
        : `${namedImportPrefix}{ ${this.importTypes.join(', ')} }`;

      return [
        this.importValidationSchema(),
        `import ${importCore} from '${this.config.importFrom}'`,
      ];
    }
    return [this.importValidationSchema()];
  }

  abstract initialEmit(): string;

  createVisitor(scalarDirection: 'input' | 'output' | 'both'): Visitor {
    return new Visitor(scalarDirection, this.schema, this.config);
  }

  protected abstract buildInputFields(
    fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[],
    visitor: Visitor,
    name: string
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
