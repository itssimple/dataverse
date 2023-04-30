import Router from "preact-router";
import "./app.css";

export function App() {
  return (
    <div class="app">
      <Router>
        <div path="/">
          Main page - {import.meta.env.VITE_BUNGIE_API_AUTHURL}
        </div>
        <div path="/authenticated">Authenticated</div>
      </Router>
    </div>
  );
}
