import { Float, Integer, TextualError } from "../../x.ts";
import { Index, Scalar, } from "./mod.ts"

export interface ScalarIndexedRead<Value> {
  // fn internal_indexed_read(source: &mut impl IndexedReadSource, index: Index) -> Result<Self, ()>;

  /**
   * @throws {TextualError}
   */
  readonly readOrThrow: <Source>(
    source: Source,
    sourceImpl: IndexedReadSource<Source>,
  ) => Value;
}

// export interface CompoundIndexedRead<It, Indexes> {
//   // fn internal_indexed_read(source: &mut impl IndexedReadSource, indexes: &Self::Indexes) -> Result<Self, ()>;

//   readonly indexedRead: (
//     source: IndexedReadSource,
//   ) => It | FailureCode;
// }

export interface IndexedReadSource<Source> {
  readNullOrThrow: (it: Source, index: Index) => null;
  readIntegerOrThrow: (it: Source, index: Index) => Integer;
  readRealOrThrow: (it: Source, index: Index) => Float;
  readStringOrThrow: (it: Source, index: Index) => string;
  readBooleanOrThrow: (it: Source, index: Index) => boolean;
  readScalarOrThrow: <Type>(it: Source, index: Index, value: Type, descriptor: Scalar<Type>) => void;
  // writeCompoundValue: <Type, Indexes>(
  //   it: Source, 
  //   indexes: Indexes, 
  //   value: Type, 
  //   descriptor: Compound<Type, Indexes>,
  // ) => void;
}
