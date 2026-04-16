import { RoutineDescription, RoutineDue, RoutineName, RoutineTracker, Importance, Repetition, Urgency, Nullable } from "../x.ts";

// TODO: Maybe replace Importance and Urgency with Weight
export type Routine = {
  name: RoutineName,
  description: Nullable<RoutineDescription> ,
  due: RoutineDue,
  tracker: RoutineTracker,
  repeater: Repetition,
  urgency: Urgency,
  importance: Importance,
};

export const Routine = {

};