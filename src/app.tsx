import { Router } from "preact-router";
import { Fragment } from "preact/jsx-runtime";
import { createHashHistory } from "history";
import "./app.css";
import MainPage from "./pages/main-page";
import Authenticated from "./pages/authenticated";
import Dashboard from "./pages/dashboard";
import { Footer } from "./components/footer";

export function App(props: { authenticated: boolean }) {
  console.log(props);
  return (
    <>
      <header className="header tooltip">Dataverse</header>
      <div class="app">
        <Router history={createHashHistory()}>
          <Fragment path="/">
            <MainPage />
          </Fragment>
          <Fragment path="/authenticated">
            <Authenticated />
          </Fragment>
          <Fragment path="/dashboard">
            <Dashboard />
          </Fragment>
        </Router>
      </div>
      <Footer />
    </>
  );
}
