import { InputObjectTypeDefinitionNode } from 'graphql';

import { Visitor } from '../../visitor';
import { ExportTypeStrategy } from '../exportTypeStrategies/ExportTypeStrategy';
import { Registry } from '../registry';
import { ShapeFactory } from '../renderable/shape/ShapeFactory';
import { ShapeRenderer } from '../renderable/shape/ShapeRenderer';
import { VisitFunctionFactory } from './types';

export class InputObjectTypeDefinitionFactory implements VisitFunctionFactory<InputObjectTypeDefinitionNode> {
  constructor(
    private readonly registry: Registry,
    private readonly visitor: Visitor,
    private readonly exportTypeStrategy: ExportTypeStrategy,
    private readonly shapeFactory: ShapeFactory,
    private readonly shapeRenderer: ShapeRenderer
  ) {}

  create() {
    return (node: InputObjectTypeDefinitionNode) => {
      const name = this.visitor.convertName(node.name.value);
      this.registry.registerType(name);
      const shape = this.shapeFactory.create(node.fields ?? []);
      return this.exportTypeStrategy.inputObjectTypeDefinition(name, shape.render(this.shapeRenderer));
    };
  }
}
