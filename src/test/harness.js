/**
 * test/harness.js
 *
 * Minimal in-agent test harness.
 *
 * Symbols: TestCase, t46, vs
 * Source: bundle lines 20037-20160 (3 statements)
 */


class TestCase {
  constructor() {
    return;
  }
  static menuTest() {
    globalThis.menu.categoryArea.addItem("test").addTab("mew");
    const addItemResult = globalThis.menu.categoryArea.addItem("test1");
    addItemResult.addTab("nya");
    addItemResult.addTab("nya1");
    addItemResult.addTab("adasd");
    addItemResult.addTab("nuiueiwquei");
    globalThis.menu.categoryArea.addItem("test3");
    globalThis.menu.categoryArea.addItem("test4");
    return;
  }
  static gayStage() {
    let t = 0;
    setInterval(() => {
      t = (t + 3) % 360;
      return;
    }, 16);
    const record = {
      update() {
        (function (e) {
          let [i, s, a] = (function () {
            const quotient = t / 60;
            const roundResult = Math.round(255 * (1 - Math.abs((quotient % 2) - 1)));
            if (quotient < 1) {
              return [255, roundResult, 0];
            }
            if (quotient < 2) {
              return [roundResult, 255, 0];
            }
            if (quotient < 3) {
              return [0, 255, roundResult];
            }
            if (quotient < 4) {
              return [0, roundResult, 255];
            }
            if (quotient < 5) {
              return [roundResult, 0, 255];
            }
            return [255, 0, roundResult];
          })();
          e.colorTransform = {
            r: i,
            g: s,
            b: a,
          };
          return;
        })(si.sprite);
        return;
      },
    };
    ws.updateObjects.add(record);
    return;
  }
  static stageGrayOut(grayOut) {
    si.sprite.grayOut = grayOut;
    return;
  }
  static stageRotate(t) {
    si.sprite.rotate(t);
    si.sprite.pos = {
      x: si.screenWidth,
      y: si.screenHeight,
    };
    return;
  }
  static async testHeroSprite() {
    const dataByIdNative = $t.getDataByIdNative(16000039);
    const dataByIdNative2 = $t.getDataByIdNative(29000206);
    const createResult = await es.create(3, dataByIdNative, dataByIdNative2, 100, 350);
    createResult.pos = {
      x: 100,
      y: 350,
    };
    si.addChild(createResult);
    return;
  }
  static printName() {
    console.log(bs.clientAvatar.name);
    return;
  }
}

class t46 {
  static instance;
  static isStarted;
  constructor() {
    this.shouldRestartGui = false;
    return;
  }
  static {
    this.instance = null;
    this.isStarted = false;
  }
  static start() {
    t46.instance = new t46();
    t46.instance.start();
    return;
  }
  start() {
    if (!t46.isStarted) {
      me.init();
      Pa.init();
      Li.loadAssets();
      ms.create();
      globalThis.TestCase = TestCase;
      t46.isStarted = true;
      return this;
    }
    return;
  }
  destroyGUI() {
    me.clearAll();
    ms.destroy();
    return;
  }
  startGUI() {
    ms.create();
    return;
  }
}

var vs = t46;
