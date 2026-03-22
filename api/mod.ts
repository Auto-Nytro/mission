import { UuidV4, Habit, Task, HabitName, HabitDescription, Repeater, HabitDue, Difficulty, Urgency } from "../x.ts"

class SuccessCode {} 

const isSuccessCode = (value: unknown): value is SuccessCode => {
  throw new Error("Not implemented");
}

class DatabaseError {}

export interface Database extends DatabaseOperations {

}

export interface DatabaseOperations {
  addHabit(habitId: UuidV4, habit: Habit): Promise<SuccessCode | DatabaseError>;
  setHabitName(habitId: UuidV4, newHabitName: string): Promise<SuccessCode | DatabaseError>;
  setHabitDescription(habitId: UuidV4, newHabitDescription: string): Promise<SuccessCode | DatabaseError>;
  addTask(habitId: UuidV4, taskId: UuidV4, task: Task): Promise<SuccessCode | DatabaseError>;
}

export class Api {
  private database: DatabaseOperations;

  private constructor(
    database: DatabaseOperations,
  ) {
    this.database = database;
  }

  async createHabit(
    habitId: UuidV4,
    habitName: HabitName,
    habitDescription: HabitDescription,
    habitDue: HabitDue,
    habitRepeater: Repeater,
    difficulty: Difficulty,
    urgency: Urgency,
  ) {
    const habit = Habit.create(
      habitName,
      habitDescription,
      habitDue,
      habitRepeater,
      difficulty,
      urgency,
    );

    const error = await this.database.addHabit(habitId, habit);
    if (error instanceof DatabaseError) {
      return error;
    }

    return habit;
  }

  setHabitName(habitId: UuidV4, newHabitName: string) {}
  setHabitDescription() {}
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
