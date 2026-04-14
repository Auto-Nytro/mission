import { Failure, Success, Tried, Unique } from "../x.ts";

export const enum CreateHabitDescriptionErrorType {
  LengthViolation,
}

export type CreateHabitDescriptionError = {
  readonly type: CreateHabitDescriptionErrorType.LengthViolation,
  readonly value: string,
}

export const CreateHabitDescriptionError = {
  LengthViolation: (value: string): CreateHabitDescriptionError => {
    return {
      type: CreateHabitDescriptionErrorType.LengthViolation,
      value,
    };
  },
};

const BRAND = Symbol();

export type HabitDescription = Unique<typeof BRAND, "HabitDescription", string>;

const MAXIMUM_LENGTH = 10000;
const MINIMUM_LENGTH = 1;

const construct = (value: string): HabitDescription => {
  return value as HabitDescription;
};

const create = (value: string): Tried<HabitDescription, CreateHabitDescriptionError> => {
  if (value.length < MINIMUM_LENGTH) {
    return Failure(CreateHabitDescriptionError.LengthViolation(value));
  }
  if (value.length > MAXIMUM_LENGTH) {
    return Failure(CreateHabitDescriptionError.LengthViolation(value));
  }
  return Success(construct(value));
};

export const HabitDescription = {
  create,
};