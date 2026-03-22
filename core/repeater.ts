import { RepeatEveryDayAtTime, RepeatEveryWeekdayAtTime } from "../x.ts"

export type Repeater = (
  | RepeatEveryDayAtTime
  | RepeatEveryWeekdayAtTime
  // | RepeatAfterCompletion
);


// export class RepeatIt {
//   private everyDay: RepeatEveryDayAtTime | null;
//   private everyWeekday: RepeatEveryWeekdayAtTime | null;
//   private everyAfterCompletion: RepeatAfterCompletion | null;

//   private previousSynchronizationTime: DateTime;
//   private repeatTimes: number;

//   go(time: DateTime) {
//     structuredClone 
//   }
// }

