import { RoutineDueVariant, TaskDue, TaskDueAnyTime } from "../x.ts";

export type RoutineDueAnyTime = {
  readonly type: RoutineDueVariant.AnyTime;
};

const construct = (): RoutineDueAnyTime => {
  return {
    type: RoutineDueVariant.AnyTime,
  };
};

const reconstruct = construct;

const create = construct;

const createTaskDue = (it: RoutineDueAnyTime): TaskDue => {
  return TaskDueAnyTime.create();
};

export const RoutineDueAnyTime = {
  reconstruct,
  create,
  createTaskDue,
};
