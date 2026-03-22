const enum Type {
  Some,
  None,
}

export type NoneT = {
  /** Private(this) */
  readonly type: Type.None,
};

export type SomeT<T> = {
  /** Private(this) */
  readonly type: Type.Some,
  /** Private(this) */
  readonly value: T,
};

export type OptionT<T> = NoneT | SomeT<T>;

export const None = (): NoneT => {
  return {
    type: Type.None,
  };
};

export const Some = <T>(value: T): SomeT<T> => {
  return {
    type: Type.Some,
    value,
  };
};