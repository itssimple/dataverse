import { log } from "./log.js";

class D2Event {
  eventName!: string;
  handler!: CallableFunction;
}

export class EventEmitter {
  eventListeners: D2Event[];
  addEventListener: (eventName: string, eventHandler: any) => void;
  emit: (eventName: string, ...params: any[]) => Promise<unknown>;
  constructor() {
    this.eventListeners = [];

    /**
     * Listen to an event sent from this event emitter
     * @param {String} eventName The event that you want to listen to
     * @param {CallableFunction} eventHandler The method that should run whenever the event occurs
     */
    this.addEventListener = function (
      eventName: string,
      eventHandler: CallableFunction
    ) {
      log(`EVENT:REGISTERED`, eventName);
      this.eventListeners.push({ eventName: eventName, handler: eventHandler });
    };

    /**
     * Triggers an event, that will invoke all listeners
     * @param {String} eventName
     * @param {any[]} params
     */
    this.emit = async function (eventName: string, ...params: any[]) {
      let logArguments = JSON.parse(
        (await window.db.getItem("d2-debugmode")) ?? "false"
      );
      if (logArguments) {
        log("EVENT:EMITTING", eventName, ...params);
      } else {
        log("EVENT:EMITTING", eventName);
      }
      return new Promise((resolve, reject) => {
        this.eventListeners
          .filter((ev) => ev.eventName == eventName)
          .forEach(async (l) => {
            try {
              await l.handler(...params);
            } catch (e) {
              log("EVENT:ERROR", eventName, e);
              console.error(e);
              reject(e);
            }
          });

        resolve(true);
      });
    };

    log("EventEmitter", "Initialized");

    return this;
  }
}
