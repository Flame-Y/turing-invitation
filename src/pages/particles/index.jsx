import React, { useEffect } from "react";
import "./index.scss";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader'

import Tween from "@tweenjs/tween.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

import g from '../../images/gradient.png'

class ThreeDWorld {
  constructor(canvasContainer) {
    // canvas容器
    this.container = canvasContainer || document.body;
    // 模型列表
    this.modelList = []
    // 创建场景
    this.createScene();
    // 创建灯光
    // this.createLights();
    // 性能监控插件
    this.initStats();
    // 物体添加
    this.addObjs();
    // 效果器
    this.createEffect()
    // 轨道控制插件（鼠标拖拽视角、缩放等）
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.autoRotate = true;
    // 阻尼器，让场景移动时具有缓动效果
    // this.orbitControls.enableDamping = true
    // 循环更新渲染场景
    this.update();
  }
  createScene() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    // 创建场景
    this.scene = new THREE.Scene();
    // 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
    this.scene.fog = new THREE.Fog(0x05050c, 1, 600);
    // 创建相机
    let aspectRatio = this.WIDTH / this.HEIGHT;
    let fieldOfView = 60;
    let nearPlane = 1;
    let farPlane = 10000;
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
    this.camera.position.x = 0;
    this.camera.position.z = 150;
    this.camera.position.y = 0;
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      // 在 css 中设置背景色透明显示渐变色
      alpha: true,
      // 开启抗锯齿
      antialias: true,
    });
    // 自动清理，解决 bloomPass 效果器冲突
    this.renderer.autoClear = false
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
  createLights() {
    // 户外光源
    // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    // 环境光源
    this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.2);

    // 方向光是从一个特定的方向的照射
    // 类似太阳，即所有光源是平行的
    // 第一个参数是关系颜色，第二个参数是光源强度
    this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    // 设置光源的位置方向
    this.shadowLight.position.set(50, 50, 50);

    // 开启光源投影
    this.shadowLight.castShadow = true;

    // 定义可见域的投射阴影
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;

    // 为了使这些光源呈现效果，需要将它们添加到场景中
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
    this.scene.add(this.ambientLight);
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
  // 物体添加 核心函数
  addObjs() {
    const loader = new OBJLoader();
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
    for (let i = 0; i < 8000; i++) {
      const x = THREE.MathUtils.randFloatSpread(350);
      const y = THREE.MathUtils.randFloatSpread(350);
      const z = THREE.MathUtils.randFloatSpread(350);
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
    loader.load(require("../../models/static/turing.obj"), (obj) => {
      // 最终模型
      const finalGeometry = new THREE.BufferGeometry()
      let finalVertices = new Float32Array([])
      // 模型合并
      for (const i of obj.children) {
        const arr = i.geometry.attributes.position.array
        finalVertices = new Float32Array([...finalVertices, ...arr])
        // pointGeometry.scale(800, 800, 800)
        // const Point = new THREE.Points(pointGeometry, pointMaterial)
        // this.scene.add(Point)
      }
      finalGeometry.setAttribute('position', new THREE.BufferAttribute(finalVertices, 3))
      const finalPoints = new THREE.Points(finalGeometry, pointMaterial)
      // this.scene.add(finalPoints)

      const startPositions = geometry.getAttribute("position");
      const destPosition = finalGeometry.getAttribute("position");

      for (let i = 0; i < startPositions.count; i++) {
        const tween = new Tween.Tween(startPositions.array);
        const cur = i % destPosition.count;
        tween.to(
          {
            [i * 3]: destPosition.array[cur * 3],
            [i * 3 + 1]: destPosition.array[cur * 3 + 1],
            [i * 3 + 2]: destPosition.array[cur * 3 + 2],
          },
          2000
        );
        tween.easing(Tween.Easing.Exponential.In);
        tween.delay(2000 * Math.random());

        tween.start();

        tween.onUpdate(() => {
          startPositions.needsUpdate = true;
        });
      }
    });
  }
  // 效果器
  createEffect() {
    this.composer = new EffectComposer(this.renderer)
    const renderPass = new RenderPass(this.scene, this.camera)
    const bloomPass = new BloomPass(0.75)
    const filmPass = new FilmPass(0.5, 0.5, 1500, false)
    const shaderPass = new ShaderPass(FocusShader)
    shaderPass.uniforms.screenWidth.value = window.innerWidth;
    shaderPass.uniforms.screenHeight.value = window.innerHeight;
    shaderPass.renderToScreen = true

    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
    this.composer.addPass(filmPass)
    this.composer.addPass(shaderPass)
  }
  // 循环更新渲染
  update() {
    // 动画插件
    Tween.update();
    // 性能监测插件
    this.stats.update();
    // this.orbitControls.update()
    // 渲染器执行渲染
    // this.renderer.render(this.scene, this.camera);
    // 效果器执行渲染，如果不需要效果器请使用上方的渲染模式
    this.composer.render(this.scene, this.camera);
    // this.scene.rotation.y += 0.005;
    // 循环调用
    requestAnimationFrame(() => {
      this.update();
    });
  }
}

const Particles = () => {
  useEffect(() => {
    const onLoad = () => {
      console.log(2);
      new ThreeDWorld(document.getElementById("world"));
      console.log(1);
    };
    onLoad();
  }, []);

  return <div id="world"></div>;
};
export default Particles;
