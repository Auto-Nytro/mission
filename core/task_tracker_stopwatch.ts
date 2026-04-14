import { DateTime, Duration, FAILURE, FailureCode, TextualError } from "../x.ts";

export const enum TaskTrackerStopwatchStatusVariant {
  Ready,
  Running,
  Paused,
  Completed,
}

export type TaskTrackerStopwatchStatus = (
  | TaskTrackerStopwatchStatusReady
  | TaskTrackerStopwatchStatusRunning
  | TaskTrackerStopwatchStatusPaused
  | TaskTrackerStopwatchStatusCompleted
);

export type TaskTrackerStopwatchStatusReady = {
  readonly variant: TaskTrackerStopwatchStatusVariant.Ready,
};

export type TaskTrackerStopwatchStatusRunning = {
  readonly variant: TaskTrackerStopwatchStatusVariant.Running,
  readonly at: DateTime,
};

export type TaskTrackerStopwatchStatusPaused = {
  readonly variant: TaskTrackerStopwatchStatusVariant.Paused,
  readonly at: DateTime,
};

export type TaskTrackerStopwatchStatusCompleted = {
  readonly variant: TaskTrackerStopwatchStatusVariant.Completed,
  readonly at: DateTime,
};

export interface TaskTrackerStopwatch {
  workload: Duration;
  workdone: Duration;
  status: TaskTrackerStopwatchStatus;
}

export interface TaskTrackerStopwatchReady extends TaskTrackerStopwatch {
  status: TaskTrackerStopwatchStatusReady,
}
export interface TaskTrackerStopwatchRunning extends TaskTrackerStopwatch {
  status: TaskTrackerStopwatchStatusRunning,
}
export interface TaskTrackerStopwatchPaused extends TaskTrackerStopwatch {
  status: TaskTrackerStopwatchStatusPaused,
}
export interface TaskTrackerStopwatchCompleted extends TaskTrackerStopwatch {
  status: TaskTrackerStopwatchStatusCompleted,
}

const construct = (
  workload: Duration,
  workdone: Duration,
  status: TaskTrackerStopwatchStatus,
): TaskTrackerStopwatch => {
  return {
    workload,
    workdone,
    status,
  };
};

const reconstruct = (
  workload: Duration,
  workdone: Duration,
  status: TaskTrackerStopwatchStatus,
  textualError: TextualError,
): TaskTrackerStopwatch | FailureCode => {
  if (
    Duration.isShorterThan(workdone, workload) 
    && 
    status.variant !== TaskTrackerStopwatchStatusVariant.Completed
  ) {
    TextualError.changeContext(textualError, "Reconstructing a TaskTrackerStopwatch");
    TextualError.addMessage(textualError, "Invariant Violation: 'workdone' must be longer than or equal to 'workload' when 'status.variant' is 'Complete'");
    TextualError.addStringAttachment(textualError, "workdone", Duration.toString2(workdone));
    TextualError.addStringAttachment(textualError, "workload", Duration.toString2(workload));
    return FAILURE;
  }
  
  return construct(
    workload,
    workdone,
    status,
  );
};

const create = (workload: Duration): TaskTrackerStopwatch => {
  return construct(
    workload,
    Duration.zero(),
    {
      variant: TaskTrackerStopwatchStatusVariant.Ready,
    },
  );
};

const isReady = (it: TaskTrackerStopwatch): it is TaskTrackerStopwatchReady => {
  return it.status.variant === TaskTrackerStopwatchStatusVariant.Ready;
};
const isRunning = (it: TaskTrackerStopwatch): it is TaskTrackerStopwatchRunning => {
  return it.status.variant === TaskTrackerStopwatchStatusVariant.Running;
};
const isPaused = (it: TaskTrackerStopwatch): it is TaskTrackerStopwatchPaused => {
  return it.status.variant === TaskTrackerStopwatchStatusVariant.Paused;
};
const isCompleted = (it: TaskTrackerStopwatch): it is TaskTrackerStopwatchCompleted => {
  return it.status.variant === TaskTrackerStopwatchStatusVariant.Completed;
};

const toRunning = (
  it: TaskTrackerStopwatchRunning,
  time: DateTime,
): TaskTrackerStopwatchRunning => {
  return {
    workload: it.workload,
    workdone: it.workdone,
    status: {
      variant: TaskTrackerStopwatchStatusVariant.Running,
      at: time,
    },
  };
};

const toPaused = (
  it: TaskTrackerStopwatchRunning,
  time: DateTime,
): TaskTrackerStopwatchRunning => {
  return {
    workload: it.workload,
    workdone: Duration.saturatingAdd(
      it.workdone, 
      DateTime.tillOrZero(it.status.at, time),
    ),
    status: {
      variant: TaskTrackerStopwatchStatusVariant.Running,
      at: time,
    },
  };
};

const toResumed = (
  it: TaskTrackerStopwatchPaused,
  time: DateTime,
): TaskTrackerStopwatchRunning => {
  return {
    workload: it.workload,
    workdone: it.workdone,
    status: {
      variant: TaskTrackerStopwatchStatusVariant.Running,
      at: time,
    },
  };
};


export const TaskTrackerStopwatch = {
  reconstruct,
  create,
  toRunning,
  toPaused,
  toResumed,
  isCompleted,
  isPaused,
  isReady,
  isRunning,
};