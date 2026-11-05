/**
 * net/protocol.js
 *
 * Binary message protocol (encode/decode, byte streams).
 *
 * Symbols: _r, Ir, Br
 * Source: bundle lines 30387-30660 (3 statements)
 */


class _r {
  constructor({ gameInfo: gameInfo = new ja() } = {}) {
    var gameInfo2 = gameInfo;
    this.gameInfo = gameInfo2;
    return;
  }
  request(t, items = []) {
    const i = Nr(record11.serverPublicKey);
    if (i.length !== 32) {
      throw new Error("Invalid heartbeat key pin");
    }
    if (!this.keys) {
      record10.setPRNG((t, e) => Ea.random(t, e));
      this.keys = record10.box.keyPair();
      this.pkg = Ea.packageName;
      this.snapshot = Ea.snapshot();
      const module = Process.getModuleByName("libsrythm.so");
      this.identity = new NativeFunction(module.getExportByName("srythm_runtime_identity"), "int", [
        "pointer",
        "ulong",
      ]);
    }
    const memoryBuffer = Memory.alloc(512);
    if (this.identity(memoryBuffer, 512) < 0) {
      throw new Error("APK identity unavailable");
    }
    const parsedValue = JSON.parse(memoryBuffer.readUtf8String());
    const joinResult = Array.from(record10.randomBytes(16), (t) =>
      t.toString(16).padStart(2, "0"),
    ).join("");
    const record = {
      endpoint: "/nullr/heartbeat",
      requestId: joinResult,
      timestamp: Date.now(),
      version: record11.loaderVersion,
      pkg: this.pkg,
      device_snapshot: this.snapshot,
      apk: parsedValue,
      security_events: [],
      running: true,
      game_messages_version: 1,
      game_message_acks: items,
      script_version: t,
      ...this.gameInfo.capture(),
    };
    const randomBytesResult = record10.randomBytes(24);
    const record3 = {
      cpub: Mr(this.keys.publicKey),
      n1: Mr(randomBytesResult),
      c1: Mr(record10.box(xr(JSON.stringify(record)), randomBytesResult, i, this.keys.secretKey)),
    };
    const requestResult = new kr({
      timeoutMs: 5000,
      maxResponseBytes: 65536,
    }).request(record11.tcpHost, record11.tcpPort, {
      endpoint: "/nullr/heartbeat",
      envelope: record3,
    });
    const openResult = record10.box.open(
      Nr(requestResult.c2),
      Nr(requestResult.n2),
      i,
      this.keys.secretKey,
    );
    if (!openResult) {
      throw new Error("Unauthenticated heartbeat response");
    }
    const parsedValue2 = JSON.parse(Ar(openResult));
    if (
      parsedValue2.requestId !== joinResult ||
      parsedValue2.ok !== true ||
      parsedValue2.version !== record11.loaderVersion ||
      parsedValue2.pkg !== this.pkg ||
      typeof parsedValue2.activated != "boolean"
    ) {
      throw new Error("Invalid heartbeat response");
    }
    if (parsedValue2.activated) {
      const heartbeat = parsedValue2.heartbeat;
      if (
        !heartbeat ||
        heartbeat.intervalMs !== 10000 ||
        !Number.isSafeInteger(heartbeat.serverTime) ||
        !Number.isSafeInteger(heartbeat.expiresAt) ||
        heartbeat.expiresAt <= heartbeat.serverTime ||
        heartbeat.expiresAt - heartbeat.serverTime > 35000
      ) {
        throw new Error("Invalid heartbeat lease");
      }
    }
    return parsedValue2;
  }
}

class Ir {
  constructor() {
    return;
  }
  static vtable(pointer, e) {
    return pointer
      .readPointer()
      .add(e * Process.pointerSize)
      .readPointer();
  }
  static envFn(t, e, i, items = []) {
    return new NativeFunction(this.vtable(t, e), i, ["pointer", ...items]);
  }
  static vmFn(t, e, i, items = []) {
    return new NativeFunction(this.vtable(t, e), i, ["pointer", ...items]);
  }
  static getVM() {
    const exportPointer = Module.findExportByName(null, "JNI_GetCreatedJavaVMs");
    const nativeFunction = new NativeFunction(exportPointer, "int", ["pointer", "int", "pointer"]);
    const memoryBuffer = Memory.alloc(Process.pointerSize);
    nativeFunction(memoryBuffer, 1, Memory.alloc(4));
    return memoryBuffer.readPointer();
  }
  static attach(t) {
    const vmFnResult = this.vmFn(t, 6, "int", ["pointer", "int"]);
    const vmFnResult2 = this.vmFn(t, 4, "int", ["pointer", "pointer"]);
    const memoryBuffer = Memory.alloc(Process.pointerSize);
    if (vmFnResult(t, memoryBuffer, 65542) === -2) {
      vmFnResult2(t, memoryBuffer, ptr(0));
      return {
        env: memoryBuffer.readPointer(),
        attached: true,
      };
    }
    return {
      env: memoryBuffer.readPointer(),
      attached: false,
    };
  }
  static detach(t) {
    this.vmFn(t, 5, "int")(t);
    return;
  }
  static checkException(t) {
    const envFnResult = this.envFn(t, 15, "pointer");
    const envFnResult2 = this.envFn(t, 16, "void");
    const envFnResult3 = this.envFn(t, 17, "void");
    if (!envFnResult(t).isNull()) {
      envFnResult2(t);
      envFnResult3(t);
    }
    return;
  }
}

