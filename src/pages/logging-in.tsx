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
  apiClient
    .checkIfAuthenticated()
    .then(async (result) => {
      if (!result) {
        location.href = "/";
        return;
      }

      log("LOGIN", "Authenticated, checking manifests");

      setLoadingText("Checking manifest ...");
      let manifestVersion = await apiClient.checkManifestVersion();

      if (manifestVersion === null || manifestVersion === undefined) {
        setLoadingText(
          "Something is wrong with Destiny 2 (or this app), please reload the page."
        );
        return;
      }

      log("LOGIN", manifestVersion);

      setLoadingText("Loading profile data");

      await apiClient.getLastPlayedCharacter();

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

      props.isDataLoaded.value = true;

      setTimeout(() => {
        setLoadingText("Opening application...");
        eventEmitter.emit("manifests-loaded");

        setTimeout(() => {
          location.href = "/#/dashboard";
        }, 1000);
      }, 1000);
    })
    .catch(async (error) => {
      if (error.status === 503) {
        // Bungie API is down
        setLoadingText("Bungie API is down, retrying in a minute.");
        setTimeout(() => {
          location.href = "/";
        }, 60000);
      } else {
        setLoadingText(
          "An error occurred while trying to log in, please try again."
        );

        console.error(error);
        console.error(await error.json());
      }
      //location.href = "/";
    });

  return (
    <>
      <span class="fui body" id="loading-text">
        Logging in and loading data ...
      </span>
    </>
  );
}
