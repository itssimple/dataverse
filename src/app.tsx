import { Router } from "preact-router";
import { Fragment } from "preact/jsx-runtime";
import { createHashHistory } from "history";
import "./app.css";
import MainPage from "./pages/main-page";

export function App() {
  return (
    <>
      <header className="header tooltip">Dataverse</header>
      <div class="app">
        <Router history={createHashHistory()}>
          <Fragment path="/">
            <MainPage />
          </Fragment>
          <div path="/authenticated">Authenticated</div>
        </Router>
      </div>
      <footer className="fui body fiction">© 2023 NoLifeKing85#2914</footer>
    </>
  );
}
