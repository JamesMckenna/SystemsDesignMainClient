/* eslint-disable no-unused-vars */
<template>
  <div class="body-container">
    <h2>3D in a Web Browser</h2>
    <canvas id="render-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import RobotSection from "@/models/RobotSection";
import {
  Engine,
  Scene,
  Color4,
  CubeTexture,
  Mesh,
  PBRMaterial,
  Texture,
  AssetsManager,
  ArcRotateCamera,
  Vector3,
  MeshAssetTask,
  Skeleton,
  Bone,
  Space,
} from "babylonjs";
let canvas: HTMLCanvasElement;
let engine: Engine;
let scene: Scene;
let hdrTexture: CubeTexture;
const baseSection: RobotSection = {};
const botSection: RobotSection = {};
const midSection: RobotSection = {};
const topSection: RobotSection = {};
const clawRotateSection: RobotSection = {};
const clawSection: RobotSection = {};
//#region onMounted
onMounted(async () => {
  canvas = document.getElementById("render-canvas")! as HTMLCanvasElement;

  //#region scene setup
  engine = new Engine(canvas);
  scene = new Scene(engine);
  hdrTexture = CubeTexture.CreateFromPrefilteredData(
    "./robotArm/environment.dds",
    scene
  );
  scene.imageProcessingConfiguration.exposure = 0.6;
  scene.imageProcessingConfiguration.contrast = 1.6;
  scene.activeCamera = buildCamera(scene);
  scene.activeCamera.attachControl(canvas, false);
  scene.clearColor = new Color4(0, 0, 0, 0.00000001);
  buildHDRSkybox(scene, hdrTexture);
  //#endregion

  //#region load robot assets
  await loadRobotSection(scene, "animations_base.babylon")
    .then((section): void => {
      buildRobotSection(
        section,
        baseSection,
        "base",
        hdrTexture,
        undefined,
        "00_Base"
      );
    })
    .catch((err) => console.error(err));

  await loadRobotSection(scene, "animations_bot.babylon")
    .then((section): void => {
      buildRobotSection(
        section,
        botSection,
        "bot",
        hdrTexture,
        "0_base",
        "1_bottom"
      );
    })
    .catch((err) => console.error(err));

  await loadRobotSection(scene, "animations_mid.babylon")
    .then((section): void => {
      buildRobotSection(
        section,
        midSection,
        "mid",
        hdrTexture,
        "1_bottom_Child",
        "2_mid"
      );
    })
    .catch((err) => console.error(err));

  await loadRobotSection(scene, "animations_top.babylon")
    .then((section): void => {
      buildRobotSection(
        section,
        topSection,
        "top",
        hdrTexture,
        "2_mid",
        "3_top"
      );
    })
    .catch((err) => console.error(err));

  await loadRobotSection(scene, "animations_clawRotate.babylon")
    .then((section): void => {
      buildRobotSection(
        section,
        clawRotateSection,
        "clawRotate",
        hdrTexture,
        "3_top_toParent",
        "3_top_rotate"
      );
    })
    .catch((err) => console.error(err));

  await loadRobotSection(scene, "animations_claw.babylon")
    .then((section): void => {
      buildRobotSection(
        section,
        clawSection,
        "claw",
        hdrTexture,
        "3_top_rotate_child"
      );
    })
    .catch((err) => console.error(err));
  //#endregion

  //#region parent robot section armature to another
  scene.registerBeforeRender(() => {
    parentSkeletonToSkeleton(
      baseSection.parentBone!,
      baseSection.mesh!,
      botSection.childBone!
    );
    parentSkeletonToSkeleton(
      botSection.parentBone!,
      botSection.mesh!,
      midSection.childBone!
    );
    parentSkeletonToSkeleton(
      midSection.parentBone!,
      midSection.mesh!,
      topSection.childBone!
    );
    parentSkeletonToSkeleton(
      topSection.parentBone!,
      topSection.mesh!,
      clawRotateSection.childBone!
    );
    parentSkeletonToSkeleton(
      clawRotateSection.parentBone!,
      clawRotateSection.mesh!,
      clawSection.childBone!
    );
  });
  //#endregion

  //#region utils
  scene.debugLayer.show();

  engine.runRenderLoop((): void => {
    scene.render();
  });

  window.addEventListener("resize", (): void => {
    engine!.resize();
  });
  //#endregion
});
//#endregion

const buildCamera = (scene: Scene): ArcRotateCamera => {
  const output = new ArcRotateCamera(
    "arcRotateCamera",
    1,
    1,
    10,
    new Vector3(0, 12, 0),
    scene
  );
  output.setPosition(new Vector3(50, 0, 0));
  output.lowerRadiusLimit = 6;
  output.upperRadiusLimit = 50;
  output.inputs.clear();
  return output;
};

