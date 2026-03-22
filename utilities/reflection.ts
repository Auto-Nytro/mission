import { TriedCode, TriedCodeT } from "../x.ts";

// export type Sanitizer<Value> = {
//   readonly name: string,
//   readonly description: string,
//   readonly sanitize: (value: Input) => Output,
// };

export type Invariant<T> = {
  readonly name: string,
  readonly description: string,
  readonly check: (value: T) => TriedCodeT,
};

const enum DataType {
  String,
  Number,
  BigInt,
  Boolean,
  Array,
  Object,
}

export type StringReflection = {
  readonly type: DataType.String,
  // readonly sanitizers: Sanitizer<unknown, string>[],
  readonly invariants: Invariant<string>[],
};

export type NumberReflection = {
  readonly type: DataType.Number,
  // readonly sanitizers: Sanitizer<string>[],
  readonly invariants: Invariant<number>[],
};

export type BigIntReflection = {
  readonly type: DataType.BigInt,
  // readonly sanitizers: Sanitizer<string>[],
  readonly invariants: Invariant<bigint>[],
};

export type BooleanReflection = {
  readonly type: DataType.Boolean,
  // readonly sanitizers: Sanitizer<string>[],
  readonly invariants: Invariant<string>[],
};


export type Reflection = {};

const enum TypeTag {
  Null,
  Union,
  Array,
  Object,
  String,
  Number,
  Boolean,
  Undefined,
  Class,
}

type AnyType = (
  | NullType
  | UndefinedType
  | ArrayType<AnyType>
  | StringType
  | NumberType
  | BooleanType
);

class NullType {
  readonly tag = TypeTag.Null;

  static create() {
    return new NullType();
  }
}

class UndefinedType {
  readonly tag = TypeTag.Undefined;

  static create() {
    return new UndefinedType();
  }
}

class StringType {
  readonly tag = TypeTag.String;

  static create() {
    return new StringType();
  }
}

class NumberType {
  readonly tag = TypeTag.Number;

  static create() {
    return new NumberType();
  }
}

class BooleanType {
  readonly tag = TypeTag.Boolean;

  static create() {
    return new BooleanType();
  }
}

class ArrayType<ItemType extends AnyType> {
  readonly tag = TypeTag.Array;
  readonly itemType: ItemType;

  private constructor(itemType: ItemType) {
    this.itemType = itemType;
  }

  static create<ItemType extends AnyType>(itemType: ItemType) {
    return new ArrayType(itemType);
  }
}

class ObjectType<Object> {
  readonly tag = TypeTag.Object;
  readonly properties: Record<string, AnyType> = {};

  private constructor() {}

  static create<Object extends Record<string, unknown>>(
    propert
  ) {}
}

type JsonRepr = (
  | null 
  | string 
  | number 
  | boolean 
  | JsonRepr[] 
  | { [key: string]: JsonRepr }
);

const isNull = (value: JsonRepr): value is null => {
  return value === null;
};
// const isUndefined = (value: JsonRepr): value is undefined => {
//   return value === undefined;
// };
const isString = (value: JsonRepr): value is string => {
  return typeof value === "string";
};
const isInteger = (value: JsonRepr): value is number => {
  return Number.isInteger(value);
};
const isBoolean = (value: JsonRepr): value is boolean => {
  return typeof value === "boolean";
};
const isArray = (value: JsonRepr): value is JsonRepr[] => {
  return Array.isArray(value);
};
const isObject = (value: JsonRepr): value is Record<string, JsonRepr> => {
  return typeof value === "object" && value !== null && !isArray(value);
};


class IntoJsonReprError {
  static create() {
    return new this
  }
}

class FromJsonReprError {
  static create() {
    return new this
  }
}

interface Descriptor<Value> {
  typeName(): string;
  intoJsonRepr(value: Value): JsonRepr | IntoJsonReprError;
  fromJsonRepr(jsonRepr: JsonRepr): Value | FromJsonReprError;
}

class StringDescriptor implements Descriptor<string> {
  private constructor() {}

  static create() {
    return new StringDescriptor();
  }

  typeName(): string {
    return "string";
  }

  fromJsonRepr(jsonRepr: JsonRepr): string | FromJsonReprError {
    if (isString(jsonRepr)) {
      return jsonRepr;
    } else {
      return FromJsonReprError.create();
    }
  }

  intoJsonRepr(value: string): JsonRepr | IntoJsonReprError {
    return value;
  }
}

class IntegerDescriptor implements Descriptor<number> {
  private constructor() {}

  static create() {
    return new IntegerDescriptor();
  }

  typeName(): string {
    return "number";
  }

