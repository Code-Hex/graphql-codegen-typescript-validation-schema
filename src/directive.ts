import type { ConstArgumentNode, ConstDirectiveNode, ConstValueNode } from 'graphql';
import { Kind, valueFromASTUntyped } from 'graphql';

import type { DirectiveConfig, DirectiveObjectArguments } from './config';
import { isConvertableRegexp } from './regexp';

export interface FormattedDirectiveConfig {
  [directive: string]: FormattedDirectiveArguments
}

export interface FormattedDirectiveArguments {
  [argument: string]: string[] | FormattedDirectiveObjectArguments | undefined
}

export interface FormattedDirectiveObjectArguments {
  [matched: string]: string[] | undefined
}

function isFormattedDirectiveObjectArguments(arg: FormattedDirectiveArguments[keyof FormattedDirectiveArguments]): arg is FormattedDirectiveObjectArguments {
  return arg !== undefined && !Array.isArray(arg)
}

// ```yml
// directives:
//   required:
//     msg: required
//   constraint:
//     minLength: min
//     format:
//       uri: url
//       email: email
// ```
//
// This function convterts to like below
// {
//   'required': {
//     'msg': ['required', '$1'],
//   },
//   'constraint': {
//     'minLength': ['min', '$1'],
//     'format': {
//       'uri': ['url', '$2'],
//       'email': ['email', '$2'],
//     }
//   }
// }
export function formatDirectiveConfig(config: DirectiveConfig): FormattedDirectiveConfig {
  return Object.fromEntries(
    Object.entries(config).map(([directive, arg]) => {
      const formatted = Object.fromEntries(
        Object.entries(arg).map(([arg, val]) => {
          if (Array.isArray(val))
            return [arg, val];

          if (typeof val === 'string')
            return [arg, [val, '$1']];

          return [arg, formatDirectiveObjectArguments(val)];
        }),
      );
      return [directive, formatted];
    }),
  );
}

// ```yml
// format:
//   # For example, `@constraint(format: "uri")`. this case $1 will be "uri".
//   # Therefore the generator generates yup schema `.url()` followed by `uri: 'url'`
//   # If $1 does not match anywhere, the generator will ignore.
//   uri: url
//   email: ["email", "$2"]
// ```
//
// This function convterts to like below
// {
//   'uri': ['url', '$2'],
//   'email': ['email'],
// }
export function formatDirectiveObjectArguments(args: DirectiveObjectArguments): FormattedDirectiveObjectArguments {
  const formatted = Object.entries(args).map(([arg, val]) => {
    if (Array.isArray(val))
      return [arg, val];

    return [arg, [val, '$2']];
  });
  return Object.fromEntries(formatted);
}

// This function generates `.required("message").min(100).email()`
//
// config
// {
//   'required': {
//     'msg': ['required', '$1'],
//   },
//   'constraint': {
//     'minLength': ['min', '$1'],
//     'format': {
//       'uri': ['url', '$2'],
//       'email': ['email', '$2'],
//     }
//   }
// }
//
// GraphQL schema
// ```graphql
// input ExampleInput {
//   email: String! @required(msg: "message") @constraint(minLength: 100, format: "email")
// }
// ```
export function buildApi(config: FormattedDirectiveConfig, directives: ReadonlyArray<ConstDirectiveNode>): string {
  return directives
    .filter(directive => config[directive.name.value] !== undefined)
    .map((directive) => {
      const directiveName = directive.name.value;
      const argsConfig = config[directiveName];
      return buildApiFromDirectiveArguments(argsConfig, directive.arguments ?? []);
    })
    .join('')
}

function buildApiSchema(validationSchema: string[] | undefined, argValue: ConstValueNode): string {
  if (!validationSchema)
    return '';

  const schemaApi = validationSchema[0];
  const schemaApiArgs = validationSchema.slice(1).map((templateArg) => {
    const gqlSchemaArgs = apiArgsFromConstValueNode(argValue);
    return applyArgToApiSchemaTemplate(templateArg, gqlSchemaArgs);
  });
  return `.${schemaApi}(${schemaApiArgs.join(', ')})`;
}

function buildApiFromDirectiveArguments(config: FormattedDirectiveArguments, args: ReadonlyArray<ConstArgumentNode>): string {
  return args
    .map((arg) => {
      const argName = arg.name.value;
      const validationSchema = config[argName];
      if (isFormattedDirectiveObjectArguments(validationSchema))
        return buildApiFromDirectiveObjectArguments(validationSchema, arg.value);

      return buildApiSchema(validationSchema, arg.value);
    })
    .join('');
}

function buildApiFromDirectiveObjectArguments(config: FormattedDirectiveObjectArguments, argValue: ConstValueNode): string {
  if (argValue.kind !== Kind.STRING)
    return '';

  const validationSchema = config[argValue.value];
  return buildApiSchema(validationSchema, argValue);
}

function applyArgToApiSchemaTemplate(template: string, apiArgs: any[]): string {
  const matches = template.matchAll(/[$](\d+)/g);
  for (const match of matches) {
    const placeholder = match[0]; // `$1`
    const idx = Number.parseInt(match[1], 10) - 1; // start with `1 - 1`
    const apiArg = apiArgs[idx];
    if (apiArg === undefined) {
      template = template.replace(placeholder, '');
      continue;
    }
    if (template === placeholder)
      return stringify(apiArg);

    template = template.replace(placeholder, apiArg);
  }
  if (template !== '')
    return stringify(template, true);

  return template;
}

function stringify(arg: any, quoteString?: boolean): string {
  if (Array.isArray(arg))
    return arg.map(v => stringify(v, true)).join(',');

  if (typeof arg === 'string') {
    if (isConvertableRegexp(arg))
      return arg;

    const v = tryEval(arg)
    if (v !== undefined)
      arg = v

    if (quoteString)
      return JSON.stringify(arg);
  }

  if (typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'bigint' || arg === 'undefined' || arg === null)
    return `${arg}`;

  return JSON.stringify(arg);
}

function apiArgsFromConstValueNode(value: ConstValueNode): any[] {
  const val = valueFromASTUntyped(value);
  if (Array.isArray(val))
    return val;

  return [val];
}

function tryEval(maybeValidJavaScript: string): any | undefined {
  try {
    // eslint-disable-next-line no-eval
    return eval(maybeValidJavaScript)
  }
  catch {
    return undefined
  }
}

export const exportedForTesting = {
  applyArgToApiSchemaTemplate,
  buildApiFromDirectiveObjectArguments,
  buildApiFromDirectiveArguments,
};
