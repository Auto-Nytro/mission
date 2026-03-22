import { DateTime, TaskStatus } from "../x.ts";

export const enum TaskDueTag {
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

export class TaskDueAnyTime {
  private constructor() {}

  static create() {
    return new TaskDueAnyTime();
  }

  get tag() {
    return TaskDueTag.DueAnyTime as const;
  }

  calculateTaskStatus() {
    return TaskStatus.Due;
  }
}

export class TaskDueBeforeTime {
  private time: DateTime;

  private constructor(time: DateTime) {
    this.time = time;
  }

  static create(time: DateTime) {
    return new TaskDueBeforeTime(time);
  }

  get tag() {
    return TaskDueTag.DueBeforeTime as const;
  }

  getTime() {
    return this.time;
  }

  calculateTaskStatus(now: DateTime) {
    if (now.isEarilerThan(this.time)) {
      return TaskStatus.Due;
    }
    return TaskStatus.Pending;
  }
}

export class TaskDueAfterTime {
  private time: DateTime;

  private constructor(time: DateTime) {
    this.time = time;
  }

  static create(time: DateTime) {
    return new TaskDueAfterTime(time);
  }

  get tag() {
    return TaskDueTag.DueAfterTime as const;
  }

  getTime() {
    return this.time;
  }

  calculateTaskStatus(now: DateTime) {
    if (now.isLaterThan(now)) {
      return TaskStatus.Due;
    }
    return TaskStatus.Pending;
  }
}

export class TaskDueInTimeRange {
  private from: DateTime;
  private till: DateTime;

  private constructor(
    from: DateTime,
    till: DateTime,
  ) {
    this.from = from;
    this.till = till;
  }

  static create(
    from: DateTime,
    till: DateTime,
  ): TaskDueInTimeRange {
    return TaskDueInTimeRange.create(from, till);
  }

  get tag() {
    return TaskDueTag.DueInTimeRange as const;
  }
  
  getFrom() {
    return this.from;
  }
  
  getTill() {
    return this.till;
  }

  calculateTaskStatus(now: DateTime) {
    if (now.isEarilerThan(this.from)) {
      return TaskStatus.Pending;
    }
    if (now.isLaterThan(this.till)) {
      return null;
    }
  }
}