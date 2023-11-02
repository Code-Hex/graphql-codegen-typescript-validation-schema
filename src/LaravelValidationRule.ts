export type LighthouseValidationRule = {
  name: string;
  rawArgs: string[];
};

export const parse = (rule: string): LighthouseValidationRule => {
  const [name, rest] = rule.split(':');
  const rawArgs = rest ? rest.split(',') : [];

  return {
    name,
    rawArgs,
  };
};
