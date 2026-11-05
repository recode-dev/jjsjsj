/**
 * security/attestation.js
 *
 * Attestation token client and signature/integrity helpers.
 *
 * Symbols: St, Tt, AttestationTokenClient, AttestationTokenClientAlias, Ct, Nt, xt, At, kt, Pt
 * Source: bundle lines 5351-5573 (12 statements)
 */


var record2 = {
  production: false,
};

record2.production = true;

class St {
  constructor() {
    return;
  }
  static connect(t, e) {
    const socketResult = globalThis.pointers.socket(2, 1, 0);
    if (socketResult < 0) {
      return -1;
    }
    const memoryBuffer = Memory.alloc(16);
    memoryBuffer.writeByteArray(new Uint8Array(16));
    memoryBuffer.writeU16(2);
    memoryBuffer.add(2).writeU16(((255 & e) << 8) | ((e >>> 8) & 255));
    const mapResult = t.split(".").map(Number);
    if (mapResult.length !== 4 || mapResult.some((t) => t < 0 || t > 255)) {
      globalThis.pointers.close(socketResult);
      return -1;
    }
    for (let index = 0; index < 4; index++) {
      memoryBuffer.add(4 + index).writeU8(mapResult[index]);
    }
    if (globalThis.pointers.connect(socketResult, memoryBuffer, 16) < 0) {
      globalThis.pointers.close(socketResult);
      return -1;
    }
    return socketResult;
  }
  static request(t, e, i, s, a = null, record = {}) {
    const connectResult = this.connect(t, e);
    if (connectResult < 0) {
      return null;
    }
    try {
      const e2 = a === null ? "" : JSON.stringify(a);
      const record3 = {
        Host: t,
        Connection: "close",
        ...record,
      };
      if (a !== null) {
        record3["Content-Type"] = record3["Content-Type"] || "application/json";
        record3["Content-Length"] = e2.length;
      }
      const text2 = "".concat(
        i,
        " ",
        s,
        " HTTP/1.1\r\n",
        Object.entries(record3)
          .map(([t, e]) => "".concat(t, ": ", e))
          .join("\r\n"),
        "\r\n\r\n",
        e2,
      );
      const utf8String = Memory.allocUtf8String(text2);
      let h = 0;
      while (h < text2.length) {
        const sendResult = globalThis.pointers.send(
          connectResult,
          utf8String.add(h),
          text2.length - h,
          0,
        );
        if (sendResult <= 0) {
          return null;
        }
        h += sendResult;
      }
      let d = "";
      const memoryBuffer = Memory.alloc(4096);
      while (true) {
        const recvResult = globalThis.pointers.recv(connectResult, memoryBuffer, 4095, 0);
        if (recvResult <= 0) {
          break;
        }
        memoryBuffer.add(recvResult).writeU8(0);
        d += memoryBuffer.readUtf8String(recvResult);
      }
      const indexOfResult = d.indexOf("\r\n\r\n");
      if (indexOfResult < 0) {
        return null;
      }
      const sliceResult = d.slice(0, indexOfResult);
      const sliceResult2 = d.slice(indexOfResult + 4);
      const matchResult = sliceResult.split("\r\n", 1)[0].match(/^HTTP\/\d\.\d\s+(\d+)/);
      return {
        statusCode: matchResult ? Number(matchResult[1]) : 0,
        headers: sliceResult
          .split("\r\n")
          .slice(1)
          .reduce((t, e) => {
            const indexOfResult2 = e.indexOf(":");
            if (indexOfResult2 > 0) {
              t[e.slice(0, indexOfResult2).trim().toLowerCase()] = e
                .slice(indexOfResult2 + 1)
                .trim();
            }
            return t;
          }, {}),
        body: sliceResult2,
      };
    } finally {
      globalThis.pointers.close(connectResult);
    }
  }
  static postJson(t, e, i, s) {
    const requestResult = this.request(t, e, "POST", i, s);
    if (!requestResult || requestResult.statusCode < 200 || requestResult.statusCode >= 300) {
      return null;
    }
    return JSON.parse(requestResult.body);
  }
}

var Tt = St;

class AttestationTokenClient {
  static patched;
  constructor() {
    this.base = globalThis.libg.base;
    this.serverIp = "188.245.255.253";
    this.serverPort = 3003;
    return;
  }
  static {
    this.patched = false;
  }
  ptrToHex(t, e) {
    let i = "";
    for (let index = 0; index < e; index++) {
      i += t.add(index).readU8().toString(16).padStart(2, "0");
    }
    return i;
  }
  hexToBytes(t) {
    const bytes = new Uint8Array(t.length / 2);
    for (let index = 0; index < bytes.length; index++) {
      bytes[index] = parseInt(t.substr(2 * index, 2), 16);
    }
    return bytes;
  }
  getTokenFromApi(t) {
    const postJsonResult = Tt.postJson(this.serverIp, this.serverPort, "/generate-token", {
      request32Hex: t,
    });
    if (postJsonResult?.success && postJsonResult.token80Hex) {
      return this.hexToBytes(postJsonResult.token80Hex);
    }
    return null;
  }
  init() {
    if (AttestationTokenClient.patched) {
      return;
    }
    AttestationTokenClient.patched = true;
    Interceptor.attach(this.base.add(6765520), {
      onEnter(t) {
        this.retPtr = this.context.x8;
        return;
      },
      onLeave(t) {
        const retPtr = this.retPtr;
        const pointer = retPtr.readPointer();
        if (retPtr.add(8).readPointer().sub(pointer).toInt32() >= 32) {
          const tokenFromApi = this.getTokenFromApi(this.ptrToHex(pointer, 32));
          if (tokenFromApi) {
            const pointer2 = globalThis.pointers.malloc(80);
            pointer2.writeByteArray(Array.from(tokenFromApi));
            if (!pointer.isNull()) {
              globalThis.pointers.free(pointer);
            }
            retPtr.writePointer(pointer2);
            retPtr.add(8).writePointer(pointer2.add(80));
            retPtr.add(16).writePointer(pointer2.add(80));
          }
        }
        return;
      },
    });
    return;
  }
}

var AttestationTokenClientAlias = AttestationTokenClient;

class Ct {
  constructor() {
    return;
  }
  static patch() {
    new AttestationTokenClientAlias().init();
    return;
  }
}

var Nt = Ct;

class xt {
  constructor() {
    return;
  }
  static createGlobalID(t, e) {
    if (t <= 0) {
      return 1000000 + e;
    }
    return 1000000 * t + e;
  }
  static getClassID(t) {
    return Math.floor(t / 1000000);
  }
  static getInstanceID(t) {
    return t % 1000000;
  }
}

var At = xt;

class kt {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  get length() {
    return this.ptr.add(20).readU32();
  }
}

var Pt = kt;
