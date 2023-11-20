import { ConstDirectiveNode, FieldDefinitionNode, InputValueDefinitionNode } from 'graphql';

import { isNonNullType } from '../../../graphql';
import { RuleASTFactory } from '../ruleAST/RuleASTFactory';
import { SchemaASTFactory } from '../schemaAST/SchemaASTFactory';
import { Field } from './Field';
import { FieldMetadata } from './FieldMetadata';

export class FieldFactory {
  public constructor(
    private readonly schemaASTFactory: SchemaASTFactory,
    private readonly ruleASTFactory: RuleASTFactory
  ) {}

  public create(graphQLFieldNode: InputValueDefinitionNode | FieldDefinitionNode): Field {
    const directives = graphQLFieldNode.directives ?? [];
    const rulesDirective = findDirectiveByName(directives, 'rules');
    const rulesForArrayDirective = findDirectiveByName(directives, 'rulesForArray');
    const fieldName = graphQLFieldNode.name.value;

    const metadata = new FieldMetadata(
      graphQLFieldNode.name.value,
      !isNonNullType(graphQLFieldNode.type),
      this.ruleASTFactory.createFromDirectiveOrNull(fieldName, rulesDirective ?? null),
      this.ruleASTFactory.createFromDirectiveOrNull(fieldName, rulesForArrayDirective ?? null)
    );

    return new Field(metadata, this.schemaASTFactory.create(graphQLFieldNode.type));
  }
}

const supportedDirectiveNames = ['rules', 'rulesForArray'] as const;
type SupportedDirectiveName = (typeof supportedDirectiveNames)[number];

const findDirectiveByName = (directives: readonly ConstDirectiveNode[], name: SupportedDirectiveName) => {
  return directives.find(directive => directive.name.value === name);
};
