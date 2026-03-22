
export class RepeatEveryDayAtTime {
  private time: Time;

  private constructor(time: Time) {
    this.time = time;
  }

  static create(time: Time) {
    return new RepeatEveryDayAtTime(time);
  }

  calculateRepeatTimesSince(
    previousSynchronizationTime: DateTime, 
    now: DateTime,
  ) {
    previousSynchronizationTime.withTime()
  }
}
