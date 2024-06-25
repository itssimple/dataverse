import { GoalDataItem } from "./goalDataItem";
import { ItemState } from "./itemState";

export type QuestDataItem = GoalDataItem & {
  state?: ItemState;
};
