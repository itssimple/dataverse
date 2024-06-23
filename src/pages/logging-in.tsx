import { log } from "../scripts/log";

export default function LoggingIn() {
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

    setTimeout(() => {
      setLoadingText("Opening application...");
      eventEmitter.emit("manifests-loaded");
    }, 1000);
  });

  return (
    <>
      <span class="fui body" id="loading-text">
        ...
      </span>
    </>
  );
}
