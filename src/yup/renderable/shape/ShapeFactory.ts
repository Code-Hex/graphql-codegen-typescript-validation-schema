import { FieldDefinitionNode, InputValueDefinitionNode } from 'graphql';

import { FieldFactory } from '../field/FieldFactory';
import { Shape } from './Shape';

export class ShapeFactory {
  constructor(private readonly fieldFactory: FieldFactory) {}

  public create(graphQLFields: readonly (InputValueDefinitionNode | FieldDefinitionNode)[]) {
    return new Shape(graphQLFields.map(field => this.fieldFactory.create(field)));
  }
}
