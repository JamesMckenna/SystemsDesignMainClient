
class RobotArm {

    canvas; engine = BABYLON.Engine; scene = BABYLON.Scene;
    //CurrentKeyFrame - used to stop and restart an BABYLON.Animatable from stopped position/keyframe
    //Must be passed as ref - init as object cause js don't like passing primative types as ref
    baseCKF = { keyframe: 0 }; botCKF = { keyframe: 0 }; midCKF = { keyframe: 0 }; topCKF = { keyframe: 0 }; crCKF = { keyframe: 0 }; clawCKF = { keyframe: 0 };
    //Holds the BABYLON.Animatable made by starting a mesh.skeleton's animation
    baseAble = BABYLON.Animatable; botAble = BABYLON.Animatable; midAble = BABYLON.Animatable; opAble = BABYLON.Animatable; crAble = BABYLON.Animatable; clawAble = BABYLON.Animatable;
    //Robot Arm Meshes
    baseMesh = BABYLON.Mesh; nameplate = BABYLON.Mesh; botBase = BABYLON.Mesh; botMesh = BABYLON.Mesh; midMesh = BABYLON.Mesh; topMesh = BABYLON.Mesh; clawRotMesh = BABYLON.Mesh; clawMesh = BABYLON.Mesh;
    //Robot Arm Skeletons
    baseArm = BABYLON.Skeleton; botArm = BABYLON.Skeleton; midArm = BABYLON.Skeleton; topArm = BABYLON.Skeleton; clawRotArm = BABYLON.Skeleton; clawArm = BABYLON.Skeleton;
    //Skeleton bones to parent/child robot arm pieces together 
    baseArmParent = BABYLON.Bone; botArmChild = BABYLON.Bone; botArmParent = BABYLON.Bone; midArmChild = BABYLON.Bone; midArmParent = BABYLON.Bone; topArmChild = BABYLON.Bone; topArmParent = BABYLON.Bone; craChild = BABYLON.Bone; craParent = BABYLON.Bone; clawChild = BABYLON.Bone;

    //UI 
    uiAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture; uiContainer = BABYLON.GUI.Container; topUIPanel = BABYLON.GUI.StackPanel; botUIPanel = BABYLON.GUI.StackPanel; rightUIPanel = BABYLON.GUI.StackPanel; leftUIPanel = BABYLON.GUI.StackPanel;
    uiClawOpen = BABYLON.GUI.Button; uiClawRotCCW = BABYLON.GUI.Button; uiTopUp = BABYLON.GUI.Button; uiMidUp = BABYLON.GUI.Button; uiBotUp = BABYLON.GUI.Button; uiBaseRotCCW = BABYLON.GUI.Button;
    uiClawClose = BABYLON.GUI.Button; uiClawRotCW = BABYLON.GUI.Button; uiTopDown = BABYLON.GUI.Button; uiMidDown = BABYLON.GUI.Button; uiBotDown = BABYLON.GUI.Button; uiBaseRotCW = BABYLON.GUI.Button;
    uiCamZoomIn = BABYLON.GUI.Button; uiCamZoomOut = BABYLON.GUI.Button; uiCamRotLeft = BABYLON.GUI.Button; uiCamRotRight = BABYLON.GUI.Button; uiCamRotOver = BABYLON.GUI.Button; uiCamRotUnder = BABYLON.GUI.Button;

    hdrTexture = BABYLON.CubeTexture;

    //A way to handle sticky keys enabled on user keyboard
    rotbotArmAniStarted = false;

