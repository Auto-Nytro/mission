import { DateTime, Difficulty, Failure, Nullable, Span, Success, Tried } from "../x.ts";

export const enum CreateTaskTrackerCounterErrorVariant {
  CompletedAtViolation,
}

export type CreateTaskTrackerCounterError = {
  readonly variant: CreateTaskTrackerCounterErrorVariant.CompletedAtViolation, 
};

export const CreateTaskTrackerCounterError = {
  CompletedAtViolation: (): CreateTaskTrackerCounterError => {
    return {
      variant: CreateTaskTrackerCounterErrorVariant.CompletedAtViolation,
    };
  },
};

export interface TaskTrackerCounter {
  span: Span;
  difficulty: Difficulty;
  workload: number;
  workdone: number;
  completedAt: Nullable<DateTime>;
}

export interface TaskTrackerCounterComplete extends TaskTrackerCounter {
  completedAt: DateTime;
}

const construct = (
  span: Span,
  difficulty: Difficulty,
  workload: number,
  workdone: number,
  completedAt: Nullable<DateTime>,
): TaskTrackerCounter => {
  return {
    span,
    difficulty,
    workload,
    workdone,
    completedAt,
  };
};

const reconstruct = (
  span: Span,
  difficulty: Difficulty,
  workload: number,
  workdone: number,
  completedAt: Nullable<DateTime>,
): Tried<TaskTrackerCounter, CreateTaskTrackerCounterError> => {
  if (
    workdone === workload
    &&
    completedAt === null
  ) {
    return Failure(CreateTaskTrackerCounterError.CompletedAtViolation());
  }

  return Success({
    span,
    difficulty,
    workload,
    workdone,
    completedAt,
  });
};

const create = (
  span: Span,
  difficulty: Difficulty,
  workload: number,
): TaskTrackerCounter => {
  return construct(
    span,
    difficulty,
    workload,
    0,
    null,
  );
};

const doOrNoop = (it: TaskTrackerCounter, time: DateTime): void => {
  if (it.workdone >= it.workload) {
    return;
  }
  
  it.workdone += 1;

  if (it.workdone >= it.workload) {
    it.completedAt = time;
  }
};

const undoOrNoop = (it: TaskTrackerCounter): void => {
  if (it.workdone > 0) {
    it.workdone -= 1;
    it.completedAt = null;
  }
};

const isComplete = (it: TaskTrackerCounter): it is TaskTrackerCounterComplete => {
  return it.completedAt !== null;
};

export const TaskTrackerCounter = {
  reconstruct,
  create,
  doOrNoop,
  undoOrNoop,
  isComplete,
};