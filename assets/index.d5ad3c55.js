var le=Object.defineProperty;var ce=(d,e,t)=>e in d?le(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var o=(d,e,t)=>(ce(d,typeof e!="symbol"?e+"":e,t),t);import{e as de,L as ue,O as he,S as me,F as pe,P as fe,V as we,W as ge,a as ve,b as Ae,E as _e,R as Me,B as Ee,c as ye,d as xe,f as Pe,T as D,g as O,A as U,h as x,i as q,j as A,k as R,l as W,m as K,n as J,r as M,o as Ce,p as Fe,q as Se,s as Le,M as be,t as Be,u as Te}from"./vendor.2f76f80b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Ne="_layout_964ts_1",He="_page_964ts_6",ze="_hidden_964ts_11",j={layout:Ne,page:He,hidden:ze},Ie="_index_page_c6xe1_1",De="_canvas_wrapper_c6xe1_6",Oe="_container_c6xe1_13",Ue="_header_c6xe1_19",Re="_screen_c6xe1_26",We="_sound_c6xe1_34",Ge="_test_c6xe1_42",$e="_t1mobile_c6xe1_48",ke="_t1PC_c6xe1_55",Ve="_t2mobile_c6xe1_63",je="_t2PC_c6xe1_70",Qe="_t3_c6xe1_77",Xe="_footer_c6xe1_81",Ye="_left_c6xe1_93",qe="_right_c6xe1_96",Ke="_hidden_c6xe1_105",p={index_page:Ie,canvas_wrapper:De,container:Oe,header:Ue,screen:Re,sound:We,test:Ge,t1mobile:$e,t1PC:ke,t2mobile:Ve,t2PC:je,t3:Qe,footer:Xe,left:Ye,right:qe,hidden:Ke},P=new de.exports.EventEmitter,G="/turing-invitation/assets/gradient.2d7d71df.png";function Q(d){const e=new Set;let t=[];for(let s=0;s<d.length;s++)t.push(d[s]),s%3===2&&(e.add(t.join(",")),t=[]);const n=[];return e.forEach(s=>{n.push(...s.split(",").map(i=>Number(i)))}),new Float32Array(n)}let N=!1;function H(d,e){return Math.random()*(e-d)+d}class Je{constructor(e){o(this,"CanvasWrapper");o(this,"modelList");o(this,"_LOAD_COUNT_");o(this,"ModelPointer");o(this,"maxParticlesCount");o(this,"WIDTH");o(this,"HEIGHT");o(this,"orbitControls");o(this,"stats");o(this,"scene");o(this,"camera");o(this,"renderer");o(this,"composer");o(this,"PointMaterial");o(this,"AnimateEffectParticle");o(this,"AnimateDuration");o(this,"mouseV");o(this,"mouseK");o(this,"test");o(this,"hadListenMouseMove");o(this,"MainParticleGroup");o(this,"defaultLoader");o(this,"ParticleAnimeMap");o(this,"Models");o(this,"addons");o(this,"onModelsFinishedLoad");o(this,"onRendering");o(this,"CurrentUseModelName");o(this,"LastUseModelName");o(this,"handleWindowResize",()=>{var e,t;this.HEIGHT=window.innerHeight,this.WIDTH=window.innerWidth,(e=this.renderer)==null||e.setSize(this.WIDTH,this.HEIGHT),(t=this.composer)==null||t.reset(),this.camera!=null&&(this.camera.aspect=this.WIDTH/this.HEIGHT,this.camera.updateProjectionMatrix())});o(this,"rotateScene",K.exports.throttle(e=>{this.hadListenMouseMove===!0&&(this.mouseV=3e-4*(e.clientX-this.WIDTH/2),this.mouseK=1e-4*(e.clientY-this.HEIGHT/2))},100));const{AnimateDuration:t,onModelsFinishedLoad:n}=e,s=new ue;s.onStart=function(i,c,m){},s.onLoad=function(){console.log("Loading complete!")},s.onProgress=function(i,c,m){P.emit("message",i,c,m)},s.onError=function(i){console.log("There was an error loading "+i)},this.CanvasWrapper=e.CanvasWrapper,this.addons=e.addons!=null?e.addons:[],this.Models=new Map;for(const i of e.Models)this.Models.set(i.name,i);this.AnimateDuration=typeof t=="number"?t:1500,this.onModelsFinishedLoad=n,this.defaultLoader=new he(s),this.ParticleAnimeMap=[],this.HEIGHT=window.innerHeight,this.WIDTH=window.innerWidth,this.modelList=new Map,this._LOAD_COUNT_=0,this.ModelPointer=0,this.maxParticlesCount=0,this.createScene(),this.initStats(),this._addModels(),this.createEffect(),this.mouseK=0,this.mouseV=0,this.test=0,this.update(0)}createScene(){this.scene=new me,this.scene.fog=new pe(328972,5e-4);const e=100,t=this.WIDTH/this.HEIGHT,n=1,s=5e4;this.camera=new fe(e,t,n,s),this.camera.position.set(0,0,1e3),this.camera.lookAt(new we(0,0,0)),this.addons!=null&&this.addons.forEach(i=>{var c;(c=this.scene)==null||c.add(i.Geometry)}),this.renderer=new ge({alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(this.scene.fog.color),this.renderer.setSize(this.WIDTH,this.HEIGHT),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ve,this.CanvasWrapper.appendChild(this.renderer.domElement),window.addEventListener("resize",this.handleWindowResize,!1)}initStats(){this.stats=Ae(),this.stats!=null&&(this.stats.domElement.style.position="absolute",this.stats.domElement.style.bottom="0px",this.stats.domElement.style.top="0px",this.stats.domElement.style.zIndex="100",this.CanvasWrapper.appendChild(this.stats.domElement))}createEffect(){this.composer=new _e(this.renderer);const e=new Me(this.scene,this.camera),t=new Ee(.75),n=new ye(.5,.5,1500,0),s=new xe(Pe);s.uniforms.screenWidth.value=window.innerWidth,s.uniforms.screenHeight.value=window.innerHeight,s.renderToScreen=!0,this.composer.addPass(e),this.composer.addPass(t),this.composer.addPass(n),this.composer.addPass(s)}_addModels(){const e=new D;e.crossOrigin="",this.PointMaterial=new O({size:5,sizeAttenuation:!0,transparent:!0,opacity:1,blending:U,depthWrite:!1,map:e.load(G)}),this.Models.forEach(t=>{let n,s=new Float32Array([]);const i=()=>{var c;this.modelList.set(t.name,n),(c=t.onLoadComplete)==null||c.call(this,n),this._LOAD_COUNT_++,this._LOAD_COUNT_===this.Models.size&&this._finishLoadModal()};if(typeof t.path=="string")if(t.loader!=null){const{loaderInstance:c,load:m}=t.loader;c.load(t.path,u=>{n=m(u),i()})}else this.defaultLoader.load(t.path,c=>{for(const m of c.children){const u=m.geometry.attributes.position.array;s=new Float32Array([...s,...u])}t.NeedRemoveDuplicateParticle===!0&&(s=Q(s)),n=new x,n.setAttribute("position",new q(Q(s),3)),i()});else t.geometry instanceof x&&(n=t.geometry,i())})}_finishLoadModal(){var i,c;let e=0;this.modelList.forEach(m=>{e=Math.max(e,m.attributes.position.count)}),this.maxParticlesCount=e;const t=[],n=1500;this.MainParticleGroup=new A.Group;for(let m=0;m<e;m++){const u=H(-1*n,n),f=H(-1*n,n),g=H(-1*n,n);t.push(u,f,g);const h={x:u,y:f,z:g,isPlaying:!0};h.tweenctx=new A.Tween(h,this.MainParticleGroup).easing(A.Easing.Exponential.In).onComplete(a=>{a.tweenctx._valuesStart.x=a.x,a.tweenctx._valuesStart.y=a.y,a.tweenctx._valuesStart.z=a.z,a.isPlaying=!1}).onStart(a=>{a.tweenctx._valuesStart.x=a.x,a.tweenctx._valuesStart.y=a.y,a.tweenctx._valuesStart.z=a.z,a.isPlaying=!0}),this.ParticleAnimeMap[m]=h}const s=new x;s.setAttribute("position",new R(t,3,!1)),this.AnimateEffectParticle=new W(s,this.PointMaterial),(i=this.scene)==null||i.add(this.AnimateEffectParticle),(c=this.onModelsFinishedLoad)==null||c.call(this,this.AnimateEffectParticle,this.scene)}ChangeModel(e,t=this.AnimateDuration){var u,f,g;const n=this.modelList.get(e);if(e==="wave"?N=!0:N=!1,n==null){console.warn("\u672A\u627E\u5230\u6307\u5B9A\u540D\u5B57\u7684\u6A21\u578B\uFF0C\u6539\u53D8\u64CD\u4F5C\u5DF2\u7EC8\u6B62\uFF01\u4F20\u5165\u7684\u540D\u5B57\uFF1A"+e.toString());return}const s=this.Models.get(e);(u=s.onEnterStart)==null||u.call(this,this.AnimateEffectParticle);const i=n.getAttribute("position"),c=this.AnimateEffectParticle.geometry.getAttribute("position"),m=setTimeout(()=>{var h;(h=s.onEnterEnd)==null||h.call(this,this.AnimateEffectParticle)},t*2);for(let h=0;h<this.maxParticlesCount;h++){const a=this.ParticleAnimeMap[h];this.ParticleAnimeMap[h].isPlaying=!0;const E=h%i.count;a.x=c.getX(h),a.y=c.getY(h),a.z=c.getZ(h),(f=a.tweenctx)==null||f.stop().to({x:i.array[E*3],y:i.array[E*3+1],z:i.array[E*3+2]},t).delay(t*Math.random()).onUpdate(_=>{c.setXYZ(h,_.x,_.y,_.z),c.needsUpdate=!0}).onStop(_=>{clearTimeout(m)}).start()}(g=this.addons)==null||g.forEach(h=>{var a;(a=h.ChangeModel)==null||a.call(this)})}ListenMouseMove(){this.hadListenMouseMove!==!0&&(window.addEventListener("mousemove",this.rotateScene),this.hadListenMouseMove=!0)}StopListenMouseMove(){this.hadListenMouseMove===!0&&(window.removeEventListener("mousemove",this.rotateScene),this.hadListenMouseMove=!1)}AlignCameraCenter(e=!1){if(e&&this.scene!=null){this.scene.rotation.x=0,this.scene.rotation.y=0,this.mouseV=0,this.mouseK=0;return}const t=new MouseEvent("click",{clientX:this.WIDTH/2,clientY:this.HEIGHT/2});this.rotateScene(t)}_updateRotation(){this.scene!=null&&(this.scene.rotation.y+=(this.mouseV-this.scene.rotation.y)/50,this.scene.rotation.x+=(this.mouseK-this.scene.rotation.x)/50)}update(e){var t,n,s,i,c,m;if(N){const u=(t=this.AnimateEffectParticle)==null?void 0:t.geometry;let f=u==null?void 0:u.getAttribute("position");this.ParticleAnimeMap.forEach((h,a)=>{h.isPlaying===!1&&f.setY(a,Math.sin((a+this.test)*.3)*50+Math.sin((a+this.test)*.5)*50)}),this.test+=.05,f.needsUpdate=!0}else this.test=0;A.update(),(n=this.MainParticleGroup)==null||n.update(),(s=this.onRendering)==null||s.call(this,e),(i=this.stats)==null||i.update(),this._updateRotation(),this.Models.forEach(u=>{u.name===this.CurrentUseModelName&&u.onAnimationFrameUpdate!=null&&u.onAnimationFrameUpdate(this.AnimateEffectParticle,this.ParticleAnimeMap)}),(c=this.addons)==null||c.forEach(u=>{u.update()}),(m=this.composer)==null||m.render(),requestAnimationFrame(u=>{this.update(u)})}}class Ze{constructor(){o(this,"Geometry");o(this,"update");o(this,"ChangeModel")}}const Z=new D;Z.crossOrigin="";const et=new O({size:7,map:Z.load(G),blending:U,depthWrite:!1,transparent:!0});function z(d,e){return Math.random()*(e-d)+d}class I extends Ze{constructor(t){var f;super();o(this,"longestDistance");o(this,"particleSum");o(this,"renderUpdate");o(this,"onChangeModel");o(this,"callback");o(this,"Geometry");o(this,"update",()=>{var t;(t=this.renderUpdate)==null||t.call(this,this.Geometry)});o(this,"ChangeModel",()=>{var t;(t=this.onChangeModel)==null||t.call(this,this.Geometry)});const{longestDistance:n,particleSum:s,renderUpdate:i,onChangeModel:c}=t;this.longestDistance=n,this.particleSum=s,this.renderUpdate=i,this.onChangeModel=c;const m=[];for(let g=0;g<this.particleSum;g++){const h=z(-1*n,n),a=z(-1*n,n),E=z(-1*n,n);m.push(h,a,E)}const u=new x;u.setAttribute("position",new R(m,3)),this.Geometry=new W(u,et),(f=t.callback)==null||f.call(this,this.Geometry)}}const l=J.exports.jsx,v=J.exports.jsxs;let X=!1;function tt(){const d=M.exports.useRef(null);let e=null;const t={firefly:.002},n=1500,s=new A.Tween(t).easing(A.Easing.Exponential.In),i=new A.Tween(t).easing(A.Easing.Exponential.In),c=new I({longestDistance:n,particleSum:500,renderUpdate:r=>{r.rotation.x-=t.firefly},callback:r=>{r.position.z=-1*n},onChangeModel:()=>{i.stop(),s.stop().to({firefly:.04},1500).chain(i),i.to({firefly:.002},1500),s.start()}}),m=new I({longestDistance:n,particleSum:500,renderUpdate:r=>{r.rotation.y+=t.firefly},callback:r=>{r.position.y=-.2*n,r.position.z=-1*n}}),u=new I({longestDistance:n,particleSum:500,renderUpdate:r=>{r.rotation.z+=t.firefly/2},callback:r=>{r.position.z=-1.2*n}}),f=[{name:"QR-code",path:new URL("/turing-invitation/assets/ball.f680aeec.obj",self.location).href,onLoadComplete(r){r.scale(300,300,300),r.center()}},{name:"turing",path:new URL("/turing-invitation/assets/turing8.7e1d7384.obj",self.location).href,onLoadComplete(r){let w;window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)?w=5:w=7,r.scale(w,w,w),r.center(),r.translate(-600,0,0),window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)&&r.translate(600,150,0)}}];window.changeModel=r=>{e!=null&&e.ChangeModel(r)};const g=["turing","wave","QR-code"],h=new Ce,a=new Fe(h);new Se().load(new URL("/turing-invitation/assets/bgm.2816cd09.mp3",self.location).href,function(r){a.setBuffer(r),a.setLoop(!0),a.setVolume(.1),a.hasPlaybackControl=!0});let _=!1,$=document.getElementById("soundButton");$&&$.addEventListener("click",()=>{_?(a.pause(),_=!1):(a.play(),_=!0)});function ee(){const F=new Float32Array(7500),ie=new Float32Array(2500);let S=0;const oe=new D,ae=new O({size:5,sizeAttenuation:!0,transparent:!0,opacity:1,blending:U,depthWrite:!1,map:oe.load(G)});for(var L=0;L<50;L++)for(var b=0;b<50;b++)F[S]=L*100-50*100/2,F[S+1]=-300,F[S+2]=b*100-50*100/2,S+=3;const B=new x;B.setAttribute("position",new R(F,3)),B.setAttribute("scale",new q(ie,1));const T=new W(B,ae).geometry;T.attributes.position.needsUpdate=!0,T.rotateY(-30),f.push({name:"wave",geometry:T,onEnterStart(re){console.log("wave enter start")},onEnterEnd(re){}})}function te(){const r={modules:[be],direction:"vertical",mousewheel:{invert:!1,thresholdTime:2e3},speed:500,height:window.innerHeight,on:{slideChangeTransitionStart:function(w){e==null||e.ChangeModel(g[w.activeIndex])}}};new Le(".swiper",r)}function se(){let r=document.documentElement,w=r.requestFullScreen||r.webkitRequestFullScreen||r.mozRequestFullScreen||r.msRequestFullscreen;typeof w<"u"&&w&&w.call(r)}const[k,V]=M.exports.useState(!0),[C,ne]=M.exports.useState(!1);return M.exports.useEffect(()=>{window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)&&ne(!0),!X&&e==null&&d.current!=null&&(X=!0,te(),ee(),e=new Je({CanvasWrapper:d.current,Models:f,addons:[c,m,u],onModelsFinishedLoad:r=>{P.on("enter",w=>{a.play(),r.rotation.y=-3.14*.8,new A.Tween(r.rotation).to({y:0},1e4).easing(A.Easing.Quintic.Out).start(),setTimeout(()=>{e==null||e.ChangeModel("turing",2e3)},2500),e==null||e.ListenMouseMove()})}}))}),v("div",{className:p.index_page,children:[v("div",{className:`${p.header} ${C?p.hidden:""}`,children:[l("div",{className:p.screen,children:l("svg",{viewBox:"0 0 1024 1024",version:"1.1",onClick:()=>{se()},xmlns:"http://www.w3.org/2000/svg","p-id":"7041",children:l("path",{d:"M64 416h64V256h160V192H64v224zM128 672H64v224h224v-64H128v-160zM736 192v64h160v160h64V192h-224zM896 832h-160v64h224v-224h-64v160z","p-id":"7042"})})}),v("div",{className:p.sound,id:"soundButton",children:[l("svg",{className:`${k?"":p.hidden}`,onClick:()=>{V(!1)},viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5098",children:l("path",{d:"M91.428571 384v256H292.571429a18.285714 18.285714 0 0 1 12.946285 5.339429l151.625143 151.661714V226.998857l-151.625143 151.661714A18.285714 18.285714 0 0 1 292.571429 384H91.428571z m193.572572 292.571429H73.142857a18.285714 18.285714 0 0 1-18.285714-18.285715v-292.571428a18.285714 18.285714 0 0 1 18.285714-18.285715h211.858286l177.481143-177.517714A18.285714 18.285714 0 0 1 493.714286 182.857143v658.285714a18.285714 18.285714 0 0 1-31.232 12.946286L285.001143 676.571429z m560.969143 132.827428a18.285714 18.285714 0 0 1-25.856-25.856A382.683429 382.683429 0 0 0 932.571429 512c0-103.241143-40.923429-199.972571-112.457143-271.542857a18.285714 18.285714 0 0 1 25.856-25.856A419.218286 419.218286 0 0 1 969.142857 512c0 113.042286-44.836571 219.062857-123.172571 297.398857z m-103.460572-103.460571a18.285714 18.285714 0 0 1-25.856-25.856A236.873143 236.873143 0 0 0 786.285714 512a236.873143 236.873143 0 0 0-69.632-168.082286 18.285714 18.285714 0 1 1 25.856-25.856A273.444571 273.444571 0 0 1 822.857143 512c0 73.728-29.257143 142.848-80.347429 193.938286z m-103.424-103.424a18.285714 18.285714 0 1 1-25.856-25.856A91.062857 91.062857 0 0 0 640 512a91.062857 91.062857 0 0 0-26.770286-64.658286 18.285714 18.285714 0 1 1 25.856-25.856A127.634286 127.634286 0 0 1 676.571429 512a127.634286 127.634286 0 0 1-37.485715 90.514286z","p-id":"5099"})}),l("svg",{className:`${k?p.hidden:""}`,onClick:()=>{V(!0)},viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4958",children:l("path",{d:"M201.142857 384v256H402.285714a18.285714 18.285714 0 0 1 12.946286 5.339429l151.625143 151.661714V226.998857l-151.625143 151.661714A18.285714 18.285714 0 0 1 402.285714 384H201.142857zM778.715429 512l-60.233143-60.196571a18.285714 18.285714 0 0 1 25.892571-25.892572L804.571429 486.144l60.196571-60.233143a18.285714 18.285714 0 0 1 25.892571 25.892572L830.427429 512l60.233142 60.196571a18.285714 18.285714 0 0 1-25.892571 25.892572L804.571429 537.856l-60.196572 60.233143a18.285714 18.285714 0 0 1-25.892571-25.892572L778.715429 512z m-384 164.571429H182.857143a18.285714 18.285714 0 0 1-18.285714-18.285715v-292.571428a18.285714 18.285714 0 0 1 18.285714-18.285715h211.858286l177.481142-177.517714A18.285714 18.285714 0 0 1 603.428571 182.857143v658.285714a18.285714 18.285714 0 0 1-31.232 12.946286L394.715429 676.571429z","p-id":"4959"})})]})]}),l("div",{className:p.container,children:l("div",{className:`swiper ${p.test}`,children:v("div",{className:"swiper-wrapper",children:[v("div",{className:`swiper-slide ${C?p.t1mobile:p.t1PC}`,children:[l("p",{children:"\u611F\u89C9\u4E0D\u5982\u8499\u5FB7\u571F\u8C46\u997C...\u8425\u517B\u3002"}),l("p",{children:"\u91CE\u5916\u6361\u51E0\u4E2A\u571F\u8C46\u5C31\u80FD\u505A\uFF0C"}),l("p",{children:"\u5403\u4E86\u52A034%\u7684\u8840\u4E24\u4E2A\u5403\u7684\u9971\u9971\u7684\uFF0C"}),l("p",{children:"\u7F3A\u7684\u8425\u517B\u8FD9\u4E00\u5757\u513F\u4E5F\u8865\u4E0A\u4E86\u3002"})]}),v("div",{className:`swiper-slide ${C?p.t2mobile:p.t2PC}`,children:[l("p",{children:"\u63A5\u4E0B\u6765\u7684\u65E5\u5B50\u53EF\u4EE5\u5F00\u59CB\u601D\u8003\u60F3\u53BB\u54EA\u4E2A\u65B9\u5411\uFF0C"}),l("p",{children:"\u76F8\u4FE1\u5F88\u591A\u540C\u5B66\u5DF2\u7ECF\u6709\u4E86\u9009\u62E9\uFF0C"}),l("p",{children:"\u5982\u5BF9\u65B9\u5411\u5C1A\u5B58\u7591\u60D1\uFF0C"}),l("p",{children:"\u6211\u4EEC\u5C06\u572811\u6708\uFF1F\u65E5\u8FDB\u884C\u65B9\u5411\u5BA3\u8BB2\uFF0C"}),l("p",{children:"\u5C4A\u65F6\u5C06\u5F53\u573A\u9009\u62E9\u65B9\u5411"})]}),l("div",{className:`swiper-slide ${p.t3}`,children:"\u8FDB\u5165\u4E0B\u4E00\u8F6E\u7684\u6311\u6218"})]})})}),v("div",{className:`${p.footer} ${C?p.hidden:""}`,children:[l("div",{className:p.left,children:"Copyright \xA9 2022 - CppTeam X TuringTeam"}),v("div",{className:p.right,children:["Powered by  ",l("a",{href:"https://github.com/QingXia-Ela/Up2017-Particles-Effect-Template",target:"_blank",rel:"noreferrer",children:"Up2017-Particles-Effect-Template"})]})]}),l("div",{className:p.canvas_wrapper,ref:d})]})}const st="_loading_1w2dn_1",nt="_logo_1w2dn_13",it="_logoInside_1w2dn_13",ot="_name_1w2dn_16",at="_progress_1w2dn_20",rt="_enter_1w2dn_24",lt="_hidden_1w2dn_38",y={loading:st,logo:nt,logoInside:it,name:ot,progress:at,enter:rt,hidden:lt},ct="/turing-invitation/assets/TR_logo.fc31e558.png",dt=()=>{M.exports.useState(!1);const[d,e]=M.exports.useState(0);P.on("message",(n,s,i)=>{console.log("Loading file: "+n+`.
Loaded `+s+" of "+i+" files."),e(s/i*100)});const t=()=>{P.emit("enter","enter")};return v("div",{className:`${y.loading}`,children:[l("div",{className:y.logo,children:l("img",{className:y.logoInside,src:ct,alt:""})}),l("div",{className:y.name,children:"TuringTeam Invitation"}),v("div",{className:y.progress,children:[d,"%"]}),l("div",{className:y.enter,onClick:t,children:"\u8FDB\u5165"})]})};function Y(){const t=(document.querySelector("html").clientHeight/930*50).toFixed(2);document.querySelector("html").setAttribute("style","font-size:"+t+"px !important")}const ut=()=>{Y(),window.addEventListener("resize",K.exports.throttle(Y,200))},ht=()=>{const[d,e]=M.exports.useState(!1);return ut(),P.on("enter",t=>{e(!0)}),v("div",{children:[l("div",{className:`${d?j.hidden:""}`,children:l(dt,{})}),l("div",{className:j.page,children:l(tt,{})})]})};function mt(){return l(ht,{})}Be.createRoot(document.getElementById("root")).render(l(Te.StrictMode,{children:l(mt,{})}));
