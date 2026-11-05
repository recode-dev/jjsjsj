/**
 * app/entry.js
 *
 * Agent entry point: grabs libg.so and boots the runtime.
 *
 * Symbols: La, t68, Lr, Rr, t69, Er, t70, Or, Ur
 * Source: bundle lines 29112-31049 (10 statements)
 */


var La = class t65 {
  constructor() {
    return;
  }
  static getScidGuiContainer() {
    return new Mi(this.instance.add(40).readPointer());
  }
  static getMainMovieClip() {
    return new we(this.instance.add(32).readPointer());
  }
  static patch() {
    Interceptor.attach(globalThis.offsets.LoginState_enter, {
      onEnter(t) {
        this.instance = t[0];
        return;
      },
      onLeave() {
        if (re.forceLoginState) {
          const scidGuiContainer = t65.getScidGuiContainer();
          scidGuiContainer.show();
          scidGuiContainer.forEachChild((t) => t.hide());
          this.launchGameButton = new ui();
          this.launchGameButton.movieClip = ti.getMovieClip("sc/ui.sc", "country_item");
          this.launchGameButton.show();
          this.launchGameButton.movieClip.show();
          this.launchGameButton.movieClip.gotoAndStopFrameIndex(0);
          this.launchGameButton.pos = {
            y: si.screenHeight / 2 - this.launchGameButton.height,
          };
          this.launchGameButton.text = new _t("Launch Game");
          this.launchGameButton.buttonListener = new pi(async () => {
            scidGuiContainer.removeChild(this.launchGameButton);
            const childByName = t65.getMainMovieClip().getChildByName("loading_bar");
            childByName.show();
            childByName.getTextFieldByName("text").text = new _t("Downloading assets...");
            childByName.getChildByName("progress_bar").hide();
            await AssetManagerAlias.init();
            re.forceLoginState = false;
            re.changeState(re.states.INIT);
            re.changeToState();
            return;
          });
          scidGuiContainer.addChild(this.launchGameButton);
        }
        return;
      },
    });
    return;
  }
};

class t68 {
  static #Oe;
  static #Ue;
  static #je;
  static #Ge;
  static #Ve;
  constructor() {
    return;
  }
  static {
    this.#Oe = 3393490183;
    this.#Ue = 4074231077;
    this.#je = undefined;
    this.#Ge = false;
    this.#Ve = null;
  }
  static get value() {
    return globalThis.natives.EccDigest_getResult() >>> 0;
  }
  static get hex() {
    return "0x".concat(this.value.toString(16).padStart(8, "0").toUpperCase());
  }
  static get expected() {
    if (this.#je === undefined) {
      this.#je = t68.#He();
    }
    return this.#je;
  }
  static get installed() {
    return this.#Ge;
  }
  #He() {
    const arch = Process.arch;
    if (arch === "arm64") {
      return this.#Oe;
    }
    if (arch === "arm") {
      return this.#Ue;
    }
    return;
  }
  static patch(expected = t68.expected) {
    if (!this.#Ge) {
      this.#je = expected >>> 0;
      globalThis.offsets.EccDigest_integrityResult.writeU32(this.#je);
      this.#Ve = new NativeCallback(() => t68.#je, "uint32", []);
      Interceptor.replace(globalThis.offsets.EccDigest_getResult, this.#Ve);
      this.#Ge = true;
    }
    return this;
  }
  static uninstall() {
    if (this.#Ge) {
      Interceptor.revert(globalThis.offsets.EccDigest_getResult);
      this.#Ve = null;
      this.#Ge = false;
      return this;
    }
    return this;
  }
  static setExpected(t) {
    this.#je = t >>> 0;
    globalThis.offsets.EccDigest_integrityResult.writeU32(this.#je);
    return this;
  }
}

var Lr = t68;

var Rr = Lr;

class t69 {
  static patched;
  constructor() {
    return;
  }
  static {
    this.patched = false;
  }
  static patch() {
    if (!t69.patched) {
      t69.patched = true;
      Interceptor.attach(globalThis.offsets.Signature_verify, {
        onLeave(t) {
          t.replace(3);
          return;
        },
      });
    }
    return;
  }
}

var Er = t69;

class t70 {
  static #Ye;
  static #Ge;
  static #We;
  static #ze;
  constructor() {
    return;
  }
  static {
    this.#Ye = undefined;
    this.#Ge = false;
    this.#We = null;
    this.#ze = undefined;
  }
  static get installed() {
    return this.#Ge;
  }
  static get forced() {
    return this.#Ye;
  }
  static get lastOriginal() {
    return this.#ze;
  }
  static force(ye2) {
    this.#Ye = ye2;
    return this;
  }
  static patch() {
    if (!this.#Ge) {
      this.#We = Interceptor.attach(globalThis.offsets.IntegrityReport_build, {
        onEnter(e) {
          const ze2 = 1 & e[4].toInt32();
          t70.#ze = ze2;
          const x4 = t70.#Ye;
          if (x4 !== undefined && x4 !== ze2) {
            this.context.x4 = x4;
          }
          return;
        },
      });
      this.#Ge = true;
    }
    return this;
  }
  static uninstall() {
    if (this.#Ge) {
      this.#We?.detach();
      this.#We = null;
      this.#Ge = false;
      return this;
    }
    return this;
  }
}

var Or = t70;

var Ur = Or;

wt((t) => {
  vt(t);
  if (record2.production && new HeartbeatControllerAlias2().terminating) {
    return;
  }
  const e = new de();
  Ur.patch();
  Er.patch();
  Nt.patch();
  Rr.patch();
  Fa.patch();
  if (!record2.production) {
    La.patch();
    re.patch();
  }
  ws.patch();
  if (record2.production) {
    AssetManagerAlias.init();
    re.changeState(re.states.INIT);
    re.changeToState();
  }
  rpc.exports = {
    moveTo(t, e) {
      new Fe().moveTo(t, e);
      return;
    },
    moveBy(t, e) {
      new Fe().moveBy(t, e);
      return;
    },
    logChar() {
      e.me.toString();
      return;
    },
    shoot(t = 0, e = 0, i = false) {
      new Es().shoot(t, e, i);
      return;
    },
    shootUlti(t = 0, e = 0) {
      new Es().shootUlti(t, e);
      return;
    },
    shootGadget(t = 0, e = 0) {
      new Es().shootGadget(t, e);
      return;
    },
    isMirror() {
      const t = new de();
      console.log(t.isMirror());
      return;
    },
    ping() {
      const t = new de();
      console.log(t.ping);
      return;
    },
    logMoveStickDeadzone() {
      const deadzone = new Ie().deadzone;
      console.log("[MoveStick] deadzone: ".concat(deadzone));
      return deadzone;
    },
    createStick() {
      new Vs();
      return;
    },
    jumpAll: () => Pa.dynajump.jumpAll(),
    autoFarmStatus: () => Pa.autoFarm?.getStatus() ?? null,
    autoFarmSetEnabled: (enabled) => Pa.autoFarm?.setEnabled(enabled) ?? false,
    logMap() {
      const t = new de();
      new se(t.tileMap).printAscii();
      return;
    },
    floater(t = "hi") {
      di.showFloater(t);
      return;
    },
  };
  return;
});
