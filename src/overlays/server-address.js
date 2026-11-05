/**
 * overlays/server-address.js
 *
 * Server address overlay.
 *
 * Symbols: ServerAddressOverlay, ServerAddressOverlayAlias
 * Source: bundle lines 15376-15486 (2 statements)
 */


class ServerAddressOverlay {
  static serverMessageType;
  constructor(pingShower, fpsLogger) {
    this.state = false;
    this.allowCopy = true;
    this.rainbow = false;
    this.pingShower = pingShower;
    this.fpsLogger = fpsLogger;
    this.serverAddress = "";
    this.display = null;
    this.displayMode = null;
    Interceptor.attach(globalThis.offsets.MessageManager_receiveMessage, {
      onEnter: (t) => this.readServerAddress(t[1]),
    });
    return;
  }
  static {
    this.serverMessageType = 24112;
  }
  readServerAddress(e) {
    if (!e || e.isNull()) {
      return;
    }
    if (Ne.getMessageType(e) !== ServerAddressOverlay.serverMessageType) {
      return;
    }
    const s32 = e.add(globalThis.offsets.Message_Port).readS32();
    if (s32 <= 0 || s32 > 65535) {
      return;
    }
    const pointer = e.add(globalThis.offsets.Message_IpPtr).readPointer();
    if (pointer.isNull()) {
      return;
    }
    const sCStr = pointer.readSCStr();
    if (sCStr) {
      this.serverAddress = "".concat(sCStr, ":", s32);
    }
    return;
  }
  createDisplay() {
    const displayMode = this.allowCopy ? "button" : "text";
    if (!this.display || this.displayMode !== displayMode) {
      if (this.display) {
        ii.removeChild(this.display);
      }
      if (this.allowCopy) {
        const display = new ui();
        display.movieClipWithoutAnim = ti.getMovieClip("sc/debug.sc", "debug_menu_text");
        this.display = display;
        this.textField = display.movieClip.getTextFieldByName("Text");
        display.buttonListener = new pi(() => {
          this.copyServerAddress();
          return;
        });
      } else {
        const display2 = ti.getMovieClip("sc/debug.sc", "debug_menu_text");
        this.display = display2;
        this.textField = display2.getTextFieldByName("Text");
      }
      ii.addChild(this.display);
      this.displayMode = displayMode;
    }
    return;
  }
  copyServerAddress() {
    if (this.serverAddress) {
      fi.copyString(this.serverAddress);
      hi.showFloater("Copied to clipboard!");
    }
    return;
  }
  update() {
    this.createDisplay();
    const isState = re.isState(re.states.BATTLE);
    this.display.visible = this.state && isState;
    if (!this.state || !isState) {
      return;
    }
    const e = this.pingShower.state ? 50 : 30;
    this.display.setXY(10, e);
    const text2 = "IP: ".concat(this.serverAddress || "-");
    this.textField.text = text2;
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
    let [r, o, l] = items[Math.floor(remainder / 60)];
    this.textField.colorTransform = {
      r: Math.round(r),
      g: Math.round(o),
      b: Math.round(l),
    };
    return;
  }
}

var ServerAddressOverlayAlias = ServerAddressOverlay;
