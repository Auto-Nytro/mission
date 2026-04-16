// TODO: Maybe use a generic EntityDescription

import { Failure, Success, Tried, Unique } from "../x.ts";

export const enum CreateRoutineDescriptionErrorType {
  LengthViolation,
}

export type CreateRoutineDescriptionError = {
  readonly type: CreateRoutineDescriptionErrorType.LengthViolation,
  readonly value: string,
}

export const CreateRoutineDescriptionError = {
  LengthViolation: (value: string): CreateRoutineDescriptionError => {
    return {
      type: CreateRoutineDescriptionErrorType.LengthViolation,
      value,
    };
  },
};

const BRAND = Symbol();

export type RoutineDescription = Unique<typeof BRAND, "RoutineDescription", string>;

const MAXIMUM_LENGTH = 10000;
const MINIMUM_LENGTH = 1;

const construct = (value: string): RoutineDescription => {
  return value as RoutineDescription;
};

const create = (value: string): Tried<RoutineDescription, CreateRoutineDescriptionError> => {
  if (value.length < MINIMUM_LENGTH) {
    return Failure(CreateRoutineDescriptionError.LengthViolation(value));
  }
  if (value.length > MAXIMUM_LENGTH) {
    return Failure(CreateRoutineDescriptionError.LengthViolation(value));
  }
  return Success(construct(value));
};

export const RoutineDescription = {
  MINIMUM_LENGTH,
  MAXIMUM_LENGTH,
  create,
};