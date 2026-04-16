import { Integer, TextualError } from "../x.ts";

export const enum TaskTrackerVariant {
  Counter,
  Checkbox,
  Stopwatch,
}

const toNumber = (it: TaskTrackerVariant): Integer => {
  
};

/**
 * @throws {TextualError}
 */
const fromNumberOrThrow = (number: number): TaskTrackerVariant => {

};

export const TaskTrackerVariantM = {
  toNumber,
  fromNumberOrThrow,
};