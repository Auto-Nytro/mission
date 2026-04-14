import { FAILURE, FailureCode, TextualError } from "../x.ts";

const BRAND = Symbol();

export type Hour = number & { readonly [BRAND]: never };

export const construct = (value: number): Hour => {
  return value as Hour;
};

export const createOrWriteToTextualError = (
  value: number,
  textualError: TextualError,
): Hour | FailureCode => {
  if (Number.isInteger(value) && value >= 0 && value <= 23) {
    return construct(value);
  }
  
  TextualError.changeContext(textualError, "Creating an Hour from a number");
  TextualError.addMessage(textualError, "Number must be an integer in this range: 0..=23");
  TextualError.addNumberAttachment(textualError, "Number", value);
  return FAILURE;
};