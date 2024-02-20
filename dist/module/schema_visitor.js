import { Visitor } from './visitor';
export class BaseSchemaVisitor {
    schema;
    config;
    importTypes = [];
    enumDeclarations = [];
    constructor(schema, config) {
        this.schema = schema;
        this.config = config;
    }
    buildImports() {
        if (this.config.importFrom && this.importTypes.length > 0) {
            return [
                this.importValidationSchema(),
                `import ${this.config.useTypeImports ? 'type ' : ''}{ ${this.importTypes.join(', ')} } from '${this.config.importFrom}'`,
            ];
        }
        return [this.importValidationSchema()];
    }
    createVisitor(scalarDirection) {
        return new Visitor(scalarDirection, this.schema, this.config);
    }
    buildObjectTypeDefinitionArguments(node, visitor) {
        return visitor.buildArgumentsSchemaBlock(node, (typeName, field) => {
            this.importTypes.push(typeName);
            return this.buildInputFields(field.arguments ?? [], visitor, typeName);
        });
    }
}
