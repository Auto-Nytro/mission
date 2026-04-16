import { Countdown, Date, DateTime, Duration, Instant, Integer, TaskDue, TaskDueAfterTime, TaskDueBeforeTime, TaskDueInTimeRange, TaskDueVariant, TaskDueVariantM, TaskTracker, TaskTrackerCheckbox, TaskTrackerCounter, TaskTrackerStopwatchStatusVariant, TaskTrackerVariant, TaskTrackerVariantM, Time, TimeRange, Tried, Weekday, TaskTrackerStopwatchStatusVariantM, TaskTrackerStopwatchStatus, TaskTrackerStopwatch } from "../../x.ts";
import { Name, NamedWrite, OrderedWrite, ScalarAdapter, ScalarRead, ScalarWrite } from "../utlities/mod.ts";
import { DurationDescriptor } from "./serde/datetime.ts";

export const DurationAdapter = ScalarAdapter.implement<Duration>({
  name: "Duration",

  write: (value, destination, destinationImpl) => {
    destinationImpl.writeInteger(destination, Duration.toTotalMilliseconds(value) as any as Integer);
  },

  readOrThrow: (source, sourceImpl) => {
    return Duration.fromMillisecondsOrThrow(sourceImpl.readIntegerOrThrow(source));
  },
});

export const InstantAdapter = ScalarAdapter.implement<Instant>({
  name: "Instant",

  write(value, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, Instant.toElapsedTime(value), DurationAdapter);
  },

  readOrThrow(source, sourceImpl) {
    return Instant.fromElapsedTime(sourceImpl.readOrThrow(source, DurationAdapter));
  },
});

export const TimeAdapter = ScalarAdapter.implement<Time>({
  name: "Time",

  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(destination, Time.getTimestamp(value) as any as Integer);
  },

  readOrThrow(source, sourceImpl) {
    return Tried.experimental_unwrap(Time.fromTimestamp(sourceImpl.readIntegerOrThrow(source)));
  },
});

export const WeekdayAdapter = ScalarAdapter.implement<Weekday>({
  name: "Weekday",

  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(destination, Weekday.toNumber(value) as any as Integer);
  },

  readOrThrow(source, sourceImpl) {
    return Weekday.fromNumberOrThrow(sourceImpl.readIntegerOrThrow(source));
  },
});

export const DateTimeAdapter = ScalarAdapter.implement<DateTime>({
  name: "DateTime",

  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(destination, DateTime.toTimestamp(value) as any as Integer);
  },

  readOrThrow(source, sourceImpl) {
    return Tried.experimental_unwrap(DateTime.fromTimestamp(sourceImpl.readIntegerOrThrow(source)));
  },
});

export const DateAdapter = ScalarAdapter.implement<Date>({
  name: "Date",

  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(destination, Date.getTimestamp(value) as any as Integer);
  },

  readOrThrow(source, sourceImpl) {
    return Tried.experimental_unwrap(Date.fromTimestamp(sourceImpl.readIntegerOrThrow(source)));
  },
});

export interface CountdownNames {
  readonly from: Name,
  readonly duration: Name,
}

export const CountdownNamedWrite = NamedWrite.implement<Countdown, CountdownNames>({
  write(value, names, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, names.from, Countdown.getFrom(value), InstantAdapter);
    destinationImpl.writeScalarValue(destination, names.duration, Countdown.getTotalDuration(value), DurationAdapter);
  },
});

export const CountdownOrderedWrite = OrderedWrite.implement<Countdown>({
  write(value, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, Countdown.getFrom(value), InstantAdapter);
    destinationImpl.writeScalarValue(destination, Countdown.getTotalDuration(value), DurationAdapter);
  },
});

export interface TimeRangeNames {
  readonly from: Name,
  readonly till: Name,
}

export const TimeRangeNamedWrite = NamedWrite.implement<TimeRange, TimeRangeNames>({
  write(value, names, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, names.from, TimeRange.getFrom(value), TimeAdapter);
    destinationImpl.writeScalarValue(destination, names.till, TimeRange.getTill(value), TimeAdapter);
  },
});

export const TimeRangeOrderedWrite = OrderedWrite.implement<TimeRange>({
  write(value, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, TimeRange.getFrom(value), TimeAdapter);
    destinationImpl.writeScalarValue(destination, TimeRange.getTill(value), TimeAdapter);
  },
});

