import { TaskDueAfterTime, TaskDueAnyTime, TaskDueBeforeTime, TaskDueInTimeRange, TaskState } from "../x.ts";
import { TaskDueVariant } from "./task_due_variant.ts";

export type TaskDue = (
  | TaskDueAnyTime
  | TaskDueBeforeTime
  | TaskDueAfterTime
  | TaskDueInTimeRange
);

const match = <R1, R2, R3, R4>(
  it: TaskDue,
  onBeforeTime: (it: TaskDueBeforeTime) => R1,
  onAfterTime: (it: TaskDueAfterTime) => R2,
  onInTimeRagne: (it: TaskDueInTimeRange) => R3,
  onAnyTime: (it: TaskDueAnyTime) => R4,
): R1 | R2 | R3 | R4 => {
  switch (it.variant) {
    case TaskDueVariant.DueAnyTime: {
      return onAnyTime(it);
    }
    case TaskDueVariant.DueBeforeTime: {
      return onBeforeTime(it);
    }
    case TaskDueVariant.DueAfterTime: {
      return onAfterTime(it);
    }
    case TaskDueVariant.DueInTimeRange: {
      return onInTimeRagne(it);
    }
  }
};

export const TaskDue = {
  match,
}