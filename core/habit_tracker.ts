import { HabitTrackerCheckbox, HabitTrackerCounter, HabitTrackerStopwatch } from "../x.ts";

export type HabitTracker = (
  | HabitTrackerCheckbox
  | HabitTrackerCounter
  | HabitTrackerStopwatch
);