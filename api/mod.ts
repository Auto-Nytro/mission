import { UuidV4, Routine, Task, RoutineName, RoutineDescription, Repeater, RoutineDue, Difficulty, Urgency } from "../x.ts"

class SuccessCode {} 

const isSuccessCode = (value: unknown): value is SuccessCode => {
  throw new Error("Not implemented");
}

class DatabaseError {}

export interface Database extends DatabaseOperations {

}

export interface DatabaseOperations {
  addRoutine(habitId: UuidV4, habit: Routine): Promise<SuccessCode | DatabaseError>;
  setRoutineName(habitId: UuidV4, newRoutineName: string): Promise<SuccessCode | DatabaseError>;
  setRoutineDescription(habitId: UuidV4, newRoutineDescription: string): Promise<SuccessCode | DatabaseError>;
  addTask(habitId: UuidV4, taskId: UuidV4, task: Task): Promise<SuccessCode | DatabaseError>;
}

export class Api {
  private database: DatabaseOperations;

  private constructor(
    database: DatabaseOperations,
  ) {
    this.database = database;
  }

  async createRoutine(
    habitId: UuidV4,
    habitName: RoutineName,
    habitDescription: RoutineDescription,
    habitDue: RoutineDue,
    habitRepeater: Repeater,
    difficulty: Difficulty,
    urgency: Urgency,
  ) {
    const habit = Routine.create(
      habitName,
      habitDescription,
      habitDue,
      habitRepeater,
      difficulty,
      urgency,
    );

    const error = await this.database.addRoutine(habitId, habit);
    if (error instanceof DatabaseError) {
      return error;
    }

    return habit;
  }

  setRoutineName(habitId: UuidV4, newRoutineName: string) {}
  setRoutineDescription() {}
}


// DoOneTime
// DoMultipleTimes
// DoForDuration


// due within range
// due any time
// due before time
// due after time

// create task when complete
// create task every day at time
// create task every weekday at time

// log individual task completions
// log task completions per day
// log task completions per week
// log task completions per month
// log task completions per year
