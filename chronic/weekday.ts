export class Weekday {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  private static SUN_NUMBER = 0;
  private static MON_NUMBER = 1;
  private static TUE_NUMBER = 2;
  private static WED_NUMBER = 3;
  private static THU_NUMBER = 4;
  private static FRI_NUMBER = 5;
  private static SAT_NUMBER = 6;
  
  private static SUN = new Weekday(Weekday.SUN_NUMBER);
  private static MON = new Weekday(Weekday.MON_NUMBER);
  private static TUE = new Weekday(Weekday.TUE_NUMBER);
  private static WED = new Weekday(Weekday.WED_NUMBER);
  private static THU = new Weekday(Weekday.THU_NUMBER);
  private static FRI = new Weekday(Weekday.FRI_NUMBER);
  private static SAT = new Weekday(Weekday.SAT_NUMBER);

  static Sun() {
    return this.SUN;
  }
  static Mon() {
    return this.MON;
  }
  static Tue() {
    return this.TUE;
  }
  static Wed() {
    return this.WED;
  }
  static Thu() {
    return this.THU;
  }
  static Fri() {
    return this.FRI;
  }
  static Sat() {
    return this.SAT;
  }
}