class Br {
  constructor() {
    return;
  }
  static isForeground() {
    let t;
    let e;
    let i = false;
    let s = false;
    try {
      e = Ir.getVM();
      let var1 = Ir.attach(e);
      t = var1.env;
      i = var1.attached;
      if (t.isNull()) {
        throw Error("JNI environment unavailable");
      }
      const a = (e, i, items = []) => Ir.envFn(t, e, i, items);
      const n = a(15, "pointer");
      const r = a(17, "void");
      const o = () => {
        if (!n(t).isNull()) {
          r(t);
          throw Error("Android lifecycle unavailable");
        }
        return;
      };
      const l = (t) => {
        o();
        if (t.isNull()) {
          throw Error("Android lifecycle unavailable");
        }
        return t;
      };
      if (a(19, "int", ["int"])(t, 32) !== 0) {
        throw Error("JNI local frame unavailable");
      }
      s = true;
      const c = (text2) => l(a(6, "pointer", ["pointer"])(t, Memory.allocUtf8String(text2)));
      const h = (e, text2, text3, n = false) =>
        l(
          a(n ? 113 : 33, "pointer", ["pointer", "pointer", "pointer"])(
            t,
            e,
            Memory.allocUtf8String(text2),
            Memory.allocUtf8String(text3),
          ),
        );
      const d = (pointer) => {
        const memoryBuffer = Memory.alloc(8);
        memoryBuffer.writePointer(pointer);
        return memoryBuffer;
      };
      const u = c("android/app/ActivityManager");
      const g = c("android/app/ActivityManager$RunningAppProcessInfo");
      const p = l(
        a(30, "pointer", ["pointer", "pointer", "pointer"])(t, g, h(g, "<init>", "()V"), ptr(0)),
      );
      a(143, "void", ["pointer", "pointer", "pointer"])(
        t,
        u,
        h(u, "getMyMemoryState", "(Landroid/app/ActivityManager$RunningAppProcessInfo;)V", true),
        d(p),
      );
      o();
      const m = l(
        a(94, "pointer", ["pointer", "pointer", "pointer"])(
          t,
          g,
          Memory.allocUtf8String("importance"),
          Memory.allocUtf8String("I"),
        ),
      );
      const f = a(100, "int", ["pointer", "pointer"])(t, p, m);
      o();
      if (f > 200) {
        return false;
      }
      const b = c("android/app/ActivityThread");
      const y = l(
        a(116, "pointer", ["pointer", "pointer", "pointer"])(
          t,
          b,
          h(b, "currentApplication", "()Landroid/app/Application;", true),
          ptr(0),
        ),
      );
      const v = l(a(31, "pointer", ["pointer"])(t, y));
      const w = l(a(167, "pointer", ["pointer"])(t, Memory.allocUtf8String("power")));
      const S = l(
        a(36, "pointer", ["pointer", "pointer", "pointer"])(
          t,
          y,
          h(v, "getSystemService", "(Ljava/lang/String;)Ljava/lang/Object;"),
          d(w),
        ),
      );
      const T = l(a(31, "pointer", ["pointer"])(t, S));
      const M = a(39, "uint8", ["pointer", "pointer", "pointer"])(
        t,
        S,
        h(T, "isInteractive", "()Z"),
        ptr(0),
      );
      o();
      return M !== 0;
    } catch (t2) {
      return true;
    } finally {
      try {
        if (t && !t.isNull()) {
          if (!Ir.envFn(t, 15, "pointer")(t).isNull()) {
            Ir.envFn(t, 17, "void")(t);
          }
          if (s) {
            Ir.envFn(t, 20, "pointer", ["pointer"])(t, ptr(0));
          }
        }
      } catch (t3) {}
      try {
        if (i) {
          Ir.detach(e);
        }
      } catch (t4) {}
    }
  }
}
