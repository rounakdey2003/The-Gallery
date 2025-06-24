import Commons from "./Commons";
import * as THREE from "three";

import fragmentShader from "../../shaders/text/text.frag";
import vertexShader from "../../shaders/text/text.vert";

import { Text } from "troika-three-text";

import { inView, animate } from "motion";

interface Props {
  scene: THREE.Scene;
  element: HTMLElement;
}
export default class WebGLText {
  private commons: Commons;

  private scene: THREE.Scene;
  private element: HTMLElement;

  private computedStyle: CSSStyleDeclaration;
  private font!: string;
  private bounds!: DOMRect;
  private color!: THREE.Color;
  private material!: THREE.ShaderMaterial;
  private mesh!: Text;

  
  private weightToFontMap: Record<string, string> = {
    "900": "/fonts/Humane-Black.ttf",
    "800": "/fonts/Humane-ExtraBold.ttf",
    "700": "/fonts/Humane-Bold.ttf",
    "600": "/fonts/Humane-SemiBold.ttf",
    "500": "/fonts/Humane-Medium.ttf",
    "400": "/fonts/Humane-Regular.ttf",
    "300": "/fonts/Humane-Light.ttf",
    "200": "/fonts/Humane-ExtraLight.ttf",
    "100": "/fonts/Humane-Thin.ttf",
  };

  private y: number = 0;

  private isVisible: boolean = false;

  constructor({ scene, element }: Props) {
    this.commons = Commons.getInstance();

    this.scene = scene;
    this.element = element;

    this.computedStyle = window.getComputedStyle(this.element);

    this.createFont();
    this.createColor();
    this.createBounds();
    this.createMaterial();
    this.createMesh();
    this.setStaticValues();

    this.scene.add(this.mesh);

    this.element.style.color = "transparent";

    this.addEventListeners();
  }

  private createFont() {
    this.font =
      this.weightToFontMap[this.computedStyle.fontWeight] ||
      "/fonts/Humane-Regular.ttf";
  }

  private createBounds() {
    this.bounds = this.element.getBoundingClientRect();
    this.y = this.bounds.top + this.commons.lenis.actualScroll;
  }

  private createColor() {
    this.color = new THREE.Color(this.computedStyle.color);
  }

  private createMaterial() {
    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uProgress: new THREE.Uniform(0),
        uHeight: new THREE.Uniform(this.bounds.height),
        uColor: new THREE.Uniform(this.color),
      },
    });
  }

  private createMesh() {
    this.mesh = new Text();

    this.mesh.text = this.element.innerText;
    this.mesh.font = this.font;

    this.mesh.anchorX = "0%";
    this.mesh.anchorY = "50%";

    this.mesh.material = this.material;
  }

  private setStaticValues() {
    const { fontSize, letterSpacing, lineHeight, whiteSpace, textAlign } =
      this.computedStyle;

    const fontSizeNum = window.parseFloat(fontSize);

    this.mesh.fontSize = fontSizeNum;

    this.mesh.textAlign = textAlign;

    
    this.mesh.letterSpacing = parseFloat(letterSpacing) / fontSizeNum;

    
    this.mesh.lineHeight = parseFloat(lineHeight) / fontSizeNum;

    
    this.mesh.maxWidth = this.bounds.width;

    this.mesh.whiteSpace = whiteSpace;
  }

  show() {
    this.isVisible = true;

    animate(
      this.material.uniforms.uProgress,
      { value: 1 },
      { duration: 1.8, ease: [0.25, 1, 0.5, 1] }
    );
  }

  hide() {
    animate(
      this.material.uniforms.uProgress,
      { value: 0 },
      { duration: 1.8, onComplete: () => (this.isVisible = false) }
    );
  }

  onResize() {
    this.computedStyle = window.getComputedStyle(this.element);
    this.createBounds();
    this.setStaticValues();
    this.material.uniforms.uHeight.value = this.bounds.height;
  }

  update() {
    if (this.isVisible) {
      this.mesh.position.y =
        -this.y +
        this.commons.lenis.animatedScroll +
        this.commons.sizes.screen.height / 2 -
        this.bounds.height / 2;

      this.mesh.position.x =
        this.bounds.left - this.commons.sizes.screen.width / 2;
    }
  }

  private addEventListeners() {
    inView(this.element, () => {
      this.show();

      return () => this.hide();
    });
  }
}
