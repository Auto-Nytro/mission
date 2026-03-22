

export class RepeatEveryWeekdayAtTime {
  private time: Time;
  private weekday: Weekday;

  private constructor(
    time: Time,
    weekday: Weekday,
  ) {
    this.time = time;
    this.weekday = weekday;
  }

  static create(time: Time, weekday: Weekday) {
    return new RepeatEveryWeekdayAtTime(time, weekday);
  }
}
