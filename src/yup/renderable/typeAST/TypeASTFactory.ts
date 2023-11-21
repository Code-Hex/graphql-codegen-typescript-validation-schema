import { NormalizedScalarsMap } from '@graphql-codegen/visitor-plugin-common';
import { Kind, ListTypeNode, NamedTypeNode, TypeNode } from 'graphql';

import { isInput, isListType, isNamedType, isNonNullType } from '../../../graphql';
import { Visitor } from '../../../visitor';
import { TypeASTListNode } from './TypeASTListNode';
import { TypeASTNode } from './TypeASTNode';
import { TypeASTNonScalarNamedTypeNode } from './TypeASTNonScalarNamedTypeNode';
import { TypeASTNullability } from './TypeASTNullability';
import { TypeASTScalarNode } from './TypeASTScalarNode';

export class TypeASTFactory {
  constructor(
    private readonly lazyTypes: readonly string[] = [],
    private readonly scalarDirection: keyof NormalizedScalarsMap[string],
    private readonly visitor: Visitor
  ) {}

  public create(graphQLTypeNode: TypeNode): TypeASTNode {
    if (isNonNullType(graphQLTypeNode)) {
      return new TypeASTNullability(this.createForListOrNamedType(graphQLTypeNode.type), true);
    }
    return new TypeASTNullability(this.createForListOrNamedType(graphQLTypeNode), false);
  }

  private createForListOrNamedType(graphQLTypeNode: ListTypeNode | NamedTypeNode): TypeASTNode {
    if (isListType(graphQLTypeNode)) {
      // NOTE: 配列の中身は必ず defined (nullが混ざることはあってもundefinedは混ざらない)
      return new TypeASTListNode(this.create(graphQLTypeNode.type));
    }
    if (isNamedType(graphQLTypeNode)) {
      return this.createFromNamedTypeNode(graphQLTypeNode);
    }
    return assertNever(graphQLTypeNode);
  }

  private createFromNamedTypeNode(graphQLTypeNode: NamedTypeNode): TypeASTNonScalarNamedTypeNode | TypeASTScalarNode {
    const graphQLTypeName = graphQLTypeNode.name.value;
    const kind = this.visitor.getKind(graphQLTypeName);

    if (kind === null || kind === Kind.SCALAR_TYPE_DEFINITION) {
      return new TypeASTScalarNode(
        graphQLTypeName,
        this.visitor.getTypeScriptScalarType(graphQLTypeName, this.scalarDirection)
      );
    }

    return new TypeASTNonScalarNamedTypeNode({
      graphQLTypeName,
      convertedName: this.visitor.convertName(graphQLTypeName),
      kind,
      tsTypeName: this.visitor.getTypeScriptScalarType(graphQLTypeName, this.scalarDirection),
      requiresLazy: this.requiresLazy(graphQLTypeName),
    });
  }

  private requiresLazy(graphQLTypeName: string): boolean {
    return isInput(graphQLTypeName) && this.lazyTypes.includes(graphQLTypeName);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertNever(_arg: never): never {
  throw new Error('unreachable');
}
