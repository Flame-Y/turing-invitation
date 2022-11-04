import * as React from "react";
import Styles from "./index.module.scss";
import ParticleSystem from "@/THREE";
import { useEffect, useRef, useState } from "react";
import AtmosphereParticle from "@/THREE/atmosphere";
import { ParticleModelProps } from "@/declare/THREE";
import * as THREE from "three";
import g from "@/assets/images/gradient.png";

import Tween from "@tweenjs/tween.js";
import eventBus from "../../util/event";

import { Swiper, SwiperOptions, Mousewheel } from 'swiper';
import 'swiper/css';

let hasInit = false

function IndexPage() {
  const wrapper = useRef<HTMLDivElement | null>(null);
  let MainParticle: ParticleSystem | null = null;

  const TurnBasicNum = { firefly: 0.002 };
  const al = 1500;
  const tween1 = new Tween.Tween(TurnBasicNum).easing(
    Tween.Easing.Exponential.In
  );
  const tween2 = new Tween.Tween(TurnBasicNum).easing(
    Tween.Easing.Exponential.In
  );

  const Atomsphere1 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 500,
    renderUpdate: (Point) => {
      Point.rotation.x -= TurnBasicNum.firefly;
    },
    callback: (Point) => {
      Point.position.z = -1 * al;
    },
    onChangeModel: () => {
      tween2.stop();
      tween1.stop().to({ firefly: 0.04 }, 1500).chain(tween2);
      tween2.to({ firefly: 0.002 }, 1500);
      tween1.start();
    }
  });
  const Atomsphere2 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 500,
    renderUpdate: (Point) => {
      Point.rotation.y += TurnBasicNum.firefly;
    },
    callback: (Point) => {
      Point.position.y = -0.2 * al;
      Point.position.z = -1 * al;
    }
  });
  const Atomsphere3 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 500,
    renderUpdate: (Point) => {
      Point.rotation.z += TurnBasicNum.firefly / 2;
    },
    callback: (Point) => {
      Point.position.z = -1.2 * al;
    }
  });

  const Models: ParticleModelProps[] = [
    {
      name: "QR-code",
      path: new URL("../../THREE/models/examples/ball.obj", import.meta.url)
        .href,
      onLoadComplete(Geometry) {
        Geometry.scale(300, 300, 300);
        Geometry.center();
      }
    },
    {
      name: "turing",
      path: new URL("../../THREE/models/examples/turing8.obj", import.meta.url)
        .href,
      onLoadComplete(Geometry) {
        let s: number;
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) s = 5;
        else s = 7
        Geometry.scale(s, s, s);
        Geometry.center();
        Geometry.translate(-600, 0, 0)
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
          Geometry.translate(600, 150, 0)
        }

      }
    }
  ];
  window.changeModel = (name: string) => {
    if (MainParticle != null) {
      MainParticle.ChangeModel(name);
    }
  };
  const modelList = ['turing', 'wave', 'QR-code']
  let i = 0;
  const listener = new THREE.AudioListener();

  // 创建一个全局 audio 源
  const sound = new THREE.Audio(listener);

  // 加载一个 sound 并将其设置为 Audio 对象的缓冲区
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(
    new URL("../../assets/audio/bgm.mp3", import.meta.url).href,
    function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
    }
  );

  let hasOperate = false;

  window.addEventListener("click", () => {
    if (!hasOperate) {
      sound.play();
      hasOperate = true;
    }
  });


  function waveInit() {
    const AMOUNTX = 50;
    const AMOUNTY = 50;
    const SEPARATION = 100;
    const numParticles = AMOUNTX * AMOUNTY;
    const vertices = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0,
      j = 0;
    const TextureLoader = new THREE.TextureLoader();
    const material = new THREE.PointsMaterial({
      // 粒子大小
      size: 5,
      // false:粒子尺寸相同 ;true：取决于摄像头远近
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: TextureLoader.load(g)
    });

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        vertices[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        vertices[i + 1] = -300; // y
        vertices[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    const points = new THREE.Points(geometry, material);
    const wave = points.geometry;
    wave.attributes.position.needsUpdate = true
    wave.rotateY(-30)
    Models.push({
      name: "wave",
      geometry: wave,
      onEnterStart(PointGeometry) {
        console.log("wave enter start");
      },
      onEnterEnd(PointGeometry) {
      }
    });
  }
  function swiperInit() {
    const swiperParams: SwiperOptions = {
      modules: [Mousewheel],
      direction: 'vertical',
      mousewheel: {
        invert: false,
        thresholdTime: 2000
      },
      speed: 500,
      height: window.innerHeight,
      on: {
        slideChangeTransitionStart: function (swiper) {
          MainParticle?.ChangeModel(modelList[swiper.activeIndex]);
        },
      }
    };

    const swiper = new Swiper('.swiper', swiperParams);
  }
  const [active, setActive] = useState(true)
  const [mobile, setMobile] = useState(false);


  useEffect(() => {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) setMobile(true)
    if (!hasInit && MainParticle == null && wrapper.current != null) {
      hasInit = true
      swiperInit()
      waveInit();
      MainParticle = new ParticleSystem({
        CanvasWrapper: wrapper.current,
        Models,
        addons: [Atomsphere1, Atomsphere2, Atomsphere3],
        onModelsFinishedLoad: (point) => {
          eventBus.on("enter", (text) => {
            point.rotation.y = -3.14 * 0.8;
            new Tween.Tween(point.rotation)
              .to({ y: 0 }, 10000)
              .easing(Tween.Easing.Quintic.Out)
              .start();
            setTimeout(() => {
              MainParticle?.ChangeModel("turing", 2000);
            }, 2500);
            MainParticle?.ListenMouseMove();
          });
        }
      });
    }

  });

  return (
    <div className={Styles.index_page}>
      <div className={`${Styles.header} ${mobile ? Styles.hidden : ''}`}>
        <div className={Styles.screen}>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7041" width="50" height="50"><path d="M64 416h64V256h160V192H64v224zM128 672H64v224h224v-64H128v-160zM736 192v64h160v160h64V192h-224zM896 832h-160v64h224v-224h-64v160z" p-id="7042"></path></svg>
        </div>
        <div className={Styles.sound}>
          <svg className={`${active ? '' : Styles.hidden}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="50" height="50"><path d="M91.428571 384v256H292.571429a18.285714 18.285714 0 0 1 12.946285 5.339429l151.625143 151.661714V226.998857l-151.625143 151.661714A18.285714 18.285714 0 0 1 292.571429 384H91.428571z m193.572572 292.571429H73.142857a18.285714 18.285714 0 0 1-18.285714-18.285715v-292.571428a18.285714 18.285714 0 0 1 18.285714-18.285715h211.858286l177.481143-177.517714A18.285714 18.285714 0 0 1 493.714286 182.857143v658.285714a18.285714 18.285714 0 0 1-31.232 12.946286L285.001143 676.571429z m560.969143 132.827428a18.285714 18.285714 0 0 1-25.856-25.856A382.683429 382.683429 0 0 0 932.571429 512c0-103.241143-40.923429-199.972571-112.457143-271.542857a18.285714 18.285714 0 0 1 25.856-25.856A419.218286 419.218286 0 0 1 969.142857 512c0 113.042286-44.836571 219.062857-123.172571 297.398857z m-103.460572-103.460571a18.285714 18.285714 0 0 1-25.856-25.856A236.873143 236.873143 0 0 0 786.285714 512a236.873143 236.873143 0 0 0-69.632-168.082286 18.285714 18.285714 0 1 1 25.856-25.856A273.444571 273.444571 0 0 1 822.857143 512c0 73.728-29.257143 142.848-80.347429 193.938286z m-103.424-103.424a18.285714 18.285714 0 1 1-25.856-25.856A91.062857 91.062857 0 0 0 640 512a91.062857 91.062857 0 0 0-26.770286-64.658286 18.285714 18.285714 0 1 1 25.856-25.856A127.634286 127.634286 0 0 1 676.571429 512a127.634286 127.634286 0 0 1-37.485715 90.514286z" p-id="5099"></path></svg>
          <svg className={`${active ? Styles.hidden : ''}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4958" width="50" height="50"><path d="M201.142857 384v256H402.285714a18.285714 18.285714 0 0 1 12.946286 5.339429l151.625143 151.661714V226.998857l-151.625143 151.661714A18.285714 18.285714 0 0 1 402.285714 384H201.142857zM778.715429 512l-60.233143-60.196571a18.285714 18.285714 0 0 1 25.892571-25.892572L804.571429 486.144l60.196571-60.233143a18.285714 18.285714 0 0 1 25.892571 25.892572L830.427429 512l60.233142 60.196571a18.285714 18.285714 0 0 1-25.892571 25.892572L804.571429 537.856l-60.196572 60.233143a18.285714 18.285714 0 0 1-25.892571-25.892572L778.715429 512z m-384 164.571429H182.857143a18.285714 18.285714 0 0 1-18.285714-18.285715v-292.571428a18.285714 18.285714 0 0 1 18.285714-18.285715h211.858286l177.481142-177.517714A18.285714 18.285714 0 0 1 603.428571 182.857143v658.285714a18.285714 18.285714 0 0 1-31.232 12.946286L394.715429 676.571429z" p-id="4959"></path></svg>
        </div>

      </div>
      <div className={Styles.container}>
        <div className={`swiper ${Styles.test}`}>
          <div className="swiper-wrapper">
            <div className={`swiper-slide ${mobile ? Styles.t1mobile : Styles.t1PC}`}>
              <p>感觉不如蒙德土豆饼...营养。</p>
              <p>野外捡几个土豆就能做，</p>
              <p>吃了加34%的血两个吃的饱饱的，</p>
              <p>缺的营养这一块儿也补上了。</p>
            </div>
            <div className={`swiper-slide ${mobile ? Styles.t2mobile : Styles.t2PC}`}>
              <p>接下来的日子可以开始思考想去哪个方向，</p>
              <p>相信很多同学已经有了选择，</p>
              <p>如对方向尚存疑惑，</p>
              <p>我们将在11月？日进行方向宣讲，</p>
              <p>届时将当场选择方向</p>
            </div>
            <div className={`swiper-slide ${Styles.t3}`}>进入下一轮的挑战</div>
          </div>
        </div>
      </div>


      <div className={`${Styles.footer} ${mobile ? Styles.hidden : ''}`}>
        <div className={Styles.left}>Copyright © 2022 - CppTeam X TuringTeam</div>
        <div className={Styles.right}>Powered by  <a href="https://github.com/QingXia-Ela/Up2017-Particles-Effect-Template" target="_blank" rel="noreferrer">Up2017-Particles-Effect-Template</a></div>
      </div>
      <div className={Styles.canvas_wrapper} ref={wrapper}></div>

    </div>
  );
}

export default IndexPage;
