import { D2AppState } from "../classes/appState";
import { GoalList } from "../components/goalList";

export default function Dashboard(props: D2AppState) {
  const apiClient = window.apiClient;

  if (!props.isAuthenticated.value || !props.isDataLoaded.value) {
    location.href = "/";
    return <></>;
  }

  const userProfile = apiClient.profile.profile;

  return (
    <>
      <GoalList {...props} />
    </>
  );
}
