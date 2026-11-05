/**
 * core/scstring.js
 *
 * SCString helpers and NativePointer/String prototype extensions.
 *
 * Symbols: bt
 * Source: bundle lines 2332-2371 (1 statements)
 */


function bt() {
  NativePointer.prototype.readSCStr = function () {
    const u32 = this.readU32();
    const u322 = this.add(4).readU32();
    if (u32 === 0) {
      return "";
    }
    if (u322 > 65536) {
      return "";
    }
    if (u322 >= 8) {
      const pointer = this.add(8).readPointer();
      if (pointer.isNull()) {
        return "";
      }
      return pointer.readUtf8String(u322);
    }
    return this.add(8).readUtf8String(u322);
  };
  String.prototype.ptr = function () {
    return Memory.allocUtf8String(String(this));
  };
  String.prototype.toScString = function (t = null) {
    const stringResult = String(this);
    const length = stringResult.length;
    const length2 = encodeURIComponent(stringResult).replace(/%[A-F\d]{2}/g, "U").length;
    const a = t || globalThis.pointers.malloc(16);
    a.writeU32(length);
    a.add(4).writeU32(length2);
    if (length2 > 7) {
      const pointer = globalThis.pointers.malloc(length2 + 1);
      pointer.writeUtf8String(stringResult);
      a.add(8).writePointer(pointer);
    } else {
      a.add(8).writeUtf8String(stringResult);
    }
    return a;
  };
  return;
}
