import { DateTime, TaskDueVariant, TaskState } from "../x.ts";

export type TaskDueAfterTime = {
  readonly variant: TaskDueVariant.DueAfterTime,
  readonly time: DateTime,
};

const create = (time: DateTime): TaskDueAfterTime => {
  return {
    variant: TaskDueVariant.DueAfterTime,
    time,
  };
};

const getTime = (it: TaskDueAfterTime): DateTime => {
  return it.time;
};

const getState = (it: TaskDueAfterTime, now: DateTime) => {
  if (DateTime.isLaterThan(it.time, now)) {
    return TaskState.Due;
  }
  
  return TaskState.Pending;
};

export const TaskDueAfterTime = {
  create,
  getTime,
  getState,
};