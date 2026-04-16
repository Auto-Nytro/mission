import { TextualError, Unique } from "../x.ts";

// const DUE_ANY_TIME_AS_NUMBER = 0;
// const DUE_BEFORE_TIME_AS_NUMBER = 1;
// const DUE_AFTER_TIME_AS_NUMBER = 2;
// const DUE_IN_TIME_RANGE_AS_NUMBER = 3;

// type RawDueAnyTime = typeof DUE_ANY_TIME_AS_NUMBER;
// type RawDueBeforeTime = typeof DUE_BEFORE_TIME_AS_NUMBER;
// type RawDueAfterTime = typeof DUE_AFTER_TIME_AS_NUMBER;
// type RawDueInTimeRange = typeof DUE_IN_TIME_RANGE_AS_NUMBER;

// const BRAND = Symbol();

// export type TaskDueVariantAnyTime = Unique<typeof BRAND, "TaskDueVariant.AnyTime", RawDueAnyTime>;
// export type TaskDueVariantBeforeTime = Unique<typeof BRAND, "TaskDueVariant.BeforeTime", RawDueBeforeTime>;
// export type TaskDueVariantAfterTime = Unique<typeof BRAND, "TaskDueVariant.AfterTime", RawDueAfterTime>;
// export type TaskDueVariantInTimeRange = Unique<typeof BRAND, "TaskDueVariant.InTimeRange", RawDueInTimeRange>;

// const DUE_ANY_TIME = DUE_ANY_TIME_AS_NUMBER satisfies RawDueAnyTime as TaskDueVariantAnyTime;
// const DUE_BEFORE_TIME = DUE_BEFORE_TIME_AS_NUMBER satisfies RawDueBeforeTime as TaskDueVariantBeforeTime;
// const DUE_AFTER_TIME = DUE_AFTER_TIME_AS_NUMBER satisfies RawDueAfterTime as TaskDueVariantAfterTime;
// const DUE_IN_TIME_RANGE = DUE_IN_TIME_RANGE_AS_NUMBER satisfies RawDueInTimeRange as TaskDueVariantInTimeRange;

// export type TaskDueVariant = (
//   | TaskDueVariantAnyTime
//   | TaskDueVariantBeforeTime
//   | TaskDueVariantAfterTime
//   | TaskDueVariantInTimeRange
// );

export const enum TaskDueVariant {
  DueAnyTime,
  DueBeforeTime,
  DueAfterTime,
  DueInTimeRange,
}

const toNumber = (it: TaskDueVariant): number => {
  return it;
};

/**
 * @throws {TextualError}
 */
const fromNumberOrThrow = (number: number): TaskDueVariant => {

};

export const TaskDueVariantM = {
  toNumber,
  fromNumberOrThrow,
};