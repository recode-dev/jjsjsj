/**
 * overlays/fps.js
 *
 * FPS/framerate overlay and frame-rate controller.
 *
 * Symbols: t32, ai, ni, FpsOverlay, FrameRateController
 * Source: bundle lines 14868-15144 (6 statements)
 */


class t32 {
  static maxFpsOffset;
  static segmentFpsOffsets;
  constructor() {
    this.instance = globalThis.offsets.FramerateManager_instance;
    this.framePacingHooksInstalled = false;
    this.framePacingCallbacks = [];
    this.originalFPSGetters = [];
    return;
  }
  static {
    this.maxFpsOffset = 0;
    this.segmentFpsOffsets = [8, 16, 24, 32];
  }
  get maxFPS() {
    return this.instance.add(t32.maxFpsOffset).readDouble();
  }
  set maxFPS(e) {
    this.instance.add(t32.maxFpsOffset).writeDouble(e);
    return;
  }
  getSegmentFPS(e) {
    const i = t32.segmentFpsOffsets[e - 1];
    if (i === undefined) {
      return null;
    }
    return this.instance.add(i).readDouble();
  }
  setSegmentFPS(e, i) {
    const s = t32.segmentFpsOffsets[e - 1];
    return s !== undefined && (this.instance.add(s).writeDouble(i), true);
  }
  setMaxFPS(maxFPS) {
    this.maxFPS = maxFPS;
    for (let index = 1; index <= t32.segmentFpsOffsets.length; index++) {
      this.setSegmentFPS(index, maxFPS);
    }
    return;
  }
  setSegment(t) {
    globalThis.natives.FramerateManager_setSegment(this.instance, t);
    return;
  }
  installFramePacingHooks(t, e) {
    if (!this.framePacingHooksInstalled) {
      Interceptor.attach(globalThis.offsets.FramerateManager_frameHook, {
        onEnter: () => {
          if (e()) {
            globalThis.offsets.FramerateManager_frameDelay.writeU64(0);
          }
          return;
        },
      });
      for (const e2 of [
        globalThis.offsets.FramerateManager_fpsGetter1,
        globalThis.offsets.FramerateManager_fpsGetter2,
      ]) {
        const record = {
          call: null,
        };
        const nativeCallback = new NativeCallback(
          () => {
            const e = t();
            if (e == null) {
              return record.call();
            }
            return e;
          },
          "double",
          [],
        );
        const replaceFastResult = Interceptor.replaceFast(e2, nativeCallback);
        record.call = new NativeFunction(replaceFastResult, "double", []);
        this.originalFPSGetters.push(record);
        this.framePacingCallbacks.push(nativeCallback);
      }
      this.framePacingHooksInstalled = true;
    }
    return;
  }
}

var ai = t32;

var ni = ai;

class FpsOverlay {
  constructor() {
    this.state = false;
    this.showMaxFPS = false;
    this.rainbow = false;
    this.frames = 0;
    this.value = 0;
    this.frameRateManager = new ni();
    this.lastUpdate = Date.now();
    this.movieClip = null;
    this.textField = null;
    return;
  }
  toggle() {
    this.state = !this.state;
    return;
  }
  update() {
    ++this.frames;
    const lastUpdate = Date.now();
    const difference = lastUpdate - this.lastUpdate;
    if (difference >= 1000) {
      this.value = Math.round((1000 * this.frames) / difference);
      this.frames = 0;
      this.lastUpdate = lastUpdate;
    }
    if (!this.textField) {
      this.movieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_text");
      this.textField = this.movieClip.getTextFieldByName("Text");
      this.textField.setXY(10, 10);
      ii.addChild(this.textField);
    }
    this.textField.visible = this.state;
    if (!this.state) {
      return;
    }
    let colorTransform;
    if (this.rainbow) {
      const remainder = (Date.now() / 20) % 360;
      const e2 = 255;
      const product = e2 * (1 - Math.abs(((remainder / 60) % 2) - 1));
      const floorResult = Math.floor(remainder / 60);
      const items = [
        [e2, product, 0],
        [product, e2, 0],
        [0, e2, product],
        [0, product, e2],
        [product, 0, e2],
        [e2, 0, product],
      ];
      let [r, o, l] = items[floorResult];
      colorTransform = {
        r: Math.round(r),
        g: Math.round(o),
        b: Math.round(l),
      };
    } else {
      const {
        frameRateManager: { maxFPS: maxFPS },
      } = this;
      const e3 = maxFPS >= 9999 ? 1000 : Math.max(1, maxFPS);
      const maxResult = Math.max(0, Math.min(1, this.value / e3));
      colorTransform = {
        r: Math.round(255 * (1 - maxResult)),
        g: Math.round(255 * maxResult),
        b: 0,
      };
    }
    this.textField.colorTransform = colorTransform;
    const s3 = this.showMaxFPS ? this.frameRateManager.maxFPS : null;
    const a2 = s3 === null ? "" : "/".concat(s3 >= 9999 ? "∞" : Math.round(s3));
    this.textField.text = "FPS: ".concat(this.value, a2);
    return;
  }
}

