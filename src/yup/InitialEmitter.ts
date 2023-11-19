import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';

import { ValidationSchemaPluginConfig } from '../config';
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
      .withName('union<T extends {}>(...schemas: ReadonlyArray<yup.Schema<T>>): yup.MixedSchema<T>')
      .withBlock(
        [
          indent('return yup.mixed<T>().test({'),
          indent('test: (value) => schemas.some((schema) => schema.isValidSync(value))', 2),
          indent('}).defined()'), // HACK: 型を合わせるために、union は undefined を許容しないこととした。問題が出たら考える。
        ].join('\n')
      ).string;
  }
}
