/**
 * game/input.js
 *
 * Client input pipeline: input records, touch events, message submission.
 *
 * Symbols: ce, he, cs, hs, ds
 * Source: bundle lines 7559-17364 (5 statements)
 */


var ce = class t16 {
  constructor(e = null, i = null) {
    let manager = e?.ptr;
    if (manager == null) {
      manager = e;
    }
    if (manager == null) {
      manager = t16.getManager();
    }
    this.manager = manager;
    this.ptr = NULL;
    this.size = 72;
    if (i !== null) {
      this.ptr = globalThis.pointers.malloc(this.size);
      globalThis.natives.ClientInput_ctor(this.ptr, i);
    }
    return;
  }
  static getManager() {
    const battleMode_getInstanceResult = globalThis.natives.BattleMode_getInstance();
    if (battleMode_getInstanceResult.isNull()) {
      return NULL;
    }
    return battleMode_getInstanceResult.add(88).readPointer();
  }
  get ping() {
    if (!this.manager || this.manager.isNull()) {
      return null;
    }
    return this.manager.add(48).readS32();
  }
  send(e, i) {
    const s = new t16(this.manager, e);
    if (i) {
      i(s.ptr);
    }
    return s.addTo();
  }
  sendMove(t, e, i = 2) {
    return this.send(i, (i) => {
      i.add(12).writeS32(t);
      i.add(16).writeS32(e);
      return;
    });
  }
  sendHold() {
    return this.send(13);
  }
  sendRelease() {
    return this.send(14);
  }
  sendAim(t, e = 0) {
    return this.send(16, (i) => {
      i.add(48).writeS32(t);
      i.add(56).writeS32(e);
      return;
    });
  }
  sendSkill(pointer, e, i, record = {}) {
    return this.send(record.type ?? 0, (a) => {
      a.add(12).writeS32(e);
      a.add(16).writeS32(i);
      a.add(48).writePointer(pointer);
      if (record.hold) {
        a.add(24).writeU8(1);
      }
      if (record.secondary) {
        a.add(25).writeU8(1);
      }
      if (record.special) {
        a.add(26).writeU8(1);
      }
      if (record.integer !== undefined) {
        a.add(20).writeS32(record.integer);
      }
      return;
    });
  }
  sendHyper() {
    return this.send(17);
  }
  static fromPtr(ptr2, i = null) {
    const s = new t16(i);
    s.ptr = ptr2;
    return s;
  }
  addTo(manager = this.manager) {
    let ptr2 = manager.ptr;
    if (ptr2 == null) {
      ptr2 = manager;
    }
    if (!ptr2 || ptr2.isNull()) {
      return null;
    }
    le.sign(this.ptr);
    globalThis.natives.ClientInputManager_addInput(ptr2, this.ptr);
    return this;
  }
};

var he = ce;

class cs {
  constructor(instance) {
    this.instance = instance;
    this.vtable = this.instance.readPointer();
    return;
  }
  setMaxTextLength(t) {
    globalThis.natives.TextInput_setMaxTextLength(this.instance, t);
    return;
  }
}

class hs extends cs {
  constructor(t, e) {
    super(t);
    this.updateFunc = new NativeFunction(
      this.vtable.add(11 * Process.pointerSize).readPointer(),
      "void",
      ["pointer", "float"],
    );
    return this;
  }
  getInputText() {
    return this.instance.add(32).readSCStr();
  }
  update(t) {
    this.updateFunc(this.instance, t);
    return;
  }
}

class ds extends hs {
  constructor(t, e, i) {
    globalThis.natives.GameInputField_GameInputField(t, e.instance, i);
    super(t, e);
    this.activateFunc = new NativeFunction(
      this.vtable.add(7 * Process.pointerSize).readPointer(),
      "void",
      ["pointer", "bool"],
    );
    return this;
  }
  activate(t) {
    this.activateFunc(this.instance, Number(t));
    return;
  }
}
