import { DateTime, TaskDueVariant, TaskState } from "../x.ts";

export type TaskDueInTimeRange = {
  readonly variant: TaskDueVariant.DueInTimeRange,
  from: DateTime,
  till: DateTime,
};

const construct = (from: DateTime, till: DateTime): TaskDueInTimeRange => {
  return {
    variant: TaskDueVariant.DueInTimeRange,
    from,
    till,
  };
};

const create = (from: DateTime, till: DateTime): TaskDueInTimeRange => {
  return {
    variant: TaskDueVariant.DueInTimeRange,
    from,
    till,
  };
};

const getFrom = (it: TaskDueInTimeRange): DateTime => {
  return it.from;
};

const getTill = (it: TaskDueInTimeRange): DateTime => {
  return it.till;
};

const getState = (it: TaskDueInTimeRange, now: DateTime) => {
  if (DateTime.isEarilerThan(now, it.from)) {
    return TaskState.Pending;
  }
  if (DateTime.isLaterThan(now, it.till)) {
    return null;
  }
};

export const TaskDueInTimeRange = {
  create,
  getFrom,
  getTill,
  getState,
};