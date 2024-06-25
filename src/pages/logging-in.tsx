import { Signal } from "@preact/signals";
import { log } from "../scripts/log";
import { D2AppState } from "../classes/appState";

export default function LoggingIn(props: D2AppState) {
  const apiClient = window.apiClient;

  const eventEmitter = window.eventEmitter;

  eventEmitter.addEventListener("loading-text", (data: any) => {
    if (!!data) {
      setLoadingText(data);
    }
  });

  function setLoadingText(text: string) {
    let loadingText = document.getElementById("loading-text");
    if (loadingText) {
      loadingText.innerText = text;
    }
  }

  // Check if the user has a valid token and/or is authenticated, if not, redirect to the main page so they can login
  apiClient.checkIfAuthenticated().then(async (result) => {
    if (!result) {
      location.href = "/";
      return;
    }

    log("LOGIN", "Authenticated, checking manifests");

    setLoadingText("Checking manifest ...");
    let manifestVersion = await apiClient.checkManifestVersion();

    if (manifestVersion === null || manifestVersion === undefined) {
      setLoadingText(
        "Something is wrong with Destiny 2, please reload the page."
      );
      return;
    }

    log("LOGIN", manifestVersion);

    setLoadingText("Loading profile data");

    await apiClient.getLinkedProfiles();

    setLoadingText("Checking for missing definitions");

    let missingDefinitions = await apiClient.checkStoredDefinitions(false);

    if (missingDefinitions.length > 0) {
      setLoadingText(
        `Downloading ${missingDefinitions.length} missing definition(s)`
      );
      await apiClient.checkStoredDefinitions(true);
    }

    setLoadingText("Loading data...");
    await apiClient.loadDataFromStorage();
    setLoadingText("Loading data... done");

    props.isDataLoaded.value = true;

    setTimeout(() => {
      setLoadingText("Opening application...");
      eventEmitter.emit("manifests-loaded");

      setTimeout(() => {
        location.href = "/#/dashboard";
      }, 1000);
    }, 1000);
  });

  return (
    <>
      <span class="fui body" id="loading-text">
        Logging in and loading data ...
      </span>
    </>
  );
}
