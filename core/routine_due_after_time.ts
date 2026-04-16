import { Date, RoutineDueVariant, TaskDue, TaskDueAfterTime, Time } from "../x.ts";

export type RoutineDueAfterTime = {
  readonly variant: RoutineDueVariant.AfterTime,
  time: Time,
};

const construct = (time: Time): RoutineDueAfterTime => {
  return {
    variant: RoutineDueVariant.AfterTime,
    time,
  };
};

const reconstruct = construct;

const create = construct;

const createTaskDue = (it: RoutineDueAfterTime, now: Date): TaskDue => {
  return TaskDueAfterTime.create(Date.withTime(now, it.time));
};

export const RoutineDueAfterTime = {
  reconstruct,
  create,
  createTaskDue,
};