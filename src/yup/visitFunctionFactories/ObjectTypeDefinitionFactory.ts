import { FieldDefinitionNode, ObjectTypeDefinitionNode } from 'graphql';

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
    private readonly shapeRenderer: ShapeRenderer,
    private readonly addUnderscoreToArgsType: boolean = false
  ) {}

  create() {
    return (node: ObjectTypeDefinitionNode) => {
      if (!this.withObjectTypesSpec.shouldUseObjectTypeDefinitionNode(node)) return;

      const name = this.visitor.convertName(node.name.value);
      this.registry.registerType(name);

      // Building schema for field arguments.
      const argumentBlocks = this.buildArgumentsSchemaBlock(node, (typeName, field) => {
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

  private buildArgumentsSchemaBlock(
    node: ObjectTypeDefinitionNode,
    callback: (typeName: string, field: FieldDefinitionNode) => string
  ) {
    const fieldsWithArguments = node.fields?.filter(field => field.arguments && field.arguments.length > 0) ?? [];
    if (fieldsWithArguments.length === 0) {
      return undefined;
    }
    return fieldsWithArguments
      .map(field => {
        const name =
          node.name.value +
          (this.addUnderscoreToArgsType ? '_' : '') +
          this.visitor.convertName(field, {
            useTypesPrefix: false,
            useTypesSuffix: false,
          }) +
          'Args';

        return callback(name, field);
      })
      .join('\n');
  }
}
