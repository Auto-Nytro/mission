import { TaskDue, TaskTracker, DateTime, TaskDueBeforeTime } from "../x.ts";
import { TaskDueTag } from "./task_due.ts";

export const enum TaskStatus {
  Pending,
  Due,
  Complete,
  Overdue,
}

export class Task {
  private due: TaskDue;
  private tracker: TaskTracker;

  private constructor(
    due: TaskDue,
    tracker: TaskTracker,
  ) {
    this.due = due;
    this.tracker = tracker;
  }

  static create(
    due: TaskDue,
    tracker: TaskTracker,
  ) {
    return new Task(due, tracker);
  }

  calculateStatus(now: DateTime) {
    switch (this.due.tag) {
      case TaskDueTag.DueAnyTime: {
        if (this.tracker.isComplete()) {
          return TaskStatus.Complete;
        } 
        return TaskStatus.Due;
      }
      case TaskDueTag.DueBeforeTime: {
        if (now.isEarilerThan(this.due.getTime())) {
          if (this.tracker.isComplete()) {
            return TaskStatus.Complete;
          }
          return TaskStatus.Overdue;
        }
        if ()
      }
      case TaskDueTag.DueAfterTime: {

      }
      case TaskDueTag.DueInTimeRange: {

      }
    }
  }
}
