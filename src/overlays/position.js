/**
 * overlays/position.js
 *
 * Player position overlay.
 *
 * Symbols: PositionOverlay
 * Source: bundle lines 15487-15576 (1 statements)
 */


class PositionOverlay {
  constructor(fpsLogger) {
    this.state = false;
    this.fpsLogger = fpsLogger;
    this.battle = new de();
    this.movieClip = null;
    this.textField = null;
    this.lastTextPosition = null;
    this.updateMode = "frame";
    this.updatesPerSecond = 10;
    this.lastPositionUpdate = 0;
    this.rainbow = false;
    return;
  }
  toggle() {
    this.state = !this.state;
    return;
  }
  get text() {
    const {
      battle: { me: me2 },
    } = this;
    if (me2) {
      return "x: ".concat(me2.x, " y: ", me2.y, " z: ", me2.z);
    }
    return "x: - y: - z: -";
  }
  update() {
    if (!this.textField) {
      this.movieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_text");
      this.textField = this.movieClip.getTextFieldByName("Text");
      ii.addChild(this.textField);
    }
    const visible = this.state && re.isState(re.states.BATTLE);
    this.textField.visible = visible;
    if (!visible) {
      return;
    }
    const lastPositionUpdate = Date.now();
    let i = true;
    if (this.updateMode === "custom") {
      const quotient = 1000 / Math.max(1, Math.min(20, this.updatesPerSecond));
      if (lastPositionUpdate - this.lastPositionUpdate < quotient) {
        i = false;
      }
    }
    if (i) {
      this.lastPositionUpdate = lastPositionUpdate;
      const t3 = this.fpsLogger?.showMaxFPS ? 80 : 55;
      if (
        !this.lastTextPosition ||
        this.lastTextPosition.x !== t3 ||
        this.lastTextPosition.y !== 10
      ) {
        this.textField.setXY(t3, 10);
        this.lastTextPosition = {
          x: t3,
          y: 10,
        };
      }
      this.textField.text = this.text;
    }
    if (this.rainbow) {
      const remainder = (lastPositionUpdate / 20) % 360;
      const product = 255 * (1 - Math.abs(((remainder / 60) % 2) - 1));
      const floorResult = Math.floor(remainder / 60);
      const items = [
        [255, product, 0],
        [product, 255, 0],
        [0, 255, product],
        [0, product, 255],
        [product, 0, 255],
        [255, 0, product],
      ];
      let [n, r, o] = items[floorResult];
      this.textField.colorTransform = {
        r: Math.round(n),
        g: Math.round(r),
        b: Math.round(o),
      };
      return;
    }
    this.textField.colorTransform = {
      r: 255,
      g: 255,
      b: 255,
    };
    return;
  }
}
