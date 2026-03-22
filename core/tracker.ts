import { Duration } from "../x.ts";

export class TrackerCounter {
  private name: string;
  private description: string | null;
  private dailyTotal: number;
  private weeklyTotal: number;
  private monthlyTotal: number;
  private yearlyTotal: number;
  private allTimeTotal: number;
}

export class TrackerCheckbox {
  private name: string;
  private description: string | null;
  private dailyTotal: number;
  private weeklyTotal: number;
  private monthlyTotal: number;
  private yearlyTotal: number;
  private allTimeTotal: number;
}

export class TrackerStopwatch {
  private name: string;
  private description: string | null;
  private dailyTotal: Duration;
  private weeklyTotal: Duration;
  private monthlyTotal: Duration;
  private yearlyTotal: Duration;
  private allTimeTotal: Duration;
}