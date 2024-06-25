import { DestinyNamedObject } from "./apiClasses/destinyNamedObject";
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
  loadCommonSettings: () => Promise<any>;
  getUserToken: () => Promise<string | null>;
  getLinkedProfiles: () => Promise<unknown>;
  getUserProfile: (
    membershipId: string,
    membershipType: number
  ) => Promise<unknown>;
  getLastPlayedCharacter: (forceRefresh?: boolean) => Promise<any | null>;

  apiToken: string;
  applicationName: string;
  cachedManifest: any;
  destinyDataDefinition: { [key: string]: any };
  lastVersion: string | null;
  profile: any | null;
  linkedProfiles: any | null;
  getNamedDataObject: (
    forceRefresh?: boolean
  ) => Promise<DestinyNamedObject | null>;
  getPresentationNodeFromHash: (hash: string) => any[];
  mapHashesToDefinitionsInObject: (object: any) => any;

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

    const profileComponents = {
      None: 0,
      Profiles: 100,
      VendorReceipts: 101,
      ProfileInventories: 102,
      ProfileCurrencies: 103,
      ProfileProgression: 104,
      PlatformSilver: 105,
      Characters: 200,
      CharacterInventories: 201,
      CharacterProgressions: 202,
      CharacterRenderData: 203,
      CharacterActivities: 204,
      CharacterEquipment: 205,
      ItemInstances: 300,
      ItemObjectives: 301,
      ItemPerks: 302,
      ItemRenderData: 303,
      ItemStats: 304,
      ItemSockets: 305,
      ItemTalentGrids: 306,
      ItemCommonData: 307,
      ItemPlugStates: 308,
      ItemPlugObjectives: 309,
      ItemReusablePlugs: 310,
      Vendors: 400,
      VendorCategories: 401,
      VendorSales: 402,
      Kiosks: 500,
      CurrencyLookups: 600,
      PresentationNodes: 700,
      Collectibles: 800,
      Records: 900,
      Transitory: 1000,
      Metrics: 1100,
      StringVariables: 1200,
    };

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

      if (body !== null || authorization !== null) {
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

      const contentLength = contentTypeDownload.headers.get("content-length");

      const total = parseInt(contentLength || "0", 10);
      let loaded = 0;

      const res = new Response(
        new ReadableStream({
          async start(controller) {
            const reader = contentTypeDownload.body!.getReader();

            let progressIndication = 0;
            for (;;) {
              var r = await reader!.read();
              if (r!.done) {
                break;
              }
              loaded += r!.value.byteLength;

              progressIndication++;
              if (progressIndication % 30 === 0) {
                eventEmitter.emit(
                  "loading-text",
                  `Loading ${dataTypeWords} (${new Intl.NumberFormat(
                    "sv-SE"
                  ).format(
                    Math.round(
                      (loaded / 1024.0 / 1024.0) * 100 + Number.EPSILON
                    ) / 100
                  )} MB)`
                );
              }
              controller.enqueue(r!.value);
            }

            eventEmitter.emit(
              "loading-text",
              `Loading ${dataTypeWords} (${new Intl.NumberFormat(
                "sv-SE"
              ).format(
                Math.round((loaded / 1024.0 / 1024.0) * 100 + Number.EPSILON) /
                  100
              )} MB)`
            );
            controller.close();
          },
        })
      );

      if (contentTypeDownload.status !== 200) {
        log("Manifest download error", await res.json());
        return;
      }

      const contentTypeJson = await res.json();

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

    this.loadCommonSettings = async function () {
      await refreshTokenIfExpired();

      const settings = await callUrl(
        "GET",
        `${destinyApiUrl}/Settings`,
        null,
        await this.getUserToken()
      );
      if (settings.status === 200) {
        return await settings.json();
      }

      _log(
        "Error fetching common settings",
        settings.status,
        settings.statusText
      );
      return null;
    };

    this.getUserToken = async function () {
      return await db.getItem("destinyToken");
    };

    this.getLinkedProfiles = async function () {
      await refreshTokenIfExpired();

      return new Promise(async (resolve, reject) => {
        var bnetMemberId = await db.getItem("destinyBungieMembershipId");

        let linkedProfile = await callUrl(
          "GET",
          `${destinyApiUrl}/Destiny2/-1/Profile/${bnetMemberId}/LinkedProfiles/`,
          null,
          await this.getUserToken()
        );

        if (linkedProfile.status === 200) {
          let profiles = await linkedProfile.json();

          db.setItem(
            "destiny-linkedProfiles",
            JSON.stringify(profiles.Response)
          );

          self.linkedProfiles = profiles.Response;

          resolve(profiles.Response);
        } else {
          self.refreshToken();
          reject(linkedProfile);
        }
      });
    };

    this.getUserProfile = async function (
      membershipId: string,
      membershipType: number
    ) {
      let interestingComponents = [
        profileComponents.Profiles,
        profileComponents.ProfileInventories,
        profileComponents.ProfileCurrencies,
        profileComponents.ProfileProgression,
        profileComponents.Characters,
        profileComponents.CharacterInventories,
        profileComponents.CharacterProgressions,
        profileComponents.CharacterActivities,
        profileComponents.CharacterEquipment,
        profileComponents.ItemInstances,
        profileComponents.ItemObjectives,
        profileComponents.ItemSockets,
        profileComponents.ItemTalentGrids,
        profileComponents.ItemCommonData,
        profileComponents.ItemPlugStates,
        profileComponents.ItemPlugObjectives,
        profileComponents.ItemReusablePlugs,
        profileComponents.Metrics,
        profileComponents.Records,
        profileComponents.Collectibles,
        profileComponents.StringVariables,
      ];

      await refreshTokenIfExpired();

      return new Promise(async (resolve, reject) => {
        let userProfile = await callUrl(
          "GET",
          `${destinyApiUrl}/Destiny2/${membershipType}/Profile/${membershipId}/?components=${interestingComponents.join(
            ","
          )}`,
          null,
          await this.getUserToken()
        );
        if (userProfile.status === 200) {
          let profile = await userProfile.json();

          db.setItem("destiny-profile", JSON.stringify(profile.Response));
          self.profile = profile.Response;

          resolve(profile.Response);
        } else {
          self.refreshToken();
          reject(userProfile);
        }
      });
    };

    this.getLastPlayedCharacter = async function (forceRefresh = false) {
      await refreshTokenIfExpired();

      let _profile = self.profile;

      if (forceRefresh) {
        _profile = null;
      }

      if (self.linkedProfiles === null) {
        return null;
      }

      await self.getLinkedProfiles();

      if (
        self.linkedProfiles !== null &&
        self.linkedProfiles.profiles !== null &&
        self.linkedProfiles.profiles.length > 0
      ) {
        var primaryMembership = self.linkedProfiles.profiles.sort(
          (a: any, b: any) => (a.dateLastPlayed > b.dateLastPlayed ? -1 : 1)
        )[0];

        _profile = await self.getUserProfile(
          primaryMembership.membershipId,
          primaryMembership.membershipType
        );
      }

      let characters = [];

      for (let char of _profile.profile.data.characterIds) {
        characters.push(_profile.characters.data[char]);
      }

      let _last = characters.sort((a, b) =>
        a.dateLastPlayed > b.dateLastPlayed ? -1 : 1
      )[0];

      let lastPlayedCharacter = {
        characterInfo: _last,
        characterProgression: !!!_profile.characterProgressions.disabled
          ? _profile.characterProgressions.data[_last.characterId]
          : {},
        characterActivities: !!!_profile.characterActivities.disabled
          ? _profile.characterActivities.data[_last.characterId]
          : {},
        characterUninstancedItemComponents:
          _profile.characterUninstancedItemComponents[_last.characterId]
            .objectives.data,
        characterInventory:
          _profile.characterInventories.data[_last.characterId].items,
        characterEquipment:
          _profile.characterEquipment.data[_last.characterId].items,
        characterPlugSets: !!!_profile.characterPlugSets.disabled
          ? _profile.characterPlugSets.data[_last.characterId].plugs
          : {},
        characterCollectibles:
          _profile.characterCollectibles.data[_last.characterId].collectibles,
        characterRecords: _profile.characterRecords.data[_last.characterId],
        characterStringVariables:
          _profile.characterStringVariables.data[_last.characterId],
        profileProgression: _profile.profileProgression.data,
        metrics: _profile.metrics.data.metrics,
        itemComponents: _profile.itemComponents,
        records: _profile.profileRecords.data,
        profileInventory: _profile.profileInventory.data.items,
        profileCurrency: _profile.profileCurrencies.data.items,
        profilePlugSets: !!!_profile.profilePlugSets.disabled
          ? _profile.profilePlugSets.data.plugs
          : {},
        profileCollectibles: _profile.profileCollectibles.data,
        profile: _profile.profile.data,
        profileStringVariables: _profile.profileStringVariables.data,
      };

      return lastPlayedCharacter;
    };

    this.getNamedDataObject = async function (
      forceRefresh = false
    ): Promise<DestinyNamedObject | null> {
      let _lastPlayer = await self.getLastPlayedCharacter(forceRefresh);

      if (_lastPlayer == null) {
        return null;
      }

      let namedDataObject = {
        ..._lastPlayer,
      };

      for (let statKey of Object.keys(namedDataObject.characterInfo.stats)) {
        namedDataObject.characterInfo.stats[statKey] = {
          statValue: namedDataObject.characterInfo.stats[statKey],
          statHash: statKey,
        };
      }

      for (let metricKey of Object.keys(namedDataObject.metrics)) {
        namedDataObject.metrics[metricKey] = {
          ...namedDataObject.metrics[metricKey],
          metricHash: metricKey,
        };
      }

      for (let recordKey of Object.keys(namedDataObject.records.records)) {
        namedDataObject.records.records[recordKey] = {
          ...namedDataObject.records.records[recordKey],
          recordHash: recordKey,
          parentNodeHashes:
            self.destinyDataDefinition.DestinyRecordDefinition[recordKey]
              .parentNodeHashes,
        };
      }

      for (let recordKey of Object.keys(
        namedDataObject.characterRecords.records
      )) {
        namedDataObject.characterRecords.records[recordKey] = {
          ...namedDataObject.characterRecords.records[recordKey],
          recordHash: recordKey,
          parentNodeHashes:
            self.destinyDataDefinition.DestinyRecordDefinition[recordKey]
              .parentNodeHashes,
        };
      }

      namedDataObject = self.mapHashesToDefinitionsInObject(namedDataObject);

      const cacheBreaker = await db.getItem("destiny2-use-cachebreaker", false);
      if (cacheBreaker) {
        const lockableItems = _lastPlayer.characterInventory.filter(
          (i: any) => i.lockable && i.inventoryitemItemType == 3
        );

        if (lockableItems.length > 0) {
          // await self.lockItem(
          //   _lastPlayer.characterInfo.membershipType,
          //   _lastPlayer.characterInfo.characterId,
          //   lockableItems[0].itemInstanceId,
          //   lockableItems[0].state & DestinyItemState.Locked
          // );
        }
      }

      eventEmitter.emit("destiny2-api-update", namedDataObject);

      return namedDataObject;
    };

    this.getPresentationNodeFromHash = function (hash: string) {
      const presentationNameArray = [];

      const presentationNode =
        self.destinyDataDefinition.DestinyPresentationNodeDefinition[hash];
      if (presentationNode) {
        presentationNameArray.unshift({
          name: presentationNode.displayProperties.name,
          description: presentationNode.displayProperties.description,
          icon: presentationNode.displayProperties.icon,
          hash: hash,
        });

        if (presentationNode.parentNodeHashes) {
          for (let _hash of presentationNode.parentNodeHashes) {
            const subItems = self.getPresentationNodeFromHash(_hash);
            for (let item of subItems) {
              presentationNameArray.push(item);
            }
          }
        }
      }

      return presentationNameArray;
    };

    this.mapHashesToDefinitionsInObject = function (object: any) {
      let _objectCopy = { ...object };

      let keys = Object.keys(_objectCopy);
      for (let key of keys) {
        let _type = typeof _objectCopy[key];
        let _field = _objectCopy[key];

        if (Array.isArray(_field)) {
          for (let x = 0; x < _field.length; x++) {
            let arrItem = _field[x];
            if (typeof arrItem === "object") {
              _field[x] = self.mapHashesToDefinitionsInObject(arrItem);
            } else {
              _field[x] = arrItem;
            }
          }
          _objectCopy[key] = _field;
        } else if (_type === "object" && _field !== null) {
          _objectCopy[key] = self.mapHashesToDefinitionsInObject(
            _objectCopy[key]
          );
        } else {
          if (key.indexOf("Hash") > -1 && !Array.isArray(_field)) {
            let _hashType = key
              .split("Hash")[0]
              .replace("current", "")
              .toLowerCase();

            switch (_hashType) {
              case "item":
              case "plugitem":
                _hashType = "inventoryitem";
                break;
            }

            let dataType = destinyDataTypes.find(
              (i) =>
                i.toLowerCase() == `Destiny${_hashType}Definition`.toLowerCase()
            );
            let definitionData = self.destinyDataDefinition[dataType!];
            if (
              definitionData &&
              definitionData[_field] &&
              definitionData[_field].displayProperties
            ) {
              const dField = definitionData[_field];
              if (
                dField.displayProperties.name &&
                dField.displayProperties.name.length > 0
              ) {
                _objectCopy[`${_hashType}Name`] = dField.displayProperties.name;
              } else if (
                dField.setData &&
                dField.setData.questLineName &&
                dField.setData.questLineName.length > 0
              ) {
                _objectCopy[`${_hashType}Name`] = dField.setData.questLineName;
              }

              if (
                dField.displayProperties.description &&
                dField.displayProperties.description.length > 0
              ) {
                _objectCopy[`${_hashType}Description`] =
                  dField.displayProperties.description;
              }

              if (
                dField.displayProperties.icon &&
                dField.displayProperties.icon.length > 0
              ) {
                _objectCopy[`${_hashType}Icon`] = dField.displayProperties.icon;
              }

              if (
                dField.progressDescription &&
                dField.progressDescription.length > 0
              ) {
                _objectCopy[`${_hashType}ProgressDescription`] =
                  dField.progressDescription;
              }

              if (typeof dField.inProgressValueStyle !== "undefined") {
                _objectCopy[`${_hashType}InProgressValueStyle`] =
                  dField.inProgressValueStyle;
              }

              if (typeof dField.completedValueStyle !== "undefined") {
                _objectCopy[`${_hashType}CompletedValueStyle`] =
                  dField.completedValueStyle;
              }

              if (typeof dField.itemType !== "undefined") {
                _objectCopy[`${_hashType}ItemType`] = dField.itemType;
              }

              if (typeof dField.parentNodeHashes !== "undefined") {
                _objectCopy[`parentNodeHashes`] = dField.parentNodeHashes.map(
                  (item: any) => {
                    return self.getPresentationNodeFromHash(item);
                  }
                );
              }
            }
          }

          _objectCopy[key] = _field;
        }
      }

      return _objectCopy;
    };

    let self = this;

    _log("Initialized");
    return this;
  }
}
