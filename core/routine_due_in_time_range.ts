import { Date, DateTime, Duration, RoutineDueVariant, TaskDue, TaskDueInTimeRange, TimeRange } from "../x.ts";

export type RoutineDueInTimeRange = {
  readonly variant: RoutineDueVariant.InTimeRange,
  timeRange: TimeRange,
};

const construct = (timeRange: TimeRange): RoutineDueInTimeRange => {
  return {
    variant: RoutineDueVariant.InTimeRange,
    timeRange,
  };
};

const reconstruct = construct;

const create = construct;

const createTaskDue = (it: RoutineDueInTimeRange, date: Date): TaskDue => {
  const from = Date.withTime(
    date,
    TimeRange.getFrom(it.timeRange),
  );

  const till = TimeRange.isIntraday(it.timeRange) 
    ? Date.withTime(date, TimeRange.getTill(it.timeRange))
    : DateTime.saturatingAdd(
        Date.withTime(
          date, 
          TimeRange.getTill(it.timeRange)
        ), 
        Duration.DAY,
      );

  return TaskDueInTimeRange.create(from, till);
};

export const RoutineDueInTimeRange = {
  reconstruct,
  construct,
  create,
  createTaskDue,
};