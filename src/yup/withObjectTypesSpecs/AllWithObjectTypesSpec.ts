import { ObjectTypeDefinitionNode } from 'graphql';

import { WithObjectTypesSpec } from './WithObjectTypesSpec';

export class AllWithObjectTypesSpec implements WithObjectTypesSpec {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldUseObjectTypeDefinitionNode(node: ObjectTypeDefinitionNode): boolean {
    return true;
  }

  shouldIncludeUnion() {
    return true;
  }
}
