import * as it from "./x.ts";

const Error_unwrap = <T>(value: T | Error): T => {
  
  if (value instanceof Error) {
    throw value;
  }
  return value;
};

const ishighar = it.Routine.create(
  Error_unwrap(it.RoutineName.create("do it")),
  Error_unwrap(it.RoutineDescription.create("do it")),
  it.RoutineDueAnyTimeDaily.create(),
);