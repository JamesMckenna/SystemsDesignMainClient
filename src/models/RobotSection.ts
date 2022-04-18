import { Mesh } from "babylonjs/Meshes/mesh";
import { Animatable } from "babylonjs/Animations/animatable";
import { Skeleton, Bone, PBRMaterial } from "babylonjs";

export default interface RobotSection {
  keyframe?: number;
  animatable?: Animatable;
  mesh?: Mesh;
  rig?: Skeleton;
  material?: PBRMaterial;
  childBone?: Bone;
  parentBone?: Bone;
}
