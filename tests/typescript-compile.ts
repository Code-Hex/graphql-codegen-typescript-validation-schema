import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import * as ts from 'typescript';

export function expectTypeScriptToCompile(source: string) {
  const dir = mkdtempSync(path.join(process.cwd(), 'tests/.tmp-ts-'));
  const fileName = path.join(dir, 'generated.ts');

  try {
    writeFileSync(fileName, source);
    const program = ts.createProgram([fileName], {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      noEmit: true,
      skipLibCheck: true,
      strict: true,
      target: ts.ScriptTarget.ES2022,
      types: [],
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);

    expect(
      diagnostics.map((diagnostic) => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        if (!diagnostic.file || diagnostic.start === undefined)
          return message;

        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        return `${diagnostic.file.fileName}:${line + 1}:${character + 1} ${message}`;
      }),
    ).toStrictEqual([]);
  }
  finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
