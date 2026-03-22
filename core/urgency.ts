export class UrgencyInvariantViolation {
  private constructor() {}
  
  static create() {
    return new this();
  }
}

export class Urgency {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number) {
    if (Number.isFinite(value) && value <= 0 && value >= 1) {
      return new Urgency(value);
    } else {
      return UrgencyInvariantViolation.create();
    }
  }
}
