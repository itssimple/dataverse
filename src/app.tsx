import { Router } from "preact-router";
import { Fragment } from "preact/jsx-runtime";
import { createHashHistory } from "history";
import "./app.css";
import MainPage from "./pages/main-page";
import Authenticated from "./pages/authenticated";
import Dashboard from "./pages/dashboard";
import { Footer } from "./components/footer";
import LoggingIn from "./pages/logging-in";
import { useContext } from "preact/hooks";
import { Header } from "./components/header";

export function App() {
  const state = useContext(window.appState);
  return (
    <>
      <Header />
      <div class="app">
        <Router history={createHashHistory()}>
          <Fragment path="/">
            <MainPage {...state} />
          </Fragment>
          <Fragment path="/authenticated">
            <Authenticated />
          </Fragment>
          <Fragment path="/logging-in">
            <LoggingIn {...state} />
          </Fragment>
          <Fragment path="/dashboard">
            <Dashboard {...state} />
          </Fragment>
        </Router>
      </div>
      <Footer />
    </>
  );
}
