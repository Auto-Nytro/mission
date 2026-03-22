import { DateTime, Duration } from "../x.ts";

export class Countdown {
  private constructor(
    private remainingDuration: Duration,
    private previousSynchronizationTime: DateTime,
  ) {}

  static create(duration: Duration, now: DateTime): Countdown {
    return new Countdown(duration, now);
  }

  static construct(duration: Duration, previousSynchronizationTime: DateTime): Countdown {
    return new Countdown(duration, previousSynchronizationTime);
  }

  synchronize(now: DateTime) {
    const interval = this.previousSynchronizationTime.tillOrZero(now);
    this.remainingDuration = this.remainingDuration.minusOrZero(interval);
    this.previousSynchronizationTime = now;
  }

  isFinished(): boolean {
    return this.remainingDuration.isZero();
  }

  isRunning(): boolean {
    return !this.remainingDuration.isZero();
  }

  getRemainingDuration(): Duration {
    return this.remainingDuration;
  }

  setRemaniningDuration(newValue: Duration) {
    this.remainingDuration = newValue;
  }

  getPreviousSynchronizationTime(): DateTime {
    return this.previousSynchronizationTime;
  }
}