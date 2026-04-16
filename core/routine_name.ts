// TODO: Maybe use a generic EntityName

import { Failure, Success, Tried, Unique } from "../x.ts";

export const enum CreateRoutineNameErrorType {
  LengthViolation,
}

export type CreateRoutineNameError = {
  readonly type: CreateRoutineNameErrorType.LengthViolation,
  readonly value: string,
}

export const CreateRoutineNameError = {
  LengthViolation: (value: string): CreateRoutineNameError => {
    return {
      type: CreateRoutineNameErrorType.LengthViolation,
      value,
    };
  },
};

const BRAND = Symbol();

export type RoutineName = Unique<typeof BRAND, "RoutineName", string>;

const MAXIMUM_LENGTH = 1000;
const MINIMUM_LENGTH = 1;

const construct = (value: string): RoutineName => {
  return value as RoutineName;
};

const create = (value: string): Tried<RoutineName, CreateRoutineNameError> => {
  if (value.length < MINIMUM_LENGTH) {
    return Failure(CreateRoutineNameError.LengthViolation(value));
  }
  if (value.length > MAXIMUM_LENGTH) {
    return Failure(CreateRoutineNameError.LengthViolation(value));
  }
  return Success(construct(value));
};

export const RoutineName = {
  MINIMUM_LENGTH,
  MAXIMUM_LENGTH,
  create,
};