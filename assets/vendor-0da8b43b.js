var V,d,De,S,Pe,Me,he,Ne,ee={},Re=[],it=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function H(e,t){for(var n in t)e[n]=t[n];return e}function Fe(e){var t=e.parentNode;t&&t.removeChild(e)}function We(e,t,n){var r,o,a,_={};for(a in t)a=="key"?r=t[a]:a=="ref"?o=t[a]:_[a]=t[a];if(arguments.length>2&&(_.children=arguments.length>3?V.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)_[a]===void 0&&(_[a]=e.defaultProps[a]);return j(e,_,r,o,null)}function j(e,t,n,r,o){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o??++De};return o==null&&d.vnode!=null&&d.vnode(a),a}function oe(e){return e.children}function B(e,t){this.props=e,this.context=t}function q(e,t){if(t==null)return e.__?q(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?q(e):null}function je(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return je(e)}}function de(e){(!e.__d&&(e.__d=!0)&&S.push(e)&&!te.__r++||Pe!==d.debounceRendering)&&((Pe=d.debounceRendering)||Me)(te)}function te(){var e,t,n,r,o,a,_,s;for(S.sort(he);e=S.shift();)e.__d&&(t=S.length,r=void 0,o=void 0,_=(a=(n=e).__v).__e,(s=n.__P)&&(r=[],(o=H({},a)).__v=a.__v+1,ge(s,a,o,n.__n,s.ownerSVGElement!==void 0,a.__h!=null?[_]:null,r,_??q(a),a.__h),Ge(r,a),a.__e!=_&&je(a)),S.length>t&&S.sort(he));te.__r=0}function Be(e,t,n,r,o,a,_,s,f,c){var i,p,l,u,h,P,m,g=r&&r.__k||Re,w=g.length;for(n.__k=[],i=0;i<t.length;i++)if((u=n.__k[i]=(u=t[i])==null||typeof u=="boolean"||typeof u=="function"?null:typeof u=="string"||typeof u=="number"||typeof u=="bigint"?j(null,u,null,null,u):Array.isArray(u)?j(oe,{children:u},null,null,null):u.__b>0?j(u.type,u.props,u.key,u.ref?u.ref:null,u.__v):u)!=null){if(u.__=n,u.__b=n.__b+1,(l=g[i])===null||l&&u.key==l.key&&u.type===l.type)g[i]=void 0;else for(p=0;p<w;p++){if((l=g[p])&&u.key==l.key&&u.type===l.type){g[p]=void 0;break}l=null}ge(e,u,l=l||ee,o,a,_,s,f,c),h=u.__e,(p=u.ref)&&l.ref!=p&&(m||(m=[]),l.ref&&m.push(l.ref,null,u),m.push(p,u.__c||h,u)),h!=null?(P==null&&(P=h),typeof u.type=="function"&&u.__k===l.__k?u.__d=f=qe(u,f,e):f=Ve(e,u,l,g,h,f),typeof n.type=="function"&&(n.__d=f)):f&&l.__e==f&&f.parentNode!=e&&(f=q(l))}for(n.__e=P,i=w;i--;)g[i]!=null&&(typeof n.type=="function"&&g[i].__e!=null&&g[i].__e==n.__d&&(n.__d=Ke(r).nextSibling),Je(g[i],g[i]));if(m)for(i=0;i<m.length;i++)ze(m[i],m[++i],m[++i])}function qe(e,t,n){for(var r,o=e.__k,a=0;o&&a<o.length;a++)(r=o[a])&&(r.__=e,t=typeof r.type=="function"?qe(r,t,n):Ve(n,r,r,o,r.__e,t));return t}function pe(e,t){return t=t||[],e==null||typeof e=="boolean"||(Array.isArray(e)?e.some(function(n){pe(n,t)}):t.push(e)),t}function Ve(e,t,n,r,o,a){var _,s,f;if(t.__d!==void 0)_=t.__d,t.__d=void 0;else if(n==null||o!=a||o.parentNode==null)e:if(a==null||a.parentNode!==e)e.appendChild(o),_=null;else{for(s=a,f=0;(s=s.nextSibling)&&f<r.length;f+=1)if(s==o)break e;e.insertBefore(o,a),_=a}return _!==void 0?_:o.nextSibling}function Ke(e){var t,n,r;if(e.type==null||typeof e.type=="string")return e.__e;if(e.__k){for(t=e.__k.length-1;t>=0;t--)if((n=e.__k[t])&&(r=Ke(n)))return r}return null}function at(e,t,n,r,o){var a;for(a in n)a==="children"||a==="key"||a in t||ne(e,a,null,n[a],r);for(a in t)o&&typeof t[a]!="function"||a==="children"||a==="key"||a==="value"||a==="checked"||n[a]===t[a]||ne(e,a,t[a],n[a],r)}function ke(e,t,n){t[0]==="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||it.test(t)?n:n+"px"}function ne(e,t,n,r,o){var a;e:if(t==="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||ke(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||ke(e.style,t,n[t])}else if(t[0]==="o"&&t[1]==="n")a=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=n,n?r||e.addEventListener(t,a?xe:we,a):e.removeEventListener(t,a?xe:we,a);else if(t!=="dangerouslySetInnerHTML"){if(o)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!=="width"&&t!=="height"&&t!=="href"&&t!=="list"&&t!=="form"&&t!=="tabIndex"&&t!=="download"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!=="-"?e.removeAttribute(t):e.setAttribute(t,n))}}function we(e){return this.l[e.type+!1](d.event?d.event(e):e)}function xe(e){return this.l[e.type+!0](d.event?d.event(e):e)}function ge(e,t,n,r,o,a,_,s,f){var c,i,p,l,u,h,P,m,g,w,D,O,R,U,$,k=t.type;if(t.constructor!==void 0)return null;n.__h!=null&&(f=n.__h,s=t.__e=n.__e,t.__h=null,a=[s]),(c=d.__b)&&c(t);try{e:if(typeof k=="function"){if(m=t.props,g=(c=k.contextType)&&r[c.__c],w=c?g?g.props.value:c.__:r,n.__c?P=(i=t.__c=n.__c).__=i.__E:("prototype"in k&&k.prototype.render?t.__c=i=new k(m,w):(t.__c=i=new B(m,w),i.constructor=k,i.render=st),g&&g.sub(i),i.props=m,i.state||(i.state={}),i.context=w,i.__n=r,p=i.__d=!0,i.__h=[],i._sb=[]),i.__s==null&&(i.__s=i.state),k.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=H({},i.__s)),H(i.__s,k.getDerivedStateFromProps(m,i.__s))),l=i.props,u=i.state,i.__v=t,p)k.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(k.getDerivedStateFromProps==null&&m!==l&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(m,w),!i.__e&&i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(m,i.__s,w)===!1||t.__v===n.__v){for(t.__v!==n.__v&&(i.props=m,i.state=i.__s,i.__d=!1),i.__e=!1,t.__e=n.__e,t.__k=n.__k,t.__k.forEach(function(M){M&&(M.__=t)}),D=0;D<i._sb.length;D++)i.__h.push(i._sb[D]);i._sb=[],i.__h.length&&_.push(i);break e}i.componentWillUpdate!=null&&i.componentWillUpdate(m,i.__s,w),i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(l,u,h)})}if(i.context=w,i.props=m,i.__P=e,O=d.__r,R=0,"prototype"in k&&k.prototype.render){for(i.state=i.__s,i.__d=!1,O&&O(t),c=i.render(i.props,i.state,i.context),U=0;U<i._sb.length;U++)i.__h.push(i._sb[U]);i._sb=[]}else do i.__d=!1,O&&O(t),c=i.render(i.props,i.state,i.context),i.state=i.__s;while(i.__d&&++R<25);i.state=i.__s,i.getChildContext!=null&&(r=H(H({},r),i.getChildContext())),p||i.getSnapshotBeforeUpdate==null||(h=i.getSnapshotBeforeUpdate(l,u)),$=c!=null&&c.type===oe&&c.key==null?c.props.children:c,Be(e,Array.isArray($)?$:[$],t,n,r,o,a,_,s,f),i.base=t.__e,t.__h=null,i.__h.length&&_.push(i),P&&(i.__E=i.__=null),i.__e=!1}else a==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=_t(n.__e,t,n,r,o,a,_,f);(c=d.diffed)&&c(t)}catch(M){t.__v=null,(f||a!=null)&&(t.__e=s,t.__h=!!f,a[a.indexOf(s)]=null),d.__e(M,t,n)}}function Ge(e,t){d.__c&&d.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(r){r.call(n)})}catch(r){d.__e(r,n.__v)}})}function _t(e,t,n,r,o,a,_,s){var f,c,i,p=n.props,l=t.props,u=t.type,h=0;if(u==="svg"&&(o=!0),a!=null){for(;h<a.length;h++)if((f=a[h])&&"setAttribute"in f==!!u&&(u?f.localName===u:f.nodeType===3)){e=f,a[h]=null;break}}if(e==null){if(u===null)return document.createTextNode(l);e=o?document.createElementNS("http://www.w3.org/2000/svg",u):document.createElement(u,l.is&&l),a=null,s=!1}if(u===null)p===l||s&&e.data===l||(e.data=l);else{if(a=a&&V.call(e.childNodes),c=(p=n.props||ee).dangerouslySetInnerHTML,i=l.dangerouslySetInnerHTML,!s){if(a!=null)for(p={},h=0;h<e.attributes.length;h++)p[e.attributes[h].name]=e.attributes[h].value;(i||c)&&(i&&(c&&i.__html==c.__html||i.__html===e.innerHTML)||(e.innerHTML=i&&i.__html||""))}if(at(e,l,p,o,s),i)t.__k=[];else if(h=t.props.children,Be(e,Array.isArray(h)?h:[h],t,n,r,o&&u!=="foreignObject",a,_,a?a[0]:n.__k&&q(n,0),s),a!=null)for(h=a.length;h--;)a[h]!=null&&Fe(a[h]);s||("value"in l&&(h=l.value)!==void 0&&(h!==e.value||u==="progress"&&!h||u==="option"&&h!==p.value)&&ne(e,"value",h,p.value,!1),"checked"in l&&(h=l.checked)!==void 0&&h!==e.checked&&ne(e,"checked",h,p.checked,!1))}return e}function ze(e,t,n){try{typeof e=="function"?e(t):e.current=t}catch(r){d.__e(r,n)}}function Je(e,t,n){var r,o;if(d.unmount&&d.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||ze(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){d.__e(a,t)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&Je(r[o],t,n||typeof e.type!="function");n||e.__e==null||Fe(e.__e),e.__=e.__e=e.__d=void 0}function st(e,t,n){return this.constructor(e,n)}function Rt(e,t,n){var r,o,a;d.__&&d.__(e,t),o=(r=typeof n=="function")?null:n&&n.__k||t.__k,a=[],ge(t,e=(!r&&n||t).__k=We(oe,null,[e]),o||ee,ee,t.ownerSVGElement!==void 0,!r&&n?[n]:o?null:t.firstChild?V.call(t.childNodes):null,a,!r&&n?n:o?o.__e:t.firstChild,r),Ge(a,e)}function ut(e,t,n){var r,o,a,_=H({},e.props);for(a in t)a=="key"?r=t[a]:a=="ref"?o=t[a]:_[a]=t[a];return arguments.length>2&&(_.children=arguments.length>3?V.call(arguments,2):n),j(e.type,_,r||e.key,o||e.ref,null)}function ft(e,t){var n={__c:t="__cC"+Ne++,__:e,Consumer:function(r,o){return r.children(o)},Provider:function(r){var o,a;return this.getChildContext||(o=[],(a={})[t]=this,this.getChildContext=function(){return a},this.shouldComponentUpdate=function(_){this.props.value!==_.value&&o.some(function(s){s.__e=!0,de(s)})},this.sub=function(_){o.push(_);var s=_.componentWillUnmount;_.componentWillUnmount=function(){o.splice(o.indexOf(_),1),s&&s.call(_)}}),r.children}};return n.Provider.__=n.Consumer.contextType=n}V=Re.slice,d={__e:function(e,t,n,r){for(var o,a,_;t=t.__;)if((o=t.__c)&&!o.__)try{if((a=o.constructor)&&a.getDerivedStateFromError!=null&&(o.setState(a.getDerivedStateFromError(e)),_=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,r||{}),_=o.__d),_)return o.__E=o}catch(s){e=s}throw e}},De=0,B.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=H({},this.state),typeof e=="function"&&(e=e(H({},n),this.props)),e&&H(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),de(this))},B.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),de(this))},B.prototype.render=oe,S=[],Me=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,he=function(e,t){return e.__v.__b-t.__v.__b},te.__r=0,Ne=0;var T,_e,Ae,Qe=[],se=[],$e=d.__b,Ce=d.__r,Te=d.diffed,Ee=d.__c,He=d.unmount;function ct(){for(var e;e=Qe.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Y),e.__H.__h.forEach(ve),e.__H.__h=[]}catch(t){e.__H.__h=[],d.__e(t,e.__v)}}d.__b=function(e){T=null,$e&&$e(e)},d.__r=function(e){Ce&&Ce(e);var t=(T=e.__c).__H;t&&(_e===T?(t.__h=[],T.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=se,n.__N=n.i=void 0})):(t.__h.forEach(Y),t.__h.forEach(ve),t.__h=[])),_e=T},d.diffed=function(e){Te&&Te(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Qe.push(t)!==1&&Ae===d.requestAnimationFrame||((Ae=d.requestAnimationFrame)||lt)(ct)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==se&&(n.__=n.__V),n.i=void 0,n.__V=se})),_e=T=null},d.__c=function(e,t){t.some(function(n){try{n.__h.forEach(Y),n.__h=n.__h.filter(function(r){return!r.__||ve(r)})}catch(r){t.some(function(o){o.__h&&(o.__h=[])}),t=[],d.__e(r,n.__v)}}),Ee&&Ee(e,t)},d.unmount=function(e){He&&He(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(r){try{Y(r)}catch(o){t=o}}),n.__H=void 0,t&&d.__e(t,n.__v))};var Oe=typeof requestAnimationFrame=="function";function lt(e){var t,n=function(){clearTimeout(r),Oe&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);Oe&&(t=requestAnimationFrame(n))}function Y(e){var t=T,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),T=t}function ve(e){var t=T;e.__c=e.__(),T=t}var ht={};function Q(e,t){for(var n in t)e[n]=t[n];return e}function dt(e,t,n){var r,o=/(?:\?([^#]*))?(#.*)?$/,a=e.match(o),_={};if(a&&a[1])for(var s=a[1].split("&"),f=0;f<s.length;f++){var c=s[f].split("=");_[decodeURIComponent(c[0])]=decodeURIComponent(c.slice(1).join("="))}e=me(e.replace(o,"")),t=me(t||"");for(var i=Math.max(e.length,t.length),p=0;p<i;p++)if(t[p]&&t[p].charAt(0)===":"){var l=t[p].replace(/(^:|[+*?]+$)/g,""),u=(t[p].match(/[+*?]+$/)||ht)[0]||"",h=~u.indexOf("+"),P=~u.indexOf("*"),m=e[p]||"";if(!m&&!P&&(u.indexOf("?")<0||h)){r=!1;break}if(_[l]=decodeURIComponent(m),h||P){_[l]=e.slice(p).map(decodeURIComponent).join("/");break}}else if(t[p]!==e[p]){r=!1;break}return(n.default===!0||r!==!1)&&_}function pt(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function vt(e,t){return e.index=t,e.rank=function(n){return n.props.default?0:me(n.props.path).map(mt).join("")}(e),e.props}function me(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function mt(e){return e.charAt(0)==":"?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var gt={},I=[],Ue=[],A=null,Xe={url:ye()},yt=ft(Xe);function ye(){var e;return""+((e=A&&A.location?A.location:A&&A.getCurrentLocation?A.getCurrentLocation():typeof location<"u"?location:gt).pathname||"")+(e.search||"")}function bt(e,t){return t===void 0&&(t=!1),typeof e!="string"&&e.url&&(t=e.replace,e=e.url),function(n){for(var r=I.length;r--;)if(I[r].canRoute(n))return!0;return!1}(e)&&function(n,r){r===void 0&&(r="push"),A&&A[r]?A[r](n):typeof history<"u"&&history[r+"State"]&&history[r+"State"](null,null,n)}(e,t?"replace":"push"),Ye(e)}function Ye(e){for(var t=!1,n=0;n<I.length;n++)I[n].routeTo(e)&&(t=!0);return t}function Pt(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),n=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return bt(t)}}function kt(e){return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1}function wt(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)){var t=e.target;do if(t.localName==="a"&&t.getAttribute("href")){if(t.hasAttribute("data-native")||t.hasAttribute("native"))return;if(Pt(t))return kt(e)}while(t=t.parentNode)}}var Le=!1;function xt(e){e.history&&(A=e.history),this.state={url:e.url||ye()}}Q(xt.prototype=new B,{shouldComponentUpdate:function(e){return e.static!==!0||e.url!==this.props.url||e.onChange!==this.props.onChange},canRoute:function(e){var t=pe(this.props.children);return this.g(t,e)!==void 0},routeTo:function(e){this.setState({url:e});var t=this.canRoute(e);return this.p||this.forceUpdate(),t},componentWillMount:function(){this.p=!0},componentDidMount:function(){var e=this;Le||(Le=!0,A||addEventListener("popstate",function(){Ye(ye())}),addEventListener("click",wt)),I.push(this),A&&(this.u=A.listen(function(t){var n=t.location||t;e.routeTo(""+(n.pathname||"")+(n.search||""))})),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),I.splice(I.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function(e,t){e=e.filter(vt).sort(pt);for(var n=0;n<e.length;n++){var r=e[n],o=dt(t,r.props.path,r.props);if(o)return[r,o]}},render:function(e,t){var n,r,o=e.onChange,a=t.url,_=this.c,s=this.g(pe(e.children),a);if(s&&(r=ut(s[0],Q(Q({url:a,matches:n=s[1]},n),{key:void 0,ref:void 0}))),a!==(_&&_.url)){Q(Xe,_=this.c={url:a,previous:_&&_.url,current:r,path:r?r.props.path:null,matches:n}),_.router=this,_.active=r?[r]:[];for(var f=Ue.length;f--;)Ue[f]({});typeof o=="function"&&o(_)}return We(yt.Provider,{value:_},r)}});var At=0;function Ft(e,t,n,r,o,a){var _,s,f={};for(s in t)s=="ref"?_=t[s]:f[s]=t[s];var c={type:e,props:f,key:n,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--At,__source:o,__self:a};if(typeof e=="function"&&(_=e.defaultProps))for(s in _)f[s]===void 0&&(f[s]=_[s]);return d.vnode&&d.vnode(c),c}function re(){return re=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},re.apply(this,arguments)}function X(e){return e.charAt(0)==="/"}function ue(e,t){for(var n=t,r=n+1,o=e.length;r<o;n+=1,r+=1)e[n]=e[r];e.pop()}function $t(e,t){t===void 0&&(t="");var n=e&&e.split("/")||[],r=t&&t.split("/")||[],o=e&&X(e),a=t&&X(t),_=o||a;if(e&&X(e)?r=n:n.length&&(r.pop(),r=r.concat(n)),!r.length)return"/";var s;if(r.length){var f=r[r.length-1];s=f==="."||f===".."||f===""}else s=!1;for(var c=0,i=r.length;i>=0;i--){var p=r[i];p==="."?ue(r,i):p===".."?(ue(r,i),c++):c&&(ue(r,i),c--)}if(!_)for(;c--;c)r.unshift("..");_&&r[0]!==""&&(!r[0]||!X(r[0]))&&r.unshift("");var l=r.join("/");return s&&l.substr(-1)!=="/"&&(l+="/"),l}var Ct=!0,fe="Invariant failed";function Tt(e,t){if(!e){if(Ct)throw new Error(fe);var n=typeof t=="function"?t():t,r=n?"".concat(fe,": ").concat(n):fe;throw new Error(r)}}function Z(e){return e.charAt(0)==="/"?e:"/"+e}function Se(e){return e.charAt(0)==="/"?e.substr(1):e}function Et(e,t){return e.toLowerCase().indexOf(t.toLowerCase())===0&&"/?#".indexOf(e.charAt(t.length))!==-1}function Ht(e,t){return Et(e,t)?e.substr(t.length):e}function Ot(e){return e.charAt(e.length-1)==="/"?e.slice(0,-1):e}function Ut(e){var t=e||"/",n="",r="",o=t.indexOf("#");o!==-1&&(r=t.substr(o),t=t.substr(0,o));var a=t.indexOf("?");return a!==-1&&(n=t.substr(a),t=t.substr(0,a)),{pathname:t,search:n==="?"?"":n,hash:r==="#"?"":r}}function E(e){var t=e.pathname,n=e.search,r=e.hash,o=t||"/";return n&&n!=="?"&&(o+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(o+=r.charAt(0)==="#"?r:"#"+r),o}function ce(e,t,n,r){var o;typeof e=="string"?(o=Ut(e),o.state=t):(o=re({},e),o.pathname===void 0&&(o.pathname=""),o.search?o.search.charAt(0)!=="?"&&(o.search="?"+o.search):o.search="",o.hash?o.hash.charAt(0)!=="#"&&(o.hash="#"+o.hash):o.hash="",t!==void 0&&o.state===void 0&&(o.state=t));try{o.pathname=decodeURI(o.pathname)}catch(a){throw a instanceof URIError?new URIError('Pathname "'+o.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):a}return n&&(o.key=n),r?o.pathname?o.pathname.charAt(0)!=="/"&&(o.pathname=$t(o.pathname,r.pathname)):o.pathname=r.pathname:o.pathname||(o.pathname="/"),o}function Lt(){var e=null;function t(_){return e=_,function(){e===_&&(e=null)}}function n(_,s,f,c){if(e!=null){var i=typeof e=="function"?e(_,s):e;typeof i=="string"?typeof f=="function"?f(i,c):c(!0):c(i!==!1)}else c(!0)}var r=[];function o(_){var s=!0;function f(){s&&_.apply(void 0,arguments)}return r.push(f),function(){s=!1,r=r.filter(function(c){return c!==f})}}function a(){for(var _=arguments.length,s=new Array(_),f=0;f<_;f++)s[f]=arguments[f];r.forEach(function(c){return c.apply(void 0,s)})}return{setPrompt:t,confirmTransitionTo:n,appendListener:o,notifyListeners:a}}var St=!!(typeof window<"u"&&window.document&&window.document.createElement);function It(e,t){t(window.confirm(e))}function Dt(){return window.navigator.userAgent.indexOf("Firefox")===-1}var Ie="hashchange",Mt={hashbang:{encodePath:function(t){return t.charAt(0)==="!"?t:"!/"+Se(t)},decodePath:function(t){return t.charAt(0)==="!"?t.substr(1):t}},noslash:{encodePath:Se,decodePath:Z},slash:{encodePath:Z,decodePath:Z}};function Ze(e){var t=e.indexOf("#");return t===-1?e:e.slice(0,t)}function W(){var e=window.location.href,t=e.indexOf("#");return t===-1?"":e.substring(t+1)}function Nt(e){window.location.hash=e}function le(e){window.location.replace(Ze(window.location.href)+"#"+e)}function Wt(e){e===void 0&&(e={}),St||Tt(!1);var t=window.history;Dt();var n=e,r=n.getUserConfirmation,o=r===void 0?It:r,a=n.hashType,_=a===void 0?"slash":a,s=e.basename?Ot(Z(e.basename)):"",f=Mt[_],c=f.encodePath,i=f.decodePath;function p(){var v=i(W());return s&&(v=Ht(v,s)),ce(v)}var l=Lt();function u(v){re(C,v),C.length=t.length,l.notifyListeners(C.location,C.action)}var h=!1,P=null;function m(v,y){return v.pathname===y.pathname&&v.search===y.search&&v.hash===y.hash}function g(){var v=W(),y=c(v);if(v!==y)le(y);else{var b=p(),x=C.location;if(!h&&m(x,b)||P===E(b))return;P=null,w(b)}}function w(v){if(h)h=!1,u();else{var y="POP";l.confirmTransitionTo(v,y,o,function(b){b?u({action:y,location:v}):D(v)})}}function D(v){var y=C.location,b=$.lastIndexOf(E(y));b===-1&&(b=0);var x=$.lastIndexOf(E(v));x===-1&&(x=0);var N=b-x;N&&(h=!0,K(N))}var O=W(),R=c(O);O!==R&&le(R);var U=p(),$=[E(U)];function k(v){var y=document.querySelector("base"),b="";return y&&y.getAttribute("href")&&(b=Ze(window.location.href)),b+"#"+c(s+E(v))}function M(v,y){var b="PUSH",x=ce(v,void 0,void 0,C.location);l.confirmTransitionTo(x,b,o,function(N){if(N){var L=E(x),F=c(s+L),ae=W()!==F;if(ae){P=L,Nt(F);var J=$.lastIndexOf(E(C.location)),be=$.slice(0,J+1);be.push(L),$=be,u({action:b,location:x})}else u()}})}function et(v,y){var b="REPLACE",x=ce(v,void 0,void 0,C.location);l.confirmTransitionTo(x,b,o,function(N){if(N){var L=E(x),F=c(s+L),ae=W()!==F;ae&&(P=L,le(F));var J=$.indexOf(E(C.location));J!==-1&&($[J]=L),u({action:b,location:x})}})}function K(v){t.go(v)}function tt(){K(-1)}function nt(){K(1)}var ie=0;function G(v){ie+=v,ie===1&&v===1?window.addEventListener(Ie,g):ie===0&&window.removeEventListener(Ie,g)}var z=!1;function rt(v){v===void 0&&(v=!1);var y=l.setPrompt(v);return z||(G(1),z=!0),function(){return z&&(z=!1,G(-1)),y()}}function ot(v){var y=l.appendListener(v);return G(1),function(){G(-1),y()}}var C={length:t.length,action:"POP",location:U,createHref:k,push:M,replace:et,go:K,goBack:tt,goForward:nt,block:rt,listen:ot};return C}export{Rt as B,xt as D,oe as _,Wt as c,Ft as o};
//# sourceMappingURL=vendor-0da8b43b.js.map