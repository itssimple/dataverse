import { log } from "./log";

export class Destiny2ApiClient {
  checkIfAuthenticated: () => Promise<boolean>;
  getToken: (state: string, code: string) => Promise<any>;
  refreshToken: () => Promise<any>;
  checkManifestVersion: () => Promise<{
    updatedManifest: boolean;
    version: string | null;
  } | null>;
  checkStoredDefinitions: (
    downloadMissingDefinitions?: boolean
  ) => Promise<string[]>;
  loadDestinyContentData: (definitions: string[]) => Promise<void>;
  loadDataFromStorage: () => Promise<void>;
  getManifest: () => Promise<{
    Response: any;
  } | null>;

  apiToken: string;
  applicationName: string;
  cachedManifest: any;
  destinyDataDefinition: { [key: string]: any };
  lastVersion: string | null;
  profile: any | null;
  linkedProfiles: any | null;

  constructor(apiToken: string, appName: string) {
    _log("Initializing");

    const db = window.db;
    const eventEmitter = window.eventEmitter;

    const authGatewayUrl = "https://o2g.itssimple.se";
    const destinyBaseUrl = "https://www.bungie.net";
    const destinyApiUrl = "https://www.bungie.net/Platform";

    const maxActivitiesPerFetch = 250;

    /**
     * @description The datatypes we are interested in.
     */
    const destinyDataTypes = [
      "DestinyActivityTypeDefinition",
      "DestinyActivityDefinition",
      "DestinyArtifactDefinition",
      "DestinyChecklistDefinition",
      "DestinyClassDefinition",
      "DestinyDestinationDefinition",
      "DestinyDamageTypeDefinition",
      "DestinyFactionDefinition",
      "DestinyGenderDefinition",
      "DestinyItemCategoryDefinition",
      "DestinyItemTierTypeDefinition",
      "DestinyInventoryBucketDefinition",
      "DestinyInventoryItemDefinition",
      "DestinyMedalTierDefinition",
      "DestinyMetricDefinition",
      "DestinyMilestoneDefinition",
      "DestinyObjectiveDefinition",
      "DestinyPlaceDefinition",
      "DestinyPresentationNodeDefinition",
      "DestinyProgressionDefinition",
      "DestinyRaceDefinition",
      "DestinyRecordDefinition",
      "DestinySeasonDefinition",
      "DestinySeasonPassDefinition",
      "DestinyStatDefinition",
      "DestinyTraitDefinition",
    ];

    const DestinyItemState = {
      None: 0,
      Locked: 1,
      Tracked: 2,
      Masterwork: 4,
    };

    this.lastVersion = null;

    this.applicationName = appName;

    this.apiToken = apiToken;

    this.destinyDataDefinition = {};

    function _log(...params: any[]) {
      log("D2API", params);
    }

    async function callUrl(
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
      url: string,
      body: any | null = null,
      authorization: any | null = null
    ) {
      let headers: RequestInit["headers"] = {};

      if (body !== null) {
        headers["Content-Type"] = "application/json";
        headers["x-api-key"] = self.apiToken;
        if (authorization !== null) {
          headers.authorization = `Bearer ${authorization}`;
        }
      }

      if (body !== null) {
        return await fetch(url, {
          method: method,
          headers: headers,
          body: body,
        });
      } else {
        return await fetch(url, {
          method: method,
          headers: headers,
        });
      }
    }

    async function refreshTokenIfExpired() {
      const tokenExpires = await db.getItem("destinyTokenExpires");

      if (tokenExpires < Date.now()) {
        _log("Token expired, refreshing");
        await self.refreshToken();
      }
    }

    function handleTokenResponse(tokenResponse: any) {
      // Check if tokenResponse contains a property called error, and if so, log the error and return
      if (tokenResponse.error) {
        _log("Error handling token", JSON.stringify(tokenResponse));

        db.removeItem("destinyToken");
        db.removeItem("destinyRefreshToken");
        db.removeItem("destinyTokenExpires");
        db.removeItem("destinyRefreshTokenExpires");
        db.removeItem("destinyBungieMembershipId");

        return false;
      }

      // Set the token and refresh token in the database
      db.setItem("destinyToken", tokenResponse.access_token);
      db.setItem("destinyRefreshToken", tokenResponse.refresh_token);

      // Calculate when the token expires and set it in the database
      let tokenExpires = Date.now() + tokenResponse.expires_in * 1000;
      db.setItem("destinyTokenExpires", tokenExpires);

      // Calculate when the refresh token expires and set it in the database
      let refreshTokenExpires =
        Date.now() + tokenResponse.refresh_expires_in * 1000;
      db.setItem("destinyRefreshTokenExpires", refreshTokenExpires);

      // Set the membership_id in the database
      db.setItem("destinyBungieMembershipId", tokenResponse.membership_id);

      return true;
    }

    this.loadDataFromStorage = async () => {
      _log("Loading data from storage");

      let _cachedManifest = await db.getItem("manifest");
      if (_cachedManifest !== null) {
        self.cachedManifest = JSON.parse(_cachedManifest);
      }

      let _cachedManifestVersion = await db.getItem("manifestVersion");
      if (_cachedManifestVersion !== null) {
        self.lastVersion = _cachedManifestVersion;
      }

      self.checkStoredDefinitions();

      for (let dataType of destinyDataTypes) {
        let _cachedData = await db.getItem(`destinyContent-${dataType}`);
        if (_cachedData !== null) {
          self.destinyDataDefinition[dataType] = JSON.parse(_cachedData);
        }
      }

      let _profile = await db.getItem("destiny-profile");
      if (_profile !== null) {
        self.profile = JSON.parse(_profile);
      }

      let _linkedProfiles = await db.getItem("destiny-linkedProfiles");
      if (_linkedProfiles !== null) {
        self.linkedProfiles = JSON.parse(_linkedProfiles);
      }

      _log("Data loaded from storage");
      eventEmitter.emit("destiny-data-loaded");
    };

    this.checkIfAuthenticated = async () => {
      try {
        await refreshTokenIfExpired();
        const isAuthenticated = (await db.getItem("destinyToken")) !== null;
        eventEmitter.emit("destiny2:authenticated", isAuthenticated);
        return isAuthenticated;
      } catch (e) {
        _log("Error checking if authenticated", e);
        eventEmitter.emit("destiny2:authenticated", false);
        return false;
      }
    };

    this.getToken = async (state: string, code: string) => {
      const tokenRequest = await callUrl(
        "POST",
        `${authGatewayUrl}/token/${self.applicationName}`,
        JSON.stringify({
          code: code,
        })
      );

      if (tokenRequest.status === 200) {
        let tokenResponse = await tokenRequest.json();

        if (handleTokenResponse(tokenResponse)) {
          eventEmitter.emit("destiny2:auth-success");
        } else {
          eventEmitter.emit("destiny2:auth-failed");
        }
        return tokenResponse;
      }
      _log(
        "Error getting token",
        tokenRequest.status,
        tokenRequest.statusText,
        await tokenRequest.text()
      );
      eventEmitter.emit("destiny2:auth-failed");
    };

    this.refreshToken = async () => {
      const refreshToken = await db.getItem("destinyRefreshToken");
      if (refreshToken == null) {
        eventEmitter.emit("destiny2:refreshToken", null);
        return null;
      }

      const tokenRequest = await callUrl(
        "POST",
        `${authGatewayUrl}/refresh/${self.applicationName}`,
        JSON.stringify({
          refresh_token: refreshToken,
        })
      );

      if (tokenRequest.status === 200) {
        let tokenResponse = await tokenRequest.json();

        if (handleTokenResponse(tokenResponse)) {
          eventEmitter.emit("destiny2:refresh-success");
        } else {
          eventEmitter.emit("destiny2:refresh-failed");
        }

        return;
      } else {
        eventEmitter.emit("destiny2:refresh-failed");
      }
    };

    this.checkManifestVersion = async () => {
      _log("Checking manifest version");
      return new Promise(async function (resolve, reject) {
        let manifest = await self.getManifest();

        if (manifest == null) {
          _log("Failed to fetch API");
          return null;
        }

        let lastVersion = (await db.getItem("manifestVersion")) ?? "null";

        console.log(manifest, lastVersion);
        if (manifest.Response.version !== lastVersion) {
          /* Currently cached data is older than 60 minutes, so we clear it. */
          await db.removeItem("lastManifestUpdate");
          await db.removeItem("manifest");
          await db.removeItem("manifestVersion");

          for (let dataType of destinyDataTypes) {
            await db.removeItem(`destinyContent-${dataType}`);
          }

          self.cachedManifest = manifest.Response;

          await db.setItem("manifestVersion", manifest.Response.version);
          await db.setItem("manifest", JSON.stringify(self.cachedManifest));
          await db.setItem("lastManifestUpdate", Date.now());

          resolve({ updatedManifest: true, version: self.lastVersion });
          _log("Manifest updated");
          return;
        }

        self.cachedManifest = manifest.Response;

        resolve({ updatedManifest: false, version: self.lastVersion });
        _log("Manifest version is up to date");
      });
    };

    this.checkStoredDefinitions = async function (
      downloadMissingDefinitions = true
    ) {
      let missingDefinitions: string[] = [];

      for (let dataType of destinyDataTypes) {
        let data = await db.getItem(`destinyContent-${dataType}`);
        if (data === null) {
          missingDefinitions.push(dataType);
        }
      }

      if (missingDefinitions.length > 0 && downloadMissingDefinitions) {
        for (let dataType of missingDefinitions) {
          await db.removeItem(`destinyContent-${dataType}`);
        }

        await self.loadDestinyContentData(missingDefinitions);
      }

      return missingDefinitions;
    };

    this.loadDestinyContentData = async function (definitions: string[] = []) {
      for (let dataType of definitions) {
        await loadDestinyContentDataType(dataType);
      }
    };

    async function loadDestinyContentDataType(dataType: string) {
      let manifest = self.cachedManifest;

      const dataTypeWords = dataType
        .replace("Destiny", "")
        .split(/(?=[A-Z])/)
        .join(" ");

      eventEmitter.emit("loading-text", `Loading ${dataTypeWords}`);

      const contentTypeDownload = await callUrl(
        "GET",
        `${destinyBaseUrl}${manifest.jsonWorldComponentContentPaths.en[dataType]}`
      );

      if (contentTypeDownload.status !== 200) {
        log("Manifest download error", await contentTypeDownload.json());
        return;
      }

      const contentTypeJson = await contentTypeDownload.json();

      self.destinyDataDefinition[dataType] = contentTypeJson;
      db.setItem(`destinyContent-${dataType}`, JSON.stringify(contentTypeJson));
    }

    this.getManifest = async function (): Promise<{
      Response: any;
    } | null> {
      let lastManifestUpdate = await db.getItem("lastManifestUpdate");
      _log("Checking if manifest is cached");

      if (
        lastManifestUpdate !== null &&
        Date.now() - lastManifestUpdate < 60000 * 60
      ) {
        let _manifest = await db.getItem("manifest");
        if (_manifest !== null) {
          _log("Manifest is cached");
          return { Response: JSON.parse(_manifest) };
        }
      }

      let manifestRequest = await callUrl(
        "GET",
        `${destinyApiUrl}/Destiny2/Manifest/`
      );

      if (manifestRequest.status === 200) {
        let manifest = await manifestRequest.json();
        if (manifest.ErrorStatus == "Success") {
          db.setItem("lastManifestUpdate", Date.now());
          db.setItem("manifest", JSON.stringify(manifest.Response));
          _log("Manifest updated from API");

          return { Response: manifest.Response };
        } else {
          _log("Manifesterror");
          _log(manifest.Response);

          return null;
        }
      } else {
        let responseText = manifestRequest.json();
        _log("Error when fetching Manifest");
        _log(responseText);

        return null;
      }
    };

    let self = this;

    _log("Initialized");
    return this;
  }
}
