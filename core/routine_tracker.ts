import { RoutineTrackerCheckbox, RoutineTrackerCounter, RoutineTrackerStopwatch } from "../x.ts";

export type RoutineTracker = (
  | RoutineTrackerCheckbox
  | RoutineTrackerCounter
  | RoutineTrackerStopwatch
);