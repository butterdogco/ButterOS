import{S as w,i as y,s as C,l as f,u as E,a as I,m as _,p,v as S,h as d,c as D,q as v,b as H,J as i,w as b,n as q}from"../chunks/index-0b20d084.js";function J(a){let e,t,s,o,r,l,u=a[0].message+"",h;return{c(){e=f("div"),t=f("section"),s=f("h1"),o=E(a[1]),r=I(),l=f("p"),h=E(u),this.h()},l(n){e=_(n,"DIV",{class:!0});var c=p(e);t=_(c,"SECTION",{class:!0});var m=p(t);s=_(m,"H1",{class:!0});var x=p(s);o=S(x,a[1]),x.forEach(d),r=D(m),l=_(m,"P",{class:!0});var g=p(l);h=S(g,u),g.forEach(d),m.forEach(d),c.forEach(d),this.h()},h(){v(s,"class","text-center text-4xl font-mono-mt-4"),v(l,"class","text-center"),v(t,"class","p-8 border-gray-500 rounded"),v(e,"class","max-w-screen-xl container mx-auto grid place-items-center")},m(n,c){H(n,e,c),i(e,t),i(t,s),i(s,o),i(t,r),i(t,l),i(l,h)},p(n,[c]){c&2&&b(o,n[1]),c&1&&u!==(u=n[0].message+"")&&b(h,u)},i:q,o:q,d(n){n&&d(e)}}}const P=({error:a,status:e})=>e===404?{status:302,redirect:"/"}:{props:{error:a,status:e}};function N(a,e,t){let{error:s}=e,{status:o}=e;return a.$$set=r=>{"error"in r&&t(0,s=r.error),"status"in r&&t(1,o=r.status)},[s,o]}class T extends w{constructor(e){super(),y(this,e,N,J,C,{error:0,status:1})}}export{T as default,P as load};
