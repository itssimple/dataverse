import { render } from "preact";
import { log } from "./scripts/log";
import { App } from "./app";
import { Destiny2Database } from "./scripts/indexedDB";
import "./assets/fonts/style.css";
import "./index.css";
import "./styles/main.scss";

declare global {
  interface Window {
    db: Destiny2Database;
  }
}

window.db = new Destiny2Database();

log("MAIN", "Starting app...");

window.db.initializeDatabase();

render(<App />, document.getElementById("app") as HTMLElement);
