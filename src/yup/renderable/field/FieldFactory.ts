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
    const fieldName = graphQLFieldNode.name.value;

    const metadata = new FieldMetadata({
      name: graphQLFieldNode.name.value,
      isOptional: !isNonNullType(graphQLFieldNode.type),
      rule: this.ruleASTFactory.createFromDirectiveOrNull(fieldName, rulesDirective ?? null),
      ruleForArray: this.ruleASTFactory.createFromDirectiveOrNull(fieldName, rulesForArrayDirective ?? null),
    });

    return new Field(metadata, this.typeASTFactory.create(graphQLFieldNode.type));
  }
}

const supportedDirectiveNames = ['rules', 'rulesForArray'] as const;
type SupportedDirectiveName = (typeof supportedDirectiveNames)[number];

const findDirectiveByName = (directives: readonly ConstDirectiveNode[], name: SupportedDirectiveName) => {
  return directives.find(directive => directive.name.value === name);
};
