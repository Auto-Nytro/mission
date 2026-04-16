import { Integer, Float, Nullable, TextualError, SUCCESS, FAILURE, SuccessCode, FailureCode, TriedCode, Unique } from "../../x.ts";

export type SqliteValue = null | Integer | Float | number | string;

export interface Buffer {
  readonly buffer: string[],
}

export const Buffer = {
  create: (): Buffer => {
    return {
      buffer: [],
    };
  },

  write: (it: Buffer, slice: string) => {},
};



// ----------------- Named write null.

// ----------------- Named write.

// ----------------- Scalar indexed read.

interface CompoundValueWriteDestination<It> {
  writeNull: (
    it: It, 
    column: Column,
  ) => void;

  writeInteger: (
    it: It, 
    column: Column, 
    integer: number,
  ) => void;

  writeReal: (
    it: It, 
    column: Column, 
    real: number,
  ) => void;

  writeString: (
    it: It, 
    column: Column, 
    string: string,
  ) => void;

  writeBoolean: (
    it: It, 
    column: Column, 
    boolean: boolean,
  ) => void;

  writeScalarValue: <Type>(
    it: It, 
    column: Column, 
    value: Type, 
    descriptor: Scalar<Type>,
  ) => void;

  writeCompoundValue: <Type, Columns>(
    it: It, 
    schema: Columns, 
    value: Type, 
    descriptor: Compound<Type, Columns>,
  ) => void;
}

interface CompoundValueReadSource<It> {
  readonly readAny: (it: It, column: Column, textualError: TextualError) => SqliteValue | FailureCode,
  readonly readNull: (it: It, column: Column, textualError: TextualError) => null | FailureCode;
  readonly readInteger: (it: It, column: Column, textualError: TextualError) => number | FailureCode;
  readonly readReal: (it: It, column: Column, textualError: TextualError) => number | FailureCode;
  readonly readString: (it: It, column: Column, textualError: TextualError) => string | FailureCode;
  readonly readBoolean: (it: It, column: Column, textualError: TextualError) => boolean | FailureCode;
  readonly readScalar: <Type>(it: It, column: Column, descriptor: Scalar<Type>, textualError: TextualError) => Type | FailureCode;
  readonly readCompound: <Type, Columns>(it: It, columns: Columns, descriptor: Compound<Type, Columns>, textualError: TextualError) => Type | FailureCode; 
}

type CompoundRead<Type, Columns> = (
  <Source>(
    source: Source, 
    sourceImpl: CompoundValueReadSource<Source>,
    columns: Columns,
    textualError: TextualError,
  ) => Type | FailureCode
);

type CompoundWrite<Type, Columns> = (
  <Destination>(
    destination: Destination,
    destinationImpl: CompoundValueWriteDestination<Destination>,
    columns: Columns,
    value: Type,
    textualError: TextualError,
  ) => TriedCode
);

export interface Compound<Type, Columns> {
  readonly name: string,
  readonly read: CompoundRead<Type, Columns>,
  readonly write: CompoundWrite<Type, Columns> ,
}


// export const ScalarTypeWriter = {
//   writeNull: (it: ScalarTypeWriter) => {
//     it.buffer.push(serializeNull());
//   },

//   fallableWriteInteger: (it: ScalarTypeWriter, number: number): TriedCode => {
//     const stringOrError = serializeInteger(number);
//     if (stringOrError === FAILURE) {
//       return FAILURE;
//     }

//     it.buffer.push(stringOrError);
//     return SUCCESS;
//   },

//   fallableWriteReal: (it: ScalarTypeWriter, number: number): TriedCode => {
//     const stringOrError = serializeReal(number);
//     if (stringOrError === FAILURE) {
//       return FAILURE;
//     }

//     it.buffer.push(stringOrError);
//     return SUCCESS;
//   },

//   writeBoolean: (it: ScalarTypeWriter, boolean: boolean) => {
//     it.buffer.push(serializeBoolean(boolean));
//   },

//   writeString: (it: ScalarTypeWriter, string: string) => {
//     it.buffer.push(serializeString(string));
//   },
// };

// // export interface ScalarValueWrite<ScalarType> {
// //   readonly name: string,
// //   readonly write: (value: ScalarType, writer: ScalarTypeWriter, textualError: TextualError) => TriedCode;
// // }

// // export interface ScalarValueRead<ScalarType> {
// //   readonly name: string,
// //   readonly read: (value: SqliteValue, textualError: TextualError) => ScalarType | FailureCode;
// // }


// const serializeNull = () => {
//   return "NULL";
// };

// const serializeInteger = (number: number) => {
//   if (Number.isInteger(number)) {
//     return number.toString();
//   } else {
//     return FAILURE;
//   }
// };

// const serializeReal = (number: number) => {
//   if (Number.isFinite(number)) {
//     return number.toString();
//   } else {
//     return FAILURE;
//   }
// };

// const serializeString = (string: string) => {
//   return `'${string.replaceAll(/'/g, "''")}'`;
// };

// const serializeBoolean = (boolean: boolean) => {
//   if (boolean) {
//     return "TRUE";
//   } else {
//     return "FALSE";
//   }
// };



// interface ScalarRead<Type> {
//   (value: SqliteValue, textualError: TextualError): Type | FailureCode;
// }

// interface ScalarWrite<Type, > {
//   (
//     value: Type, 
//     writer: ScalarWriteDestination, 
//     textualError: TextualError,
//   ): TriedCode;
// }

// export interface Scalar2<Type> {
//   readonly name: string,
//   readonly read: ScalarRead<Type>,
//   readonly write: ScalarWrite<Type>,
// }
