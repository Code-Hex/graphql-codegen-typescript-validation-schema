import { UnionTypeDefinitionNode } from 'graphql';

import { Visitor } from '../../visitor';
import { ExportTypeStrategy } from '../exportTypeStrategies/ExportTypeStrategy';
import { Registry } from '../registry';
import { WithObjectTypesSpec } from '../withObjectTypesSpecs/WithObjectTypesSpec';
import { VisitFunctionFactory } from './types';

export class UnionTypesDefinitionFactory implements VisitFunctionFactory<UnionTypeDefinitionNode> {
  constructor(
    private readonly registry: Registry,
    private readonly visitor: Visitor,
    private readonly withObjectTypesSpec: WithObjectTypesSpec,
    private readonly exportTypeStrategy: ExportTypeStrategy
  ) {}

  create() {
    if (!this.withObjectTypesSpec.shouldIncludeUnion()) return;

    return (node: UnionTypeDefinitionNode) => {
      if (!node.types) return;

      const unionName = this.visitor.convertName(node.name.value);
      this.registry.registerType(unionName);

      const unionElements = node.types
        ?.map(t => {
          const element = this.visitor.convertName(t.name.value);
          const kind = this.visitor.getKind(t.name.value);

          return `${element}: ${this.exportTypeStrategy.schemaEvaluation(`${element}Schema`, kind)},`;
        })
        .join('\n');

      return this.exportTypeStrategy.unionTypeDefinition(unionName, ['{', unionElements, '}'].join('\n'));
    };
  }
}