//#region skybox
const buildHDRSkybox = (scene: Scene, hdrTexture: CubeTexture): void => {
  const skybox = Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
  const hdrSkyboxMaterial = buildHDRSkyboxMaterial(scene, hdrTexture);
  skybox.material = hdrSkyboxMaterial;
  skybox.infiniteDistance = true;
};
const buildHDRSkyboxMaterial = (
  scene: Scene,
  hdrTexture: CubeTexture
): PBRMaterial => {
  const output = new PBRMaterial("skybox", scene);
  output.backFaceCulling = false;
  output.reflectionTexture = hdrTexture.clone();
  output.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  output.microSurface = 1.0;
  output.disableLighting = true;
  return output;
};
//#endregion

// #region load meshes assign materials
const loadRobotSection = async (
  scene: Scene,
  babylonFileName: string
): Promise<MeshAssetTask> => {
  return new Promise((resolve, reject) => {
    const assetMgr = new AssetsManager(scene);
    const loader = assetMgr.addMeshTask(
      "loadMeshTask",
      "",
      "./robotArm/",
      babylonFileName
    );
    loader.onSuccess = (task) => {
      return resolve(task);
    };
    loader.onError = (task) => {
      return reject(task);
    };
    assetMgr.load();
  });
};

const buildRobotSection = async (
  task: MeshAssetTask,
  section: RobotSection,
  materialName: string,
  hdrTexture: CubeTexture,
  childBoneName?: string,
  parentBoneName?: string
): Promise<void> => {
  section.keyframe = 0;
  section.animatable = undefined;
  section.mesh = task.loadedMeshes[0] as Mesh;
  section.mesh.material = await assignMaterial(materialName, scene, hdrTexture);
  section.rig = task.loadedMeshes[0].skeleton as Skeleton;
  childBoneName != null
    ? (section.childBone = await findChildBone(task, childBoneName))
    : undefined;
  parentBoneName != null
    ? (section.parentBone = await findParentBone(task, parentBoneName))
    : undefined;
};

const findChildBone = async (
  meshAssetTask: MeshAssetTask,
  childBoneName: string
): Promise<Bone> => {
  const bones = meshAssetTask.loadedSkeletons[0].bones;
  let output = {} as Bone;
  bones.forEach((bone) => {
    if (bone.name === childBoneName) {
      output = bone;
      return output;
    }
  });
  return output;
};

const findParentBone = async (
  meshAssetTask: MeshAssetTask,
  parentBoneName: string
): Promise<Bone> => {
  const bones = meshAssetTask.loadedSkeletons[0].bones;
  let output = {} as Bone;
  bones.forEach((bone) => {
    if (bone.name === parentBoneName) {
      output = bone;
      return output;
    }
  });
  return output;
};

const assignMaterial = async (
  robotSectionName: string,
  scene: Scene,
  hdrTexture: CubeTexture
): Promise<PBRMaterial> => {
  const output = new PBRMaterial(`${robotSectionName}Mat`, scene);
  output.cameraExposure = 0.75;
  output.cameraContrast = 1.5;
  output.metallic = 0.1;
  output.roughness = 1;
  output.albedoTexture = new Texture(
    `robotArm/textures/${robotSectionName}_albedo.png`,
    scene
  );
  output.metallicTexture = new Texture(
    `robotArm/textures/${robotSectionName}_metallic.png`,
    scene
  );
  output.bumpTexture = new Texture(
    `robotArm/textures/${robotSectionName}_normal.png`,
    scene
  );
  output.invertNormalMapX = true;
  output.invertNormalMapY = true;
  output.reflectionTexture = hdrTexture;
  output.enableSpecularAntiAliasing = true;
  output.forceIrradianceInFragment = true;
  output.useRoughnessFromMetallicTextureGreen = true;
  output.useMetallnessFromMetallicTextureBlue = true;
  output.useRoughnessFromMetallicTextureAlpha = false;
  output.useAmbientOcclusionFromMetallicTextureRed = false;
  output.useAutoMicroSurfaceFromReflectivityMap = false;
  output.useLightmapAsShadowmap = false;
  output.useMicroSurfaceFromReflectivityMapAlpha = false;
  output.useParallax = false;
  output.useParallaxOcclusion = true;
  output.usePhysicalLightFalloff = true;
  output.microSurface = 0.1;
  output.environmentIntensity = 1;
  output.directIntensity = 2;
  output.parallaxScaleBias = 0.1;
  return output;
};
//#endregion

// eslint-disable-next-line no-unused-vars
const parentSkeletonToSkeleton = (
  parentBone: Bone,
  parentMesh: Mesh,
  childBone: Bone
): void => {
  console.log(`pSTS ${parentBone}`);
  console.log(`pSTS ${parentMesh}`);
  console.log(`pSTS ${childBone}`);
  const newRot = parentBone.getRotation(Space.WORLD, parentMesh);
  const newPos = parentBone.getPosition(Space.WORLD, parentMesh);
  childBone.setRotation(newRot);
  childBone.setPosition(newPos);
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
.body-container {
  margin-top: 6rem;
  width: 100%;
}
</style>
