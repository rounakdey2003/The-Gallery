import Commons from "./classes/Commons";
import * as THREE from "three";

class App {
  private commons!: Commons;
  private postProcessing!: any;
  private liquidCursor!: any;

  private scene!: THREE.Scene;

  private texts!: Array<any>;

  constructor() {
    document.addEventListener("DOMContentLoaded", async () => {
      await document.fonts.ready;
      document.body.classList.remove("loading");

      this.commons = Commons.getInstance();
      this.commons.init();

      this.createScene();

      await this.initializeComponents();

      this.addEventListeners();
      this.update();
    });
  }

  private async initializeComponents() {
    try {
      this.updateLoadingProgress(0, "Loading cursor...");
      
      const { default: LiquidCursor } = await import("./classes/LiquidCursor");
      this.liquidCursor = new LiquidCursor();
      this.updateLoadingProgress(33, "Loading text renderer...");

      await this.createWebGLTexts();
      this.updateLoadingProgress(66, "Loading post-processing...");

      await this.createPostProcessing();
      this.updateLoadingProgress(100, "Ready!");

      setTimeout(() => {
        this.hideLoadingProgress();
      }, 500);
    } catch (error) {
      console.error("Error loading components:", error);
      this.hideLoadingProgress();
    }
  }

  private updateLoadingProgress(percentage: number, message: string) {
    console.log(`Loading: ${percentage}% - ${message}`);
  }

  private hideLoadingProgress() {
    console.log("All components loaded successfully!");
  }

  private createScene() {
    this.scene = new THREE.Scene();
  }

  private async createWebGLTexts() {
    const texts = document.querySelectorAll('[data-animation="webgl-text"]');

    if (texts) {
      const { default: WebGLText } = await import("./classes/WebGLText");
      
      this.texts = Array.from(texts).map(
        (el) =>
          new WebGLText({
            element: el as HTMLElement,
            scene: this.scene,
          })
      );
    }
  }

  private async createPostProcessing() {
    const { default: PostProcessing } = await import("./classes/PostProcessing");
    this.postProcessing = new PostProcessing({ scene: this.scene });
  }

  private update() {
    this.commons.update();

    if (this.texts) {
      this.texts.forEach((el) => el.update());
    }

    

    this.postProcessing.update();

    window.requestAnimationFrame(this.update.bind(this));
  }

  private onResize() {
    this.commons.onResize();

    if (this.texts) {
      this.texts.forEach((el) => el.onResize());
    }

    this.postProcessing.onResize();
  }

  private addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  public destroy() {
    if (this.liquidCursor) {
      this.liquidCursor.destroy();
    }
  }
}

export default new App();
