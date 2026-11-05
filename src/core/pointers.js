/**
 * core/pointers.js
 *
 * Pointer table for libc / libm / libtools exports (malloc, memcpy, http helpers, math).
 *
 * Symbols: mt, yt
 * Source: bundle lines 2271-2378 (2 statements)
 */


function mt() {
  const module = Process.getModuleByName("libc.so");
  const module2 = Process.getModuleByName("libm.so");
  const module3 = Process.getModuleByName("libtools.so");
  const s = (exportName) => module.getExportByName(exportName);
  const a = (exportName) => module2.getExportByName(exportName);
  return {
    malloc: new NativeFunction(s("malloc"), "pointer", ["uint"]),
    free: new NativeFunction(s("free"), "void", ["pointer"]),
    memset: new NativeFunction(s("memset"), "pointer", ["pointer", "int", "uint"]),
    strlen: new NativeFunction(s("strlen"), "uint", ["pointer"]),
    fopen: new NativeFunction(s("fopen"), "pointer", ["pointer", "pointer"]),
    fclose: new NativeFunction(s("fclose"), "int", ["pointer"]),
    fread: new NativeFunction(s("fread"), "uint", ["pointer", "uint", "uint", "pointer"]),
    fwrite: new NativeFunction(s("fwrite"), "uint", ["pointer", "uint", "uint", "pointer"]),
    remove: new NativeFunction(s("remove"), "int", ["pointer"]),
    mkdir: new NativeFunction(s("mkdir"), "int", ["pointer", "uint"]),
    access: new NativeFunction(s("access"), "int", ["pointer", "int"]),
    socket: new NativeFunction(s("socket"), "int", ["int", "int", "int"]),
    connect: new NativeFunction(s("connect"), "int", ["int", "pointer", "uint"]),
    send: new NativeFunction(s("send"), "int", ["int", "pointer", "uint", "int"]),
    recv: new NativeFunction(s("recv"), "int", ["int", "pointer", "uint", "int"]),
    close: new NativeFunction(s("close"), "int", ["int"]),
    math: {
      sin: a("sin"),
      cos: a("cos"),
      sqrt: a("sqrt"),
      fabs: a("fabs"),
      sinf: a("sinf"),
      cosf: a("cosf"),
      sqrtf: a("sqrtf"),
    },
    httpInit: new NativeFunction(module3.findExportByName("http_client_init"), "int", []),
    httpDestroy: new NativeFunction(module3.findExportByName("http_client_destroy"), "void", []),
    httpPost: new NativeFunction(module3.findExportByName("POST_request_json"), "pointer", [
      "pointer",
      "pointer",
      "pointer",
    ]),
    httpGet: new NativeFunction(module3.findExportByName("GET_request_json"), "pointer", [
      "pointer",
      "pointer",
    ]),
  };
}

function yt() {
  bt();
  return {
    getNativeFieldOffset: ft,
  };
}
