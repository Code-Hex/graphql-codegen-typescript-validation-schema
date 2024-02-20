import { ConstArgumentNode, ConstDirectiveNode, ConstValueNode } from 'graphql';
import { DirectiveConfig, DirectiveObjectArguments } from './config';
export interface FormattedDirectiveConfig {
    [directive: string]: FormattedDirectiveArguments;
}
export interface FormattedDirectiveArguments {
    [argument: string]: string[] | FormattedDirectiveObjectArguments | undefined;
}
export interface FormattedDirectiveObjectArguments {
    [matched: string]: string[] | undefined;
}
export declare const formatDirectiveConfig: (config: DirectiveConfig) => FormattedDirectiveConfig;
export declare const formatDirectiveObjectArguments: (args: DirectiveObjectArguments) => FormattedDirectiveObjectArguments;
export declare const buildApi: (config: FormattedDirectiveConfig, directives: ReadonlyArray<ConstDirectiveNode>) => string;
export declare const exportedForTesting: {
    applyArgToApiSchemaTemplate: (template: string, apiArgs: any[]) => string;
    buildApiFromDirectiveObjectArguments: (config: FormattedDirectiveObjectArguments, argValue: ConstValueNode) => string;
    buildApiFromDirectiveArguments: (config: FormattedDirectiveArguments, args: ReadonlyArray<ConstArgumentNode>) => string;
};
