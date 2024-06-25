var $=Object.defineProperty;var _=(g,h,k)=>h in g?$(g,h,{enumerable:!0,configurable:!0,writable:!0,value:k}):g[h]=k;var y=(g,h,k)=>(_(g,typeof h!="symbol"?h+"":h,k),k);import{o as S,_ as C,R as q,q as U,D as F,c as G,F as J,B as K,d as x}from"./vendor-c23458f1.js";(function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const p of i)if(p.type==="childList")for(const f of p.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function k(i){const p={};return i.integrity&&(p.integrity=i.integrity),i.referrerPolicy&&(p.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?p.credentials="include":i.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(i){if(i.ep)return;i.ep=!0;const p=k(i);fetch(i.href,p)}})();function V(g,...h){console.log(`[${g}]`,JSON.stringify([...h]))}function Q(g){return g.isAuthenticated?(location.href="/#/logging-in",S(C,{})):S(C,{children:["Main page -"," ",S("a",{href:"https://o2g.itssimple.se/authenticate/everversedata?state=dataverse-"+new Date().getTime(),children:"Log in"})]})}function z(){const g=window.apiClient,h=q();V("Auth","Authenticated page, getting code",h);const c=new URL(h,location.origin).searchParams.get("code");return c?(g.getToken("",c).then(()=>{V("Auth","Got token, redirecting to dashboard"),location.href="/#/logging-in"}).catch(i=>{V("Auth","Failed to get token, redirecting to main page"),location.href="/"}),S(C,{children:"Authenticated, redirecting to Dashboard"})):(V("Auth","No code found, redirecting to main page"),location.href="/",S(C,{children:"Redirecting to main page"}))}function W(g){const h=window.apiClient;return!g.isAuthenticated.value||!g.isDataLoaded.value?(location.href="/",S(C,{})):(h.profile.profile,S(C,{children:"Blep"}))}function Y(){return S("footer",{className:"fui body fiction",children:["© 2023",new Date().getUTCFullYear()!=2023?" - "+new Date().getUTCFullYear():null," ","NoLifeKing85#2914"]})}function Z(g){const h=window.apiClient,k=window.eventEmitter;k.addEventListener("loading-text",i=>{i&&c(i)});function c(i){let p=document.getElementById("loading-text");p&&(p.innerText=i)}return h.checkIfAuthenticated().then(async i=>{if(!i){location.href="/";return}V("LOGIN","Authenticated, checking manifests"),c("Checking manifest ...");let p=await h.checkManifestVersion();if(p==null){c("Something is wrong with Destiny 2 (or this app), please reload the page.");return}V("LOGIN",p),c("Loading profile data"),await h.getLastPlayedCharacter(),c("Checking for missing definitions");let f=await h.checkStoredDefinitions(!1);f.length>0&&(c(`Downloading ${f.length} missing definition(s)`),await h.checkStoredDefinitions(!0)),c("Loading data..."),await h.loadDataFromStorage(),g.isDataLoaded.value=!0,setTimeout(()=>{c("Opening application..."),k.emit("manifests-loaded"),setTimeout(()=>{location.href="/#/dashboard"},1e3)},1e3)}),S(C,{children:S("span",{class:"fui body",id:"loading-text",children:"Logging in and loading data ..."})})}function X(){const g=U(window.appState);return S(C,{children:[S("header",{className:"header subscreen",children:"Dataverse"}),S("div",{class:"app",children:S(F,{history:G(),children:[S(C,{path:"/",children:S(Q,{...g})}),S(C,{path:"/authenticated",children:S(z,{})}),S(C,{path:"/logging-in",children:S(Z,{...g})}),S(C,{path:"/dashboard",children:S(W,{...g})})]})}),S(Y,{})]})}class ee{constructor(){y(this,"DBInstance");y(this,"initializeDatabase");y(this,"setItem");y(this,"setItems");y(this,"getItem");y(this,"removeItem");y(this,"setStorageItem");y(this,"setStorageItems");y(this,"getStorageItem");y(this,"getStorageItems");y(this,"removeStorageItem");this.DBInstance=null,this.initializeDatabase=async function(){return new Promise((f,o)=>{let d=window.indexedDB.open("destiny2-dataverse",2);d.onupgradeneeded=function(t){const s=d.result;V("DB","Old",t.oldVersion,"New",t.newVersion),t.oldVersion<1&&(V("DB","Creating first version of database, since it never existed on this installation."),s.createObjectStore("storage",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key")),t.oldVersion<2&&(V("DB","Creating object store for player/character activity"),s.createObjectStore("playerActivity",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"),s.createObjectStore("activityDetails",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"))},d.onsuccess=function(t){V("DB","Loaded database"),p.DBInstance=t.target.result,f()},d.onerror=function(t){V("DB","Failed to load database"),o(t)}})};async function h(f,o,d){return new Promise((t,s)=>{const P=p.DBInstance.transaction(f,"readwrite").objectStore(f).put({key:o,value:d});P.onsuccess=function(){t()},P.onerror=function(j){s(j)}})}async function k(f,o=null){return new Promise((d,t)=>{const m=p.DBInstance.transaction(f,"readonly").objectStore(f).getAll();m.onsuccess=function(){const P=m.result;d(o?P.filter(o):P)},m.onerror=function(P){t(P)}})}async function c(f,o,d=null){return new Promise((t,s)=>{const P=p.DBInstance.transaction(f,"readonly").objectStore(f).get(o);P.onsuccess=function(j){j.target.result?t(j.target.result.value):t(d)},P.onerror=function(j){s(j)}})}async function i(f,o){return new Promise((d,t)=>{const m=p.DBInstance.transaction(f,"readwrite").objectStore(f).delete(o);m.onsuccess=function(){d()},m.onerror=function(P){t(P)}})}this.setItem=async function(f,o){return await h("storage",f,o)},this.setItems=async function(f){for(let o of f)await h("storage",o.key,o.value)},this.getItem=async function(f,o=null){return await c("storage",f,o)},this.removeItem=async function(f){return await i("storage",f)},this.setStorageItem=async function(f,o,d){return await h(f,o,d)},this.setStorageItems=async function(f,o){for(let d of o)await h(f,d.key,d.value)},this.getStorageItem=async function(f,o,d=null){return await c(f,o,d)},this.getStorageItems=async function(f,o=null){return await k(f,o)},this.removeStorageItem=async function(f,o){return await i(f,o)};var p=this;return this}}class te{constructor(){y(this,"eventListeners");y(this,"addEventListener");y(this,"emit");return this.eventListeners=[],this.addEventListener=function(h,k){V("EVENT:REGISTERED",h),this.eventListeners.push({eventName:h,handler:k})},this.emit=async function(h,...k){return JSON.parse(await window.db.getItem("d2-debugmode")??"false")?V("EVENT:EMITTING",h,...k):V("EVENT:EMITTING",h),new Promise((i,p)=>{this.eventListeners.filter(f=>f.eventName==h).forEach(async f=>{try{await f.handler(...k)}catch(o){V("EVENT:ERROR",h,o),console.error(o),p(o)}}),i(!0)})},V("EventEmitter","Initialized"),this}}var A=(g=>(g[g.None=0]="None",g[g.Locked=1]="Locked",g[g.Tracked=2]="Tracked",g[g.Masterwork=4]="Masterwork",g[g.Crafted=8]="Crafted",g[g.HighlightedObjective=16]="HighlightedObjective",g))(A||{});class ie{constructor(h){y(this,"getSeasonRankData");y(this,"replaceStringVariables");y(this,"getMilestoneData");y(this,"getBounties");y(this,"getQuests");y(this,"getCharacterRecords");y(this,"destinyApiClient");this.destinyApiClient=h,this.getSeasonRankData=function(i,p,f){let o=i.characterProgression.progressions[p.seasonPassProgressionHash],d=i.characterProgression.progressions[f.prestigeProgressionHash],t=this.destinyApiClient.destinyDataDefinition.DestinyInventoryItemDefinition[p.artifactItemHash],s=o.level,a=o.nextLevelAt,m=o.progressToNextLevel;return o.level==o.levelCap&&(s+=d.level,a+=d.nextLevelAt,m+=d.progressToNextLevel),{name:`Season Rank ${s}`,description:p.displayProperties.name,icon:`${t.displayProperties.icon}`,startDate:p.startDate,endDate:p.endDate,nextLevelAt:a,progressToNextLevel:m,type:"seasonrank",order:-1,inProgressValueStyle:0,completedValueStyle:0}},this.replaceStringVariables=function(i,p){if(!i||i.indexOf("{var:")===-1)return i;var f=/{var:(\d+)}/g,o=i.match(f);let d=i;if(o)for(var t=0;t<o.length;t++){var s=o[t],a=s.match(/\d+/);if(a){var m=a[0],P=p[m];P&&(d=d.replace(s,P))}}return d},this.getMilestoneData=function(i){let p=[],f=Object.keys(i.characterProgression.milestones);for(let o of f){let d=i.characterProgression.milestones[o],t={name:this.replaceStringVariables(d.milestoneName,i.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(d.milestoneDescription,i.profileStringVariables.integerValuesByHash),order:d.order,icon:d.milestoneIcon,type:"milestone",inProgressValueStyle:0,completedValueStyle:0};if(d.startDate&&(t.startDate=d.startDate),d.endDate&&(t.endDate=d.endDate),d.availableQuests&&d.availableQuests.length>0){for(let s of d.availableQuests)if(s.tracked&&(t.tracked=!0),s.status.started&&!s.status.completed&&s.status.stepObjectives&&s.status.stepObjectives.length>0){for(let a of s.status.stepObjectives)if(!a.complete){typeof a.progress<"u"&&(t.progressToNextLevel=a.progress),typeof a.completionValue<"u"&&(t.nextLevelAt=a.completionValue),typeof a.objectiveInProgressValueStyle<"u"&&(t.inProgressValueStyle=a.objectiveInProgressValueStyle),typeof a.objectiveCompletedValueStyle<"u"&&(t.completedValueStyle=a.objectiveCompletedValueStyle),(t.icon??"").length==0&&typeof a.activityIcon<"u"&&(t.icon=a.activityIcon);break}}}if(d.activities&&d.activities.length>0)for(let s of d.activities){if(s.challenges&&s.challenges.length>0){for(let a of s.challenges)if(!a.objective.complete){typeof a.objective.progress<"u"&&(t.progressToNextLevel=a.objective.progress),typeof a.objectiveInProgressValueStyle<"u"&&(t.inProgressValueStyle=a.objectiveInProgressValueStyle),typeof a.objectiveCompletedValueStyle<"u"&&(t.completedValueStyle=a.objectiveCompletedValueStyle),typeof a.objective.completionValue<"u"&&(t.nextLevelAt=a.objective.completionValue);break}}break}p.push(t)}return p};const k=26;this.getBounties=function(i){let p=[];var f=i.characterInventory.filter(o=>o.inventoryitemItemType===k);for(let o of f){let t=i.itemComponents.objectives.data[o.itemInstanceId].objectives.filter(s=>!s.complete);if(t.length!==0)for(let s of t){let a={name:this.replaceStringVariables(o.inventoryitemName,i.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(o.inventoryitemDescription,i.profileStringVariables.integerValuesByHash),order:500,icon:o.inventoryitemIcon,type:"bounty",inProgressValueStyle:0,completedValueStyle:0,tracked:(o.state&A.Tracked)==A.Tracked,state:o.state};typeof o.expirationDate<"u"&&(a.endDate=o.expirationDate,new Date(o.expirationDate).getTime()<new Date().getTime())||typeof s.completionValue<"u"&&(a.nextLevelAt=s.completionValue,typeof s.objectiveInProgressValueStyle<"u"&&(a.inProgressValueStyle=s.objectiveInProgressValueStyle),typeof s.objectiveCompletedValueStyle<"u"&&(a.completedValueStyle=s.objectiveCompletedValueStyle),typeof s.progress<"u"&&(a.progressToNextLevel=s.progress),typeof s.objectiveProgressDescription<"u"&&(a.description=this.replaceStringVariables(s.objectiveProgressDescription,i.profileStringVariables.integerValuesByHash)),p.push(a))}}return p};const c=1345459588;return this.getQuests=function(i){let p=[];var f=i.characterInventory.filter(t=>t.bucketHash===c&&[k].filter(s=>s!=t.inventoryitemItemType).length>0);let o=f.filter(t=>typeof t.itemInstanceId<"u"),d=f.filter(t=>typeof t.itemInstanceId>"u");for(let t of o){let s=i.itemComponents.objectives.data[t.itemInstanceId];if(s){const a=s.objectives.filter(m=>m.visible&&!m.complete);for(let m of a){let P={name:this.replaceStringVariables(t.inventoryitemName,i.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(t.inventoryitemDescription,i.profileStringVariables.integerValuesByHash),order:1e3,icon:t.inventoryitemIcon,type:"quest",inProgressValueStyle:0,completedValueStyle:0,tracked:(t.state&A.Tracked)==A.Tracked,state:t.state};typeof m.completionValue<"u"&&(P.nextLevelAt=m.completionValue,typeof m.objectiveInProgressValueStyle<"u"&&(P.inProgressValueStyle=m.objectiveInProgressValueStyle),typeof m.objectiveCompletedValueStyle<"u"&&(P.completedValueStyle=m.objectiveCompletedValueStyle),typeof m.progress<"u"&&(P.progressToNextLevel=m.progress),typeof m.objectiveProgressDescription<"u"&&(P.description=this.replaceStringVariables(m.objectiveProgressDescription,i.profileStringVariables.integerValuesByHash)),p.push(P))}}}for(let t of d){let s=(i.characterProgression.uninstancedItemObjectives[t.itemHash]??[]).filter(a=>a.visible&&!a.complete);for(let a of s){let m={name:this.replaceStringVariables(t.inventoryitemName,i.profileStringVariables.integerValuesByHash),description:this.replaceStringVariables(t.inventoryitemDescription,i.profileStringVariables.integerValuesByHash),order:1e4,icon:t.inventoryitemIcon,type:"quest",inProgressValueStyle:0,completedValueStyle:0,tracked:(t.state&A.Tracked)==A.Tracked,state:t.state};typeof a.completionValue<"u"&&(m.nextLevelAt=a.completionValue,typeof a.objectiveInProgressValueStyle<"u"&&(m.inProgressValueStyle=a.objectiveInProgressValueStyle),typeof a.objectiveCompletedValueStyle<"u"&&(m.completedValueStyle=a.objectiveCompletedValueStyle),typeof a.progress<"u"&&(m.progressToNextLevel=a.progress),typeof a.objectiveProgressDescription<"u"&&(m.description=this.replaceStringVariables(a.objectiveProgressDescription,i.profileStringVariables.integerValuesByHash)),p.push(m))}}return p},this.getCharacterRecords=function(i){let p=[],f=Object.keys(i.characterRecords.records);for(let o of f){let d=i.characterRecords.records[o];if(typeof d.objectives>"u"||(d.recordName??"").length===0)continue;let t=d.objectives.filter(s=>s.visible&&!s.complete);for(let s of t){let a={name:d.recordName,type:"characterRecord",order:100,icon:d.recordIcon,description:`${s.objectiveProgressDescription??""}`,progressToNextLevel:s.progress,nextLevelAt:s.completionValue,inProgressValueStyle:s.objectiveInProgressValueStyle,completedValueStyle:s.objectiveCompletedValueStyle,state:d.state};p.push(a)}}return p},this}}class ne{constructor(h,k){y(this,"checkIfAuthenticated");y(this,"getToken");y(this,"refreshToken");y(this,"checkManifestVersion");y(this,"checkStoredDefinitions");y(this,"loadDestinyContentData");y(this,"loadDataFromStorage");y(this,"getManifest");y(this,"loadCommonSettings");y(this,"getUserToken");y(this,"getLinkedProfiles");y(this,"getUserProfile");y(this,"getLastPlayedCharacter");y(this,"getNamedDataObject");y(this,"getPresentationNodeFromHash");y(this,"mapHashesToDefinitionsInObject");y(this,"getTrackableData");y(this,"apiToken");y(this,"applicationName");y(this,"cachedManifest");y(this,"destinyDataDefinition");y(this,"lastVersion");y(this,"profile");y(this,"linkedProfiles");y(this,"trackedGoals");y(this,"goalApi");s("Initializing");const c=window.db,i=window.eventEmitter,p="https://o2g.itssimple.se",f="https://www.bungie.net",o="https://www.bungie.net/Platform",d=["DestinyActivityTypeDefinition","DestinyActivityDefinition","DestinyArtifactDefinition","DestinyChecklistDefinition","DestinyClassDefinition","DestinyDestinationDefinition","DestinyDamageTypeDefinition","DestinyFactionDefinition","DestinyGenderDefinition","DestinyItemCategoryDefinition","DestinyItemTierTypeDefinition","DestinyInventoryBucketDefinition","DestinyInventoryItemDefinition","DestinyMedalTierDefinition","DestinyMetricDefinition","DestinyMilestoneDefinition","DestinyObjectiveDefinition","DestinyPlaceDefinition","DestinyPresentationNodeDefinition","DestinyProgressionDefinition","DestinyRaceDefinition","DestinyRecordDefinition","DestinySeasonDefinition","DestinySeasonPassDefinition","DestinyStatDefinition","DestinyTraitDefinition"],t={None:0,Profiles:100,VendorReceipts:101,ProfileInventories:102,ProfileCurrencies:103,ProfileProgression:104,PlatformSilver:105,Characters:200,CharacterInventories:201,CharacterProgressions:202,CharacterRenderData:203,CharacterActivities:204,CharacterEquipment:205,ItemInstances:300,ItemObjectives:301,ItemPerks:302,ItemRenderData:303,ItemStats:304,ItemSockets:305,ItemTalentGrids:306,ItemCommonData:307,ItemPlugStates:308,ItemPlugObjectives:309,ItemReusablePlugs:310,Vendors:400,VendorCategories:401,VendorSales:402,Kiosks:500,CurrencyLookups:600,PresentationNodes:700,Collectibles:800,Records:900,Transitory:1e3,Metrics:1100,StringVariables:1200};this.lastVersion=null,this.applicationName=k,this.apiToken=h,this.destinyDataDefinition={},this.trackedGoals=[];function s(...l){V("D2API",l)}async function a(l,e,n=null,D=null){let r={};return(n!==null||D!==null)&&(r["Content-Type"]="application/json",r["x-api-key"]=u.apiToken,D!==null&&(r.authorization=`Bearer ${D}`)),n!==null?await fetch(e,{method:l,headers:r,body:n}):await fetch(e,{method:l,headers:r})}async function m(){await c.getItem("destinyTokenExpires")<Date.now()&&(s("Token expired, refreshing"),await u.refreshToken())}function P(l){if(l.error)return s("Error handling token",JSON.stringify(l)),c.removeItem("destinyToken"),c.removeItem("destinyRefreshToken"),c.removeItem("destinyTokenExpires"),c.removeItem("destinyRefreshTokenExpires"),c.removeItem("destinyBungieMembershipId"),!1;c.setItem("destinyToken",l.access_token),c.setItem("destinyRefreshToken",l.refresh_token);let e=Date.now()+l.expires_in*1e3;c.setItem("destinyTokenExpires",e);let n=Date.now()+l.refresh_expires_in*1e3;return c.setItem("destinyRefreshTokenExpires",n),c.setItem("destinyBungieMembershipId",l.membership_id),!0}this.loadDataFromStorage=async()=>{s("Loading data from storage");let l=await c.getItem("manifest");l!==null&&(u.cachedManifest=JSON.parse(l));let e=await c.getItem("manifestVersion");e!==null&&(u.lastVersion=e),u.checkStoredDefinitions();for(let r of d){let I=await c.getItem(`destinyContent-${r}`);I!==null&&(u.destinyDataDefinition[r]=JSON.parse(I))}let n=await c.getItem("destiny-profile");n!==null&&(u.profile=JSON.parse(n));let D=await c.getItem("destiny-linkedProfiles");D!==null&&(u.linkedProfiles=JSON.parse(D)),s("Data loaded from storage"),i.emit("destiny-data-loaded")},this.checkIfAuthenticated=async()=>{try{await m();const l=await c.getItem("destinyToken")!==null;return i.emit("destiny2:authenticated",l),l}catch(l){return s("Error checking if authenticated",l),i.emit("destiny2:authenticated",!1),!1}},this.getToken=async(l,e)=>{const n=await a("POST",`${p}/token/${u.applicationName}`,JSON.stringify({code:e}));if(n.status===200){let D=await n.json();return P(D)?i.emit("destiny2:auth-success"):i.emit("destiny2:auth-failed"),D}s("Error getting token",n.status,n.statusText,await n.text()),i.emit("destiny2:auth-failed")},this.refreshToken=async()=>{const l=await c.getItem("destinyRefreshToken");if(l==null)return i.emit("destiny2:refreshToken",null),null;const e=await a("POST",`${p}/refresh/${u.applicationName}`,JSON.stringify({refresh_token:l}));if(e.status===200){let n=await e.json();P(n)?i.emit("destiny2:refresh-success"):i.emit("destiny2:refresh-failed");return}else i.emit("destiny2:refresh-failed")},this.checkManifestVersion=async()=>(s("Checking manifest version"),new Promise(async function(l,e){let n=await u.getManifest();if(n==null)return s("Failed to fetch API"),null;let D=await c.getItem("manifestVersion")??"null";if(n.Response.version!==D){await c.removeItem("lastManifestUpdate"),await c.removeItem("manifest"),await c.removeItem("manifestVersion");for(let r of d)await c.removeItem(`destinyContent-${r}`);u.cachedManifest=n.Response,await c.setItem("manifestVersion",n.Response.version),await c.setItem("manifest",JSON.stringify(u.cachedManifest)),await c.setItem("lastManifestUpdate",Date.now()),l({updatedManifest:!0,version:u.lastVersion}),s("Manifest updated");return}u.cachedManifest=n.Response,l({updatedManifest:!1,version:u.lastVersion}),s("Manifest version is up to date")})),this.checkStoredDefinitions=async function(l=!0){let e=[];for(let n of d)await c.getItem(`destinyContent-${n}`)===null&&e.push(n);if(e.length>0&&l){for(let n of e)await c.removeItem(`destinyContent-${n}`);await u.loadDestinyContentData(e)}return e},this.loadDestinyContentData=async function(l=[]){for(let e of l)await j(e)};async function j(l){let e=u.cachedManifest;const n=l.replace("Destiny","").split(/(?=[A-Z])/).join(" ");i.emit("loading-text",`Loading ${n}`);const D=await a("GET",`${f}${e.jsonWorldComponentContentPaths.en[l]}`);D.headers.get("content-length");let r=0;const I=new Response(new ReadableStream({async start(T){const N=D.body.getReader();let v=0;for(;;){var L=await N.read();if(L.done)break;r+=L.value.byteLength,v++,v%30===0&&i.emit("loading-text",`Loading ${n} (${new Intl.NumberFormat("sv-SE").format(Math.round(r/1024/1024*100+Number.EPSILON)/100)} MB)`),T.enqueue(L.value)}i.emit("loading-text",`Loading ${n} (${new Intl.NumberFormat("sv-SE").format(Math.round(r/1024/1024*100+Number.EPSILON)/100)} MB)`),T.close()}}));if(D.status!==200){V("Manifest download error",await I.json());return}const b=await I.json();u.destinyDataDefinition[l]=b,c.setItem(`destinyContent-${l}`,JSON.stringify(b))}this.getManifest=async function(){let l=await c.getItem("lastManifestUpdate");if(s("Checking if manifest is cached"),l!==null&&Date.now()-l<6e4*60){let n=await c.getItem("manifest");if(n!==null)return s("Manifest is cached"),{Response:JSON.parse(n)}}let e=await a("GET",`${o}/Destiny2/Manifest/`);if(e.status===200){let n=await e.json();return n.ErrorStatus=="Success"?(c.setItem("lastManifestUpdate",Date.now()),c.setItem("manifest",JSON.stringify(n.Response)),s("Manifest updated from API"),{Response:n.Response}):(s("Manifesterror"),s(n.Response),null)}else{let n=e.json();return s("Error when fetching Manifest"),s(n),null}},this.loadCommonSettings=async function(){await m();const l=await a("GET",`${o}/Settings`,null,await this.getUserToken());return l.status===200?await l.json():(s("Error fetching common settings",l.status,l.statusText),null)},this.getUserToken=async function(){return await c.getItem("destinyToken")},this.getLinkedProfiles=async function(l=!1){return l&&(u.linkedProfiles=null),u.linkedProfiles!=null?u.linkedProfiles:(await m(),new Promise(async(e,n)=>{var D=await c.getItem("destinyBungieMembershipId");let r=await a("GET",`${o}/Destiny2/-1/Profile/${D}/LinkedProfiles/`,null,await this.getUserToken());if(r.status===200){let I=await r.json();c.setItem("destiny-linkedProfiles",JSON.stringify(I.Response)),u.linkedProfiles=I.Response,e(I.Response)}else u.refreshToken(),n(r)}))},this.getUserProfile=async function(l,e){let n=[t.Profiles,t.ProfileInventories,t.ProfileCurrencies,t.ProfileProgression,t.Characters,t.CharacterInventories,t.CharacterProgressions,t.CharacterActivities,t.CharacterEquipment,t.ItemInstances,t.ItemObjectives,t.ItemSockets,t.ItemTalentGrids,t.ItemCommonData,t.ItemPlugStates,t.ItemPlugObjectives,t.ItemReusablePlugs,t.Metrics,t.Records,t.Collectibles,t.StringVariables];return await m(),new Promise(async(D,r)=>{let I=await a("GET",`${o}/Destiny2/${e}/Profile/${l}/?components=${n.join(",")}`,null,await this.getUserToken());if(I.status===200){let b=await I.json();c.setItem("destiny-profile",JSON.stringify(b.Response)),u.profile=b.Response,D(b.Response)}else u.refreshToken(),r(I)})},this.getLastPlayedCharacter=async function(l=!1){await m();let e=u.profile;if(l&&(e=null),u.linkedProfiles===null)return null;if(await u.getLinkedProfiles(l),u.linkedProfiles!==null&&u.linkedProfiles.profiles!==null&&u.linkedProfiles.profiles.length>0){var n=u.linkedProfiles.profiles.sort((b,T)=>b.dateLastPlayed>T.dateLastPlayed?-1:1)[0];e=await u.getUserProfile(n.membershipId,n.membershipType)}let D=[];for(let b of e.profile.data.characterIds)D.push(e.characters.data[b]);let r=D.sort((b,T)=>b.dateLastPlayed>T.dateLastPlayed?-1:1)[0];return{characterInfo:r,characterProgression:e.characterProgressions.disabled?{}:e.characterProgressions.data[r.characterId],characterActivities:e.characterActivities.disabled?{}:e.characterActivities.data[r.characterId],characterUninstancedItemComponents:e.characterUninstancedItemComponents[r.characterId].objectives.data,characterInventory:e.characterInventories.data[r.characterId].items,characterEquipment:e.characterEquipment.data[r.characterId].items,characterPlugSets:e.characterPlugSets.disabled?{}:e.characterPlugSets.data[r.characterId].plugs,characterCollectibles:e.characterCollectibles.data[r.characterId].collectibles,characterRecords:e.characterRecords.data[r.characterId],characterStringVariables:e.characterStringVariables.data[r.characterId],profileProgression:e.profileProgression.data,metrics:e.metrics.data.metrics,itemComponents:e.itemComponents,records:e.profileRecords.data,profileInventory:e.profileInventory.data.items,profileCurrency:e.profileCurrencies.data.items,profilePlugSets:e.profilePlugSets.disabled?{}:e.profilePlugSets.data.plugs,profileCollectibles:e.profileCollectibles.data,profile:e.profile.data,profileStringVariables:e.profileStringVariables.data}},this.getNamedDataObject=async function(l=!1){let e=await u.getLastPlayedCharacter(l);if(e==null)return null;let n={...e};for(let r of Object.keys(n.characterInfo.stats))n.characterInfo.stats[r]={statValue:n.characterInfo.stats[r],statHash:r};for(let r of Object.keys(n.metrics))n.metrics[r]={...n.metrics[r],metricHash:r};for(let r of Object.keys(n.records.records))n.records.records[r]={...n.records.records[r],recordHash:r,parentNodeHashes:u.destinyDataDefinition.DestinyRecordDefinition[r].parentNodeHashes};for(let r of Object.keys(n.characterRecords.records))n.characterRecords.records[r]={...n.characterRecords.records[r],recordHash:r,parentNodeHashes:u.destinyDataDefinition.DestinyRecordDefinition[r].parentNodeHashes};return n=u.mapHashesToDefinitionsInObject(n),await c.getItem("destiny2-use-cachebreaker",!1)&&e.characterInventory.filter(I=>I.lockable&&I.inventoryitemItemType==3).length>0,i.emit("destiny2-api-update",n),n},this.getPresentationNodeFromHash=function(l){const e=[],n=u.destinyDataDefinition.DestinyPresentationNodeDefinition[l];if(n&&(e.unshift({name:n.displayProperties.name,description:n.displayProperties.description,icon:n.displayProperties.icon,hash:l}),n.parentNodeHashes))for(let D of n.parentNodeHashes){const r=u.getPresentationNodeFromHash(D);for(let I of r)e.push(I)}return e},this.mapHashesToDefinitionsInObject=function(l){let e={...l},n=Object.keys(e);for(let D of n){let r=typeof e[D],I=e[D];if(Array.isArray(I)){for(let b=0;b<I.length;b++){let T=I[b];typeof T=="object"?I[b]=u.mapHashesToDefinitionsInObject(T):I[b]=T}e[D]=I}else if(r==="object"&&I!==null)e[D]=u.mapHashesToDefinitionsInObject(e[D]);else{if(D.indexOf("Hash")>-1&&!Array.isArray(I)){let b=D.split("Hash")[0].replace("current","").toLowerCase();switch(b){case"item":case"plugitem":b="inventoryitem";break}let T=d.find(v=>v.toLowerCase()==`Destiny${b}Definition`.toLowerCase()),N=u.destinyDataDefinition[T];if(N&&N[I]&&N[I].displayProperties){const v=N[I];v.displayProperties.name&&v.displayProperties.name.length>0?e[`${b}Name`]=v.displayProperties.name:v.setData&&v.setData.questLineName&&v.setData.questLineName.length>0&&(e[`${b}Name`]=v.setData.questLineName),v.displayProperties.description&&v.displayProperties.description.length>0&&(e[`${b}Description`]=v.displayProperties.description),v.displayProperties.icon&&v.displayProperties.icon.length>0&&(e[`${b}Icon`]=v.displayProperties.icon),v.progressDescription&&v.progressDescription.length>0&&(e[`${b}ProgressDescription`]=v.progressDescription),typeof v.inProgressValueStyle<"u"&&(e[`${b}InProgressValueStyle`]=v.inProgressValueStyle),typeof v.completedValueStyle<"u"&&(e[`${b}CompletedValueStyle`]=v.completedValueStyle),typeof v.itemType<"u"&&(e[`${b}ItemType`]=v.itemType),typeof v.parentNodeHashes<"u"&&(e.parentNodeHashes=v.parentNodeHashes.map(L=>u.getPresentationNodeFromHash(L)))}}e[D]=I}}return e},this.getTrackableData=async function(l=!1){let e=await u.getNamedDataObject(l);if(e==null)return null;let n=u.destinyDataDefinition.DestinySeasonDefinition[e.profile.currentSeasonHash],D=u.destinyDataDefinition.DestinySeasonPassDefinition[n.seasonPassHash],r=[],I=u.goalApi.getMilestoneData(e);for(let w of I)r.push(w);let b=u.goalApi.getBounties(e);for(let w of b)r.push(w);let T=u.goalApi.getQuests(e);for(let w of T)r.push(w);let N=u.goalApi.getCharacterRecords(e);for(let w of N)r.push(w);function v(w,R){if(typeof w.nextLevelAt<"u"&&typeof R.nextLevelAt<"u"){let H=w.progressToNextLevel/w.nextLevelAt*100,B=R.progressToNextLevel/R.nextLevelAt*100;return H<B?1:-1}return typeof w.endDate<"u"?typeof R.endDate>"u"||w.endDate<R.endDate?-1:1:w.order<R.order?1:-1}const L=r.filter(w=>w.tracked).sort(v),M=r.filter(w=>w.endDate&&!w.tracked).sort(v),O=r.filter(w=>!w.endDate&&!w.tracked).sort(v);return r=[...L,...M,...O],r.unshift(u.goalApi.getSeasonRankData(e,n,D)),u.trackedGoals=r,i.emit("goal-list-update",r),r};let u=this;return this.goalApi=new ie(this),s("Initialized"),this}}V("MAIN","Starting app...");window.eventEmitter=new te;window.db=new ee;window.apiClient=new ne("5625a52ed6b54ecfb8246071cfcd6085","everversedata");function se(){const g=x(!1),h=x(!1);return{isDataLoaded:g,isAuthenticated:h}}const E=se();window.appState=J(E);window.db.initializeDatabase().then(async()=>{V("MAIN","Database initialized, checking for updates..."),E.isAuthenticated.value=await window.apiClient.checkIfAuthenticated(),K(S(X,{}),document.getElementById("app"))});
//# sourceMappingURL=index-2fe4ef20.js.map
