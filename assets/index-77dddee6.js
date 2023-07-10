var w=Object.defineProperty;var k=(y,n,m)=>n in y?w(y,n,{enumerable:!0,configurable:!0,writable:!0,value:m}):y[n]=m;var f=(y,n,m)=>(k(y,typeof n!="symbol"?n+"":n,m),m);import{o as h,_ as p,R as b,D as T,c as S,B as D}from"./vendor-d09b161a.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const e of l.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&s(e)}).observe(document,{childList:!0,subtree:!0});function m(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=m(i);fetch(i.href,l)}})();function c(y,...n){console.log(`[${y}]`,JSON.stringify([...n]))}function E(){return h(p,{children:["Main page -"," ",h("a",{href:"https://o2g.itssimple.se/authenticate/everversedata?state=dataverse-"+new Date().getTime(),children:"Log in"})]})}function v(){const y=window.apiClient,n=b();c("Auth","Authenticated page, getting code",n);const s=new URL(n,location.origin).searchParams.get("code");return c("Auth","Code",s),s?(y.getToken("",s).then(()=>{c("Auth","Got token, redirecting to dashboard"),location.href="/#/dashboard"}).catch(i=>{c("Auth","Failed to get token, redirecting to main page"),location.href="/"}),h(p,{children:"Authenticated, redirecting to Dashboard"})):(c("Auth","No code found, redirecting to main page"),location.href="/",h(p,{children:"Redirecting to main page"}))}function A(){return h(p,{children:"Blep"})}function x(){return h("footer",{className:"fui body fiction",children:["© 2023",new Date().getUTCFullYear()!=2023?" - "+new Date().getUTCFullYear():null," ","NoLifeKing85#2914"]})}function B(y){return console.log(y),h(p,{children:[h("header",{className:"header tooltip",children:"Dataverse"}),h("div",{class:"app",children:h(T,{history:S(),children:[h(p,{path:"/",children:h(E,{})}),h(p,{path:"/authenticated",children:h(v,{})}),h(p,{path:"/dashboard",children:h(A,{})})]})}),h(x,{})]})}class j{constructor(){f(this,"DBInstance");f(this,"initializeDatabase");f(this,"setItem");f(this,"setItems");f(this,"getItem");f(this,"removeItem");f(this,"setStorageItem");f(this,"setStorageItems");f(this,"getStorageItem");f(this,"getStorageItems");f(this,"removeStorageItem");this.DBInstance=null,this.initializeDatabase=async function(){return new Promise((e,t)=>{let a=window.indexedDB.open("destiny2-dataverse",2);a.onupgradeneeded=function(o){const r=a.result;c("DB","Old",o.oldVersion,"New",o.newVersion),o.oldVersion<1&&(c("DB","Creating first version of database, since it never existed on this installation."),r.createObjectStore("storage",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key")),o.oldVersion<2&&(c("DB","Creating object store for player/character activity"),r.createObjectStore("playerActivity",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"),r.createObjectStore("activityDetails",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"))},a.onsuccess=function(o){c("DB","Loaded database"),l.DBInstance=o.target.result,e()},a.onerror=function(o){c("DB","Failed to load database"),t(o)}})};async function n(e,t,a){return new Promise((o,r)=>{const d=l.DBInstance.transaction(e,"readwrite").objectStore(e).put({key:t,value:a});d.onsuccess=function(){o()},d.onerror=function(I){r(I)}})}async function m(e,t=null){return new Promise((a,o)=>{const u=l.DBInstance.transaction(e,"readonly").objectStore(e).getAll();u.onsuccess=function(){const d=u.result;a(t?d.filter(t):d)},u.onerror=function(d){o(d)}})}async function s(e,t,a=null){return new Promise((o,r)=>{const d=l.DBInstance.transaction(e,"readonly").objectStore(e).get(t);d.onsuccess=function(I){I.target.result?o(I.target.result.value):o(a)},d.onerror=function(I){r(I)}})}async function i(e,t){return new Promise((a,o)=>{const u=l.DBInstance.transaction(e,"readwrite").objectStore(e).delete(t);u.onsuccess=function(){a()},u.onerror=function(d){o(d)}})}this.setItem=async function(e,t){return await n("storage",e,t)},this.setItems=async function(e){for(let t of e)await n("storage",t.key,t.value)},this.getItem=async function(e,t=null){return await s("storage",e,t)},this.removeItem=async function(e){return await i("storage",e)},this.setStorageItem=async function(e,t,a){return await n(e,t,a)},this.setStorageItems=async function(e,t){for(let a of t)await n(e,a.key,a.value)},this.getStorageItem=async function(e,t,a=null){return await s(e,t,a)},this.getStorageItems=async function(e,t=null){return await m(e,t)},this.removeStorageItem=async function(e,t){return await i(e,t)};var l=this;return this}}class N{constructor(){f(this,"eventListeners");f(this,"addEventListener");f(this,"emit");return this.eventListeners=[],this.addEventListener=function(n,m){c("EVENT:REGISTERED",n),this.eventListeners.push({eventName:n,handler:m})},this.emit=async function(n,...m){return JSON.parse(await window.db.getItem("d2-debugmode")??"false")?c("EVENT:EMITTING",n,...m):c("EVENT:EMITTING",n),new Promise((i,l)=>{this.eventListeners.filter(e=>e.eventName==n).forEach(async e=>{try{await e.handler(...m)}catch(t){c("EVENT:ERROR",n,t),console.error(t),l(t)}}),i(!0)})},c("EventEmitter","Initialized"),this}}class O{constructor(n,m){f(this,"checkIfAuthenticated");f(this,"getToken");f(this,"refreshToken");f(this,"apiToken");f(this,"applicationName");c("Destiny2ApiClient","Initializing");const s=window.db,i=window.eventEmitter,l="https://o2g.itssimple.se";this.applicationName=m,this.apiToken=n;async function e(r,g,u=null,d=null){return u!==null?await fetch(g,{method:r,headers:{"x-api-key":o.apiToken,authorization:d!=null?`Bearer ${d}`:"","Content-Type":"application/json"},body:u}):await fetch(g,{method:r,headers:{"x-api-key":o.apiToken,authorization:d!=null?`Bearer ${d}`:""}})}async function t(){await s.getItem("destinyTokenExpires")<Date.now()&&(c("Destiny2ApiClient","Token expired, refreshing"),await o.refreshToken())}function a(r){if(r.error)return c("Destiny2ApiClient","Error handling token",JSON.stringify(r)),s.removeItem("destinyToken"),s.removeItem("destinyRefreshToken"),s.removeItem("destinyTokenExpires"),s.removeItem("destinyRefreshTokenExpires"),s.removeItem("destinyBungieMembershipId"),!1;s.setItem("destinyToken",r.access_token),s.setItem("destinyRefreshToken",r.refresh_token);let g=Date.now()+r.expires_in*1e3;s.setItem("destinyTokenExpires",g);let u=Date.now()+r.refresh_expires_in*1e3;return s.setItem("destinyRefreshTokenExpires",u),s.setItem("destinyBungieMembershipId",r.membership_id),!0}this.checkIfAuthenticated=async()=>{try{await t();const r=await s.getItem("destinyToken")!==null;return i.emit("destiny2:authenticated",r),r}catch(r){return c("Destiny2ApiClient","Error checking if authenticated",r),i.emit("destiny2:authenticated",!1),!1}},this.getToken=async(r,g)=>{const u=await e("POST",`${l}/token/${o.applicationName}`,JSON.stringify({code:g}));if(u.status===200){let d=await u.json();return a(d)?i.emit("destiny2:auth-success"):i.emit("destiny2:auth-failed"),d}c("Destiny2ApiClient","Error getting token",u.status,u.statusText,await u.text()),i.emit("destiny2:auth-failed")},this.refreshToken=async()=>{const r=await s.getItem("destinyRefreshToken");if(r==null)return i.emit("destiny2:refreshToken",null),null;const g=await e("POST",`${l}/refresh/${o.applicationName}`,JSON.stringify({refresh_token:r}));if(g.status===200){let u=await g.json();a(u)?i.emit("destiny2:refresh-success"):i.emit("destiny2:refresh-failed");return}else i.emit("destiny2:refresh-failed")};let o=this;return c("Destiny2ApiClient","Initialized"),this}}c("MAIN","Starting app...");window.eventEmitter=new N;window.db=new j;window.apiClient=new O("5625a52ed6b54ecfb8246071cfcd6085","everversedata");window.db.initializeDatabase().then(async()=>{c("MAIN","Database initialized, checking for updates...");const y=await window.apiClient.checkIfAuthenticated();D(h(B,{authenticated:y}),document.getElementById("app"))});
//# sourceMappingURL=index-77dddee6.js.map
