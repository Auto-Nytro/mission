export class Duration {
  private constructor(private readonly milliseconds: number) {}

  static readonly MAXIMUM_MILLISECONDS = Number.MAX_SAFE_INTEGER;
  static readonly MAXIMUM_SECONDS = this.MAXIMUM_MILLISECONDS / 1000;
  static readonly MAXIMUM_MINUTES = this.MAXIMUM_SECONDS / 60;
  static readonly MAXIMUM_HOURS = this.MAXIMUM_MINUTES / 60;
  
  static readonly MILLISECONDS_PER_SECOND = 1000;
  static readonly MILLISECONDS_PER_MINUTE = this.MILLISECONDS_PER_SECOND * 60;
  static readonly MILLISECONDS_PER_HOUR = this.MILLISECONDS_PER_MINUTE * 60;
  static readonly MILLISECONDS_PER_DAY = this.MILLISECONDS_PER_HOUR * 24;
  static readonly MILLISECONDS_PER_WEEK = this.MILLISECONDS_PER_DAY * 7;
  
  static fromMilliseconds(milliseconds: number): Duration | Error {
    if (Number.isInteger(milliseconds)) {
      return new Error("Creating Duration from milliseconds: Argument 'milliseconds' is integer");
    }
    if (milliseconds < 0) {
      return new Error("Creating Duration from milliseconds: Argument 'milliseconds' is less than minium value which is zero");
    }
    if (milliseconds > this.MAXIMUM_MILLISECONDS) {
      return new Error(`Creating Duration from milliseconds: Argument 'milliseconds' is greater than maximum value which is ${this.MAXIMUM_MILLISECONDS}`);
    }
    return new Duration(milliseconds);
  }

  static fromMillisecondsOrThrow(milliseconds: number): Duration {
    const duration = Duration.fromMilliseconds(milliseconds);
    if (duration instanceof Error) {
      throw duration;
    } 
    return duration;
  }
  
  static fromHoursOrThrow(hours: number): Duration {
    if (!Number.isInteger(hours)) {
      throw new Error("Creating Duration from hours: Argument 'hours' is not an integer");
    }
    if (hours < 0) {
      throw new Error("Creating Duration from hours: Argument 'hours' is less than minium value which is zero");
    }
    if (hours > this.MAXIMUM_HOURS) {
      throw new Error(`Creating Duration from hours: Argument 'hours' is greater than maximum value which is ${Duration.MAXIMUM_HOURS}`);
    }
    return new Duration(hours * this.MILLISECONDS_PER_HOUR);
  }
  
  static day(): Duration {
    return new Duration(this.MILLISECONDS_PER_DAY);
  }
  static zero(): Duration {
    return new Duration(0);
  }
  
  toTotalMilliseconds(): number {
    return this.milliseconds;
  }

  toTotaMinutes(): number {
    return Math.floor(this.toTotalMilliseconds() / Duration.MILLISECONDS_PER_MINUTE);
  }

  isZero(): boolean {
    return this.toTotalMilliseconds() === 0;
  }

  minusOrZero(rhs: Duration): Duration {
    if (this.toTotalMilliseconds() > rhs.toTotalMilliseconds()) {
      return new Duration(this.toTotalMilliseconds() - rhs.toTotalMilliseconds());
    } else {
      return Duration.zero();
    }
  }
  
  plusOrMax(rhs: Duration): Duration {
    const result = this.toTotalMilliseconds() + rhs.toTotalMilliseconds();
    if (result <= Duration.MAXIMUM_MILLISECONDS) {
      return new Duration(result);
    } else {
      return new Duration(Duration.MAXIMUM_MILLISECONDS);
    }
  }

  isEqualTo(rhs: Duration): boolean {
    return this.toTotalMilliseconds() === rhs.toTotalMilliseconds();
  }
  
  isGreaterThan(rhs: Duration): boolean {
    return this.toTotalMilliseconds() > rhs.toTotalMilliseconds();
  }
  
  isGreaterThanOrEqualTo(rhs: Duration): boolean {
    return this.toTotalMilliseconds() >= rhs.toTotalMilliseconds();
  }
  
  isLessThan(rhs: Duration): boolean {
    return this.toTotalMilliseconds() < rhs.toTotalMilliseconds();
  }
  
  isLessThanOrEqualTo(rhs: Duration): boolean {
    return this.toTotalMilliseconds() <= rhs.toTotalMilliseconds();
  }
  
  min(rhs: Duration): Duration {
    return this.isLessThan(rhs) ? this : rhs; 
  }
  
  toString(): string {
    const parts: string[] = [];
  
    let totalMilliseconds = this.toTotalMilliseconds();
    
    const totalDays = Math.floor(totalMilliseconds / Duration.MILLISECONDS_PER_DAY);
    totalMilliseconds %= Duration.MILLISECONDS_PER_DAY;
    parts.push(`${totalDays} D`);
    
    const totalHours = Math.floor(totalMilliseconds / Duration.MILLISECONDS_PER_HOUR);
    totalMilliseconds %= Duration.MILLISECONDS_PER_HOUR;
    parts.push(`${totalHours} H`);
    
    const totalMinutes = Math.floor(totalMilliseconds / Duration.MILLISECONDS_PER_MINUTE);
    totalMilliseconds %= Duration.MILLISECONDS_PER_MINUTE;
    parts.push(`${totalMinutes} M`);
    
    return parts.join(' ');
  }
  
  toString2(): string {
    const milliseconds = this.toTotaMinutes();
  
    if (milliseconds === 0) {
      return '0s';
    }
  
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
  
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;
    const days = totalDays;
  
    const parts: string[] = [];
  
    if (days > 0) {
      parts.push(`${days}d`);
    }
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }
    if (seconds > 0 || parts.length === 0) {
      parts.push(`${seconds}s`);
    }
  
    return parts.join(' ');
  }
}