  fromJsonRepr(jsonRepr: JsonRepr): number | FromJsonReprError {
    if (isInteger(jsonRepr)) { 
      return jsonRepr;
    } else {
      return FromJsonReprError.create();
    }
  }

  intoJsonRepr(value: number): JsonRepr | IntoJsonReprError {
    return value;
  }
}
class NullDescriptor {
  private constructor() {}

  static create() {
    return new NullDescriptor();
  }
}

class BooleanDescriptor implements Descriptor<boolean> {
  private constructor() {}

  static create() {
    return new BooleanDescriptor();
  }

  typeName(): string {
    return "boolean";
  }

  fromJsonRepr(jsonRepr: JsonRepr): boolean | FromJsonReprError {
    if (isBoolean(jsonRepr)) {
      return jsonRepr;
    } else {
      return FromJsonReprError.create();
    }
  }

  intoJsonRepr(value: boolean): JsonRepr | IntoJsonReprError {
    return value;
  }
}

class ArrayDescriptor<Item> implements Descriptor<Item[]> {
  private constructor(private readonly itemDescriptor: Descriptor<Item>) {}

  static create<Item>(itemDescriptor: Descriptor<Item>) {
    return new ArrayDescriptor(itemDescriptor);
  }

  typeName(): string {
    return `Array<${this.itemDescriptor.typeName()}>`;
  }

  fromJsonRepr(jsonRepr: JsonRepr): FromJsonReprError | Item[] {
    if (!isArray(jsonRepr)) {
      return FromJsonReprError.create();
    }

    const array: Item[] = [];
    for (const itemJsonRepr of jsonRepr) {
      const item = this.itemDescriptor.fromJsonRepr(itemJsonRepr);
      if (item instanceof FromJsonReprError) {
        return FromJsonReprError.create();
      } else {
        array.push(item);
      }
    }

    return array;
  }

  intoJsonRepr(value: Item[]): JsonRepr | IntoJsonReprError {
    return 
  }
}

class ObjectDescriptor<Object> {
  private constructor() {}

  static create() {}
}

const serialize = <Value>(
  value: Value,
  descriptor: Descriptor<Value>,
) => {
  const jsonRepr = descriptor.intoJsonRepr(value);
  if (jsonRepr instanceof IntoJsonReprError) {
    return new Error("");
  }

  try {
    return JSON.stringify(jsonRepr);
  } catch (error) {
    return new Error("");
  }
};

const deserialize = <Value>(
  jsonText: string,
  descriptor: Descriptor<Value>,
) => {
  let jsonRepr: JsonRepr;
  try {
    jsonRepr = JSON.parse(jsonText);
  } catch (error) {
    return new Error("");
  }

  const value = descriptor.fromJsonRepr(jsonRepr);
  if (value instanceof FromJsonReprError) {
    return new Error();
  } 

  return value;
};


class Destination {
  private constructor(private readonly buffer: JsonRepr[]) {}

  static create() {
    return new Destination([]);
  }

  writeNull() {
    this.buffer.push(null);
  }

  writeString(string: string) {
    this.buffer.push(string);
  }

  writeNumber(number: number) {
    this.buffer.push(number);
  }

  writeBoolean(boolean: boolean) {
    this.buffer.push(boolean);
  }

  writeValue<Value>(value: Value, serialize: Serialize<Value>) {
    serialize.write(value, this);
  }

  writeArray<Item>(array: Item[], serialize: Serialize<Item>) {
    this.writeNumber(array.length);
    
    for (const item of array) {
      this.writeValue(item, serialize);
    }
  }

  getBuffer(): ReadonlyArray<JsonRepr> {
    return this.buffer;
  }
}

export class Serialize<Value> {
  private constructor(
    readonly type: string,
    readonly write: (value: Value, destination: Destination) => void,
  ) {}

  static create<Value>({
    type,
    write,
  }: {
    type: string,
    write(value: Value, destination: Destination): void;
  }): Serialize<Value> {
    return new Serialize(type, write);
  }

  serialize(value: Value) {
    const destination = Destination.create();
    this.write(value, destination);

    try {
      return JSON.stringify(destination.getBuffer());
    } catch (cause) {
      return new Error("Serializing a value: JSON.stringify failed", { cause });
    }
  }
}

export class Source {
  private constructor(
    private readonly buffer: unknown[],
    private index: number,
  ) {}

  static create(buffer: JsonRepr[]) {
    return new Source(buffer, 0);
  }
  
  readIntegerWithDebug(): number {
    const value = this.buffer.at(this.index);
    if (value === undefined) {
      throw new Error("");
    }
    if (!isInteger(value)) {
      throw new Error("");
    }
    this.index += 1;
    return value;
  }

