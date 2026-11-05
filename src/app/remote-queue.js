/**
 * app/remote-queue.js
 *
 * Remote message queue / command transport.
 *
 * Symbols: RemoteMessageQueue, Ea, Oa, Ua, ja
 * Source: bundle lines 29162-29482 (5 statements)
 */


class RemoteMessageQueue {
  constructor({
    schedule: schedule,
    render: render,
    ready: ready = () => true,
    now: now = () => Date.now(),
    load: load = () => [],
    save: save = () => undefined,
  }) {
    var save2 = save;
    var load2 = load;
    var now2 = now;
    var ready2 = ready;
    var render2 = render;
    var schedule2 = schedule;
    Object.assign(this, {
      schedule: schedule2,
      render: render2,
      ready: ready2,
      now: now2,
      save: save2,
    });
    this.pending = new Map();
    this.scheduled = false;
    this.stopped = false;
    let items = [];
    try {
      items = load2();
    } catch (t3) {}
    this.seen = new Set(
      Array.isArray(items)
        ? items.filter((t) => typeof t == "string" && /^[a-f0-9]{32}$/.test(t)).slice(-512)
        : [],
    );
    return;
  }
  acknowledgements() {
    return Array.from(this.seen).slice(-32);
  }
  receive(t, e) {
    if (this.stopped || !Array.isArray(t) || t.length > 4 || !Number.isSafeInteger(e)) {
      return;
    }
    const pending = new Map();
    for (const s of t) {
      if (
        s &&
        typeof s.id == "string" &&
        /^[a-f0-9]{32}$/.test(s.id) &&
        ["small_popup", "floater_text"].includes(s.kind) &&
        typeof s.text == "string" &&
        s.text.length <= 4000 &&
        !s.text.includes("\u0000") &&
        typeof s.title == "string" &&
        s.title.length <= 128 &&
        !s.title.includes("\u0000") &&
        Number.isSafeInteger(s.expiresAt) &&
        s.expiresAt > e &&
        s.expiresAt - e <= 86400000 &&
        !this.seen.has(s.id)
      ) {
        pending.set(
          s.id,
          this.pending.get(s.id) || {
            ...s,
            deadline: this.now() + s.expiresAt - e,
          },
        );
      }
    }
    this.pending = pending;
    this.pump();
    return;
  }
  pump() {
    if (!this.stopped && !this.scheduled && this.pending.size) {
      this.scheduled = true;
      this.schedule(() => {
        this.scheduled = false;
        if (this.stopped) {
          return;
        }
        const value = this.pending.values().next().value;
        if (value) {
          if (this.now() >= value.deadline) {
            this.pending.delete(value.id);
          } else {
            try {
              if (this.ready() && this.render(value) === true) {
                this.pending.delete(value.id);
                this.seen.add(value.id);
                while (this.seen.size > 512) {
                  this.seen.delete(this.seen.values().next().value);
                }
                try {
                  this.save(Array.from(this.seen));
                } catch (t2) {}
              }
            } catch (t3) {}
          }
          this.pump();
        }
        return;
      });
    }
    return;
  }
  stop() {
    this.stopped = true;
    this.pending.clear();
    return;
  }
}

