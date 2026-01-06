// Ambient module declarations for three.js examples
// This file provides type declarations for three.js example modules
// that are not part of the official @types/three package

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, MOUSE, Vector3 } from 'three';
  import { EventDispatcher } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement);
    autoRotate: boolean;
    autoRotateSpeed: number;
    dampingFactor: number;
    enableDamping: boolean;
    enablePan: boolean;
    enableRotate: boolean;
    enableZoom: boolean;
    maxDistance: number;
    minDistance: number;
    maxPolarAngle: number;
    minPolarAngle: number;
    maxZoom: number;
    minZoom: number;
    mouseButtons: any;
    position0: Vector3;
    target0: Vector3;
    target: Vector3;
    touches: any;
    zoom0: number;
    zoomSpeed: number;

    dispose(): void;
    getAutoRotateAngle(): number;
    getDistance(): number;
    getPolarAngle(): number;
    getAzimuthalAngle(): number;
    reset(): void;
    rotateLeft(angle?: number): void;
    rotateUp(angle?: number): void;
    saveState(): void;
    update(): void;
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager } from 'three';

  export interface GLTF {
    animations: any[];
    scene: any;
    scenes: any[];
    cameras: any[];
    asset: any;
    parser: any;
    userData: any;
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF>;
    setDRACOLoader(dracoLoader: any): this;
    setKTX2Loader(ktx2Loader: any): this;
  }
}

declare module 'three/examples/jsm/postprocessing/EffectComposer' {
  import { WebGLRenderer, WebGLRenderTarget } from 'three';
  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    render(deltaTime?: number): void;
    setSize(width: number, height: number): void;
    reset(renderTarget?: WebGLRenderTarget): void;
    addPass(pass: any): void;
    insertPass(pass: any, index: number): void;
    removePass(pass: any): void;
    getPass(): any;
    renderToScreen: boolean;
    readBuffer: WebGLRenderTarget;
    writeBuffer: WebGLRenderTarget;
  }
}

declare module 'three/examples/jsm/postprocessing/RenderPass' {
  import { Scene, Camera, Material, WebGLRenderTarget } from 'three';
  export class RenderPass {
    constructor(scene: Scene, camera: Camera, overrideMaterial?: Material, clearColor?: number, clearAlpha?: number);
    render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    setSize(width: number, height: number): void;
    clear: boolean;
    clearDepth: boolean;
    needsSwap: boolean;
  }
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass' {
  import { Vector2, Color } from 'three';
  export class UnrealBloomPass {
    constructor(resolution: Vector2, strength: number, radius: number, threshold: number);
    render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    setSize(width: number, height: number): void;
    strength: number;
    radius: number;
    threshold: number;
    clearColor: Color;
    renderTargetsHorizontal: WebGLRenderTarget[];
    renderTargetsVertical: WebGLRenderTarget[];
    nMips: number;
    renderTargetBright: WebGLRenderTarget;
    highPassUniforms: any;
    materialHighPassFilter: any;
    separableBlurMaterials: any[];
    compositeMaterial: any;
    bloomTintColors: Color[];
  }
}

declare module 'three/examples/jsm/postprocessing/SMAAPass' {
  export class SMAAPass {
    constructor(width: number, height: number);
    render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    setSize(width: number, height: number): void;
  }
}

declare module 'three/examples/jsm/loaders/RGBELoader' {
  import { DataTexture, Loader, LoadingManager } from 'three';
  export class RGBELoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (texture: DataTexture) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DataTexture>;
    setDataType(type: any): this;
    parse(data: ArrayBuffer): DataTexture;
  }
}

// Missing module declarations for external dependencies
declare module 'react-force-graph-3d' {
  import { Component } from 'react';

  interface ForceGraph3DProps {
    graphData: {
      nodes: Array<{ id: string; [key: string]: any }>;
      links: Array<{ source: string; target: string; [key: string]: any }>;
    };
    [key: string]: any;
  }

  export const ForceGraph3D: Component<ForceGraph3DProps>;
}

declare module 'vis-network/peer/esm/vis-network' {
  export class Network {
    constructor(container: HTMLElement, data: any, options: any);
    destroy(): void;
    setData(data: any): void;
    setOptions(options: any): void;
    [key: string]: any;
  }
}

declare module 'react-icons/fi' {
  export const FiFilter: any;
  export const FiTrendingUp: any;
  export const FiUsers: any;
  export const FiPackage: any;
  export const FiShoppingBag: any;
  export const FiStar: any;
  export const FiAlertCircle: any;
  export const FiCheck: any;
  export const FiX: any;
  export const FiRefreshCw: any;
  export const FiSettings: any;
  export const FiEye: any;
  export const FiShare2: any;
  export const FiDownload: any;
  export const FiCopy: any;
  export const FiSearch: any;
  export const FiGrid: any;
  export const FiList: any;
  export const FiBarChart2: any;
  export const FiPieChart: any;
  export const FiActivity: any;
  export const FiTarget: any;
  export const FiLayers: any;
  export const FiHeart: any;
  export const FiShoppingCart: any;
  export const FiClock: any;
  export const FiDollarSign: any;
  export const FiPercent: any;
  export const FiArrowUp: any;
  export const FiArrowDown: any;
  export const FiMinus: any;
  export const FiMaximize2: any;
  export const FiMinimize2: any;
}

declare module 'react-icons/md' {
  export const MdColorLens: any;
  export const MdTexture: any;
  export const MdStyle: any;
  export const MdAccessTime: any;
  export const MdTrendingUp: any;
  export const MdTrendingDown: any;
  export const MdWhatshot: any;
  export const MdNewReleases: any;
  export const MdLocalOffer: any;
  export const MdInventory: any;
  export const MdAssessment: any;
  export const MdAnalytics: any;
  export const MdDashboard: any;
  export const MdCompare: any;
  export const MdAutoGraph: any;
  export const MdInsights: any;
  export const MdPrecisionManufacturing: any;
  export const MdPalette: any;
  export const MdCategory: any;
  export const MdFilterAlt: any;
  export const MdSort: any;
  export const MdGroupWork: any;
  export const MdLabel: any;
}

declare module 'react-icons/tb' {
  export const TbColorSwatch: any;
  export const TbAdjustmentsHorizontal: any;
  export const TbChartLine: any;
  export const TbChartBar: any;
  export const TbChartPie: any;
  export const TbChartArea: any;
  export const TbChartDots: any;
  export const TbChartArcs: any;
  export const TbChartBubble: any;
  export const TbGraph: any;
  export const TbNetwork: any;
  export const TbTopologyFullHierarchy: any;
}
