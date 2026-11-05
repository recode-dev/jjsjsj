/**
 * core/bootstrap.js
 *
 * Wires offsets, natives, pointers and utils into globalThis (bootstrap of the runtime).
 *
 * Symbols: vt, t47
 * Source: bundle lines 2380-20228 (3 statements)
 */


function vt(libg) {
  const record = {
    libg: libg,
    offsets: gt(libg),
    natives: pt(libg),
    pointers: mt(),
    utils: yt(),
  };
  globalThis.libg = libg;
  globalThis.offsets = record.offsets;
  globalThis.natives = record.natives;
  globalThis.pointers = record.pointers;
  globalThis.utils = record.utils;
  return record;
}

class t47 {
  static updateObjects;
  static tasks;
  static customUpdateRateEnabled;
  static customUpdateRate;
  constructor() {
    return;
  }
  static {
    this.updateObjects = new Set();
    this.tasks = [];
    this.customUpdateRateEnabled = false;
    this.customUpdateRate = 1 / 60;
  }
  static addTask(e) {
    t47.tasks.push(e);
    return;
  }
  static loadAsset(t) {
    return new NativeFunction(globalThis.offsets.GameMain_loadAsset, "bool", ["pointer", "int"])(
      t.toScString(),
      0,
    );
  }
  static get isShouldReloadGame() {
    return globalThis.offsets.GameMain_instance.readPointer().add(257).readU8() === 1;
  }
  static reloadGame() {
    return new NativeFunction(globalThis.offsets.GameMain_reloadGame, "pointer", ["pointer"])(
      globalThis.offsets.GameMain_instance.readPointer(),
    );
  }
  static clearAllUpdateObjectsExceptMods() {
    t47.updateObjects.forEach((t, e, i) => {
      if (t !== _a) {
        i.delete(t);
      }
      return;
    });
    return;
  }
  static patch() {
    Interceptor.attach(globalThis.offsets.GameMain_update, {
      onEnter(e) {
        const shiftResult = t47.tasks.shift();
        if (shiftResult && typeof shiftResult == "function") {
          shiftResult();
        }
        t47.updateObjects.forEach((t) => {
          t.update(this.context.s1);
          return;
        });
        if (t47.customUpdateRateEnabled) {
          this.context.s1 = t47.customUpdateRate;
        }
        if (t47.isShouldReloadGame && vs.isStarted) {
          Kt.reset();
          t47.clearAllUpdateObjectsExceptMods();
          vs.instance.destroyGUI();
          vs.instance.shouldRestartGui = true;
        }
        return;
      },
    });
    return;
  }
}

ws = t47;
