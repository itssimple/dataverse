import { useSignal } from "@preact/signals";
import { GoalDataItem } from "../scripts/apiClasses/goalDataItem";
import { formatTimespan } from "../scripts/utils";
import "../styles/components/goalList.scss";
import { D2AppState } from "../classes/appState";
import { useEffect } from "preact/hooks";

const intlFormat = new Intl.NumberFormat();

const destinyBaseUrl = "https://www.bungie.net";

var trackingItems = {
  milestones: true,
  bounties: true,
  quests: true,
  records: true,
  seasonRank: true,
};

var cachedGoals: GoalDataItem[] = [];

export function GoalList(props: D2AppState) {
  const eventEmitter = window.eventEmitter;
  const apiClient = window.apiClient;

  var dataUpdate: NodeJS.Timer;

  useEffect(() => {
    eventEmitter.addEventListener("goal-list-update", updateGoalList);

    (async function () {
      await apiClient.getTrackableData();

      dataUpdate = setInterval(async () => {
        await apiClient.getTrackableData();
      }, 15 * 1000);

      return () => {
        clearInterval(dataUpdate);
      };
    })();
  }, []);

  function renderProgress(goal: any) {
    let progress: any = null;

    if (goal.inProgressValueStyle === 0) {
      if (goal.nextLevelAt === 1) {
        goal.inProgressValueStyle = 2;
      }
    }

    switch (goal.inProgressValueStyle) {
      case 2:
        progress = (
          <span className="goal-progress">
            {goal.progressToNextLevel == 0 ? "Incomplete" : "Complete"}
          </span>
        );
        break;
      case 3:
        let progressPercent = (
          (goal.progressToNextLevel / goal.nextLevelAt) *
          100
        ).toFixed(0);
        progress = <span className="goal-progress">{progressPercent} %</span>;
        break;
      case 8:
        progress = "";
        break;
      case 12:
        progress = (
          <span className="goal-progress">{goal.progressToNextLevel} %</span>
        );
        break;
      case 6:
      default:
        progress = (
          <span className="goal-progress">
            {intlFormat.format(goal.progressToNextLevel)} /{" "}
            {intlFormat.format(goal.nextLevelAt)}
          </span>
        );
        break;
    }

    return typeof goal.nextLevelAt !== "undefined" ? <>{progress}</> : null;
  }

  function renderGoalItem(goal: any) {
    let icon =
      typeof goal.icon !== "undefined" ? (
        <img className="goal-icon" src={`${destinyBaseUrl}${goal.icon}`} />
      ) : null;

    let expiryDate =
      typeof goal.endDate !== "undefined" ? (
        <>
          <br />
          <i class="fui body fiction goal-end">
            Ends in {formatTimespan(new Date(), new Date(goal.endDate))}
          </i>
        </>
      ) : null;

    let progress = renderProgress(goal);

    return (
      <div className="goal-item">
        {icon}
        <div className="goal-body">
          <h5>
            {goal.name}
            {progress}
          </h5>
          {goal.description}
          {expiryDate}
        </div>
      </div>
    );
  }

  async function updateGoalList(goals: GoalDataItem[]) {
    let goalsVisible = 0;

    let _visibleGoals: GoalDataItem[] = [];

    for (let goal of goals) {
      let addGoal = true;

      switch (goal.type) {
        case "milestone":
          addGoal = trackingItems.milestones;
          break;
        case "quest":
          addGoal = trackingItems.quests;
          break;
        case "bounty":
          addGoal = trackingItems.bounties;
          break;
        case "characterRecord":
          addGoal = trackingItems.records;
          break;
        case "seasonrank":
          addGoal = trackingItems.seasonRank;
          break;
      }

      if (addGoal) {
        _visibleGoals.push(goal);
        goalsVisible++;
      }
    }

    props.goals.value = _visibleGoals;
    cachedGoals = goals;
  }

  return (
    <div className="goal-container">
      {props.goals?.value?.length > 0 ? (
        props.goals.value.map((goal) => renderGoalItem(goal))
      ) : (
        <>Loading ...</>
      )}
    </div>
  );
}
