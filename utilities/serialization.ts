// type JsonRepr = (
//   | null 
//   | string 
//   | number 
//   | boolean 
//   | JsonRepr[] 
//   | { [key: string]: JsonRepr }
// );

// const isNull = (value: JsonRepr): value is null => {
//   return value === null;
// };
// // const isUndefined = (value: JsonRepr): value is undefined => {
// //   return value === undefined;
// // };
// const isString = (value: JsonRepr): value is string => {
//   return typeof value === "string";
// };
const isInteger = (value: unknown): value is number => {
  return Number.isInteger(value);
};
// const isBoolean = (value: JsonRepr): value is boolean => {
//   return typeof value === "boolean";
// };
const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};
// const isObject = (value: JsonRepr): value is Record<string, JsonRepr> => {
//   return typeof value === "object" && value !== null && !isArray(value);
// };


// class IntoJsonReprError {
//   static create() {
//     return new this
//   }
// }

// class FromJsonReprError {
//   static create() {
//     return new this
//   }
// }

// interface Descriptor<Value> {
//   typeName(): string;
//   intoJsonRepr(value: Value): JsonRepr | IntoJsonReprError;
//   fromJsonRepr(jsonRepr: JsonRepr): Value | FromJsonReprError;
// }

// class StringDescriptor implements Descriptor<string> {
//   private constructor() {}

//   static create() {
//     return new StringDescriptor();
//   }

//   typeName(): string {
//     return "string";
//   }

//   fromJsonRepr(jsonRepr: JsonRepr): string | FromJsonReprError {
//     if (isString(jsonRepr)) {
//       return jsonRepr;
//     } else {
//       return FromJsonReprError.create();
//     }
//   }

//   intoJsonRepr(value: string): JsonRepr | IntoJsonReprError {
//     return value;
//   }
// }

// class IntegerDescriptor implements Descriptor<number> {
//   private constructor() {}

//   static create() {
//     return new IntegerDescriptor();
//   }

//   typeName(): string {
//     return "number";
//   }

//   fromJsonRepr(jsonRepr: JsonRepr): number | FromJsonReprError {
//     if (isInteger(jsonRepr)) { 
//       return jsonRepr;
//     } else {
//       return FromJsonReprError.create();
//     }
//   }

//   intoJsonRepr(value: number): JsonRepr | IntoJsonReprError {
//     return value;
//   }
// }
// class NullDescriptor {
//   private constructor() {}

//   static create() {
//     return new NullDescriptor();
//   }
// }

// class BooleanDescriptor implements Descriptor<boolean> {
//   private constructor() {}

//   static create() {
//     return new BooleanDescriptor();
//   }

//   typeName(): string {
//     return "boolean";
//   }

//   fromJsonRepr(jsonRepr: JsonRepr): boolean | FromJsonReprError {
//     if (isBoolean(jsonRepr)) {
//       return jsonRepr;
//     } else {
//       return FromJsonReprError.create();
//     }
//   }

//   intoJsonRepr(value: boolean): JsonRepr | IntoJsonReprError {
//     return value;
//   }
// }

// class ArrayDescriptor<Item> implements Descriptor<Item[]> {
//   private constructor(private readonly itemDescriptor: Descriptor<Item>) {}

//   static create<Item>(itemDescriptor: Descriptor<Item>) {
//     return new ArrayDescriptor(itemDescriptor);
//   }

//   typeName(): string {
//     return `Array<${this.itemDescriptor.typeName()}>`;
//   }

//   fromJsonRepr(jsonRepr: JsonRepr): FromJsonReprError | Item[] {
//     if (!isArray(jsonRepr)) {
//       return FromJsonReprError.create();
//     }

//     const array: Item[] = [];
//     for (const itemJsonRepr of jsonRepr) {
//       const item = this.itemDescriptor.fromJsonRepr(itemJsonRepr);
//       if (item instanceof FromJsonReprError) {
//         return FromJsonReprError.create();
//       } else {
//         array.push(item);
//       }
//     }

//     return array;
//   }

//   intoJsonRepr(value: Item[]): JsonRepr | IntoJsonReprError {
//     return 
//   }
// }

