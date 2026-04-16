import { Tried, Success, Failure, Unique } from "../x.ts"

export const enum CreateWeightErrorType {
  NotFinitRealBetweenZeroAndOne,
}

export type CreateWeightError = {
  readonly type: CreateWeightErrorType.NotFinitRealBetweenZeroAndOne,
  readonly value: number,
}

export const CreateWeightError = {
  NotFinitRealBetweenZeroAndOne: (value: number): CreateWeightError => {
    return {
      type: CreateWeightErrorType.NotFinitRealBetweenZeroAndOne,
      value,
    };
  },
};

const BRAND = Symbol()

export type Weight = Unique<typeof BRAND, "Weight", number>

const construct = (value: number): Weight => {
  return value as Weight;
};

const create = (value: number): Tried<Weight, CreateWeightError> => {
  if (Number.isFinite(value) && value <= 0 && value >= 1) {
    return Success(construct(value));
  } else {
    return Failure(CreateWeightError.NotFinitRealBetweenZeroAndOne(value));
  }
};

export const Weight = {
  create,
};