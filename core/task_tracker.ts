import { DateTime, Nullable, TaskTrackerCheckbox, TaskTrackerCounter, TaskTrackerStopwatch, TaskTrackerVariant } from "../x.ts";

export type TaskTracker = (
  | TaskTrackerCheckbox
  | TaskTrackerCounter
  | TaskTrackerStopwatch
);

const isComplete = (it: TaskTracker): boolean => {
  switch (it.variant) {
    case TaskTrackerVariant.Counter: {
      return TaskTrackerCounter.isComplete(it);
    }
    case TaskTrackerVariant.Checkbox: {
      return TaskTrackerCheckbox.isComplete(it);
    }
    case TaskTrackerVariant.Stopwatch: {
      return TaskTrackerStopwatch.isCompleted(it);
    }
  }
};

const getCompletedAt = (it: TaskTracker): Nullable<DateTime> => {
  switch (it.variant) {
    case TaskTrackerVariant.Counter: {
      return TaskTrackerCounter.getCompletedAt(it);
    }
    case TaskTrackerVariant.Checkbox: {
      return TaskTrackerCheckbox.getCompletedAt(it);
    }
    case TaskTrackerVariant.Stopwatch: {
      return TaskTrackerStopwatch.getCompletedAt(it);
    }
  }
};

const isStopwatch = (it: TaskTracker): it is TaskTrackerStopwatch => {
  return it.variant === TaskTrackerVariant.Stopwatch;
};

const isCounter = (it: TaskTracker): it is TaskTrackerCounter => {
  return it.variant === TaskTrackerVariant.Counter;
};

const isCheckbox = (it: TaskTracker): it is TaskTrackerCheckbox => {
  return it.variant === TaskTrackerVariant.Checkbox;
};

const match = <R1, R2, R3>(
  it: TaskTracker,
  onCheckbox: (it: TaskTrackerCheckbox) => R1,
  onCounter: (it: TaskTrackerCounter) => R2,
  onStopwatch: (it: TaskTrackerStopwatch) => R3,
): R1 | R2 | R3 => {
  switch (it.variant) {
    case TaskTrackerVariant.Counter: {
      return onCounter(it);
    }
    case TaskTrackerVariant.Checkbox: {
      return onCheckbox(it);
    }
    case TaskTrackerVariant.Stopwatch: {
      return onStopwatch(it);
    }
  }
};

export const TaskTracker = {
  isComplete,
  getCompletedAt,
  isStopwatch,
  isCounter,
  isCheckbox,
  match,
};