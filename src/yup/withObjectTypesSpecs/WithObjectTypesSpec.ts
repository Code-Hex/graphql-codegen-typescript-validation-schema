import { ObjectTypeDefinitionNode } from 'graphql';

export interface WithObjectTypesSpec {
  shouldUseObjectTypeDefinitionNode(node: ObjectTypeDefinitionNode): boolean;
  shouldIncludeUnion(): boolean;
}
