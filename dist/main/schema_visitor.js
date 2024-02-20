"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSchemaVisitor = void 0;
const visitor_1 = require("./visitor");
class BaseSchemaVisitor {
    constructor(schema, config) {
        this.schema = schema;
        this.config = config;
        this.importTypes = [];
        this.enumDeclarations = [];
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
        return new visitor_1.Visitor(scalarDirection, this.schema, this.config);
    }
    buildObjectTypeDefinitionArguments(node, visitor) {
        return visitor.buildArgumentsSchemaBlock(node, (typeName, field) => {
            var _a;
            this.importTypes.push(typeName);
            return this.buildInputFields((_a = field.arguments) !== null && _a !== void 0 ? _a : [], visitor, typeName);
        });
    }
}
exports.BaseSchemaVisitor = BaseSchemaVisitor;
