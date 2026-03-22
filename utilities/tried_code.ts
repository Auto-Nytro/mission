const SUCCESS = Symbol("");
const FAILURE = Symbol("");

export type SuccessT = typeof SUCCESS;
export type FailureT = typeof FAILURE;
export type TriedCodeT = SuccessT | FailureT;

export const Success = () => SUCCESS;
export const Failure = () => FAILURE;

export const isSuccess = (value: unknown): value is SuccessT => {
  return value === SUCCESS;
};
export const isFailure = (value: unknown): value is FailureT => {
  return value === FAILURE;
};