import { Signal } from "@preact/signals";

export type D2AppState = {
  isAuthenticated: Signal<boolean>;
  isDataLoaded: Signal<boolean>;
};