// export interface MonotonicClockNames {
//   readonly elapsedTime: Name,
//   readonly previousSynchronizationTime: Name,
// }

// export const MonotonicClockNamedWrite = NamedWrite.implement<MonotonicClock, MonotonicClockNames

export const TaskDueVariantAdapter = ScalarAdapter.implement<TaskDueVariant>({
  name: "TaskDueVariant",
  
  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(destination, TaskDueVariantM.toNumber(value) as any as Integer);
  },

  readOrThrow(source, sourceImpl) {
    return TaskDueVariantM.fromNumberOrThrow(sourceImpl.readIntegerOrThrow(source));
  },
});

export interface TaskDueNames {
  readonly variant: Name,
  readonly data1: Name,
  readonly data2: Name,
}

export const TaskDueNamedWrite = NamedWrite.implement<TaskDue, TaskDueNames>({
  write(value, names, destination, destinationImpl) {
    TaskDue.match(
      value,
      beforeTime => {
        destinationImpl.writeScalarValue(destination, names.variant, TaskDueVariant.DueAfterTime, TaskDueVariantAdapter);
        destinationImpl.writeScalarValue(destination, names.data1, TaskDueBeforeTime.getTime(beforeTime), DateTimeAdapter);
      },
      afterTime => {
        destinationImpl.writeScalarValue(destination, names.variant, TaskDueVariant.DueAfterTime, TaskDueVariantAdapter);
        destinationImpl.writeScalarValue(destination, names.data1, TaskDueAfterTime.getTime(afterTime), DateTimeAdapter);
      },
      inTimeRange => {
        destinationImpl.writeScalarValue(destination, names.variant, TaskDueVariant.DueInTimeRange, TaskDueVariantAdapter);
        destinationImpl.writeScalarValue(destination, names.data1, TaskDueInTimeRange.getFrom(inTimeRange), DateTimeAdapter);
        destinationImpl.writeScalarValue(destination, names.data2, TaskDueInTimeRange.getTill(inTimeRange), DateTimeAdapter);
      },
      _ => {
        destinationImpl.writeScalarValue(destination, names.variant, TaskDueVariant.DueAnyTime, TaskDueVariantAdapter);
      },
    );
  },
});

export const TaskDueOrderedWrite = OrderedWrite.implement<TaskDue>({
  write(value, destination, destinationImpl) {
    TaskDue.match(
      value,
      beforeTime => {
        destinationImpl.writeScalarValue(destination, TaskDueVariant.DueAfterTime, TaskDueVariantAdapter);
        destinationImpl.writeScalarValue(destination, TaskDueBeforeTime.getTime(beforeTime), DateTimeAdapter);
        destinationImpl.writeNull(destination);
      },
      afterTime => {
        destinationImpl.writeScalarValue(destination, TaskDueVariant.DueAfterTime, TaskDueVariantAdapter);
        destinationImpl.writeScalarValue(destination, TaskDueAfterTime.getTime(afterTime), DateTimeAdapter);
        destinationImpl.writeNull(destination);
      },
      inTimeRange => {
        destinationImpl.writeScalarValue(destination, TaskDueVariant.DueInTimeRange, TaskDueVariantAdapter);
        destinationImpl.writeScalarValue(destination, TaskDueInTimeRange.getFrom(inTimeRange), DateTimeAdapter);
        destinationImpl.writeScalarValue(destination, TaskDueInTimeRange.getTill(inTimeRange), DateTimeAdapter);
      },
      _ => {
        destinationImpl.writeScalarValue(destination, TaskDueVariant.DueAnyTime, TaskDueVariantAdapter);
        destinationImpl.writeNull(destination);
        destinationImpl.writeNull(destination);
      },
    );
  },
});

export const TaskTrackerVariantAdapter = ScalarAdapter.implement<TaskTrackerVariant>({
  name: "TaskTrackerVariant",

  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(destination, TaskTrackerVariantM.toNumber(value));
  },

  readOrThrow(source, sourceImpl) {
    return TaskTrackerVariantM.fromNumberOrThrow(sourceImpl.readIntegerOrThrow(source));
  },
});

