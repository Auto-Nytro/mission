import { DateTime, Duration, Nullable, Time } from "../x.ts";


export const enum WorkVariant {
  Counter,
  Checkbox,
  Stopwatch,
}

export type CounterWork = {
  name: string,
  description: Nullable<string>,
  dailyTotal: number,
  weeklyTotal: number,
  monthlyTotal: number,
  yearlyTotal: number,
  allTimeTotal: number,
};

export type CheckboxWork = {
  name: string,
  description: Nullable<string>, 
  dailyTotal: number,
  weeklyTotal: number,
  monthlyTotal: number,
  yearlyTotal: number,
  allTimeTotal: number,
};

export type StopwatchWork = {
  name: string,
  description: Nullable<string>;
  dailyTotal: Duration,
  weeklyTotal: Duration,
  monthlyTotal: Duration,
  yearlyTotal: Duration,
  allTimeTotal: Duration,
};

// DescriptionAndStats