import { NormalizedScalarsMap } from '@graphql-codegen/visitor-plugin-common';

import { Visitor } from '../visitor';

export class ScalarRenderer {
  constructor(
    private readonly scalarSchemas: Record<string, string> = {},
    private readonly visitor: Visitor
  ) {}

  public render(scalarName: string, scalarDirection: keyof NormalizedScalarsMap[string]): string {
    if (this.scalarSchemas[scalarName]) {
      return `${this.scalarSchemas[scalarName]}`;
    }
    const tsType = this.visitor.getScalarType(scalarName, scalarDirection);
    switch (tsType) {
      case 'string':
        return `yup.string()`;
      case 'number':
        return `yup.number()`;
      case 'boolean':
        return `yup.boolean()`;
    }
    console.warn('unhandled name:', scalarName);
    return `yup.mixed()`;
  }
}
