import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';

import { WithObjectTypesSpec } from './withObjectTypesSpecs/WithObjectTypesSpec';

export class InitialEmitter {
  constructor(private readonly withObjectTypesSpec: WithObjectTypesSpec) {}

  emit(enumDeclarations: readonly string[]): string {
    if (!this.withObjectTypesSpec.shouldIncludeUnion()) return '\n' + enumDeclarations.join('\n');
    return '\n' + enumDeclarations.join('\n') + '\n' + this.unionFunctionDeclaration();
  }

  private unionFunctionDeclaration(): string {
    return new DeclarationBlock({})
      .asKind('function')
      .withName('union<T extends {}>(schemas: Record<string, yup.Schema<T>>): yup.MixedSchema<T>')
      .withBlock(
        [
          indent('return yup.mixed<T>().when('),
          indent('([value], schema) => schemas[value?.__typename] ?? schema', 2),
          indent(').defined()'), // HACK: 型を合わせるために、union は undefined を許容しないこととした。問題が出たら考える。
        ].join('\n')
      ).string;
  }
}
