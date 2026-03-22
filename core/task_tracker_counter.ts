import { DateTime, Difficulty, Span } from "../x.ts";

export class CompletionTimeInvariantViolation {
  static create() {
    return new CompletionTimeInvariantViolation();
  }
}

export class TaskTrackerCounter {
  private span: Span;
  private difficulty: Difficulty;
  private workload: number;
  private workdone: number;
  private completionTime: DateTime | null;

  private constructor(
    span: Span,
    difficulty: Difficulty,
    workload: number,
    workdone: number,
    completionTime: DateTime | null,
  ) {
    this.span = span;
    this.difficulty = difficulty;
    this.workload = workload;
    this.workdone = workdone;
    this.completionTime = completionTime;
  }

  static create(
    span: Span,
    difficulty: Difficulty,
    workload: number,
  ) {
    return new TaskTrackerCounter(
      span, 
      difficulty,
      workload,
      0,
      null,
    );
  }

  static construct(
    span: Span,
    difficulty: Difficulty,
    workload: number,
    workdone: number,
    completionTime: DateTime | null,
  ) {
    if (
      workdone === workload
      &&
      completionTime === null
    ) {
      return CompletionTimeInvariantViolation.create();
    }

    return new TaskTrackerCounter(
      span,
      difficulty,
      workload,
      workdone,
      completionTime,
    );
  }

  do(time: DateTime) {
    if (this.workload >= this.workdone) {
      return;
    }
    
    this.workload += 1;

    if (this.workload >= this.workdone) {
      this.completionTime = time;
    }
  }

  undo() {
    if (this.workdone > 0) {
      this.workdone -= 1;
      this.completionTime = null;
    }
  }

  isComplete() {
    return this.completionTime !== null;
  }
}