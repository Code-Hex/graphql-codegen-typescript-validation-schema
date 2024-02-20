import { EnumTypeDefinitionNode, FieldDefinitionNode, GraphQLSchema, InputObjectTypeDefinitionNode, InputValueDefinitionNode, ObjectTypeDefinitionNode, UnionTypeDefinitionNode } from 'graphql';
import { ValidationSchemaPluginConfig } from '../config';
import { BaseSchemaVisitor } from '../schema_visitor';
import { Visitor } from '../visitor';
export declare class ZodSchemaVisitor extends BaseSchemaVisitor {
    constructor(schema: GraphQLSchema, config: ValidationSchemaPluginConfig);
    importValidationSchema(): string;
    initialEmit(): string;
    get InputObjectTypeDefinition(): {
        leave: (node: InputObjectTypeDefinitionNode) => string;
    };
    get ObjectTypeDefinition(): {
        leave: ((node: ObjectTypeDefinitionNode) => any) | undefined;
    };
    get EnumTypeDefinition(): {
        leave: (node: EnumTypeDefinitionNode) => void;
    };
    get UnionTypeDefinition(): {
        leave: (node: UnionTypeDefinitionNode) => string | undefined;
    };
    protected buildInputFields(fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[], visitor: Visitor, name: string): string;
}
