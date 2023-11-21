import { indent } from '@graphql-codegen/visitor-plugin-common';

import { TypeASTRenderer } from '../typeAST/TypeASTRenderer';
import { Field } from './Field';

export class FieldRenderer {
  constructor(private readonly typeASTRenderer: TypeASTRenderer) {}

  public renderField(field: Field) {
    const { metadata, type } = field.getData();
    const renderedNode = type.render(this.typeASTRenderer, metadata);

    const { name } = metadata.getData();
    const maybeDefined = metadata.getData().isOptional ? renderedNode : defined(renderedNode);
    const maybeLazy = field.requiresLazy() ? lazy(maybeDefined) : maybeDefined;
    return indent(`${name}: ${maybeLazy}`, 2);
  }
}

function defined(content: string): string {
  return `${content}.defined()`;
}

function lazy(content: string): string {
  return `yup.lazy(() => ${content})`;
}
