import { DateTime, Difficulty, Span } from "../x.ts";

export class TaskTrackerCheckbox {
  private span: Span;
  private difficulty: Difficulty;
  private completionTime: DateTime | null;

  private constructor(
    span: Span,
    difficulty: Difficulty,
    completionTime: DateTime | null,
  ) {
    this.span = span;
    this.difficulty = difficulty;
    this.completionTime = completionTime;
  }

  static create(
    span: Span,
    difficulty: Difficulty,
  ): TaskTrackerCheckbox {
    return new TaskTrackerCheckbox(
      span,
      difficulty,
      null,
    );
  }

  static construct(
    span: Span,
    difficulty: Difficulty,
    completionTime: DateTime | null,
  ) {
    return new TaskTrackerCheckbox(
      span,
      difficulty,
      completionTime,
    );
  }

  isComplete() {
    return this.completionTime !== null;
  }
  
  do(time: DateTime) {
    if (this.completionTime === null) {
      this.completionTime = time;
    }
  }

  undo() {
    this.completionTime = null;
  }
}
