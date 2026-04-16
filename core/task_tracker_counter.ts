import { DateTime, Difficulty, Failure, Nullable, Span, Success, TaskTrackerVariant, Tried } from "../x.ts";

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
  // span: Span;
  // difficulty: Difficulty;
  readonly variant: TaskTrackerVariant.Counter,
  // TODO: Change to PositiveInteger
  workload: number;
  // TODO: Change to PositiveInteger
  workdone: number;
  completedAt: Nullable<DateTime>;
}

export interface TaskTrackerCounterComplete extends TaskTrackerCounter {
  completedAt: DateTime;
}

const construct = (
  // span: Span,
  // difficulty: Difficulty,
  workload: number,
  workdone: number,
  completedAt: Nullable<DateTime>,
): TaskTrackerCounter => {
  return {
    // span,
    // difficulty,
    variant: TaskTrackerVariant.Counter,
    workload,
    workdone,
    completedAt,
  };
};

const reconstruct = (
  // span: Span,
  // difficulty: Difficulty,
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

  return Success(construct(
    // span,
    // difficulty,
    workload,
    workdone,
    completedAt,
  ));
};

const create = (
  span: Span,
  difficulty: Difficulty,
  workload: number,
): TaskTrackerCounter => {
  return construct(
    // span,
    // difficulty,
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


const getWorkload = (it: TaskTrackerCounter): number => {
  return it.workload;
};
const getWorkdone = (it: TaskTrackerCounter): number => {
  return it.workdone;
};
const getCompletedAt = (it: TaskTrackerCounter): Nullable<DateTime> => {
  return it.completedAt;
};

const canUndo = (it: TaskTrackerCounter): boolean => {
  return it.workdone > 0;
};

export type TaskTrackerCounterChanges = {
  workdone?: number,
  completedAt?: Nullable<DateTime>,
};

export const TaskTrackerCounterChanges = {
  create: (): TaskTrackerCounterChanges => {
    return {
      completedAt: undefined,
      workdone: undefined,
    };
  },
};

const incrementOrNoopWithChanges = (
  it: TaskTrackerCounter,
  now: DateTime,
  changes: TaskTrackerCounterChanges,
) => {
  if (it.workdone >= it.workload) {
    return;
  }
  
  it.workdone += 1;
  changes.workdone = it.workdone;

  if (it.workdone >= it.workload) {
    it.completedAt = now;
    changes.completedAt = now;
  }
};

const decrementOrNoopWithChanges = (
  it: TaskTrackerCounter,
  changes: TaskTrackerCounterChanges,
) => {
 if (it.workdone > 0) {
   if (it.completedAt !== null) {
     it.completedAt = null;
     changes.completedAt = null;
   }

    it.workdone -= 1;
    changes.workdone = it.workdone;
  }
};

const clone = (it: TaskTrackerCounter): TaskTrackerCounter => {
  return {
    ...it,
  };
};

export const TaskTrackerCounter = {
  reconstruct,
  create,
  doOrNoop,
  undoOrNoop,
  isComplete,
  getWorkload,
  getWorkdone,
  getCompletedAt,
  canUndo,
  clone,
  incrementOrNoopWithChanges,
  decrementOrNoopWithChanges,
};