class Ea {
  constructor() {
    return;
  }
  static get packageName() {
    const fileInstance = new File("/proc/self/cmdline", "rb");
    try {
      const bytes = new Uint8Array(fileInstance.readBytes(256));
      let i = "";
      for (const t2 of bytes) {
        if (!t2) {
          break;
        }
        i += String.fromCharCode(t2);
      }
      return i.split(":")[0].trim();
    } finally {
      fileInstance.close();
    }
  }
  static property(text2) {
    this._get ||= new NativeFunction(
      Process.getModuleByName("libc.so").getExportByName("__system_property_get"),
      "int",
      ["pointer", "pointer"],
    );
    const memoryBuffer = Memory.alloc(256);
    const _getResult = this._get(Memory.allocUtf8String(text2), memoryBuffer);
    if (_getResult > 0) {
      return memoryBuffer.readUtf8String(_getResult).trim();
    }
    return "";
  }
  static snapshot() {
    const t = (t) => this.property(t);
    return {
      serial_candidates: [
        "ro.serialno",
        "ro.boot.serialno",
        "ril.serialnumber",
        "persist.radio.serialnumber",
      ]
        .map(t)
        .filter(Boolean),
      build_fingerprint: t("ro.build.fingerprint"),
      model: t("ro.product.model"),
      board: t("ro.product.board"),
      brand: t("ro.product.brand"),
      device: t("ro.product.device"),
      manufacturer: t("ro.product.manufacturer"),
      product: t("ro.product.name"),
      hardware: t("ro.hardware"),
    };
  }
  static random(t, e) {
    let pointer;
    let s2;
    let t2;
    const module = Process.getModuleByName("libc.so");
    const nativeFunction = new NativeFunction(module.getExportByName("open"), "int", [
      "pointer",
      "int",
    ]);
    const nativeFunction2 = new NativeFunction(module.getExportByName("read"), "long", [
      "int",
      "pointer",
      "ulong",
    ]);
    const nativeFunction3 = new NativeFunction(module.getExportByName("close"), "int", ["int"]);
    const nativeFunctionResult = nativeFunction(Memory.allocUtf8String("/dev/urandom"), 0);
    if (nativeFunctionResult < 0) {
      throw new Error("OS random unavailable");
    }
    try {
      pointer = Memory.alloc(e);
      s2 = 0;
      while (s2 < e) {
        t2 = Number(nativeFunction2(nativeFunctionResult, pointer.add(s2), e - s2));
        if (t2 <= 0) {
          throw new Error("OS random failed");
        }
        s2 += t2;
      }
      t.set(new Uint8Array(pointer.readByteArray(e)));
    } finally {
      nativeFunction3(nativeFunctionResult);
    }
    t2 = Number(nativeFunction2(nativeFunctionResult, pointer.add(s2), e - s2));
    if (t2 <= 0) {
      throw new Error("OS random failed");
    }
    s2 += t2;
    if (!(s2 < e)) {
      t.set(new Uint8Array(pointer.readByteArray(e)));
      return;
    }
  }
}

class Oa {
  constructor() {
    return;
  }
  ready() {
    return vs.isStarted && [4, 5, 6].includes(re.currentState) && !hi.instance.isNull();
  }
  show(t) {
    if (t.kind === "floater_text") {
      hi.showFloater(t.text);
      return true;
    }
    return (
      !this.open &&
      (this.popup ||
        ((this.popup = new SmallPopupWidgetAlias()),
        (this.popup.hideOnMenuHide = false),
        (this.popup.button.text = "OK".toScString()),
        (this.popup.buttonCallback = () => {
          this.popup.hide();
          this.open = false;
          return;
        })),
      (this.popup.title = t.title || "NullRythm"),
      (this.popup.text = t.text),
      this.popup.show(),
      (this.open = true),
      true)
    );
  }
}

class Ua extends RemoteMessageQueue {
  constructor() {
    const t = new Oa();
    let e = null;
    try {
      const packageName = Ea.packageName;
      if (/^[A-Za-z0-9_.]+$/.test(packageName)) {
        e = "/data/data/" + packageName + "/files/.nr-game-message-receipts.json";
      }
    } catch (t3) {}
    super({
      schedule: (t) => setTimeout(() => ws.addTask(t), 200),
      ready: () => t.ready(),
      render: (e) => t.show(e),
      load: () => {
        if (e) {
          return JSON.parse(File.readAllText(e));
        }
        return [];
      },
      save: (t) => {
        if (!e) {
          return;
        }
        const fileInstance = new File(e, "w");
        try {
          fileInstance.write(JSON.stringify(t));
          fileInstance.flush();
        } finally {
          fileInstance.close();
        }
        return;
      },
    });
    return this;
  }
}

class ja {
  constructor({
    readState: readState = () => re.currentState,
    readAvatar: readAvatar = () => bs.clientAvatar,
  } = {}) {
    var readAvatar2 = readAvatar;
    var readState2 = readState;
    Object.assign(this, {
      readState: readState2,
      readAvatar: readAvatar2,
    });
    return;
  }
  capture() {
    let t = null;
    let e = null;
    try {
      const state = this.readState();
      if (Number.isInteger(state) && state >= 0 && state <= 4294967295) {
        t = state;
      }
    } catch (t2) {}
    if ([re.states.HOME, re.states.BATTLE, re.states.MAP_EDITOR].includes(t)) {
      try {
        const avatar = this.readAvatar();
        if (avatar && avatar.instance && !avatar.instance.isNull()) {
          const name = avatar.name;
          if (typeof name == "string") {
            e =
              Array.from(name.replace(/[\u0000-\u001f\u007f]/g, ""))
                .slice(0, 64)
                .join("") || null;
          }
        }
      } catch (t4) {}
    }
    return {
      game_nickname: e,
      game_state: t,
    };
  }
}