// class ObjectDescriptor<Object> {
//   private constructor() {}

//   static create() {}
// }

// const serialize = <Value>(
//   value: Value,
//   descriptor: Descriptor<Value>,
// ) => {
//   const jsonRepr = descriptor.intoJsonRepr(value);
//   if (jsonRepr instanceof IntoJsonReprError) {
//     return new Error("");
//   }

//   try {
//     return JSON.stringify(jsonRepr);
//   } catch (error) {
//     return new Error("");
//   }
// };

// const deserialize = <Value>(
//   jsonText: string,
//   descriptor: Descriptor<Value>,
// ) => {
//   let jsonRepr: JsonRepr;
//   try {
//     jsonRepr = JSON.parse(jsonText);
//   } catch (error) {
//     return new Error("");
//   }

//   const value = descriptor.fromJsonRepr(jsonRepr);
//   if (value instanceof FromJsonReprError) {
//     return new Error();
//   } 

//   return value;
// };


// class Destination {
//   private constructor(private readonly buffer: JsonRepr[]) {}

//   static create() {
//     return new Destination([]);
//   }

//   writeNull() {
//     this.buffer.push(null);
//   }

//   writeString(string: string) {
//     this.buffer.push(string);
//   }

//   writeNumber(number: number) {
//     this.buffer.push(number);
//   }

//   writeBoolean(boolean: boolean) {
//     this.buffer.push(boolean);
//   }

//   writeValue<Value>(value: Value, serialize: Serialize<Value>) {
//     serialize.write(value, this);
//   }

//   writeArray<Item>(array: Item[], serialize: Serialize<Item>) {
//     this.writeNumber(array.length);
    
//     for (const item of array) {
//       this.writeValue(item, serialize);
//     }
//   }

//   getBuffer(): ReadonlyArray<JsonRepr> {
//     return this.buffer;
//   }
// }

// export class Serialize<Value> {
//   private constructor(
//     readonly type: string,
//     readonly write: (value: Value, destination: Destination) => void,
//   ) {}

//   static create<Value>({
//     type,
//     write,
//   }: {
//     type: string,
//     write(value: Value, destination: Destination): void;
//   }): Serialize<Value> {
//     return new Serialize(type, write);
//   }

//   serialize(value: Value) {
//     const destination = Destination.create();
//     this.write(value, destination);

//     try {
//       return JSON.stringify(destination.getBuffer());
//     } catch (cause) {
//       return new Error("Serializing a value: JSON.stringify failed", { cause });
//     }
//   }
// }

// export class Source {
//   private constructor(
//     private readonly buffer: unknown[],
//     private index: number,
//   ) {}

//   static create(buffer: JsonRepr[]) {
//     return new Source(buffer, 0);
//   }
  
//   readIntegerWithDebug(): number {
//     const value = this.buffer.at(this.index);
//     if (value === undefined) {
//       throw new Error("");
//     }
//     if (!isInteger(value)) {
//       throw new Error("");
//     }
//     this.index += 1;
//     return value;
//   }

//   readStringOrThrow(): string {
//     const value = this.buffer[this.index];
//     if (value === undefined) {
//       throw new Error("");
//     }
//     if (typeof value !== "string") {
//       throw new Error("");
//     }
//     this.index += 1;
//     return value;
//   }

//   readBooleanOrThrow(): boolean {
//     const value = this.buffer[this.index];
//     if (value === undefined) {
//       throw new Error("");
//     }
//     if (typeof value !== "boolean") {
//       throw new Error("");
//     }
//     this.index += 1;
//     return value;
//   }

//   readValueOrThrow<Value>(deserialize: Deserialize<Value>): Value {
//     return deserialize.read(this);
//   }

//   readArray<Item>(me: Source, deserialize: Deserialize<Item>): Failure | Item[] {
//     const itemsCount = Source_readInteger(me);
//     if (itemsCount === Failure() || itemsCount < 0) {
//       throw new Error("");
//     }
    
//     const array = [];
//     let itemsRead = 0;

//     while (itemsRead < itemsCount) {
//       const item = Source_readValue(me, deserialize);
//       if (item === Failure()) {
//         throw new Error("");
//       }

