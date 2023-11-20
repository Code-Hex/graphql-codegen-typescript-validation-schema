import { FieldDefinitionNode, InputValueDefinitionNode } from 'graphql';

import { FieldFactory } from './renderable/field/FieldFactory';
import { FieldRenderer } from './renderable/field/FieldRenderer';

export class ShapeRenderer {
  constructor(
    private readonly fieldRenderer: FieldRenderer,
    private readonly fieldFactory: FieldFactory
  ) {}

  public render(fields: readonly (InputValueDefinitionNode | FieldDefinitionNode)[]) {
    return fields
      ?.map(field => {
        const astField = this.fieldFactory.create(field);
        return astField.render(this.fieldRenderer);
      })
      .join(',\n');
  }
}
