import { ConstDirectiveNode, FieldDefinitionNode, InputValueDefinitionNode } from 'graphql';

import { isNonNullType } from '../../../graphql';
import { RuleASTFactory } from '../ruleAST/RuleASTFactory';
import { TypeASTFactory } from '../typeAST/TypeASTFactory';
import { Field } from './Field';
import { FieldMetadata } from './FieldMetadata';

export class FieldFactory {
  public constructor(
    private readonly typeASTFactory: TypeASTFactory,
    private readonly ruleASTFactory: RuleASTFactory
  ) {}

  public create(graphQLFieldNode: InputValueDefinitionNode | FieldDefinitionNode): Field {
    const directives = graphQLFieldNode.directives ?? [];
    const rulesDirective = findDirectiveByName(directives, 'rules');
    const rulesForArrayDirective = findDirectiveByName(directives, 'rulesForArray');

    const metadata = new FieldMetadata({
      name: graphQLFieldNode.name.value,
      label: graphQLFieldNode.description
        ? graphQLFieldNode.description.block
          ? graphQLFieldNode.description.value.split('\n')[0]
          : graphQLFieldNode.description.value
        : null,
      isOptional: !isNonNullType(graphQLFieldNode.type),
      rule: this.ruleASTFactory.createFromDirectiveOrNull(rulesDirective ?? null),
      ruleForArray: this.ruleASTFactory.createFromDirectiveOrNull(rulesForArrayDirective ?? null),
    });

    return new Field(metadata, this.typeASTFactory.create(graphQLFieldNode.type));
  }
}

const supportedDirectiveNames = ['rules', 'rulesForArray'] as const;
type SupportedDirectiveName = (typeof supportedDirectiveNames)[number];

const findDirectiveByName = (directives: readonly ConstDirectiveNode[], name: SupportedDirectiveName) => {
  return directives.find(directive => directive.name.value === name);
};