    constructor() {
        
        this.canvas = document.getElementById('render-canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
         
        //Init PBR reflection/refraction/Skybox Texture
        this.hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/robotArm/environment.dds", this.scene);
        this.scene.imageProcessingConfiguration.exposure = 0.6;
        this.scene.imageProcessingConfiguration.contrast = 1.6;
         
        const hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, this.scene);
        const hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", this.scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = this.hdrTexture.clone();
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = true;
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = true;

        // GUI
        this.uiAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        //Main UI Container
        this.uiContainer = new BABYLON.GUI.Container("uiContainer");
        this.uiAdvancedTexture.addControl(this.uiContainer);
        //Top UI Controls Panel
        this.topUIPanel = new BABYLON.GUI.StackPanel("topUIPanel");
		this.topUIPanel.height = "80px";
        this.topUIPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.topUIPanel.isVertical = false;
        this.topUIPanel.paddingTop = 6;
        this.topUIPanel.onPointerEnterObservable.add(() => {
            this.topUIPanel.background = "#fff";
        });
        this.topUIPanel.onPointerOutObservable.add(() => {
            this.topUIPanel.background = "";
        });
        this.uiContainer.addControl(this.topUIPanel);

        //Load Top UI Images 
        this.uiClawOpen = this.CreateUIBtn("uiClawOpen", "/robotArm/100/uiClawOpen.png", this.topUIPanel);
        this.uiClawRotCCW = this.CreateUIBtn("uiClawRotCCW", "/robotArm/100/uiClawRotCCW.png", this.topUIPanel);
        this.uiTopUp = this.CreateUIBtn("uiTopUp", "/robotArm/100/uiTopUp.png", this.topUIPanel);
        this.uiMidUp = this.CreateUIBtn("uiMidUp", "/robotArm/100/uiMidUp.png", this.topUIPanel);
        this.uiBotUp = this.CreateUIBtn("uiBotUp", "/robotArm/100/uiBotUp.png", this.topUIPanel);
        this.uiBaseRotCCW = this.CreateUIBtn("uiBaseRotCCW", "/robotArm/100/uiBaseRotCCW.png", this.topUIPanel);

        //Bottom UI Controls Panel
        this.botUIPanel = new BABYLON.GUI.StackPanel("botUIPanel");
		this.botUIPanel.height = "80px";
        this.botUIPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.botUIPanel.isVertical = false;
        this.botUIPanel.paddingBottom = 6;
        this.botUIPanel.onPointerEnterObservable.add(() => {
            this.botUIPanel.background = "#fff";
        });
        this.botUIPanel.onPointerOutObservable.add(() => {
            this.botUIPanel.background = "";
        });
        this.uiContainer.addControl(this.botUIPanel);

        //Load Bottom UI Images
        this.uiClawClose = this.CreateUIBtn("uiClawClose", "/robotArm/100/uiClawClose.png", this.botUIPanel);
        this.uiClawRotCW = this.CreateUIBtn("uiClawRotCW", "/robotArm/100/uiClawRotCW.png", this.botUIPanel);
        this.uiTopDown = this.CreateUIBtn("uiTopDown", "/robotArm/100/uiTopDown.png", this.botUIPanel);
        this.uiMidDown = this.CreateUIBtn("uiMidDown", "/robotArm/100/uiMidDown.png", this.botUIPanel);
        this.uiBotDown = this.CreateUIBtn("uiBotDown", "/robotArm/100/uiBotDown.png", this.botUIPanel);
        this.uiBaseRotCW = this.CreateUIBtn("uiBaseRotCW", "/robotArm/100/uiBaseRotCW.png", this.botUIPanel);

        //Right UI Buttons Panel
        this.rightUIPanel = new BABYLON.GUI.StackPanel("rightUIPanel");
		this.rightUIPanel.width = "80px";
        this.rightUIPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.rightUIPanel.isVertical = true;
        this.rightUIPanel.paddingRight = 6;
        this.rightUIPanel.onPointerEnterObservable.add(() => {
            this.rightUIPanel.background = "#fff";
        });
        this.rightUIPanel.onPointerOutObservable.add(() => {
            this.rightUIPanel.background = "";
        });
        this.uiContainer.addControl(this.rightUIPanel);

        //Load Right UI Images
        this.uiCamZoomIn = this.CreateUIBtn("uiClawZoomIn", "/robotArm/100/uiCamZoomIn.png", this.rightUIPanel);
        this.uiCamZoomOut = this.CreateUIBtn("uiClawZoomOut", "/robotArm/100/uiCamZoomOut.png", this.rightUIPanel);

        //Left UI Buttons Panel
        this.leftUIPanel = new BABYLON.GUI.StackPanel("leftUIPanel");
		this.leftUIPanel.width= "80px";
        this.leftUIPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.leftUIPanel.isVertical = true;
        this.leftUIPanel.paddingLeft = 6;
        this.leftUIPanel.onPointerEnterObservable.add(() => {
            this.leftUIPanel.background = "#fff";
        });
        this.leftUIPanel.onPointerOutObservable.add(() => {
            this.leftUIPanel.background = "";
        });
        this.uiContainer.addControl(this.leftUIPanel);

        //Load Left Images
        this.uiCamRotOver = this.CreateUIBtn("uiCamRotOver", "/robotArm/100/uiCamRotOver.png", this.leftUIPanel);
        this.uiCamRotRight = this.CreateUIBtn("uiCamRotRight", "/robotArm/100/uiCamRotRight.png", this.leftUIPanel);
        this.uiCamRotLeft = this.CreateUIBtn("uiCamRotLeft", "/robotArm/100/uiCamRotLeft.png", this.leftUIPanel);
        this.uiCamRotUnder = this.CreateUIBtn("uiCamRotUnder", "/robotArm/100/uiCamRotUnder.png", this.leftUIPanel);
        
        
        //Create Scene Camera
        const arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera",1 , 1, 10, new BABYLON.Vector3(0, 12, 0), this.scene);
        arcCamera.setPosition(new BABYLON.Vector3(50, 0, 0));
        arcCamera.lowerRadiusLimit = 6;
        arcCamera.upperRadiusLimit = 50;
        //Clear ArcCamera Defaults
        arcCamera.inputs.clear();
        
        //Assign to scene
        this.scene.activeCamera = arcCamera;
        this.scene.activeCamera.attachControl(this.canvas, false);
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.00000001);

