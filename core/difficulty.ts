export class DifficultyInvariantViolation {
  private constructor(private readonly value: number) {}
  
  static create(value: number) {
    return new DifficultyInvariantViolation(value);
  }
}

export class Difficulty {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number) {
    if (Number.isFinite(value) && value <= 0 && value >= 1) {
      return new Difficulty(value);
    } else {
      return DifficultyInvariantViolation.create(value);
    }
  }
}
