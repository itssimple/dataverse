import { getCurrentUrl } from "preact-router";
import { log } from "../scripts/log";

export default function Authenticated() {
  const apiClient = window.apiClient;

  const url = getCurrentUrl();
  log("Auth", "Authenticated page, getting code", url);
  const authUrl = new URL(url, location.origin).searchParams;

  const code = authUrl.get("code");

  log("Auth", "Code", code);

  if (!code) {
    log("Auth", "No code found, redirecting to main page");
    location.href = "/";
    return <>Redirecting to main page</>;
  }

  apiClient
    .getToken("", code)
    .then(() => {
      log("Auth", "Got token, redirecting to dashboard");
      location.href = "/#/dashboard";
    })
    .catch((err) => {
      log("Auth", "Failed to get token, redirecting to main page");
      location.href = "/";
    });

  return <>Authenticated, redirecting to Dashboard</>;
}
