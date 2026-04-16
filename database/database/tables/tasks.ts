import { DateTime, Task, TaskDue, TaskDueAfterTime, TaskDueBeforeTime, TaskDueInTimeRange, TaskTrackerCounter, TaskTrackerStopwatch, TaskDueVariantM, TaskTracker, TaskTrackerCheckbox, TaskTrackerVariant, TaskTrackerVariantM, Time, Nullable, Duration } from "../../../x.ts";
import { SqliteValue } from "../utilities.ts";

type TaskId = number;

const TaskId = {
  toNumber: (it: TaskId): number => it,
}

const TABLE = "Tasks";

const ID = "id"
const DUE_VARIANT = "dueVariant";
const DUE_DATA_1 = "dueData1";
const DUE_DATA_2 = "dueData2";
const TARCKER_VARIANT = "trackerVariant"
const TARCKER_DATA_1 = "trackerData1"
const TARCKER_DATA_2 = "trackerData2"
const TARCKER_DATA_3 = "trackerData3"
const TARCKER_DATA_4 = "trackerData4"
const TARCKER_DATA_5 = "trackerData5"

const generateInsert = (taskId: TaskId, task: Task) => {
  const idField = TaskId.toNumber(taskId);
  
  const dueVariantField = TaskDueVariantM.toNumber(task.due.variant);
  let dueData1Field: SqliteValue = null;
  let dueData2Field: SqliteValue = null;
  TaskDue.match(
    task.due,
    due => {
      dueData1Field = DateTime.toTimestamp(TaskDueBeforeTime.getTime(due));
    },
    due => {
      dueData1Field = DateTime.toTimestamp(TaskDueAfterTime.getTime(due));
    },
    due => {
      dueData1Field = DateTime.toTimestamp(TaskDueInTimeRange.getFrom(due));
      dueData2Field = DateTime.toTimestamp(TaskDueInTimeRange.getFrom(due));
    },
    _ => {
      // no-op
    },
  );

  const trackerVariantField = TaskTrackerVariantM.toNumber(task.tracker.variant);
  let taskTrackerData1Field: SqliteValue = null;
  let taskTrackerData2Field: SqliteValue = null;
  let taskTrackerDataField: SqliteValue = null;
  let taskTrackerData3Field: SqliteValue = null;
  let taskTrackerData5Field: SqliteValue = null;
  TaskTracker.match(
    task.tracker,
    checkbox => {
      taskTrackerData1Field = Nullable.map(TaskTrackerCheckbox.getCompletedAt(checkbox), DateTime.toTimestamp);
    },
    counter => {
      taskTrackerData1Field = TaskTrackerCounter.getWorkload(counter);
      taskTrackerData1Field = TaskTrackerCounter.getWorkdone(counter);
      taskTrackerData1Field = Nullable.map(TaskTrackerCounter.getCompletedAt(counter), DateTime.toTimestamp);
    },
    stopwatch => {
      taskTrackerData1Field = Duration.toTotalMilliseconds(TaskTrackerStopwatch.getWorkload(stopwatch));
      taskTrackerData1Field = Duration.toTotalMilliseconds(TaskTrackerStopwatch.getWorkdone(stopwatch));
      taskTrackerData1Field = Nullable.map(TaskTrackerStopwatch.getCompletedAt(stopwatch), DateTime.toTimestamp);
    }
  );

  

  return (
`INSERT INTO ${}`
  );

  // whitch (task.due.variant) {
  //   case TaskDueVariant.AnyTime: {
  //     taskDueData1 = null;
  //     taskDueData2 = null;
  //   }
  //   case TaskDueVariant.InTimeRange: {
  //     taskDueData1 = TimeRange.getFromAsTimestamp(TaskDueInTimeRange.getT)
  //   }
  // } 

}
