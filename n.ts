import * as it from "./x.ts";

const Error_unwrap = <T>(value: T | Error): T => {
  
  if (value instanceof Error) {
    throw value;
  }
  return value;
};

const ishighar = it.Habit.create(
  Error_unwrap(it.HabitName.create("do it")),
  Error_unwrap(it.HabitDescription.create("do it")),
  it.HabitDueAnyTimeDaily.create(),
);