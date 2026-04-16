import { Tried, Success, Failure, Unique } from "../x.ts"

export const enum CreateDifficultyErrorType {
  NotFinitRealBetweenZeroAndOne,
}

export type CreateDifficultyError = {
  readonly type: CreateDifficultyErrorType.NotFinitRealBetweenZeroAndOne,
  readonly value: number,
}

export const CreateDifficultyError = {
  NotFinitRealBetweenZeroAndOne: (value: number): CreateDifficultyError => {
    return {
      type: CreateDifficultyErrorType.NotFinitRealBetweenZeroAndOne,
      value,
    };
  },
};

const BRAND = Symbol()

// TODO: Rename to DifficultyScale
export type Difficulty = Unique<typeof BRAND, "Difficulty", number>

const construct = (value: number): Difficulty => {
  return value as Difficulty;
};

const create = (value: number): Tried<Difficulty, CreateDifficultyError> => {
  if (Number.isFinite(value) && value <= 0 && value >= 1) {
    return Success(construct(value));
  } else {
    return Failure(CreateDifficultyError.NotFinitRealBetweenZeroAndOne(value));
  }
};

export const Difficulty = {
  create,
};