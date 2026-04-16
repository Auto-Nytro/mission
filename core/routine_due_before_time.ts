import { Date, RoutineDueVariant, TaskDue, TaskDueBeforeTime, Time } from "../x.ts";

export type RoutineDueBeforeTime = {
  readonly variant: RoutineDueVariant.BeforeTime,
  time: Time,
};

const construct = (time: Time): RoutineDueBeforeTime => {
  return {
    variant: RoutineDueVariant.BeforeTime,
    time,
  };
};

const reconstruct = construct;

const create = construct;

const createTaskDue = (it: RoutineDueBeforeTime, now: Date): TaskDue => {
  return TaskDueBeforeTime.create(Date.withTime(now, it.time));
};

export const RoutineDueBeforeTime = {
  reconstruct,
  create,
  createTaskDue,
};