        //Keyboard Hotkeys To Control RobotArm Animations
        this.scene.onKeyboardObservable.add((evt) => {
            //Keydown
            if (this.rotbotArmAniStarted === false && evt.type === 1 && evt.event.altKey === false) {
                this.rotbotArmAniStarted = true;
                switch (evt.event.key) {
                    case "t":
                        this.clawAble = this.HotkeyRobotArmAni(this.uiClawOpen, this.clawCKF, 59, this.clawAble, this.clawArm);
                        break;
                    case "y":
                        this.crAble = this.HotkeyRobotArmAni(this.uiClawRotCCW, this.crCKF, 59, this.crAble, this.clawRotArm);
                        break;
                    case "u":
                        this.topAble = this.HotkeyRobotArmAni(this.uiTopUp, this.topCKF, 59, this.topAble, this.topArm);
                        break;
                    case "i":
                        this.midAble = this.HotkeyRobotArmAni(this.uiMidUp, this.midCKF, 59, this.midAble, this.midArm);
                        break;
                    case "o":
                        this.botAble = this.HotkeyRobotArmAni(this.uiBotUp, this.botCKF, 59, this.botAble, this.botArm);
                        break;
                    case "p":
                        this.baseAble = this.HotkeyRobotArmAni(this.uiBaseRotCCW, this.baseCKF, 59, this.baseAble, this.baseArm);
                        break;
                    case "a":
                        this.MoveCam(this.uiCamRotLeft, arcCamera);
                        this.uiCamRotLeft.height = "70px";
                        this.uiCamRotLeft.width = "70px";
                        this.uiCamRotLeft.thickness = 3;
                        this.uiCamRotLeft.parent.background = "#fff";
                        this.MakeBgBlink(this.uiCamRotLeft);
                        this.uiPopUp(this.uiCamRotLeft);
                        break;
                    case "d":
                        this.MoveCam(this.uiCamRotRight, arcCamera);
                        this.uiCamRotRight.height = "70px";
                        this.uiCamRotRight.width = "70px";
                        this.uiCamRotRight.thickness = 3;
                        this.uiCamRotRight.parent.background = "#fff";
                        this.MakeBgBlink(this.uiCamRotRight);
                        this.uiPopUp(this.uiCamRotRight);
                        break;
                    case "w":
                        this.MoveCam(this.uiCamRotOver, arcCamera);
                        this.uiCamRotOver.height = "70px";
                        this.uiCamRotOver.width = "70px";
                        this.uiCamRotOver.thickness = 3;
                        this.uiCamRotOver.parent.background = "#fff";
                        this.MakeBgBlink(this.uiCamRotOver);
                        this.uiPopUp(this.uiCamRotOver);
                        break;
                    case "s":
                        this.MoveCam(this.uiCamRotUnder, arcCamera);
                        this.uiCamRotUnder.height = "70px";
                        this.uiCamRotUnder.width = "70px";
                        this.uiCamRotUnder.thickness = 3;
                        this.uiCamRotUnder.parent.background = "#fff";
                        this.MakeBgBlink(this.uiCamRotUnder);
                        this.uiPopUp(this.uiCamRotUnder);
                        break;
                    case "alt":
                        return;
                        break;
                    default:
                        return;
                        break;
                }
            }
            //Keydown with Alt
            else if (this.rotbotArmAniStarted === false && evt.type === 1 && evt.event.altKey === true) {
                this.rotbotArmAniStarted = true;
                switch (evt.event.key) {
                    case "t":
                        this.clawAble = this.HotkeyRobotArmAni(this.uiClawClose, this.clawCKF, 0, this.clawAble, this.clawArm);
                        break;
                    case "y":
                        this.crAble = this.HotkeyRobotArmAni(this.uiClawRotCW, this.crCKF, 0, this.crAble, this.clawRotArm);
                        break;
                    case "u":
                        this.topAble = this.HotkeyRobotArmAni(this.uiTopDown, this.topCKF, 0, this.topAble, this.topArm);
                        break;
                    case "i":
                        this.midAble = this.HotkeyRobotArmAni(this.uiMidDown, this.midCKF, 0, this.midAble, this.midArm);
                        break;
                    case "o":
                        this.botAble = this.HotkeyRobotArmAni(this.uiBotDown, this.botCKF, 0, this.botAble, this.botArm);
                        break;
                    case "p":
                        this.baseAble = this.HotkeyRobotArmAni(this.uiBaseRotCW, this.baseCKF, 0, this.baseAble, this.baseArm);
                        break;
                    case "w":
                        this.MoveCam(this.uiCamZoomIn, arcCamera);
                        this.uiCamZoomIn.height = "70px";
                        this.uiCamZoomIn.width = "70px";
                        this.uiCamZoomIn.thickness = 3;
                        this.uiCamZoomIn.parent.background = "#fff";
                        this.MakeBgBlink(this.uiCamZoomIn);
                        this.uiPopUp(this.uiCamZoomIn);
                        break;
                    case "s":
                        this.MoveCam(this.uiCamZoomOut, arcCamera);
                        this.uiCamZoomOut.height = "70px";
                        this.uiCamZoomOut.width = "70px";
                        this.uiCamZoomOut.thickness = 3;
                        this.uiCamZoomOut.parent.background = "#fff";
                        this.MakeBgBlink(this.uiCamZoomOut);
                        this.uiPopUp(this.uiCamZoomOut);
                        break;
                    case "alt":
                        return;
                        break;
                    default:
                        return;
                        break;
                }
            }
            //KeyUp
            else if (this.rotbotArmAniStarted === true && evt.type === 2 && evt.event.altKey === false) {
                this.rotbotArmAniStarted = false;
                switch (evt.event.key) {
                    case "t":
                        this.clawCKF.keyframe = this.HotkeyRobotArmStop(this.uiClawOpen, this.clawCKF, 59, this.clawAble, this.clawArm);
                        break;
                    case "y":
                        this.crCKF.keyframe = this.HotkeyRobotArmStop(this.uiClawRotCCW, this.crCKF, 59, this.crAble, this.clawRotArm);
                        break;
                    case "u":
                        this.topCKF.keyframe = this.HotkeyRobotArmStop(this.uiTopUp, this.topCKF, 59, this.topAble, this.topArm);
                        break;
                    case "i":
                        this.midCKF.keyframe = this.HotkeyRobotArmStop(this.uiMidUp, this.midCKF, 59, this.midAble, this.midArm);
                        break;
                    case "o":
                        this.botCKF.keyframe = this.HotkeyRobotArmStop(this.uiBotUp, this.botCKF, 59, this.botAble, this.botArm);
                        break;
                    case "p":
                        this.baseCKF.keyframe = this.HotkeyRobotArmStop(this.uiBaseRotCCW, this.baseCKF, 59, this.baseAble, this.baseArm);
                        break;
                    case "a":
                        clearInterval(this.moveCam);
                        clearInterval(this.bgBlink);
                        this.uiCamRotLeft.height = "65px";
                        this.uiCamRotLeft.width = "65px";
                        this.uiCamRotLeft.background = "";
                        this.uiCamRotLeft.thickness = 1;
                        this.uiCamRotLeft.parent.background = "";
                        this.uiDestroyPopUp(this.uiCamRotLeft);
                        break;
                    case "d":
                        clearInterval(this.moveCam);
                        clearInterval(this.bgBlink);
                        this.uiCamRotRight.height = "65px";
                        this.uiCamRotRight.width = "65px";
                        this.uiCamRotRight.background = "";
                        this.uiCamRotRight.thickness = 1;
                        this.uiCamRotRight.parent.background = "";
                        this.uiDestroyPopUp(this.uiCamRotRight);
                        break;
                    case "w":
                        clearInterval(this.moveCam);
                        clearInterval(this.bgBlink);
                        this.uiCamRotOver.height = "65px";
                        this.uiCamRotOver.width = "65px";
                        this.uiCamRotOver.background = "";
                        this.uiCamRotOver.thickness = 1;
                        this.uiCamRotOver.parent.background = "";
                        this.uiDestroyPopUp(this.uiCamRotOver);
                        break;
                    case "s":
                        clearInterval(this.moveCam);
                        clearInterval(this.bgBlink);
                        this.uiCamRotUnder.height = "65px";
                        this.uiCamRotUnder.width = "65px";
                        this.uiCamRotUnder.background = "";
                        this.uiCamRotUnder.thickness = 1;
                        this.uiCamRotUnder.parent.background = "";
                        this.uiDestroyPopUp(this.uiCamRotUnder);
                        break;
                    case "alt":
                        return;
                        break;
                    default:
                        return;
                        break;
                }
            }
            //KeyUp with Alt
            else if (this.rotbotArmAniStarted === true && evt.type === 2 && evt.event.altKey === true) {
                this.rotbotArmAniStarted = false;
                switch (evt.event.key) {
                    case "t":
                        this.clawCKF.keyframe = this.HotkeyRobotArmStop(this.uiClawClose, this.clawCKF, 0, this.clawAble, this.clawArm);
                        break;
                    case "y":
                        this.crCKF.keyframe = this.HotkeyRobotArmStop(this.uiClawRotCW, this.crCKF, 0, this.crAble, this.clawRotArm);
                        break;
                    case "u":
                        this.topCKF.keyframe = this.HotkeyRobotArmStop(this.uiTopDown, this.topCKF, 0, this.topAble, this.topArm);
                        break;
                    case "i":
                        this.midCKF.keyframe = this.HotkeyRobotArmStop(this.uiMidDown, this.midCKF, 0, this.midAble, this.midArm);
                        break;
                    case "o":
                        this.botCKF.keyframe = this.HotkeyRobotArmStop(this.uiBotDown, this.botCKF, 0, this.botAble, this.botArm);
                        break;
                    case "p":
                        this.baseCKF.keyframe = this.HotkeyRobotArmStop(this.uiBaseRotCW, this.baseCKF, 0, this.baseAble, this.baseArm);
                        break;
                    case "w":
                        clearInterval(this.moveCam);
                        clearInterval(this.bgBlink);
                        this.uiCamZoomIn.height = "65px";
                        this.uiCamZoomIn.width = "65px";
                        this.uiCamZoomIn.background = "";
                        this.uiCamZoomIn.thickness = 1;
                        this.uiCamZoomIn.parent.background = "";
                        this.uiDestroyPopUp(this.uiCamZoomIn);
                        break;
                    case "s":
                        clearInterval(this.moveCam);
                        clearInterval(this.bgBlink);
                        this.uiCamZoomOut.height = "65px";
                        this.uiCamZoomOut.width = "65px";
                        this.uiCamZoomOut.background = "";
                        this.uiCamZoomOut.thickness = 1;
                        this.uiCamZoomOut.parent.background = "";
                        this.uiDestroyPopUp(this.uiCamZoomOut);
                        break;
                    case "alt":
                        console.log("alt");
                        return;
                        break;
                    default:
                        console.log(evt);
                        return;
                        break;
                }
            }
            else {
                return;
            }
        });

