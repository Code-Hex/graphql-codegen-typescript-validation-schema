import { DeclarationBlock } from '@graphql-codegen/visitor-plugin-common';
import { EnumTypeDefinitionNode } from 'graphql';

import { Visitor } from '../../visitor';
import { Registry } from '../registry';
import { VisitFunctionFactory } from './types';

type RenderResult = {
  enumName: string;
  enumDeclaration: string;
};

export class EnumTypeDefinitionFactory implements VisitFunctionFactory<EnumTypeDefinitionNode> {
  constructor(
    private readonly enumsAsType: boolean = false,
    private readonly registry: Registry,
    private readonly visitor: Visitor
  ) {}

  create() {
    return (node: EnumTypeDefinitionNode) => {
      const { enumName, enumDeclaration } = this.render(node);
      this.registry.registerType(enumName);
      this.registry.registerEnumDeclaration(enumDeclaration);
    };
  }

  private render(node: EnumTypeDefinitionNode): RenderResult {
    return this.enumsAsType ? this.renderAsType(node) : this.renderAsConst(node);
  }

  private renderAsType(node: EnumTypeDefinitionNode): RenderResult {
    const enumName = this.visitor.convertName(node.name.value);
    const enums = (node.values ?? []).map(enumOption => `'${enumOption.name.value}'`);

    const enumDeclaration = new DeclarationBlock({})
      .export()
      .asKind('const')
      .withName(`${enumName}Schema`)
      .withContent(`yup.string().oneOf([${enums.join(', ')}])`).string;

    return {
      enumName,
      enumDeclaration,
    };
  }

  private renderAsConst(node: EnumTypeDefinitionNode): RenderResult {
    const enumName = this.visitor.convertName(node.name.value);
    const values = (node.values ?? [])
      .map(
        enumOption =>
          `${enumName}.${this.visitor.convertName(enumOption.name, {
            useTypesPrefix: false,
            transformUnderscore: true,
          })}`
      )
      .join(', ');

    const enumDeclaration = new DeclarationBlock({})
      .export()
      .asKind('const')
      .withName(`${enumName}Schema`)
      .withContent(`yup.string<${enumName}>().oneOf([${values}])`).string;

    return {
      enumName,
      enumDeclaration,
    };
  }
}
