const UNIQUE = Symbol();
const THIS_TYPE = Symbol()


export type Unique<Id extends symbol, Name extends string, Value> = 
  // & Omit<Value, typeof THIS_TYPE>
  Value
  & { readonly [UNIQUE]: "Unique" }
  & { readonly [THIS_TYPE]: Value }
  & { readonly [Key in Id]: Name }
;

const TYPE_BRAND = Symbol();

export type WithBrand<Brand extends symbol, T> = (
  & T 
  & { readonly [TYPE_BRAND]: Brand }
  & { readonly [Key in Brand]: Brand }
);

export const WithBrand = <Brand extends symbol, T>(
  brand: Brand,
  value: Omit<T, Brand | typeof TYPE_BRAND>,
) => {
  return value as WithBrand<Brand, T>;
};

// Does this return never for WithBrand<typeof someSymbole, 0>
export type GetBranded<Value> = 
  // Value extends null | undefined | number | boolean | string
  //   ? Value
  //   : 
    Value extends WithBrand<infer Brand, infer Inner>
      ? Omit<Inner, typeof TYPE_BRAND | Brand>
      : never
  
const NOMINAL_BRAND = Symbol();

export type Nominal<Brand, Type> = {
  virtualType: Type,
  virtualTypeBrand: Brand,
  virtualOwnBrand: typeof NOMINAL_BRAND,
};

export const intoNominal = <Brand, Type>(brand: Brand, type: Type): Nominal<Brand, Type> => {
  return type as any as Nominal<Brand, Type>;
};

export const fromNominal = <Brand, Type>(nominal: Nominal<Brand, Type>): Type => {
  return nominal as any as Type;
};

export const Nominal = {
  create: intoNominal,
  get: fromNominal,
};