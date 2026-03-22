import { TaskTrackerCheckbox, TaskTrackerCounter, TaskTrackerStopwatch } from "../x.ts";

export type TaskTracker = (
  | TaskTrackerCheckbox
  | TaskTrackerCounter
  | TaskTrackerStopwatch
);