import { ValidationSchemaPluginConfig } from '../../config';
import { AllWithObjectTypesSpec } from './AllWithObjectTypesSpec';
import { NoReservedWithObjectTypesSpec } from './NoReservedWithObjectTypesSpec';
import { NullWithObjectTypesSpec } from './NullWithObjectTypesSpec';
import { WithObjectTypesSpec } from './WithObjectTypesSpec';

export const createWithObjectTypesSpec = (
  withObjectTypes: ValidationSchemaPluginConfig['withObjectType']
): WithObjectTypesSpec => {
  switch (withObjectTypes) {
    case 'no-reserved':
      return new NoReservedWithObjectTypesSpec();
    case 'all':
      return new AllWithObjectTypesSpec();
    default:
      return new NullWithObjectTypesSpec();
  }
};
