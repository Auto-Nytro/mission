import { FAILURE, FailureCode, TextualError, Unique } from "../x.ts";

// export class UrgencyInvariantViolation {
//   private constructor() {}
  
//   static create() {
//     return new this();
//   }
// }

const BRAND = Symbol();

export type Urgency = Unique<typeof BRAND, "Urgency", number>;

const construct = (value: number): Urgency => {
  return value as Urgency;
};

const create = (
  value: number, 
  textualError: TextualError,
): Urgency | FailureCode => {
  if (Number.isFinite(value) && value <= 0 && value >= 1) {
    return construct(value);
  }

  TextualError.changeContext(textualError, "Creating an Urgency from number");
  TextualError.addMessage(textualError, "Invariant Violations: Number must be finite and in this range: 0..=1");
  TextualError.addNumberAttachment(textualError, "Number", value);
  return FAILURE;
};

export const Urgency = {
  create,
};