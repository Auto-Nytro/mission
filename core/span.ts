import { Duration } from "../x.ts";

export class SpansNoLessThan {
  private lowerBound: Duration;

  private constructor(lowerBound: Duration) {
    this.lowerBound = lowerBound;
  }

  static create(lowerBound: Duration) {
    return new SpansNoLessThan(lowerBound);
  }
}

export class SpansNoMoreThan {
  private upperBound: Duration;

  private constructor(upperBound: Duration) {
    this.upperBound = upperBound;
  }

  static create(upperBound: Duration) {
    return new SpansNoMoreThan(upperBound);
  }
}

export class SpansExactly {
  private bound: Duration;

  private constructor(bound: Duration) {
    this.bound = bound;
  }

  static create(bound: Duration) {
    return new SpansExactly(bound);
  }
}

export class SpansRange {
  private lowerBound: Duration;
  private upperBound: Duration;

  private constructor(
    lowerBound: Duration,
    upperBound: Duration,
  ) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  }

  static create(
    lowerBound: Duration,
    upperBound: Duration,
  ) {
    return new SpansRange(lowerBound, upperBound);
  }
}

export type Span = (
  | SpansNoLessThan
  | SpansNoMoreThan
  | SpansExactly
  | SpansRange
);