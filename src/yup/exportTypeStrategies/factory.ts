import { ValidationSchemaExportType } from '../../config';
import { ConstExportTypeStrategy } from './ConstExportTypeStrategy';
import { ExportTypeStrategy } from './ExportTypeStrategy';
import { FunctionExportTypeStrategy } from './FunctionExportTypeStrategy';

export const createExportTypeStrategy = (type: ValidationSchemaExportType = 'function'): ExportTypeStrategy => {
  if (type === 'function') {
    return new FunctionExportTypeStrategy();
  }
  if (type === 'const') {
    return new ConstExportTypeStrategy();
  }
  return assertNever();
};

function assertNever(): never {
  throw new Error('undefined export type');
}
