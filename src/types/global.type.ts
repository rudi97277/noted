import type { TRest } from "@/utilities/rest.util";

export type ExtractStringLiterals<T> = T extends string
  ? T
  : T extends Record<string, any>
  ? ExtractStringLiterals<T[keyof T]>
  : never;

export type TAllRoutes = ExtractStringLiterals<TRest>;
