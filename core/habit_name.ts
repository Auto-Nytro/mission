export class HabitNameInvariantViolation extends Error {
  private constructor() {
    super();
  }

  static create() {
    return new HabitNameInvariantViolation();
  }
}

export class HabitName {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static readonly MAXIMUM_LENGTH = 1000;
  static readonly MINIMUM_LENGTH = 1;

  static create(value: string) {
    if (value.length < this.MINIMUM_LENGTH) {
      return HabitNameInvariantViolation.create();
    }
    if (value.length > this.MAXIMUM_LENGTH) {
      return HabitNameInvariantViolation.create();
    }
    return new HabitName(value);
  }
}
