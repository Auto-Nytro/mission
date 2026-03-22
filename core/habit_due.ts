import { Date, Duration, TaskDueAfterTime, TaskDueAnyTime, TaskDueBeforeTime, TaskDueInTimeRange, Time, TimeRange } from "../x.ts";

export type HabitDue = (
  | HabitDueAnyTime
  | HabitDueBeforeTime
  | HabitDueAfterTime
  | HabitDueInTimeRange
);

export class HabitDueAnyTime {
  private constructor() {}

  static create() {
    return new HabitDueAnyTime();
  }

  createTaskDue() {
    return TaskDueAnyTime.create();
  }
}

export class HabitDueBeforeTime {
  private time: Time;

  private constructor(time: Time) {
    this.time = time;
  }

  static create(time: Time) {
    return new HabitDueBeforeTime(time);
  }

  createTaskDue(date: Date) {
    return TaskDueBeforeTime.create(date.withTime(this.time));
  }
}

export class HabitDueAfterTime {
  private time: Time;

  private constructor(time: Time) {
    this.time = time;
  }

  static create(time: Time) {
    return new HabitDueAfterTime(time);
  }

  createTaskDue(date: Date) {
    return TaskDueAfterTime.create(date.withTime(this.time));
  }
}
export class HabitDueAnyTimeDaily {
  static create() {
    return new this;
  }
}

export class HabitDueInTimeRange {
  private timeRange: TimeRange;

  private constructor(timeRange: TimeRange) {
    this.timeRange = timeRange;
  }

  static create(timeRange: TimeRange) {
    return new HabitDueInTimeRange(timeRange);
  }

  createTaskDue(date: Date) {
    const from = date
      .withTime(this.timeRange.getFrom());

    const till = this.timeRange.isIntraday() 
      ? date
        .withTime(this.timeRange.getTill())
      : date
        .plusOrMax(Duration.day())
        .withTime(this.timeRange.getTill());

    return TaskDueInTimeRange.create(from, till);
  }
}