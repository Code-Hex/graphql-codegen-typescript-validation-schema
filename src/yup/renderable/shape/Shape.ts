import { Field } from '../field/Field';
import { ShapeRenderer } from './ShapeRenderer';

export class Shape {
  constructor(private readonly fields: readonly Field[]) {}

  public getData() {
    return {
      fields: this.fields,
    };
  }

  public render(shapeRenderer: ShapeRenderer): string {
    return shapeRenderer.render(this);
  }
}
