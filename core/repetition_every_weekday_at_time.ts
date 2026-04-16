import { RepetitionVariant, Time, Weekday } from "../x.ts";

export type EveryWeekdayAtTimeRepetition = {
  readonly variant: RepetitionVariant.EveryWeekdayAtTime,
  time: Time,
  weekday: Weekday,
  times: number,
};

const construct = (
  time: Time,
  weekday: Weekday,
  times: number,
): EveryWeekdayAtTimeRepetition => {
  return {
    variant: RepetitionVariant.EveryWeekdayAtTime,
    time,
    weekday,
    times,
  };
};

const reconstruct = construct;
const create = construct;

export const EveryWeekdayAtTimeRepetition = {
  reconstruct,
  create,
};