import { FieldDefinitionNode, GraphQLSchema, InputValueDefinitionNode, ObjectTypeDefinitionNode } from 'graphql';
import { ValidationSchemaPluginConfig } from './config';
import { SchemaVisitor } from './types';
import { Visitor } from './visitor';
export declare abstract class BaseSchemaVisitor implements SchemaVisitor {
    protected schema: GraphQLSchema;
    protected config: ValidationSchemaPluginConfig;
    protected importTypes: string[];
    protected enumDeclarations: string[];
    constructor(schema: GraphQLSchema, config: ValidationSchemaPluginConfig);
    abstract importValidationSchema(): string;
    buildImports(): string[];
    abstract initialEmit(): string;
    createVisitor(scalarDirection: 'input' | 'output' | 'both'): Visitor;
    protected abstract buildInputFields(fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[], visitor: Visitor, name: string): string;
    protected buildObjectTypeDefinitionArguments(node: ObjectTypeDefinitionNode, visitor: Visitor): string | undefined;
}
