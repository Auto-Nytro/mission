import { DateTime, Difficulty, Nullable, Span } from "../x.ts";

export interface TaskTrackerCheckbox {
  span: Span,
  difficulty: Difficulty,
  completedAt: Nullable<DateTime>,
};

export interface TaskTrackerCheckboxComplete extends TaskTrackerCheckbox {
  completedAt: DateTime,
};

const construct = (
  span: Span,
  difficulty: Difficulty,
  completedAt: DateTime | null,
): TaskTrackerCheckbox => {
  return {
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

const undoOrNoop = (it: TaskTrackerCheckbox) => {
  it.completedAt = null;
};

export const TaskTrackerCheckbox = {
  construct,
  create,
  isComplete,
  doOrNoop,
  undoOrNoop,
};