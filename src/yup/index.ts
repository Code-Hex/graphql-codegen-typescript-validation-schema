import { GraphQLSchema } from 'graphql';

import { ValidationSchemaPluginConfig } from '../config';
import { Interpreter, NewVisitor } from '../types';
import { ImportBuilder } from './ImportBuilder';
import { InitialEmitter } from './InitialEmitter';
import { Kit } from './Kit';
import { Registry } from './registry';
import { EnumTypeDefinitionFactory } from './visitFunctionFactories/EnumTypeDefinitionFactory';
import { InputObjectTypeDefinitionFactory } from './visitFunctionFactories/InputObjectTypeDefinitionFactory';
import { ObjectTypeDefinitionFactory } from './visitFunctionFactories/ObjectTypeDefinitionFactory';
import { UnionTypesDefinitionFactory } from './visitFunctionFactories/UnionTypesDefinitionFactory';

export class YupSchemaVisitor implements NewVisitor, Interpreter {
  private readonly registry: Registry = new Registry();
  private readonly importBuilder: ImportBuilder;
  private readonly initialEmitter: InitialEmitter;
  private readonly inputObjectTypeDefinitionFactory: InputObjectTypeDefinitionFactory;
  private readonly objectTypeDefinitionFactory: ObjectTypeDefinitionFactory;
  private readonly enumTypeDefinitionFactory: EnumTypeDefinitionFactory;
  private readonly unionTypesDefinitionFactory: UnionTypesDefinitionFactory;

  constructor(schema: GraphQLSchema, config: ValidationSchemaPluginConfig) {
    const kit = new Kit(schema, config);
    this.importBuilder = kit.getImportBuilder();
    this.initialEmitter = kit.getInitialEmitter();
    this.inputObjectTypeDefinitionFactory = kit.getInputObjectTypeDefinitionFactory(this.registry);
    this.objectTypeDefinitionFactory = kit.getObjectTypeDefinitionFactory(this.registry);
    this.enumTypeDefinitionFactory = kit.getEnumTypeDefinitionFactory(this.registry);
    this.unionTypesDefinitionFactory = kit.getUnionTypesDefinitionFactory(this.registry);
  }

  buildImports(): string[] {
    return this.importBuilder.build(this.registry.getTypes());
  }

  initialEmit(): string {
    return this.initialEmitter.emit(this.registry.getEnumDeclarations());
  }

  get InputObjectTypeDefinition() {
    return {
      leave: this.inputObjectTypeDefinitionFactory.create(),
    };
  }

  get ObjectTypeDefinition() {
    return {
      leave: this.objectTypeDefinitionFactory.create(),
    };
  }

  get EnumTypeDefinition() {
    return {
      leave: this.enumTypeDefinitionFactory.create(),
    };
  }

  get UnionTypeDefinition() {
    return {
      leave: this.unionTypesDefinitionFactory.create(),
    };
  }
}
