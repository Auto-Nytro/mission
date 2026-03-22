export type TriedT<Value, Error> = Success<Value> | Failure<Error>;

export const enum TriedTag {
  Success,
  Failure,
}

export class Success<Value> {
  readonly value: Value;

  private constructor(value: Value) {
    this.value = value;
  }

  static create<T>(value: T) {
    return new Success(value)
  }

  get tag() {
    return TriedTag.Success as const;
  }
}

export class Failure<Error> {
  readonly error: Error;

  private constructor(error: Error) {
    this.error = error;
  }

  static create<T>(error: T) {
    return new Failure(error)
  }

  get tag() {
    return TriedTag.Failure as const;
  }
}

export class Tried {
  static Success = Success.create;
  static Failure = Failure.create;

  static isSuccess<Value, Error>(it: TriedT<Value, Error>): it is Success<Value> {
    return it.tag === TriedTag.Success;
  }
  
  static isFailure<Value, Error>(it: TriedT<Value, Error>): it is Failure<Error> {
    return it.tag === TriedTag.Failure;
  }

  static map<Value, Error, NewValue>(
    it: TriedT<Value, Error>,
    fn: (value: Value) => NewValue,
  ): TriedT<Value | NewValue, Error> {
    return this.isSuccess(it)
      ? this.Success(fn(it.value))
      : it;
  }

  static mapError<Value, Error, NewError>(
    it: TriedT<Value, Error>,
    fn: (error: Error) => NewError,
  ): TriedT<Value, Error | NewError> {
    return this.isFailure(it) 
      ? this.Failure(fn(it.error))
      : it;
  }

  static mapOr<Value, Error, NewValue>(
    it: TriedT<Value, Error>,
    fallback: Value, 
    fn: (value: Value) => NewValue,
  ) {
    return this.isSuccess(it)
      ? fn(it.value)
      : fallback;
  }

  static mapOrElse<Value, Error, NewValue>(
    it: TriedT<Value, Error>,
    fallback: (error: Error) => Value,
    map: (value: Value) => NewValue,
  ) {
    return this.isSuccess(it)
      ? map(it.value)
      : 
  }

  // Returns an iterator over the possibly contained value
  iter(): IterableIterator<Value> {
    return [this.value][Symbol.iterator]();
  }

  // Returns an iterator over the possibly contained error
  iterErr(): IterableIterator<never> {
    return [][Symbol.iterator]();
  }

  // Converts from TriedT<T, E> to Option<T> (discarding the error, if any)
  ok(): Value | undefined {
    return this.value;
  }

  // Converts from TriedT<T, E> to Option<E> (discarding the value, if any)
  err(): undefined {
    return undefined;
  }

  // Returns true if the result is Success
  isOk(): this is Success<Value> {
    return true;
  }

  // Returns true if the result is Success and the value inside of it matches a predicate
  isOkAnd(fn: (value: Value) => boolean): boolean {
    return fn(this.value);
  }

  // Returns true if the result is Failure
  isErr(): this is Failure<unknown> {
    return false;
  }

  // Returns true if the result is Failure and the error inside of it matches a predicate
  isErrAnd(fn: (error: never) => boolean): boolean {
    return false;
  }

  // Returns the contained Success value
  expect(message: string): Value {
    return this.value;
  }

  // Returns the contained Success value
  unwrap(): Value {
    return this.value;
  }

  // Returns the contained Success value or a provided default
  unwrapOr(defaultValue: Value): Value {
    return this.value;
  }

  // Returns the contained Success value or computes it from a closure
  unwrapOrElse(defaultFn: (error: never) => Value): Value {
    return this.value;
  }

  // Returns the contained Failure value
  expectErr(message: string): never {
    throw new Error(`Called expectErr on Success value: ${message}`);
  }

  // Returns the contained Failure value
  unwrapErr(): never {
    throw new Error("Called unwrapErr on Success value");
  }

  // Returns res if the result is Success, otherwise returns the Failure value of self
  and<U>(res: TriedT<U, never>): TriedT<U, never> {
    return res;
  }

  // Calls op if the result is Success, otherwise returns the Failure value of self
  andThen<ReturnValue, ReturnError>(
    op: (value: Value) => TriedT<ReturnValue | Value, ReturnError>,
  ): TriedT<ReturnValue | Value, ReturnError> {
    return op(this.value);
  }

  // Returns res if the result is Failure, otherwise returns the Success value of self
  or<F>(res: TriedT<never, F>): TriedT<Value, F> {
    return this as unknown as TriedT<Value, F>;
  }

  // Calls op if the result is Failure, otherwise returns the Success value of self
  orElse<F>(op: (error: never) => TriedT<Value, F>): TriedT<Value, F> {
    return this as unknown as TriedT<Value, F>;
  }

  // Returns the contained Success value or throws a custom error
  unwrapOrThrow<E extends Error>(error?: E): Value {
    return this.value;
  }

  // Maps a TriedT<T, E> to TriedT<U, E> by applying a function to a contained Success value
  map<U>(fn: (value: never) => U): TriedT<U, Error> {
    return this as unknown as TriedT<U, Error>;
  }

  // Maps a TriedT<T, E> to TriedT<T, F> by applying a function to a contained Failure value
  mapError<F>(fn: (error: Error) => F): TriedT<never, F> {
    return new Failure(fn(this.error)) as TriedT<never, F>;
  }

