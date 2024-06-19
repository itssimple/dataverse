import { log } from "./log";

export class Destiny2ApiClient {
  checkIfAuthenticated: () => Promise<boolean>;
  getToken: (state: string, code: string) => Promise<any>;
  refreshToken: () => Promise<any>;
  checkManifestVersion: () => Promise<unknown>;

  apiToken: string;
  applicationName: string;

  constructor(apiToken: string, appName: string) {
    log("Destiny2ApiClient", "Initializing");

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

    this.applicationName = appName;

    this.apiToken = apiToken;

    function _log(...params: any[]) {
      log("Destiny2ApiClient", params);
    }

    async function callUrl(
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
      url: string,
      body: any | null = null,
      authorization: any | null = null
    ) {
      if (body !== null) {
        return await fetch(url, {
          method: method,
          headers: {
            "x-api-key": self.apiToken,
            authorization:
              authorization != null ? `Bearer ${authorization}` : "",
            "Content-Type": "application/json",
          },
          body: body,
        });
      } else {
        return await fetch(url, {
          method: method,
          headers: {
            "x-api-key": self.apiToken,
            authorization:
              authorization != null ? `Bearer ${authorization}` : "",
          },
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

    this.checkManifestVersion = async () => {};

    let self = this;

    _log("Initialized");
    return this;
  }
}
