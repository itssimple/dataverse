import { Router } from "preact-router";
import "./app.css";
import MainPage from "./pages/main-page";

export function App() {
  return (
    <div class="app">
      <Router>
        <div path="/">
          <MainPage />
        </div>
        <div path="/authenticated">Authenticated</div>
      </Router>
    </div>
  );
}
