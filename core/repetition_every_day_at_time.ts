import { DateTime, RepetitionVariant, Time } from "../x.ts";

export type EveryDayAtTimeRepetition = {
  readonly variant: RepetitionVariant.EveryDayAtTime,
  time: Time,
  timesPerDay: number,
};

const construct = (time: Time, timesPerDay: number): EveryDayAtTimeRepetition => {
  return {
    variant: RepetitionVariant.EveryDayAtTime,
    time,
    timesPerDay,
  };
};

const reconstruct = construct;
const create = construct;

const synchronizeThenGenerate = (
  previousSynchronizationTime: DateTime, 
  now: DateTime,
) => {
  // TODO
};

export const EveryDayAtTimeRepetition = {
  reconstruct,
  create,
};