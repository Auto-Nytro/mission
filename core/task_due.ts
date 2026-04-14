import { DateTime, TaskStatus } from "../x.ts";

export const enum TaskDueVariant {
  DueAnyTime,
  DueBeforeTime,
  DueAfterTime,
  DueInTimeRange,
}

export type TaskDue = (
  | TaskDueAnyTime
  | TaskDueBeforeTime
  | TaskDueAfterTime
  | TaskDueInTimeRange
);

export type TaskDueAnyTime = {
  readonly variant: TaskDueVariant.DueAnyTime,
};

export const TaskDueAnyTime = {
  create: (): TaskDueAnyTime => {
    return {
      variant: TaskDueVariant.DueAnyTime,
    };
  },

  calculateTaskStatus: (it: TaskDueAnyTime) => {
    return TaskStatus.Due;
  },
};

export type TaskDueBeforeTime = {
  readonly variant: TaskDueVariant.DueBeforeTime,
  readonly time: DateTime,
};

export const TaskDueBeforeTime = {
  create: (time: DateTime): TaskDueBeforeTime => {
    return {
      time,
      variant: TaskDueVariant.DueBeforeTime,
    };
  },

  getTime: (it: TaskDueBeforeTime): DateTime => {
    return it.time;
  },

  calculateTaskStatus: (it: TaskDueBeforeTime, now: DateTime) => {
    if (DateTime.isEarilerThan(now, it.time)) {
      return TaskStatus.Due;
    }
    return TaskStatus.Pending;
  },
}

export type TaskDueAfterTime = {
  readonly variant: TaskDueVariant.DueAfterTime,
  readonly time: DateTime,
};

export const TaskDueAfterTime = {
  create: (time: DateTime): TaskDueAfterTime => {
    return {
      variant: TaskDueVariant.DueAfterTime,
      time,
    };
  },
  
  getTime: (it: TaskDueAfterTime): DateTime => {
    return it.time;
  },

  calculateTaskStatus: (it: TaskDueAfterTime, now: DateTime) => {
    if (DateTime.isLaterThan(it.time, now)) {
      return TaskStatus.Due;
    }
    return TaskStatus.Pending;
  }
}

export type TaskDueInTimeRange = {
  readonly variant: TaskDueVariant.DueInTimeRange,
  from: DateTime,
  till: DateTime,
};

export const TaskDueInTimeRange = {
  construct: (from: DateTime, till: DateTime): TaskDueInTimeRange => {
    return {
      variant: TaskDueVariant.DueInTimeRange,
      from,
      till,
    };
  },

  create: (from: DateTime, till: DateTime): TaskDueInTimeRange => {
    return {
      variant: TaskDueVariant.DueInTimeRange,
      from,
      till,
    };
  },
  
  getFrom: (it: TaskDueInTimeRange): DateTime => {
    return it.from;
  },
  
  getTill: (it: TaskDueInTimeRange): DateTime => {
    return it.till;
  },

  calculateTaskStatus: (it: TaskDueInTimeRange, now: DateTime) => {
    if (DateTime.isEarilerThan(now, it.from)) {
      return TaskStatus.Pending;
    }
    if (DateTime.isLaterThan(now, it.till)) {
      return null;
    }
  },
};