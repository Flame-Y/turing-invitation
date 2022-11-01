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
      name: "monitor",
      path: new URL("../../THREE/models/examples/monitor.obj", import.meta.url)
        .href,
      onLoadComplete(Geometry) {
        const s = 2000;
        Geometry.scale(s, s, s);
        Geometry.translate(-500, 0, 0);
      }
    },
    {
      name: "atom",
      path: new URL("../../THREE/models/examples/atom.obj", import.meta.url)
        .href,
      onLoadComplete(Geometry) {
        Geometry.scale(300, 300, 300);
        // Geometry.scale(scaleNum, scaleNum, scaleNum);
        Geometry.translate(-600, 0, -100);
      },
      onEnterStart(PointGeometry) {
        console.log("ball enter start");
      },
      onEnterEnd(PointGeometry) {
        console.log("ball enter end");
      }
    },
    {
      name: "balance",
      path: new URL("../../THREE/models/examples/balance.obj", import.meta.url)
        .href,
      onLoadComplete(Geometry) {
        Geometry.scale(300, 300, 300);
        Geometry.translate(800, -500, 0);
      }
    },
    {
      name: "turing",
      path: new URL("../../THREE/models/examples/turing8.obj", import.meta.url)
        .href,
      onLoadComplete(Geometry) {
        const s = 8;
        Geometry.scale(s, s, s);
        Geometry.center();
        // Geometry.rotateY(-30);
        Geometry.translate(-600, 0, 0)
      }
    }
  ];
  window.changeModel = (name: string) => {
    if (MainParticle != null) {
      MainParticle.ChangeModel(name);
    }
  };
  const modelList = ['turing', 'monitor', 'atom', 'balance', 'wave']
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
      sound.setVolume(0.25);
    }
  );

  let hasOperate = false;

  window.addEventListener("click", () => {
    if (!hasOperate) {
      sound.play();
      hasOperate = true;
    }
  });

  // windowAddMouseWheel();
  function windowAddMouseWheel() {
    const scrollFunc = function (e: WheelEvent) {
      e = e ?? window.event;
      console.log(e.deltaY);

      if (e.deltaY !== 0) {
        if (e.deltaY > 0) {
          // 当滑轮向上滚动时
          if (i <= 3)
            i++
          else return
        }
        if (e.deltaY < 0) {
          // 当滑轮向下滚动时
          if (i > 0)
            i--
          else return
        }
        window.changeModel(modelList[i]);

      }
    };
    document.onmousewheel = scrollFunc;
  }

  function testInit() {
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
    // console.log(wave);
    wave.attributes.position.needsUpdate = true
    // wave.translate(0, -500, 0)
    // wave.rotateY(-30)
    Models.push({
      name: "wave",
      geometry: wave,
      onEnterStart(PointGeometry) {
        console.log("wave enter start");
        // let vertices = wave.attributes.position.array;
        // let i = 0,
        //   j = 0,
        //   count = 0;
        // for (let ix = 0; ix < 50; ix++) {
        //   for (let iy = 0; iy < 50; iy++) {
        //     vertices[i + 1] =
        //       Math.sin((ix + count) * 0.3) * 50 +
        //       Math.sin((iy + count) * 0.5) * 50;
        //     i += 3;
        //     j++;
        //   }
        //   count += 0.1;
        // }
      },
      onEnterEnd(PointGeometry) {
        // console.log("wave enter end");

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
          console.log(swiper.activeIndex);
          window.changeModel(modelList[swiper.activeIndex]);
        },
      }
    };

    const swiper = new Swiper('.swiper', swiperParams);
  }
  const [active, setActive] = useState(true);


  useEffect(() => {
    swiperInit()
    testInit();
    eventBus.on("message", (text) => {
      setInterval(() => {
        setActive(true);
      }, 2000);
    });
    if (MainParticle == null && wrapper.current != null) {
      MainParticle = new ParticleSystem({
        CanvasWrapper: wrapper.current,
        Models,
        addons: [Atomsphere1, Atomsphere2, Atomsphere3],
        onModelsFinishedLoad: (point) => {
          point.rotation.y = -3.14 * 0.8;
          new Tween.Tween(point.rotation)
            .to({ y: 0 }, 10000)
            .easing(Tween.Easing.Quintic.Out)
            .start();
          setTimeout(() => {
            MainParticle?.ChangeModel("turing", 2000);
          }, 2500);
          MainParticle?.ListenMouseMove();
        }
      });
    }
  });

  return (
    <div className={`${Styles.index_page} ${active ? "" : Styles.hidden} `}>
      <div className={Styles.container}>
        <div className={`swiper ${Styles.test}`}>
          <div className="swiper-wrapper">
            <div className={`swiper-slide ${Styles.t1}`}>文本1</div>
            <div className={`swiper-slide ${Styles.t2}`}>文本2</div>
            <div className={`swiper-slide ${Styles.t3}`}>Those who can imagine anything,<br></br><br></br><br></br>
              can create the impossible.</div>
            <div className={`swiper-slide ${Styles.t4}`}><p>我们分担寒潮、风雷、霹雳<br></br><br></br><br></br>
              我们共享雾霭、流岚、虹霓。</p> </div>
            <div className={`swiper-slide ${Styles.t2}`}>拥有海大的现在<br></br><br></br><br></br>拥抱大海的未来</div>

          </div>
        </div>

      </div>
      <div className={Styles.canvas_wrapper} ref={wrapper}></div>
    </div>
  );
}

export default IndexPage;