//       array.push(item);
//       itemsRead += 1;
//     }

//     return array;
//     }

//   readIntegerOrThrow(): number {
//     const value = this.buffer.at(this.index);
//     if (value === undefined) {
//       throw new Error("");
//     }
//     if (!isInteger(value)) {
//       throw new Error("");
//     }
//     this.index += 1;
//     return value;
//   }

//   readStringOrThrow(): string {
//     const value = this.buffer[this.index];
//     if (value === undefined) {
//       throw new Error("");
//     }
//     if (typeof value !== "string") {
//       throw new Error("");
//     }
//     this.index += 1;
//     return value;
//   }

//   readBooleanOrThrow(): boolean {
//     const value = this.buffer[this.index];
//     if (value === undefined) {
//       throw new Error("");
//     }
//     if (typeof value !== "boolean") {
//       throw new Error("");
//     }
//     this.index += 1;
//     return value;
//   }

//   readValueOrThrow<Value>(deserialize: Deserialize<Value>): Value {
//     return deserialize.read(this);
//   }

//   readArray<Item>(me: Source, deserialize: Deserialize<Item>): Failure | Item[] {
//     const itemsCount = Source_readInteger(me);
//     if (itemsCount === Failure() || itemsCount < 0) {
//       throw new Error("");
//     }
    
//     const array = [];
//     let itemsRead = 0;

//     while (itemsRead < itemsCount) {
//       const item = Source_readValue(me, deserialize);
//       if (item === Failure()) {
//         throw new Error("");
//       }

//       array.push(item);
//       itemsRead += 1;
//     }

//     return array;
//     }

//   // export const Source_readString = (me: Source): Failure | string => {
//   //   const value = this.buffer[this.index];
//   //   if (value === undefined) {
//   //     throw new Error("");
//   //   }
    
//   //   if (typeof value !== "string") {
//   //     throw new Error("");
//   //   }

//   //   this.index += 1;
//   //   return value;
//   // };

//   // export const Source_readBoolean = (me: Source): Failure | boolean => {
//   //   const value = this.buffer[this.index];
//   //   if (value === undefined) {
//   //     throw new Error("");
//   //   }

//   //   if (typeof value !== "boolean") {
//   //     throw new Error("");
//   //   }

//   //   this.index += 1;
//   //   return value;
//   // };

//   // export const Source_readValue = <Value>(me: Source, deserialize: Deserialize<Value>): Failure | Value => {
//   //   return deserialize.read(me);
//   // };

//   // export const Source_readArray = <Item>(me: Source, deserialize: Deserialize<Item>): Failure | Item[] => {
//   //   const itemsCount = Source_readInteger(me);
//   //   if (itemsCount === Failure() || itemsCount < 0) {
//   //     throw new Error("");
//   //   }
    
//   //   const array = [];
//   //   let itemsRead = 0;

//   //   while (itemsRead < itemsCount) {
//   //     const item = Source_readValue(me, deserialize);
//   //     if (item === Failure()) {
//   //       throw new Error("");
//   //     }

//   //     array.push(item);
//   //     itemsRead += 1;
//   //   }

//   //   return array;
//   // };

// }

// export class Deserialize<T> {
//   private constructor(
//     private type: string,
//     private readOrThrow: (source: Source) => T,
//   ) {}

//   static create<T>({
//     type,
//     read,
//   }: {
//     type: string,
//     read: (source: Source) => T,
//   }) {
//     return new Deserialize(type, read);
//   }


//   deserialize(string: string) {
//     let buffer;
    
//     try {
//       buffer = JSON.parse(string);
//     } catch (cause) {
//       return new Error("", { cause });
//     }

//     if (!Array.isArray(buffer)) {
//       return new Error("");
//     }

//     const source = Source.create(buffer);
//     const value = this.readOrThrow(source);
//     if (value === Failure()) {
//       return new Error("");
//     }
//     if (source.index !== source.buffer.length) {
//       return new Error("");
//     }

//     return value;
//   }
// }