export const TaskTrackerStopwatchStatusVariantAdapter = ScalarAdapter.implement<TaskTrackerStopwatchStatusVariant>({
  name: "TaskTrackerStopwatchStatusVariant",

  write(value, destination, destinationImpl) {
    destinationImpl.writeInteger(
      destination, 
      TaskTrackerStopwatchStatusVariantM.toNumber(value),
    );
  },

  readOrThrow(source, sourceImpl) {
    return TaskTrackerStopwatchStatusVariantM.fromIntegerOrThrow(
      sourceImpl.readIntegerOrThrow(source),
    );
  },
});

export interface TaskTrackerStopwatchStatusNames {
  readonly variant: Name,
  readonly startedAt: Name,
  readonly pausedAt: Name,
  readonly completedAt: Name,
}

export const TaskTrackerStopwatchStatusNamedWrite = NamedWrite.implement<TaskTrackerStopwatchStatus, TaskTrackerStopwatchStatusNames>({
  write(value, names, destination, destinationImpl) {
    destinationImpl.writeScalarValue(
      destination, 
      names.variant, 
      value.variant, 
      TaskTrackerStopwatchStatusVariantAdapter,
    );

    TaskTrackerStopwatchStatus.match(
      value,
      _ready => {
       // no-op
      },
      running => {
        destinationImpl.writeScalarValue(
          destination,
          names.startedAt,
          running.at,
          DateTimeAdapter,
        );
      },
      paused => {
        destinationImpl.writeScalarValue(
          destination,
          names.pausedAt,
          paused.at,
          DateTimeAdapter,
        );
      },
      completed => {
        destinationImpl.writeScalarValue(
          destination,
          names.completedAt,
          completed.at,
          DateTimeAdapter,
        );
      },
    );
  },
});

export const TaskTrackerStopwatchStatusOrderedWrite = OrderedWrite.implement<TaskTrackerStopwatchStatus>({
  write(value, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, value.variant, TaskTrackerStopwatchStatusVariantAdapter);

    TaskTrackerStopwatchStatus.match(
      value,
      _ready => {
        destinationImpl.writeNull(destination);
      },
      running => {
        destinationImpl.writeScalarValue(destination, running.at, DateTimeAdapter);
      },
      paused => {
        destinationImpl.writeScalarValue(destination, paused.at, DateTimeAdapter);
      },
      completed => {
        destinationImpl.writeScalarValue(destination, completed.at, DateTimeAdapter);
      },
    );
  },
});

export interface TaskTrackerNames {
  readonly variant: Name,
  readonly checkboxCompletedAt: Name,
  readonly counterWorkload: Name,
  readonly counterWorkdone: Name,
  readonly counterCompletedAt: Name,
  readonly stopwatchWorkload: Name,
  readonly stopwatchWorkdone: Name,
  readonly stopwatchStatus: TaskTrackerStopwatchStatusNames,
}

export const TaskTrackerNamedWrite = NamedWrite.implement<TaskTracker, TaskTrackerNames>({
  write(value, names, destination, destinationImpl) {
    destinationImpl.writeScalarValue(destination, names.variant, value.variant, TaskTrackerVariantAdapter);

    TaskTracker.match(
      value,
      checkbox => {
        destinationImpl.writeNullableScalarValue(
          destination, 
          names.checkboxCompletedAt, 
          TaskTrackerCheckbox.getCompletedAt(checkbox), 
          DateTimeAdapter,
        );
      },
      counter => {
        destinationImpl.writeInteger(
          destination, 
          names.counterWorkload, 
          TaskTrackerCounter.getWorkload(counter) as any as Integer,
        );
        destinationImpl.writeInteger(
          destination, 
          names.counterWorkdone, 
          TaskTrackerCounter.getWorkdone(counter) as any as Integer,
        );
        destinationImpl.writeNullableScalarValue(
          destination, 
          names.counterCompletedAt, 
          TaskTrackerCounter.getCompletedAt(counter), 
          DateTimeAdapter,
        );
      },
      stopwatch => {
        destinationImpl.writeScalarValue(
          destination,
          names.stopwatchWorkload,
          TaskTrackerStopwatch.getWorkload(stopwatch),
          DurationDescriptor,
        );
        destinationImpl.writeScalarValue(
          destination,
          names.stopwatchWorkdone,
          TaskTrackerStopwatch.getWorkdone(stopwatch),
          DurationDescriptor,
        );
        destinationImpl.writeCompoundValue(
          destination,
          names.stopwatchStatus,
          TaskTrackerStopwatch.getStatus(stopwatch),
          TaskTrackerStopwatchStatusNamedWrite,
        );
      },
    );
  },
});