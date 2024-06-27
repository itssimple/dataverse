import { D2AppState } from "../classes/appState";

export default function MainPage(props: D2AppState) {
  if (props.isAuthenticated.value) {
    location.href = "/#/logging-in";
    return <></>;
  }

  return (
    <>
      Main page -{" "}
      <a
        href={
          import.meta.env.VITE_BUNGIE_API_AUTHURL +
          "?state=dataverse-" +
          new Date().getTime()
        }
      >
        Log in
      </a>
    </>
  );
}
