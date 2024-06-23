import { D2AppState } from "../classes/appState";

export default function Dashboard(props: D2AppState) {
  const apiClient = window.apiClient;

  if (!props.isAuthenticated.value) {
    location.href = "/";
    return <></>;
  }

  if (!props.isDataLoaded.value) {
    location.href = "/#/logging-in";
    return <></>;
  }

  return <>Blep</>;
}
