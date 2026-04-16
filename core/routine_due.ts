import { RoutineDueAnyTime, RoutineDueBeforeTime, RoutineDueAfterTime, RoutineDueInTimeRange } from "../x.ts";

export type RoutineDue = (
  | RoutineDueAnyTime
  | RoutineDueBeforeTime
  | RoutineDueAfterTime
  | RoutineDueInTimeRange
);
