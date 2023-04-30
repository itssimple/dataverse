import { render } from "preact";
import { log } from "./scripts/log";
import { App } from "./app";
import "./index.css";

log("MAIN", "Starting app...");

render(<App />, document.getElementById("app") as HTMLElement);
