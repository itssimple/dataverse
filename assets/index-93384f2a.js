var w=Object.defineProperty;var k=(g,n,y)=>n in g?w(g,n,{enumerable:!0,configurable:!0,writable:!0,value:y}):g[n]=y;var f=(g,n,y)=>(k(g,typeof n!="symbol"?n+"":n,y),y);import{o as h,_ as I,R as b,D as T,c as S,B as E}from"./vendor-d09b161a.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const e of c.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&o(e)}).observe(document,{childList:!0,subtree:!0});function y(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=y(i);fetch(i.href,c)}})();function a(g,...n){console.log(`[${g}]`,JSON.stringify([...n]))}function D(){return h(I,{children:["Main page -"," ",h("a",{href:"https://o2g.itssimple.se/authenticate/everversedata?state=dataverse-"+new Date().getTime(),children:"Log in"})]})}function v(){const g=window.apiClient,n=b();a("Auth","Authenticated page, getting code",n);const o=new URL(n,location.origin).searchParams.get("code");return a("Auth","Code",o),o?(g.getToken("",o).then(()=>{a("Auth","Got token, redirecting to dashboard"),location.href="/#/dashboard"}).catch(i=>{a("Auth","Failed to get token, redirecting to main page"),location.href="/"}),h(I,{children:"Authenticated, redirecting to Dashboard"})):(a("Auth","No code found, redirecting to main page"),location.href="/",h(I,{children:"Redirecting to main page"}))}function A(){return h(I,{children:"Blep"})}function x(){return h("footer",{className:"fui body fiction",children:["© 2023",new Date().getUTCFullYear()!=2023?" - "+new Date().getUTCFullYear():null," ","NoLifeKing85#2914"]})}function B(){return h(I,{children:[h("header",{className:"header tooltip",children:"Dataverse"}),h("div",{class:"app",children:h(T,{history:S(),children:[h(I,{path:"/",children:h(D,{})}),h(I,{path:"/authenticated",children:h(v,{})}),h(I,{path:"/dashboard",children:h(A,{})})]})}),h(x,{})]})}class P{constructor(){f(this,"DBInstance");f(this,"initializeDatabase");f(this,"setItem");f(this,"setItems");f(this,"getItem");f(this,"removeItem");f(this,"setStorageItem");f(this,"setStorageItems");f(this,"getStorageItem");f(this,"getStorageItems");f(this,"removeStorageItem");this.DBInstance=null,this.initializeDatabase=async function(){return new Promise((e,t)=>{let l=window.indexedDB.open("destiny2-dataverse",2);l.onupgradeneeded=function(u){const p=l.result;a("DB","Old",u.oldVersion,"New",u.newVersion),u.oldVersion<1&&(a("DB","Creating first version of database, since it never existed on this installation."),p.createObjectStore("storage",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key")),u.oldVersion<2&&(a("DB","Creating object store for player/character activity"),p.createObjectStore("playerActivity",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"),p.createObjectStore("activityDetails",{autoIncrement:!1,keyPath:"key"}).createIndex("by_key","key"))},l.onsuccess=function(u){a("DB","Loaded database"),c.DBInstance=u.target.result,e()},l.onerror=function(u){a("DB","Failed to load database"),t(u)}})};async function n(e,t,l){return new Promise((u,p)=>{const s=c.DBInstance.transaction(e,"readwrite").objectStore(e).put({key:t,value:l});s.onsuccess=function(){u()},s.onerror=function(m){p(m)}})}async function y(e,t=null){return new Promise((l,u)=>{const d=c.DBInstance.transaction(e,"readonly").objectStore(e).getAll();d.onsuccess=function(){const s=d.result;l(t?s.filter(t):s)},d.onerror=function(s){u(s)}})}async function o(e,t,l=null){return new Promise((u,p)=>{const s=c.DBInstance.transaction(e,"readonly").objectStore(e).get(t);s.onsuccess=function(m){m.target.result?u(m.target.result.value):u(l)},s.onerror=function(m){p(m)}})}async function i(e,t){return new Promise((l,u)=>{const d=c.DBInstance.transaction(e,"readwrite").objectStore(e).delete(t);d.onsuccess=function(){l()},d.onerror=function(s){u(s)}})}this.setItem=async function(e,t){return await n("storage",e,t)},this.setItems=async function(e){for(let t of e)await n("storage",t.key,t.value)},this.getItem=async function(e,t=null){return await o("storage",e,t)},this.removeItem=async function(e){return await i("storage",e)},this.setStorageItem=async function(e,t,l){return await n(e,t,l)},this.setStorageItems=async function(e,t){for(let l of t)await n(e,l.key,l.value)},this.getStorageItem=async function(e,t,l=null){return await o(e,t,l)},this.getStorageItems=async function(e,t=null){return await y(e,t)},this.removeStorageItem=async function(e,t){return await i(e,t)};var c=this;return this}}class j{constructor(){f(this,"eventListeners");f(this,"addEventListener");f(this,"emit");return this.eventListeners=[],this.addEventListener=function(n,y){a("EVENT:REGISTERED",n),this.eventListeners.push({eventName:n,handler:y})},this.emit=async function(n,...y){return JSON.parse(await window.db.getItem("d2-debugmode")??"false")?a("EVENT:EMITTING",n,...y):a("EVENT:EMITTING",n),new Promise((i,c)=>{this.eventListeners.filter(e=>e.eventName==n).forEach(async e=>{try{await e.handler(...y)}catch(t){a("EVENT:ERROR",n,t),console.error(t),c(t)}}),i(!0)})},a("EventEmitter","Initialized"),this}}class O{constructor(n,y){f(this,"checkIfAuthenticated");f(this,"getToken");f(this,"refreshToken");f(this,"apiToken");a("Destiny2ApiClient","Initializing");const o=window.db,i=window.eventEmitter,c="https://o2g.itssimple.se";let e=y;this.apiToken=n;async function t(r,d,s=null,m=null){return s!==null?await fetch(d,{method:r,headers:{"x-api-key":p.apiToken,authorization:m!=null?`Bearer ${m}`:"","Content-Type":"application/json"},body:s}):await fetch(d,{method:r,headers:{"x-api-key":p.apiToken,authorization:m!=null?`Bearer ${m}`:""}})}async function l(){await o.getItem("destinyTokenExpires")<Date.now()&&(a("Destiny2ApiClient","Token expired, refreshing"),await p.refreshToken())}function u(r){if(r.error)return a("Destiny2ApiClient","Error handling token",JSON.stringify(r)),o.removeItem("destinyToken"),o.removeItem("destinyRefreshToken"),o.removeItem("destinyTokenExpires"),o.removeItem("destinyRefreshTokenExpires"),o.removeItem("destinyBungieMembershipId"),!1;o.setItem("destinyToken",r.access_token),o.setItem("destinyRefreshToken",r.refresh_token);let d=Date.now()+r.expires_in*1e3;o.setItem("destinyTokenExpires",d);let s=Date.now()+r.refresh_expires_in*1e3;return o.setItem("destinyRefreshTokenExpires",s),o.setItem("destinyBungieMembershipId",r.membership_id),!0}this.checkIfAuthenticated=async()=>{try{await l();const r=await o.getItem("destinyToken")!==null;return i.emit("destiny2:authenticated",r),r}catch(r){return a("Destiny2ApiClient","Error checking if authenticated",r),i.emit("destiny2:authenticated",!1),!1}},this.getToken=async(r,d)=>{const s=await t("POST",`${c}/token/${e}`,JSON.stringify({code:d}));if(s.status===200){let m=await s.json();return u(m)?i.emit("destiny2:auth-success"):i.emit("destiny2:auth-failed"),m}a("Destiny2ApiClient","Error getting token",s.status,s.statusText,await s.text()),i.emit("destiny2:auth-failed")},this.refreshToken=async()=>{const r=await o.getItem("destinyRefreshToken");if(r==null)return i.emit("destiny2:refreshToken",null),null;const d=await t("POST",`${c}/refresh/${e}`,JSON.stringify({refresh_token:r}));if(d.status===200){let s=await d.json();u(s)?i.emit("destiny2:refresh-success"):i.emit("destiny2:refresh-failed");return}else i.emit("destiny2:refresh-failed")};let p=this;return a("Destiny2ApiClient","Initialized"),this}}a("MAIN","Starting app...");window.eventEmitter=new j;window.db=new P;window.apiClient=new O("5625a52ed6b54ecfb8246071cfcd6085",{}.VITE_BUNGIE_API_APP);window.db.initializeDatabase().then(async()=>{a("MAIN","Database initialized, checking for updates...")});E(h(B,{}),document.getElementById("app"));
//# sourceMappingURL=index-93384f2a.js.map