        const assetsManager = new BABYLON.AssetsManager(this.scene);

        const baseTask = assetsManager.addMeshTask("baseMeshTask", "", "/robotArm/", "animations_base.babylon");
        baseTask.onSuccess = (task) => {
            this.baseMesh = task.loadedMeshes[0];
            this.baseArm = task.loadedMeshes[0].skeleton;
            this.baseMesh.material = this.AssignMaterial("base", this.scene, this.hdrTexture);
            this.baseArmParent = this.baseArm.bones[0];
        }
        baseTask.onError = (err) => {
            alert("Sorry, some assests could not be loaded.");
            console.log(err);
        }

        const botTask = assetsManager.addMeshTask("botMeshTask", "", "/robotArm/", "animations_bot.babylon");
        botTask.onSuccess = (task) => {
            this.botMesh = task.loadedMeshes[0];
            this.botArm = task.loadedMeshes[0].skeleton;
            this.botMesh.material = this.AssignMaterial("bot", this.scene, this.hdrTexture);
            this.botArmParent = this.botArm.bones[8];
            this.botArmChild = this.botArm.bones[0];
        }
        botTask.onError = (err) => {
            alert("Sorry, some assests could not be loaded.");
            console.log(err);
        }

        const midTask = assetsManager.addMeshTask("midMeshTask", "", "/robotArm/", "animations_mid.babylon");
        midTask.onSuccess = (task) => {
            this.midMesh = task.loadedMeshes[0];
            this.midArm = task.loadedMeshes[0].skeleton;
            this.midMesh.material = this.AssignMaterial("mid", this.scene, this.hdrTexture);
            this.midArmChild = this.midArm.bones[0];
            this.midArmParent = this.midArm.bones[13];
        }
        midTask.onError = (err) => {
            alert("Sorry, some assests could not be loaded.");
            console.log(err);
        }

