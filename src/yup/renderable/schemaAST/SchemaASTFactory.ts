import { NormalizedScalarsMap } from '@graphql-codegen/visitor-plugin-common';
import { Kind, ListTypeNode, NamedTypeNode, TypeNode } from 'graphql';

import { isInput, isListType, isNamedType, isNonNullType } from '../../../graphql';
import { Visitor } from '../../../visitor';
import { SchemaASTLazyNode } from './SchemaASTLazyNode';
import { SchemaASTListNode } from './SchemaASTListNode';
import { SchemaASTNode } from './SchemaASTNode';
import { SchemaASTNonScalarNamedTypeNode } from './SchemaASTNonScalarNamedTypeNode';
import { SchemaASTNullNode } from './SchemaASTNullNode';
import { SchemaASTScalarNode } from './SchemaASTScalarNode';

export class SchemaASTFactory {
  constructor(
    private readonly lazyTypes: readonly string[] = [],
    private readonly scalarDirection: keyof NormalizedScalarsMap[string],
    private readonly visitor: Visitor
  ) {}

  public create(graphQLTypeNode: TypeNode, isDefined: boolean = false): SchemaASTNode {
    if (isNonNullType(graphQLTypeNode)) {
      return this.helper(graphQLTypeNode.type, true, isDefined);
    }
    return this.helper(graphQLTypeNode, false, isDefined);
  }

  private helper(graphQLTypeNode: ListTypeNode | NamedTypeNode, isNonNull: boolean, isDefined: boolean): SchemaASTNode {
    if (isListType(graphQLTypeNode)) {
      // NOTE: 配列の中身は必ず defined (nullが混ざることはあってもundefinedは混ざらない)
      return new SchemaASTListNode(this.create(graphQLTypeNode.type, true), isNonNull, isDefined);
    }
    if (isNamedType(graphQLTypeNode)) {
      return this.createFromNamedTypeNode(graphQLTypeNode, isNonNull, isDefined);
    }
    return new SchemaASTNullNode(graphQLTypeNode);
  }

  private createFromNamedTypeNode(
    graphQLTypeNode: NamedTypeNode,
    isNonNull: boolean,
    isDefined: boolean
  ): SchemaASTNonScalarNamedTypeNode | SchemaASTScalarNode | SchemaASTLazyNode {
    const graphQLTypeName = graphQLTypeNode.name.value;
    const kind = this.visitor.getKind(graphQLTypeName);

    if (kind === null || kind === Kind.SCALAR_TYPE_DEFINITION) {
      return new SchemaASTScalarNode(
        graphQLTypeName,
        this.visitor.getTypeScriptScalarType(graphQLTypeName, this.scalarDirection),
        isNonNull,
        isDefined
      );
    }

    const ret = new SchemaASTNonScalarNamedTypeNode({
      graphQLTypeName,
      convertedName: this.visitor.convertName(graphQLTypeName),
      kind,
      tsTypeName: this.visitor.getTypeScriptScalarType(graphQLTypeName, this.scalarDirection),
      isNonNull,
      isDefined,
    });
    return this.isLazy(graphQLTypeName) ? new SchemaASTLazyNode(ret) : ret;
  }

  private isLazy(graphQLTypeName: string): boolean {
    return isInput(graphQLTypeName) && this.lazyTypes.includes(graphQLTypeName);
  }
}
