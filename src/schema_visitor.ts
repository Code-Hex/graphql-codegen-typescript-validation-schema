import { GraphQLSchema } from 'graphql';

import { ValidationSchemaPluginConfig } from './config';
import { SchemaVisitor } from './types';
import { Visitor } from './visitor';

export abstract class BaseSchemaVisitor implements SchemaVisitor {
  protected importTypes: string[] = [];
  protected enumDeclarations: string[] = [];

  constructor(
    protected schema: GraphQLSchema,
    protected config: ValidationSchemaPluginConfig
  ) {}

  abstract importValidationSchema(): string;

  buildImports(): string[] {
    if (this.config.importFrom && this.importTypes.length > 0) {
      return [
        this.importValidationSchema(),
        `import ${this.config.useTypeImports ? 'type ' : ''}{ ${this.importTypes.join(', ')} } from '${
          this.config.importFrom
        }'`,
      ];
    }
    return [this.importValidationSchema()];
  }

  abstract initialEmit(): string;

  createVisitor(scalarDirection: 'input' | 'output' | 'both'): Visitor {
    return new Visitor(scalarDirection, this.schema, this.config);
  }
}
