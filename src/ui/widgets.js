/**
 * ui/widgets.js
 *
 * Reusable UI widgets (small popup, scroll areas, buttons).
 *
 * Symbols: SmallPopupWidget, SmallPopupWidgetAlias, t60, Aa, ka
 * Source: bundle lines 17365-28760 (5 statements)
 */


class SmallPopupWidget extends Ci {
  static instances;
  constructor() {
    super(undefined, "gui.sc", "SmallPopup");
    this._hideOnMenuHide = true;
    this._button = new gi();
    this._button.movieClipWithoutAnim = this.movieClip.getChildByName("btn");
    this.movieClip.addChild(this._button);
    this._button.movieClip.gotoAndStopFrameIndex(0);
    this._buttonAnimationTimeout = null;
    this._itemArea = null;
    this._bodyTextField = null;
    this._itemAreaWidth = 0;
    this._itemAreaHeight = 0;
    this._itemCursorY = 0;
    this._items = [];
    this._inputField = null;
    this._inputActive = false;
    this.setXY(si.screenWidth / 2, si.screenHeight / 2);
    si.addChild(this);
    this.show();
    SmallPopupWidget.instances.add(this);
    return this;
  }
  static {
    this.instances = new Set();
  }
  get button() {
    return this._button;
  }
  get hideOnMenuHide() {
    return this._hideOnMenuHide;
  }
  set hideOnMenuHide(t) {
    this._hideOnMenuHide = Boolean(t);
    return;
  }
  get title() {
    return this.movieClip.getTextFieldByName("title").text;
  }
  set title(t) {
    this.movieClip.getTextFieldByName("title").text = String(t);
    return;
  }
  get text() {
    return (this._bodyTextField ?? this.movieClip.getTextFieldByName("text")).text;
  }
  set text(t) {
    (this._bodyTextField ?? this.movieClip.getTextFieldByName("text")).text = String(t);
    return;
  }
  get itemArea() {
    return this._itemArea;
  }
  createItemArea() {
    if (this._itemArea) {
      return this._itemArea;
    }
    const _bodyTextField = this.movieClip.getTextFieldByName("text");
    this._bodyTextField = _bodyTextField;
    this._itemAreaWidth = _bodyTextField.width;
    this._itemAreaHeight = _bodyTextField.height;
    this._itemArea = fe.create();
    this._itemArea.setXY(_bodyTextField.x, _bodyTextField.y);
    this.movieClip.removeChild(_bodyTextField);
    _bodyTextField.setXY(0, 0);
    _bodyTextField.visible = false;
    this._itemArea.addChild(_bodyTextField);
    this.movieClip.addChild(this._itemArea);
    this._itemCursorY = -this._itemAreaHeight / 2;
    return this._itemArea;
  }
  addItem(t) {
    const itemArea = this.createItemArea();
    const height = t.height;
    t.setXY(0, this._itemCursorY + height / 2);
    itemArea.addChild(t);
    this._items.push(t);
    this._itemCursorY += height + 5;
    return t;
  }
  addInputField() {
    if (this._inputField) {
      return this._inputField;
    }
    this.createItemArea();
    const _bodyTextField = this._bodyTextField;
    _bodyTextField.setXY(0, 0);
    _bodyTextField.visible = true;
    const mallocResult = globalThis.pointers.malloc(200);
    this._inputField = new ds(mallocResult, _bodyTextField, this.instance);
    this._inputField.setMaxTextLength(256);
    this._inputField.activate(true);
    this._inputActive = true;
    return this._inputField;
  }
  hide() {
    if (this._inputActive && this._inputField) {
      this._inputActive = false;
      this._inputField.activate(false);
    }
    super.hide.call(this);
    return;
  }
  set buttonCallback(t) {
    this._button.buttonListener = new mi(() => {
      this._button.movieClip.gotoAndPlayToFrameIndexAnyDirection(0, 14);
      if (this._buttonAnimationTimeout !== null) {
        clearTimeout(this._buttonAnimationTimeout);
      }
      this._buttonAnimationTimeout = setTimeout(() => {
        this._button.movieClip.gotoAndStopFrameIndex(0);
        this._buttonAnimationTimeout = null;
        return;
      }, 500);
      if (t == null) {
        return;
      }
      t();
      return;
    });
    return;
  }
  static hideForMenuHide() {
    for (const e of SmallPopupWidget.instances) {
      if (e.hideOnMenuHide) {
        e.hide();
      }
    }
    return;
  }
}

var SmallPopupWidgetAlias = SmallPopupWidget;

class t60 extends ve {
  static instance;
  constructor() {
    super(ti.getMovieClip("sc/debug.sc", "debug_menu_text").instance);
    this.textField = this.getTextFieldByName("Text");
    this.setXY(140, 90);
    this.scale = 1.3;
    this.textField.colorTransform = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.textField.text = "Null Rythm v69.230.0 (dev)\nt.me/nullrythm\ndsc.gg/nrythm";
    return this;
  }
  static {
    this.instance = null;
  }
  static get homeSprite() {
    const pointer = globalThis.offsets.GameMain_instance.readPointer();
    if (pointer.isNull()) {
      return null;
    }
    const pointer2 = pointer.add(104).readPointer();
    if (pointer2.isNull()) {
      return null;
    }
    return new fe(pointer2);
  }
  static create() {
    const homeSprite = this.homeSprite;
    if (homeSprite) {
      if (this.instance) {
        this.destruct();
      }
      this.instance = new t60();
      this.instance.visible = true;
      homeSprite.addChild(this.instance);
    }
    return;
  }
  static destruct() {
    if (!this.instance) {
      return;
    }
    this.instance.visible = false;
    const homeSprite = this.homeSprite;
    if (homeSprite) {
      homeSprite.removeChild(this.instance);
    }
    this.instance = null;
    return;
  }
  static update() {
    if (re.isState(re.states.HOME)) {
      if (!this.instance) {
        this.create();
      }
      if (this.instance) {
        this.instance.visible = true;
        return;
      }
    }
    return;
  }
}

var Aa = t60;

var ka = Aa;
