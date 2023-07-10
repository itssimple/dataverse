import { render } from "preact";
import { log } from "./scripts/log";
import { App } from "./app";
import { Destiny2Database } from "./scripts/indexedDB";
import { EventEmitter } from "./scripts/eventEmitter";
import { Destiny2ApiClient } from "./scripts/apiClient";
import "./assets/fonts/style.css";
import "./index.css";
import "./styles/main.scss";

declare global {
  interface Window {
    db: Destiny2Database;
    eventEmitter: EventEmitter;
    apiClient: Destiny2ApiClient;
  }
}

log("MAIN", "Starting app...");

window.eventEmitter = new EventEmitter();
window.db = new Destiny2Database();
window.apiClient = new Destiny2ApiClient(
  import.meta.env.VITE_BUNGIE_API_KEY,
  import.meta.env.VITE_BUNGIE_API_APP
);

window.db.initializeDatabase().then(async () => {
  log("MAIN", "Database initialized, checking for updates...");

  // Check if the user is authenticated or not
  const isAuthenticated = await window.apiClient.checkIfAuthenticated();

  render(
    <App authenticated={isAuthenticated} />,
    document.getElementById("app") as HTMLElement
  );
});
