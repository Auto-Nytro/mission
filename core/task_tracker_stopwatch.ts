import { DateTime, Duration } from "../x.ts";

export class TaskTrackerStopwatchInvariantVioation {
  static create() {
    return new TaskTrackerStopwatchInvariantVioation();
  }
}

export class TaskTrackerStopwatchStartErrorWrongStatus {
  private status: TaskTrackerStopwatchStatusType;

  private constructor(status: TaskTrackerStopwatchStatusType) {
    this.status = status;
  }

  static create(status: TaskTrackerStopwatchStatusType) {
    return new TaskTrackerStopwatchStartErrorWrongStatus(status);
  }
}

export class TaskTrackerStopwatchPauseErrorWrongStatus {
  private status: TaskTrackerStopwatchStatusType;

  private constructor(status: TaskTrackerStopwatchStatusType) {
    this.status = status;
  }

  static create(status: TaskTrackerStopwatchStatusType) {
    return new TaskTrackerStopwatchPauseErrorWrongStatus(status);
  }
}

export class TaskTrackerStopwatchResumeErrorWrongStatus {
  private status: TaskTrackerStopwatchStatusType;

  private constructor(status: TaskTrackerStopwatchStatusType) {
    this.status = status;
  }

  static create(status: TaskTrackerStopwatchStatusType) {
    return new TaskTrackerStopwatchResumeErrorWrongStatus(status);
  }
}

const enum TaskTrackerStopwatchStatusType {
  Ready,
  Running,
  Paused,
  Completed,
}

type TaskTrackerStopwatchStatus = {
  readonly type: TaskTrackerStopwatchStatusType.Ready,
} | {
  readonly type: TaskTrackerStopwatchStatusType.Running,
  readonly at: DateTime,
} | {
  readonly type: TaskTrackerStopwatchStatusType.Paused,
  readonly at: DateTime,
} | {
  readonly type: TaskTrackerStopwatchStatusType.Completed,
  readonly at: DateTime,
};

export class TaskTrackerStopwatch {
  private workload: Duration;
  private workdone: Duration;
  private status: TaskTrackerStopwatchStatus;

  private constructor(
    workload: Duration,
    workdone: Duration,
    status: TaskTrackerStopwatchStatus,
  ) {
    this.workload = workload;
    this.workdone = workdone;
    this.status = status;
  }

  static create(workload: Duration) {
    return new TaskTrackerStopwatch(
      workload, 
      Duration.zero(), 
      {
        type: TaskTrackerStopwatchStatusType.Ready,
      },
    );
  }

  static construct(
    workload: Duration,
    workdone: Duration,
    status: TaskTrackerStopwatchStatus,
  ) {
    if (workdone.isGreaterThan(workload)) {
      return TaskTrackerStopwatchInvariantVioation.create();
    }
    if (workdone.isEqualTo(workload) && status.type !== TaskTrackerStopwatchStatusType.Completed) {
      return TaskTrackerStopwatchInvariantVioation.create();
    }
    if (!workdone.isZero() && status.type !== TaskTrackerStopwatchStatusType.Ready) {
      return TaskTrackerStopwatchInvariantVioation.create();
    }
    return new TaskTrackerStopwatch(
      workload,
      workdone,
      status,
    );
  }

  start(time: DateTime) {
    if (this.status.type !== TaskTrackerStopwatchStatusType.Ready) {
      return TaskTrackerStopwatchStartErrorWrongStatus.create(this.status.type);
    }

    this.status = {
      type: TaskTrackerStopwatchStatusType.Running,
      at: time,
    };
  }
 
  pause(time: DateTime) {
    if (this.status.type !== TaskTrackerStopwatchStatusType.Running) {
      return TaskTrackerStopwatchPauseErrorWrongStatus.create(this.status.type);
    }

    this.status = {
      type: TaskTrackerStopwatchStatusType.Paused,
      at: time,
    };
  }
 
  resume(time: DateTime) {
    if (this.status.type !== TaskTrackerStopwatchStatusType.Paused) {
      return TaskTrackerStopwatchResumeErrorWrongStatus.create(this.status.type);
    }

    this.status = {
      type: TaskTrackerStopwatchStatusType.Running,
      at: time,
    };
  }

  isComplete(): boolean {
    throw "";
  }
}
