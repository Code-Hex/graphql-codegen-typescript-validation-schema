import { TsVisitor } from '@graphql-codegen/typescript';
import { FieldDefinitionNode, GraphQLSchema, NameNode, ObjectTypeDefinitionNode } from 'graphql';
import { ValidationSchemaPluginConfig } from './config';
export declare class Visitor extends TsVisitor {
    private scalarDirection;
    private schema;
    private pluginConfig;
    constructor(scalarDirection: 'input' | 'output' | 'both', schema: GraphQLSchema, pluginConfig: ValidationSchemaPluginConfig);
    private isSpecifiedScalarName;
    getType(name: string): import("graphql").GraphQLNamedType | undefined;
    getNameNodeConverter(node: NameNode): {
        targetKind: import("graphql/language/kinds").Kind.SCALAR_TYPE_DEFINITION | import("graphql/language/kinds").Kind.OBJECT_TYPE_DEFINITION | import("graphql/language/kinds").Kind.INTERFACE_TYPE_DEFINITION | import("graphql/language/kinds").Kind.UNION_TYPE_DEFINITION | import("graphql/language/kinds").Kind.ENUM_TYPE_DEFINITION | import("graphql/language/kinds").Kind.INPUT_OBJECT_TYPE_DEFINITION;
        convertName: () => string;
    } | undefined;
    getScalarType(scalarName: string): string | null;
    shouldEmitAsNotAllowEmptyString(name: string): boolean;
    buildArgumentsSchemaBlock(node: ObjectTypeDefinitionNode, callback: (typeName: string, field: FieldDefinitionNode) => string): string | undefined;
}
