import { z } from 'zod'
import { BicyclePreferencesInput, CyclingOptimizationInput, CyclingOptimizationType, TriangleCyclingFactorsInput } from '../types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const CyclingOptimizationTypeSchema = z.nativeEnum(CyclingOptimizationType);

export function BicyclePreferencesInputSchema(): z.ZodObject<Properties<BicyclePreferencesInput>> {
  return z.object({
    optimization: z.lazy(() => CyclingOptimizationInputSchema().nullish())
  })
}

export function CyclingOptimizationInputSchema(): z.ZodSchema<CyclingOptimizationInput> {
  return z.discriminatedUnion("__type", [
    z.object({
        __type: z.literal("triangle"),
        triangle: TriangleCyclingFactorsInputSchema()
      }),
  z.object({
        __type: z.literal("type"),
        type: CyclingOptimizationTypeSchema
      })
  ]);
}

export function TriangleCyclingFactorsInputSchema(): z.ZodObject<Properties<TriangleCyclingFactorsInput>> {
  return z.object({
    flatness: z.number(),
    safety: z.number(),
    time: z.number()
  })
}
