/**
 * ui/menu.js
 *
 * In-game mod menu: tabs, categories, buttons, sliders, layout and animations.
 *
 * Symbols: t45, ms, fs, bs
 * Source: bundle lines 17568-20036 (4 statements)
 */


class t45 extends Mi {
  static isMenuCreated;
  static menuToggle;
  static staggerDelay;
  static staggerDuration;
  static xrayMenuController;
  constructor() {
    super(undefined, "gui.sc", "MainMenu");
    this.baseScale = Wi.scale / 100;
    this.baseAlpha = this.colorTransform.a;
    this.scale = this.baseScale;
    this.draggability = !Wi.lockMenu;
    this.isOpen = false;
    this.animValue = 0;
    this.slideOffset = {
      x: 0,
      y: 0,
    };
    this.categoryArea = new Ki(this.movieClip.getChildByName("left_item_area"), this);
    this.addChild(this.categoryArea);
    return this;
  }
  static {
    this.isMenuCreated = false;
    this.menuToggle = null;
    this.staggerDelay = 0.059999999999999998;
    this.staggerDuration = 0.34999999999999998;
    this.xrayMenuController = null;
  }
  open() {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.applyAnimation(this.animValue);
    this.visibility = 1;
    const getResult = ls.get(Wi.animation.variant);
    this.animateTo(1, Wi.animation.openDuration / 1000, record6[getResult.openEase]);
    this.playCategoryStagger();
    return;
  }
  close(t) {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    SmallPopupWidgetAlias.hideForMenuHide();
    this.resetCategoryButtons();
    const getResult = ls.get(Wi.animation.variant);
    this.animateTo(0, Wi.animation.closeDuration / 1000, record6[getResult.closeEase], () => {
      this.visibility = 0;
      this.resetVisuals();
      if (t == null) {
        return;
      }
      t();
      return;
    });
    return;
  }
  preview() {
    this.close(() => this.open());
    return;
  }
  setBaseScale(baseScale) {
    this.baseScale = baseScale;
    if (this.visibility) {
      this.applyAnimation(this.animValue);
      return;
    }
    this.scale = this.baseScale;
    return;
  }
  applyPosition() {
    const position = Wi.position;
    this.pos = {
      x: (position.menuSaved ? position.menuX : si.screenWidth / 2) + this.slideOffset.x,
      y: (position.menuSaved ? position.menuY : si.screenHeight / 2) + this.slideOffset.y,
    };
    return;
  }
  resetPosition() {
    Wi.position.menuSaved = false;
    this.applyPosition();
    return;
  }
  toggle() {
    if (this.isOpen) {
      this.close();
      return;
    }
    this.open();
    return;
  }
  animateTo(t, e, i, s) {
    ji.tween({
      key: this,
      from: this.animValue,
      to: t,
      duration: e,
      ease: i,
      onUpdate: (t) => this.applyAnimation(t),
      onComplete: s,
    });
    return;
  }
  applyAnimation(animValue) {
    const frameResult = ls.frame(Wi.animation, animValue);
    this.animValue = animValue;
    this.scale = this.baseScale * frameResult.scale;
    this.colorTransform = {
      a: Math.round(this.baseAlpha * frameResult.alpha),
    };
    this.x += frameResult.x - this.slideOffset.x;
    this.y += frameResult.y - this.slideOffset.y;
    this.slideOffset = {
      x: frameResult.x,
      y: frameResult.y,
    };
    return;
  }
  resetVisuals() {
    this.x -= this.slideOffset.x;
    this.y -= this.slideOffset.y;
    this.slideOffset = {
      x: 0,
      y: 0,
    };
    this.animValue = 0;
    this.scale = this.baseScale;
    this.colorTransform = {
      a: this.baseAlpha,
    };
    return;
  }
  playCategoryStagger() {
    if (!Wi.animation.stagger) {
      return;
    }
    let e = 0;
    this.categoryArea.buttons.forEach((i) => {
      i.baseScale ??= i.scaleX;
      i.scale = 0.01 * i.baseScale;
      ji.tween({
        key: i,
        duration: t45.staggerDuration,
        delay: t45.staggerDelay + (e++ * Wi.animation.staggerStep) / 1000,
        ease: record6.easeOutBack,
        onUpdate: (t) => (i.scale = i.baseScale * Math.max(t, 0.01)),
      });
      return;
    });
    return;
  }
  resetCategoryButtons() {
    this.categoryArea.buttons.forEach((t) => {
      ji.cancel(t);
      if (t.baseScale !== undefined) {
        t.scale = t.baseScale;
      }
      return;
    });
    return;
  }
  static create() {
    if (t45.isMenuCreated) {
      return;
    }
    t45.menuToggle = new gi();
    t45.menuToggle.movieClip = ei.getMovieClip("sc/ui.sc", "map_editor_exit_button");
    t45.applyTogglePosition();
    t45.menuToggle.draggability = !Wi.lockButton;
    t45.menuToggle.text = "MENU".toScString();
    t45.menuToggle.buttonListener = new mi(() => {
      menu.toggle();
      return;
    });
    si.addChild(t45.menuToggle);
    const menu = new t45();
    menu.applyPosition();
    si.addChild(menu);
    t45.isMenuCreated = true;
    globalThis.menu = menu;
    t45.init();
    menu.visibility = 0;
    return menu;
  }
  static applyTogglePosition() {
    const position = Wi.position;
    t45.menuToggle.pos = position.buttonSaved
      ? {
          x: position.buttonX,
          y: position.buttonY,
        }
      : {
          x: t45.menuToggle.width / 2,
          y: si.screenHeight - 2 * t45.menuToggle.height,
        };
    return;
  }
  static resetTogglePosition() {
    Wi.position.buttonSaved = false;
    t45.applyTogglePosition();
    return;
  }
  static savePositions() {
    const position = Wi.position;
    const menu = globalThis.menu;
    position.menuSaved = true;
    position.menuX = menu.x - menu.slideOffset.x;
    position.menuY = menu.y - menu.slideOffset.y;
    position.buttonSaved = true;
    position.buttonX = t45.menuToggle.x;
    position.buttonY = t45.menuToggle.y;
    return;
  }
  static createButton(t, e, i, s = false) {
    const a = new Ji();
    a.text = t.toScString();
    e.place(a, a.width, a.height);
    if (s) {
      a.activate();
    }
    a.buttonListener = new mi(() => {
      i(a);
      return;
    });
    return a;
  }
  static createSwitcherItem(text2, e, i) {
    const s = new Zi();
    s.text = text2;
    e.place(s, s.width, s.height);
    s.switcher.buttonListener = new mi(() => {
      s.switcher.toggle();
      i(s.switcher.isActive);
      return;
    });
    return s;
  }
  static createChoiceGroup(e, i, s, a, n) {
    const items = [];
    for (const o of s) {
      const button = t45.createButton(
        o.label,
        i,
        (t) => {
          items.forEach((e) => {
            if (e !== t) {
              e.deactivate();
            }
            return;
          });
          t.activate();
          n(o.value);
          return;
        },
        o.value === a,
      );
      items.push(button);
      e.addItem(button);
    }
    i.nextRow();
    return;
  }
  static createTitle(t, e, cols = e.cols, scale = 1) {
    const a = new ns();
    a.text = t.toScString();
    const { width: width, height: height } = a;
    a.scale = scale;
    e.place(a, width * scale, height * scale, cols);
    return a;
  }
  static createSliderItem(t, e, i, minValue, maxValue, value, r = (t) => t) {
    const o = new as();
    const childByName = o.movieClip.getChildByName("bg");
    o.text = t + r(value);
    e.place(o, childByName.width, childByName.height);
    o.slider.minValue = minValue;
    o.slider.maxValue = maxValue;
    o.slider.value = value;
    o.slider.onValueChanged = (e, s) => {
      o.text = t + r(e);
      i(e, s);
      return;
    };
    return o;
  }
  static createThemeButton(e, i, s) {
    const isThemeActive = _a.themeChanger.isThemeActive(e);
    return t45.createButton(
      e.name,
      i,
      (i) => {
        t45.deactivateAllButtonsExcept(s, [i]);
        i.activate();
        _a.changeTheme(e.key);
        return;
      },
      isThemeActive,
    );
  }
  static createResetThemeButton(e, i) {
    return t45.createButton("Reset", i, (i) => {
      i.playClickAnim();
      t45.deactivateAllButtonsExcept(e);
      _a.themeChanger.setDefaultTheme();
      return;
    });
  }
  static deactivateAllButtonsExcept(t, items = []) {
    t.items.forEach((t) => {
      if (!items.includes(t) && t instanceof Ji) {
        t.deactivate();
      }
      return;
    });
    return;
  }
  static createCameraButton(e, i, s, a) {
    return t45.createButton(
      e,
      i,
      (i) => {
        _a.setCameraMode(e);
        t45.deactivateAllButtonsExcept(a, [i]);
        i.activate();
        return;
      },
      s,
    );
  }
  static createResetCameraButton(e, i) {
    return t45.createButton("Reset", i, (t) => {
      t.playClickAnim();
      const mode = "default";
      e.items.forEach((t) => {
        if (t instanceof Ji && t.text === mode) {
          t.activate();
          return;
        }
        return;
      });
      _a.camera.mode = mode;
      return;
    });
  }
  static async createOutlineTab(e) {
    const addTabResult = e.addTab("Outline");
    const s = new rs();
    const createResult = await es.create(
      3,
      $t.getDataByIdNative(16000039),
      $t.getDataByIdNative(29000206),
      100,
      350,
    );
    createResult.pos = {
      x: 400,
      y: 340,
    };
    addTabResult.addItem(createResult);
    const switcherItem = t45.createSwitcherItem("Toggle: ", s, () => {
      _a.outlineColor.toggle();
      return;
    });
    _a.outlineColor.enabled ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    s.nextRow();
    const items = [
      ["Red: ", "r"],
      ["Green: ", "g"],
      ["Blue: ", "b"],
      ["Alpha: ", "a"],
    ];
    for (let [e2, a2] of items) {
      const sliderItem = t45.createSliderItem(
        e2,
        s,
        (t) => (_a.outlineColor[a2] = t),
        0,
        255,
        _a.outlineColor[a2],
      );
      addTabResult.addItem(sliderItem);
      s.nextRow();
    }
    return;
  }
  static async createVisualsCategory() {
    const addItemResult = globalThis.menu.categoryArea.addItem("Visuals");
    const addTabResult = addItemResult.addTab("ESP");
    const s = new rs();
    const switcherItem = t45.createSwitcherItem("Toggle: ", s, () => {
      _a.esp.toggle();
      return;
    });
    _a.esp.state ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    s.nextRow();
    const n = (e, a) => {
      const button = t45.createButton(
        e,
        s,
        (t) => {
          _a.esp.config[a] = !_a.esp.config[a];
          if (_a.esp.config[a]) {
            t.activate();
            return;
          }
          t.deactivate();
          return;
        },
        _a.esp.config[a],
      );
      addTabResult.addItem(button);
      s.nextRow();
      return;
    };
    const r = (e, a, n) => {
      const r = a ? _a.esp.config[e][a] : _a.esp.config[e];
      addTabResult.addItem(
        t45.createSliderItem(
          "".concat(n.toUpperCase(), ": "),
          s,
          (t) => {
            r[n] = Math.round(t);
            return;
          },
          0,
          255,
          r[n],
          (t) => "".concat(Math.round(t)),
        ),
      );
      return;
    };
    const o = (e, a) => {
      for (let [e, n] of a) {
        addTabResult.addItem(t45.createTitle(e, s, 1, 0.75));
      }
      s.nextRow();
      for (const t of ["r", "g", "b"]) {
        for (let [, i2] of a) {
          r(e, i2, t);
        }
        s.nextRow();
      }
      return;
    };
    addTabResult.addItem(t45.createTitle("Hitboxes:", s));
    n("Hitboxes", "hitboxes");
    (() => {
      for (const t of ["r", "g", "b"]) {
        r("hitboxColor", null, t);
        s.nextRow();
      }
      return;
    })();
    addTabResult.addItem(t45.createTitle("Range:", s));
    n("Range", "range");
    o("rangeColors", [
      ["Basic:", "basic"],
      ["Super:", "super"],
      ["Gadget:", "gadget"],
    ]);
    addTabResult.addItem(t45.createTitle("Tracers:", s));
    n("Tracers", "tracers");
    for (let [e2, a2, n2, r2] of [
      ["Thickness: ", "tracerThickness", 1, 30],
      ["Limit Players: ", "maxTracers", 1, 11],
    ]) {
      addTabResult.addItem(
        t45.createSliderItem(
          e2,
          s,
          (t) => {
            _a.esp.config[a2] = Math.round(t);
            return;
          },
          n2,
          r2,
          _a.esp.config[a2],
          (t) => {
            if (a2 === "maxTracers" && Math.round(t) >= 11) {
              return "∞";
            }
            return "".concat(Math.round(t));
          },
        ),
      );
    }
    s.nextRow();
    o("tracerColors", [
      ["Own Team:", "ownTeam"],
      ["Enemy:", "enemy"],
    ]);
    const addTabResult2 = addItemResult.addTab("Ball Trajectory");
    const c = new rs();
    const switcherItem2 = t45.createSwitcherItem("Toggle: ", c, (enabled) => {
      _a.extendBallTrajectory.setEnabled(enabled);
      return;
    });
    _a.extendBallTrajectory.state
      ? switcherItem2.switcher.activate()
      : switcherItem2.switcher.deactivate();
    addTabResult2.addItem(switcherItem2);
    const addTabResult3 = addItemResult.addTab("Show Ammo");
    const u = new rs();
    const switcherItem3 = t45.createSwitcherItem("Toggle: ", u, (enabled) => {
      _a.showAmmo.setEnabled(enabled);
      return;
    });
    _a.showAmmo.state ? switcherItem3.switcher.activate() : switcherItem3.switcher.deactivate();
    addTabResult3.addItem(switcherItem3);
    const addTabResult4 = addItemResult.addTab("Anti Fade");
    const m = new rs();
    const switcherItem4 = t45.createSwitcherItem("Toggle: ", m, (enabled) => {
      _a.antiFade.setEnabled(enabled);
      return;
    });
    _a.antiFade.state ? switcherItem4.switcher.activate() : switcherItem4.switcher.deactivate();
    addTabResult4.addItem(switcherItem4);
    const addTabResult5 = addItemResult.addTab("Show Trophies");
    const y = new rs();
    const switcherItem5 = t45.createSwitcherItem("Toggle: ", y, (enabled) => {
      _a.showTrophies.setEnabled(enabled);
      return;
    });
    _a.showTrophies.state ? switcherItem5.switcher.activate() : switcherItem5.switcher.deactivate();
    addTabResult5.addItem(switcherItem5);
    const w = (e, i, s) => {
      const button = t45.createButton(
        e,
        y,
        (t) => {
          _a.showTrophies.config[i][s] = !_a.showTrophies.config[i][s];
          if (_a.showTrophies.config[i][s]) {
            t.activate();
            return;
          }
          t.deactivate();
          return;
        },
        _a.showTrophies.config[i][s],
      );
      addTabResult5.addItem(button);
      return;
    };
    addTabResult5.addItem(t45.createTitle("Teams:", y));
    w("Me", "teams", "me");
    w("Enemy", "teams", "enemy");
    y.nextRow();
    addTabResult5.addItem(t45.createTitle("Trophies:", y));
    w("Total", "trophies", "total");
    w("Current Brawler", "trophies", "brawler");
    const addTabResult6 = addItemResult.addTab("Theme");
    const T = new rs();
    _a.getThemes().forEach((e) => {
      addTabResult6.addItem(t45.createThemeButton(e, T, addTabResult6));
      return;
    });
    addTabResult6.addItem(t45.createResetThemeButton(addTabResult6, T));
    await t45.createOutlineTab(addItemResult);
    const addTabResult7 = addItemResult.addTab("Camera");
    const C = new rs();
    _a.camera.modes.forEach((e) => {
      addTabResult7.addItem(t45.createCameraButton(e, C, e === _a.camera.mode, addTabResult7));
      return;
    });
    addTabResult7.addItem(t45.createResetCameraButton(addTabResult7, C));
    C.nextRow();
    const switcherItem6 = t45.createSwitcherItem("NoShake", C, () => {
      _a.screenShake.toggle();
      return;
    });
    _a.screenShake.enable ? switcherItem6.switcher.activate() : switcherItem6.switcher.deactivate();
    addTabResult7.addItem(switcherItem6);
    return;
  }
  static createHomeCategory() {
    const addTabResult = globalThis.menu.categoryArea.addItem("Home").addTab("Info");
    const e = new ns();
    e.text = "News";
    e.scale = 1.5;
    addTabResult.addItem(e);
    const movieClip = ei.getMovieClip("sc/debug.sc", "debug_menu_text");
    const textFieldByName = movieClip.getTextFieldByName("Text");
    const text2 = new HttpClient().GET("https://2.27.22.190/news").toLocaleString();
    textFieldByName.outline = 0;
    textFieldByName.colorTransform = {
      r: 203,
      g: 203,
      b: 203,
    };
    textFieldByName.text = text2;
    movieClip.scale = 2.5;
    movieClip.pos = {
      y: e.height,
    };
    addTabResult.addItem(movieClip);
    return;
  }
  static createCheatsCategory() {
    const addItemResult = globalThis.menu.categoryArea.addItem("Cheats");
    const addTabResult = addItemResult.addTab("Dodge");
    const s = new rs();
    const switcherItem = t45.createSwitcherItem("Toggle: ", s, () => {
      _a.toggleDodge();
      return;
    });
    _a.dodge.state ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Mode:", s));
    s.nextRow();
    t45.createChoiceGroup(
      addTabResult,
      s,
      [
        {
          value: "static",
          label: "Static",
        },
        {
          value: "continuous",
          label: "Continuous",
        },
      ],
      _a.dodge.config.mode,
      (t) => {
        if (t === _a.dodge.config.mode) {
          return;
        }
        const e = record3[_a.dodge.config.mode];
        const i = record3[t];
        _a.dodge.setMode(t);
        const {
          transitions: { tabs: tabs },
        } = Wi;
        if (!tabs.enabled) {
          e.hide();
          i.show();
          return;
        }
        const distance = tabs.distance;
        const quotient = tabs.duration / 1000;
        const o = t === "continuous" ? 1 : -1;
        ji.slideIn(i, o * distance, 0, quotient);
        ji.slideOut(e, -o * distance, 0, 0.55000000000000004 * quotient);
        return;
      },
    );
    const n = (e) => {
      const s = new rs();
      const items = [];
      const n = _a.dodge.config[e];
      const r = (t) => {
        items.push(t);
        addTabResult.addItem(t);
        return;
      };
      r(t45.createTitle("Config:", s));
      s.nextRow();
      if (e === "static") {
        r(
          t45.createSliderItem(
            "Directions: ",
            s,
            (directions) => {
              n.directions = directions;
              return;
            },
            4,
            360,
            n.directions,
          ),
        );
        r(
          t45.createSliderItem(
            "Safety Margin: ",
            s,
            (safetyMargin) => {
              n.safetyMargin = safetyMargin;
              return;
            },
            0,
            200,
            n.safetyMargin,
          ),
        );
        r(
          t45.createSliderItem(
            "Predictor Lookup: ",
            s,
            (predictorLookup) => {
              n.predictorLookup = predictorLookup;
              return;
            },
            0,
            999,
            n.predictorLookup,
          ),
        );
        s.nextRow();
        const button = t45.createButton(
          "Predictor",
          s,
          () => {
            n.predictor = !n.predictor;
            if (n.predictor) {
              button.activate();
              return;
            }
            button.deactivate();
            return;
          },
          n.predictor,
        );
        r(button);
      } else {
        r(
          t45.createSliderItem(
            "Minimum Distance: ",
            s,
            (minDistance) => {
              n.minDistance = minDistance;
              return;
            },
            0,
            20,
            n.minDistance,
          ),
        );
        r(
          t45.createSliderItem(
            "Dodge Chance: ",
            s,
            (chance) => {
              n.chance = chance;
              return;
            },
            0,
            100,
            n.chance,
            (t) => "".concat(t, "%"),
          ),
        );
        r(
          t45.createSliderItem(
            "Reaction Min: ",
            s,
            (reactionMin) => {
              n.reactionMin = reactionMin;
              return;
            },
            0,
            1000,
            n.reactionMin,
            (t) => "".concat(t, " ms"),
          ),
        );
        r(
          t45.createSliderItem(
            "Reaction Max: ",
            s,
            (reactionMax) => {
              n.reactionMax = reactionMax;
              return;
            },
            0,
            1000,
            n.reactionMax,
            (t) => "".concat(t, " ms"),
          ),
        );
        r(
          t45.createSliderItem(
            "Return Delay: ",
            s,
            (returnDelay) => {
              n.returnDelay = returnDelay;
              return;
            },
            0,
            1000,
            n.returnDelay,
            (t) => "".concat(t, " ms"),
          ),
        );
        r(
          t45.createSliderItem(
            "Change Delay: ",
            s,
            (changeDelay) => {
              n.changeDelay = changeDelay;
              return;
            },
            0,
            1000,
            n.changeDelay,
            (t) => "".concat(t, " ms"),
          ),
        );
      }
      const record = {
        slideItems: items,
        height: Math.max(0, ...items.map((t) => t.y + t.height)),
        visibility: false,
        show() {
          this.visibility = true;
          items.forEach((t) => t.show());
          return;
        },
        hide() {
          this.visibility = false;
          items.forEach((t) => t.hide());
          return;
        },
      };
      record.hide();
      return record;
    };
    const record3 = {
      static: n("static"),
      continuous: n("continuous"),
    };
    const y3 = s.y;
    const maxResult = Math.max(record3.static.height, record3.continuous.height);
    for (const t of Object.values(record3)) {
      t.slideItems.forEach((t) => {
        t.y += y3;
        return;
      });
    }
    record3[_a.dodge.config.mode].show();
    s.y += maxResult + s.gap;
    s.col = 0;
    s.rowHeight = 0;
    addTabResult.addItem(t45.createTitle("Ignore:", s));
    s.nextRow();
    const button2 = t45.createButton(
      "Ignore Undodgeable",
      s,
      () => {
        _a.dodge.ignore.ignoreUndodgeable = !_a.dodge.ignore.ignoreUndodgeable;
        if (_a.dodge.ignore.ignoreUndodgeable) {
          button2.activate();
          return;
        }
        button2.deactivate();
        return;
      },
      _a.dodge.ignore.ignoreUndodgeable,
    );
    const button3 = t45.createButton(
      "Ignore Throwers",
      s,
      () => {
        _a.dodge.ignore.ignoreThrowers = !_a.dodge.ignore.ignoreThrowers;
        if (_a.dodge.ignore.ignoreThrowers) {
          button3.activate();
          return;
        }
        button3.deactivate();
        return;
      },
      _a.dodge.ignore.ignoreThrowers,
    );
    addTabResult.addItem(button2);
    addTabResult.addItem(button3);
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Minimum Range: ",
        s,
        (minRange) => {
          _a.dodge.ignore.minRange = minRange;
          return;
        },
        0,
        30,
        _a.dodge.ignore.minRange,
      ),
    );
    const sliderItem = t45.createSliderItem(
      "Maximum Spread: ",
      s,
      (maxSpread) => {
        _a.dodge.ignore.maxSpread = maxSpread;
        return;
      },
      0,
      120,
      _a.dodge.ignore.maxSpread,
      (t) => {
        if (t >= 120) {
          return "∞";
        }
        return t;
      },
    );
    addTabResult.addItem(sliderItem);
    const addTabResult2 = addItemResult.addTab("Aimbot");
    const g = new rs();
    const switcherItem2 = t45.createSwitcherItem("Toggle: ", g, () => {
      _a.toggleAimbot();
      return;
    });
    _a.aimbot.state ? switcherItem2.switcher.activate() : switcherItem2.switcher.deactivate();
    addTabResult2.addItem(switcherItem2);
    g.nextRow();
    addTabResult2.addItem(
      t45.createSliderItem(
        "Strength: ",
        g,
        (t) => {
          _a.aimbot.config.strength = t - 100;
          return;
        },
        0,
        200,
        _a.aimbot.config.strength + 100,
        (t) => t - 100,
      ),
    );
    g.nextRow();
    const button4 = t45.createButton(
      "Aim When Needed",
      g,
      () => {
        _a.aimbot.config.aimWhenNeeded = !_a.aimbot.config.aimWhenNeeded;
        if (_a.aimbot.config.aimWhenNeeded) {
          button4.activate();
          return;
        }
        button4.deactivate();
        return;
      },
      _a.aimbot.config.aimWhenNeeded,
    );
    addTabResult2.addItem(button4);
    g.nextRow();
    const button5 = t45.createButton(
      "Allow when aiming",
      g,
      () => {
        _a.aimbot.config.allowWhenAiming = !_a.aimbot.config.allowWhenAiming;
        if (_a.aimbot.config.allowWhenAiming) {
          button5.activate();
          return;
        }
        button5.deactivate();
        return;
      },
      _a.aimbot.config.allowWhenAiming,
    );
    addTabResult2.addItem(button5);
    g.nextRow();
    addTabResult2.addItem(t45.createTitle("Speed Detection:", g));
    g.nextRow();
    const items2 = [
      {
        value: "data",
        label: "Data",
      },
      {
        value: "hybrid",
        label: "Hybrid",
      },
      {
        value: "interval",
        label: "Interval",
      },
    ];
    for (const e2 of items2) {
      const button6 = t45.createButton(
        e2.label,
        g,
        (i) => {
          _a.aimbot.config.speedDetection = e2.value;
          t45.deactivateAllButtonsExcept(addTabResult2, [i]);
          i.activate();
          return;
        },
        _a.aimbot.config.speedDetection === e2.value,
      );
      addTabResult2.addItem(button6);
    }
    const addTabResult3 = addItemResult.addTab("Autogoal");
    const v = new rs();
    const switcherItem3 = t45.createSwitcherItem("Toggle: ", v, () => {
      _a.toggleAutogoal();
      return;
    });
    _a.autogoal.state ? switcherItem3.switcher.activate() : switcherItem3.switcher.deactivate();
    addTabResult3.addItem(switcherItem3);
    const addTabResult4 = addItemResult.addTab("AutoFarm");
    const T = new rs(3, 10);
    const autoFarm = _a.autoFarm;
    const switcherItem4 = t45.createSwitcherItem("Toggle: ", T, (enabled) => {
      autoFarm.setEnabled(enabled);
      return;
    });
    autoFarm.state ? switcherItem4.switcher.activate() : switcherItem4.switcher.deactivate();
    addTabResult4.addItem(switcherItem4);
    T.nextRow();
    addTabResult4.addItem(t45.createTitle("Abilities:", T));
    T.nextRow();
    for (const e3 of [
      {
        name: "Auto Ready",
        key: "autoReady",
      },
      {
        name: "Auto Exit",
        key: "autoExit",
      },
      {
        name: "Basic Attack",
        key: "autoAttackBasic",
      },
      {
        name: "Switch Brawler",
        key: "allowSwitch",
      },
    ]) {
      const button7 = t45.createButton(
        e3.name,
        T,
        (t) => {
          autoFarm.settings[e3.key] = !t.isActive;
          if (t.isActive) {
            t.deactivate();
            return;
          }
          t.activate();
          return;
        },
        autoFarm.settings[e3.key],
      );
      addTabResult4.addItem(button7);
    }
    addTabResult4.addItem(t45.createTitle("Target Mode:", T));
    T.nextRow();
    t45.createChoiceGroup(
      addTabResult4,
      T,
      [
        {
          label: "Keep One",
          value: "single",
        },
        {
          label: "Change Dynamically",
          value: "dynamic",
        },
      ],
      autoFarm.settings.switchMode,
      (switchMode) => {
        autoFarm.settings.switchMode = switchMode;
        return;
      },
    );
    addTabResult4.addItem(t45.createTitle("Brawler Selection:", T));
    T.nextRow();
    t45.createChoiceGroup(
      addTabResult4,
      T,
      [
        {
          label: "Lowest",
          value: "lowest",
        },
        {
          label: "Highest",
          value: "highest",
        },
      ],
      autoFarm.settings.trophyMode,
      (trophyMode) => {
        autoFarm.settings.trophyMode = trophyMode;
        return;
      },
    );
    for (const e4 of [
      {
        label: "Min Trophies: ",
        key: "trophyGoal",
        index: 0,
        min: 0,
        max: 1500,
      },
      {
        label: "Max Trophies: ",
        key: "trophyGoal",
        index: 1,
        min: 0,
        max: 1500,
      },
      {
        label: "Min Power: ",
        key: "powerLevels",
        index: 0,
        min: 1,
        max: 11,
      },
      {
        label: "Max Power: ",
        key: "powerLevels",
        index: 1,
        min: 1,
        max: 11,
      },
    ]) {
      const sliderItem2 = t45.createSliderItem(
        e4.label,
        T,
        (t) => {
          const i = autoFarm.settings[e4.key];
          const roundResult = Math.round(t);
          i[e4.index] = e4.index === 0 ? Math.min(roundResult, i[1]) : Math.max(roundResult, i[0]);
          return;
        },
        e4.min,
        e4.max,
        autoFarm.settings[e4.key][e4.index],
        (t) => Math.round(t),
      );
      addTabResult4.addItem(sliderItem2);
    }
    const addTabResult5 = addItemResult.addTab("Hide Aim");
    const x = new rs();
    const switcherItem5 = t45.createSwitcherItem("Toggle: ", x, (enabled) => {
      _a.hideAim.setEnabled(enabled);
      return;
    });
    _a.hideAim.state ? switcherItem5.switcher.activate() : switcherItem5.switcher.deactivate();
    addTabResult5.addItem(switcherItem5);
    x.nextRow();
    addTabResult5.addItem(t45.createTitle("Skills:", x));
    x.nextRow();
    for (const e5 of [
      {
        key: "basic",
        label: "Basic",
      },
      {
        key: "ulti",
        label: "Ulti",
      },
      {
        key: "gadget",
        label: "Gadget",
      },
    ]) {
      const button8 = t45.createButton(
        e5.label,
        x,
        (t) => {
          _a.hideAim.config[e5.key] = !_a.hideAim.config[e5.key];
          if (_a.hideAim.config[e5.key]) {
            t.activate();
            return;
          }
          t.deactivate();
          return;
        },
        _a.hideAim.config[e5.key],
      );
      addTabResult5.addItem(button8);
    }
    x.nextRow();
    const button9 = t45.createButton(
      "Hide Active Gadget",
      x,
      (t) => {
        if (_a.hideAim.setHideActiveGadget(!_a.hideAim.config.hideActiveGadget)) {
          t.activate();
          return;
        }
        t.deactivate();
        return;
      },
      _a.hideAim.config.hideActiveGadget,
    );
    addTabResult5.addItem(button9);
    const addTabResult6 = addItemResult.addTab("Killaura");
    const _ = new rs();
    const switcherItem6 = t45.createSwitcherItem("Toggle: ", _, () => {
      _a.toggleKillaura();
      return;
    });
    _a.killaura.state ? switcherItem6.switcher.activate() : switcherItem6.switcher.deactivate();
    addTabResult6.addItem(switcherItem6);
    _.nextRow();
    addTabResult6.addItem(t45.createTitle("Checks:", _));
    _.nextRow();
    const button10 = t45.createButton(
      "Require Holding Stick",
      _,
      () => {
        _a.killaura.config.hold = !_a.killaura.config.hold;
        if (_a.killaura.config.hold) {
          button10.activate();
          return;
        }
        button10.deactivate();
        return;
      },
      _a.killaura.config.hold,
    );
    addTabResult6.addItem(button10);
    const button11 = t45.createButton(
      "Check Range",
      _,
      () => {
        _a.killaura.config.checkRange = !_a.killaura.config.checkRange;
        if (_a.killaura.config.checkRange) {
          button11.activate();
          return;
        }
        button11.deactivate();
        return;
      },
      _a.killaura.config.checkRange,
    );
    addTabResult6.addItem(button11);
    const button12 = t45.createButton(
      "Cancel Shot on Release",
      _,
      () => {
        _a.killaura.config.cancelOnRelease = !_a.killaura.config.cancelOnRelease;
        if (_a.killaura.config.cancelOnRelease) {
          button12.activate();
          return;
        }
        button12.deactivate();
        return;
      },
      _a.killaura.config.cancelOnRelease,
    );
    addTabResult6.addItem(button12);
    const button13 = t45.createButton(
      "Hyper Wait for Ulti",
      _,
      () => {
        _a.killaura.config.hyperWaitForUlti = !_a.killaura.config.hyperWaitForUlti;
        if (_a.killaura.config.hyperWaitForUlti) {
          button13.activate();
          return;
        }
        button13.deactivate();
        return;
      },
      _a.killaura.config.hyperWaitForUlti,
    );
    addTabResult6.addItem(button13);
    _.nextRow();
    addTabResult6.addItem(
      t45.createSliderItem(
        "Minimum Health: ",
        _,
        (minHealth) => {
          _a.killaura.config.minHealth = minHealth;
          return;
        },
        0,
        10000,
        _a.killaura.config.minHealth,
      ),
    );
    _.nextRow();
    addTabResult6.addItem(
      t45.createSliderItem(
        "Safety Tiles Margin: ",
        _,
        (t) => {
          _a.killaura.config.safetyTilesMargin = t / 2;
          return;
        },
        0,
        10,
        Math.round(2 * _a.killaura.config.safetyTilesMargin),
        (t) => (t / 2).toFixed(1),
      ),
    );
    _.nextRow();
    addTabResult6.addItem(t45.createTitle("Abilities:", _));
    _.nextRow();
    for (const e6 of [
      {
        key: "useNormal",
        label: "Normal",
      },
      {
        key: "useGadget",
        label: "Gadget",
      },
      {
        key: "useUlti",
        label: "Super",
      },
      {
        key: "useHyper",
        label: "Hypercharge",
      },
    ]) {
      const button14 = t45.createButton(
        e6.label,
        _,
        () => {
          _a.killaura.config[e6.key] = !_a.killaura.config[e6.key];
          if (_a.killaura.config[e6.key]) {
            button14.activate();
            return;
          }
          button14.deactivate();
          return;
        },
        _a.killaura.config[e6.key],
      );
      addTabResult6.addItem(button14);
    }
    const addTabResult7 = addItemResult.addTab("Hold To Shoot");
    const E = new rs();
    const switcherItem7 = t45.createSwitcherItem("Toggle: ", E, () => {
      _a.toggleHoldToShoot();
      return;
    });
    _a.holdToShoot.state ? switcherItem7.switcher.activate() : switcherItem7.switcher.deactivate();
    addTabResult7.addItem(switcherItem7);
    E.nextRow();
    addTabResult7.addItem(t45.createTitle("Config:", E));
    E.nextRow();
    const button15 = t45.createButton(
      "Check Range",
      E,
      () => {
        _a.holdToShoot.config.checkRange = !_a.holdToShoot.config.checkRange;
        if (_a.holdToShoot.config.checkRange) {
          button15.activate();
          return;
        }
        button15.deactivate();
        return;
      },
      _a.holdToShoot.config.checkRange,
    );
    addTabResult7.addItem(button15);
    const button16 = t45.createButton(
      "Cancel Shot on Release",
      E,
      () => {
        _a.holdToShoot.config.cancelOnRelease = !_a.holdToShoot.config.cancelOnRelease;
        if (_a.holdToShoot.config.cancelOnRelease) {
          button16.activate();
          return;
        }
        button16.deactivate();
        return;
      },
      _a.holdToShoot.config.cancelOnRelease,
    );
    addTabResult7.addItem(button16);
    const button17 = t45.createButton(
      "Allow when Aiming",
      E,
      () => {
        _a.holdToShoot.config.onAim = !_a.holdToShoot.config.onAim;
        if (_a.holdToShoot.config.onAim) {
          button17.activate();
          return;
        }
        button17.deactivate();
        return;
      },
      _a.holdToShoot.config.onAim,
    );
    addTabResult7.addItem(button17);
    E.nextRow();
    addTabResult7.addItem(
      t45.createSliderItem(
        "Safety Tiles Margin: ",
        E,
        (t) => {
          _a.holdToShoot.config.safetyTilesMargin = t / 2;
          return;
        },
        0,
        10,
        Math.round(2 * _a.holdToShoot.config.safetyTilesMargin),
        (t) => (t / 2).toFixed(1),
      ),
    );
    E.nextRow();
    addTabResult7.addItem(
      t45.createSliderItem(
        "Delay: ",
        E,
        (timeToAim) => {
          _a.holdToShoot.config.timeToAim = timeToAim;
          return;
        },
        0,
        600,
        _a.holdToShoot.config.timeToAim,
        (t) => Math.round(t),
      ),
    );
    const addTabResult8 = addItemResult.addTab("Xray");
    const xray2 = _a.getXray();
    const Y = new rs();
    const switcherItem8 = t45.createSwitcherItem("Toggle: ", Y, (enabled) => {
      xray2.enabled = enabled;
      ++xray2.selectionVersion;
      return;
    });
    xray2.enabled ? switcherItem8.switcher.activate() : switcherItem8.switcher.deactivate();
    Y.nextRow();
    const title = t45.createTitle("Players:", Y);
    Y.nextRow();
    const X = () => {
      addTabResult8.removeAllContent();
      addTabResult8.items = [];
      addTabResult8.addItem(switcherItem8);
      addTabResult8.addItem(title);
      const e = new rs();
      e.y = Y.y;
      xrayMenuController.playerButtons = xray2.players.map((i) => {
        const button = t45.createButton(
          xray2.getLabel(i),
          e,
          (t) => {
            xray2.select(i.playerIndex);
            xrayMenuController.updatePlayerLabels();
            t.playClickAnim();
            return;
          },
          xray2.selectedPlayerIndex === i.playerIndex,
        );
        addTabResult8.addItem(button);
        return button;
      });
      return;
    };
    const xrayMenuController = {
      playerButtons: [],
      lastRosterVersion: -1,
      lastSelectionVersion: -1,
      lastRosterRefresh: 0,
      updatePlayerLabels() {
        xray2.enabled ? switcherItem8.switcher.activate() : switcherItem8.switcher.deactivate();
        const minResult = Math.min(this.playerButtons.length, xray2.players.length);
        for (let index = 0; index < minResult; index++) {
          const t2 = xray2.players[index];
          const i = this.playerButtons[index];
          i.text = xray2.getLabel(t2).toScString();
          xray2.selectedPlayerIndex === t2.playerIndex ? i.activate() : i.deactivate();
        }
        this.lastSelectionVersion = xray2.selectionVersion;
        return;
      },
      update() {
        const lastRosterRefresh = Date.now();
        if (!(lastRosterRefresh - this.lastRosterRefresh < 250)) {
          this.lastRosterRefresh = lastRosterRefresh;
          xray2.refreshRoster();
          if (this.lastRosterVersion !== xray2.rosterVersion) {
            this.lastRosterVersion = xray2.rosterVersion;
            X();
            return;
          }
        }
        return;
      },
    };
    addTabResult8.addItem(switcherItem8);
    addTabResult8.addItem(title);
    xray2.refreshRoster();
    X();
    xrayMenuController.lastRosterVersion = xray2.rosterVersion;
    xrayMenuController.lastSelectionVersion = xray2.selectionVersion;
    t45.xrayMenuController = xrayMenuController;
    ws.updateObjects.add(xrayMenuController);
    const addTabResult9 = addItemResult.addTab("DynaJump");
    const K = new rs();
    const switcherItem9 = t45.createSwitcherItem("Toggle: ", K, () => {
      _a.dynajump.setEnabled(switcherItem9.switcher.isActive);
      return;
    });
    _a.dynajump.toggleSwitcher = switcherItem9.switcher;
    _a.dynajump.state ? switcherItem9.switcher.activate() : switcherItem9.switcher.deactivate();
    addTabResult9.addItem(switcherItem9);
    K.nextRow();
    addTabResult9.addItem(
      t45.createSliderItem(
        "Stick Radius: ",
        K,
        (stickRadius) => {
          _a.dynajump.config.stickRadius = stickRadius;
          return;
        },
        20,
        300,
        _a.dynajump.config.stickRadius,
      ),
    );
    const shootEarlySliderItem = t45.createSliderItem(
      "Shoot Early: ",
      K,
      (shootEarly) => {
        _a.dynajump.config.shootEarly = shootEarly;
        return;
      },
      0,
      500,
      _a.dynajump.config.shootEarly,
      (t) => "".concat(t, "ms"),
    );
    _a.dynajump.shootEarlySlider = shootEarlySliderItem.slider;
    _a.dynajump.shootEarlySliderItem = shootEarlySliderItem;
    addTabResult9.addItem(shootEarlySliderItem);
    K.nextRow();
    addTabResult9.addItem(t45.createTitle("Use:", K));
    K.nextRow();
    const button18 = t45.createButton(
      "Use Ulti",
      K,
      () => {
        _a.dynajump.config.useUlti = !_a.dynajump.config.useUlti;
        if (_a.dynajump.config.useUlti) {
          button18.activate();
          return;
        }
        button18.deactivate();
        return;
      },
      _a.dynajump.config.useUlti,
    );
    addTabResult9.addItem(button18);
    const button19 = t45.createButton(
      "Require Ulti",
      K,
      () => {
        _a.dynajump.config.requireUlti = !_a.dynajump.config.requireUlti;
        if (_a.dynajump.config.requireUlti) {
          button19.activate();
          return;
        }
        button19.deactivate();
        return;
      },
      _a.dynajump.config.requireUlti,
    );
    addTabResult9.addItem(button19);
    const button20 = t45.createButton(
      "Min. Ammo: ".concat(_a.dynajump.config.minimumAmmoRequired),
      K,
      (t) => {
        const maxResult2 = Math.max(
          0,
          Math.min(3, Math.trunc(Number(_a.dynajump.config.minimumAmmoRequired) || 0)),
        );
        _a.dynajump.config.minimumAmmoRequired = (maxResult2 + 1) % 4;
        ((t) => {
          const minimumAmmoRequired = Math.max(
            0,
            Math.min(3, Math.trunc(Number(_a.dynajump.config.minimumAmmoRequired) || 0)),
          );
          _a.dynajump.config.minimumAmmoRequired = minimumAmmoRequired;
          t.text = "Min. Ammo: ".concat(minimumAmmoRequired).toScString();
          if (minimumAmmoRequired > 0) {
            t.activate();
            return;
          }
          t.deactivate();
          return;
        })(t);
        return;
      },
      Number(_a.dynajump.config.minimumAmmoRequired) > 0,
    );
    addTabResult9.addItem(button20);
    return;
  }
  static createDebugCategory() {
    const addTabResult = globalThis.menu.categoryArea.addItem("Debug").addTab("UpdateRate");
    const i = new rs();
    const switcherItem = t45.createSwitcherItem("Toggle", i, () => {
      ws.customUpdateRateEnabled = !ws.customUpdateRateEnabled;
      return;
    });
    ws.customUpdateRateEnabled
      ? switcherItem.switcher.activate()
      : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    i.nextRow();
    const sliderItem = t45.createSliderItem(
      "Rate: ",
      i,
      (t) => (ws.customUpdateRate = 1 / t),
      1,
      500,
      Math.floor(1 / ws.customUpdateRate),
    );
    addTabResult.addItem(sliderItem);
    return;
  }
  static createMiscCategory() {
    const addItemResult = globalThis.menu.categoryArea.addItem("Misc");
    const addTabResult = addItemResult.addTab("FPS");
    const s = new rs();
    addTabResult.addItem(t45.createTitle("Logger:", s));
    s.nextRow();
    const switcherItem = t45.createSwitcherItem("Toggle: ", s, (state) => {
      _a.fpsLogger.state = state;
      return;
    });
    _a.fpsLogger.state ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    const button = t45.createButton(
      "Show Max FPS",
      s,
      (t) => {
        _a.fpsLogger.showMaxFPS = !_a.fpsLogger.showMaxFPS;
        if (_a.fpsLogger.showMaxFPS) {
          t.activate();
          return;
        }
        t.deactivate();
        return;
      },
      _a.fpsLogger.showMaxFPS,
    );
    addTabResult.addItem(button);
    const button2 = t45.createButton(
      "Rainbow",
      s,
      (t) => {
        _a.fpsLogger.rainbow = !_a.fpsLogger.rainbow;
        if (_a.fpsLogger.rainbow) {
          t.activate();
          return;
        }
        t.deactivate();
        return;
      },
      _a.fpsLogger.rainbow,
    );
    addTabResult.addItem(button2);
    const addTabResult2 = addItemResult.addTab("Ping Shower");
    const l = new rs();
    const switcherItem2 = t45.createSwitcherItem("Toggle: ", l, (state) => {
      _a.pingShower.state = state;
      return;
    });
    _a.pingShower.state ? switcherItem2.switcher.activate() : switcherItem2.switcher.deactivate();
    addTabResult2.addItem(switcherItem2);
    const button3 = t45.createButton(
      "Show Indicator",
      l,
      (t) => {
        _a.pingShower.indicatorEnabled = !_a.pingShower.indicatorEnabled;
        if (_a.pingShower.indicatorEnabled) {
          t.activate();
          return;
        }
        t.deactivate();
        return;
      },
      _a.pingShower.indicatorEnabled,
    );
    addTabResult2.addItem(button3);
    const button4 = t45.createButton(
      "Rainbow",
      l,
      (t) => {
        _a.pingShower.rainbow = !_a.pingShower.rainbow;
        if (_a.pingShower.rainbow) {
          t.activate();
          return;
        }
        t.deactivate();
        return;
      },
      _a.pingShower.rainbow,
    );
    addTabResult2.addItem(button4);
    const addTabResult3 = addItemResult.addTab("IP");
    const g = new rs();
    const switcherItem3 = t45.createSwitcherItem("Toggle: ", g, (state) => {
      _a.ip.state = state;
      return;
    });
    _a.ip.state ? switcherItem3.switcher.activate() : switcherItem3.switcher.deactivate();
    addTabResult3.addItem(switcherItem3);
    const button5 = t45.createButton("Allow Copy", g, (t) => {
      _a.ip.allowCopy = !_a.ip.allowCopy;
      if (_a.ip.allowCopy) {
        t.activate();
        return;
      }
      t.deactivate();
      return;
    });
    _a.ip.allowCopy ? button5.activate() : button5.deactivate();
    addTabResult3.addItem(button5);
    const button6 = t45.createButton("Rainbow", g, (t) => {
      _a.ip.rainbow = !_a.ip.rainbow;
      if (_a.ip.rainbow) {
        t.activate();
        return;
      }
      t.deactivate();
      return;
    });
    _a.ip.rainbow ? button6.activate() : button6.deactivate();
    addTabResult3.addItem(button6);
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Uncap:", s));
    s.nextRow();
    const switcherItem4 = t45.createSwitcherItem("Toggle: ", s, (state) => {
      _a.fpsLimit.state = state;
      return;
    });
    _a.fpsLimit.state ? switcherItem4.switcher.activate() : switcherItem4.switcher.deactivate();
    addTabResult.addItem(switcherItem4);
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Limit: ",
        s,
        (t) => {
          _a.fpsLimit.limit = Math.round(t);
          return;
        },
        0,
        1000,
        _a.fpsLimit.limit,
        (t) => {
          if (Math.round(t) >= 1000) {
            return "∞";
          }
          return "".concat(Math.round(t), " FPS");
        },
      ),
    );
    const addTabResult4 = addItemResult.addTab("Player Position");
    const v = new rs();
    const switcherItem5 = t45.createSwitcherItem("Toggle: ", v, (state) => {
      _a.positionLogger.state = state;
      return;
    });
    _a.positionLogger.state
      ? switcherItem5.switcher.activate()
      : switcherItem5.switcher.deactivate();
    addTabResult4.addItem(switcherItem5);
    const button7 = t45.createButton(
      "Rainbow",
      v,
      (t) => {
        _a.positionLogger.rainbow = !_a.positionLogger.rainbow;
        if (_a.positionLogger.rainbow) {
          t.activate();
          return;
        }
        t.deactivate();
        return;
      },
      _a.positionLogger.rainbow,
    );
    addTabResult4.addItem(button7);
    v.nextRow();
    addTabResult4.addItem(t45.createTitle("Updates:", v));
    v.nextRow();
    const items = [];
    const items2 = [
      {
        label: "On every frame",
        value: "frame",
      },
      {
        label: "Custom",
        value: "custom",
      },
    ];
    for (const e2 of items2) {
      const button8 = t45.createButton(
        e2.label,
        v,
        (t) => {
          items.forEach((e) => {
            if (e !== t) {
              e.deactivate();
            }
            return;
          });
          t.activate();
          _a.positionLogger.updateMode = e2.value;
          _a.positionLogger.lastPositionUpdate = 0;
          sliderItem.visible = e2.value === "custom";
          return;
        },
        _a.positionLogger.updateMode === e2.value,
      );
      items.push(button8);
      addTabResult4.addItem(button8);
    }
    v.nextRow();
    const sliderItem = t45.createSliderItem(
      "Updates per Second: ",
      v,
      (t) => {
        _a.positionLogger.updatesPerSecond = Math.round(t);
        return;
      },
      1,
      20,
      _a.positionLogger.updatesPerSecond,
      (t) => "".concat(Math.round(t)),
    );
    sliderItem.visible = _a.positionLogger.updateMode === "custom";
    addTabResult4.addItem(sliderItem);
    const addTabResult5 = addItemResult.addTab("Restart");
    const x = new rs();
    addTabResult5.addItem(
      t45.createButton("Restart Game", x, (t) => {
        t.playClickAnim();
        _a.restartGame();
        return;
      }),
    );
    const addTabResult6 = addItemResult.addTab("Unhide Names");
    const k = new rs();
    const switcherItem6 = t45.createSwitcherItem("Toggle: ", k, (enabled) => {
      _a.unhideNames.setEnabled(enabled);
      return;
    });
    _a.unhideNames.state ? switcherItem6.switcher.activate() : switcherItem6.switcher.deactivate();
    addTabResult6.addItem(switcherItem6);
    const addTabResult7 = addItemResult.addTab("Show Enemy Brawler");
    const I = new rs();
    const switcherItem7 = t45.createSwitcherItem("Toggle: ", I, (enabled) => {
      _a.showEnemyBrawler.setEnabled(enabled);
      return;
    });
    _a.showEnemyBrawler.state
      ? switcherItem7.switcher.activate()
      : switcherItem7.switcher.deactivate();
    addTabResult7.addItem(switcherItem7);
    const addTabResult8 = addItemResult.addTab("Anti AFK");
    const D = new rs();
    const switcherItem8 = t45.createSwitcherItem("Toggle: ", D, (enabled) => {
      _a.antiAFK.setEnabled(enabled);
      return;
    });
    _a.antiAFK.state ? switcherItem8.switcher.activate() : switcherItem8.switcher.deactivate();
    addTabResult8.addItem(switcherItem8);
    const addTabResult9 = addItemResult.addTab("Hide Spectate");
    const E = new rs();
    const switcherItem9 = t45.createSwitcherItem("Toggle: ", E, (enabled) => {
      _a.hideSpectate.setEnabled(enabled);
      return;
    });
    _a.hideSpectate.state ? switcherItem9.switcher.activate() : switcherItem9.switcher.deactivate();
    addTabResult9.addItem(switcherItem9);
    const addTabResult10 = addItemResult.addTab("Music Player");
    const j = new rs();
    addTabResult10.addItem(t45.createTitle("Playing:", j));
    j.nextRow();
    const progressSlider = t45.createSliderItem(
      "",
      j,
      (t) => {
        _a.musicPlayer.seek(t);
        return;
      },
      0,
      1,
      0,
    );
    _a.musicPlayer.progressSlider = progressSlider;
    addTabResult10.addItem(progressSlider);
    const playPauseButton = t45.createButton("Play", j, () => {
      const togglePlaybackResult = _a.musicPlayer.togglePlayback();
      if (togglePlaybackResult === null) {
        di.showFloater("This playlist has no songs");
        return;
      }
      if (togglePlaybackResult === false) {
        di.showFloater("Could not start playback");
      }
      return;
    });
    _a.musicPlayer.playPauseButton = playPauseButton;
    addTabResult10.addItem(playPauseButton);
    j.nextRow();
    addTabResult10.addItem(t45.createTitle("Playlist:", j));
    j.nextRow();
    const childByName = addItemResult._menu.movieClip.getChildByName("top_item_area");
    const { height: height, width: width } = childByName;
    const z = new xi(1, width, height);
    z.unk1 = true;
    z.pinching = false;
    z.alignment = 8;
    z.horizontalDrag = true;
    z.verticalDrag = false;
    j.place(z, width, height, j.cols);
    addTabResult10.addItem(z);
    j.nextRow();
    addTabResult10.addItem(t45.createTitle("Songs:", j));
    j.nextRow();
    const items4 = [];
    const items5 = [];
    const items6 = [];
    const y3 = j.y;
    const J = () => {
      items5.forEach((t) => addTabResult10.sprite.removeChild(t));
      addTabResult10.items = addTabResult10.items.filter((t) => !items5.includes(t));
      items5.length = 0;
      items6.length = 0;
      addTabResult10.shouldUpdateBounds = true;
      const e = new rs(2, 5);
      e.y = y3;
      for (const i of _a.musicPlayer.getTracks()) {
        const button9 = t45.createButton(
          i.name,
          e,
          (t) => {
            if (!_a.musicPlayer.playTrack(i)) {
              di.showFloater("Could not play this song");
            }
            return;
          },
          i.path === _a.musicPlayer.selectedTrackPath,
        );
        addTabResult10.addItem(button9);
        items5.push(button9);
        items6.push({
          button: button9,
          path: i.path,
        });
        const button10 = t45.createButton("Remove Song", e, (t) => {
          t.playClickAnim();
          _a.musicPlayer.removeTrack(i.path);
          return;
        });
        addTabResult10.addItem(button10);
        items5.push(button10);
      }
      const button11 = t45.createButton("+", e, (t) => {
        t.playClickAnim();
        const smallPopupWidgetAliasInstance = new SmallPopupWidgetAlias();
        smallPopupWidgetAliasInstance.title = "Paste song link";
        smallPopupWidgetAliasInstance.text = "";
        const addInputFieldResult = smallPopupWidgetAliasInstance.addInputField();
        smallPopupWidgetAliasInstance.button.text = "Download".toScString();
        smallPopupWidgetAliasInstance.buttonCallback = () => {
          const trimmedText = String(
            smallPopupWidgetAliasInstance.text || addInputFieldResult.getInputText(),
          ).trim();
          if (!trimmedText) {
            di.showFloater("Enter a song link");
            return;
          }
          smallPopupWidgetAliasInstance.hide();
          const downloadTrackResult = _a.musicPlayer.downloadTrack(trimmedText);
          if (downloadTrackResult) {
            di.showFloater("Downloaded ".concat(downloadTrackResult.name));
            return;
          }
          di.showFloater("Could not download song");
          return;
        };
        return;
      });
      addTabResult10.addItem(button11);
      items5.push(button11);
      const button12 = t45.createButton("Remove Playlist", e, (t) => {
        t.playClickAnim();
        if (!_a.musicPlayer.removePlaylist()) {
          di.showFloater(
            _a.musicPlayer.selectedPlaylist === "default"
              ? "Default playlist cannot be removed"
              : "Could not remove playlist",
          );
        }
        return;
      });
      addTabResult10.addItem(button12);
      items5.push(button12);
      return;
    };
    const Q = () => {
      z.removeAllContent();
      items4.length = 0;
      const mapResult = _a.musicPlayer.playlists.map((t) => {
        return {
          name: t,
          selected: t === _a.musicPlayer.selectedPlaylist,
          onClick: (e) => {
            _a.musicPlayer.selectPlaylist(t);
            items4.forEach((t) => {
              if (t === e) {
                return t.activate();
              }
              return t.deactivate();
            });
            J();
            return;
          },
        };
      });
      const i = new rs(mapResult.length + 2, 10);
      mapResult.forEach((e) => {
        const button9 = t45.createButton(e.name, i, e.onClick, e.selected);
        items4.push(button9);
        z.addContent(button9);
        return;
      });
      const button10 = t45.createButton("+", i, (t) => {
        t.playClickAnim();
        const smallPopupWidgetAliasInstance = new SmallPopupWidgetAlias();
        smallPopupWidgetAliasInstance.title = "New playlist";
        smallPopupWidgetAliasInstance.text = "";
        const addInputFieldResult = smallPopupWidgetAliasInstance.addInputField();
        smallPopupWidgetAliasInstance.button.text = "Create".toScString();
        smallPopupWidgetAliasInstance.buttonCallback = () => {
          const trimmedText = String(
            smallPopupWidgetAliasInstance.text || addInputFieldResult.getInputText(),
          ).trim();
          if (trimmedText) {
            if (_a.musicPlayer.playlists.includes(trimmedText)) {
              di.showFloater("Playlist already exists");
              return;
            }
            smallPopupWidgetAliasInstance.hide();
            _a.musicPlayer.addPlaylist(trimmedText);
            Q();
            J();
            return;
          }
          di.showFloater("Enter a playlist name");
          return;
        };
        return;
      });
      items4.push(button10);
      z.addContent(button10);
      return;
    };
    Q();
    J();
    _a.musicPlayer.onTrackChanged = (t) => {
      items6.forEach(({ button: button9, path: path }) => {
        if (path === t) {
          button9.activate();
          return;
        }
        button9.deactivate();
        return;
      });
      return;
    };
    _a.musicPlayer.onTracksChanged = (t) => {
      if (t === _a.musicPlayer.selectedPlaylist) {
        J();
        return;
      }
      if (!_a.musicPlayer.playlists.includes(t)) {
        Q();
        J();
      }
      return;
    };
    return;
  }
  static createSettingsCategory() {
    const addItemResult = globalThis.menu.categoryArea.addItem("Settings");
    t45.createLayoutTab(addItemResult);
    t45.createAnimationTab(addItemResult);
    t45.createTransitionsTab(addItemResult);
    return;
  }
  static createLayoutTab(e) {
    const addTabResult = e.addTab("Layout");
    const s = new rs();
    addTabResult.addItem(t45.createTitle("Scale:", s));
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Menu: ",
        s,
        (t) => {
          Wi.scale = Math.round(t);
          ji.tween({
            key: "menuScale",
            duration: 0.25,
            onUpdate: () => undefined,
            onComplete: () => {
              if (globalThis.menu == null) {
                return;
              }
              return globalThis.menu.setBaseScale(Wi.scale / 100);
            },
          });
          return;
        },
        40,
        120,
        Wi.scale,
        (t) => Math.round(t) + "%",
      ),
    );
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Position:", s));
    s.nextRow();
    const switcherItem = t45.createSwitcherItem("Lock Menu", s, (lockMenu) => {
      Wi.lockMenu = lockMenu;
      globalThis.menu.draggability = !lockMenu;
      return;
    });
    Wi.lockMenu ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    s.nextRow();
    const switcherItem2 = t45.createSwitcherItem("Lock Button", s, (lockButton) => {
      Wi.lockButton = lockButton;
      t45.menuToggle.draggability = !lockButton;
      return;
    });
    Wi.lockButton ? switcherItem2.switcher.activate() : switcherItem2.switcher.deactivate();
    addTabResult.addItem(switcherItem2);
    s.nextRow();
    addTabResult.addItem(
      t45.createButton("Reset Menu", s, (t) => {
        t.playClickAnim();
        globalThis.menu.resetPosition();
        return;
      }),
    );
    addTabResult.addItem(
      t45.createButton("Reset Button", s, (e) => {
        e.playClickAnim();
        t45.resetTogglePosition();
        return;
      }),
    );
    addTabResult.addItem(
      t45.createButton("Save Position", s, (e) => {
        e.playClickAnim();
        t45.savePositions();
        return;
      }),
    );
    return;
  }
  static createAnimationTab(e) {
    const addTabResult = e.addTab("Animation");
    const s = new rs();
    const animation = Wi.animation;
    const n = (t) => Math.round(t) + " ms";
    const r = (t) => Math.round(t) + " px";
    const o = (t) => Math.round(t) + "%";
    addTabResult.addItem(t45.createTitle("Variant:", s));
    s.nextRow();
    const mapResult = Object.entries(ls.variants).map(([t, e]) => {
      return {
        value: t,
        label: e.label,
      };
    });
    t45.createChoiceGroup(addTabResult, s, mapResult, animation.variant, (variant) => {
      animation.variant = variant;
      return;
    });
    addTabResult.addItem(
      t45.createButton("Preview", s, (t) => {
        t.playClickAnim();
        globalThis.menu.preview();
        return;
      }),
    );
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Timing:", s));
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Open: ",
        s,
        (t) => {
          animation.openDuration = Math.round(t);
          return;
        },
        50,
        1500,
        animation.openDuration,
        n,
      ),
    );
    addTabResult.addItem(
      t45.createSliderItem(
        "Close: ",
        s,
        (t) => {
          animation.closeDuration = Math.round(t);
          return;
        },
        50,
        1500,
        animation.closeDuration,
        n,
      ),
    );
    s.nextRow();
    const switcherItem = t45.createSwitcherItem("Stagger", s, (stagger) => {
      animation.stagger = stagger;
      return;
    });
    animation.stagger ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    addTabResult.addItem(switcherItem);
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Stagger Step: ",
        s,
        (t) => {
          animation.staggerStep = Math.round(t);
          return;
        },
        0,
        150,
        animation.staggerStep,
        n,
      ),
    );
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Pop:", s));
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Start Scale: ",
        s,
        (t) => {
          animation.pop.startScale = Math.round(t);
          return;
        },
        10,
        100,
        animation.pop.startScale,
        o,
      ),
    );
    addTabResult.addItem(
      t45.createSliderItem(
        "Distance: ",
        s,
        (t) => {
          animation.pop.distance = Math.round(t);
          return;
        },
        0,
        300,
        animation.pop.distance,
        r,
      ),
    );
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Slide:", s));
    s.nextRow();
    t45.createChoiceGroup(
      addTabResult,
      s,
      [
        {
          value: "bottom",
          label: "Bottom",
        },
        {
          value: "top",
          label: "Top",
        },
        {
          value: "left",
          label: "Left",
        },
        {
          value: "right",
          label: "Right",
        },
      ],
      animation.slide.direction,
      (direction) => {
        animation.slide.direction = direction;
        return;
      },
    );
    addTabResult.addItem(
      t45.createSliderItem(
        "Distance: ",
        s,
        (t) => {
          animation.slide.distance = Math.round(t);
          return;
        },
        0,
        600,
        animation.slide.distance,
        r,
      ),
    );
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Zoom:", s));
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Start Scale: ",
        s,
        (t) => {
          animation.zoom.startScale = Math.round(t);
          return;
        },
        5,
        100,
        animation.zoom.startScale,
        o,
      ),
    );
    s.nextRow();
    addTabResult.addItem(t45.createTitle("Drop:", s));
    s.nextRow();
    addTabResult.addItem(
      t45.createSliderItem(
        "Distance: ",
        s,
        (t) => {
          animation.drop.distance = Math.round(t);
          return;
        },
        0,
        600,
        animation.drop.distance,
        r,
      ),
    );
    return;
  }
  static createTransitionsTab(e) {
    const addTabResult = e.addTab("Transitions");
    const s = new rs();
    t45.createTransitionSettings(addTabResult, s, "Tabs:", Wi.transitions.tabs);
    s.nextRow();
    t45.createTransitionSettings(addTabResult, s, "Categories:", Wi.transitions.categories);
    return;
  }
  static createTransitionSettings(e, i, s, a) {
    e.addItem(t45.createTitle(s, i));
    i.nextRow();
    const switcherItem = t45.createSwitcherItem("Toggle: ", i, (enabled) => {
      a.enabled = enabled;
      return;
    });
    a.enabled ? switcherItem.switcher.activate() : switcherItem.switcher.deactivate();
    e.addItem(switcherItem);
    i.nextRow();
    t45.createChoiceGroup(
      e,
      i,
      [
        {
          value: "down",
          label: "Down",
        },
        {
          value: "horizontal",
          label: "Left / Right",
        },
        {
          value: "vertical",
          label: "Up / Down",
        },
        {
          value: "fade",
          label: "Fade",
        },
      ],
      a.mode,
      (mode) => {
        a.mode = mode;
        return;
      },
    );
    e.addItem(
      t45.createSliderItem(
        "Duration: ",
        i,
        (t) => {
          a.duration = Math.round(t);
          return;
        },
        50,
        800,
        a.duration,
        (t) => Math.round(t) + " ms",
      ),
    );
    e.addItem(
      t45.createSliderItem(
        "Distance: ",
        i,
        (t) => {
          a.distance = Math.round(t);
          return;
        },
        0,
        300,
        a.distance,
        (t) => Math.round(t) + " px",
      ),
    );
    return;
  }
  static init() {
    t45.createHomeCategory();
    t45.createCheatsCategory();
    t45.createVisualsCategory();
    t45.createMiscCategory();
    t45.createDebugCategory();
    t45.createSettingsCategory();
    return;
  }
  static destroy() {
    ji.clear();
    if (t45.xrayMenuController) {
      ws.updateObjects.delete(t45.xrayMenuController);
    }
    t45.xrayMenuController = null;
    globalThis.menu.destroy();
    t45.menuToggle.destroy();
    globalThis.menu = undefined;
    t45.isMenuCreated = false;
    t45.menuToggle = null;
    return;
  }
}

var ms = t45;

class fs {
  constructor(instance) {
    this.instance = instance;
    return;
  }
  get name() {
    return this.instance.add(56).readSCStr();
  }
}

class bs {
  constructor() {
    return;
  }
  static get instance() {
    if (oe.isState(4)) {
      return oe.currentStateInstance;
    }
    return 0;
  }
  static get clientAvatar() {
    return new fs(oe.instance.add(96).readPointer());
  }
}
