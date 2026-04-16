import { DateTime, TaskState, TaskDueVariant } from "../x.ts";

export type TaskDueBeforeTime = {
  readonly variant: TaskDueVariant.DueBeforeTime,
  readonly time: DateTime,
};

const create = (time: DateTime): TaskDueBeforeTime => {
  return {
    time,
    variant: TaskDueVariant.DueBeforeTime,
  };
};

const getTime = (it: TaskDueBeforeTime): DateTime => {
  return it.time;
};

const getState = (it: TaskDueBeforeTime, now: DateTime) => {
  if (DateTime.isEarilerThan(it.time, now)) {
    return TaskState.Due;
  }

  return TaskState.Pending;
};

export const TaskDueBeforeTime = {
  create,
  getTime,
  getState,
};