import { Signal } from "@preact/signals";
import { GoalDataItem } from "../scripts/apiClasses/goalDataItem";

export type D2AppState = {
  isAuthenticated: Signal<boolean>;
  isDataLoaded: Signal<boolean>;
  goals: Signal<GoalDataItem[]>;
};
