declare module "troika-three-text" {
  import * as THREE from "three";
  
  export class Text extends THREE.Mesh {
    text: string;
    font: string;
    fontSize: number;
    color: THREE.Color | string | number;
    anchorX: string | number;
    anchorY: string | number;
    textAlign: string;
    letterSpacing: number;
    lineHeight: number;
    maxWidth: number;
    whiteSpace: string;
    material: THREE.Material;
    position: THREE.Vector3;
  }
}
