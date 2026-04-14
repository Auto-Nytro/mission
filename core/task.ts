import { TaskDue, TaskTracker } from "../x.ts";

export const enum TaskStatus {
  Pending,
  Due,
  Complete,
  Overdue,
}

export type Task = {
  due: TaskDue,
  tracker: TaskTracker,
};

const construct = (
  due: TaskDue,
  tracker: TaskTracker,
): Task => {
  return {
    due,
    tracker,
  };
};

const reconstruct = construct;
const create = construct;



// calculateStatus(now: DateTime) {
//   switch (this.due.tag) {
//     case TaskDueVariant.DueAnyTime: {
//       if (this.tracker.isComplete()) {
//         return TaskStatus.Complete;
//       } 
//       return TaskStatus.Due;
//     }
//     case TaskDueVariant.DueBeforeTime: {
//       if (now.isEarilerThan(this.due.getTime())) {
//         if (this.tracker.isComplete()) {
//           return TaskStatus.Complete;
//         }
//         return TaskStatus.Overdue;
//       }
//       if ()
//     }
//     case TaskDueVariant.DueAfterTime: {

//     }
//     case TaskDueVariant.DueInTimeRange: {

//     }
//   }
// }
// }


export const Task = {
  reconstruct,
  create,
};