  readStringOrThrow(): string {
    const value = this.buffer[this.index];
    if (value === undefined) {
      throw new Error("");
    }
    if (typeof value !== "string") {
      throw new Error("");
    }
    this.index += 1;
    return value;
  }

  readBooleanOrThrow(): boolean {
    const value = this.buffer[this.index];
    if (value === undefined) {
      throw new Error("");
    }
    if (typeof value !== "boolean") {
      throw new Error("");
    }
    this.index += 1;
    return value;
  }

  readValueOrThrow<Value>(deserialize: Deserialize<Value>): Value {
    return deserialize.read(this);
  }

  readArray<Item>(me: Source, deserialize: Deserialize<Item>): Failure | Item[] {
    const itemsCount = Source_readInteger(me);
    if (itemsCount === Failure() || itemsCount < 0) {
      throw new Error("");
    }
    
    const array = [];
    let itemsRead = 0;

    while (itemsRead < itemsCount) {
      const item = Source_readValue(me, deserialize);
      if (item === Failure()) {
        throw new Error("");
      }

      array.push(item);
      itemsRead += 1;
    }

    return array;
    }

  readIntegerOrThrow(): number {
    const value = this.buffer.at(this.index);
    if (value === undefined) {
      throw new Error("");
    }
    if (!isInteger(value)) {
      throw new Error("");
    }
    this.index += 1;
    return value;
  }

  readStringOrThrow(): string {
    const value = this.buffer[this.index];
    if (value === undefined) {
      throw new Error("");
    }
    if (typeof value !== "string") {
      throw new Error("");
    }
    this.index += 1;
    return value;
  }

  readBooleanOrThrow(): boolean {
    const value = this.buffer[this.index];
    if (value === undefined) {
      throw new Error("");
    }
    if (typeof value !== "boolean") {
      throw new Error("");
    }
    this.index += 1;
    return value;
  }

  readValueOrThrow<Value>(deserialize: Deserialize<Value>): Value {
    return deserialize.read(this);
  }

  readArray<Item>(me: Source, deserialize: Deserialize<Item>): Failure | Item[] {
    const itemsCount = Source_readInteger(me);
    if (itemsCount === Failure() || itemsCount < 0) {
      throw new Error("");
    }
    
    const array = [];
    let itemsRead = 0;

    while (itemsRead < itemsCount) {
      const item = Source_readValue(me, deserialize);
      if (item === Failure()) {
        throw new Error("");
      }

      array.push(item);
      itemsRead += 1;
    }

    return array;
    }

  // export const Source_readString = (me: Source): Failure | string => {
  //   const value = this.buffer[this.index];
  //   if (value === undefined) {
  //     throw new Error("");
  //   }
    
  //   if (typeof value !== "string") {
  //     throw new Error("");
  //   }

  //   this.index += 1;
  //   return value;
  // };

  // export const Source_readBoolean = (me: Source): Failure | boolean => {
  //   const value = this.buffer[this.index];
  //   if (value === undefined) {
  //     throw new Error("");
  //   }

  //   if (typeof value !== "boolean") {
  //     throw new Error("");
  //   }

  //   this.index += 1;
  //   return value;
  // };

  // export const Source_readValue = <Value>(me: Source, deserialize: Deserialize<Value>): Failure | Value => {
  //   return deserialize.read(me);
  // };

  // export const Source_readArray = <Item>(me: Source, deserialize: Deserialize<Item>): Failure | Item[] => {
  //   const itemsCount = Source_readInteger(me);
  //   if (itemsCount === Failure() || itemsCount < 0) {
  //     throw new Error("");
  //   }
    
  //   const array = [];
  //   let itemsRead = 0;

  //   while (itemsRead < itemsCount) {
  //     const item = Source_readValue(me, deserialize);
  //     if (item === Failure()) {
  //       throw new Error("");
  //     }

  //     array.push(item);
  //     itemsRead += 1;
  //   }

  //   return array;
  // };

}

export class Deserialize<T> {
  private constructor(
    private type: string,
    private readOrThrow: (source: Source) => T,
  ) {}

  static create<T>({
    type,
    read,
  }: {
    type: string,
    read: (source: Source) => T,
  }) {
    return new Deserialize(type, read);
  }


  deserialize(string: string) {
    let buffer;
    
    try {
      buffer = JSON.parse(string);
    } catch (cause) {
      return new Error("", { cause });
    }

    if (!Array.isArray(buffer)) {
      return new Error("");
    }

    const source = Source.create(buffer);
    const value = this.readOrThrow(source);
    if (value === Failure()) {
      return new Error("");
    }
    if (source.index !== source.buffer.length) {
      return new Error("");
    }

    return value;
  }
}
