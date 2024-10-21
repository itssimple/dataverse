var _=Object.defineProperty;var U=(f,u,b)=>u in f?_(f,u,{enumerable:!0,configurable:!0,writable:!0,value:b}):f[u]=b;var g=(f,u,b)=>(U(f,typeof u!="symbol"?u+"":u,b),b);import{o as D,_ as V,R as F,p as G,q as J,D as K,c as Q,F as z,B as W,d as E}from"./vendor-2a203f4d.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const y of n)if(y.type==="childList")for(const p of y.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function b(n){const y={};return n.integrity&&(y.integrity=n.integrity),n.referrerPolicy&&(y.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?y.credentials="include":n.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function r(n){if(n.ep)return;n.ep=!0;const y=b(n);fetch(n.href,y)}})();function T(f,...u){window.showDataverseLogs&&console.log(`[${f}]`,JSON.stringify([...u]))}function Y(f){return f.isAuthenticated.value?(location.href="/#/logging-in",D(V,{})):D(V,{children:["Main page -"," ",D("a",{href:"https://o2g.itssimple.se/authenticate/everversedata?state=dataverse-"+new Date().getTime(),children:"Log in"})]})}function Z(){const f=window.apiClient,u=F();T("Auth","Authenticated page, getting code",u);const r=new URL(u,location.origin).searchParams.get("code");return r?(f.getToken("",r).then(()=>{T("Auth","Got token, redirecting to dashboard"),location.href="/#/logging-in"}).catch(n=>{T("Auth","Failed to get token, redirecting to main page"),location.href="/"}),D(V,{children:"Authenticated, redirecting to Dashboard"})):(T("Auth","No code found, redirecting to main page"),location.href="/",D(V,{children:"Redirecting to main page"}))}function X(f,u,b=!1){return!b&&!u?"Unknown, no end time":te(ie(f,u))}function ee(f,u,b){let r=[];return f>0&&r.push(`${f}d`),u>0&&r.push(`${u}h`),b>0&&r.push(`${b}m`),r.join(", ")}function te(f){let{days:u,hours:b,minutes:r}=ne(f);return ee(u,b,r)}function ie(f,u){return u||(u=Date.now()),(u-f)/1e3}function ne(f){let u=Math.floor(f/86400),b=Math.floor(f%(24*3600)/3600),r=Math.floor(f%3600/60),n=Math.floor(f%60);return{days:u,hours:b,minutes:r,seconds:n}}const M=new Intl.NumberFormat,se="https://www.bungie.net";var R={milestones:!0,bounties:!0,quests:!0,records:!0,seasonRank:!0};function ae(f){var o,d;const u=window.eventEmitter,b=window.apiClient;var r;G(()=>{u.addEventListener("goal-list-update",p),async function(){return await b.getTrackableData(),r=setInterval(async()=>{await b.getTrackableData()},15*1e3),()=>{clearInterval(r)}}()},[]);function n(e){let i=null;switch(e.inProgressValueStyle===0&&e.nextLevelAt===1&&(e.inProgressValueStyle=2),e.inProgressValueStyle){case 2:i=D("span",{className:"goal-progress",children:e.progressToNextLevel==0?"Incomplete":"Complete"});break;case 3:let a=(e.progressToNextLevel/e.nextLevelAt*100).toFixed(0);i=D("span",{className:"goal-progress",children:[a," %"]});break;case 8:i="";break;case 12:i=D("span",{className:"goal-progress",children:[e.progressToNextLevel," %"]});break;case 6:default:i=D("span",{className:"goal-progress",children:[M.format(e.progressToNextLevel)," /"," ",M.format(e.nextLevelAt)]});break}return typeof e.nextLevelAt<"u"?D(V,{children:i}):null}function y(e){let i=typeof e.icon<"u"?D("img",{className:"goal-icon",src:`${se}${e.icon}`}):null,a=typeof e.endDate<"u"?D(V,{children:[D("br",{}),D("i",{class:"fui body fiction goal-end",children:["Ends in ",X(new Date,new Date(e.endDate))]})]}):null,m=n(e);return D("div",{className:"goal-item",children:[i,D("div",{className:"goal-body",children:[D("h5",{children:[e.name,m]}),e.description,a]})]})}async function p(e){let i=[];for(let a of e){let m=!0;switch(a.type){case"milestone":m=R.milestones;break;case"quest":m=R.quests;break;case"bounty":m=R.bounties;break;case"characterRecord":m=R.records;break;case"seasonrank":m=R.seasonRank;break}m&&i.push(a)}f.goals.value=i}return D("div",{className:"goal-container",children:((d=(o=f.goals)==null?void 0:o.value)==null?void 0:d.length)>0?f.goals.value.map(e=>y(e)):D(V,{children:"Loading ..."})})}function re(f){const u=window.apiClient;return!f.isAuthenticated.value||!f.isDataLoaded.value?(location.href="/",D(V,{})):(u.profile.profile,D(V,{children:D(ae,{...f})}))}function oe(){return D("footer",{className:"fui body fiction",children:["© 2023",new Date().getUTCFullYear()!=2023?" - "+new Date().getUTCFullYear():null," ","NoLifeKing85#2914"]})}function le(f){const u=window.apiClient,b=window.eventEmitter;b.addEventListener("loading-text",n=>{n&&r(n)});function r(n){let y=document.getElementById("loading-text");y&&(y.innerText=n)}return u.checkIfAuthenticated().then(async n=>{if(!n){location.href="/";return}T("LOGIN","Authenticated, checking manifests"),r("Checking manifest ...");let y=await u.checkManifestVersion();if(y==null){r("Something is wrong with Destiny 2 (or this app), please reload the page.");return}T("LOGIN",y),r("Loading profile data"),await u.getLastPlayedCharacter(),r("Checking for missing definitions");let p=await u.checkStoredDefinitions(!1);p.length>0&&(r(`Downloading ${p.length} missing definition(s)`),await u.checkStoredDefinitions(!0)),r("Loading data..."),await u.loadDataFromStorage(),f.isDataLoaded.value=!0,setTimeout(()=>{r("Opening application..."),b.emit("manifests-loaded"),setTimeout(()=>{location.href="/#/dashboard"},1e3)},1e3)}).catch(async n=>{n.status===503?(r("Bungie API is down, retrying in a minute."),setTimeout(()=>{location.href="/"},6e4)):(r("An error occurred while trying to log in, please try again."),console.error(n),console.error(await n.json()))}),D(V,{children:D("span",{class:"fui body",id:"loading-text",children:"Logging in and loading data ..."})})}function ce(){return D("header",{className:"header subscreen",children:"Dataverse"})}function de(){const f=J(window.appState);return D(V,{children:[D(ce,{}),D("div",{class:"app",children:D(K,{history:Q(),children:[D(V,{path:"/",children:D(Y,{...f})}),D(V,{path:"/authenticated",children:D(Z,{})}),D(V,{path:"/logging-in",children:D(le,{...f})}),D(V,{path:"/dashboard",children:D(re,{...f})})]})}),D(oe,{})]})}class fe{constructor(){g(this,"DBInstance");g(this,"initializeDatabase");g(this,"setItem");g(this,"setItems");g(this,"getItem");g(this,"removeItem");g(this,"setStorageItem");g(this,"setStorageItems");g(this,"getStorageItem");g(this,"getStorageItems");g(this,"removeStorageItem");this.DBInstance=null,this.initializeDatabase=async function(){return new Promise((p,o)=>{let d=window.indexedDB.open("destiny2-dataverse",2);d.onupgradeneeded=function(e){const i=d.result;T("DB","Old",e.oldVersion,"New",e.newVersion),e.oldVersion<1&&(T("DB","Creating first version of database, since it never existed on this installation."),i.createObjectStore("storage",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key")),e.oldVersion<2&&(T("DB","Creating object store for player/character activity"),i.createObjectStore("playerActivity",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"),i.createObjectStore("activityDetails",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"))},d.onsuccess=function(e){T("DB","Loaded database"),y.DBInstance=e.target.result,p()},d.onerror=function(e){T("DB","Failed to load database"),o(e)}})};async function u(p,o,d){return new Promise((e,i)=>{const P=y.DBInstance.transaction(p,"readwrite").objectStore(p).put({key:o,value:d});P.onsuccess=function(){e()},P.onerror=function(j){i(j)}})}async function b(p,o=null){return new Promise((d,e)=>{const m=y.DBInstance.transaction(p,"readonly").objectStore(p).getAll();m.onsuccess=function(){const P=m.result;d(o?P.filter(o):P)},m.onerror=function(P){e(P)}})}async function r(p,o,d=null){return new Promise((e,i)=>{const P=y.DBInstance.transaction(p,"readonly").objectStore(p).get(o);P.onsuccess=function(j){j.target.result?e(j.target.result.value):e(d)},P.onerror=function(j){i(j)}})}async function n(p,o){return new Promise((d,e)=>{const m=y.DBInstance.transaction(p,"readwrite").objectStore(p).delete(o);m.onsuccess=function(){d()},m.onerror=function(P){e(P)}})}this.setItem=async function(p,o){return await u("storage",p,o)},this.setItems=async function(p){for(let o of p)await u("storage",o.key,o.value)},this.getItem=async function(p,o=null){return await r("storage",p,o)},this.removeItem=async function(p){return await n("storage",p)},this.setStorageItem=async function(p,o,d){return await u(p,o,d)},this.setStorageItems=async function(p,o){for(let d of o)await u(p,d.key,d.value)},this.getStorageItem=async function(p,o,d=null){return await r(p,o,d)},this.getStorageItems=async function(p,o=null){return await b(p,o)},this.removeStorageItem=async function(p,o){return await n(p,o)};var y=this;return this}}class ue{constructor(){g(this,"eventListeners");g(this,"addEventListener");g(this,"emit");return this.eventListeners=[],this.addEventListener=function(u,b){T("EVENT:REGISTERED",u),this.eventListeners.push({eventName:u,handler:b})},this.emit=async function(u,...b){return JSON.parse(await window.db.getItem("d2-debugmode")??"false")?T("EVENT:EMITTING",u,...b):T("EVENT:EMITTING",u),new Promise((n,y)=>{this.eventListeners.filter(p=>p.eventName==u).forEach(async p=>{try{await p.handler(...b)}catch(o){T("EVENT:ERROR",u,o),console.error(o),y(o)}}),n(!0)})},T("EventEmitter","Initialized"),this}}var A=(f=>(f[f.None=0]="None",f[f.Locked=1]="Locked",f[f.Tracked=2]="Tracked",f[f.Masterwork=4]="Masterwork",f[f.Crafted=8]="Crafted",f[f.HighlightedObjective=16]="HighlightedObjective",f))(A||{});class pe{constructor(u){g(this,"getSeasonRankData");g(this,"replaceStringVariables");g(this,"getMilestoneData");g(this,"getBounties");g(this,"getQuests");g(this,"getCharacterRecords");g(this,"destinyApiClient");this.destinyApiClient=u,this.getSeasonRankData=function(n,y,p){let o=n.characterProgression.progressions[y.seasonPassProgressionHash],d=n.characterProgression.progressions[p.prestigeProgressionHash],e=this.destinyApiClient.destinyDataDefinition.DestinyInventoryItemDefinition[y.artifactItemHash],i=o.level,a=o.nextLevelAt,m=o.progressToNextLevel;return o.level==o.levelCap&&(i+=d.level,a+=d.nextLevelAt,m+=d.progressToNextLevel),{name:`Season Rank ${i}`,description:y.displayProperties.name,icon:`${e.displayProperties.icon}`,startDate:y.startDate,endDate:y.endDate,nextLevelAt:a,progressToNextLevel:m,type:"seasonrank",order:-1,inProgressValueStyle:0,completedValueStyle:0}},this.replaceStringVariables=function(n,y){if(!n||n.indexOf("{var:")===-1)return n;var p=/{var:(\d+)}/g,o=n.match(p);let d=n;if(o)for(var e=0;e<o.length;e++){var i=o[e],a=i.match(/\d+/);if(a){var m=a[0],P=y[m];P&&(d=d.replace(i,P))}}return d},this.getMilestoneData=function(n){let y=[],p=Object.keys(n.characterProgression.milestones);for(let o of p){let d=n.characterProgression.milestones[o],e={name:this.replaceStringVariables(d.milestoneName,n.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(d.milestoneDescription,n.profileStringVariables.integerValuesByHash),order:d.order,icon:d.milestoneIcon,type:"milestone",inProgressValueStyle:0,completedValueStyle:0};if(d.startDate&&(e.startDate=d.startDate),d.endDate&&(e.endDate=d.endDate),d.availableQuests&&d.availableQuests.length>0){for(let i of d.availableQuests)if(i.tracked&&(e.tracked=!0),i.status.started&&!i.status.completed&&i.status.stepObjectives&&i.status.stepObjectives.length>0){for(let a of i.status.stepObjectives)if(!a.complete){typeof a.progress<"u"&&(e.progressToNextLevel=a.progress),typeof a.completionValue<"u"&&(e.nextLevelAt=a.completionValue),typeof a.objectiveInProgressValueStyle<"u"&&(e.inProgressValueStyle=a.objectiveInProgressValueStyle),typeof a.objectiveCompletedValueStyle<"u"&&(e.completedValueStyle=a.objectiveCompletedValueStyle),(e.icon??"").length==0&&typeof a.activityIcon<"u"&&(e.icon=a.activityIcon);break}}}if(d.activities&&d.activities.length>0)for(let i of d.activities){if(i.challenges&&i.challenges.length>0){for(let a of i.challenges)if(!a.objective.complete){typeof a.objective.progress<"u"&&(e.progressToNextLevel=a.objective.progress),typeof a.objectiveInProgressValueStyle<"u"&&(e.inProgressValueStyle=a.objectiveInProgressValueStyle),typeof a.objectiveCompletedValueStyle<"u"&&(e.completedValueStyle=a.objectiveCompletedValueStyle),typeof a.objective.completionValue<"u"&&(e.nextLevelAt=a.objective.completionValue);break}}break}y.push(e)}return y};const b=26;this.getBounties=function(n){let y=[];var p=n.characterInventory.filter(o=>o.inventoryitemItemType===b);for(let o of p){let e=n.itemComponents.objectives.data[o.itemInstanceId].objectives.filter(i=>!i.complete);if(e.length!==0)for(let i of e){let a={name:this.replaceStringVariables(o.inventoryitemName,n.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(o.inventoryitemDescription,n.profileStringVariables.integerValuesByHash),order:500,icon:o.inventoryitemIcon,type:"bounty",inProgressValueStyle:0,completedValueStyle:0,tracked:(o.state&A.Tracked)==A.Tracked,state:o.state};typeof o.expirationDate<"u"&&(a.endDate=o.expirationDate,new Date(o.expirationDate).getTime()<new Date().getTime())||typeof i.completionValue<"u"&&(a.nextLevelAt=i.completionValue,typeof i.objectiveInProgressValueStyle<"u"&&(a.inProgressValueStyle=i.objectiveInProgressValueStyle),typeof i.objectiveCompletedValueStyle<"u"&&(a.completedValueStyle=i.objectiveCompletedValueStyle),typeof i.progress<"u"&&(a.progressToNextLevel=i.progress),typeof i.objectiveProgressDescription<"u"&&(a.description=this.replaceStringVariables(i.objectiveProgressDescription,n.profileStringVariables.integerValuesByHash)),y.push(a))}}return y};const r=1345459588;return this.getQuests=function(n){let y=[];var p=n.characterInventory.filter(e=>e.bucketHash===r&&[b].filter(i=>i!=e.inventoryitemItemType).length>0);let o=p.filter(e=>typeof e.itemInstanceId<"u"),d=p.filter(e=>typeof e.itemInstanceId>"u");for(let e of o){let i=n.itemComponents.objectives.data[e.itemInstanceId];if(i){const a=i.objectives.filter(m=>m.visible&&!m.complete);for(let m of a){let P={name:this.replaceStringVariables(e.inventoryitemName,n.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(e.inventoryitemDescription,n.profileStringVariables.integerValuesByHash),order:1e3,icon:e.inventoryitemIcon,type:"quest",inProgressValueStyle:0,completedValueStyle:0,tracked:(e.state&A.Tracked)==A.Tracked,state:e.state};typeof m.completionValue<"u"&&(P.nextLevelAt=m.completionValue,typeof m.objectiveInProgressValueStyle<"u"&&(P.inProgressValueStyle=m.objectiveInProgressValueStyle),typeof m.objectiveCompletedValueStyle<"u"&&(P.completedValueStyle=m.objectiveCompletedValueStyle),typeof m.progress<"u"&&(P.progressToNextLevel=m.progress),typeof m.objectiveProgressDescription<"u"&&(P.description=this.replaceStringVariables(m.objectiveProgressDescription,n.profileStringVariables.integerValuesByHash)),y.push(P))}}}for(let e of d){let i=(n.characterProgression.uninstancedItemObjectives[e.itemHash]??[]).filter(a=>a.visible&&!a.complete);for(let a of i){let m={name:this.replaceStringVariables(e.inventoryitemName,n.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(e.inventoryitemDescription,n.profileStringVariables.integerValuesByHash),order:1e4,icon:e.inventoryitemIcon,type:"quest",inProgressValueStyle:0,completedValueStyle:0,tracked:(e.state&A.Tracked)==A.Tracked,state:e.state};typeof a.completionValue<"u"&&(m.nextLevelAt=a.completionValue,typeof a.objectiveInProgressValueStyle<"u"&&(m.inProgressValueStyle=a.objectiveInProgressValueStyle),typeof a.objectiveCompletedValueStyle<"u"&&(m.completedValueStyle=a.objectiveCompletedValueStyle),typeof a.progress<"u"&&(m.progressToNextLevel=a.progress),typeof a.objectiveProgressDescription<"u"&&(m.description=this.replaceStringVariables(a.objectiveProgressDescription,n.profileStringVariables.integerValuesByHash)),y.push(m))}}return y},this.getCharacterRecords=function(n){let y=[],p=Object.keys(n.characterRecords.records);for(let o of p){let d=n.characterRecords.records[o];if(typeof d.objectives>"u"||(d.recordName??"").length===0)continue;let e=d.objectives.filter(i=>i.visible&&!i.complete);for(let i of e){let a={name:d.recordName,type:"characterRecord",order:100,icon:d.recordIcon,description:`${i.objectiveProgressDescription??""}`,progressToNextLevel:i.progress,nextLevelAt:i.completionValue,inProgressValueStyle:i.objectiveInProgressValueStyle,completedValueStyle:i.objectiveCompletedValueStyle,state:d.state};y.push(a)}}return y},this}}class he{constructor(u,b){g(this,"checkIfAuthenticated");g(this,"getToken");g(this,"refreshToken");g(this,"checkManifestVersion");g(this,"checkStoredDefinitions");g(this,"loadDestinyContentData");g(this,"loadDataFromStorage");g(this,"getManifest");g(this,"loadCommonSettings");g(this,"getUserToken");g(this,"getLinkedProfiles");g(this,"getUserProfile");g(this,"getLastPlayedCharacter");g(this,"getNamedDataObject");g(this,"getPresentationNodeFromHash");g(this,"mapHashesToDefinitionsInObject");g(this,"getTrackableData");g(this,"apiToken");g(this,"applicationName");g(this,"cachedManifest");g(this,"destinyDataDefinition");g(this,"lastVersion");g(this,"profile");g(this,"linkedProfiles");g(this,"trackedGoals");g(this,"goalApi");i("Initializing");const r=window.db,n=window.eventEmitter,y="https://o2g.itssimple.se",p="https://www.bungie.net",o="https://www.bungie.net/Platform",d=["DestinyActivityTypeDefinition","DestinyActivityDefinition","DestinyArtifactDefinition","DestinyChecklistDefinition","DestinyClassDefinition","DestinyDestinationDefinition","DestinyDamageTypeDefinition","DestinyFactionDefinition","DestinyGenderDefinition","DestinyItemCategoryDefinition","DestinyItemTierTypeDefinition","DestinyInventoryBucketDefinition","DestinyInventoryItemDefinition","DestinyMedalTierDefinition","DestinyMetricDefinition","DestinyMilestoneDefinition","DestinyObjectiveDefinition","DestinyPlaceDefinition","DestinyPresentationNodeDefinition","DestinyProgressionDefinition","DestinyRaceDefinition","DestinyRecordDefinition","DestinySeasonDefinition","DestinySeasonPassDefinition","DestinyStatDefinition","DestinyTraitDefinition"],e={None:0,Profiles:100,VendorReceipts:101,ProfileInventories:102,ProfileCurrencies:103,ProfileProgression:104,PlatformSilver:105,Characters:200,CharacterInventories:201,CharacterProgressions:202,CharacterRenderData:203,CharacterActivities:204,CharacterEquipment:205,ItemInstances:300,ItemObjectives:301,ItemPerks:302,ItemRenderData:303,ItemStats:304,ItemSockets:305,ItemTalentGrids:306,ItemCommonData:307,ItemPlugStates:308,ItemPlugObjectives:309,ItemReusablePlugs:310,Vendors:400,VendorCategories:401,VendorSales:402,Kiosks:500,CurrencyLookups:600,PresentationNodes:700,Collectibles:800,Records:900,Transitory:1e3,Metrics:1100,StringVariables:1200};this.lastVersion=null,this.applicationName=b,this.apiToken=u,this.destinyDataDefinition={},this.trackedGoals=[];function i(...c){T("D2API",c)}async function a(c,t,s=null,v=null){let l={};return(s!==null||v!==null)&&(l["Content-Type"]="application/json",l["x-api-key"]=h.apiToken,v!==null&&(l.authorization=`Bearer ${v}`)),s!==null?await fetch(t,{method:c,headers:l,body:s}):await fetch(t,{method:c,headers:l})}async function m(){await r.getItem("destinyTokenExpires")<Date.now()&&(i("Token expired, refreshing"),await h.refreshToken())}function P(c){if(c.error)return i("Error handling token",JSON.stringify(c)),r.removeItem("destinyToken"),r.removeItem("destinyRefreshToken"),r.removeItem("destinyTokenExpires"),r.removeItem("destinyRefreshTokenExpires"),r.removeItem("destinyBungieMembershipId"),!1;r.setItem("destinyToken",c.access_token),r.setItem("destinyRefreshToken",c.refresh_token);let t=Date.now()+c.expires_in*1e3;r.setItem("destinyTokenExpires",t);let s=Date.now()+c.refresh_expires_in*1e3;return r.setItem("destinyRefreshTokenExpires",s),r.setItem("destinyBungieMembershipId",c.membership_id),!0}this.loadDataFromStorage=async()=>{i("Loading data from storage");let c=await r.getItem("manifest");c!==null&&(h.cachedManifest=JSON.parse(c));let t=await r.getItem("manifestVersion");t!==null&&(h.lastVersion=t),h.checkStoredDefinitions();for(let l of d){let I=await r.getItem(`destinyContent-${l}`);I!==null&&(h.destinyDataDefinition[l]=JSON.parse(I))}let s=await r.getItem("destiny-profile");s!==null&&(h.profile=JSON.parse(s));let v=await r.getItem("destiny-linkedProfiles");v!==null&&(h.linkedProfiles=JSON.parse(v)),i("Data loaded from storage"),n.emit("destiny-data-loaded")},this.checkIfAuthenticated=async()=>{try{await m();const c=await r.getItem("destinyToken")!==null;return n.emit("destiny2:authenticated",c),c}catch(c){return i("Error checking if authenticated",c),n.emit("destiny2:authenticated",!1),!1}},this.getToken=async(c,t)=>{const s=await a("POST",`${y}/token/${h.applicationName}`,JSON.stringify({code:t}));if(s.status===200){let v=await s.json();return P(v)?n.emit("destiny2:auth-success"):n.emit("destiny2:auth-failed"),v}i("Error getting token",s.status,s.statusText,await s.text()),n.emit("destiny2:auth-failed")},this.refreshToken=async()=>{const c=await r.getItem("destinyRefreshToken");if(c==null)return n.emit("destiny2:refreshToken",null),null;const t=await a("POST",`${y}/refresh/${h.applicationName}`,JSON.stringify({refresh_token:c}));if(t.status===200){let s=await t.json();P(s)?n.emit("destiny2:refresh-success"):n.emit("destiny2:refresh-failed");return}else n.emit("destiny2:refresh-failed")},this.checkManifestVersion=async()=>(i("Checking manifest version"),new Promise(async function(c,t){let s=await h.getManifest();if(s==null)return i("Failed to fetch API"),null;let v=await r.getItem("manifestVersion")??"null";if(s.Response.version!==v){await r.removeItem("lastManifestUpdate"),await r.removeItem("manifest"),await r.removeItem("manifestVersion");for(let l of d)await r.removeItem(`destinyContent-${l}`);h.cachedManifest=s.Response,await r.setItem("manifestVersion",s.Response.version),await r.setItem("manifest",JSON.stringify(h.cachedManifest)),await r.setItem("lastManifestUpdate",Date.now()),c({updatedManifest:!0,version:h.lastVersion}),i("Manifest updated");return}h.cachedManifest=s.Response,c({updatedManifest:!1,version:h.lastVersion}),i("Manifest version is up to date")})),this.checkStoredDefinitions=async function(c=!0){let t=[];for(let s of d)await r.getItem(`destinyContent-${s}`)===null&&t.push(s);if(t.length>0&&c){for(let s of t)await r.removeItem(`destinyContent-${s}`);await h.loadDestinyContentData(t)}return t},this.loadDestinyContentData=async function(c=[]){for(let t of c)await j(t)};async function j(c){let t=h.cachedManifest;const s=c.replace("Destiny","").split(/(?=[A-Z])/).join(" ");n.emit("loading-text",`Loading ${s}`);const v=await a("GET",`${p}${t.jsonWorldComponentContentPaths.en[c]}`);v.headers.get("content-length");let l=0;const I=new Response(new ReadableStream({async start(C){const N=v.body.getReader();let k=0;for(;;){var L=await N.read();if(L.done)break;l+=L.value.byteLength,k++,k%30===0&&n.emit("loading-text",`Loading ${s} (${new Intl.NumberFormat("sv-SE").format(Math.round(l/1024/1024*100+Number.EPSILON)/100)} MB)`),C.enqueue(L.value)}n.emit("loading-text",`Loading ${s} (${new Intl.NumberFormat("sv-SE").format(Math.round(l/1024/1024*100+Number.EPSILON)/100)} MB)`),C.close()}}));if(v.status!==200){T("Manifest download error",await I.json());return}const w=await I.json();h.destinyDataDefinition[c]=w,r.setItem(`destinyContent-${c}`,JSON.stringify(w))}this.getManifest=async function(){let c=await r.getItem("lastManifestUpdate");if(i("Checking if manifest is cached"),c!==null&&Date.now()-c<6e4*60){let s=await r.getItem("manifest");if(s!==null)return i("Manifest is cached"),{Response:JSON.parse(s)}}let t=await a("GET",`${o}/Destiny2/Manifest/`);if(t.status===200){let s=await t.json();return s.ErrorStatus=="Success"?(r.setItem("lastManifestUpdate",Date.now()),r.setItem("manifest",JSON.stringify(s.Response)),i("Manifest updated from API"),{Response:s.Response}):(i("Manifesterror"),i(s.Response),null)}else{let s=t.json();return i("Error when fetching Manifest"),i(s),null}},this.loadCommonSettings=async function(){await m();const c=await a("GET",`${o}/Settings`,null,await this.getUserToken());return c.status===200?await c.json():(i("Error fetching common settings",c.status,c.statusText),null)},this.getUserToken=async function(){return await r.getItem("destinyToken")},this.getLinkedProfiles=async function(c=!1){return c&&(h.linkedProfiles=null),h.linkedProfiles!=null?h.linkedProfiles:(await m(),new Promise(async(t,s)=>{var v=await r.getItem("destinyBungieMembershipId");let l=await a("GET",`${o}/Destiny2/-1/Profile/${v}/LinkedProfiles/`,null,await this.getUserToken());if(l.status===200){let I=await l.json();r.setItem("destiny-linkedProfiles",JSON.stringify(I.Response)),h.linkedProfiles=I.Response,t(I.Response)}else h.refreshToken(),s(l)}))},this.getUserProfile=async function(c,t){let s=[e.Profiles,e.ProfileInventories,e.ProfileCurrencies,e.ProfileProgression,e.Characters,e.CharacterInventories,e.CharacterProgressions,e.CharacterActivities,e.CharacterEquipment,e.ItemInstances,e.ItemObjectives,e.ItemSockets,e.ItemTalentGrids,e.ItemCommonData,e.ItemPlugStates,e.ItemPlugObjectives,e.ItemReusablePlugs,e.Metrics,e.Records,e.Collectibles,e.StringVariables];return await m(),new Promise(async(v,l)=>{let I=await a("GET",`${o}/Destiny2/${t}/Profile/${c}/?components=${s.join(",")}`,null,await this.getUserToken());if(I.status===200){let w=await I.json();typeof h.profile>"u"||new Date(h.profile.responseMintedTimestamp).getTime()<new Date(w.Response.responseMintedTimestamp).getTime()?(r.setItem("destiny-profile",JSON.stringify(w.Response)),h.profile=w.Response,v(w.Response)):v(h.profile)}else h.refreshToken(),l(I)})},this.getLastPlayedCharacter=async function(c=!1){await m();let t=h.profile;if(typeof t<"u"&&(new Date().getTime()-new Date(t.responseMintedTimestamp).getTime())/1e3>60&&(c=!0),c&&(t=null),h.linkedProfiles===null)return null;if(await h.getLinkedProfiles(c),h.linkedProfiles!==null&&h.linkedProfiles.profiles!==null&&h.linkedProfiles.profiles.length>0){var s=h.linkedProfiles.profiles.sort((w,C)=>w.dateLastPlayed>C.dateLastPlayed?-1:1)[0];t=await h.getUserProfile(s.membershipId,s.membershipType)}let v=[];for(let w of t.profile.data.characterIds)v.push(t.characters.data[w]);let l=v.sort((w,C)=>w.dateLastPlayed>C.dateLastPlayed?-1:1)[0];return{characterInfo:l,characterProgression:t.characterProgressions.disabled?{}:t.characterProgressions.data[l.characterId],characterActivities:t.characterActivities.disabled?{}:t.characterActivities.data[l.characterId],characterUninstancedItemComponents:t.characterUninstancedItemComponents[l.characterId].objectives.data,characterInventory:t.characterInventories.data[l.characterId].items,characterEquipment:t.characterEquipment.data[l.characterId].items,characterPlugSets:t.characterPlugSets.disabled?{}:t.characterPlugSets.data[l.characterId].plugs,characterCollectibles:t.characterCollectibles.data[l.characterId].collectibles,characterRecords:t.characterRecords.data[l.characterId],characterStringVariables:t.characterStringVariables.data[l.characterId],profileProgression:t.profileProgression.data,metrics:t.metrics.data.metrics,itemComponents:t.itemComponents,records:t.profileRecords.data,profileInventory:t.profileInventory.data.items,profileCurrency:t.profileCurrencies.data.items,profilePlugSets:t.profilePlugSets.disabled?{}:t.profilePlugSets.data.plugs,profileCollectibles:t.profileCollectibles.data,profile:t.profile.data,profileStringVariables:t.profileStringVariables.data}},this.getNamedDataObject=async function(c=!1){let t=await h.getLastPlayedCharacter(c);if(t==null)return null;let s={...t};for(let l of Object.keys(s.characterInfo.stats))s.characterInfo.stats[l]={statValue:s.characterInfo.stats[l],statHash:l};for(let l of Object.keys(s.metrics))s.metrics[l]={...s.metrics[l],metricHash:l};for(let l of Object.keys(s.records.records))s.records.records[l]={...s.records.records[l],recordHash:l,parentNodeHashes:h.destinyDataDefinition.DestinyRecordDefinition[l].parentNodeHashes};for(let l of Object.keys(s.characterRecords.records))s.characterRecords.records[l]={...s.characterRecords.records[l],recordHash:l,parentNodeHashes:h.destinyDataDefinition.DestinyRecordDefinition[l].parentNodeHashes};return s=h.mapHashesToDefinitionsInObject(s),await r.getItem("destiny2-use-cachebreaker",!1)&&t.characterInventory.filter(I=>I.lockable&&I.inventoryitemItemType==3).length>0,n.emit("destiny2-api-update",s),s},this.getPresentationNodeFromHash=function(c){const t=[],s=h.destinyDataDefinition.DestinyPresentationNodeDefinition[c];if(s&&(t.unshift({name:s.displayProperties.name,description:s.displayProperties.description,icon:s.displayProperties.icon,hash:c}),s.parentNodeHashes))for(let v of s.parentNodeHashes){const l=h.getPresentationNodeFromHash(v);for(let I of l)t.push(I)}return t},this.mapHashesToDefinitionsInObject=function(c){let t={...c},s=Object.keys(t);for(let v of s){let l=typeof t[v],I=t[v];if(Array.isArray(I)){for(let w=0;w<I.length;w++){let C=I[w];typeof C=="object"?I[w]=h.mapHashesToDefinitionsInObject(C):I[w]=C}t[v]=I}else if(l==="object"&&I!==null)t[v]=h.mapHashesToDefinitionsInObject(t[v]);else{if(v.indexOf("Hash")>-1&&!Array.isArray(I)){let w=v.split("Hash")[0].replace("current","").toLowerCase();switch(w){case"item":case"plugitem":w="inventoryitem";break}let C=d.find(k=>k.toLowerCase()==`Destiny${w}Definition`.toLowerCase()),N=h.destinyDataDefinition[C];if(N&&N[I]&&N[I].displayProperties){const k=N[I];k.displayProperties.name&&k.displayProperties.name.length>0?t[`${w}Name`]=k.displayProperties.name:k.setData&&k.setData.questLineName&&k.setData.questLineName.length>0&&(t[`${w}Name`]=k.setData.questLineName),k.displayProperties.description&&k.displayProperties.description.length>0&&(t[`${w}Description`]=k.displayProperties.description),k.displayProperties.icon&&k.displayProperties.icon.length>0&&(t[`${w}Icon`]=k.displayProperties.icon),k.progressDescription&&k.progressDescription.length>0&&(t[`${w}ProgressDescription`]=k.progressDescription),typeof k.inProgressValueStyle<"u"&&(t[`${w}InProgressValueStyle`]=k.inProgressValueStyle),typeof k.completedValueStyle<"u"&&(t[`${w}CompletedValueStyle`]=k.completedValueStyle),typeof k.itemType<"u"&&(t[`${w}ItemType`]=k.itemType),typeof k.parentNodeHashes<"u"&&(t.parentNodeHashes=k.parentNodeHashes.map(L=>h.getPresentationNodeFromHash(L)))}}t[v]=I}}return t},this.getTrackableData=async function(c=!1){let t=await h.getNamedDataObject(c);if(t==null)return null;let s=h.destinyDataDefinition.DestinySeasonDefinition[t.profile.currentSeasonHash],v=h.destinyDataDefinition.DestinySeasonPassDefinition[s.seasonPassHash],l=[],I=h.goalApi.getMilestoneData(t);for(let S of I)l.push(S);let w=h.goalApi.getBounties(t);for(let S of w)l.push(S);let C=h.goalApi.getQuests(t);for(let S of C)l.push(S);let N=h.goalApi.getCharacterRecords(t);for(let S of N)l.push(S);function k(S,x){if(typeof S.nextLevelAt<"u"&&typeof x.nextLevelAt<"u"){let B=S.progressToNextLevel/S.nextLevelAt*100,q=x.progressToNextLevel/x.nextLevelAt*100;return B<q?1:-1}return typeof S.endDate<"u"?typeof x.endDate>"u"||S.endDate<x.endDate?-1:1:S.order<x.order?1:-1}const L=l.filter(S=>S.tracked).sort(k),H=l.filter(S=>S.endDate&&!S.tracked).sort(k),$=l.filter(S=>!S.endDate&&!S.tracked).sort(k);return l=[...L,...H,...$],l.unshift(h.goalApi.getSeasonRankData(t,s,v)),h.trackedGoals=l,n.emit("goal-list-update",l),l};let h=this;return this.goalApi=new pe(this),i("Initialized"),this}}T("MAIN","Starting app...");window.eventEmitter=new ue;window.db=new fe;window.apiClient=new he("5625a52ed6b54ecfb8246071cfcd6085","everversedata");function ye(){const f=E(!1),u=E(!1),b=E([]);return{isDataLoaded:f,isAuthenticated:u,goals:b}}const O=ye();window.appState=z(O);window.db.initializeDatabase().then(async()=>{T("MAIN","Database initialized, checking for updates..."),O.isAuthenticated.value=await window.apiClient.checkIfAuthenticated(),W(D(de,{}),document.getElementById("app"))});
//# sourceMappingURL=index-d2e4f947.js.map