
export const NONE_BRAND = Symbol();
export const SOME_BRAND = Symbol();

export type NullableNone = null;
export type NullableSome<T> = T;
export type Nullable<T> = NullableNone | NullableSome<T>;

