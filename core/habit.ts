import { HabitDescription, HabitDue, HabitName, HabitTracker, Importance, Repeater, Urgency } from "../x.ts";

export class Habit {
  private name: HabitName;
  private description: HabitDescription | null;
  private due: HabitDue;
  private tracker: HabitTracker;
  private repeater: Repeater;
  private urgency: Urgency;
  private importance: Importance;

  private constructor(
    name: HabitName,
    description: HabitDescription | null,
    due: HabitDue,
    tracker: HabitTracker,
    repeater: Repeater,
    urgency: Urgency,
    importance: Importance,
  ) {
    this.name = name;
    this.description = description;
    this.due = due;
    this.tracker = tracker;
    this.repeater = repeater;
    this.importance = importance;
    this.urgency = urgency;
  }

  static create(
    name: HabitName,
    description: HabitDescription | null,
    due: HabitDue,
    tracker: HabitTracker,
    repeater: Repeater,
    urgency: Urgency,
    importance: Importance,
  ) {
    return new Habit(
      name, 
      description, 
      due,
      tracker,
      repeater, 
      urgency, 
      importance,
    );
  }
}