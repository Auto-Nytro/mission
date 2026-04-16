import { DateTime, Difficulty, Nullable, Span, TaskTrackerVariant } from "../x.ts";

export interface TaskTrackerCheckbox {
  readonly variant: TaskTrackerVariant.Checkbox,
  span: Span,
  difficulty: Difficulty,
  completedAt: Nullable<DateTime>,
};

export interface TaskTrackerCheckboxComplete extends TaskTrackerCheckbox {
  completedAt: DateTime,
};

export interface TaskTrackerCheckboxIncomplete extends TaskTrackerCheckbox {
  completedAt: null,
};

const construct = (
  span: Span,
  difficulty: Difficulty,
  completedAt: Nullable<DateTime>,
): TaskTrackerCheckbox => {
  return {
    variant: TaskTrackerVariant.Checkbox,
    span,
    difficulty,
    completedAt,
  };
};

const create = (
  span: Span,
  difficulty: Difficulty,
): TaskTrackerCheckbox => {
  return construct(
    span,
    difficulty,
    null,
  );
};

const isComplete = (it: TaskTrackerCheckbox): it is TaskTrackerCheckboxComplete => {
  return it.completedAt !== null;
};

const doOrNoop = (it: TaskTrackerCheckbox, time: DateTime) => {
  if (it.completedAt === null) {
    it.completedAt = time;
  }
};

const undoOrNoop = (it: TaskTrackerCheckbox): void => {
  it.completedAt = null;
};

const getCompletedAt = (it: TaskTrackerCheckbox): Nullable<DateTime> => {
  return it.completedAt;
};

export const TaskTrackerCheckbox = {
  construct,
  create,
  isComplete,
  doOrNoop,
  undoOrNoop,
  getCompletedAt,
};