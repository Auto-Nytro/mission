import { Nullable, TaskDue, TaskTracker, Task, TaskTrackerStopwatch, DateTime, TaskTrackerCounter, TaskTrackerCheckbox, Tried, TaskTrackerCounterChanges, Duration } from "../x.ts"

export type TaskId = null
export const TaskId = null

export type DatabaseCreateTaskError = unknown;
export type DatabaseDeleteTaskError = unknown;
export type DatabaseGetTaskError = unknown;
export type DatabaseUpdateTaskError = unknown;

export interface IsLogger<Logger> {
  logError(it: Logger, value: unknown): void;
}

export interface IsDatabase<Database> {
  createTask(
    it: Database,
    task: Task,
  ): Promise<Tried<TaskId, DatabaseCreateTaskError>>;
  
  deleteTask(
    it: Database,
    taskId: TaskId,
  ): Promise<Tried<void, DatabaseDeleteTaskError>>;

  getTaskById(
    it: Database,
    taskId: TaskId,
  ): Promise<Tried<Nullable<Task>, DatabaseGetTaskError>>;

  taskTrackerStopwatchStart(
    it: Database,
    taskId: TaskId,
    startedAt: DateTime,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;

  taskTrackerStopwatchPause(
    it: Database,
    taskId: TaskId,
    workdone: Duration,
    pausedAt: DateTime,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;

  taskTrackerStopwatchResume(
    it: Database,
    taskId: TaskId,
    resumedAt: DateTime,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;

  taskTrackerCounterDo(
    it: Database,
    taskId: TaskId,
    changes: TaskTrackerCounterChanges,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;
  
  taskTrackerCounterUndo(
    it: Database,
    taskId: TaskId,
    changes: TaskTrackerCounterChanges,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;
  
  taskTrackerCheckboxDo(
    it: Database,
    taskId: TaskId,
    completedAt: DateTime,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;
  
  taskTrackerCheckboxUndo(
    it: Database,
    taskId: TaskId,
  ): Promise<Tried<void, DatabaseUpdateTaskError>>;
  
}

// Create Task
export const enum CreateTaskReturnVariant {
  Success,
  InternalError,
}

export type CreateTaskReturn = {
  readonly variant: CreateTaskReturnVariant.InternalError,
} | {
  readonly variant: CreateTaskReturnVariant.Success,
  readonly taskId: TaskId,
  readonly task: Task,
};

export const CreateTaskReturn = {
  Success: (taskId: TaskId, task: Task): CreateTaskReturn => {
    return {
      task,
      taskId,
      variant: CreateTaskReturnVariant.Success,
    };
  },
  InternalError: (): CreateTaskReturn => {
    return {
      variant: CreateTaskReturnVariant.InternalError,
    };
  },
};

export const createTask = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskDue: TaskDue,
  taskTracker: TaskTracker,
): Promise<CreateTaskReturn> => {
  const task = Task.create(taskDue, taskTracker);
  
  const taskId = await databaseImpl.createTask(database, task);
  if (Tried.isFailure(taskId)) {
    loggerImpl.logError(logger, Tried.error(taskId));
    return CreateTaskReturn.InternalError();
  }
  
  return CreateTaskReturn.Success(
    Tried.value(taskId), 
    task,
  );
};

// Delete Task
export const enum DeleteTaskReturnVariant {
  Success,
  NoSuchTask,
  InternalError,
}

export type DeleteTaskReturn = {
  readonly variant: DeleteTaskReturnVariant.Success;
} | {
  readonly variant: DeleteTaskReturnVariant.NoSuchTask;
} | {
  readonly variant: DeleteTaskReturnVariant.InternalError;
  readonly error: unknown;
};

export const DeleteTaskReturn = {
  Success: (): DeleteTaskReturn => ({
    variant: DeleteTaskReturnVariant.Success,
  }),
  NoSuchTask: (): DeleteTaskReturn => ({
    variant: DeleteTaskReturnVariant.NoSuchTask,
  }),
  InternalError: (error: unknown): DeleteTaskReturn => ({
    variant: DeleteTaskReturnVariant.InternalError,
    error,
  }),
};

export const deleteTask = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<DeleteTaskReturn> => {
  const result = await databaseImpl.deleteTask(database, taskId);
  if (Tried.isFailure(result)) {
    loggerImpl.logError(logger, Tried.error(result));
    return DeleteTaskReturn.InternalError(Tried.error(result));
  }
  
  return DeleteTaskReturn.Success();
};

// Task Tracker Stopwatch Start
export const enum TaskTrackerStopwatchStartReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  WrongStatus,
  InternalError,
}

export type TaskTrackerStopwatchStartReturn = {
  readonly variant: TaskTrackerStopwatchStartReturnVariant.Success;
} | {
  readonly variant: TaskTrackerStopwatchStartReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerStopwatchStartReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerStopwatchStartReturnVariant.WrongStatus;
} | {
  readonly variant: TaskTrackerStopwatchStartReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerStopwatchStartReturn = {
  Success: (): TaskTrackerStopwatchStartReturn => ({
    variant: TaskTrackerStopwatchStartReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerStopwatchStartReturn => ({
    variant: TaskTrackerStopwatchStartReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerStopwatchStartReturn => ({
    variant: TaskTrackerStopwatchStartReturnVariant.WrongTrackerVariant,
  }),
  WrongStatus: (): TaskTrackerStopwatchStartReturn => ({
    variant: TaskTrackerStopwatchStartReturnVariant.WrongStatus,
  }),
  InternalError: (error: unknown): TaskTrackerStopwatchStartReturn => ({
    variant: TaskTrackerStopwatchStartReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerStopwatchStart = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerStopwatchStartReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerStopwatchStartReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerStopwatchStartReturn.NoSuchTask();
  }
  if (!TaskTracker.isStopwatch(task.tracker)) {
    return TaskTrackerStopwatchStartReturn.WrongTrackerVariant();
  }
  if (!TaskTrackerStopwatch.isReady(task.tracker)) {
    return TaskTrackerStopwatchStartReturn.WrongStatus();
  }

  const now = DateTime.now();
  TaskTrackerStopwatch.startOrNoop(task.tracker, now);

  const updateResult = await databaseImpl.taskTrackerStopwatchStart(database, taskId, now);
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerStopwatchStartReturn.InternalError(Tried.error(updateResult));
  }

  return TaskTrackerStopwatchStartReturn.Success();
};

// Task Tracker Stopwatch Pause
export const enum TaskTrackerStopwatchPauseReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  WrongStatus,
  InternalError,
}

export type TaskTrackerStopwatchPauseReturn = {
  readonly variant: TaskTrackerStopwatchPauseReturnVariant.Success;
} | {
  readonly variant: TaskTrackerStopwatchPauseReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerStopwatchPauseReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerStopwatchPauseReturnVariant.WrongStatus;
} | {
  readonly variant: TaskTrackerStopwatchPauseReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerStopwatchPauseReturn = {
  Success: (): TaskTrackerStopwatchPauseReturn => ({
    variant: TaskTrackerStopwatchPauseReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerStopwatchPauseReturn => ({
    variant: TaskTrackerStopwatchPauseReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerStopwatchPauseReturn => ({
    variant: TaskTrackerStopwatchPauseReturnVariant.WrongTrackerVariant,
  }),
  WrongStatus: (): TaskTrackerStopwatchPauseReturn => ({
    variant: TaskTrackerStopwatchPauseReturnVariant.WrongStatus,
  }),
  InternalError: (error: unknown): TaskTrackerStopwatchPauseReturn => ({
    variant: TaskTrackerStopwatchPauseReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerStopwatchPause = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerStopwatchPauseReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerStopwatchPauseReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerStopwatchPauseReturn.NoSuchTask();
  }
  if (!TaskTracker.isStopwatch(task.tracker)) {
    return TaskTrackerStopwatchPauseReturn.WrongTrackerVariant();
  }
  if (!TaskTrackerStopwatch.isRunning(task.tracker)) {
    return TaskTrackerStopwatchPauseReturn.WrongStatus();
  }
  
  const now = DateTime.now();
  TaskTrackerStopwatch.pauseOrNoop(task.tracker, now);

  const updateResult = await databaseImpl.taskTrackerStopwatchPause(
    database, 
    taskId, 
    task.tracker.workdone,
    now,
  );
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerStopwatchPauseReturn.InternalError(Tried.error(updateResult));
  }
  
  return TaskTrackerStopwatchPauseReturn.Success();
};

// Task Tracker Stopwatch Resume
export const enum TaskTrackerStopwatchResumeReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  WrongStatus,
  InternalError,
}

export type TaskTrackerStopwatchResumeReturn = {
  readonly variant: TaskTrackerStopwatchResumeReturnVariant.Success;
} | {
  readonly variant: TaskTrackerStopwatchResumeReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerStopwatchResumeReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerStopwatchResumeReturnVariant.WrongStatus;
} | {
  readonly variant: TaskTrackerStopwatchResumeReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerStopwatchResumeReturn = {
  Success: (): TaskTrackerStopwatchResumeReturn => ({
    variant: TaskTrackerStopwatchResumeReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerStopwatchResumeReturn => ({
    variant: TaskTrackerStopwatchResumeReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerStopwatchResumeReturn => ({
    variant: TaskTrackerStopwatchResumeReturnVariant.WrongTrackerVariant,
  }),
  WrongStatus: (): TaskTrackerStopwatchResumeReturn => ({
    variant: TaskTrackerStopwatchResumeReturnVariant.WrongStatus,
  }),
  InternalError: (error: unknown): TaskTrackerStopwatchResumeReturn => ({
    variant: TaskTrackerStopwatchResumeReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerStopwatchResume = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerStopwatchResumeReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerStopwatchResumeReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerStopwatchResumeReturn.NoSuchTask();
  }
  if (!TaskTracker.isStopwatch(task.tracker)) {
    return TaskTrackerStopwatchResumeReturn.WrongTrackerVariant();
  }
  if (!TaskTrackerStopwatch.isPaused(task.tracker)) {
    return TaskTrackerStopwatchResumeReturn.WrongStatus();
  }

  const now = DateTime.now();
  TaskTrackerStopwatch.resumeOrNoop(task.tracker, now);
  
  const updateResult = await databaseImpl.taskTrackerStopwatchResume(database, taskId, now);
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerStopwatchResumeReturn.InternalError(Tried.error(updateResult));
  }

  return TaskTrackerStopwatchResumeReturn.Success();
};

// Task Tracker Counter Do
export const enum TaskTrackerCounterDoReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  WrongStatus,
  InternalError,
}

export type TaskTrackerCounterDoReturn = {
  readonly variant: TaskTrackerCounterDoReturnVariant.Success;
} | {
  readonly variant: TaskTrackerCounterDoReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerCounterDoReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerCounterDoReturnVariant.WrongStatus;
} | {
  readonly variant: TaskTrackerCounterDoReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerCounterDoReturn = {
  Success: (): TaskTrackerCounterDoReturn => ({
    variant: TaskTrackerCounterDoReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerCounterDoReturn => ({
    variant: TaskTrackerCounterDoReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerCounterDoReturn => ({
    variant: TaskTrackerCounterDoReturnVariant.WrongTrackerVariant,
  }),
  WrongStatus: (): TaskTrackerCounterDoReturn => ({
    variant: TaskTrackerCounterDoReturnVariant.WrongStatus,
  }),
  InternalError: (error: unknown): TaskTrackerCounterDoReturn => ({
    variant: TaskTrackerCounterDoReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerCounterDo = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerCounterDoReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerCounterDoReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerCounterDoReturn.NoSuchTask();
  }
  
  if (!TaskTracker.isCounter(task.tracker)) {
    return TaskTrackerCounterDoReturn.WrongTrackerVariant();
  }

  const now = DateTime.now();
  const changes = TaskTrackerCounterChanges.create();
  TaskTrackerCounter.incrementOrNoopWithChanges(task.tracker, now, changes);

  const updateResult = await databaseImpl.taskTrackerCounterDo(database, taskId, changes);
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerCounterDoReturn.InternalError(Tried.error(updateResult));
  }

  return TaskTrackerCounterDoReturn.Success();
};

// Task Tracker Counter Undo
export const enum TaskTrackerCounterUndoReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  WrongStatus,
  AlreadyAtMinimumValue,
  InternalError,
}

export type TaskTrackerCounterUndoReturn = {
  readonly variant: TaskTrackerCounterUndoReturnVariant.Success;
} | {
  readonly variant: TaskTrackerCounterUndoReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerCounterUndoReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerCounterUndoReturnVariant.WrongStatus;
} | {
  readonly variant: TaskTrackerCounterUndoReturnVariant.AlreadyAtMinimumValue;
} | {
  readonly variant: TaskTrackerCounterUndoReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerCounterUndoReturn = {
  Success: (): TaskTrackerCounterUndoReturn => ({
    variant: TaskTrackerCounterUndoReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerCounterUndoReturn => ({
    variant: TaskTrackerCounterUndoReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerCounterUndoReturn => ({
    variant: TaskTrackerCounterUndoReturnVariant.WrongTrackerVariant,
  }),
  WrongStatus: (): TaskTrackerCounterUndoReturn => ({
    variant: TaskTrackerCounterUndoReturnVariant.WrongStatus,
  }),
  AlreadyAtMinimumValue: (): TaskTrackerCounterUndoReturn => ({
    variant: TaskTrackerCounterUndoReturnVariant.AlreadyAtMinimumValue,
  }),
  InternalError: (error: unknown): TaskTrackerCounterUndoReturn => ({
    variant: TaskTrackerCounterUndoReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerCounterUndo = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerCounterUndoReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerCounterUndoReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerCounterUndoReturn.NoSuchTask();
  }
  
  if (!TaskTracker.isCounter(task.tracker)) {
    return TaskTrackerCounterUndoReturn.WrongTrackerVariant();
  }
  
  if (!TaskTrackerCounter.canUndo(task.tracker)) {
    return TaskTrackerCounterUndoReturn.AlreadyAtMinimumValue();
  }

  const changes = TaskTrackerCounterChanges.create();
  TaskTrackerCounter.decrementOrNoopWithChanges(task.tracker, changes);

  const updateResult = await databaseImpl.taskTrackerCounterUndo(database, taskId, changes);
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerCounterUndoReturn.InternalError(Tried.error(updateResult));
  }

  return TaskTrackerCounterUndoReturn.Success();
};

// Task Tracker Checkbox Do
export const enum TaskTrackerCheckboxDoReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  AlreadyDone,
  InternalError,
}

export type TaskTrackerCheckboxDoReturn = {
  readonly variant: TaskTrackerCheckboxDoReturnVariant.Success;
} | {
  readonly variant: TaskTrackerCheckboxDoReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerCheckboxDoReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerCheckboxDoReturnVariant.AlreadyDone;
} | {
  readonly variant: TaskTrackerCheckboxDoReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerCheckboxDoReturn = {
  Success: (): TaskTrackerCheckboxDoReturn => ({
    variant: TaskTrackerCheckboxDoReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerCheckboxDoReturn => ({
    variant: TaskTrackerCheckboxDoReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerCheckboxDoReturn => ({
    variant: TaskTrackerCheckboxDoReturnVariant.WrongTrackerVariant,
  }),
  AlreadyDone: (): TaskTrackerCheckboxDoReturn => ({
    variant: TaskTrackerCheckboxDoReturnVariant.AlreadyDone,
  }),
  InternalError: (error: unknown): TaskTrackerCheckboxDoReturn => ({
    variant: TaskTrackerCheckboxDoReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerCheckboxDo = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerCheckboxDoReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerCheckboxDoReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerCheckboxDoReturn.NoSuchTask();
  }
  
  if (!TaskTracker.isCheckbox(task.tracker)) {
    return TaskTrackerCheckboxDoReturn.WrongTrackerVariant();
  }
  
  if (TaskTrackerCheckbox.isComplete(task.tracker)) {
    return TaskTrackerCheckboxDoReturn.AlreadyDone();
  }

  const now = DateTime.now();
  TaskTrackerCheckbox.doOrNoop(task.tracker, now);

  const updateResult = await databaseImpl.taskTrackerCheckboxDo(database, taskId, now);
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerCheckboxDoReturn.InternalError(Tried.error(updateResult));
  }

  return TaskTrackerCheckboxDoReturn.Success();
};

// Task Tracker Checkbox Undo
export const enum TaskTrackerCheckboxUndoReturnVariant {
  Success,
  NoSuchTask,
  WrongTrackerVariant,
  AlreadyUndone,
  InternalError,
}

export type TaskTrackerCheckboxUndoReturn = {
  readonly variant: TaskTrackerCheckboxUndoReturnVariant.Success;
} | {
  readonly variant: TaskTrackerCheckboxUndoReturnVariant.NoSuchTask;
} | {
  readonly variant: TaskTrackerCheckboxUndoReturnVariant.WrongTrackerVariant;
} | {
  readonly variant: TaskTrackerCheckboxUndoReturnVariant.AlreadyUndone;
} | {
  readonly variant: TaskTrackerCheckboxUndoReturnVariant.InternalError;
  readonly error: unknown;
};

export const TaskTrackerCheckboxUndoReturn = {
  Success: (): TaskTrackerCheckboxUndoReturn => ({
    variant: TaskTrackerCheckboxUndoReturnVariant.Success,
  }),
  NoSuchTask: (): TaskTrackerCheckboxUndoReturn => ({
    variant: TaskTrackerCheckboxUndoReturnVariant.NoSuchTask,
  }),
  WrongTrackerVariant: (): TaskTrackerCheckboxUndoReturn => ({
    variant: TaskTrackerCheckboxUndoReturnVariant.WrongTrackerVariant,
  }),
  AlreadyUndone: (): TaskTrackerCheckboxUndoReturn => ({
    variant: TaskTrackerCheckboxUndoReturnVariant.AlreadyUndone,
  }),
  InternalError: (error: unknown): TaskTrackerCheckboxUndoReturn => ({
    variant: TaskTrackerCheckboxUndoReturnVariant.InternalError,
    error,
  }),
};

export const taskTrackerCheckboxUndo = async <Logger, Database>(
  logger: Logger,
  loggerImpl: IsLogger<Logger>,
  database: Database,
  databaseImpl: IsDatabase<Database>,
  taskId: TaskId,
): Promise<TaskTrackerCheckboxUndoReturn> => {
  const taskResult = await databaseImpl.getTaskById(database, taskId);
  if (Tried.isFailure(taskResult)) {
    loggerImpl.logError(logger, Tried.error(taskResult));
    return TaskTrackerCheckboxUndoReturn.InternalError(Tried.error(taskResult));
  }
  
  const task = Tried.value(taskResult);
  if (task === null) {
    return TaskTrackerCheckboxUndoReturn.NoSuchTask();
  }
  
  if (!TaskTracker.isCheckbox(task.tracker)) {
    return TaskTrackerCheckboxUndoReturn.WrongTrackerVariant();
  }
  
  if (!TaskTrackerCheckbox.isComplete(task.tracker)) {
    return TaskTrackerCheckboxUndoReturn.AlreadyUndone();
  }

  TaskTrackerCheckbox.undoOrNoop(task.tracker);

  const updateResult = await databaseImpl.taskTrackerCheckboxUndo(database, taskId);
  if (Tried.isFailure(updateResult)) {
    loggerImpl.logError(logger, Tried.error(updateResult));
    return TaskTrackerCheckboxUndoReturn.InternalError(Tried.error(updateResult));
  }

  return TaskTrackerCheckboxUndoReturn.Success();
};