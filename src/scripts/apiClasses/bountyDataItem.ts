import { GoalDataItem } from "./goalDataItem";
import { ItemState } from "./itemState";

export type BountyDataItem = GoalDataItem & {
  state?: ItemState;
};
