import { DateTime, TaskDue, TaskDueVariant, TaskTracker } from "../x.ts";

export const enum TaskState {
  /** The task isn't to be done yet. */
  Pending,
  /** The task is to be done now. */
  Due,
  /** The task is past its due time and is still not done. */
  Overdue,
  /** The task was done past its due time. */
  OverdueComplete,
  /** The task was done in its due time. */
  Complete,
}

// TODO: Add urgency and importance somewhere
export type Task = {
  due: TaskDue,
  tracker: TaskTracker,
};

const construct = (
  due: TaskDue,
  tracker: TaskTracker,
): Task => {
  return {
    due,
    tracker,
  };
};

const reconstruct = construct;
const create = construct;

const getState = (it: Task, now: DateTime) => {
  switch (it.due.variant) {
    case TaskDueVariant.DueAnyTime: {
      if (TaskTracker.isComplete(it.tracker)) {
        return TaskState.Complete;
      } else {
        return TaskState.Due;
      }
    }
    case TaskDueVariant.DueBeforeTime: {
      const isDue = DateTime.isEarilerThan(it.due.time, now);
      const completedAt = TaskTracker.getCompletedAt(it.tracker);
      const isComplete = completedAt !== null;

      if (!isDue) {
        return TaskState.Pending;
      }

      if (!isComplete) {
        return DateTime.isEarilerThan(now, it.due.time)
          ? TaskState.Due
          : TaskState.Overdue;
      }

      return DateTime.isEarilerThan(completedAt, it.due.time)
        ? TaskState.Complete
        : TaskState.OverdueComplete;
    }
    case TaskDueVariant.DueAfterTime: {
      const isDue = DateTime.isLaterThan(now, it.due.time);
      if (!isDue) {
        return TaskState.Pending;
      }

      const isComplete = TaskTracker.isComplete(it.tracker);
      return isComplete
        ? TaskState.Complete
        : TaskState.Pending;
    }
    case TaskDueVariant.DueInTimeRange: {
      // const 
    }
  }
};


export const Task = {
  reconstruct,
  create,
  // getState,
};