// const isInteger = (value: unknown): value is number => {
//   return Number.isInteger(value);
// };
// enum It {
//   ExpectingReadAnyValue,
//   ExpectingReadWrapper,
//   ExpectingOpenObject,
//   ExpectingReadObjectProperty,
//   ExpectingOpenArray,
//   ExpectingReadArrayItem,
//   ExpectingNoRead,
// }

// enum SourceContextTag {
//   ExpectingRead,
//   DeserializingObject,
//   DeserializingArray,
//   Closed,
// }

// type ReadPropertyContext = {};

// type ReadObjectContext = {
//   readonly type: SourceContextTag.DeserializingObject,
// };
// type ReadArrayContext = {
//   readonly type: SourceContextTag.DeserializingArray,
// };
// type ReadWrapperContext = {
//   readonly type: SourceContextTag.DeserializingArray,
// };

// class Source {
//   private constructor(
//     private data: unknown[], 
//     private index: number,
//     private context: It,
//     private earilerContexts: It[],
//   ) {}

//   static create(data: unknown[]) {
//     return new Source(data, 0, It.ExpectingReadAnyValue, []);
//   }

//   readNullOrThrow(): null {
//     const value = this.data[this.index];
//     if (value === null) {
//       this.index += 1;
//       return null;
//     }

//     if (value === undefined) {
//       throw new Error();
//     }

//     throw new Error();
//   }

//   readNumberOrThrow(): number {
//     const value = this.data[this.index];
//     if (typeof value === "number") {
//       this.index += 1;
//       return value;
//     }

//     if (value === undefined) {
//       throw new Error();
//     }

//     throw new Error();
//   }

//   readBooleanOrThrow(): boolean {
//     const value = this.data[this.index];
//     if (typeof value === "boolean") {
//       this.index += 1;
//       return value;
//     }

//     if (value === undefined) {
//       throw new Error();
//     }

//     throw new Error();
//   }

//   readStringOrThrow(): string {
//     const value = this.data[this.index];
//     if (typeof value === "string") {
//       this.index += 1;
//       return value;
//     }

//     if (value === undefined) {
//       throw new Error();
//     }

//     throw new Error();
//   }

//   readValueOrThrow<T>(deserialize: Deserialize<T>): T {
//     return deserialize.reader.readOrThrow(this);
//   }

//   readWrapperOrThrow<T>(name: string, deserialize: Deserialize<T>): T {
//     switch (this.context) {
//       case It.ExpectingReadAnyValue:
//       case It.ExpectingReadWrapper:
//       case It.ExpectingReadArrayItem:
//       case It.ExpectingReadObjectProperty: {
//         this.earilerContexts.push(this.context);
//         this.context = It.ExpectingReadAnyValue;
//       }
//       case It.ExpectingOpenObject:
//       case It.ExpectingOpenArray:
//       case It.ExpectingNoRead: {
//         throw new Error();
//       }
//     }

//     return this.readValueOrThrow(deserialize);
//   }

//   openObjectOrThrow() {
//     if () {}
//   }

//   readObjectPropertyOrThrow<T>(name: string, deserialize: Deserialize<T>): T {

//   }
//   closeObjectOrThrow() {}

//   openArrayOrThrow() {}
//   closeArrayOrThrow() {}
//   readArrayOrThrow() {}
//   readArrayItemOrThrow() {}
// }

// class Destination {
//   private constructor(
//     private data: unknown[],
//     private closed: boolean,
//   ) {}

//   static create() {
//     return new Destination([], false);
//   }

//   getData() {
//     return this.data;
//   }

//   writeNullOrThrow() {}
//   writeUndefinedOrThrow() {}
//   writeNumberOrThrow(value: number) {}
//   writeBooleanOrThrow(value: boolean) {}
//   writeStringOrThrow(value: string) {}
//   writeArrayOrThrow<Item>(value: Item, itemWrite: Serialize<Item>) {}
//   writeOrThrow<Value>(value: Value, valueWrite: Serialize<Value>) {}
// }

// class Deserialize<T> {
//   private constructor(
//     readonly reader: { readOrThrow(reader: Source): T },
//   ) {}

//   static create<T>(reader: { readOrThrow(reader: Source): T }) {
//     return new Deserialize(reader);
//   }

