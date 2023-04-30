import { log } from "./log";
export class Destiny2Database {
  DBInstance: IDBDatabase | null;
  initializeDatabase: () => Promise<void>;
  setItem: (key: string, value: any) => Promise<void>;
  getItem: (key: string, defaultValue?: null) => Promise<any>;
  removeItem: (key: string) => Promise<void>;
  setStorageItem: (
    storageName: string,
    key: string,
    value: any
  ) => Promise<void>;
  getStorageItem: (
    storageName: string,
    key: string,
    defaultValue?: null
  ) => Promise<any>;
  getStorageItems: (storageName: string, filter?: null) => Promise<any>;
  removeStorageItem: (storageName: string, key: string) => Promise<void>;
  constructor() {
    this.DBInstance = null;

    this.initializeDatabase = async function () {
      return new Promise<void>((resolve, reject) => {
        let dbRequest = window.indexedDB.open("destiny2-dataverse", 2);

        dbRequest.onupgradeneeded = function (event) {
          const db = dbRequest.result;

          log("DB", "Old", event.oldVersion, "New", event.newVersion);
          if (event.oldVersion < 1) {
            log(
              "DB",
              "Creating first version of database, since it never existed on this installation."
            );
            const keyValueStore = db.createObjectStore("storage", {
              autoIncrement: false,
              keyPath: "key",
            });

            keyValueStore.createIndex("by_key", "key");
          }
          if (event.oldVersion < 2) {
            log("DB", "Creating object store for player/character activity");

            const playerActivityStore = db.createObjectStore("playerActivity", {
              autoIncrement: false,
              keyPath: "key",
            });

            playerActivityStore.createIndex("by_key", "key");

            const activityDetailsStore = db.createObjectStore(
              "activityDetails",
              {
                autoIncrement: false,
                keyPath: "key",
              }
            );

            activityDetailsStore.createIndex("by_key", "key");
          }
        };

        dbRequest.onsuccess = function (e: any) {
          log("DB", "Loaded database");
          self.DBInstance = e.target.result;

          resolve();
        };

        dbRequest.onerror = function (event) {
          log("DB", "Failed to load database");
          reject(event);
        };
      });
    };

    async function _setItem(storeName: string, key: string, value: any) {
      return new Promise<void>((resolve, reject) => {
        const transaction = self.DBInstance!.transaction(
          storeName,
          "readwrite"
        );
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put({
          key: key,
          value: value,
        });

        request.onsuccess = function () {
          resolve();
        };

        request.onerror = function (event) {
          reject(event);
        };
      });
    }

    async function _getFilteredItems(storeName: string, filter = null) {
      return new Promise((resolve, reject) => {
        const transaction = self.DBInstance!.transaction(storeName, "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = function () {
          const result = request.result;

          if (filter) {
            resolve(result.filter(filter));
          } else {
            resolve(result);
          }
        };

        request.onerror = function (event) {
          reject(event);
        };
      });
    }

    async function _getItem(
      storeName: string,
      key: string,
      defaultValue: any | null = null
    ) {
      return new Promise((resolve, reject) => {
        const transaction = self.DBInstance!.transaction(storeName, "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(key);

        request.onsuccess = function (event: any) {
          if (event.target.result) {
            resolve(event.target.result.value);
          } else {
            resolve(defaultValue);
          }
        };

        request.onerror = function (event) {
          reject(event);
        };
      });
    }

    async function _removeItem(storeName: string, key: string) {
      return new Promise<void>((resolve, reject) => {
        const transaction = self.DBInstance!.transaction(
          storeName,
          "readwrite"
        );
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(key);

        request.onsuccess = function () {
          resolve();
        };

        request.onerror = function (event) {
          reject(event);
        };
      });
    }

    this.setItem = async function (key: string, value: any) {
      return await _setItem("storage", key, value);
    };

    this.getItem = async function (
      key: string,
      defaultValue: any | null = null
    ) {
      return await _getItem("storage", key, defaultValue);
    };

    this.removeItem = async function (key: string) {
      return await _removeItem("storage", key);
    };

    this.setStorageItem = async function (
      storageName: string,
      key: string,
      value: any | null
    ) {
      return await _setItem(storageName, key, value);
    };

    this.getStorageItem = async function (
      storageName,
      key,
      defaultValue = null
    ) {
      return await _getItem(storageName, key, defaultValue);
    };

    this.getStorageItems = async function (storageName: string, filter = null) {
      return await _getFilteredItems(storageName, filter);
    };

    this.removeStorageItem = async function (storageName: string, key: string) {
      return await _removeItem(storageName, key);
    };

    var self = this;

    return this;
  }
}
