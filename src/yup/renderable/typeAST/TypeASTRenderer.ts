import { Kind } from 'graphql';

import { ValidationSchemaPluginConfig } from '../../../config';
import { ExportTypeStrategy } from '../../exportTypeStrategies/ExportTypeStrategy';
import { FieldMetadata } from '../field/FieldMetadata';
import { RuleASTRenderer } from '../ruleAST/RuleASTRenderer';
import { TypeASTListNode } from './TypeASTListNode';
import { TypeASTNonScalarNamedTypeNode } from './TypeASTNonScalarNamedTypeNode';
import { TypeASTNullability } from './TypeASTNullability';
import { TypeASTScalarNode } from './TypeASTScalarNode';

export class TypeASTRenderer {
  constructor(
    private readonly config: ValidationSchemaPluginConfig,
    private readonly ruleASTRenderer: RuleASTRenderer,
    private readonly exportTypeStrategy: ExportTypeStrategy
  ) {}

  public renderList(list: TypeASTListNode, fieldMetadata: FieldMetadata): string {
    const { child } = list.getData();
    const rendered = child.render(this, fieldMetadata);
    const renderedRule = fieldMetadata.getData().ruleForArray.render(this.ruleASTRenderer);

    return `yup.array(${rendered}.defined())${this.renderMeta(fieldMetadata)}${renderedRule}`;
  }

  public renderNonScalarNamedType(namedType: TypeASTNonScalarNamedTypeNode, fieldMetadata: FieldMetadata): string {
    return `${this.doRenderNonScalarNamedType(namedType)}${this.renderMeta(fieldMetadata)}${fieldMetadata
      .getData()
      .rule.render(this.ruleASTRenderer)}`;
  }

  public renderScalar(scalarType: TypeASTScalarNode, fieldMetadata: FieldMetadata): string {
    return `${this.doRenderScalar(scalarType)}${this.renderMeta(fieldMetadata)}${fieldMetadata
      .getData()
      .rule.render(this.ruleASTRenderer)}`;
  }

  private doRenderScalar(scalarType: TypeASTScalarNode): string {
    const { graphQLTypeName, tsTypeName } = scalarType.getData();
    const scalarSchemas = this.config.scalarSchemas ?? {};

    if (scalarSchemas[graphQLTypeName]) {
      return `${scalarSchemas[graphQLTypeName]}`;
    }
    switch (tsTypeName) {
      case 'string':
        return `yup.string()`;
      case 'number':
        return `yup.number()`;
      case 'boolean':
        return `yup.boolean()`;
    }
    console.warn('unhandled name:', graphQLTypeName);
    return `yup.mixed()`;
  }

  private doRenderNonScalarNamedType(schemaASTNonScalarNamedTypeNode: TypeASTNonScalarNamedTypeNode): string {
    const { kind, convertedName } = schemaASTNonScalarNamedTypeNode.getData();
    switch (kind) {
      case Kind.INPUT_OBJECT_TYPE_DEFINITION:
      case Kind.OBJECT_TYPE_DEFINITION:
      case Kind.UNION_TYPE_DEFINITION:
      case Kind.ENUM_TYPE_DEFINITION:
        return this.exportTypeStrategy.schemaEvaluation(`${convertedName}Schema`, kind);
      default:
        return assertsNeverKind(kind);
    }
  }

  private renderMeta(fieldMetadata: FieldMetadata): string {
    const label = fieldMetadata.getData().label;
    return label ? `.meta({ label: ${JSON.stringify(label)} })` : '';
  }

  public renderNullability(nullability: TypeASTNullability, fieldMetadata: FieldMetadata): string {
    const { child, isNonNull } = nullability.getData();
    const rendered = child.render(this, fieldMetadata);

    return isNonNull ? `${rendered}.nonNullable()` : `${rendered}.nullable()`;
  }
}

function assertsNeverKind(kind: never): never {
  throw new Error(`unexpected kind: ${kind}`);
}
