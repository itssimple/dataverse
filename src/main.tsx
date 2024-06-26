import { render, createContext, Context } from "preact";
import { signal } from "@preact/signals";
import { log } from "./scripts/log";
import { App } from "./app";
import { Destiny2Database } from "./scripts/indexedDB";
import { EventEmitter } from "./scripts/eventEmitter";
import { Destiny2ApiClient } from "./scripts/apiClient";
import "./assets/fonts/style.css";
import "./index.css";
import "./styles/main.scss";
import { D2AppState } from "./classes/appState";

declare global {
  interface Window {
    db: Destiny2Database;
    eventEmitter: EventEmitter;
    apiClient: Destiny2ApiClient;
    appState: Context<D2AppState>;
  }
}

log("MAIN", "Starting app...");

window.eventEmitter = new EventEmitter();
window.db = new Destiny2Database();
window.apiClient = new Destiny2ApiClient(
  import.meta.env.VITE_BUNGIE_API_KEY,
  import.meta.env.VITE_BUNGIE_API_APP
);

function createAppState(): D2AppState {
  const isDataLoaded = signal(false);
  const isAuthenticated = signal(false);
  const goals = signal([]);

  return {
    isDataLoaded,
    isAuthenticated,
    goals,
  };
}

const state = createAppState();

window.appState = createContext(state);
window.db.initializeDatabase().then(async () => {
  log("MAIN", "Database initialized, checking for updates...");

  state.isAuthenticated.value = await window.apiClient.checkIfAuthenticated();

  render(<App />, document.getElementById("app") as HTMLElement);
});
