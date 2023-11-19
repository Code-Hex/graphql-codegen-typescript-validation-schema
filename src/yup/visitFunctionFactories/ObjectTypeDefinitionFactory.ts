import { ObjectTypeDefinitionNode } from 'graphql';

import { Visitor } from '../../visitor';
import { ExportTypeStrategy } from '../exportTypeStrategies/ExportTypeStrategy';
import { Registry } from '../registry';
import { ShapeRenderer } from '../ShapeRenderer';
import { WithObjectTypesSpec } from '../withObjectTypesSpecs/WithObjectTypesSpec';
import { VisitFunctionFactory } from './types';

export class ObjectTypeDefinitionFactory implements VisitFunctionFactory<ObjectTypeDefinitionNode> {
  constructor(
    private readonly registry: Registry,
    private readonly visitor: Visitor,
    private readonly withObjectTypesSpec: WithObjectTypesSpec,
    private readonly exportTypeStrategy: ExportTypeStrategy,
    private readonly shapeRenderer: ShapeRenderer
  ) {}

  create() {
    return (node: ObjectTypeDefinitionNode) => {
      if (!this.withObjectTypesSpec.shouldUseObjectTypeDefinitionNode(node)) return;

      const name = this.visitor.convertName(node.name.value);
      this.registry.registerType(name);

      // Building schema for field arguments.
      const argumentBlocks = this.visitor.buildArgumentsSchemaBlock(node, (typeName, field) => {
        this.registry.registerType(typeName);
        return this.exportTypeStrategy.inputObjectTypeDefinition(
          typeName,
          this.shapeRenderer.render(field.arguments ?? [])
        );
      });
      const appendArguments = argumentBlocks ? '\n' + argumentBlocks : '';

      // Building schema for fields.
      const shapeContent = this.shapeRenderer.render(node.fields ?? []);

      return this.exportTypeStrategy.objectTypeDefinition(name, node.name.value, shapeContent, appendArguments);
    };
  }
}
