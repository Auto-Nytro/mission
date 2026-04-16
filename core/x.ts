// import { DateTime, Duration, FAILURE, FailureCode, TextualError, Time } from "../x.ts";

// export type RoutineId = number;

// export type Routine = {
//   name: string,
//   description: string,

//   importance: number,
//   urgency: number,
  
//   dailyTotal: Duration,
//   weeklyTotal: Duration,
//   monthlyTotal: Duration,
//   yearlyTotal: Duration,
//   allTimeTotal: Duration,
// };

// export const enum DueVariant {
//   InTimeRange,
//   AfterTime,
//   BeforeTime,
//   AnyTime,
// }

// export const enum WorkStateVariant {
//   Ready,
//   Running,
//   Paused,
//   Completed,
// }

// export type WorkState = (
//   | WorkStateReady
//   | WorkStateRunning
//   | WorkStatePaused
//   | WorkStateCompleted
// );

// export type WorkStateReady = {
//   readonly variant: WorkStateVariant.Ready,
// };

// export type WorkStateRunning = {
//   readonly variant: WorkStateVariant.Running,
//   readonly at: DateTime,
// };

// export type WorkStatePaused = {
//   readonly variant: WorkStateVariant.Paused,
//   readonly at: DateTime,
// };

// export type WorkStateCompleted = {
//   readonly variant: WorkStateVariant.Completed,
//   readonly at: DateTime,
// };

// export type Work = {
//   target: Duration,
//   achieved: Duration,
//   state: WorkState,
// };

// export interface WorkReady extends Work {
//   state: WorkStateReady,
// }

// export interface WorkRunning extends Work {
//   state: WorkStateRunning,
// }

// export interface WorkPaused extends Work {
//   state: WorkStatePaused,
// }

// export interface WorkCompleted extends Work {
//   state: WorkStateCompleted,
// }

// const construct = (
//   target: Duration,
//   achieved: Duration,
//   state: WorkState,
// ): Work => {
//   return {
//     target,
//     achieved,
//     state,
//   };
// };

// const reconstruct = (
//   target: Duration,
//   achieved: Duration,
//   state: WorkState,
//   textualError: TextualError,
// ): Work | FailureCode => {
//   if (
//     Duration.isShorterThan(achieved, target) 
//     && 
//     state.variant !== WorkStateVariant.Completed
//   ) {
//     TextualError.changeContext(textualError, "Reconstructing a Work");
//     TextualError.addMessage(textualError, "Invariant Violation: 'achieved' must be longer than or equal to 'target' when 'state.variant' is 'Complete'");
//     TextualError.addStringAttachment(textualError, "achieved", Duration.toString2(achieved));
//     TextualError.addStringAttachment(textualError, "target", Duration.toString2(target));
//     return FAILURE;
//   }
  
//   return construct(
//     target,
//     achieved,
//     state,
//   );
// };

// const create = (target: Duration): Work => {
//   return construct(
//     target,
//     Duration.zero(),
//     {
//       variant: WorkStateVariant.Ready,
//     },
//   );
// };

// const isReady = (it: Work): it is WorkReady => {
//   return it.state.variant === WorkStateVariant.Ready;
// };
// const isRunning = (it: Work): it is WorkRunning => {
//   return it.state.variant === WorkStateVariant.Running;
// };
// const isPaused = (it: Work): it is WorkPaused => {
//   return it.state.variant === WorkStateVariant.Paused;
// };
// const isCompleted = (it: Work): it is WorkCompleted => {
//   return it.state.variant === WorkStateVariant.Completed;
// };

// const toRunning = (
//   it: WorkRunning,
//   time: DateTime,
// ): WorkRunning => {
//   return {
//     target: it.target,
//     achieved: it.achieved,
//     state: {
//       variant: WorkStateVariant.Running,
//       at: time,
//     },
//   };
// };

// const toPaused = (
//   it: WorkRunning,
//   time: DateTime,
// ): WorkRunning => {
//   return {
//     target: it.target,
//     achieved: Duration.saturatingAdd(
//       it.achieved, 
//       DateTime.tillOrZero(it.state.at, time),
//     ),
//     state: {
//       variant: WorkStateVariant.Running,
//       at: time,
//     },
//   };
// };

// const toResumed = (
//   it: WorkPaused,
//   time: DateTime,
// ): WorkRunning => {
//   return {
//     target: it.target,
//     achieved: it.achieved,
//     state: {
//       variant: WorkStateVariant.Running,
//       at: time,
//     },
//   };
// };


// export const Work = {
//   reconstruct,
//   create,
//   toRunning,
//   toPaused,
//   toResumed,
//   isCompleted,
//   isPaused,
//   isReady,
//   isRunning,
// };

// export const enum GeneratorVariant {
//   EveryDay,
// }

// export const enum DueCreatorVariant {
//   AnyTime,
//   InTimeRange,
//   BeforeTime,
//   AfterTime,
//   ForDurationAfterCreation,
// }

// export type DueCreator = {
//   readonly type: DueCreatorVariant.AnyTime,
// } | {
//   readonly type: DueCreatorVariant.AfterTime,
//   readonly time: Time,
// } | {
//   readonly type: DueCreatorVariant.BeforeTime,
//   readonly time: Time,
// } | {
//   readonly type: DueCreatorVariant.InTimeRange,
//   readonly from: Time,
//   readonly till: Time,
// } | {
//   readonly type: DueCreatorVariant.ForDurationAfterCreation,
//   readonly duration: Duration,
// };

// export type EveryDayGenerator = {
//   routineId: RoutineId,
//   previousDay: DateTime,
//   timesPerDay: number,
//   dueCreator: DueCreator,
// };
