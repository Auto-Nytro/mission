import { Time, Duration } from "../x.ts"

export class DateTime {
  private constructor(private readonly date: Date) {}

  static now(): DateTime {
    return new DateTime(new Date());
  }
  
  getTime(): Time {
    const hour = this.date.getUTCHours();
    const minute = this.date.getUTCMinutes();
    return Time.fromHourAndMinuteOrThrow(hour, minute);
  }

  withTime(time: Time) {
    const date = new Date(this.date);
    date.setHours(time.getHour(), time.getMinute(), time.getSecond(), 0);
    return new DateTime(date);
  }
  
  getTimestamp(): number {
    return this.date.getTime();
  }

  tillOrZero(rhs: DateTime): Duration {
    const lhsTimestamp = this.date.getTime();
    const rhsTimestamp = rhs.date.getTime();
  
    if (lhsTimestamp < rhsTimestamp) {
      return Duration.fromMillisecondsOrThrow(rhsTimestamp - lhsTimestamp);
    } else {
      return Duration.zero();
    }
  }
  
  sinceOrZero(rhs: DateTime): Duration {
    const lhsTimestamp = this.date.getTime();
    const rhsTimestamp = rhs.date.getTime();
  
    if (lhsTimestamp > rhsTimestamp) {
      return Duration.fromMillisecondsOrThrow(lhsTimestamp - rhsTimestamp);
    } else {
      return Duration.zero();
    }
  }
  
  
  // JS Date supports roughly ±8.64e15 ms
  private static readonly MIN_TIMESTAMP = -8.64e15;
  private static readonly MAX_TIMESTAMP = 8.64e15;
  
  static fromTimestamp(timestamp: number): DateTime | Error {
    if (!Number.isInteger(timestamp)) {
      return new Error(`Creating DateTime from timestamp: Timestamp is not integer. Timestamp: ${timestamp}`);
    }
  
    if (timestamp < DateTime.MIN_TIMESTAMP) {
      return new Error(`Creating DateTime from timestamp: Timestamp is less than the minimum value. Timestamp: ${timestamp}. Minimum value: ${DateTime.MIN_TIMESTAMP}`)
    }
    
    if (timestamp > DateTime.MAX_TIMESTAMP) {
      return new Error(`Creating DateTime from timestamp: Timestamp is greater than the maximum value. Timestamp: ${timestamp}. Maximum value: ${DateTime.MAX_TIMESTAMP}`)
    }
  
    const date = new Date(timestamp);
  
    if (Number.isNaN(date.getTime())) {
      return new Error(`Creating DateTime from timestamp: Timestamp didn't produce a valid DateTime for some reason 😭. Timestamp: ${timestamp}`);
    }
  
    return new DateTime(date);
  }
  
  toString(): string {
    return this.date.toISOString();
  }
  
  getDayStart() {
    const clone = new Date(this.date);
    clone.setUTCHours(24, 0, 0, 0);
    return new DateTime(clone);
  }

  getDurationTillMidnight() {
    const clone = new Date(this.date);
    clone.setUTCHours(24, 0, 0, 0);

    const fromTimestamp = this.date.getTime();
    const tillTimestamp = clone.getTime();
    const difference = tillTimestamp - fromTimestamp;

    return Duration.fromMillisecondsOrThrow(difference);
  }

  isAt(rhs: DateTime) {
    return this.getTimestamp() === rhs.getTimestamp();
  }
  
  isEarilerThan(rhs: DateTime) {
    return this.getTimestamp() < rhs.getTimestamp();
  }
  
  isEarilerThanOrAt(rhs: DateTime) {
    return this.getTimestamp() <= rhs.getTimestamp();
  }
  
  isLaterThan(rhs: DateTime) {
    return this.getTimestamp() > rhs.getTimestamp();
  }

  isLaterThanOrAt(rhs: DateTime) {
    return this.getTimestamp() >= rhs.getTimestamp();
  }
}
