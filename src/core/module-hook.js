/**
 * core/module-hook.js
 *
 * Early hook of libg.so loading through the linker64 do_dlopen / call_constructor pair.
 *
 * Symbols: wt
 * Source: bundle lines 2396-2448 (1 statements)
 */


function wt(t, e) {
  let i = null;
  let s = null;
  let a = false;
  let record = {
    name: "libg.so",
    base: null,
    size: null,
  };
  if (
    !(function () {
      const module = Process.findModuleByName(record.name);
      return module ? ((record.base = module.base), (record.size = module.size), true) : !!module;
    })()
  ) {
    Process.findModuleByName("linker64")
      .enumerateSymbols()
      .forEach((t) => {
        if (t.name.indexOf("do_dlopen") >= 0) {
          i = t.address;
          return;
        }
        if (t.name.indexOf("call_constructor") >= 0) {
          s = t.address;
        }
        return;
      });
    Interceptor.attach(i, function (e) {
      if (e[0].readUtf8String().indexOf(record.name) >= 0) {
        Interceptor.attach(s, function () {
          if (!a) {
            a = true;
            var module = Process.findModuleByName(record.name);
            console.log("libg.so", "+ early hooked +!\n");
            record.base = module.base;
            record.size = module.size;
            if (t && typeof t == "function") {
              t(record);
            }
          }
          return;
        });
      }
      return;
    });
    return;
  }
  console.log("libg.so", "!! latehooked; module was already loaded.\n");
  if (t && typeof t == "function") {
    t(record);
  }
  return;
}
