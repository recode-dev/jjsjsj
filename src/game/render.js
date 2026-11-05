/**
 * game/render.js
 *
 * Engine display layer: sprites, movie clips, text fields, scene renderers, screens.
 *
 * Symbols: ge, pe, t20, me, fe, be, ye, ve, we, ti, ei, ii, si, hi, di, ui, gi, pi, mi, fi, Si, Ti, Mi, Ci, Ni, xi, Ai, _i, Pa, Ii, Bi, Fi, Di, t39, Ri, Ei, Oi, t40, ji, Yi, t41, Wi, zi, Xi, qi, Ki, Ji, Qi, Zi, ts, es, is, ss, as, ns, rs, os, t43, ls, xs, As, ks
 * Source: bundle lines 8133-20877 (67 statements)
 */


var ge = class t19 {
  constructor(instance) {
    this.instance = instance;
    return;
  }
  static get DisplayObject_setPixelSnappedXY() {
    return globalThis.natives.DisplayObject_setPixelSnappedXY;
  }
  get vtable() {
    return this.instance.readPointer();
  }
  get visibility() {
    return this.instance.add(8).readU8() !== 0;
  }
  set visibility(t) {
    this.instance.add(8).writeU8(t ? 1 : 0);
    return;
  }
  get visible() {
    return this.visibility;
  }
  set visible(visibility) {
    this.visibility = visibility;
    return;
  }
  get x() {
    return this.instance.add(32).readFloat();
  }
  set x(t) {
    this.instance.add(32).writeFloat(t);
    return;
  }
  get y() {
    return this.instance.add(36).readFloat();
  }
  set y(t) {
    this.instance.add(36).writeFloat(t);
    return;
  }
  get pos() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  set pos({ x: x3, y: y3 }) {
    if (x3 !== undefined) {
      this.x = x3;
    }
    if (y3 !== undefined) {
      this.y = y3;
    }
    return;
  }
  get width() {
    return new NativeFunction(this.vtable.add(12 * Process.pointerSize).readPointer(), "float", [
      "pointer",
    ])(this.instance);
  }
  get height() {
    return new NativeFunction(this.vtable.add(13 * Process.pointerSize).readPointer(), "float", [
      "pointer",
    ])(this.instance);
  }
  get scaleX() {
    return this.instance.add(16).readFloat();
  }
  set scaleX(t) {
    this.instance.add(16).writeFloat(t);
    return;
  }
  get scaleY() {
    return this.instance.add(28).readFloat();
  }
  set scaleY(t) {
    this.instance.add(28).writeFloat(t);
    return;
  }
  get scale() {
    return {
      x: this.scaleX,
      y: this.scaleY,
    };
  }
  set scale(t) {
    this.scaleX = t;
    this.scaleY = t;
    return;
  }
  get grayOut() {
    return !!(4 & this.instance.add(40).readU32());
  }
  set grayOut(t) {
    const u32 = this.instance.add(40).readU32();
    this.instance.add(40).writeU32(t ? 4 | u32 : -5 & u32);
    return;
  }
  get colorTransform() {
    return {
      r: this.instance.add(9).readU8(),
      g: this.instance.add(10).readU8(),
      b: this.instance.add(11).readU8(),
      a: this.instance.add(12).readU8(),
    };
  }
  set colorTransform({ r: r4, g: g4, b: b2, a: a4 }) {
    const colorTransform = this.colorTransform;
    this.instance.add(9).writeU8(r4 ?? colorTransform.r);
    this.instance.add(10).writeU8(g4 ?? colorTransform.g);
    this.instance.add(11).writeU8(b2 ?? colorTransform.b);
    this.instance.add(12).writeU8(a4 ?? colorTransform.a);
    return;
  }
  get parent() {
    return new t19(this.instance.add(56).readPointer());
  }
  get index() {
    return this.instance.add(64).readS32();
  }
  get isGuiContainer() {
    return new NativeFunction(this.vtable.add(23 * Process.pointerSize).readPointer(), "int", [])();
  }
  get isScrollArea() {
    return new NativeFunction(this.vtable.add(20 * Process.pointerSize).readPointer(), "int", [])();
  }
  static isScrollArea(pointer) {
    return new NativeFunction(
      pointer
        .readPointer()
        .add(20 * Process.pointerSize)
        .readPointer(),
      "int",
      [],
    )();
  }
  static isGuiContainer(pointer) {
    return new NativeFunction(
      pointer
        .readPointer()
        .add(23 * Process.pointerSize)
        .readPointer(),
      "int",
      [],
    )();
  }
  isTextField() {
    return new NativeFunction(this.vtable.add(16 * Process.pointerSize).readPointer(), "bool", [
      "pointer",
    ])(this.instance);
  }
  setPixelSnappedXY(e, i) {
    t19.DisplayObject_setPixelSnappedXY(this.instance, e, i);
    return;
  }
  setXY(t, e) {
    this.setPixelSnappedXY(t, e);
    return;
  }
  hide() {
    this.visible = false;
    return;
  }
  show() {
    this.visible = true;
    return;
  }
  rotate(t, e = 1, i = 1) {
    const addResult = this.instance.add(16);
    const product = 0.017453 * t;
    const sinResult = Math.sin(product);
    const cosResult = Math.cos(product);
    addResult.writeFloat(e * cosResult);
    addResult.add(4).writeFloat(i * sinResult);
    addResult.add(8).writeFloat(-e * sinResult);
    addResult.add(12).writeFloat(i * cosResult);
    return;
  }
  destroy() {
    new NativeFunction(this.instance.readPointer().readPointer(), "void", ["pointer"])(
      this.instance,
    );
    this.instance = undefined;
    return;
  }
};

var pe = ge;

