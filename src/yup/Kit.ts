import { NormalizedScalarsMap } from '@graphql-codegen/visitor-plugin-common';
import { GraphQLSchema } from 'graphql';

import { ValidationSchemaPluginConfig } from '../config';
import { Visitor } from '../visitor';
import { ConstExportTypeStrategy } from './exportTypeStrategies/ConstExportTypeStrategy';
import { ExportTypeStrategy } from './exportTypeStrategies/ExportTypeStrategy';
import { FunctionExportTypeStrategy } from './exportTypeStrategies/FunctionExportTypeStrategy';
import { ImportBuilder } from './ImportBuilder';
import { InitialEmitter } from './InitialEmitter';
import { Registry } from './registry';
import { FieldFactory } from './renderable/field/FieldFactory';
import { FieldRenderer } from './renderable/field/FieldRenderer';
import { RuleASTFactory } from './renderable/ruleAST/RuleASTFactory';
import { RuleASTRenderer } from './renderable/ruleAST/RuleASTRenderer';
import { SchemaASTFactory } from './renderable/schemaAST/SchemaASTFactory';
import { SchemaASTRenderer } from './renderable/schemaAST/SchemaASTRenderer';
import { ShapeRenderer } from './ShapeRenderer';
import { EnumTypeDefinitionFactory } from './visitFunctionFactories/EnumTypeDefinitionFactory';
import { InputObjectTypeDefinitionFactory } from './visitFunctionFactories/InputObjectTypeDefinitionFactory';
import { ObjectTypeDefinitionFactory } from './visitFunctionFactories/ObjectTypeDefinitionFactory';
import { UnionTypesDefinitionFactory } from './visitFunctionFactories/UnionTypesDefinitionFactory';
import { AllWithObjectTypesSpec } from './withObjectTypesSpecs/AllWithObjectTypesSpec';
import { NoReservedWithObjectTypesSpec } from './withObjectTypesSpecs/NoReservedWithObjectTypesSpec';
import { NullWithObjectTypesSpec } from './withObjectTypesSpecs/NullWithObjectTypesSpec';
import { WithObjectTypesSpec } from './withObjectTypesSpecs/WithObjectTypesSpec';

export class Kit {
  constructor(
    private readonly schema: GraphQLSchema,
    private readonly config: ValidationSchemaPluginConfig
  ) {}

  getVisitor() {
    return new Visitor(this.schema, this.config);
  }

  getWithObjectTypesSpec(): WithObjectTypesSpec {
    const type = this.config.withObjectType ?? false;
    switch (type) {
      case 'no-reserved':
        return new NoReservedWithObjectTypesSpec();
      case 'all':
        return new AllWithObjectTypesSpec();
      case false:
        return new NullWithObjectTypesSpec();
      default:
        return assertNever(type);
    }
  }

  getExportTypesStrategy(): ExportTypeStrategy {
    const type = this.config.validationSchemaExportType ?? 'function';
    switch (type) {
      case 'function':
        return new FunctionExportTypeStrategy();
      case 'const':
        return new ConstExportTypeStrategy();
      default:
        return assertNever(type);
    }
  }

  getFieldRenderer() {
    return new FieldRenderer(this.getSchemaASTRenderer());
  }

  getSchemaASTRenderer() {
    return new SchemaASTRenderer(this.config, this.getRuleASTRenderer(), this.getExportTypesStrategy());
  }

  getRuleASTFactory() {
    return new RuleASTFactory(this.config.rules, this.config.ignoreRules);
  }

  getRuleASTRenderer() {
    return new RuleASTRenderer();
  }

  getShapeRenderer(scalarDirection: keyof NormalizedScalarsMap[string]) {
    return new ShapeRenderer(this.getFieldRenderer(), this.getFieldFactory(scalarDirection));
  }

  getSchemaASTFactory(scalarDirection: keyof NormalizedScalarsMap[string]) {
    return new SchemaASTFactory(this.config.lazyTypes, scalarDirection, this.getVisitor());
  }

  getFieldFactory(scalarDirection: keyof NormalizedScalarsMap[string]) {
    return new FieldFactory(this.getSchemaASTFactory(scalarDirection), this.getRuleASTFactory());
  }

  getImportBuilder() {
    return new ImportBuilder(this.config.importFrom, this.config.useTypeImports);
  }

  getInitialEmitter() {
    return new InitialEmitter(this.getWithObjectTypesSpec());
  }

  getInputObjectTypeDefinitionFactory(registry: Registry) {
    return new InputObjectTypeDefinitionFactory(
      registry,
      this.getVisitor(),
      this.getExportTypesStrategy(),
      this.getShapeRenderer('input')
    );
  }

  getObjectTypeDefinitionFactory(registry: Registry) {
    return new ObjectTypeDefinitionFactory(
      registry,
      this.getVisitor(),
      this.getWithObjectTypesSpec(),
      this.getExportTypesStrategy(),
      this.getShapeRenderer('output'),
      this.config.addUnderscoreToArgsType
    );
  }

  getEnumTypeDefinitionFactory(registry: Registry) {
    return new EnumTypeDefinitionFactory(this.config.enumsAsTypes, registry, this.getVisitor());
  }

  getUnionTypesDefinitionFactory(registry: Registry) {
    return new UnionTypesDefinitionFactory(
      registry,
      this.getVisitor(),
      this.getWithObjectTypesSpec(),
      this.getExportTypesStrategy()
    );
  }
}

function assertNever(type: never): never {
  throw new Error(`undefined type ${type}`);
}
