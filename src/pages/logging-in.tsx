import { log } from "../scripts/log";

export default function LoggingIn() {
  const apiClient = window.apiClient;

  // Check if the user has a valid token and/or is authenticated, if not, redirect to the main page so they can login
  apiClient.checkIfAuthenticated().then(async (result) => {
    if (!result) {
      location.href = "/";
      return;
    }

    log("LOGIN", "Authenticated, checking manifests");

    await apiClient.checkManifestVersion();
  });

  return <>Logging in and checking manifests</>;
}
