import { FieldRenderer } from '../field/FieldRenderer';
import { Shape } from './Shape';

export class ShapeRenderer {
  constructor(private readonly fieldRenderer: FieldRenderer) {}

  public render(shape: Shape): string {
    return shape
      .getData()
      .fields.map(field => field.render(this.fieldRenderer))
      .join(',\n');
  }
}