//   deserialize(json: string) {
//     let serializedData;
//     try {
//       serializedData = JSON.parse(json);
//     } catch (error) {
//       return Failure.create(new Error(""));
//     }

//     if (!Array.isArray(serializedData)) {
//       return Failure.create(new Error(""));
//     }

//     const source = Source.create(serializedData);
//     let deserialiedData;
//     try {
//       deserialiedData = this.reader.readOrThrow(source);
//     } catch (error) {
//       return Failure.create(new Error(""));
//     }

//     return Success.create(deserialiedData);
//   }
// }

// class Serialize<T> {
//   private constructor(
//     private writer: { writeOrThrow(writer: Destination, it: T): void },
//   ) {}

//   static create<T>(
//     writer: { writeOrThrow(writer: Destination, it: T): void }
//   ) {
//     return new Serialize(writer);
//   }

//   serialize(it: T) {
//     const destination = Destination.create();
//     try {
//       this.writer.writeOrThrow(destination, it);
//     } catch (error) {
//       return Failure.create(new Error(""));
//     }

//     let json;
//     try {
//       json = JSON.stringify(destination.getData(), null, 0);
//     } catch (error) {
//       return Failure.create(new Error(""));
//     }

//     return Success.create(json);
//   }
// }

// export const DurationSerialize = Serialize.create<Duration>({
//   writeOrThrow(writer, it) {
//     writer.writeNumberOrThrow(it.toTotalMilliseconds());
//   },
// });

// export const DurationDeserialize = Deserialize.create<Duration>({
//   readOrThrow(reader) {
//     const number = reader.readNumberOrThrow();
    
//     // reader.readWrapperValueOrThrow();
//     // reader.readArrayOrThrow();
//     // reader.readArrayItemOrThrow();
//     // reader.openArrayOrThrow();
//     // reader.closeArrayOrThrow();
//     // reader.openObjectOrThrow();
//     // reader.readObjectPropertyOrThrow("name", NumberDeserialize);
//     // reader.readObjectPropertyOrThrow("title", StringDeserialize);

//     const duration = Duration.fromMilliseconds(number);
//     // reader.throwTypeLevelError
//     // reader.throwFieldLevelError
//     // reader.throwArrayItemError
//   },
// });

// export const InstantSerialize = Serialize.create<Instant>({
//   writeOrThrow(writer, it) {
//     writer.writeNumberOrThrow(it.toTimestamp)
//   },
// });

// export const Countdown_serialize2 = Serialize.create<Countdown>({
//   writeOrThrow(writer, it) {
//     // writer.writeValue();
//   },
// });

// export const Countdown_intoJsonRepr = (it: Countdown) => {
//   return [
//     it.getFrom().toTimestamp(),
//     it.getTill().toTimestamp(),
//   ];
// };

// const enum Type {
//   Integer,
//   String,
//   Array,
// }


// const createUnexpectedValueError = (
//   typeName: string, 
//   expectedType: Type, 
//   it: JsonValue,
// ): Error => {
//   return new Error("Deserializing Countdown: Json value is not an array");
// };

// const createFieldValueError = (
//   typeName: string, 
//   fieldName: string, 
//   expectedType: Type,
//   it: JsonValue | undefined,
// ) => {
//   return new Error("Deserializing Countdown: Deserializing 'from' field: Field is either missing or its value not an integer");
//   return new Error("Deserializing Countdown: Deserializing 'from' field: Field is either missing or its value not an integer");
// };

// const createConstructValueError = (
//   dataTypeName: string,
//   error: Error,
// ): Error => {
//   return new Error();
// };

// class Serde<T> {
//   private constructor(
//     readonly dataTypeName: string,
//     readonly intoJsonValue: (value: T) => JsonValue,
//     readonly fromJsonValue: (jsonValue: JsonValue) => T | Error
//   ) {}

//   static create<T>({
//     dataTypeName,
//     intoJsonValue,
//     fromJsonValue,
//   }: {
//     readonly dataTypeName: string,
//     readonly intoJsonValue: (value: T) => JsonValue,
//     readonly fromJsonValue: (jsonValue: JsonValue) => T | Error,
//   }) {
//     return new Serde(dataTypeName, intoJsonValue, fromJsonValue);
//   }
// }
