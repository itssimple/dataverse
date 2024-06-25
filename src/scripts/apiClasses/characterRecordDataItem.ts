import { GoalDataItem } from "./goalDataItem";
import { RecordState } from "./recordState";

export type CharacterRecordDataItem = GoalDataItem & {
  state?: RecordState;
};