        const topTask = assetsManager.addMeshTask("topMeshTask", "", "/robotArm/", "animations_top.babylon");
        topTask.onSuccess = (task) => {
            this.topMesh = task.loadedMeshes[0];
            this.topArm = task.loadedMeshes[0].skeleton;
            this.topMesh.material = this.AssignMaterial("top", this.scene, this.hdrTexture);
            this.topArmChild = this.topArm.bones[0];
            this.topArmParent = this.topArm.bones[2];
        }
        topTask.onError = (err) => {
            alert("Sorry, some assests could not be loaded.");
            console.log(err);
        }

        const clawRotTask = assetsManager.addMeshTask("clawRotMeshTask", "", "/robotArm/", "animations_clawRotate.babylon");
        clawRotTask.onSuccess = (task) => {
            this.clawRotMesh = task.loadedMeshes[0];
            this.clawRotArm = task.loadedMeshes[0].skeleton;
            this.clawRotMesh.material = this.AssignMaterial("clawRotate", this.scene, this.hdrTexture);
            this.craChild = this.clawRotArm.bones[0];
            this.craParent = this.clawRotArm.bones[1];
        }
        clawRotTask.onError = (err) => {
            alert("Sorry, some assests could not be loaded.");
            console.log(err);
        }

        const clawTask = assetsManager.addMeshTask("clawMeshTask", "", "/robotArm/", "animations_claw.babylon");
        clawTask.onSuccess = (task) => {
            this.clawMesh = task.loadedMeshes[0];
            this.clawArm = task.loadedMeshes[0].skeleton;
            this.clawMesh.material = this.AssignMaterial("claw", this.scene, this.hdrTexture);
            this.clawChild = this.clawArm.bones[0];
        }
        clawTask.onError = (err) => {
            alert("Sorry, some assests could not be loaded.");
            console.log(err);
        }
        
