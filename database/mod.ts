import { Nullable, TaskDue, TaskTracker, Task, TaskTrackerStopwatch, DateTime, TaskTrackerCounter, TaskTrackerCheckbox, Tried, TaskTrackerCounterChanges, Duration } from "../x.ts"

export type TaskId = null
export const TaskId = null

export type DatabaseCreateTaskError = unknown;
export type DatabaseDeleteTaskError = unknown;
export type DatabaseGetTaskError = unknown;
export type DatabaseUpdateTaskError = unknown;

export interface DatabaseDriver<Database> {
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