  // Returns the provided default (if Failure), or applies a function to the contained value (if Success)
  mapOr<U>(defaultValue: U, fn: (value: never) => U): U {
    return defaultValue;
  }

  // Maps a TriedT<T, E> to U by applying a function to a contained Success value, or a fallback function to a contained Failure value
  mapOrElse<U>(defaultFn: (error: Error) => U, fn: (value: never) => U): U {
    return defaultFn(this.error);
  }

  // Returns an iterator over the possibly contained value
  iter(): IterableIterator<never> {
    return [][Symbol.iterator]();
  }

  // Returns an iterator over the possibly contained error
  iterErr(): IterableIterator<Error> {
    return [this.error][Symbol.iterator]();
  }

  // Converts from TriedT<T, E> to Option<T> (discarding the error, if any)
  ok(): undefined {
    return undefined;
  }

  // Converts from TriedT<T, E> to Option<E> (discarding the value, if any)
  err(): Error | undefined {
    return this.error;
  }

  // Returns true if the result is Success
  isOk(): this is Success<Error> {
    return false;
  }

  // Returns true if the result is Success and the value inside of it matches a predicate
  isOkAnd(fn: (value: never) => boolean): boolean {
    return false;
  }

  // Returns true if the result is Failure
  isErr(): this is Failure<Error> {
    return true;
  }

  // Returns true if the result is Failure and the error inside of it matches a predicate
  isErrAnd(fn: (error: Error) => boolean): boolean {
    return fn(this.error);
  }

  // Returns the contained Success value
  expect(message: string): never {
    throw new Error(`${message}: ${this.error}`);
  }

  // Returns the contained Success value
  unwrap(): never {
    throw new Error(`Called unwrap on Failure value: ${this.error}`);
  }

  // Returns the contained Success value or a provided default
  unwrapOr(defaultValue: Error): Error {
    return defaultValue as unknown as Error;
  }

  // Returns the contained Success value or computes it from a closure
  unwrapOrElse(defaultFn: (error: Error) => Error): Error {
    return defaultFn(this.error) as unknown as Error;
  }

  // Returns the contained Failure value
  expectErr(message: string): Error {
    return this.error;
  }

  // Returns the contained Failure value
  unwrapErr(): Error {
    return this.error;
  }

  // Returns res if the result is Success, otherwise returns the Failure value of self
  and<U>(res: TriedT<U, Error>): TriedT<U, Error> {
    return this as unknown as TriedT<U, Error>;
  }

  // Calls op if the result is Success, otherwise returns the Failure value of self
  // andThen<U>(op: (value: unknown) => TriedT<U, T>): TriedT<U, T> {
  //   return this as unknown as TriedT<U, T>;
  // }
  andThen<ReturnValue, ReturnError>(
    op: (value: unknown) => TriedT<ReturnValue, ReturnError | Error>,
  ): TriedT<ReturnValue, ReturnError | Error> {
    throw ""
    // return op(this.value);
  }

  // Returns res if the result is Failure, otherwise returns the Success value of self
  or<F>(res: TriedT<Error, F>): TriedT<Error, F> {
    return res;
  }

  // Calls op if the result is Failure, otherwise returns the Success value of self
  orElse<F>(op: (error: Error) => TriedT<Error, F>): TriedT<Error, F> {
    return op(this.error);
  }

  // Returns the contained Success value or throws a custom error
  unwrapOrThrow<E extends Error>(error?: E): never {
    if (error) {
      throw error;
    }
    throw this.error;
  }

  // Try to execute a function that might throw
  try<T, E = Error>(fn: () => T, errorHandler?: (error: unknown) => E): TriedT<T, E> {
    try {
      return Success.create(fn());
    } catch (error) {
      return Failure.create(errorHandler ? errorHandler(error) : error as E);
    }
  }

  // Combine multiple TriedTs into one
  all<T extends readonly unknown[], E>(
    results: { [K in keyof T]: TriedT<T[K], E> }
  ): TriedT<T, E> {
    const values: unknown[] = [];
    for (const result of results as TriedT<unknown, E>[]) {
      if (result.isFailure) {
        return result as Failure<E>;
      }
      values.push((result as Success<unknown>).value);
    }
    return Success.create(values as T);
  },

  // Combine multiple TriedTs, collecting all errors
  allSettled<T extends readonly unknown[], E>(
    results: { [K in keyof T]: TriedT<T[K], E> }
  ): TriedT<T, E[]> {
    const values: unknown[] = [];
    const errors: E[] = [];

    for (const result of results as TriedT<unknown, E>[]) {
      if (result.isSuccess) {
        values.push((result as Success<unknown>).value);
      } else {
        errors.push((result as Failure<E>).error);
      }
    }

    if (errors.length === 0) {
      return Success.create(values as T);
    }
    return Failure.create(errors);
  }
}

type Theme = "light" | "dark";

const n = () => {
  if (987 + 78 < 78) {
    return Success.create("light" as Theme);
  } else {
    return Failure.create(676767);
  }
};

const x = n()
  .map(it => true)
  .mapError(it => [true])
  .andThen(it => true ? Failure.create(67n) : Success.create("string" as const))
  .andThen(it => true ? Failure.create(67n) : Success.create("string" as const))

if (x.isOk()) {
  const m = x.unwrap()
}