        this.scene.registerBeforeRender(() => {
            this.ParentSkeletonToSkeleton(this.baseArmParent, this.baseMesh, this.botArmChild);
            this.ParentSkeletonToSkeleton(this.botArmParent, this.botMesh, this.midArmChild);
            this.ParentSkeletonToSkeleton(this.midArmParent, this.midMesh, this.topArmChild);
            this.ParentSkeletonToSkeleton(this.topArmParent, this.topMesh, this.craChild);
            this.ParentSkeletonToSkeleton(this.craParent, this.clawRotMesh, this.clawChild);
        });

        assetsManager.load();

        assetsManager.onFinish = (tasks) => {
            //Attach Top UI Btn to Armature Animations
            this.uiClawOpen = this.AttachRobUIObservables(this.uiClawOpen, this.clawCKF, 59, this.clawAble, this.clawArm);
            this.uiClawRotCCW = this.AttachRobUIObservables(this.uiClawRotCCW, this.crCKF, 59, this.crAble, this.clawRotArm);
            this.uiTopUp = this.AttachRobUIObservables(this.uiTopUp, this.topCKF, 59, this.topAble, this.topArm);
            this.uiMidUp = this.AttachRobUIObservables(this.uiMidUp, this.midCKF, 59, this.midAble, this.midArm);
            this.uiBotUp = this.AttachRobUIObservables(this.uiBotUp, this.botCKF, 59, this.botAble, this.botArm);
            this.uiBaseRotCCW = this.AttachRobUIObservables(this.uiBaseRotCCW, this.baseCKF, 59, this.baseAble, this.baseArm);

            //Attach Bot UI Btn to Armature Animations
            this.uiClawClose = this.AttachRobUIObservables(this.uiClawClose, this.clawCKF, 0, this.clawAble, this.clawArm);
            this.uiClawRotCW = this.AttachRobUIObservables(this.uiClawRotCW, this.crCKF, 0, this.crAble, this.clawRotArm);
            this.uiTopDown = this.AttachRobUIObservables(this.uiTopDown, this.topCKF, 0, this.topAble, this.topArm);
            this.uiMidDown = this.AttachRobUIObservables(this.uiMidDown, this.midCKF, 0, this.midAble, this.midArm);
            this.uiBotDown = this.AttachRobUIObservables(this.uiBotDown, this.botCKF, 0, this.botAble, this.botArm);
            this.uiBaseRotCW = this.AttachRobUIObservables(this.uiBaseRotCW, this.baseCKF, 0, this.baseAble, this.baseArm);

            //Attach UI Btn to Camera
            this.uiCamRotOver = this.AttachCamUIObservables(this.uiCamRotOver, arcCamera);
            this.uiCamRotLeft = this.AttachCamUIObservables(this.uiCamRotLeft, arcCamera);
            this.uiCamRotRight = this.AttachCamUIObservables(this.uiCamRotRight, arcCamera);
            this.uiCamRotUnder = this.AttachCamUIObservables(this.uiCamRotUnder, arcCamera);
            this.uiCamZoomIn = this.AttachCamUIObservables(this.uiCamZoomIn, arcCamera);
            this.uiCamZoomOut = this.AttachCamUIObservables(this.uiCamZoomOut, arcCamera);

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
			
			//this.scene.debugLayer.show();
        };
        
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
    
    AssignMaterial = (mat, scene, hdrTexture) => {
        const newMat = new BABYLON.PBRMaterial('"' + mat + 'Mat"', scene);
        newMat.cameraExposure = .75;
        newMat.cameraContrast = 1.5;
        newMat.metallic = .10;
        newMat.roughness = 1;
        newMat.albedoTexture = new BABYLON.Texture("/robotArm/textures/" + mat + "_albedo.png", scene);
        newMat.metallicTexture = new BABYLON.Texture("/robotArm/textures/" + mat + "_metallic.png", scene);
        newMat.bumpTexture = new BABYLON.Texture("/robotArm/textures/" + mat + "_normal.png", scene);

        newMat.invertNormalMapX = true;
        newMat.invertNormalMapY = true
        newMat.reflectionTexture = hdrTexture;
        newMat.enableSpecularAntiAliasing = true;
        newMat.forceIrradianceInFragment = true;
        newMat.useRoughnessFromMetallicTextureGreen = true;
        newMat.useMetallnessFromMetallicTextureBlue = true;
        newMat.useRoughnessFromMetallicTextureAlpha = false;
        newMat.useAmbientOcclusionFromMetallicTextureRed = false;
        newMat.useAutoMicroSurfaceFromReflectivityMap = false;
        newMat.useLightmapAsShadowmap = false;
        newMat.useMicroSurfaceFromReflectivityMapAlpha = false;
        newMat.useParallax = false;
        newMat.useParallaxOcclusion = true;
        newMat.usePhysicalLightFalloff = true;
        newMat.microSurface = .1;
        newMat.environmentIntensity = 1;
        newMat.directIntensity = 2;
        newMat.parallaxScaleBias = .1;
        return newMat;
    }
    
    ParentSkeletonToSkeleton = (parentBone, parentMesh, childBone) => {
        const newRot = parentBone.getRotation(BABYLON.Space.WORLD, parentMesh);
        const newPos = parentBone.getPosition(BABYLON.Space.WORLD, parentMesh);
        childBone.setRotation(newRot);
        childBone.setPosition(newPos);
    }