var FrameRateController = class t33 {
  constructor() {
    t33.instance = this;
    this.state = false;
    this.limit = 120;
    this.frameRateManager = new ni();
    this.normalFPS = null;
    this.lastSegment = 2;
    this.eglSwapInterval = null;
    this.segmentHookInstalled = false;
    this.swapBuffersHookInstalled = false;
    return;
  }
  installHooks() {
    if (!this.segmentHookInstalled) {
      Interceptor.attach(globalThis.offsets.FramerateManager_setSegment, {
        onEnter(e) {
          t33.instance.lastSegment = e[1].toInt32();
          if (t33.instance.state) {
            e[1] = ptr(2);
          }
          return;
        },
        onLeave() {
          t33.instance.applyFPS();
          return;
        },
      });
      this.segmentHookInstalled = true;
    }
    this.frameRateManager.installFramePacingHooks(
      () => {
        if (this.state) {
          if (this.limit >= 1000) {
            return 9999;
          }
          return this.limit;
        }
        return null;
      },
      () => this.state && this.limit >= 1000,
    );
    if (!this.swapBuffersHookInstalled) {
      const globalExportByName = Module.findGlobalExportByName("eglSwapInterval");
      const globalExportByName2 = Module.findGlobalExportByName("eglSwapBuffers");
      if (!globalExportByName || !globalExportByName2) {
        return;
      }
      this.eglSwapInterval = new NativeFunction(globalExportByName, "int", ["pointer", "int"]);
      Interceptor.attach(globalExportByName2, {
        onEnter(e) {
          t33.instance.updateSwapInterval(e[0]);
          return;
        },
      });
      this.swapBuffersHookInstalled = true;
    }
    return;
  }
  updateSwapInterval(t) {
    if (!this.eglSwapInterval) {
      return;
    }
    const lastSwapInterval = this.state ? 0 : 1;
    if (this.state) {
      this.applyFPS();
    }
    if (
      lastSwapInterval !== this.lastSwapInterval &&
      this.eglSwapInterval(t, lastSwapInterval) === 1
    ) {
      this.lastSwapInterval = lastSwapInterval;
    }
    return;
  }
  applyFPS() {
    if (this.state) {
      if (this.normalFPS === null) {
        this.normalFPS = this.frameRateManager.maxFPS;
      }
      this.frameRateManager.setMaxFPS(this.limit >= 1000 ? 9999 : this.limit);
      return;
    }
    if (this.normalFPS !== null) {
      this.frameRateManager.setMaxFPS(this.normalFPS);
    }
    return;
  }
  update() {
    this.installHooks();
    if (this.state) {
      if (this.normalFPS === null) {
        this.normalFPS = this.frameRateManager.maxFPS;
      }
      this.frameRateManager.setSegment(3);
      this.applyFPS();
      return;
    }
    if (this.normalFPS !== null) {
      this.frameRateManager.setSegment(this.lastSegment ?? 2);
      this.frameRateManager.setMaxFPS(this.normalFPS);
      this.normalFPS = null;
    }
    return;
  }
  toggle() {
    this.state = !this.state;
    this.update();
    return this.state;
  }
  static get instance() {
    return this._instance;
  }
  static set instance(_instance) {
    this._instance = _instance;
    return;
  }
};

FrameRateController._instance = null;
