/**
 * core/loader.js
 *
 * AOT native-module loader: wraps an ELF blob in a memfd, calls android_dlopen_ext, patches injected symbols and resolves exports.
 *
 * Symbols: loadEmbeddedNativeModule
 * Source: bundle lines 5-109 (1 statements)
 */


function loadEmbeddedNativeModule(bytes, e, i, s, text2) {
  if (Process.platform !== "linux" || Process.arch !== "arm64") {
    throw new Error("rythm CModule AOT requires Android arm64");
  }
  const n = (t) => {
    const globalExportByName = Module.findGlobalExportByName(t);
    if (globalExportByName === null) {
      throw new Error("rythm AOT loader: missing native export " + t);
    }
    return globalExportByName;
  };
  const nativeFunction = new NativeFunction(n("syscall"), "int", ["int", "pointer", "int"]);
  const nativeFunction2 = new NativeFunction(n("write"), "int", ["int", "pointer", "int"]);
  const nativeFunction3 = new NativeFunction(n("close"), "int", ["int"]);
  const nativeFunction4 = new NativeFunction(n("android_dlopen_ext"), "pointer", [
    "pointer",
    "int",
    "pointer",
  ]);
  const nativeFunction5 = new NativeFunction(n("dlsym"), "pointer", ["pointer", "pointer"]);
  const nativeFunction6 = new NativeFunction(n("dlerror"), "pointer", []);
  const nativeFunction7 = new NativeFunction(n("dladdr"), "int", ["pointer", "pointer"]);
  const nativeFunctionResult = nativeFunction(279, Memory.allocUtf8String("rythm-cmodule"), 1);
  if (nativeFunctionResult < 0) {
    throw new Error("rythm AOT loader: memfd_create failed (" + nativeFunctionResult + ")");
  }
  try {
    const memoryBuffer = Memory.alloc(bytes.byteLength);
    memoryBuffer.writeByteArray(bytes);
    let r2 = 0;
    while (r2 < bytes.byteLength) {
      const nativeFunctionResult2 = nativeFunction2(
        nativeFunctionResult,
        memoryBuffer.add(r2),
        bytes.byteLength - r2,
      );
      if (nativeFunctionResult2 <= 0) {
        throw new Error("rythm AOT loader: write failed (" + nativeFunctionResult2 + ")");
      }
      r2 += nativeFunctionResult2;
    }
    const memoryBuffer2 = Memory.alloc(48);
    memoryBuffer2.writeByteArray(new Uint8Array(48));
    memoryBuffer2.writeU64(16);
    memoryBuffer2.add(24).writeS32(-1);
    memoryBuffer2.add(28).writeS32(nativeFunctionResult);
    const nativeFunctionResult3 = nativeFunction4(
      Memory.allocUtf8String("librythm_" + Math.random().toString(16).slice(2) + ".so"),
      2,
      memoryBuffer2,
    );
    if (nativeFunctionResult3.isNull()) {
      const nativeFunctionResult4 = nativeFunction6();
      const e3 = nativeFunctionResult4.isNull()
        ? "unknown dlopen error"
        : nativeFunctionResult4.readCString();
      throw new Error("rythm AOT loader: " + e3);
    }
    if (s.length !== 0) {
      if (i == null) {
        throw new Error("rythm AOT loader: compiled module requires injected symbols");
      }
      const nativeFunctionResult5 = nativeFunction5(
        nativeFunctionResult3,
        Memory.allocUtf8String(text2),
      );
      if (nativeFunctionResult5.isNull()) {
        throw new Error("rythm AOT loader: missing module anchor");
      }
      const memoryBuffer3 = Memory.alloc(4 * Process.pointerSize);
      if (nativeFunction7(nativeFunctionResult5, memoryBuffer3) === 0) {
        throw new Error("rythm AOT loader: dladdr failed");
      }
      const pointer = memoryBuffer3.add(Process.pointerSize).readPointer();
      for (const t4 of s) {
        const e5 = t4[0];
        const s2 = t4[1];
        const a2 = t4[2];
        const r3 = i[e5];
        if (r3 === undefined) {
          throw new Error("rythm AOT loader: missing injected symbol " + e5);
        }
        const addResult = pointer.add(s2);
        if (!Memory.protect(addResult, Process.pointerSize, "rw-")) {
          throw new Error("rythm AOT loader: unable to patch injected symbol " + e5);
        }
        addResult.writePointer(ptr(r3).add(a2));
      }
    }
    const record = {};
    for (const text3 of e) {
      const nativeFunctionResult6 = nativeFunction5(
        nativeFunctionResult3,
        Memory.allocUtf8String(text3),
      );
      if (nativeFunctionResult6.isNull()) {
        throw new Error("rythm AOT loader: missing compiled export " + text3);
      }
      record[text3] = nativeFunctionResult6;
    }
    return record;
  } finally {
    nativeFunction3(nativeFunctionResult);
  }
}