    //RobotArm Hotkey Start Ani
    HotkeyRobotArmAni = (uiBtn, CKF, toKeyframe, able, arm) => {
        if (CKF.keyframe != toKeyframe) {
            able = this.scene.beginAnimation(arm, CKF.keyframe, toKeyframe, false, 0.25, () => { clearInterval(this.bgBlink); uiBtn.background = ""; });
            uiBtn.height = "70px";
            uiBtn.width = "70px";
            this.MakeBgBlink(uiBtn);
            uiBtn.parent.background = "#fff";
            this.uiPopUp(uiBtn);
        }
        return able;
    }

    //RobotArm Hotkey Stop Ani
    HotkeyRobotArmStop = (uiBtn, CKF, toKeyframe, able, arm) => {
        if (able != undefined) {
            CKF.keyframe = Math.round(able.getAnimations()[0].currentFrame);
            able.stop();
            clearInterval(this.bgBlink);
            uiBtn.height = "65px";
            uiBtn.width = "65px";
            uiBtn.background = "";
            uiBtn.thickness = 1;
            able.animationStarted = false;
            uiBtn.parent.background = "";
            this.uiDestroyPopUp(uiBtn);
        }
        return CKF.keyframe;
    }

    //UI button blink when active
    bgBlink;
    MakeBgBlink = (imgBtn) => {
        this.bgBlink = setInterval(() => {
            if (imgBtn.background === "") {
                imgBtn.background = "#00FF00";
            } else {
                imgBtn.background = "";
            }
        }, 150);
    }

    CreateUIBtn = (name, imgRoute, uiPanel) => {
        let imgBtn = BABYLON.GUI.Button.CreateImageWithCenterTextButton(name, "", imgRoute);
        imgBtn.width = "65px";
        imgBtn.height = "65px";
        imgBtn.paddingBottom = 4;
        imgBtn.paddingTop = 4;
        imgBtn.paddingRight = 4;
        imgBtn.paddingLeft = 4;
        imgBtn.color = "#696986";
        imgBtn.cornerRadius = 3;
        imgBtn.thickness = 1;
        imgBtn.background = "";
        uiPanel.addControl(imgBtn);
        return imgBtn;
    }

    //Used to start and stop mesh.skeleton animations
    AttachRobUIObservables = (uiBtn, CKF, toKeyframe, able, arm) => {
        uiBtn.onPointerDownObservable.add(() => {
            if (CKF.keyframe != toKeyframe) {
                able = this.scene.beginAnimation(arm, CKF.keyframe, toKeyframe, false, 0.25, () => { clearInterval(this.bgBlink); uiBtn.background = ""; });
                uiBtn.height = "70px";
                uiBtn.width = "70px";
                uiBtn.thickness = 3;
                this.MakeBgBlink(uiBtn);//need to change here to make blink red when ani stops
            }
        });
        uiBtn.onPointerUpObservable.add(() => {
            if (able != undefined) {
                CKF.keyframe = Math.round(able.getAnimations()[0].currentFrame);
                able.stop();
                clearInterval(this.bgBlink);
                uiBtn.background = "";
                uiBtn.thickness = 1;
            }
        });
        uiBtn.onPointerEnterObservable.add(() => {
            uiBtn.height = "70px";
            uiBtn.width = "70px";
            uiBtn.thickness = 3;
            this.uiPopUp(uiBtn);
        });
        uiBtn.onPointerOutObservable.add(() => {
            uiBtn.thickness = 1;
            uiBtn.height = "65px";
            uiBtn.width = "65px";
            this.uiDestroyPopUp(uiBtn);
        });
        return uiBtn;
    }

    //UI Buttons Used to Increment Camera Zoom & Rotate OnClick (Not Hotkeys)
    moveCam;
    MoveCam = (imgBtn, cam) => {
        this.moveCam = setInterval(() => {
            if (imgBtn.name === "uiClawZoomIn") {
                cam.inertialRadiusOffset += 0.05;
            }
            if (imgBtn.name === "uiClawZoomOut") {
                cam.inertialRadiusOffset -= 0.05;
            }
            if (imgBtn.name === "uiCamRotOver") {
                cam.beta -= .05;
            }
            if (imgBtn.name === "uiCamRotRight") {
                cam.alpha += .05;
            }
            if (imgBtn.name === "uiCamRotLeft") {
                cam.alpha -= .05;
            }
            if (imgBtn.name === "uiCamRotUnder") {
                cam.beta += .05;
            }
        }, 30);
    }

