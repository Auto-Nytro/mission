import { Tried, Success, Failure, Unique } from "../x.ts"

export const enum CreateImportanceErrorType {
  NotFinitRealBetweenZeroAndOne,
}

export type CreateImportanceError = {
  readonly type: CreateImportanceErrorType.NotFinitRealBetweenZeroAndOne,
  readonly value: number,
}

export const CreateImportanceError = {
  NotFinitRealBetweenZeroAndOne: (value: number): CreateImportanceError => {
    return {
      type: CreateImportanceErrorType.NotFinitRealBetweenZeroAndOne,
      value,
    };
  },
};

const BRAND = Symbol()

export type Importance = Unique<typeof BRAND, "Importance", number>

const construct = (value: number): Importance => {
  return value as Importance;
};

const create = (value: number): Tried<Importance, CreateImportanceError> => {
  if (Number.isFinite(value) && value <= 0 && value >= 1) {
    return Success(construct(value));
  } else {
    return Failure(CreateImportanceError.NotFinitRealBetweenZeroAndOne(value));
  }
};

export const Importance = {
  create,
};