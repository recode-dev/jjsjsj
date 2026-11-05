/**
 * ui/camera.js
 *
 * Camera and camera-shake controllers.
 *
 * Symbols: CameraShakeController, CameraController
 * Source: bundle lines 15577-20502 (2 statements)
 */


class CameraShakeController {
  constructor() {
    this.enable = false;
    Interceptor.replace(
      globalThis.offsets.RenderSystem_getShakeX,
      new NativeCallback(
        (t) => {
          if (this.enable) {
            return 0;
          }
          return new NativeFunction(globalThis.offsets.RenderSystem_getShakeX, "float", [
            "pointer",
          ])(t);
        },
        "float",
        ["pointer"],
      ),
    );
    Interceptor.replace(
      globalThis.offsets.RenderSystem_getShakeY,
      new NativeCallback(
        (t) => {
          if (this.enable) {
            return 0;
          }
          return new NativeFunction(globalThis.offsets.RenderSystem_getShakeY, "float", [
            "pointer",
          ])(t);
        },
        "float",
        ["pointer"],
      ),
    );
    return;
  }
  toggle() {
    this.enable = !this.enable;
    return;
  }
}

class CameraController {
  constructor() {
    this.mode = "default";
    this.modes = ["zoom", "dezoom", "fp3d", "cam3d", "default"];
    Interceptor.attach(globalThis.offsets.BattleScreen_updateCameraParameters, {
      onEnter(e) {
        const i = e[0];
        switch (this.mode) {
          case "zoom":
            i.add(2348).writeS32(0);
            i.add(2512).writeFloat(1.5);
            loadEmbeddedNativeModule.mode;
            return;
          case "dezoom":
            i.add(2348).writeS32(0);
            i.add(2512).writeFloat(0.5);
            loadEmbeddedNativeModule.mode;
            return;
          case "fp3d":
            i.add(2348).writeS32(3);
            i.add(2512).writeFloat(2.1000000000000001);
            loadEmbeddedNativeModule.mode;
            return;
          case "cam3d":
            i.add(2348).writeS32(3);
            loadEmbeddedNativeModule.mode;
            return;
          default:
            i.add(2348).writeS32(0);
            loadEmbeddedNativeModule.mode;
            return;
        }
      },
    });
    return;
  }
}
