var ee=Object.defineProperty;var te=(u,e,t)=>e in u?ee(u,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[e]=t;var i=(u,e,t)=>(te(u,typeof e!="symbol"?e+"":e,t),t);import{O as se,S as ne,F as ie,P as ae,V as oe,A as re,W as le,a as ce,b as de,E as ue,R as he,B as me,c as pe,d as fe,e as we,T as D,f as I,g as F,h as v,i as B,j as y,k as U,l as O,m as ge,n as Me,o as j,r as S,p as Ae,q as ye,s as Ee,t as ve,M as Pe,u as xe,v as _e}from"./vendor.f6d95d74.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const Le="_layout_a6b8l_1",Ce={layout:Le},Se="_index_page_cq6lm_1",be="_canvas_wrapper_cq6lm_6",Te="_hidden_cq6lm_13",He="_container_cq6lm_17",Ne="_test_cq6lm_23",De="_t1_cq6lm_29",Ie="_t2_cq6lm_33",Fe="_t3_cq6lm_37",Ue="_t4_cq6lm_41",A={index_page:Se,canvas_wrapper:be,hidden:Te,container:He,test:Ne,t1:De,t2:Ie,t3:Fe,t4:Ue},R="/turing-invitation/assets/gradient.2d7d71df.png";function G(u){const e=new Set;let t=[];for(let s=0;s<u.length;s++)t.push(u[s]),s%3===2&&(e.add(t.join(",")),t=[]);const n=[];return e.forEach(s=>{n.push(...s.split(",").map(o=>Number(o)))}),new Float32Array(n)}let b=!1;function T(u,e){return Math.random()*(e-u)+u}class Oe{constructor(e){i(this,"CanvasWrapper");i(this,"modelList");i(this,"_LOAD_COUNT_");i(this,"ModelPointer");i(this,"maxParticlesCount");i(this,"WIDTH");i(this,"HEIGHT");i(this,"orbitControls");i(this,"stats");i(this,"scene");i(this,"camera");i(this,"renderer");i(this,"composer");i(this,"PointMaterial");i(this,"AnimateEffectParticle");i(this,"AnimateDuration");i(this,"mouseV");i(this,"mouseK");i(this,"test");i(this,"hadListenMouseMove");i(this,"MainParticleGroup");i(this,"defaultLoader");i(this,"ParticleAnimeMap");i(this,"Models");i(this,"addons");i(this,"onModelsFinishedLoad");i(this,"onRendering");i(this,"CurrentUseModelName");i(this,"LastUseModelName");i(this,"handleWindowResize",()=>{var e,t;this.HEIGHT=window.innerHeight,this.WIDTH=window.innerWidth,(e=this.renderer)==null||e.setSize(this.WIDTH,this.HEIGHT),(t=this.composer)==null||t.reset(),this.camera!=null&&(this.camera.aspect=this.WIDTH/this.HEIGHT,this.camera.updateProjectionMatrix())});i(this,"rotateScene",ge.exports.throttle(e=>{this.hadListenMouseMove===!0&&(this.mouseV=3e-4*(e.clientX-this.WIDTH/2),this.mouseK=1e-4*(e.clientY-this.HEIGHT/2))},100));const{AnimateDuration:t,onModelsFinishedLoad:n}=e;this.CanvasWrapper=e.CanvasWrapper,this.addons=e.addons!=null?e.addons:[],this.Models=new Map;for(const s of e.Models)this.Models.set(s.name,s);this.AnimateDuration=typeof t=="number"?t:1500,this.onModelsFinishedLoad=n,this.defaultLoader=new se,this.ParticleAnimeMap=[],this.HEIGHT=window.innerHeight,this.WIDTH=window.innerWidth,this.modelList=new Map,this._LOAD_COUNT_=0,this.ModelPointer=0,this.maxParticlesCount=0,this.createScene(),this.initStats(),this._addModels(),this.createEffect(),this.mouseK=0,this.mouseV=0,this.test=0,this.update(0)}createScene(){this.scene=new ne,this.scene.fog=new ie(328972,5e-4);const e=100,t=this.WIDTH/this.HEIGHT,n=1,s=5e4;this.camera=new ae(e,t,n,s),this.camera.position.set(0,0,1e3),this.camera.lookAt(new oe(0,0,0));const o=new re(500);this.scene.add(o),this.addons!=null&&this.addons.forEach(d=>{var h;(h=this.scene)==null||h.add(d.Geometry)}),this.renderer=new le({alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(this.scene.fog.color),this.renderer.setSize(this.WIDTH,this.HEIGHT),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ce,this.CanvasWrapper.appendChild(this.renderer.domElement),window.addEventListener("resize",this.handleWindowResize,!1)}initStats(){this.stats=de(),this.stats!=null&&(this.stats.domElement.style.position="absolute",this.stats.domElement.style.bottom="0px",this.stats.domElement.style.top="0px",this.stats.domElement.style.zIndex="100",this.CanvasWrapper.appendChild(this.stats.domElement))}createEffect(){this.composer=new ue(this.renderer);const e=new he(this.scene,this.camera),t=new me(.75),n=new pe(.5,.5,1500,0),s=new fe(we);s.uniforms.screenWidth.value=window.innerWidth,s.uniforms.screenHeight.value=window.innerHeight,s.renderToScreen=!0,this.composer.addPass(e),this.composer.addPass(t),this.composer.addPass(n),this.composer.addPass(s)}_addModels(){const e=new D;e.crossOrigin="",this.PointMaterial=new I({size:5,sizeAttenuation:!0,transparent:!0,opacity:1,blending:F,depthWrite:!1,map:e.load(R)}),this.Models.forEach(t=>{let n,s=new Float32Array([]);const o=()=>{var d;this.modelList.set(t.name,n),(d=t.onLoadComplete)==null||d.call(this,n),this._LOAD_COUNT_++,this._LOAD_COUNT_===this.Models.size&&this._finishLoadModal()};if(typeof t.path=="string")if(t.loader!=null){const{loaderInstance:d,load:h}=t.loader;d.load(t.path,l=>{n=h(l),o()})}else this.defaultLoader.load(t.path,d=>{for(const h of d.children){const l=h.geometry.attributes.position.array;s=new Float32Array([...s,...l])}t.NeedRemoveDuplicateParticle===!0&&(s=G(s)),n=new v,n.setAttribute("position",new B(G(s),3)),o()});else t.geometry instanceof v&&(n=t.geometry,o())})}_finishLoadModal(){var o,d;let e=0;this.modelList.forEach(h=>{e=Math.max(e,h.attributes.position.count)}),this.maxParticlesCount=e;const t=[],n=1500;this.MainParticleGroup=new y.Group;for(let h=0;h<e;h++){const l=T(-1*n,n),p=T(-1*n,n),w=T(-1*n,n);t.push(l,p,w);const c={x:l,y:p,z:w,isPlaying:!0};c.tweenctx=new y.Tween(c,this.MainParticleGroup).easing(y.Easing.Exponential.In).onComplete(r=>{r.tweenctx._valuesStart.x=r.x,r.tweenctx._valuesStart.y=r.y,r.tweenctx._valuesStart.z=r.z,r.isPlaying=!1}).onStart(r=>{r.tweenctx._valuesStart.x=r.x,r.tweenctx._valuesStart.y=r.y,r.tweenctx._valuesStart.z=r.z,r.isPlaying=!0}),this.ParticleAnimeMap[h]=c}const s=new v;s.setAttribute("position",new U(t,3,!1)),this.AnimateEffectParticle=new O(s,this.PointMaterial),(o=this.scene)==null||o.add(this.AnimateEffectParticle),(d=this.onModelsFinishedLoad)==null||d.call(this,this.AnimateEffectParticle,this.scene)}ChangeModel(e,t=this.AnimateDuration){var l,p,w;const n=this.modelList.get(e);if(e==="wave"?b=!0:b=!1,n==null){console.warn("\u672A\u627E\u5230\u6307\u5B9A\u540D\u5B57\u7684\u6A21\u578B\uFF0C\u6539\u53D8\u64CD\u4F5C\u5DF2\u7EC8\u6B62\uFF01\u4F20\u5165\u7684\u540D\u5B57\uFF1A"+e.toString());return}const s=this.Models.get(e);(l=s.onEnterStart)==null||l.call(this,this.AnimateEffectParticle);const o=n.getAttribute("position"),d=this.AnimateEffectParticle.geometry.getAttribute("position"),h=setTimeout(()=>{var c;(c=s.onEnterEnd)==null||c.call(this,this.AnimateEffectParticle)},t*2);for(let c=0;c<this.maxParticlesCount;c++){const r=(p=this.ParticleAnimeMap[c])==null?void 0:p.tweenctx;this.ParticleAnimeMap[c].isPlaying=!0;const M=c%o.count;r==null||r.stop().to({x:o.array[M*3],y:o.array[M*3+1],z:o.array[M*3+2]},t).delay(t*Math.random()).onUpdate(f=>{d.setXYZ(c,f.x,f.y,f.z),d.needsUpdate=!0}).onStop(f=>{clearTimeout(h),f.tweenctx._valuesStart.x=f.x,f.tweenctx._valuesStart.y=f.y,f.tweenctx._valuesStart.z=f.z,f.isPlaying=!1}).start()}(w=this.addons)==null||w.forEach(c=>{var r;(r=c.ChangeModel)==null||r.call(this)})}ListenMouseMove(){this.hadListenMouseMove!==!0&&(window.addEventListener("mousemove",this.rotateScene),this.hadListenMouseMove=!0)}StopListenMouseMove(){this.hadListenMouseMove===!0&&(window.removeEventListener("mousemove",this.rotateScene),this.hadListenMouseMove=!1)}AlignCameraCenter(e=!1){if(e&&this.scene!=null){this.scene.rotation.x=0,this.scene.rotation.y=0,this.mouseV=0,this.mouseK=0;return}const t=new MouseEvent("click",{clientX:this.WIDTH/2,clientY:this.HEIGHT/2});this.rotateScene(t)}_updateRotation(){this.scene!=null&&(this.scene.rotation.y+=(this.mouseV-this.scene.rotation.y)/50,this.scene.rotation.x+=(this.mouseK-this.scene.rotation.x)/50)}update(e){var t,n,s,o,d,h;if(b){const l=(t=this.AnimateEffectParticle)==null?void 0:t.geometry;let p=l==null?void 0:l.getAttribute("position");this.ParticleAnimeMap.forEach((c,r)=>{c.isPlaying===!1&&(p.setY(r,Math.sin((r+this.test)*.3)*50+Math.sin((r+this.test)*.5)*50),c.y=p.getY(r))}),this.test+=.1,p.needsUpdate=!0}else this.test=0;y.update(),(n=this.MainParticleGroup)==null||n.update(),(s=this.onRendering)==null||s.call(this,e),(o=this.stats)==null||o.update(),this._updateRotation(),this.Models.forEach(l=>{l.name===this.CurrentUseModelName&&l.onAnimationFrameUpdate!=null&&l.onAnimationFrameUpdate(this.AnimateEffectParticle,this.ParticleAnimeMap)}),(d=this.addons)==null||d.forEach(l=>{l.update()}),(h=this.composer)==null||h.render(),requestAnimationFrame(l=>{this.update(l)})}}class Re{constructor(){i(this,"Geometry");i(this,"update");i(this,"ChangeModel")}}const Y=new D;Y.crossOrigin="";const We=new I({size:7,map:Y.load(R),blending:F,depthWrite:!1,transparent:!0});function H(u,e){return Math.random()*(e-u)+u}class N extends Re{constructor(t){var p;super();i(this,"longestDistance");i(this,"particleSum");i(this,"renderUpdate");i(this,"onChangeModel");i(this,"callback");i(this,"Geometry");i(this,"update",()=>{var t;(t=this.renderUpdate)==null||t.call(this,this.Geometry)});i(this,"ChangeModel",()=>{var t;(t=this.onChangeModel)==null||t.call(this,this.Geometry)});const{longestDistance:n,particleSum:s,renderUpdate:o,onChangeModel:d}=t;this.longestDistance=n,this.particleSum=s,this.renderUpdate=o,this.onChangeModel=d;const h=[];for(let w=0;w<this.particleSum;w++){const c=H(-1*n,n),r=H(-1*n,n),M=H(-1*n,n);h.push(c,r,M)}const l=new v;l.setAttribute("position",new U(h,3)),this.Geometry=new O(l,We),(p=t.callback)==null||p.call(this,this.Geometry)}}const ze=new Me.exports.EventEmitter;const m=j.exports.jsx,E=j.exports.jsxs;function Ge(){const u=S.exports.useRef(null);let e=null;const t={firefly:.002},n=1500,s=new y.Tween(t).easing(y.Easing.Exponential.In),o=new y.Tween(t).easing(y.Easing.Exponential.In),d=new N({longestDistance:n,particleSum:500,renderUpdate:a=>{a.rotation.x-=t.firefly},callback:a=>{a.position.z=-1*n},onChangeModel:()=>{o.stop(),s.stop().to({firefly:.04},1500).chain(o),o.to({firefly:.002},1500),s.start()}}),h=new N({longestDistance:n,particleSum:500,renderUpdate:a=>{a.rotation.y+=t.firefly},callback:a=>{a.position.y=-.2*n,a.position.z=-1*n}}),l=new N({longestDistance:n,particleSum:500,renderUpdate:a=>{a.rotation.z+=t.firefly/2},callback:a=>{a.position.z=-1.2*n}}),p=[{name:"monitor",path:new URL("../../THREE/models/examples/\\u5907\\u90092.obj",self.location).href,onLoadComplete(a){a.scale(2e3,2e3,2e3),a.translate(-600,0,0)}},{name:"atom",path:new URL("/turing-invitation/assets/atom.a72e2805.obj",self.location).href,onLoadComplete(a){a.scale(300,300,300),a.translate(-600,0,-100)},onEnterStart(a){console.log("ball enter start")},onEnterEnd(a){console.log("ball enter end")}},{name:"balance",path:new URL("../../THREE/models/examples/\\u5929\\u5E73.obj",self.location).href,onLoadComplete(a){a.scale(500,500,500),a.translate(900,-500,0)}},{name:"turing",path:new URL("/turing-invitation/assets/turing8.7e1d7384.obj",self.location).href,onLoadComplete(a){a.scale(9,9,9),a.center(),a.translate(-600,0,0)}}];window.changeModel=a=>{e!=null&&e.ChangeModel(a)};const w=["turing","monitor","atom","balance","wave"];let c=0;const r=new Ae,M=new ye(r);new Ee().load(new URL("/turing-invitation/assets/bgm.2816cd09.mp3",self.location).href,function(a){M.setBuffer(a),M.setLoop(!0),M.setVolume(.25)});let W=!1;window.addEventListener("click",()=>{W||(M.play(),W=!0)}),$();function $(){const a=function(g){if(g=g!=null?g:window.event,console.log(g.deltaY),g.deltaY!==0){if(g.deltaY>0)if(c<=3)c++;else return;if(g.deltaY<0)if(c>0)c--;else return;window.changeModel(w[c])}};document.onmousewheel=a}function q(){const P=new Float32Array(7500),K=new Float32Array(2500);let x=0;const J=new D,Q=new I({size:5,sizeAttenuation:!0,transparent:!0,opacity:1,blending:F,depthWrite:!1,map:J.load(R)});for(var _=0;_<50;_++)for(var L=0;L<50;L++)P[x]=_*100-50*100/2,P[x+1]=-300,P[x+2]=L*100-50*100/2,x+=3;const C=new v;C.setAttribute("position",new U(P,3)),C.setAttribute("scale",new B(K,1));const z=new O(C,Q).geometry;z.attributes.position.needsUpdate=!0,p.push({name:"wave",geometry:z,onEnterStart(Z){console.log("wave enter start")},onEnterEnd(Z){}})}function V(){const a={modules:[Pe],direction:"vertical",mousewheel:!0,height:window.innerHeight,on:{slideChangeTransitionStart:function(){console.log(1)}}};new ve(".swiper",a)}const[k,X]=S.exports.useState(!0);return S.exports.useEffect(()=>{V(),q(),ze.on("message",a=>{setInterval(()=>{X(!0)},2e3)}),e==null&&u.current!=null&&(e=new Oe({CanvasWrapper:u.current,Models:p,addons:[d,h,l],onModelsFinishedLoad:a=>{a.rotation.y=-3.14*.8,new y.Tween(a.rotation).to({y:0},1e4).easing(y.Easing.Quintic.Out).start(),setTimeout(()=>{e==null||e.ChangeModel("turing",2e3)},2500),e==null||e.ListenMouseMove()}}))}),E("div",{className:`${A.index_page} ${k?"":A.hidden} `,children:[m("div",{className:A.container,children:m("div",{className:`swiper ${A.test}`,children:E("div",{className:"swiper-wrapper",children:[m("div",{className:`swiper-slide ${A.t1}`,children:"\u6587\u672C1"}),m("div",{className:`swiper-slide ${A.t2}`,children:"\u6587\u672C2"}),E("div",{className:`swiper-slide ${A.t3}`,children:["Those who can imagine anything,",m("br",{}),m("br",{}),m("br",{}),"can create the impossible."]}),E("div",{className:`swiper-slide ${A.t4}`,children:[E("p",{children:["\u6211\u4EEC\u5206\u62C5\u5BD2\u6F6E\u3001\u98CE\u96F7\u3001\u9739\u96F3",m("br",{}),m("br",{}),m("br",{}),"\u6211\u4EEC\u5171\u4EAB\u96FE\u972D\u3001\u6D41\u5C9A\u3001\u8679\u9713\u3002"]})," "]}),E("div",{className:`swiper-slide ${A.t2}`,children:["\u62E5\u6709\u6D77\u5927\u7684\u73B0\u5728",m("br",{}),m("br",{}),m("br",{}),"\u62E5\u62B1\u5927\u6D77\u7684\u672A\u6765"]})]})})}),m("div",{className:A.canvas_wrapper,ref:u})]})}function Be(){return m("div",{className:Ce.layout,children:m(Ge,{})})}function je(){return m(Be,{})}xe.createRoot(document.getElementById("root")).render(m(_e.StrictMode,{children:m(je,{})}));
