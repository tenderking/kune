import{_ as M}from"./DdigUYU6.js";import{a as U,_ as C}from"./djTW2Owj.js";import{a as z,c as x,u as E,g as F}from"./CJL6ADSF.js";import{_ as N}from"./Bzx-lTTh.js";import{m as I,g as h,_ as A,e as B,h as k,l as J,p as K,q as O,o as r,c as t,F as v,A as w,b as l,w as L,v as u,z as c,s as p,E as i,x as $,d as q,t as R,al as T,U as G,a as m}from"./gt121ii6.js";import{_ as H}from"./CvuIChfX.js";import"./DKlPxsyM.js";import"./F6I_F62J.js";const Q={wrapper:"relative",base:"group relative flex items-center gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75",ring:"focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",padding:"px-2.5 py-1.5",width:"w-full",rounded:"rounded-md",font:"font-medium",size:"text-sm",active:"text-gray-900 dark:text-white before:bg-gray-100 dark:before:bg-gray-800",inactive:"text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50",label:"truncate relative",icon:{base:"flex-shrink-0 w-5 h-5 relative",active:"text-gray-700 dark:text-gray-200",inactive:"text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"},avatar:{base:"flex-shrink-0",size:"2xs"},badge:{base:"flex-shrink-0 ml-auto relative rounded",color:"gray",variant:"solid",size:"xs"},divider:{wrapper:{base:"p-2"}}},W=I(h.ui.strategy,h.ui.verticalNavigation,Q),X=B({components:{UIcon:z,UAvatar:U,UBadge:N,ULink:x,UDivider:C},inheritAttrs:!1,props:{links:{type:Array,default:()=>[]},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:o,attrs:d}=E("verticalNavigation",k(e,"ui"),W,k(e,"class")),n=J(()=>Array.isArray(e.links[0])?e.links:[e.links]);return{ui:o,attrs:d,sections:n,getULinkProps:F,twMerge:K,twJoin:O}}}),Y={key:0,class:"sr-only"};function Z(e,o,d,n,y,_){const g=U,f=z,V=N,D=x,P=C;return r(),t("nav",p({class:e.ui.wrapper},e.attrs),[(r(!0),t(v,null,w(e.sections,(S,b)=>(r(),t("ul",{key:`section${b}`},[(r(!0),t(v,null,w(S,(a,j)=>(r(),t("li",{key:`section${b}-${j}`},[l(D,p({ref_for:!0},e.getULinkProps(a),{class:[e.ui.base,e.ui.padding,e.ui.width,e.ui.ring,e.ui.rounded,e.ui.font,e.ui.size],"active-class":e.ui.active,"inactive-class":e.ui.inactive,onClick:a.click,onKeyup:o[0]||(o[0]=T(s=>s.target.blur(),["enter"]))}),{default:L(({isActive:s})=>[u(e.$slots,"avatar",{link:a,isActive:s},()=>[a.avatar?(r(),c(g,p({key:0,ref_for:!0},{size:e.ui.avatar.size,...a.avatar},{class:[e.ui.avatar.base]}),null,16,["class"])):i("",!0)]),u(e.$slots,"icon",{link:a,isActive:s},()=>[a.icon?(r(),c(f,{key:0,name:a.icon,class:$(e.twMerge(e.twJoin(e.ui.icon.base,s?e.ui.icon.active:e.ui.icon.inactive),a.iconClass))},null,8,["name","class"])):i("",!0)]),u(e.$slots,"default",{link:a,isActive:s},()=>[a.label?(r(),t("span",{key:0,class:$(e.twMerge(e.ui.label,a.labelClass))},[s?(r(),t("span",Y," Current page: ")):i("",!0),q(" "+R(a.label),1)],2)):i("",!0)]),u(e.$slots,"badge",{link:a,isActive:s},()=>[a.badge?(r(),c(V,p({key:0,ref_for:!0},{size:e.ui.badge.size,color:e.ui.badge.color,variant:e.ui.badge.variant,...typeof a.badge=="string"||typeof a.badge=="number"?{label:a.badge}:a.badge},{class:e.ui.badge.base}),null,16,["class"])):i("",!0)])]),_:2},1040,["class","active-class","inactive-class","onClick"])]))),128)),b<e.sections.length-1?(r(),c(P,{key:0,ui:e.ui.divider},null,8,["ui"])):i("",!0)]))),128))],16)}const ee=A(X,[["render",Z]]),ae={class:"fixed dashboard p-4 top-20 rounded-md left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-10"},re={class:"pt-4 sm:ml-64"},se=B({__name:"dashboard",setup(e){const o=[{label:"Profile",icon:"i-heroicons-face-smile",to:"/profile",badge:100},{label:"Services",icon:"i-heroicons-chart-bar",to:"/profile/services"}];return(d,n)=>{const y=M,_=G("divider"),g=ee,f=H;return r(),t(v,null,[l(y,{class:"main",fixed:!0}),m("aside",ae,[l(_),l(g,{links:o,ui:{inactive:"border-transparent dashboard-cards flex justify-between hover:border-gray-400 dark:hover:border-gray-500 text-green-700 hover:text-gray-900 ",active:"active"}})]),m("main",re,[l(f,{class:"p-4 mx-2 rounded-md dashboard max-w-none"},{default:L(()=>[n[0]||(n[0]=m("h2",null,"Dashboard",-1)),u(d.$slots,"default",{},void 0,!0)]),_:3})])],64)}}}),pe=A(se,[["__scopeId","data-v-776851d6"]]);export{pe as default};