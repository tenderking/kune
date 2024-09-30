import{i as me,a as ae,u as ne,b as ge}from"./CJL6ADSF.js";import{D as ve,r as E,k as P,n as ye,l as g,S as he,af as be,M as U,m as te,g as B,_ as Q,e as H,h as R,i as pe,j as le,p as Ie,q as A,o as y,c as h,a as Y,s as C,v as S,x as I,b as _,E as F,y as $e,L as ie,K as L,Y as j,F as T,d as q,t as M,ai as re,Q as Se,aj as we,G as ze}from"./gt121ii6.js";function x(e){return typeof e=="function"?e():ve(e)}typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const ke=e=>typeof e<"u",ee=()=>{};function Ce(e,t){function r(...a){return new Promise((n,i)=>{Promise.resolve(e(()=>t.apply(this,a),{fn:t,thisArg:this,args:a})).then(n).catch(i)})}return r}function je(e,t={}){let r,a,n=ee;const i=s=>{clearTimeout(s),n(),n=ee};return s=>{const u=x(e),c=x(t.maxWait);return r&&i(r),u<=0||c!==void 0&&c<=0?(a&&(i(a),a=null),Promise.resolve(s())):new Promise((l,o)=>{n=t.rejectOnCancel?o:l,c&&!a&&(a=setTimeout(()=>{r&&i(r),a=null,l(s())},c)),r=setTimeout(()=>{a&&i(a),a=null,l(s())},u)})}}function Be(e,t=200,r={}){return Ce(je(t,r),e)}function Ee(e){return JSON.parse(JSON.stringify(e))}const J=new Map;function Oe(e){const t=be();function r(s){var u;const c=J.get(e)||new Set;c.add(s),J.set(e,c);const l=()=>n(s);return(u=t==null?void 0:t.cleanups)==null||u.push(l),l}function a(s){function u(...c){n(u),s(...c)}return r(u)}function n(s){const u=J.get(e);u&&(u.delete(s),u.size||i())}function i(){J.delete(e)}function d(s,u){var c;(c=J.get(e))==null||c.forEach(l=>l(s,u))}return{on:r,once:a,off:n,emit:d,reset:i}}function xe(e,t,r,a={}){var n,i,d;const{clone:s=!1,passive:u=!1,eventName:c,deep:l=!1,defaultValue:o,shouldEmit:v}=a,f=he(),$=r||(f==null?void 0:f.emit)||((n=f==null?void 0:f.$emit)==null?void 0:n.bind(f))||((d=(i=f==null?void 0:f.proxy)==null?void 0:i.$emit)==null?void 0:d.bind(f==null?void 0:f.proxy));let b=c;b=b||`update:${t.toString()}`;const W=p=>s?typeof s=="function"?s(p):Ee(p):p,V=()=>ke(e[t])?W(e[t]):o,D=p=>{v?v(p)&&$(b,p):$(b,p)};if(u){const p=V(),N=E(p);let O=!1;return P(()=>e[t],w=>{O||(O=!0,N.value=W(w),ye(()=>O=!1))}),P(N,w=>{!O&&(w!==e[t]||l)&&D(w)},{deep:l}),N}else return g({get(){return V()},set(p){D(p)}})}const Fe=(e,t,r=!0)=>{const a=U("form-events",void 0),n=U("form-group",void 0),i=U("form-inputs",void 0);n&&(!r||e!=null&&e.legend?n.inputId.value=void 0:e!=null&&e.id&&(n.inputId.value=e==null?void 0:e.id),i&&(i.value[n.name.value]=n.inputId.value));const d=E(!1);function s(o,v){a&&a.emit({type:o,path:v})}function u(){s("blur",n==null?void 0:n.name.value),d.value=!0}function c(){s("change",n==null?void 0:n.name.value)}const l=Be(()=>{(d.value||n!=null&&n.eagerValidation.value)&&s("input",n==null?void 0:n.name.value)},300);return{inputId:g(()=>(e==null?void 0:e.id)??(n==null?void 0:n.inputId.value)),name:g(()=>(e==null?void 0:e.name)??(n==null?void 0:n.name.value)),size:g(()=>{var v;const o=t.size[n==null?void 0:n.size.value]?n==null?void 0:n.size.value:null;return(e==null?void 0:e.size)??o??((v=t.default)==null?void 0:v.size)}),color:g(()=>{var o;return(o=n==null?void 0:n.error)!=null&&o.value?"red":e==null?void 0:e.color}),emitFormBlur:u,emitFormInput:l,emitFormChange:c}},Ve={wrapper:"",inner:"",label:{wrapper:"flex content-center items-center justify-between",base:"block font-medium text-gray-700 dark:text-gray-200",required:"after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"},size:{"2xs":"text-xs",xs:"text-xs",sm:"text-sm",md:"text-sm",lg:"text-sm",xl:"text-base"},container:"mt-1 relative",description:"text-gray-500 dark:text-gray-400",hint:"text-gray-500 dark:text-gray-400",help:"mt-2 text-gray-500 dark:text-gray-400",error:"mt-2 text-red-500 dark:text-red-400",default:{size:"sm"}},z=te(B.ui.strategy,B.ui.input,me),Ne=H({components:{UIcon:ae},inheritAttrs:!1,props:{modelValue:{type:[String,Number],default:""},type:{type:String,default:"text"},id:{type:String,default:null},name:{type:String,default:null},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autofocusDelay:{type:Number,default:100},icon:{type:String,default:null},loadingIcon:{type:String,default:()=>z.default.loadingIcon},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:null},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys(z.size).includes(e)}},color:{type:String,default:()=>z.default.color,validator(e){return[...B.ui.colors,...Object.keys(z.color)].includes(e)}},variant:{type:String,default:()=>z.default.variant,validator(e){return[...Object.keys(z.variant),...Object.values(z.color).flatMap(t=>Object.keys(t))].includes(e)}},inputClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},modelModifiers:{type:Object,default:()=>({})}},emits:["update:modelValue","blur","change"],setup(e,{emit:t,slots:r}){const{ui:a,attrs:n}=ne("input",R(e,"ui"),z,R(e,"class")),{size:i,rounded:d}=ge({ui:a,props:e}),{emitFormBlur:s,emitFormInput:u,size:c,color:l,inputId:o,name:v}=Fe(e,z),f=g(()=>i.value??c.value),$=E(pe({},e.modelModifiers,{trim:!1,lazy:!1,number:!1})),b=E(null),W=()=>{var m;e.autofocus&&((m=b.value)==null||m.focus())},V=m=>{$.value.trim&&(m=m.trim()),($.value.number||e.type==="number")&&(m=$e(m)),t("update:modelValue",m),u()},D=m=>{$.value.lazy||V(m.target.value)},p=m=>{if(e.type==="file"){const k=m.target.files;t("change",k)}else{const k=m.target.value;t("change",k),$.value.lazy&&V(k),$.value.trim&&(m.target.value=k.trim())}},N=m=>{s(),t("blur",m)};le(()=>{setTimeout(()=>{W()},e.autofocusDelay)});const O=g(()=>{var k,G;const m=((G=(k=a.value.color)==null?void 0:k[l.value])==null?void 0:G[e.variant])||a.value.variant[e.variant];return Ie(A(a.value.base,a.value.form,d.value,a.value.placeholder,e.type==="file"&&a.value.file.base,a.value.size[f.value],e.padded?a.value.padding[f.value]:"p-0",m==null?void 0:m.replaceAll("{color}",l.value),(w.value||r.leading)&&a.value.leading.padding[f.value],(X.value||r.trailing)&&a.value.trailing.padding[f.value]),e.inputClass)}),w=g(()=>e.icon&&e.leading||e.icon&&!e.trailing||e.loading&&!e.trailing||e.leadingIcon),X=g(()=>e.icon&&e.trailing||e.loading&&e.trailing||e.trailingIcon),se=g(()=>e.loading?e.loadingIcon:e.leadingIcon||e.icon),oe=g(()=>e.loading&&!w.value?e.loadingIcon:e.trailingIcon||e.icon),ue=g(()=>A(a.value.icon.leading.wrapper,a.value.icon.leading.pointer,a.value.icon.leading.padding[f.value])),de=g(()=>A(a.value.icon.base,l.value&&B.ui.colors.includes(l.value)&&a.value.icon.color.replaceAll("{color}",l.value),a.value.icon.size[f.value],e.loading&&a.value.icon.loading)),ce=g(()=>A(a.value.icon.trailing.wrapper,a.value.icon.trailing.pointer,a.value.icon.trailing.padding[f.value])),fe=g(()=>A(a.value.icon.base,l.value&&B.ui.colors.includes(l.value)&&a.value.icon.color.replaceAll("{color}",l.value),a.value.icon.size[f.value],e.loading&&!w.value&&a.value.icon.loading));return{ui:a,attrs:n,name:v,inputId:o,input:b,isLeading:w,isTrailing:X,inputClass:O,leadingIconName:se,leadingIconClass:de,leadingWrapperIconClass:ue,trailingIconName:oe,trailingIconClass:fe,trailingWrapperIconClass:ce,onInput:D,onChange:p,onBlur:N}}}),Ae=["id","name","type","required","placeholder","disabled"];function Te(e,t,r,a,n,i){const d=ae;return y(),h("div",{class:I(e.type==="hidden"?"hidden":e.ui.wrapper)},[Y("input",C({id:e.inputId,ref:"input",name:e.name,type:e.type,required:e.required,placeholder:e.placeholder,disabled:e.disabled,class:e.inputClass},e.type==="file"?e.attrs:{...e.attrs,value:e.modelValue},{onInput:t[0]||(t[0]=(...s)=>e.onInput&&e.onInput(...s)),onBlur:t[1]||(t[1]=(...s)=>e.onBlur&&e.onBlur(...s)),onChange:t[2]||(t[2]=(...s)=>e.onChange&&e.onChange(...s))}),null,16,Ae),S(e.$slots,"default"),e.isLeading&&e.leadingIconName||e.$slots.leading?(y(),h("span",{key:0,class:I(e.leadingWrapperIconClass)},[S(e.$slots,"leading",{disabled:e.disabled,loading:e.loading},()=>[_(d,{name:e.leadingIconName,class:I(e.leadingIconClass)},null,8,["name","class"])])],2)):F("",!0),e.isTrailing&&e.trailingIconName||e.$slots.trailing?(y(),h("span",{key:1,class:I(e.trailingWrapperIconClass)},[S(e.$slots,"trailing",{disabled:e.disabled,loading:e.loading},()=>[_(d,{name:e.trailingIconName,class:I(e.trailingIconClass)},null,8,["name","class"])])],2)):F("",!0)],2)}const ea=Q(Ne,[["render",Te]]),K=te(B.ui.strategy,B.ui.formGroup,Ve),qe=H({inheritAttrs:!1,props:{name:{type:String,default:null},size:{type:String,default:null,validator(e){return Object.keys(K.size).includes(e)}},label:{type:String,default:null},description:{type:String,default:null},required:{type:Boolean,default:!1},help:{type:String,default:null},error:{type:[String,Boolean],default:null},hint:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},eagerValidation:{type:Boolean,default:!1}},setup(e){const{ui:t,attrs:r}=ne("formGroup",R(e,"ui"),K,R(e,"class")),a=U("form-errors",null),n=g(()=>{var s,u;return e.error&&typeof e.error=="string"||typeof e.error=="boolean"?e.error:(u=(s=a==null?void 0:a.value)==null?void 0:s.find(c=>c.path===e.name))==null?void 0:u.message}),i=g(()=>t.value.size[e.size??K.default.size]),d=E(ie());return L("form-group",{error:n,inputId:d,name:g(()=>e.name),size:g(()=>e.size),eagerValidation:g(()=>e.eagerValidation)}),{ui:t,attrs:r,inputId:d,size:i,error:n}}}),Me=["for"];function Je(e,t,r,a,n,i){return y(),h("div",C({class:e.ui.wrapper},e.attrs),[Y("div",{class:I(e.ui.inner)},[e.label||e.$slots.label?(y(),h("div",{key:0,class:I([e.ui.label.wrapper,e.size])},[Y("label",{for:e.inputId,class:I([e.ui.label.base,e.required?e.ui.label.required:""])},[e.$slots.label?S(e.$slots,"label",j(C({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(y(),h(T,{key:1},[q(M(e.label),1)],64))],10,Me),e.hint||e.$slots.hint?(y(),h("span",{key:0,class:I([e.ui.hint])},[e.$slots.hint?S(e.$slots,"hint",j(C({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(y(),h(T,{key:1},[q(M(e.hint),1)],64))],2)):F("",!0)],2)):F("",!0),e.description||e.$slots.description?(y(),h("p",{key:1,class:I([e.ui.description,e.size])},[e.$slots.description?S(e.$slots,"description",j(C({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(y(),h(T,{key:1},[q(M(e.description),1)],64))],2)):F("",!0)],2),Y("div",{class:I([e.label?e.ui.container:""])},[S(e.$slots,"default",j(re({error:e.error}))),typeof e.error=="string"&&e.error?(y(),h("p",{key:0,class:I([e.ui.error,e.size])},[e.$slots.error?S(e.$slots,"error",j(C({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(y(),h(T,{key:1},[q(M(e.error),1)],64))],2)):e.help||e.$slots.help?(y(),h("p",{key:1,class:I([e.ui.help,e.size])},[e.$slots.help?S(e.$slots,"help",j(C({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(y(),h(T,{key:1},[q(M(e.help),1)],64))],2)):F("",!0)],2)],16)}const aa=Q(qe,[["render",Je]]);class Z extends Error{constructor(t){super(t),this.message=t,Object.setPrototypeOf(this,Z.prototype)}}const We=H({props:{schema:{type:[Object,Function],default:void 0},state:{type:Object,required:!0},validate:{type:Function,default:()=>[]},validateOn:{type:Array,default:()=>["blur","input","change","submit"]}},emits:["submit","error"],setup(e,{expose:t,emit:r}){const a=ie(),n=Oe(`form-${a}`);le(()=>{n.on(async l=>{var o;l.type!=="submit"&&((o=e.validateOn)!=null&&o.includes(l.type))&&await u(l.path,{silent:!0})})}),Se(()=>{n.reset()});const i=E([]);L("form-errors",i),L("form-events",n);const d=E({});L("form-inputs",d);async function s(){let l=await e.validate(e.state);if(e.schema)if(Le(e.schema))l=l.concat(await Re(e.state,e.schema));else if(De(e.schema))l=l.concat(await Ye(e.state,e.schema));else if(Ze(e.schema))l=l.concat(await Qe(e.state,e.schema));else if(He(e.schema))l=l.concat(await Xe(e.state,e.schema));else throw new Error("Form validation failed: Unsupported form schema");return l}async function u(l,o={silent:!1}){let v=l;if(l&&!Array.isArray(l)&&(v=[l]),v){const f=i.value.filter(b=>!v.includes(b.path)),$=(await s()).filter(b=>v.includes(b.path));i.value=f.concat($)}else i.value=await s();if(i.value.length>0){if(o.silent)return!1;throw new Z(`Form validation failed: ${JSON.stringify(i.value,null,2)}`)}return e.state}async function c(l){var v;const o=l;try{(v=e.validateOn)!=null&&v.includes("submit")&&await u(),o.data=e.state,r("submit",o)}catch(f){if(!(f instanceof Z))throw f;const $={...o,errors:i.value.map(b=>({...b,id:d.value[b.path]}))};r("error",$)}}return t({validate:u,errors:i,setErrors(l,o){o?i.value=i.value.filter(v=>v.path!==o).concat(l):i.value=l},async submit(){await c(new Event("submit"))},getErrors(l){return l?i.value.filter(o=>o.path===l):i.value},clear(l){l?i.value=i.value.filter(o=>o.path!==l):i.value=[]}}),{onSubmit:c,errors:we(i)}}});function De(e){return e.validate&&e.__isYupSchema__}function Ue(e){return e.inner!==void 0}async function Ye(e,t){try{return await t.validate(e,{abortEarly:!1}),[]}catch(r){if(Ue(r))return r.inner.map(a=>({path:a.path??"",message:a.message}));throw r}}function Le(e){return e.parse!==void 0}async function Re(e,t){const r=await t.safeParseAsync(e);return r.success===!1?r.error.issues.map(a=>({path:a.path.join("."),message:a.message})):[]}function Ze(e){return e.validateAsync!==void 0&&e.id!==void 0}function Ke(e){return e.isJoi===!0}async function Qe(e,t){try{return await t.validateAsync(e,{abortEarly:!1}),[]}catch(r){if(Ke(r))return r.details.map(a=>({path:a.path.join("."),message:a.message}));throw r}}function He(e){return"_parse"in e||"_run"in e||typeof e=="function"&&"schema"in e}async function Xe(e,t){var a;return((a=(await("_parse"in t?t._parse(e):"_run"in t?t._run({typed:!1,value:e},{}):t(e))).issues)==null?void 0:a.map(n=>{var i;return{path:((i=n.path)==null?void 0:i.map(d=>d.key).join("."))||"",message:n.message}}))||[]}function Ge(e,t,r,a,n,i){return y(),h("form",{onSubmit:t[0]||(t[0]=ze((...d)=>e.onSubmit&&e.onSubmit(...d),["prevent"]))},[S(e.$slots,"default",j(re({errors:e.errors})))],32)}const na=Q(We,[["render",Ge]]);export{ea as _,aa as a,na as b,xe as c,Fe as u};
