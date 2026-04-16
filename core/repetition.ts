import { EveryDayAtTimeRepetition, EveryWeekdayAtTimeRepetition } from "../x.ts"

export type Repetition = (
  | EveryDayAtTimeRepetition
  | EveryWeekdayAtTimeRepetition
);