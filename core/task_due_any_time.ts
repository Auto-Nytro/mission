import { TaskDueVariant, TaskState } from "../x.ts"

export type TaskDueAnyTime = {
  readonly variant: TaskDueVariant.DueAnyTime,
};

const create = (): TaskDueAnyTime => {
  return {
    variant: TaskDueVariant.DueAnyTime,
  };
};

const getState = (it: TaskDueAnyTime) => {
  return TaskState.Due;
};

export const TaskDueAnyTime = {
  create,
  getState,
};
