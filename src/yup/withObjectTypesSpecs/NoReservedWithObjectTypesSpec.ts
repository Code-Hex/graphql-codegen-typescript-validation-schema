import { ObjectTypeDefinitionNode } from 'graphql';

import { WithObjectTypesSpec } from './WithObjectTypesSpec';

export class NoReservedWithObjectTypesSpec implements WithObjectTypesSpec {
  shouldUseObjectTypeDefinitionNode(node: ObjectTypeDefinitionNode): boolean {
    return !/^(Query|Mutation|Subscription)$/.test(node.name.value);
  }

  shouldIncludeUnion() {
    return true;
  }
}