class t20 {
  static ScreenObjects;
  static TouchedOn;
  static PressedNow;
  constructor() {
    return;
  }
  static {
    this.ScreenObjects = new Map();
    this.TouchedOn = new Map();
    this.PressedNow = new Set();
  }
  static init() {
    Interceptor.attach(globalThis.offsets.Sprite_touchMoved, {
      onEnter: function (e) {
        const i = e[1];
        const float = i.add(52).readFloat();
        const float2 = i.add(56).readFloat();
        const getResult = t20.ScreenObjects.get(e[0].toString());
        const getResult2 = t20.TouchedOn.get(e[0].toString());
        if (
          getResult &&
          getResult2 &&
          getResult.draggable &&
          getResult.visibility &&
          !t20.PressedNow.size
        ) {
          getResult.pos = {
            x: float - getResult2.x,
            y: float2 - getResult2.y,
          };
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.Sprite_touchPressed, {
      onEnter: function (e) {
        const i = e[1];
        const float = i.add(52).readFloat();
        const float2 = i.add(56).readFloat();
        if (pe.isScrollArea(e[0])) {
          t20.PressedNow.add(e[0].toString());
        }
        const getResult = t20.ScreenObjects.get(e[0].toString());
        if (getResult) {
          t20.TouchedOn.set(e[0].toString(), {
            x: float - getResult.pos.x,
            y: float2 - getResult.pos.y,
          });
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.Sprite_touchReleased, {
      onEnter(e) {
        t20.TouchedOn.delete(e[0].toString());
        t20.PressedNow.delete(e[0].toString());
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.Sprite_touchCancelled, {
      onEnter(e) {
        t20.PressedNow.delete(e[0].toString());
        return;
      },
    });
    return;
  }
  static addObject(e) {
    t20.ScreenObjects.set(e.instance.toString(), e);
    return;
  }
  static rmObject(e) {
    t20.ScreenObjects.delete(e.instance.toString());
    t20.TouchedOn.delete(e.instance.toString());
    return;
  }
  static clearAll() {
    t20.ScreenObjects.clear();
    t20.TouchedOn.clear();
    return;
  }
}

var me = t20;

var fe = class t21 extends ge {
  constructor(t) {
    super(t);
    this.draggable = false;
    return this;
  }
  static get Sprite() {
    return globalThis.natives.Sprite_Sprite;
  }
  static get Sprite_addChild() {
    return globalThis.natives.Sprite_addChild;
  }
  static get Sprite_addChildAt() {
    return globalThis.natives.Sprite_addChildAt;
  }
  static get Sprite_removeChildAt() {
    return globalThis.natives.Sprite_removeChildAt;
  }
  static create(e = 4) {
    const mallocResult = globalThis.pointers.malloc(128);
    t21.Sprite(mallocResult, e);
    return new t21(mallocResult);
  }
  set draggability(draggable) {
    this.draggable = draggable;
    if (draggable) {
      me.addObject(this);
      return;
    }
    me.rmObject(this);
    return;
  }
  get draggability() {
    return this.draggable;
  }
  get childCapacity() {
    return this.instance.add(74).readU16();
  }
  get childCount() {
    return this.instance.add(78).readU16();
  }
  get children() {
    return this.instance.add(80).readPointer();
  }
  get inlineChildren() {
    return this.instance.add(88);
  }
  getChildById(t) {
    if (t < 0 || t >= this.childCount) {
      return null;
    }
    const pointer = this.children.add(t * Process.pointerSize).readPointer();
    return new ge(pointer);
  }
  getChildAt(t) {
    return this.getChildById(t);
  }
  forEachChild(t) {
    for (let index = 0; index < this.childCount; index++) {
      const childById = this.getChildById(index);
      if (childById && !childById.instance.isNull()) {
        t(childById, index, this);
      }
    }
    return;
  }
  addChild(e) {
    t21.Sprite_addChild(this.instance, e.instance ?? e);
    return e;
  }
  addChildAt(e, i) {
    t21.Sprite_addChildAt(this.instance, e.instance ?? e, i);
    return e;
  }
  removeChild(t) {
    const e = t.instance ?? t;
    const i = t.instance ? t : new ge(e);
    if (i.parent.instance.equals(this.instance) && i.index !== -1) {
      this.removeChildAt(i.index);
    }
    return;
  }
  removeChildAt(e) {
    t21.Sprite_removeChildAt(this.instance, e);
    return;
  }
};

var be = class t22 extends ge {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  static get TextField_setText() {
    return globalThis.natives.TextField_setText;
  }
  set text(e) {
    if (typeof e == "string") {
      const i = new _t(e);
      t22.TextField_setText(this.instance, i.ptr);
      i.destruct();
      return;
    }
    const ptr2 = e.ptr;
    let s = e;
    switch (ptr2) {
      case null:
        const instance = e.instance;
        if (instance != null) {
          s = instance;
        }
        break;
      default:
        s = ptr2;
        break;
    }
    t22.TextField_setText(this.instance, s);
    return;
  }
  get text() {
    return this.instance.add(224).readSCStr();
  }
  get fontSize() {
    return this.instance.add(176).readS16();
  }
  set fontSize(t) {
    this.instance.add(176).writeS16(t);
    return;
  }
  get color() {
    return this.instance.add(128).readU32();
  }
  set color(t) {
    this.instance.add(128).writeU32(t);
    return;
  }
  get outline() {
    return this.instance.add(144).readU8();
  }
  set outline(t) {
    return this.instance.add(144).writeU8(t);
  }
  set multiline(t) {
    globalThis.natives.TextField_setMultiline(this.instance, t);
    return;
  }
  get fontOutline() {
    return this.instance.add(144).readU8() !== 0;
  }
  set fontOutline(t) {
    this.instance.add(144).writeU8(t ? 1 : 0);
    return;
  }
  get align() {
    return this.instance.add(150).readU8();
  }
  set align(t) {
    this.instance.add(150).writeU8(t);
    return;
  }
  get colorsEnabled() {
    return this.instance.add(147).readU8() !== 0;
  }
  set colorsEnabled(t) {
    this.instance.add(147).writeU8(t ? 1 : 0);
    return;
  }
};

var ye = be;

var ve = class t23 extends fe {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  static get MovieClip_getChildByName() {
    return globalThis.natives.MovieClip_getChildByName;
  }
  static get MovieClip_getTextFieldByName() {
    return globalThis.natives.MovieClip_getTextFieldByName;
  }
  static get MovieClip_gotoAndStopFrameIndex() {
    return globalThis.natives.MovieClip_gotoAndStopFrameIndex;
  }
  getChildByName(text2) {
    const movieClip_getChildByNameResult = t23.MovieClip_getChildByName(
      this.instance,
      Memory.allocUtf8String(text2),
    );
    return new t23(movieClip_getChildByNameResult);
  }
  gotoAndPlayToFrameIndexAnyDirection(t, e) {
    globalThis.natives.MovieClip_gotoAndPlayToFrameIndexAnyDirection(this.instance, t, e);
    return;
  }
  getTextFieldByName(text2) {
    const movieClip_getTextFieldByNameResult = t23.MovieClip_getTextFieldByName(
      this.instance,
      Memory.allocUtf8String(text2),
    );
    return new be(movieClip_getTextFieldByNameResult);
  }
  setChildVisible(t, visible) {
    const childByName = this.getChildByName(t);
    if (!childByName.instance.isNull()) {
      childByName.visible = visible;
    }
    return;
  }
  gotoAndStopFrameIndex(e) {
    t23.MovieClip_gotoAndStopFrameIndex(this.instance, e);
    return;
  }
};

var we = ve;

var ti = class t30 {
  constructor() {
    return;
  }
  static get ResourceManager_getMovieClip() {
    return new NativeFunction(globalThis.offsets.ResourceManager_getMovieClip, "pointer", [
      "pointer",
      "pointer",
    ]);
  }
  static getMovieClip(text2, text3) {
    const resourceManager_getMovieClipResult = t30.ResourceManager_getMovieClip(
      Memory.allocUtf8String(text2),
      Memory.allocUtf8String(text3),
    );
    return new ve(resourceManager_getMovieClipResult);
  }
};

var ei = ti;

var ii = class t31 {
  constructor() {
    return;
  }
  static get instance() {
    return globalThis.offsets.Stage_instance.readPointer();
  }
  static get Stage_addChild() {
    return globalThis.natives.Stage_addChild;
  }
  static get safeMarginLeft() {
    return t31.instance.add(84).readFloat();
  }
  static get safeMarginRight() {
    return t31.instance.add(88).readFloat();
  }
  static get safeMarginTop() {
    return t31.instance.add(92).readFloat();
  }
  static get safeMarginBottom() {
    return t31.instance.add(96).readFloat();
  }
  static get pointSize() {
    return t31.instance.add(400).readFloat();
  }
  static get screenWidth() {
    return t31.instance.add(644).readS32();
  }
  static get screenHeight() {
    return t31.instance.add(648).readS32();
  }
  static get sprite() {
    return new fe(t31.instance.add(144).readPointer());
  }
  static addChild(e) {
    t31.Stage_addChild(t31.instance, e.instance ?? e);
    return e;
  }
  static removeChild(e) {
    t31.sprite.removeChild(e);
    return;
  }
};

var si = ii;

class hi {
  constructor() {
    return;
  }
  static get instance() {
    return globalThis.offsets.GUI_instance.readPointer();
  }
  static showFloater(t) {
    const instance = this.instance;
    if (instance.isNull()) {
      return;
    }
    const i = new _t(String(t));
    globalThis.natives.GUI_showFloaterTextAtDefaultPos(instance, i.ptr, -1, 0, 0);
    i.destruct();
    return;
  }
}

var di = hi;

var ui = class t35 extends fe {
  constructor(e = null) {
    if (!e || e.isNull()) {
      e = globalThis.pointers.malloc(624);
      t35.GameButton_GameButton(e);
    }
    super(e);
    this._buttonListener = null;
    return this;
  }
  static get GameButton_GameButton() {
    return globalThis.natives.GameButton_GameButton;
  }
  get movieClip() {
    return new ve(this.instance.add(176).readPointer());
  }
  set movieClip(t) {
    const pointer = this.instance.readPointer();
    const nativeFunction = new NativeFunction(
      pointer.add(45 * Process.pointerSize).readPointer(),
      "int",
      ["pointer", "pointer", "int"],
    );
    const s = t.instance ?? t;
    nativeFunction(this.instance, s, 1);
    return;
  }
  set movieClipWithoutAnim(t) {
    const pointer = this.instance.readPointer();
    const nativeFunction = new NativeFunction(
      pointer.add(45 * Process.pointerSize).readPointer(),
      "int",
      ["pointer", "pointer", "int"],
    );
    const s = t.instance ?? t;
    nativeFunction(this.instance, s, 0);
    return;
  }
  set text(t) {
    const pointer = this.instance.readPointer();
    const nativeFunction = new NativeFunction(
      pointer.add(54 * Process.pointerSize).readPointer(),
      "int",
      ["pointer", "pointer", "int"],
    );
    const ptr2 = t.ptr;
    let a = t;
    switch (ptr2) {
      case null:
        const instance = t.instance;
        if (instance != null) {
          a = instance;
        }
        break;
      default:
        a = ptr2;
        break;
    }
    nativeFunction(this.instance, a, 1);
    return;
  }
  set buttonListener(_buttonListener) {
    this._buttonListener = _buttonListener;
    const pointer = _buttonListener.instance ?? _buttonListener;
    this.instance.add(168).writePointer(pointer);
    return;
  }
};

var gi = ui;

class pi {
  constructor(t) {
    this.instance = globalThis.pointers.malloc(Process.pointerSize);
    this.vtable = globalThis.pointers.malloc(2 * Process.pointerSize);
    this.dtor = new NativeCallback(() => undefined, "void", ["pointer"]);
    this.callback = new NativeCallback(t, "void", ["pointer", "pointer"]);
    this.vtable.writePointer(this.dtor);
    this.vtable.add(Process.pointerSize).writePointer(this.callback);
    this.instance.writePointer(this.vtable);
    return;
  }
}

var mi = pi;

class fi {
  constructor() {
    return;
  }
  static copyString(t) {
    const e = new _t(String(t));
    globalThis.natives.Application_copyString(e.ptr);
    e.destruct();
    return;
  }
}

class Si extends ui {
  constructor() {
    super();
    this.movieClip = ti.getMovieClip("sc/debug.sc", "debug_button");
    this.text = new _t("D");
    const t = ii.pointSize !== 0 ? ii.pointSize : 0.10000000000000001;
    const difference = ii.screenHeight - (ii.safeMarginBottom + ii.safeMarginTop) / t;
    this.setXY(10, difference);
    this.buttonListener = new pi(() => {
      Li.debugMenu.toggle();
      return;
    });
    return this;
  }
}

class Ti extends fe {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  get movieClip() {
    return new ve(this.instance.add(144).readPointer());
  }
  setText(t, text2) {
    const textFieldByName = this.movieClip.getTextFieldByName(t);
    if (!textFieldByName.instance.isNull()) {
      textFieldByName.text = text2;
    }
    return;
  }
}

var Mi = class t37 extends Ti {
  constructor(undefinedValue3 = undefined, i = "", s = "") {
    if (undefinedValue3) {
      super(undefinedValue3);
    } else {
      const mallocResult = globalThis.pointers.malloc(512);
      const movieClip = ti.getMovieClip(i, s);
      t37.DropGUIContainer_DropGUIContainer(mallocResult, movieClip.instance);
      super(mallocResult);
    }
    return this;
  }
  static get DropGUIContainer_DropGUIContainer() {
    return globalThis.natives.DropGUIContainer_DropGUIContainer;
  }
  static create(e, i) {
    const mallocResult = globalThis.pointers.malloc(512);
    const movieClip = ti.getMovieClip(e, i);
    t37.DropGUIContainer_DropGUIContainer(mallocResult, movieClip.instance);
    return new t37(mallocResult);
  }
};

var Ci = Mi;

var Ni = class t38 extends fe {
  constructor(e, i, s) {
    const mallocResult = globalThis.pointers.malloc(712);
    t38.ScrollArea_ScrollArea(mallocResult, e, i, s);
    super(mallocResult);
    ws.updateObjects.add(this);
    return this;
  }
  static get ScrollArea_ScrollArea() {
    return globalThis.natives.ScrollArea_ScrollArea;
  }
  static get ScrollArea_scrollTo() {
    return globalThis.natives.ScrollArea_scrollTo;
  }
  static get ScrollArea_removeAllContent() {
    return globalThis.natives.ScrollArea_removeAllContent;
  }
  get sprite() {
    return new fe(this.instance.add(208).readPointer());
  }
  set unk1(t) {
    this.instance.add(224).writeU8(t ? 1 : 0);
    return;
  }
  set pinching(t) {
    this.instance.add(398).writeU8(t ? 1 : 0);
    return;
  }
  set alignment(t) {
    this.instance.add(632).writeS32(t);
    return;
  }
  set unk2(t) {
    this.instance.add(225).writeU8(t ? 1 : 0);
    return;
  }
  get dragMask() {
    return this.instance.add(231).readS32();
  }
  set dragMask(t) {
    this.instance.add(231).writeS32(t);
    this.instance.add(640).writeS32(t);
    return;
  }
  set verticalDrag(t) {
    const dragMask = this.dragMask;
    this.dragMask = t ? 1 | dragMask : -2 & dragMask;
    return;
  }
  set horizontalDrag(t) {
    const dragMask = this.dragMask;
    this.dragMask = t ? 256 | dragMask : -257 & dragMask;
    return;
  }
  set shouldUpdateBounds(t) {
    this.instance.add(233).writeU8(t ? 1 : 0);
    return;
  }
  scrollTo(e, i, s, a) {
    t38.ScrollArea_scrollTo(this.instance.add(464), e, i, s, a);
    return;
  }
  update(t) {
    const pointer = this.instance.readPointer();
    new NativeFunction(pointer.add(44 * Process.pointerSize).readPointer(), "void", [
      "pointer",
      "float",
    ])(this.instance, t);
    return;
  }
  removeAllContent() {
    t38.ScrollArea_removeAllContent(this.instance);
    return;
  }
  addContent(t) {
    this.sprite.addChild(t);
    this.shouldUpdateBounds = true;
    return;
  }
};

var xi = Ni;

class Ai extends ui {
  constructor(name, enumeration) {
    super();
    this.name = name;
    this.enumeration = enumeration;
    this.buttons = [];
    this.opened = false;
    this.movieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_category");
    this.mini = new ui();
    this.mini.movieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_category_mini");
    this.mini.text = new _t(this.name.substring(0, 3));
    this.buttonListener = new pi(this.buttonClicked.bind(this));
    this.mini.buttonListener = new pi(this.buttonClicked.bind(this));
    return this;
  }
  isCategoryOpened() {
    return this.opened;
  }
  sortButtons() {
    return this.buttons;
  }
  buttonClicked(t, e) {
    const debugMenu = Li.debugMenu;
    const s = new ui(e);
    debugMenu.scrollArea.scrollTo(
      0,
      s.y - 5 + 0.5 * (debugMenu.scrollArea.height - s.height),
      1,
      0.20000000000000001,
    );
    this.opened = !this.opened;
    debugMenu.shouldUpdateLayout = true;
    return;
  }
}

var record5 = {
  MODS: 0,
  PERFORMANCE: 1,
  INFO: 2,
  DEBUG: 3,
  XRAY: 4,
  EMPTY_2: 5,
  EMPTY_3: 6,
  EMPTY_4: 7,
  EMPTY_5: 8,
  EMPTY_6: 9,
  EMPTY_7: 10,
  EMPTY_8: 11,
  EMPTY_9: 12,
  EMPTY_10: 13,
  WIP: 14,
};

var items3 = [
  "MODS",
  "PERFORMANCE",
  "INFO",
  "DEBUG",
  "XRAY",
  "Empty",
  "Empty",
  "Empty",
  "Empty",
  "Empty",
  "Empty",
  "Empty",
  "Empty",
  "Empty",
  "WIP",
];

class _i extends Mi {
  constructor(t, e) {
    super(undefined, t, e);
    this.shouldUpdateLayout = false;
    this.buttons = [];
    const i = ii.pointSize !== 0 ? ii.pointSize : 0.10000000000000001;
    const difference = ii.screenHeight - (ii.safeMarginBottom + ii.safeMarginTop) / i;
    const difference2 = ii.screenWidth - (ii.safeMarginRight + ii.safeMarginLeft) / i;
    this.movieClip.visible = true;
    this.movieClip.scale = difference / this.movieClip.height;
    this.setPixelSnappedXY(difference2, 0);
    const textFieldByName = this.movieClip.getTextFieldByName("item_area");
    this.scrollAreaHeight = textFieldByName.height - 5;
    this.scrollArea = new Ni(1, textFieldByName.width, textFieldByName.height - 5);
    this.scrollArea.unk1 = true;
    this.scrollArea.setXY(textFieldByName.x, textFieldByName.y + 5);
    this.scrollArea.pinching = false;
    this.scrollArea.alignment = 4;
    this.scrollArea.horizontalDrag = false;
    const textFieldByName2 = this.movieClip.getTextFieldByName("tab_area");
    this.tabScrollArea = new Ni(1, textFieldByName2.width, textFieldByName2.height);
    this.tabScrollArea.unk1 = true;
    this.tabScrollArea.setXY(textFieldByName2.x, textFieldByName2.y);
    this.tabScrollArea.pinching = false;
    this.tabScrollArea.alignment = 8;
    this.tabScrollArea.horizontalDrag = true;
    this.tabScrollArea.verticalDrag = false;
    this.movieClip.addChild(this.scrollArea);
    this.movieClip.addChild(this.tabScrollArea);
    this.movieClip.setChildVisible("clear_button", false);
    this.movieClip.setChildVisible("debug_menu_input_button", true);
    return this;
  }
  createCategory(t) {
    const e = new Ai(items3[t] ?? "DEBUG", t);
    this.buttons.push(e);
    return e;
  }
  getCategory(t) {
    return this.buttons.find((e) => e instanceof Ai && e.enumeration === t) ?? null;
  }
  addButton(t, undefinedValue3 = undefined) {
    if (undefinedValue3 === undefined) {
      this.buttons.push(t);
      this.shouldUpdateLayout = true;
      return;
    }
    let category = this.getCategory(undefinedValue3);
    category ||= this.createCategory(undefinedValue3);
    category.buttons.push(t);
    this.shouldUpdateLayout = true;
    return;
  }
  set title(t) {
    this.setText("title", t instanceof _t ? t : new _t(t));
    return;
  }
  toggle() {
    if (this.visible) {
      this.hide();
      return;
    }
    this.show();
    return;
  }
  update(t) {
    if (this.shouldUpdateLayout) {
      this.updateLayout();
    }
    return;
  }
  updateLayout() {
    this.scrollArea.removeAllContent();
    this.tabScrollArea.removeAllContent();
    let t = 0;
    for (const e of this.buttons) {
      if (e instanceof Ai) {
        e.mini.setXY(45 * t + 20, 25);
        this.tabScrollArea.addContent(e.mini);
        t++;
      }
    }
    let e2 = 0;
    for (const t2 of this.buttons) {
      if (t2 instanceof Ai) {
        const sortButtonsResult = t2.sortButtons();
        t2.setXY(0.5 * t2.width, e2 + 0.5 * t2.height);
        this.scrollArea.addContent(t2);
        e2 += 8 + t2.height;
        t2.text = new _t("".concat(t2.isCategoryOpened() ? "-" : "+", " ", t2.name));
        if (t2.isCategoryOpened()) {
          for (const t3 of sortButtonsResult) {
            t3.setXY(0.5 * t3.width, e2 + 0.5 * t3.height);
            this.scrollArea.addContent(t3);
            e2 += 8 + t3.height;
          }
        }
      } else {
        t2.setXY(0.5 * t2.width, e2 + 0.5 * t2.height);
        this.scrollArea.addContent(t2);
        e2 += 8 + t2.height;
      }
    }
    this.shouldUpdateLayout = false;
    return;
  }
}

var Pa;

class Ii extends _i {
  constructor() {
    super("sc/debug.sc", "debug_menu");
    this.title = new _t("Null Rythm");
    this.movieClip.getTextFieldByName("version").text = "v69.230";
    this.closeButton = new ui();
    this.closeButton.movieClip = this.movieClip.getChildByName("close_button");
    this.closeButton.buttonListener = new pi(() => this.hide());
    this.movieClip.addChild(this.closeButton);
    this.createDebugMenuButton("RESTART GAME", undefined, () => {
      Pa.restartGame();
      return;
    });
    this.createDebugMenuButton("AUTO DODGE: OFF", record5.MODS, (t) => {
      const toggleDodgeResult = Pa.toggleDodge();
      t.text = new _t("AUTO DODGE: " + (toggleDodgeResult ? "ON" : "OFF"));
      return;
    });
    this.createDebugMenuButton("OUTLINE: BLUE", record5.MODS, (t) => {
      Pa.setBlueOutline();
      t.text = new _t("OUTLINE: BLUE");
      return;
    });
    this.createDebugMenuButton("CAMERA: DEFAULT", record5.MODS, () => {
      Pa.setCameraMode("default");
      return;
    });
    this.createDebugMenuButton("CAMERA: ZOOM", record5.MODS, () => {
      Pa.setCameraMode("zoom");
      return;
    });
    this.createDebugMenuButton("CAMERA: DEZOOM", record5.MODS, () => {
      Pa.setCameraMode("dezoom");
      return;
    });
    this.createDebugMenuButton("CAMERA: FP3D", record5.MODS, () => {
      Pa.setCameraMode("fp3d");
      return;
    });
    this.createDebugMenuButton("CAMERA: 3D", record5.MODS, () => {
      Pa.setCameraMode("cam3d");
      return;
    });
    for (const t of Pa.getThemes()) {
      this.createDebugMenuButton(t.name, record5.MODS, () => {
        Pa.changeTheme(t.key);
        return;
      });
    }
    this.createDebugMenuButton("SHOW FPS: ON", record5.PERFORMANCE, (t) => {
      const toggleFpsResult = Pa.toggleFps();
      t.text = new _t("SHOW FPS: " + (toggleFpsResult ? "ON" : "OFF"));
      return;
    });
    this.createDebugMenuButton("SHOW POSITION: OFF", record5.PERFORMANCE, (t) => {
      const togglePositionResult = Pa.togglePosition();
      t.text = new _t("SHOW POSITION: " + (togglePositionResult ? "ON" : "OFF"));
      return;
    });
    this.createDebugMenuButton("SHOW LOG HUD: OFF", record5.INFO, (t) => {
      Li.debugHud.showMessages = !Li.debugHud.showMessages;
      t.text = new _t("SHOW LOG HUD: " + (Li.debugHud.showMessages ? "ON" : "OFF"));
      return;
    });
    this.createDebugMenuButton("CLEAR LOG HUD", record5.INFO, () => {
      Li.debugHud.clear();
      return;
    });
    this.createDebugMenuButton("HIDE MENU", record5.DEBUG, () => {
      this.hide();
      return;
    });
    this.createCategory(record5.XRAY);
    this.createCategory(record5.WIP);
    this.xray = Pa.getXray();
    this.xrayRosterVersion = -1;
    this.xraySelectionVersion = -1;
    this.xrayButtons = [];
    this.xrayDisableButton = null;
    this.shouldUpdateLayout = true;
    return this;
  }
  update(t) {
    this.xray.refreshRoster();
    this.xrayRosterVersion !== this.xray.rosterVersion
      ? ((this.xrayRosterVersion = this.xray.rosterVersion),
        (this.xraySelectionVersion = this.xray.selectionVersion),
        this.updateBattlePlayers())
      : this.xraySelectionVersion !== this.xray.selectionVersion &&
        ((this.xraySelectionVersion = this.xray.selectionVersion), this.updateBattlePlayerLabels());
    super.update.call(this, t);
    return;
  }
  updateBattlePlayers() {
    this.getCategory(record5.XRAY).buttons = [];
    this.xrayButtons = [];
    this.xrayDisableButton = this.createDebugMenuButton("DISABLE XRAY", record5.XRAY, () => {
      this.xray.disable();
      this.updateBattlePlayerLabels();
      return;
    });
    for (const t of this.xray.players) {
      const debugMenuButton = this.createDebugMenuButton(
        this.xray.getLabel(t),
        record5.XRAY,
        () => {
          this.xray.select(t.playerIndex);
          this.xray.enabled = true;
          this.updateBattlePlayerLabels();
          return;
        },
      );
      this.xrayButtons.push(debugMenuButton);
    }
    this.shouldUpdateLayout = true;
    return;
  }
  updateBattlePlayerLabels() {
    const minResult = Math.min(this.xrayButtons.length, this.xray.players.length);
    for (let index = 0; index < minResult; index++) {
      this.xrayButtons[index].text = new _t(this.xray.getLabel(this.xray.players[index]));
    }
    return;
  }
  createDebugMenuButton(t, e, i = null) {
    const movieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_item");
    const a = new ui();
    a.movieClip = movieClip;
    a.text = new _t(t);
    if (i) {
      a.buttonListener = new pi(() => i(a));
    }
    this.addButton(a, e);
    return a;
  }
}

class Bi {
  constructor() {
    return;
  }
  static get width() {
    return globalThis.offsets.Screen_width.readS32();
  }
  static get height() {
    return globalThis.offsets.Screen_height.readS32();
  }
}

class Fi {
  constructor() {
    this.messages = [];
    return;
  }
  addMessage(t) {
    this.messages.push(t);
    return;
  }
  clear() {
    this.messages = [];
    return;
  }
  toString() {
    return this.messages.join("\n");
  }
}

class Di {
  constructor() {
    this.messageCollector = new Fi();
    this.messageMovieClip = ti.getMovieClip("sc/debug.sc", "debug_menu_text");
    this.messageTextField = this.messageMovieClip.getTextFieldByName("Text");
    this.messageTextField.setXY(10, 70);
    this.showMessages = false;
    return;
  }
  addMessage(t, e = "info") {
    if (!this.showMessages) {
      return;
    }
    this.messageCollector.addMessage(t);
    const maxResult = Math.max(1, Math.floor(Bi.height / 30));
    if (this.messageCollector.messages.length > maxResult) {
      this.messageCollector.messages = this.messageCollector.messages.slice(-maxResult);
    }
    return;
  }
  clear() {
    this.messageCollector.clear();
    return;
  }
  draw(t = false) {
    this.messageTextField.visible =
      t && this.showMessages && this.messageCollector.messages.length > 0;
    if (t && this.showMessages && this.messageCollector.messages.length) {
      this.messageTextField.colorTransform = {
        r: 255,
        g: 255,
        b: 255,
      };
      this.messageTextField.text = this.messageCollector.toString();
    }
    return;
  }
  destruct() {
    this.messageTextField.visible = false;
    this.messageTextField.destroy();
    return;
  }
}

class t39 {
  static _debugMenu;
  static _debugButton;
  static _debugHud;
  static _updateHookInstalled;
  static _hudCreated;
  static _created;
  constructor() {
    return;
  }
  static {
    this._debugMenu = null;
    this._debugButton = null;
    this._debugHud = null;
    this._updateHookInstalled = false;
    this._hudCreated = false;
    this._created = false;
  }
  static get debugMenu() {
    return this._debugMenu;
  }
  static get debugButton() {
    return this._debugButton;
  }
  static get debugHud() {
    return this._debugHud;
  }
  static loadAssets() {
    return ws.loadAsset("sc/debug.sc");
  }
  static create() {
    if (!this._created) {
      this.loadAssets();
      this.createHud();
      this._debugButton = new Si();
      ii.addChild(this._debugButton);
      this._debugMenu = new Ii();
      this._debugMenu.hide();
      ii.addChild(this._debugMenu);
      this._created = true;
    }
    return true;
  }
  static createHud() {
    if (!this._hudCreated) {
      this.loadAssets();
      this._debugHud = new Di();
      ii.addChild(this._debugHud.messageTextField);
      globalThis.debugHud = this._debugHud;
      this._hudCreated = true;
      this.installUpdateHook();
    }
    return true;
  }
  static installUpdateHook() {
    if (!this._updateHookInstalled) {
      this._updateHookInstalled = true;
      ws.updateObjects.add(t39);
    }
    return;
  }
  static update(t) {
    if (this._created) {
      if (this._debugMenu) {
        this._debugMenu.update(t);
      }
      if (this._debugHud) {
        const isState = re.isState(re.states.BATTLE);
        this._debugHud.draw(isState);
      }
    }
    return;
  }
  static destroy() {
    this._created = false;
    this._hudCreated = false;
    this._updateHookInstalled = false;
    this._debugButton.destroy();
    this._debugMenu.destroy();
    this._debugHud.destruct();
    this._debugButton = undefined;
    this._debugMenu = undefined;
    this._debugHud = undefined;
    return;
  }
}

Li = t39;

class Ri extends xi {
  constructor(t) {
    super(1, t.width, t.height);
    this.unk1 = true;
    this.setXY(t.x, t.y);
    this.pinching = false;
    this.alignment = 4;
    this.horizontalDrag = false;
    this.verticalDrag = true;
    this.unk2 = 0;
    this.items = [];
    return this;
  }
  get slideItems() {
    return this.items;
  }
  addItem(t) {
    this.items.push(t);
    this.addContent(t);
    return;
  }
}

class Ei extends xi {
  constructor(t, category) {
    super(1, t.width, t.height);
    this.category = category;
    this.unk1 = true;
    this.setXY(t.x + 10, t.y);
    this.pinching = false;
    this.alignment = 8;
    this.horizontalDrag = true;
    this.verticalDrag = false;
    this.buttons = [];
    return this;
  }
  get slideItems() {
    return this.buttons;
  }
  get hiddenOffset() {
    return Math.max(0, ...this.buttons.map((t) => t.height));
  }
  addItem(t = "") {
    const e = new gi();
    e.movieClipWithoutAnim = ei.getMovieClip("gui.sc", "MenuTab");
    e.text = t.toScString();
    e.pos = {
      x: e.width / 2 + (e.width + 10) * this.buttons.length,
      y: e.height / 2,
    };
    this.category.tabs.size
      ? (e.colorTransform = {
          r: 150,
          g: 150,
          b: 150,
        })
      : (e.colorTransform = {
          r: 255,
          g: 255,
          b: 255,
        });
    this.buttons.push(e);
    this.addContent(e);
    e.buttonListener = new mi(() => {
      this.buttons.forEach((t) => {
        t.colorTransform =
          e !== t
            ? {
                r: 150,
                g: 150,
                b: 150,
              }
            : {
                r: 255,
                g: 255,
                b: 255,
              };
        return;
      });
      this.category.setActiveTab(t);
      return;
    });
    return;
  }
}

var Oi = 1.3999999999999999;

var record6 = {
  linear: (t) => t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t) => t * t * t,
  easeOutBack: (t) => 1 + (Oi + 1) * Math.pow(t - 1, 3) + Oi * Math.pow(t - 1, 2),
  easeOutBounce: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    }
    if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    }
    if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    }
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInBack: (t) => (Oi + 1) * t * t * t - Oi * t * t,
};

class t40 {
  static tweens;
  constructor() {
    return;
  }
  static {
    this.tweens = new Map();
  }
  static tween({
    key: key = {},
    from: from = 0,
    to: to = 1,
    duration: duration = 0.29999999999999999,
    delay: delay = 0,
    ease: ease = record6.linear,
    onUpdate: onUpdate,
    onComplete: onComplete,
  }) {
    var onComplete2 = onComplete;
    var onUpdate2 = onUpdate;
    var ease2 = ease;
    var delay2 = delay;
    var duration2 = duration;
    var to2 = to;
    var from2 = from;
    var key2 = key;
    if (!ws.updateObjects.has(t40)) {
      ws.updateObjects.add(t40);
    }
    t40.tweens.set(key2, {
      from: from2,
      to: to2,
      duration: duration2,
      delay: delay2,
      ease: ease2,
      onUpdate: onUpdate2,
      onComplete: onComplete2,
      elapsed: 0,
    });
    return key2;
  }
  static getTransition(t) {
    t.slideState ??= {
      x: 0,
      y: 0,
      alpha: 1,
      baseAlpha: t.colorTransform.a,
    };
    return t.slideState;
  }
  static applyTransition(e, x3, y3, alpha) {
    const transition = t40.getTransition(e);
    e.x += x3 - transition.x;
    e.y += y3 - transition.y;
    e.colorTransform = {
      a: Math.round(transition.baseAlpha * alpha),
    };
    transition.x = x3;
    transition.y = y3;
    transition.alpha = alpha;
    return;
  }
  static getSlideItems(t) {
    return t.slideItems ?? [t];
  }
  static transitionTo(e, i, s, a, n, r, o) {
    const mapResult = t40.getSlideItems(e).map((e) => {
      return {
        item: e,
        start: {
          ...t40.getTransition(e),
        },
      };
    });
    t40.tween({
      key: e,
      duration: n,
      ease: r,
      onUpdate: (e, n) => {
        const o = r(n);
        mapResult.forEach(({ item: item, start: start }) =>
          t40.applyTransition(
            item,
            start.x + (i - start.x) * o,
            start.y + (s - start.y) * o,
            start.alpha + (a - start.alpha) * o,
          ),
        );
        return;
      },
      onComplete: o,
    });
    return;
  }
  static slideIn(e, i = 0, s = 0, a = 0.28000000000000003) {
    if (!e.visibility) {
      t40.getSlideItems(e).forEach((e) => t40.applyTransition(e, i, s, 0));
      e.show();
    }
    t40.transitionTo(e, 0, 0, 1, a, record6.easeOutCubic);
    return;
  }
  static slideOut(e, i = 0, s = 0, a = 0.14999999999999999, n) {
    if (e.visibility) {
      t40.transitionTo(e, i, s, 0, a, record6.easeInCubic, () => {
        t40.getSlideItems(e).forEach((e) => t40.applyTransition(e, 0, 0, 1));
        e.hide();
        if (n == null) {
          return;
        }
        n();
        return;
      });
    }
    return;
  }
  static stop(e) {
    t40.cancel(e);
    t40.getSlideItems(e).forEach((e) => t40.applyTransition(e, 0, 0, 1));
    return;
  }
  static cancel(e) {
    t40.tweens.delete(e);
    return;
  }
  static clear() {
    t40.tweens.clear();
    return;
  }
  static update(e) {
    if (e > 0 && t40.tweens.size) {
      e = Math.min(e, 0.10000000000000001);
      for (let [i, s] of t40.tweens) {
        s.elapsed += e;
        const minResult = Math.min(Math.max((s.elapsed - s.delay) / s.duration, 0), 1);
        s.onUpdate(s.from + (s.to - s.from) * s.ease(minResult), minResult);
        if (minResult >= 1) {
          if (t40.tweens.get(i) === s) {
            t40.tweens.delete(i);
          }
          s.onComplete?.();
        }
      }
    }
    return;
  }
}

var ji = t40;

var record7 = {
  scale: 72,
  lockMenu: false,
  lockButton: false,
  position: {
    menuSaved: false,
    menuX: 0,
    menuY: 0,
    buttonSaved: false,
    buttonX: 0,
    buttonY: 0,
  },
  animation: {
    variant: "pop",
    openDuration: 400,
    closeDuration: 220,
    stagger: true,
    staggerStep: 45,
    pop: {
      startScale: 60,
      distance: 60,
    },
    slide: {
      direction: "bottom",
      distance: 120,
    },
    zoom: {
      startScale: 20,
    },
    drop: {
      distance: 200,
    },
  },
  transitions: {
    tabs: {
      enabled: true,
      mode: "down",
      duration: 280,
      distance: 40,
    },
    categories: {
      enabled: true,
      mode: "vertical",
      duration: 280,
      distance: 30,
    },
  },
};

var Yi = Hi(record7, {});

class t41 {
  static scale;
  static lockMenu;
  static lockButton;
  static position;
  static animation;
  static transitions;
  constructor() {
    return;
  }
  static {
    this.scale = Yi.scale;
    this.lockMenu = Yi.lockMenu;
    this.lockButton = Yi.lockButton;
    this.position = Yi.position;
    this.animation = Yi.animation;
    this.transitions = Yi.transitions;
  }
  static load(e) {
    const i = Hi(record7, Vi(e));
    t41.scale = i.scale;
    t41.lockMenu = i.lockMenu;
    t41.lockButton = i.lockButton;
    t41.position = i.position;
    t41.animation = i.animation;
    t41.transitions = i.transitions;
    return;
  }
  static serialize() {
    return {
      scale: t41.scale,
      lockMenu: t41.lockMenu,
      lockButton: t41.lockButton,
      position: t41.position,
      animation: t41.animation,
      transitions: t41.transitions,
    };
  }
}

var Wi = t41;

var zi = (t) => t.duration / 1000;

var Xi = (t) => 0.55000000000000004 * zi(t);

class qi {
  constructor(_menu) {
    this._menu = _menu;
    this.tabArea = new Ei(_menu.movieClip.getChildByName("top_item_area"), this);
    _menu.addChild(this.tabArea);
    this.tabs = new Map();
    this.activeTab = null;
    this.visible = true;
    return;
  }
  addTab(t) {
    this.tabArea.addItem(t);
    const e = new Ri(this._menu.movieClip.getChildByName("main_item_area"));
    this._menu.addChild(e);
    this.tabs.set(t, e);
    this.activeTab ||= t;
    if (!this.visible || this.activeTab !== t) {
      e.hide();
    }
    return e;
  }
  getTabByName(t) {
    return this.tabs.get(t);
  }
  setActiveTab(activeTab) {
    if (!this.tabs.has(activeTab)) {
      return;
    }
    const activeTab2 = this.activeTab;
    this.activeTab = activeTab;
    if (activeTab2 === activeTab) {
      return;
    }
    if (!this.visible) {
      this.tabs.forEach((t) => t.hide());
      return;
    }
    const {
      transitions: { tabs: tabs },
    } = Wi;
    if (!tabs.enabled) {
      this.tabs.forEach((e, i) => {
        ji.stop(e);
        if (i === activeTab) {
          e.show();
          return;
        }
        e.hide();
        return;
      });
      return;
    }
    const items = [...this.tabs.keys()];
    const a = items.indexOf(activeTab) > items.indexOf(activeTab2) ? 1 : -1;
    let n = false;
    this.tabs.forEach((e, r) => {
      if (r === activeTab || !e.visibility) {
        return;
      }
      n = true;
      const o = $i(tabs, items.indexOf(activeTab) > items.indexOf(r) ? 1 : -1, true);
      ji.slideOut(e, o.x, o.y, Xi(tabs), () => this.revealActiveTab(a));
      return;
    });
    if (!n) {
      this.revealActiveTab(a);
    }
    return;
  }
  revealActiveTab(t) {
    if (!this.visible) {
      return;
    }
    for (let [t, e] of this.tabs) {
      if (t !== this.activeTab && e.visibility) {
        return;
      }
    }
    const {
      transitions: { tabs: tabs },
    } = Wi;
    const i = $i(tabs, t, false);
    ji.slideIn(this.tabs.get(this.activeTab), i.x, i.y, zi(tabs));
    return;
  }
  isOnScreen() {
    return this.tabArea.visibility || [...this.tabs.values()].some((t) => t.visibility);
  }
  show(t = 0) {
    this.visible = true;
    const tabByName = this.getTabByName(this.activeTab);
    if (!t) {
      if (tabByName) {
        ji.stop(tabByName);
        tabByName.show();
      }
      ji.stop(this.tabArea);
      this.tabArea.show();
      return;
    }
    const {
      transitions: { categories: categories },
    } = Wi;
    const s = $i(categories, t, false);
    if (tabByName) {
      ji.slideIn(tabByName, s.x, s.y, zi(categories));
    }
    ji.slideIn(this.tabArea, 0, this.tabArea.hiddenOffset, zi(categories));
    return;
  }
  hide(t = 0, e) {
    this.visible = false;
    if (!t) {
      ji.stop(this.tabArea);
      this.tabArea.hide();
      this.tabs.forEach((t) => {
        ji.stop(t);
        t.hide();
        return;
      });
      return;
    }
    const {
      transitions: { categories: categories },
    } = Wi;
    const s = $i(categories, t, true);
    const filterResult = [this.tabArea, ...this.tabs.values()].filter((t) => t.visibility);
    let length = filterResult.length;
    if (!length) {
      e?.();
    }
    filterResult.forEach((t) => {
      const a =
        t === this.tabArea
          ? {
              x: 0,
              y: this.tabArea.hiddenOffset,
            }
          : s;
      ji.slideOut(t, a.x, a.y, Xi(categories), () => {
        if (--length === 0 && e == null) {
          return;
        }
        return;
      });
      return;
    });
    return;
  }
}

class Ki extends xi {
  constructor(t, _menu) {
    super(1, t.width, t.height);
    this._menu = _menu;
    this.unk1 = true;
    this.setXY(t.x, t.y + 8);
    this.pinching = false;
    this.horizontalDrag = false;
    this.verticalDrag = true;
    this.alignment = 4;
    this.buttons = new Map();
    this.categories = new Map();
    this.activeCategory = null;
    return this;
  }
  addItem(activeCategory = "") {
    const e = new gi();
    e.movieClip = ei.getMovieClip("gui.sc", "custom_country_item");
    e.movieClip.gotoAndStopFrameIndex(1);
    e.text = activeCategory.toScString();
    e.pos = {
      x: e.width / 2 + 5,
      y: e.height / 2 + (e.height + 10) * this.buttons.size,
    };
    const i = new qi(this._menu);
    this.categories.set(activeCategory, i);
    e.buttonListener = new mi(() => {
      this.setActiveCategory(activeCategory);
      return;
    });
    this.buttons.set(activeCategory, e);
    this.addContent(e);
    this.activeCategory ? (i.hide(), (e.grayOut = 1)) : (this.activeCategory = activeCategory);
    return i;
  }
  getCategoryByName(t) {
    return this.categories.get(t);
  }
  setActiveCategory(activeCategory) {
    if (!this.categories.has(activeCategory)) {
      return;
    }
    const activeCategory2 = this.activeCategory;
    this.activeCategory = activeCategory;
    if (!Wi.transitions.categories.enabled) {
      this.categories.forEach((e, i) => {
        if (i === activeCategory) {
          return e.show();
        }
        return e.hide();
      });
      this.updateButtons();
      return;
    }
    const items = [...this.categories.keys()];
    const s = items.indexOf(activeCategory) > items.indexOf(activeCategory2) ? 1 : -1;
    let a = false;
    this.categories.forEach((e, n) => {
      if (n !== activeCategory) {
        if (!e.isOnScreen()) {
          return e.hide();
        }
        a = true;
        e.hide(items.indexOf(activeCategory) > items.indexOf(n) ? 1 : -1, () =>
          this.revealActiveCategory(s),
        );
      }
      return;
    });
    if (!a) {
      this.revealActiveCategory(s);
    }
    this.updateButtons();
    return;
  }
  updateButtons() {
    this.buttons.forEach((t, e) => {
      if (e !== this.activeCategory) {
        t.grayOut = 1;
        return;
      }
      t.grayOut = 0;
      return;
    });
    return;
  }
  revealActiveCategory(t) {
    for (let [t, e] of this.categories) {
      if (t !== this.activeCategory && e.isOnScreen()) {
        return;
      }
    }
    const getResult = this.categories.get(this.activeCategory);
    if (!getResult.visible || !getResult.isOnScreen()) {
      getResult.show(t);
    }
    return;
  }
}

class Ji extends gi {
  constructor() {
    super();
    this.movieClipWithoutAnim = ei.getMovieClip("gui.sc", "Button");
    this.isActive = false;
    this.movieClip.gotoAndStopFrameIndex(0);
    this.tf = new ye(this.movieClip.getChildByName("txt").instance);
    return this;
  }
  activate() {
    if (!this.isActive) {
      this.movieClip.gotoAndPlayToFrameIndexAnyDirection(0, 14);
      this.isActive = true;
    }
    return;
  }
  deactivate() {
    if (this.isActive) {
      this.movieClip.gotoAndPlayToFrameIndexAnyDirection(14, 0);
      this.isActive = false;
    }
    return;
  }
  toggle() {
    if (this.isActive) {
      this.deactivate();
      return;
    }
    this.activate();
    return;
  }
  playClickAnim() {
    this.toggle();
    this.toggle();
    return;
  }
  set text(text2) {
    this.tf.text = text2;
    return;
  }
  get text() {
    return this.tf.text;
  }
}

class Qi extends gi {
  constructor(undefinedValue3 = undefined) {
    super();
    this.movieClipWithoutAnim = undefinedValue3 || ei.getMovieClip("gui.sc", "Switcher");
    this.isActive = false;
    this.movieClip.gotoAndStopFrameIndex(0);
    return this;
  }
  activate() {
    if (!this.isActive) {
      this.movieClip.gotoAndPlayToFrameIndexAnyDirection(0, 14);
      this.isActive = true;
    }
    return;
  }
  deactivate() {
    if (this.isActive) {
      this.movieClip.gotoAndPlayToFrameIndexAnyDirection(14, 0);
      this.isActive = false;
    }
    return;
  }
  toggle() {
    if (this.isActive) {
      this.deactivate();
      return;
    }
    this.activate();
    return;
  }
}

class Zi extends Ci {
  constructor() {
    super(undefined, "gui.sc", "SwitcherItem");
    this.switcher = new Qi(this.movieClip.getChildByName("Switcher").instance);
    this.addChild(this.switcher);
    this.tf = new ye(this.movieClip.getChildByName("txt").instance);
    return this;
  }
  set text(t) {
    this.tf.text = t.toScString();
    return;
  }
  get text() {
    return this.tf.text;
  }
}

class ts {
  constructor(instance) {
    this.instance = instance;
    this.idk = globalThis.pointers.malloc(16);
    this.idk.writeU64(0);
    this.idk.add(8).writeU64(0);
    return;
  }
  setDefaultAnimation(t) {
    globalThis.natives.SceneCharacter_setDefaultAnimation(this.instance, t, 0);
    return;
  }
  updateFace(t) {
    globalThis.natives.SceneCharacter_updateFace(this.instance, this.idk, t);
    return;
  }
}

var es = class t42 extends pe {
  constructor(t) {
    super(t);
    this.sceneCharacter = new ts(t.add(184).readPointer().readPointer());
    this.sceneCharacter.setDefaultAnimation(3);
    return this;
  }
  static async create(e, i, s, a, n) {
    const mallocResult = globalThis.pointers.malloc(16);
    mallocResult.writeU64(0);
    mallocResult.add(8).writeU64(0);
    let o = null;
    await new Promise((t, l) => {
      ws.addTask(() => {
        let t2;
        try {
          o = globalThis.natives.SceneRendererFactory_createHeroSprite(
            e,
            i,
            s,
            mallocResult,
            0,
            1,
            0,
            1,
            a,
            n,
            0,
          );
          t();
          return;
        } catch (t2) {
          l(t2);
          return;
        }
      });
      return;
    });
    if (!o) {
      throw new Error("Failed to create hero sprite: native pointer is null");
    }
    const l = new t42(o);
    ws.updateObjects.add(l);
    return l;
  }
  update(t) {
    this.sceneCharacter.updateFace(t);
    globalThis.natives.SceneRenderer_update(this.instance, t, 0, 0);
    return;
  }
};

class is extends Ci {
  constructor(mallocResult = globalThis.pointers.malloc(384), e, i, s = 1) {
    globalThis.natives.GameSliderComponent_GameSliderComponent(
      mallocResult,
      e.instance,
      i.instance,
      0,
      s,
    );
    super(mallocResult);
    ws.updateObjects.add(this);
    this._value = 0;
    this.value = 0;
    this.callback = (t, e) => undefined;
    return this;
  }
  get value() {
    return this.instance.add(232).readU32();
  }
  set value(_value) {
    this._value = _value;
    this.instance.add(232).writeU32(_value);
    return;
  }
  set valueBounds({ min: min, max: max }) {
    this.minValue = min;
    this.maxValue = max;
    return;
  }
  set maxValue(t) {
    this.instance.add(240).writeU32(t);
    return;
  }
  set minValue(t) {
    this.instance.add(236).writeU32(t);
    return;
  }
  get maxValue() {
    return this.instance.add(240).readU32();
  }
  get minValue() {
    return this.instance.add(236).readU32();
  }
  set onValueChanged(callback = (t, e) => undefined) {
    this.callback = callback;
    return;
  }
  update() {
    new NativeFunction(this.vtable.add(424).readPointer(), "void", ["pointer"])(this.instance);
    if (this.value !== this._value) {
      this.callback(this.value, this);
      this._value = this.value;
    }
    return;
  }
}

class ss extends is {
  constructor(movieClip = ti.getMovieClip("gui.sc", "Slider")) {
    const childByName = movieClip.getChildByName("slider");
    const childByName2 = childByName.getChildByName("slider_button");
    super(undefined, childByName, childByName2);
    this.blueBar = childByName.getChildByName("bar");
    this.updateBlueBg();
    this.callback = (t) => {
      this.updateBlueBg(t);
      return;
    };
    return this;
  }
  updateBlueBg(t) {
    this.blueBar.gotoAndStopFrameIndex(
      Math.round(((t - this.minValue) / (this.maxValue - this.minValue)) * 99),
    );
    return;
  }
  set onValueChanged(t = (t, e) => undefined) {
    this.callback = (e, i) => {
      this.updateBlueBg(e);
      t(e, i);
      return;
    };
    return;
  }
  set value(t) {
    if (this.blueBar) {
      this.updateBlueBg(t);
    }
    super[
      Reflect.ownKeys({
        value: 0,
      })[0]
    ] = t;
    return;
  }
  get value() {
    return super.value;
  }
}

class as extends Ci {
  constructor() {
    super(undefined, "gui.sc", "SliderItem");
    this.slider = new ss(this.movieClip.getChildByName("slider"));
    this.tf = new ye(this.movieClip.getChildByName("txt").instance);
    return this;
  }
  set text(t) {
    this.tf.text = t.toScString();
    return;
  }
  get text() {
    return this.tf.text;
  }
}

class ns extends we {
  constructor() {
    super(ei.getMovieClip("gui.sc", "Title").instance);
    this.tf = this.getTextFieldByName("txt");
    return this;
  }
  set text(text2) {
    this.tf.text = text2;
    return;
  }
  get text() {
    return this.tf.text;
  }
}

class rs {
  constructor(cols = 3, gap = 10, colWidth = null) {
    this.cols = cols;
    this.gap = gap;
    this.colWidth = colWidth;
    this.col = 0;
    this.y = 0;
    this.rowHeight = 0;
    return;
  }
  nextRow() {
    if (this.col !== 0 || this.rowHeight !== 0) {
      this.y += this.rowHeight + this.gap;
      this.col = 0;
      this.rowHeight = 0;
    }
    return this;
  }
  place(t, colWidth, i, s = 1) {
    if (this.col + s > this.cols) {
      this.nextRow();
    }
    if (this.colWidth === null && s === 1) {
      this.colWidth = colWidth;
    }
    t.pos = {
      x: this.col * (this.colWidth + this.gap),
      y: this.y,
    };
    this.rowHeight = Math.max(this.rowHeight, i);
    this.col += s;
    if (this.col >= this.cols) {
      this.nextRow();
    }
    return t;
  }
}

var os = (t) => Math.min(Math.max(t, 0), 1);

class t43 {
  static variants;
  constructor() {
    return;
  }
  static {
    this.variants = {
      pop: {
        label: "Pop",
        openEase: "easeOutBack",
        closeEase: "easeInBack",
        frame: (t, e) => {
          const quotient = e.pop.startScale / 100;
          return {
            scale: quotient + (1 - quotient) * t,
            alpha: os(1.5 * t),
            x: 0,
            y: (1 - t) * e.pop.distance,
          };
        },
      },
      slide: {
        label: "Slide",
        openEase: "easeOutCubic",
        closeEase: "easeInCubic",
        frame: (t, e) => {
          const product = (1 - t) * e.slide.distance;
          const {
            slide: { direction: direction },
          } = e;
          return {
            scale: 1,
            alpha: os(1.5 * t),
            x: direction === "left" ? -product : direction === "right" ? product : 0,
            y: direction === "top" ? -product : direction === "bottom" ? product : 0,
          };
        },
      },
      zoom: {
        label: "Zoom",
        openEase: "easeOutBack",
        closeEase: "easeInBack",
        frame: (t, e) => {
          const quotient = e.zoom.startScale / 100;
          return {
            scale: quotient + (1 - quotient) * t,
            alpha: os(1.5 * t),
            x: 0,
            y: 0,
          };
        },
      },
      drop: {
        label: "Drop",
        openEase: "easeOutBounce",
        closeEase: "easeInCubic",
        frame: (t, e) => {
          return {
            scale: 1,
            alpha: os(3 * t),
            x: 0,
            y: -(1 - t) * e.drop.distance,
          };
        },
      },
      fade: {
        label: "Fade",
        openEase: "easeOutCubic",
        closeEase: "easeInCubic",
        frame: (t) => {
          return {
            scale: 1,
            alpha: os(t),
            x: 0,
            y: 0,
          };
        },
      },
    };
  }
  static get(e) {
    return t43.variants[e] ?? t43.variants.pop;
  }
  static frame(e, i) {
    return t43.get(e.variant).frame(i, e);
  }
}

var ls = t43;

class xs {
  constructor() {
    this.paths = new Map();
    this.circles = new Map();
    this.enabled = false;
    this.hook = null;
    this.environmentRenderer = ptr(0);
    this.wendelsteinOffset = 1024;
    this.wendelsteinSlotOffset = 240;
    this.circlePosition = Memory.alloc(16);
    this.identity = Memory.alloc(24);
    this.identity.writeFloat(1);
    this.identity.add(4).writeFloat(0);
    this.identity.add(8).writeFloat(0);
    this.identity.add(12).writeFloat(1);
    this.identity.add(16).writeFloat(0);
    this.identity.add(20).writeFloat(0);
    const memoryBuffer = Memory.alloc(8);
    memoryBuffer.writeU32(4294967295);
    memoryBuffer.add(4).writeU32(0);
    this.renderColor = memoryBuffer.readU64();
    return;
  }
  setEnabled(t) {
    this.enabled = !!t;
    if (this.enabled && this.hook === null) {
      this.hook = Interceptor.attach(globalThis.offsets.EnvironmentRenderer_renderSprites, {
        onEnter: (t) => {
          this.environmentRenderer = t[0];
          return;
        },
        onLeave: () => this.render(),
      });
    }
    if (!this.enabled) {
      this.clear();
    }
    return;
  }
  create(t, e, i = 1, items = [255, 255, 255, 255], a = 0) {
    if (!Array.isArray(e) || e.length < 2) {
      return null;
    }
    this.remove(t);
    const n = new Cs(e, i, items);
    if (a !== 0) {
      n.update(e, i, items, a);
    }
    this.paths.set(t, n);
    return n;
  }
  update(t, e, i, s, a = 0) {
    if (!Array.isArray(e) || e.length < 2) {
      return null;
    }
    const getResult = this.paths.get(t);
    if (getResult) {
      getResult.update(e, i, s, a);
      return getResult;
    }
    return this.create(t, e, i, s, a);
  }
  updateCircle(t, e, i, s, a, n) {
    if (![e, i, s, a].every(Number.isFinite) || a <= 0) {
      return null;
    }
    let getResult = this.circles.get(t);
    var2: {
      if (!getResult) {
        for (let [t2, e2] of this.circles) {
          if (e2.visible) {
            break;
          } else {
            this.circles.delete(t2);
            getResult = e2;
            getResult ? getResult.update(e, i, s, a, n) : (getResult = new Ns(a, n));
            this.circles.set(t, getResult);
            break var2;
          }
        }
        getResult ? getResult.update(e, i, s, a, n) : (getResult = new Ns(a, n));
        this.circles.set(t, getResult);
      }
    }
    getResult.update(e, i, s, a, n);
    return getResult;
  }
  setVisible(t, e) {
    if (this.paths.get(t) == null) {
      return;
    }
    this.paths.get(t).setVisible(e);
    return;
  }
  setColor(t, e) {
    this.paths.get(t) == null ? undefined : this.paths.get(t).setColor(e);
    if (this.circles.get(t) == null) {
      return;
    }
    this.circles.get(t).setColor(e);
    return;
  }
  render() {
    if (!this.enabled) {
      return;
    }
    for (const t of this.paths.values()) {
      t.render(this.identity, this.renderColor);
    }
    const environmentRenderer = this.environmentRenderer;
    if (!environmentRenderer || environmentRenderer.isNull()) {
      return;
    }
    const pointer = environmentRenderer.add(this.wendelsteinOffset).readPointer();
    if (!pointer || pointer.isNull()) {
      return;
    }
    const addResult = pointer.add(this.wendelsteinSlotOffset);
    for (const t3 of this.circles.values()) {
      if (t3.visible) {
        this.circlePosition.writeFloat(t3.x);
        this.circlePosition.add(4).writeFloat(-t3.y);
        this.circlePosition.add(8).writeFloat(t3.z);
        this.circlePosition.add(12).writeFloat(0);
        globalThis.natives.wendelstein_renderSprite(
          pointer,
          t3.instance,
          this.circlePosition,
          addResult,
          5,
          0,
        );
      }
    }
    return;
  }
  remove(t) {
    const getResult = this.circles.get(t);
    if (getResult) {
      getResult.setVisible(false);
      this.circles.delete(t);
      return;
    }
    const getResult2 = this.paths.get(t);
    if (getResult2) {
      getResult2.destroy();
      this.paths.delete(t);
    }
    return;
  }
  clear() {
    for (const t of this.paths.keys()) {
      this.remove(t);
    }
    for (const t2 of this.circles.values()) {
      t2.setVisible(false);
    }
    return;
  }
}

class As {
  constructor(renderer) {
    this.renderer = renderer;
    return;
  }
  update(t, e, i, s) {
    const uniqueValues = new Set();
    if (!e) {
      this.removeStale(uniqueValues);
      return;
    }
    const record = {
      x: e.x,
      y: e.y,
      z: 0,
    };
    for (const r of t) {
      if (!r.ptr.equals(e.ptr) && !(r.health.current <= 0)) {
        const concatResult = "esp:tracer:".concat(r.globalID);
        const o = r.team === e.team ? i.ownTeam : i.enemy;
        this.renderer.update(
          concatResult,
          [
            record,
            {
              x: r.x,
              y: r.y,
              z: 0,
            },
          ],
          s,
          o,
        );
        uniqueValues.add(concatResult);
      }
    }
    this.removeStale(uniqueValues);
    return;
  }
  removeStale(uniqueValues = new Set()) {
    for (const e of this.renderer.paths.keys()) {
      if (e.startsWith("esp:tracer:") && !uniqueValues.has(e)) {
        this.renderer.remove(e);
      }
    }
    return;
  }
}

class ks {
  constructor(renderer) {
    this.renderer = renderer;
    this.radiusByCharacter = new Map();
    return;
  }
  update(t, e) {
    const uniqueValues = new Set();
    for (const s of t) {
      if (!(s.health.current <= 0)) {
        const concatResult = "esp:hitbox:".concat(s.globalID);
        const { x: x3, y: y3, z: z2 } = s;
        let getResult = this.radiusByCharacter.get(concatResult);
        if (getResult === undefined) {
          getResult = Number(s.radius);
          if (Number.isFinite(getResult) && getResult > 0) {
            this.radiusByCharacter.set(concatResult, getResult);
          }
        }
        if (Number.isFinite(getResult) && getResult > 0) {
          this.renderer.updateCircle(concatResult, x3, y3, z2, getResult, [e.r, e.g, e.b, 220]);
          uniqueValues.add(concatResult);
        }
      }
    }
    this.removeStale(uniqueValues);
    return;
  }
  removeStale(uniqueValues = new Set()) {
    for (const e of [...this.renderer.paths.keys(), ...this.renderer.circles.keys()]) {
      if (e.startsWith("esp:hitbox:") && !uniqueValues.has(e)) {
        this.renderer.remove(e);
        this.radiusByCharacter.delete(e);
      }
    }
    return;
  }
}
