var Be=Object.defineProperty;var Je=(a,e,t)=>e in a?Be(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var ue=(a,e,t)=>(Je(a,typeof e!="symbol"?e+"":e,t),t);import{S as Ke,i as We,s as He,a as Fe,e as V,c as Ge,b as K,g as te,t as x,d as ne,f as z,h as B,j as Me,o as me,k as Ye,l as Xe,m as Qe,n as de,p as N,q as Ze,r as et,u as tt,v as W,w as ye,x as H,y as F,z as Ae}from"./chunks/index-4a5c5fd9.js";import{g as Ce,f as Ie,a as De,s as J,b as _e,i as nt,c as rt}from"./chunks/singletons-0222a39b.js";import"./chunks/index-d050104e.js";class Z{constructor(e,t){ue(this,"name","HttpError");ue(this,"stack");this.status=e,this.message=t!=null?t:`Error: ${e}`}toString(){return this.message}}class Ne{constructor(e,t){this.status=e,this.location=t}}function at(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function st(a){for(const e in a)a[e]=a[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return a}const it=["href","pathname","search","searchParams","toString","toJSON"];function ot(a,e){const t=new URL(a);for(const o of it){let i=t[o];Object.defineProperty(t,o,{get(){return e(),i},enumerable:!0,configurable:!0})}return t[Symbol.for("nodejs.util.inspect.custom")]=(o,i,d)=>d(a,i),lt(t),t}function lt(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function ct(a){let e=5381,t=a.length;if(typeof a=="string")for(;t;)e=e*33^a.charCodeAt(--t);else for(;t;)e=e*33^a[--t];return(e>>>0).toString(36)}const ee=window.fetch;function ft(a,e){let o=`script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${JSON.stringify(typeof a=="string"?a:a.url)}]`;e&&typeof e.body=="string"&&(o+=`[sveltekit\\:data-body="${ct(e.body)}"]`);const i=document.querySelector(o);if(i&&i.textContent){const{body:d,...n}=JSON.parse(i.textContent);return Promise.resolve(new Response(d,n))}return ee(a,e)}const ut=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function dt(a){const e=[],t=[];let o=!0;if(/\]\[/.test(a))throw new Error(`Invalid route ${a} \u2014 parameters must be separated`);if(Te("[",a)!==Te("]",a))throw new Error(`Invalid route ${a} \u2014 brackets are unbalanced`);return{pattern:a===""?/^\/$/:new RegExp(`^${a.split(/(?:\/|$)/).filter(pt).map((d,n,f)=>{const w=decodeURIComponent(d),h=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(w);if(h)return e.push(h[1]),t.push(h[2]),"(?:/(.*))?";const g=n===f.length-1;return w&&"/"+w.split(/\[(.+?)\]/).map(($,E)=>{if(E%2){const C=ut.exec($);if(!C)throw new Error(`Invalid param: ${$}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,A,G,M]=C;return e.push(G),t.push(M),A?"(.*?)":"([^/]+?)"}return g&&$.includes(".")&&(o=!1),$.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${o?"/?":""}$`),names:e,types:t}}function pt(a){return!/^\([^)]+\)$/.test(a)}function ht(a,e,t,o){const i={};for(let d=0;d<e.length;d+=1){const n=e[d],f=t[d],w=a[d+1]||"";if(f){const h=o[f];if(!h)throw new Error(`Missing "${f}" param matcher`);if(!h(w))return}i[n]=w}return i}function Te(a,e){let t=0;for(let o=0;o<e.length;o+=1)e[o]===a&&(t+=1);return t}function mt(a,e,t){return Object.entries(e).map(([o,[i,d,n]])=>{const{pattern:f,names:w,types:h}=dt(o),g=i<0;g&&(i=~i);const $={id:o,exec:E=>{const C=f.exec(E);if(C)return ht(C,w,h,t)},errors:[1,...n||[]].map(E=>a[E]),layouts:[0,...d||[]].map(E=>a[E]),leaf:a[i],uses_server_data:g};return $.errors.length=$.layouts.length=Math.max($.errors.length,$.layouts.length),$})}function _t(a,e){return new Z(a,e)}function gt(a){let e,t,o;var i=a[0][0];function d(n){return{props:{data:n[1],errors:n[3]}}}return i&&(e=new i(d(a))),{c(){e&&W(e.$$.fragment),t=V()},l(n){e&&ye(e.$$.fragment,n),t=V()},m(n,f){e&&H(e,n,f),K(n,t,f),o=!0},p(n,f){const w={};if(f&2&&(w.data=n[1]),f&8&&(w.errors=n[3]),i!==(i=n[0][0])){if(e){te();const h=e;x(h.$$.fragment,1,0,()=>{F(h,1)}),ne()}i?(e=new i(d(n)),W(e.$$.fragment),z(e.$$.fragment,1),H(e,t.parentNode,t)):e=null}else i&&e.$set(w)},i(n){o||(e&&z(e.$$.fragment,n),o=!0)},o(n){e&&x(e.$$.fragment,n),o=!1},d(n){n&&B(t),e&&F(e,n)}}}function wt(a){let e,t,o;var i=a[0][0];function d(n){return{props:{data:n[1],errors:n[3],$$slots:{default:[yt]},$$scope:{ctx:n}}}}return i&&(e=new i(d(a))),{c(){e&&W(e.$$.fragment),t=V()},l(n){e&&ye(e.$$.fragment,n),t=V()},m(n,f){e&&H(e,n,f),K(n,t,f),o=!0},p(n,f){const w={};if(f&2&&(w.data=n[1]),f&8&&(w.errors=n[3]),f&517&&(w.$$scope={dirty:f,ctx:n}),i!==(i=n[0][0])){if(e){te();const h=e;x(h.$$.fragment,1,0,()=>{F(h,1)}),ne()}i?(e=new i(d(n)),W(e.$$.fragment),z(e.$$.fragment,1),H(e,t.parentNode,t)):e=null}else i&&e.$set(w)},i(n){o||(e&&z(e.$$.fragment,n),o=!0)},o(n){e&&x(e.$$.fragment,n),o=!1},d(n){n&&B(t),e&&F(e,n)}}}function yt(a){let e,t,o;var i=a[0][1];function d(n){return{props:{data:n[2]}}}return i&&(e=new i(d(a))),{c(){e&&W(e.$$.fragment),t=V()},l(n){e&&ye(e.$$.fragment,n),t=V()},m(n,f){e&&H(e,n,f),K(n,t,f),o=!0},p(n,f){const w={};if(f&4&&(w.data=n[2]),i!==(i=n[0][1])){if(e){te();const h=e;x(h.$$.fragment,1,0,()=>{F(h,1)}),ne()}i?(e=new i(d(n)),W(e.$$.fragment),z(e.$$.fragment,1),H(e,t.parentNode,t)):e=null}else i&&e.$set(w)},i(n){o||(e&&z(e.$$.fragment,n),o=!0)},o(n){e&&x(e.$$.fragment,n),o=!1},d(n){n&&B(t),e&&F(e,n)}}}function qe(a){let e,t=a[5]&&Ve(a);return{c(){e=Ye("div"),t&&t.c(),this.h()},l(o){e=Xe(o,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=Qe(e);t&&t.l(i),i.forEach(B),this.h()},h(){de(e,"id","svelte-announcer"),de(e,"aria-live","assertive"),de(e,"aria-atomic","true"),N(e,"position","absolute"),N(e,"left","0"),N(e,"top","0"),N(e,"clip","rect(0 0 0 0)"),N(e,"clip-path","inset(50%)"),N(e,"overflow","hidden"),N(e,"white-space","nowrap"),N(e,"width","1px"),N(e,"height","1px")},m(o,i){K(o,e,i),t&&t.m(e,null)},p(o,i){o[5]?t?t.p(o,i):(t=Ve(o),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(o){o&&B(e),t&&t.d()}}}function Ve(a){let e;return{c(){e=Ze(a[6])},l(t){e=et(t,a[6])},m(t,o){K(t,e,o)},p(t,o){o&64&&tt(e,t[6])},d(t){t&&B(e)}}}function bt(a){let e,t,o,i,d;const n=[wt,gt],f=[];function w(g,$){return g[0][1]?0:1}e=w(a),t=f[e]=n[e](a);let h=a[4]&&qe(a);return{c(){t.c(),o=Fe(),h&&h.c(),i=V()},l(g){t.l(g),o=Ge(g),h&&h.l(g),i=V()},m(g,$){f[e].m(g,$),K(g,o,$),h&&h.m(g,$),K(g,i,$),d=!0},p(g,[$]){let E=e;e=w(g),e===E?f[e].p(g,$):(te(),x(f[E],1,1,()=>{f[E]=null}),ne(),t=f[e],t?t.p(g,$):(t=f[e]=n[e](g),t.c()),z(t,1),t.m(o.parentNode,o)),g[4]?h?h.p(g,$):(h=qe(g),h.c(),h.m(i.parentNode,i)):h&&(h.d(1),h=null)},i(g){d||(z(t),d=!0)},o(g){x(t),d=!1},d(g){f[e].d(g),g&&B(o),h&&h.d(g),g&&B(i)}}}function vt(a,e,t){let{stores:o}=e,{page:i}=e,{components:d}=e,{data_0:n=null}=e,{data_1:f=null}=e,{errors:w}=e;Me(o.page.notify);let h=!1,g=!1,$=null;return me(()=>{const E=o.page.subscribe(()=>{h&&(t(5,g=!0),t(6,$=document.title||"untitled page"))});return t(4,h=!0),E}),a.$$set=E=>{"stores"in E&&t(7,o=E.stores),"page"in E&&t(8,i=E.page),"components"in E&&t(0,d=E.components),"data_0"in E&&t(1,n=E.data_0),"data_1"in E&&t(2,f=E.data_1),"errors"in E&&t(3,w=E.errors)},a.$$.update=()=>{a.$$.dirty&384&&o.page.set(i)},[d,n,f,w,h,g,$,o,i]}class kt extends Ke{constructor(e){super(),We(this,e,vt,bt,He,{stores:7,page:8,components:0,data_0:1,data_1:2,errors:3})}}const Et=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),$t=function(a,e){return new URL(a,e).href},xe={},Q=function(e,t,o){return!t||t.length===0?e():Promise.all(t.map(i=>{if(i=$t(i,o),i in xe)return;xe[i]=!0;const d=i.endsWith(".css"),n=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${n}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Et,d||(f.as="script",f.crossOrigin=""),f.href=i,document.head.appendChild(f),d)return new Promise((w,h)=>{f.addEventListener("load",w),f.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())},St={},re=[()=>Q(()=>import("./chunks/0-40fc1566.js"),["chunks\\0-40fc1566.js","chunks\\_layout-e6849da6.js","chunks\\variables-055bf2ca.js","components\\pages\\_layout.svelte-228c4c71.js","assets\\+layout-7c802733.css","chunks\\index-4a5c5fd9.js"],import.meta.url),()=>Q(()=>import("./chunks/1-ac0a22d7.js"),["chunks\\1-ac0a22d7.js","components\\pages\\_error.svelte-fe61c77f.js","chunks\\index-4a5c5fd9.js","chunks\\singletons-0222a39b.js","chunks\\index-d050104e.js","chunks\\variables-055bf2ca.js"],import.meta.url),()=>Q(()=>import("./chunks/2-6f48f0e0.js"),["chunks\\2-6f48f0e0.js","chunks\\_page-0b52c2a5.js","chunks\\index-4a5c5fd9.js","chunks\\db-50ff4754.js","chunks\\variables-055bf2ca.js","chunks\\index-d050104e.js","components\\pages\\_page.svelte-aa4eca10.js","assets\\+page-8b7bea0a.css"],import.meta.url),()=>Q(()=>import("./chunks/3-4802a4c7.js"),["chunks\\3-4802a4c7.js","components\\pages\\test\\_page.svelte-ab6eb307.js","chunks\\index-4a5c5fd9.js"],import.meta.url)],Rt={"":[2],test:[3]},ze="sveltekit:scroll",q="sveltekit:index",pe=mt(re,Rt,St),ge=re[0],we=re[1];ge();we();let Y={};try{Y=JSON.parse(sessionStorage[ze])}catch{}function he(a){Y[a]=_e()}function Lt({target:a,base:e,trailing_slash:t}){var Pe;const o=[],i={id:null,promise:null},d={before_navigate:[],after_navigate:[]};let n={branch:[],error:null,session_id:0,url:null},f=!1,w=!0,h=!1,g=1,$=null,E,C=!0,A=(Pe=history.state)==null?void 0:Pe[q];A||(A=Date.now(),history.replaceState({...history.state,[q]:A},"",location.href));const G=Y[A];G&&(history.scrollRestoration="manual",scrollTo(G.x,G.y));let M=!1,ae,be;async function ve(r,{noscroll:c=!1,replaceState:u=!1,keepfocus:s=!1,state:l={}},b){if(typeof r=="string"&&(r=new URL(r,Ce(document))),C)return le({url:r,scroll:c?_e():null,keepfocus:s,redirect_chain:b,details:{state:l,replaceState:u},accepted:()=>{},blocked:()=>{}});await T(r)}async function ke(r){const c=Le(r);if(!c)throw new Error("Attempted to prefetch a URL that does not belong to this app");return i.promise=Re(c),i.id=c.id,i.promise}async function Ee(r,c,u,s){var y,R,j;const l=Le(r),b=be={};let p=l&&await Re(l);if(!p&&r.origin===location.origin&&r.pathname===location.pathname&&(p=await oe({status:404,error:new Error(`Not found: ${r.pathname}`),url:r,routeId:null})),!p)return await T(r),!1;if(r=(l==null?void 0:l.url)||r,be!==b)return!1;if(o.length=0,p.type==="redirect")if(c.length>10||c.includes(r.pathname))p=await oe({status:500,error:new Error("Redirect loop"),url:r,routeId:null});else return C?ve(new URL(p.location,r).href,{},[...c,r.pathname]):await T(new URL(p.location,location.href)),!1;else((R=(y=p.props)==null?void 0:y.page)==null?void 0:R.status)>=400&&await J.updated.check()&&await T(r);if(h=!0,u&&u.details){const{details:k}=u,L=k.replaceState?0:1;k.state[q]=A+=L,history[k.replaceState?"replaceState":"pushState"](k.state,"",r)}if(f?(n=p.state,p.props.page&&(p.props.page.url=r),E.$set(p.props)):$e(p),u){const{scroll:k,keepfocus:L}=u;if(!L){const S=document.body,O=S.getAttribute("tabindex");S.tabIndex=-1,S.focus({preventScroll:!0}),setTimeout(()=>{var _;(_=getSelection())==null||_.removeAllRanges()}),O!==null?S.setAttribute("tabindex",O):S.removeAttribute("tabindex")}if(await Ae(),w){const S=r.hash&&document.getElementById(r.hash.slice(1));k?scrollTo(k.x,k.y):S?S.scrollIntoView():scrollTo(0,0)}}else await Ae();i.promise=null,i.id=null,w=!0,p.props.page&&(ae=p.props.page);const v=p.state.branch[p.state.branch.length-1];C=((j=v==null?void 0:v.node.shared)==null?void 0:j.router)!==!1,s&&s(),h=!1}function $e(r){n=r.state;const c=document.querySelector("style[data-sveltekit]");if(c&&c.remove(),ae=r.props.page,E=new kt({target:a,props:{...r.props,stores:J},hydrate:!0}),C){const u={from:null,to:new URL(location.href)};d.after_navigate.forEach(s=>s(u))}f=!0}async function X({url:r,params:c,branch:u,status:s,error:l,routeId:b,validation_errors:p}){const v=u.filter(Boolean),y={type:"loaded",state:{url:r,params:c,branch:u,error:l,session_id:g},props:{components:v.map(L=>L.node.component),errors:p}};let R={},j=!1;for(let L=0;L<v.length;L+=1)R={...R,...v[L].data},(j||!n.branch.some(S=>S===v[L]))&&(y.props[`data_${L}`]=R,j=!0);if(!n.url||r.href!==n.url.href||n.error!==l||j){y.props.page={error:l,params:c,routeId:b,status:s,url:r,data:R};const L=(S,O)=>{Object.defineProperty(y.props.page,S,{get:()=>{throw new Error(`$page.${S} has been replaced by $page.url.${O}`)}})};L("origin","origin"),L("path","pathname"),L("query","searchParams")}return y}async function se({loader:r,parent:c,url:u,params:s,routeId:l,server_data_node:b}){var R,j,k,L,S;let p=null;const v={dependencies:new Set,params:new Set,parent:!1,url:!1},y=await r();if((R=y.shared)!=null&&R.load){let O=function(...m){for(const P of m){const{href:I}=new URL(P,u);v.dependencies.add(I)}};const _={};for(const m in s)Object.defineProperty(_,m,{get(){return v.params.add(m),s[m]},enumerable:!0});const U={routeId:l,params:_,data:(j=b==null?void 0:b.data)!=null?j:null,url:ot(u,()=>{v.url=!0}),async fetch(m,P){let I;typeof m=="string"?I=m:(I=m.url,P={body:m.method==="GET"||m.method==="HEAD"?void 0:await m.blob(),cache:m.cache,credentials:m.credentials,headers:m.headers,integrity:m.integrity,keepalive:m.keepalive,method:m.method,mode:m.mode,redirect:m.redirect,referrer:m.referrer,referrerPolicy:m.referrerPolicy,signal:m.signal,...P});const D=new URL(I,u).href;return O(D),f?ee(D,P):ft(I,P)},setHeaders:()=>{},depends:O,parent(){return v.parent=!0,c()}};Object.defineProperties(U,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),p=(k=await y.shared.load.call(null,U))!=null?k:null}return{node:y,loader:r,server:b,shared:(L=y.shared)!=null&&L.load?{type:"data",data:p,uses:v}:null,data:(S=p!=null?p:b==null?void 0:b.data)!=null?S:null}}function Se(r,c,u){if(!u)return!1;if(u.parent&&c||r.url&&u.url)return!0;for(const s of r.params)if(u.params.has(s))return!0;for(const s of u.dependencies)if(o.some(l=>l(s)))return!0;return!1}function ie(r,c){var u,s;return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set((u=r.uses.dependencies)!=null?u:[]),params:new Set((s=r.uses.params)!=null?s:[]),parent:!!r.uses.parent,url:!!r.uses.url}}:(r==null?void 0:r.type)==="skip"&&c!=null?c:null}async function Re({id:r,url:c,params:u,route:s}){if(i.id===r&&i.promise)return i.promise;const{errors:l,layouts:b,leaf:p}=s,v=n.url&&{url:r!==n.url.pathname+n.url.search,params:Object.keys(u).filter(_=>n.params[_]!==u[_])};[...l,...b,p].forEach(_=>_==null?void 0:_().catch(()=>{}));const y=[...b,p];let R=null;const j=y.reduce((_,U,m)=>{var D;const P=n.branch[m],I=U&&((P==null?void 0:P.loader)!==U||Se(v,_.some(Boolean),(D=P.server)==null?void 0:D.uses));return _.push(I),_},[]);if(s.uses_server_data&&j.some(Boolean)){try{const _=await ee(`${c.pathname}${c.pathname.endsWith("/")?"":"/"}__data.json${c.search}`,{headers:{"x-sveltekit-invalidated":j.map(U=>U?"1":"").join(",")}});if(R=await _.json(),!_.ok)throw R}catch{T(c);return}if(R.type==="redirect")return R}const k=R==null?void 0:R.nodes;let L=!1;const S=y.map(async(_,U)=>{var ce,je;if(!_)return;const m=n.branch[U],P=(ce=k==null?void 0:k[U])!=null?ce:null;if((!P||P.type==="skip")&&_===(m==null?void 0:m.loader)&&!Se(v,L,(je=m.shared)==null?void 0:je.uses))return m;if(L=!0,(P==null?void 0:P.type)==="error")throw P.httperror?_t(P.httperror.status,P.httperror.message):P.error;return se({loader:_,url:c,params:u,routeId:s.id,parent:async()=>{var Ue;const Oe={};for(let fe=0;fe<U;fe+=1)Object.assign(Oe,(Ue=await S[fe])==null?void 0:Ue.data);return Oe},server_data_node:ie(P,m==null?void 0:m.server)})});for(const _ of S)_.catch(()=>{});const O=[];for(let _=0;_<y.length;_+=1)if(y[_])try{O.push(await S[_])}catch(U){const m=U;if(m instanceof Ne)return{type:"redirect",location:m.location};const P=U instanceof Z?U.status:500;for(;_--;)if(l[_]){let I,D=_;for(;!O[D];)D-=1;try{return I={node:await l[_](),loader:l[_],data:{},server:null,shared:null},await X({url:c,params:u,branch:O.slice(0,D+1).concat(I),status:P,error:m,routeId:s.id})}catch{continue}}T(c);return}else O.push(void 0);return await X({url:c,params:u,branch:O,status:200,error:null,routeId:s.id})}async function oe({status:r,error:c,url:u,routeId:s}){var R;const l={},b=await ge();let p=null;if(b.server){const j=await ee(`${u.pathname}${u.pathname.endsWith("/")?"":"/"}__data.json${u.search}`,{headers:{"x-sveltekit-invalidated":"1"}}),k=await j.json();if(p=(R=k==null?void 0:k[0])!=null?R:null,!j.ok||(k==null?void 0:k.type)!=="data"){T(u);return}}const v=await se({loader:ge,url:u,params:l,routeId:s,parent:()=>Promise.resolve({}),server_data_node:ie(p)}),y={node:await we(),loader:we,shared:null,server:null,data:null};return await X({url:u,params:l,branch:[v,y],status:r,error:c,routeId:s})}function Le(r){if(r.origin!==location.origin||!r.pathname.startsWith(e))return;const c=decodeURI(r.pathname.slice(e.length)||"/");for(const u of pe){const s=u.exec(c);if(s){const l=new URL(r.origin+at(r.pathname,t)+r.search+r.hash);return{id:l.pathname+l.search,route:u,params:st(s),url:l}}}}async function le({url:r,scroll:c,keepfocus:u,redirect_chain:s,details:l,accepted:b,blocked:p}){const v=n.url;let y=!1;const R={from:v,to:r,cancel:()=>y=!0};if(d.before_navigate.forEach(j=>j(R)),y){p();return}he(A),b(),f&&J.navigating.set({from:n.url,to:r}),await Ee(r,s,{scroll:c,keepfocus:u,details:l},()=>{const j={from:v,to:r};d.after_navigate.forEach(k=>k(j)),J.navigating.set(null)})}function T(r){return location.href=r.href,new Promise(()=>{})}return{after_navigate:r=>{me(()=>(d.after_navigate.push(r),()=>{const c=d.after_navigate.indexOf(r);d.after_navigate.splice(c,1)}))},before_navigate:r=>{me(()=>(d.before_navigate.push(r),()=>{const c=d.before_navigate.indexOf(r);d.before_navigate.splice(c,1)}))},disable_scroll_handling:()=>{(h||!f)&&(w=!1)},goto:(r,c={})=>ve(r,c,[]),invalidate:r=>{var c,u;if(r===void 0){for(const s of n.branch)(c=s==null?void 0:s.server)==null||c.uses.dependencies.add(""),(u=s==null?void 0:s.shared)==null||u.uses.dependencies.add("");o.push(()=>!0)}else if(typeof r=="function")o.push(r);else{const{href:s}=new URL(r,location.href);o.push(l=>l===s)}return $||($=Promise.resolve().then(async()=>{await Ee(new URL(location.href),[]),$=null})),$},prefetch:async r=>{const c=new URL(r,Ce(document));await ke(c)},prefetch_routes:async r=>{const u=(r?pe.filter(s=>r.some(l=>s.exec(l))):pe).map(s=>Promise.all([...s.layouts,s.leaf].map(l=>l==null?void 0:l())));await Promise.all(u)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{let l=!1;const b={from:n.url,to:null,cancel:()=>l=!0};d.before_navigate.forEach(p=>p(b)),l?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){he(A);try{sessionStorage[ze]=JSON.stringify(Y)}catch{}}});const r=s=>{const l=Ie(s);l&&l.href&&l.hasAttribute("sveltekit:prefetch")&&ke(De(l))};let c;const u=s=>{clearTimeout(c),c=setTimeout(()=>{var l;(l=s.target)==null||l.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",r),addEventListener("mousemove",u),addEventListener("sveltekit:trigger_prefetch",r),addEventListener("click",s=>{if(!C||s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const l=Ie(s);if(!l||!l.href)return;const b=l instanceof SVGAElement,p=De(l);if(!b&&!(p.protocol==="https:"||p.protocol==="http:"))return;const v=(l.getAttribute("rel")||"").split(/\s+/);if(l.hasAttribute("download")||v.includes("external")||l.hasAttribute("sveltekit:reload")||(b?l.target.baseVal:l.target))return;const[y,R]=p.href.split("#");if(R!==void 0&&y===location.href.split("#")[0]){M=!0,he(A),J.page.set({...ae,url:p}),J.page.notify();return}le({url:p,scroll:l.hasAttribute("sveltekit:noscroll")?_e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:p.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault()})}),addEventListener("popstate",s=>{if(s.state&&C){if(s.state[q]===A)return;le({url:new URL(location.href),scroll:Y[s.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{A=s.state[q]},blocked:()=>{const l=A-s.state[q];history.go(l)}})}}),addEventListener("hashchange",()=>{M&&(M=!1,history.replaceState({...history.state,[q]:++A},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&J.navigating.set(null)})},_hydrate:async({status:r,error:c,node_ids:u,params:s,routeId:l})=>{const b=new URL(location.href);let p;try{const v=(k,L)=>{const S=document.querySelector(`script[sveltekit\\:data-type="${k}"]`);return S!=null&&S.textContent?JSON.parse(S.textContent):L},y=v("server_data",[]),R=v("validation_errors",void 0),j=u.map(async(k,L)=>se({loader:re[k],url:b,params:s,routeId:l,parent:async()=>{const S={};for(let O=0;O<L;O+=1)Object.assign(S,(await j[O]).data);return S},server_data_node:ie(y[L])}));p=await X({url:b,params:s,branch:await Promise.all(j),status:r,error:c!=null&&c.__is_http_error?new Z(c.status,c.message):c,validation_errors:R,routeId:l})}catch(v){const y=v;if(y instanceof Ne){await T(new URL(v.location,location.href));return}p=await oe({status:y instanceof Z?y.status:500,error:y,url:b,routeId:l})}$e(p)}}}function At(a){}async function Ct({paths:a,target:e,route:t,spa:o,trailing_slash:i,hydrate:d}){const n=Lt({target:e,base:a.base,trailing_slash:i});nt({client:n}),rt(a),d&&await n._hydrate(d),t&&(o&&n.goto(location.href,{replaceState:!0}),n._start_router()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{At as set_public_env,Ct as start};
