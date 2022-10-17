import React, { useEffect, useState } from "react";
import "./index.scss";
import eventBus from "../../util/event";

import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FocusShader } from "three/examples/jsm/shaders/FocusShader";

import Tween from "@tweenjs/tween.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

import g from "../../images/gradient.png";

const _MODEL_PATH_ = [
  require("../../models/static/turing4.obj"),
  require("../../models/static/banana.obj"),
];
class ThreeDWorld {
  constructor(canvasContainer) {
    // canvas容器
    this.container = canvasContainer || document.body;
    // 创建场景
    this.createScene();
    // 性能监控插件
    this.initStats();
    // 物体添加
    this.addObjs();
    // 效果器
    this.createEffect();
    // 轨道控制插件（鼠标拖拽视角、缩放等）
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.autoRotate = true;
    // 循环更新渲染场景
    this.update();
  }
  createScene() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    // 创建场景
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x05050c, 0.001);
    // 创建相机
    let aspectRatio = this.WIDTH / this.HEIGHT;
    let fieldOfView = 60;
    let nearPlane = 0.1;
    let farPlane = 1000;
    /**
     * PerspectiveCamera 透视相机
     * @param fieldOfView 视角
     * @param aspectRatio 纵横比
     * @param nearPlane 近平面
     * @param farPlane 远平面
     */
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    // 设置相机的位置
    const axesHelper = new THREE.AxesHelper(50);
    this.scene.add(axesHelper);
    this.camera.position.x = -150;
    this.camera.position.y = 0;
    this.camera.position.z = 90;
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      // 在 css 中设置背景色透明显示渐变色
      alpha: true,
      // 开启抗锯齿
      antialias: true,
    });
    // 自动清理，解决 bloomPass 效果器冲突
    this.renderer.autoClear = false;
    // 渲染背景颜色同雾化的颜色
    this.renderer.setClearColor(this.scene.fog.color);
    // 定义渲染器的尺寸；在这里它会填满整个屏幕
    this.renderer.setSize(this.WIDTH, this.HEIGHT);

    // 打开渲染器的阴影地图
    this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMapSoft = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // 在 HTML 创建的容器中添加渲染器的 DOM 元素
    this.container.appendChild(this.renderer.domElement);
    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener(
      "resize",
      this.handleWindowResize.bind(this),
      false
    );
  }
  // 窗口大小变动时调用
  handleWindowResize() {
    // 更新渲染器的高度和宽度以及相机的纵横比
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }
  initStats() {
    this.stats = new Stats();
    // 将性能监控屏区显示在左上角
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.bottom = "0px";
    this.stats.domElement.style.top = "0px";
    this.stats.domElement.style.zIndex = 100;
    this.container.appendChild(this.stats.domElement);
  }
  // 读取模型函数
  loader(arr) {
    let objLoader = new OBJLoader();
    let promiseArr = arr.map((path) => {
      return new Promise(function (resolve) {
        objLoader.load(path, (object) => {
          resolve(object);
        });
      });
    });
    return Promise.all(promiseArr);
  }
  // 物体添加 核心函数
  addObjs() {
    // const loader = new OBJLoader();
    let pointMaterial = new THREE.PointsMaterial({
      // 粒子颜色
      color: 0xffffff,
      //粒子大小
      size: 1,
      //false:粒子尺寸相同 ;true：取决于摄像头远近
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      map: new THREE.TextureLoader().load(g),
    });
    const vertices = [];
    for (let i = 0; i < 30000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      vertices.push(x, y, z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const points = new THREE.Points(geometry, pointMaterial);
    this.scene.add(points);
    // 读取模型
    this.loader(_MODEL_PATH_).then((obj) => {
      const a = obj[0].children[0].geometry;
      const b = obj[1].children[0].geometry;
      // console.log(a);\
      // 创建粒子系统
      let particleSystem = new THREE.Points(a, pointMaterial);
      // 加入场景
      this.scene.add(particleSystem);
      a.scale(1.2, 1.2, 1.2);
      a.center();
      a.translate(30, 0, -100);
      this.addPartices(a, points.geometry);
    });
  }
  toBufferGeometry(geometry) {
    if (geometry.type === "BufferGeometry") return geometry;
    return new THREE.BufferGeometry.fromGeometry(geometry);
  }

  createEffect() {
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    const bloomPass = new BloomPass(0.75);
    const filmPass = new FilmPass(0.5, 0.5, 1500, false);
    const shaderPass = new ShaderPass(FocusShader);
    shaderPass.uniforms.screenWidth.value = window.innerWidth;
    shaderPass.uniforms.screenHeight.value = window.innerHeight;
    shaderPass.renderToScreen = true;

    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);
    this.composer.addPass(filmPass);
    // this.composer.addPass(shaderPass);
  }
  addPartices(obj1, obj2) {
    obj1 = this.toBufferGeometry(obj1);
    obj2 = this.toBufferGeometry(obj2);
    let moreObj = obj1;
    let lessObj = obj2;
    // 找到顶点数量较多的模型
    if (
      obj2.attributes.position.array.length >
      obj1.attributes.position.array.length
    ) {
      [moreObj, lessObj] = [lessObj, moreObj];
    }
    let morePos = moreObj.attributes.position.array;
    let lessPos = lessObj.attributes.position.array;
    let moreLen = morePos.length;
    let lessLen = lessPos.length;
    // 根据最大的顶点数开辟数组空间，同于存放顶点较少的模型顶点数据
    let position2 = new Float32Array(moreLen);
    // 先把顶点较少的模型顶点坐标放进数组
    position2.set(lessPos);
    // 剩余空间重复赋值
    for (let i = lessLen, j = 0; i < moreLen; i++, j++) {
      j %= lessLen;
      position2[i] = lessPos[j];
      position2[i + 1] = lessPos[j + 1];
      position2[i + 2] = lessPos[j + 2];
    }
    let sizes = new Float32Array(moreLen);
    for (let i = 0; i < moreLen; i++) {
      sizes[i] = 4;
    }
    // 挂载属性值
    moreObj.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    moreObj.setAttribute("position2", new THREE.BufferAttribute(position2, 3));
    // 传递给shader共享的的属性值

    let uniforms = {
      val: {
        value: 1.0,
      },
      // 顶点颜色
      color: {
        type: "v3",
        value: new THREE.Color(0xffffff),
      },
      // 传递顶点贴图
      texture: {
        // value: new THREE.TextureLoader().load(g),
        // value: this.getTexture(),
      },
    };

    // 着色器材料
    let shaderMaterial = new THREE.ShaderMaterial({
      // 传递给shader的属性
      uniforms: uniforms,
      // 获取顶点着色器代码
      vertexShader: document.getElementById("vertexshader").textContent,
      // 获取片元着色器代码
      fragmentShader: document.getElementById("fragmentshader").textContent,
      // 渲染粒子时的融合模式
      blending: THREE.AdditiveBlending,
      // 关闭深度测试
      depthTest: false,
      // 开启透明度
      transparent: true,
    });
    let pointMaterial = new THREE.PointsMaterial({
      // 粒子颜色
      color: 0xffffff,
      //粒子大小
      size: 1,
      //false:粒子尺寸相同 ;true：取决于摄像头远近
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      map: new THREE.TextureLoader().load(g),
    });
    // 创建粒子系统
    console.log(shaderMaterial);
    let particleSystem = new THREE.Points(moreObj, shaderMaterial);
    let pos = {
      val: 1,
    };
    // 粒子动画
    let tween = new Tween.Tween(pos)
      .to(
        {
          val: 0,
        },
        1500
      )
      .easing(Tween.Easing.Quadratic.InOut)
      .delay(3000)
      .onUpdate(updateCallback);
    let tweenBack = new Tween.Tween(pos)
      .to(
        {
          val: 1,
        },
        1500
      )
      .easing(Tween.Easing.Quadratic.InOut)
      .delay(3000)
      .onUpdate(updateCallback);
    tween.chain(tweenBack);
    tweenBack.chain(tween);
    tween.start();
    // 动画持续更新的回调函数
    function updateCallback() {
      particleSystem.material.uniforms.val.value = pos.val;
    }
    this.scene.add(particleSystem);
    this.particleSystem = particleSystem;
  }
  getTexture(canvasSize = 64) {
    let canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.background = "transparent";
    let context = canvas.getContext("2d");
    let gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 8,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "transparent");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      0,
      Math.PI * 2,
      true
    );
    context.fill();
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  // 循环更新渲染
  update() {
    // 动画插件
    Tween.update();
    // 性能监测插件
    this.stats.update();
    if (this.particleSystem) {
      let bufferObj = this.particleSystem.geometry;
      // this.particleSystem.rotation.y += 0.005;
      bufferObj.attributes.size.needsUpdate = true;
    }
    // 渲染器执行渲染
    // this.renderer.render(this.scene, this.camera);
    // 效果器执行渲染，如果不需要效果器请使用上方的渲染模式
    this.composer.render(this.scene, this.camera);
    // this.scene.rotation.y += 0.001;
    // 循环调用
    requestAnimationFrame(() => {
      this.update();
    });
  }
}

const Particles = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    eventBus.on("message", (text) => {
      console.log(text);
      setInterval(() => {
        setActive(true);
      }, 2000);
    });
    const onLoad = () => {
      new ThreeDWorld(document.getElementById("world"));
    };
    onLoad();
  }, []);

  return (
    <div>
      <div className="fatherBox">
        <div className="imgBox">
          <img
            className="miniLogo"
            src={require("../../images/TR_logo.png")}
            alt=""
          />
        </div>
      </div>

      <div id="world"></div>
    </div>
  );
};
export default Particles;
