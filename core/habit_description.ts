export class HabitDescriptionInvariantViolation extends Error {
  private constructor(private readonly vale: string) {
    super();
  }

  static create(value: string) {
    return new HabitDescriptionInvariantViolation(value);
  }
}

export class HabitDescription {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static readonly MAXIMUM_LENGTH = 10000;
  static readonly MINIMUM_LENGTH = 1;

  static create(value: string) {
    if (value.length < this.MINIMUM_LENGTH) {
      return HabitDescriptionInvariantViolation.create(value);
    }
    if (value.length > this.MAXIMUM_LENGTH) {
      return HabitDescriptionInvariantViolation.create(value);
    }
    return new HabitDescription(value);
  }
}
