/**
 * overlays/ping.js
 *
 * Ping overlay.
 *
 * Symbols: PingOverlay
 * Source: bundle lines 15191-15263 (1 statements)
 */


class PingOverlay {
  constructor() {
    this.state = false;
    this.rainbow = false;
    this.indicatorEnabled = false;
    this.battle = new de();
    this.hud = new li();
    this.movieClip = null;
    this.textField = null;
    Interceptor.attach(globalThis.offsets.CombatHUD_updatePlayerControls, {
      onEnter(t) {
        this.combatHud = t[0];
        return;
      },
      onLeave() {
        if (re.isState(re.states.BATTLE)) {
          this.hud.setConnectionIndicatorVisible(this.indicatorEnabled, this.combatHud);
        }
        return;
      },
    });
    return;
  }
  get text() {
    const {
      battle: { ping: ping },
    } = this;
    if (ping !== null && Number.isFinite(Number(ping))) {
      return "Ping: ".concat(Math.round(Number(ping)), " ms");
    }
    return "Ping: -";
  }
  update() {
    const isState = re.isState(re.states.BATTLE);
    if (!this.textField) {
      this.movieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_text");
      this.textField = this.movieClip.getTextFieldByName("Text");
      this.textField.setXY(10, 30);
      ii.addChild(this.textField);
    }
    const visible = this.state && isState;
    this.textField.visible = visible;
    if (!visible) {
      return;
    }
    this.textField.text = this.text;
    if (!this.rainbow) {
      this.textField.colorTransform = {
        r: 255,
        g: 255,
        b: 255,
      };
      return;
    }
    const remainder = (Date.now() / 20) % 360;
    const product = 255 * (1 - Math.abs(((remainder / 60) % 2) - 1));
    const items = [
      [255, product, 0],
      [product, 255, 0],
      [0, 255, product],
      [0, product, 255],
      [product, 0, 255],
      [255, 0, product],
    ];
    let [n, r, o] = items[Math.floor(remainder / 60)];
    this.textField.colorTransform = {
      r: Math.round(n),
      g: Math.round(r),
      b: Math.round(o),
    };
    return;
  }
}
