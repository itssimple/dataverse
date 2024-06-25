import { GoalType } from "./goalType";

export type GoalDataItem = {
  name: string;
  description: string;
  icon: string;
  nextLevelAt?: number;
  progressToNextLevel?: number;
  type: GoalType;
  order: number;
  inProgressValueStyle: number;
  completedValueStyle: number;
  tracked?: boolean | undefined | null;
  startDate?: string | undefined | null;
  endDate?: string | undefined | null;
};
