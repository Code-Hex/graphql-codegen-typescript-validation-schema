export class ImportBuilder {
  constructor(
    private readonly importFrom: string | undefined,
    private readonly useTypeImports: boolean | undefined
  ) {}

  build(types: readonly string[]): string[] {
    if (!this.importFrom || types.length === 0) return [IMPORT_STATEMENT_YUP];

    return [
      IMPORT_STATEMENT_YUP,
      `import ${this.useTypeImports ? 'type ' : ''}{ ${types.join(', ')} } from '${this.importFrom}'`,
    ];
  }
}

const IMPORT_STATEMENT_YUP = `import * as yup from 'yup'`;