    //Camera Zoom Foreward and Back 
    AttachCamUIObservables = (uiBtn, arcCamera) => {
        uiBtn.onPointerDownObservable.add(() => {
            this.MoveCam(uiBtn, arcCamera);
            uiBtn.height = "70px";
            uiBtn.width = "70px";
            uiBtn.thickness = 3;
            this.MakeBgBlink(uiBtn);
        });
        uiBtn.onPointerUpObservable.add(() => {
            clearInterval(this.moveCam);
            clearInterval(this.bgBlink);
            uiBtn.background = "";
            uiBtn.thickness = 1;
        });
        uiBtn.onPointerEnterObservable.add(() => {
            uiBtn.height = "70px";
            uiBtn.width = "70px";
            uiBtn.thickness = 3;
            this.uiPopUp(uiBtn);
        });
        uiBtn.onPointerOutObservable.add(() => {
            uiBtn.height = "65px";
            uiBtn.width = "65px";
            uiBtn.thickness = 1;
            this.uiDestroyPopUp(uiBtn);
        });
        return uiBtn;
    }
    //Show keyboard UI hotkeys
    uiPopUp = (uiBtn) => {
        let hotkeyMsg = "";
        let top;
        let left;
        let hAlign;
        let vAlign;
        switch (uiBtn.name) {
            case "uiCamRotOver":
                hotkeyMsg = "Hotkey = W";
                top = -115;
                left = 70;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiCamRotUnder":
                hotkeyMsg = "Hotkey = S";
                top = 81;
                left = 70;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiCamRotRight":
                hotkeyMsg = "Hotkey = D";
                top = -50;
                left = 70;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiCamRotLeft":
                hotkeyMsg = "Hotkey = A";
                top = 16;
                left = 70;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiClawZoomIn":
                hotkeyMsg = "Hotkey = Alt + W";
                top = -50;
                left = -70;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiClawZoomOut":
                hotkeyMsg = "Hotkey = Alt + S";
                top = 16;
                left = -70;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiClawOpen":
                hotkeyMsg = "Hotkey = T";
                top = 70;
                left = -165;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiClawClose":
                hotkeyMsg = "Hotkey = Alt + T";
                top = -70;
                left = -165;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiClawRotCCW":
                hotkeyMsg = "Hotkey = Y";
                top = 70;
                left = -100;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiClawRotCW":
                hotkeyMsg = "Hotkey = Alt + Y";
                top = -70;
                left = -100;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiTopUp":
                hotkeyMsg = "Hotkey = U";
                top = 70;
                left = -36;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiTopDown":
                hotkeyMsg = "Hotkey = Alt + U";
                top = -70;
                left = -36;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiMidUp":
                hotkeyMsg = "Hotkey = I";
                top = 70;
                left = 36;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiMidDown":
                hotkeyMsg = "Hotkey = Alt + I";
                top = -70;
                left = 36;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiBotUp":
                hotkeyMsg = "Hotkey = O";
                top = 70;
                left = 100;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiBotDown":
                hotkeyMsg = "Hotkey = Alt + O";
                top = -70;
                left = 100;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiBaseRotCCW":
                hotkeyMsg = "Hotkey = P";
                top = 70;
                left = 168;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            case "uiBaseRotCW":
                hotkeyMsg = "Hotkey = Alt + P";
                top = -70;
                left = 168;
                hAlign = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                vAlign = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                this.uiCreatePopUp(hotkeyMsg, uiBtn, top, left, hAlign, vAlign);
                break;
            default:
                console.log("not sure " + uiBtn.name);
                break;
        }
    }
    uiDestroyPopUp = (uiBtn) => {
        let popUpName = uiBtn.name + "PopUp";
        let remove;
        switch (uiBtn.name) {
            case "uiCamRotOver":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiCamRotUnder":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiCamRotRight":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiCamRotLeft":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiClawZoomIn":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiClawZoomOut":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiClawOpen":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiClawClose":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiClawRotCCW":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiClawRotCW":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiTopUp":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiTopDown":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiMidUp":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiMidDown":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiBotUp":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiBotDown":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiBaseRotCCW":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            case "uiBaseRotCW":
                if (this.uiContainer.getChildByName(popUpName)) {
                    remove = this.uiContainer.getChildByName(popUpName);
                    remove.dispose();
                } 
                break;
            default:
                console.log("not sure " + uiBtn.name);
                break;
        }
    }
    //Create UI Hotkey Popup
    uiCreatePopUp = (popUpText, uiBtn, top, left, hAlign, vAlign) => {
        let btnName = uiBtn.name + "PopUp";
        let popUp = BABYLON.GUI.Button.CreateSimpleButton(btnName, popUpText);
        popUp.color = "#000";
        popUp.width = "136px";
        popUp.height = "36px";
        popUp.paddingRight = 4;
        popUp.paddingLeft = 4;
        popUp.paddingTop = 4;
        popUp.paddingBottom = 4;
        popUp.color = "#696986";
        popUp.cornerRadius = 3;
        popUp.thickness = 1;
        popUp.background = "#fff";
        popUp.fontSize = "16px";
        popUp.horizontalAlignment = hAlign;
        popUp.verticalAlignment = vAlign;
        popUp.left = left;
        popUp.top = top;
        this.uiContainer.addControl(popUp);
    }
}
var robotarm = new RobotArm();
