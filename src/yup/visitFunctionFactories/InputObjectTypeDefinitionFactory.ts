import { InputObjectTypeDefinitionNode } from 'graphql';

import { Visitor } from '../../visitor';
import { ExportTypeStrategy } from '../exportTypeStrategies/ExportTypeStrategy';
import { Registry } from '../registry';
import { ShapeRenderer } from '../ShapeRenderer';
import { VisitFunctionFactory } from './types';

export class InputObjectTypeDefinitionFactory implements VisitFunctionFactory<InputObjectTypeDefinitionNode> {
  constructor(
    private readonly registry: Registry,
    private readonly visitor: Visitor,
    private readonly exportTypeStrategy: ExportTypeStrategy,
    private readonly shapeRenderer: ShapeRenderer
  ) {}

  create() {
    return (node: InputObjectTypeDefinitionNode) => {
      const name = this.visitor.convertName(node.name.value);
      this.registry.registerType(name);
      return this.exportTypeStrategy.inputObjectTypeDefinition(name, this.shapeRenderer.render(node.fields ?? []));
    };
  }
}
