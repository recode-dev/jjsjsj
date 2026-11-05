/**
 * game/state.js
 *
 * Game state machine and home/lobby screens.
 *
 * Symbols: t15, re, oe, t52, Gs, Vs, Hs, freezeResult, freezeResult2, t58, fa
 * Source: bundle lines 7370-27698 (11 statements)
 */


class t15 {
  static states;
  static forceLoginState;
  constructor() {
    return;
  }
  static {
    this.states = Object.freeze({
      NONE: 0,
      INIT: 2,
      LOADING: 3,
      HOME: 4,
      BATTLE: 5,
      MAP_EDITOR: 6,
      LOGIN: 8,
    });
    this.forceLoginState = !record2.production;
  }
  static get instance() {
    return globalThis.offsets.GameStateManager_Instance.readPointer();
  }
  static get currentState() {
    return this.instance.add(80).readU32();
  }
  static get currentStateInstance() {
    return this.instance.add(72).readPointer();
  }
  static changeState(t) {
    return this.instance.add(84).writeU32(t);
  }
  static changeToState() {
    globalThis.natives.GameStateManager_changeToState(t15.instance);
    return;
  }
  static isState(t) {
    return this.currentState === t;
  }
  static patch() {
    Interceptor.attach(globalThis.offsets.GameStateManager_createState, {
      onEnter(e) {
        if (t15.currentState === t15.states.NONE && t15.forceLoginState) {
          e[0] = ptr(t15.states.LOGIN);
        }
        return;
      },
    });
    return;
  }
}

var re = t15;

var oe = re;

class t52 {
  static instances;
  static lifecycleHooksInstalled;
  constructor(e = "virtuastick_move_bg", i = "virtuastick_move_stick", s = "sc/ui.sc") {
    this.bg = ti.getMovieClip(s, e);
    this.stick = ti.getMovieClip(s, i);
    this.touchId = null;
    this.inBattle = re.isState(re.states.BATTLE);
    this.visibleRequested = this.inBattle;
    if (this.bg.instance.isNull() || this.stick.instance.isNull()) {
      throw new Error("Could not load custom stick clips: ".concat(e, ", ", i));
    }
    ii.addChild(this.bg);
    ii.addChild(this.stick);
    this.centerX =
      ii.safeMarginLeft +
      0.20000000000000001 * (ii.screenWidth - ii.safeMarginLeft - ii.safeMarginRight);
    this.centerY =
      ii.screenHeight -
      ii.safeMarginBottom -
      0.20000000000000001 * (ii.screenHeight - ii.safeMarginTop - ii.safeMarginBottom);
    this.thumbX = this.centerX;
    this.thumbY = this.centerY;
    this.baseRadius = 130 * Math.abs(this.stick.scaleX);
    this.baseScale = {
      backgroundX: this.bg.scaleX,
      backgroundY: this.bg.scaleY,
      stickX: this.stick.scaleX,
      stickY: this.stick.scaleY,
    };
    this.radius = this.baseRadius;
    this.bg.setXY(this.centerX, this.centerY);
    this.stick.setXY(this.thumbX, this.thumbY);
    this.setActive(false);
    this.updateVisibility();
    t52.instances.add(this);
    this.unsubscribeTouchInput = Ls.subscribe({
      onPress: ({ id: id, x: x3, y: y3 }) => this.beginTouch(id, x3, y3),
      onMove: ({ id: id, x: x3, y: y3 }) => this.moveTouch(id, x3, y3),
      onRelease: (arg1) => {
        var id = arg1.id;
        return this.endTouch(id);
      },
      onCancel: (arg1) => {
        var id = arg1.id;
        return this.endTouch(id);
      },
    });
    t52.installBattleVisibilityHooks();
    return;
  }
  static {
    this.instances = new Set();
    this.lifecycleHooksInstalled = false;
  }
  static installBattleVisibilityHooks() {
    if (!t52.lifecycleHooksInstalled) {
      Interceptor.attach(globalThis.offsets.BattleScreen_update, {
        onEnter() {
          const isState = re.isState(re.states.BATTLE);
          for (const i of t52.instances) {
            i.setInBattle(isState);
          }
          return;
        },
      });
      Interceptor.attach(globalThis.offsets.GameStateManager_changeToState, {
        onLeave() {
          const isState = re.isState(re.states.BATTLE);
          for (const i of t52.instances) {
            i.setInBattle(isState);
          }
          return;
        },
      });
      t52.lifecycleHooksInstalled = true;
    }
    return;
  }
  beginTouch(touchId, e, i) {
    return (
      this.touchId === null &&
      !(Math.hypot(e - this.centerX, i - this.centerY) > this.radius) &&
      !((this.touchId = touchId), this.updateThumb(e, i), this.setActive(true), 0)
    );
  }
  moveTouch(t, e, i) {
    if (this.touchId === t) {
      this.updateThumb(e, i);
    }
    return;
  }
  updateThumb(t, e) {
    const difference = t - this.centerX;
    const difference2 = e - this.centerY;
    const hypotResult = Math.hypot(difference, difference2);
    const n = hypotResult > this.radius ? (hypotResult > 0 ? this.radius / hypotResult : 1) : 1;
    this.thumbX = this.centerX + difference * n;
    this.thumbY = this.centerY + difference2 * n;
    this.stick.setXY(this.thumbX, this.thumbY);
    return;
  }
  endTouch(t) {
    return (
      this.touchId === t &&
      ((this.touchId = null),
      (this.thumbX = this.centerX),
      (this.thumbY = this.centerY),
      this.stick.setXY(this.thumbX, this.thumbY),
      this.setActive(false),
      true)
    );
  }
  setActive(t) {
    const e = t ? 1 : 0;
    this.bg.gotoAndStopFrameIndex(e);
    this.stick.gotoAndStopFrameIndex(e);
    return;
  }
  setVisible(t) {
    this.visibleRequested = !!t;
    this.updateVisibility();
    return;
  }
  setInBattle(t) {
    this.inBattle = !!t;
    this.updateVisibility();
    return;
  }
  updateVisibility() {
    const visible = this.inBattle && this.visibleRequested;
    if (!visible && this.touchId !== null) {
      this.endTouch(this.touchId);
    }
    this.bg.visible = visible;
    this.stick.visible = visible;
    return;
  }
  setPosition(t, e) {
    this.centerX = t;
    this.centerY = e;
    this.thumbX = t;
    this.thumbY = e;
    this.bg.setXY(t, e);
    this.stick.setXY(t, e);
    return;
  }
  setRadius(radius2) {
    if (!Number.isFinite(radius2) || radius2 <= 0) {
      throw new RangeError("Custom stick radius must be a positive number");
    }
    const quotient = radius2 / this.baseRadius;
    this.bg.scaleX = this.baseScale.backgroundX * quotient;
    this.bg.scaleY = this.baseScale.backgroundY * quotient;
    this.stick.scaleX = this.baseScale.stickX * quotient;
    this.stick.scaleY = this.baseScale.stickY * quotient;
    this.radius = radius2;
    this.updateThumb(this.thumbX, this.thumbY);
    return;
  }
  destroy() {
    this.endTouch(this.touchId);
    this.unsubscribeTouchInput?.();
    t52.instances.delete(this);
    ii.removeChild(this.stick);
    ii.removeChild(this.bg);
    this.stick.destroy();
    this.bg.destroy();
    return;
  }
}

var Gs = t52;

var Vs = Gs;

class Hs {
  constructor(battle2) {
    this.battle = battle2;
    return;
  }
  getAimPoint(
    t,
    e,
    i,
    s,
    record = {
      x: t.x,
      y: t.y,
    },
  ) {
    let { x: x3, y: y3 } = e;
    if (this.battle.isPlayfieldMirrored()) {
      x3 = -x3;
      y3 = -y3;
    }
    const jumpEffect = i.jumpEffect;
    if (!jumpEffect) {
      return null;
    }
    const maxResult = Math.max(0, Number(jumpEffect.radius) || 0);
    const absResult = Math.abs(Number(jumpEffect.pushbackStrengthSelf) || 0);
    const maxResult2 = Math.max(0, Number(jumpEffect.pushbackDeadzone) || 0);
    if (maxResult <= 0 || absResult <= 0) {
      return null;
    }
    const minResult = Math.min(
      maxResult,
      Math.max(maxResult2, Number(s) || 0, maxResult - t.radius),
    );
    if (minResult <= 0) {
      return null;
    }
    const difference =
      maxResult - (maxResult - minResult) * Math.max(0, Math.min(1, Number(e.strength) || 0));
    return {
      x: Math.round(record.x - x3 * difference),
      y: Math.round(record.y - y3 * difference),
      blastOffset: difference,
    };
  }
  getSpreadGeometry(t, e, i) {
    const difference = Number(e.x) - Number(t.x);
    const difference2 = Number(e.y) - Number(t.y);
    const floorResult = Math.floor(Math.hypot(difference, difference2));
    if (!Number.isFinite(floorResult) || floorResult <= 0) {
      return null;
    }
    return {
      originX: Number(t.x),
      originY: Number(t.y),
      distance: floorResult,
      angleRadians: Math.atan2(difference2, difference),
      spread: Math.abs(Number(i.spread) || 0),
    };
  }
  getSpreadMax(t, e, i) {
    const absResult = Math.abs(Math.trunc(Number(e) || 0));
    if (absResult === 0) {
      return 0;
    }
    if (i.constantFlyTime) {
      return 3 * absResult;
    }
    let truncResult = Math.trunc(t);
    if (i.indirect) {
      truncResult = Math.max(
        truncResult,
        Math.max(0, Math.trunc(Number(i.minimumDistanceForSpread) || 0)),
      );
    }
    return Math.trunc((truncResult * absResult) / 300);
  }
  getSpreadEndPoint(t, e, i, s) {
    const truncResult = Math.trunc(Number(t.x));
    const truncResult2 = Math.trunc(Number(t.y));
    const difference = Math.trunc(Number(e.x)) - truncResult;
    const difference2 = Math.trunc(Number(e.y)) - truncResult2;
    const floorResult = Math.floor(Math.hypot(difference, difference2));
    if (!Number.isFinite(floorResult) || floorResult <= 0) {
      return {
        x: truncResult,
        y: truncResult2,
      };
    }
    const spreadMax = this.getSpreadMax(floorResult, i, s);
    if (spreadMax < 3) {
      return {
        x: truncResult + difference,
        y: truncResult2 + difference2,
      };
    }
    const floorResult2 = Math.floor(Math.hypot(difference, difference2));
    if (floorResult2 <= 0) {
      return {
        x: truncResult + difference,
        y: truncResult2 + difference2,
      };
    }
    const d = i >= 0 ? 1 : -1;
    const combinedValue = difference + Math.trunc(((-difference2 * spreadMax) / floorResult2) * d);
    const combinedValue2 = difference2 + Math.trunc(((difference * spreadMax) / floorResult2) * d);
    if (!s.indirect) {
      const floorResult3 = Math.floor(Math.hypot(combinedValue, combinedValue2));
      if (floorResult3 <= 0) {
        return {
          x: truncResult + difference,
          y: truncResult2 + difference2,
        };
      }
      return {
        x: truncResult + Math.trunc((combinedValue * floorResult) / floorResult3),
        y: truncResult2 + Math.trunc((combinedValue2 * floorResult) / floorResult3),
      };
    }
    return {
      x: truncResult + combinedValue,
      y: truncResult2 + combinedValue2,
    };
  }
  compensateFirstProjectileSpread(
    t,
    e,
    i,
    record = {
      x: t.x,
      y: t.y,
    },
  ) {
    const spreadGeometry = this.getSpreadGeometry(record, e, i);
    const maxResult = Math.max(1, Number(i.projectilesPerAttack) || 1);
    if (!spreadGeometry || maxResult < 2 || spreadGeometry.spread <= 0) {
      return e;
    }
    let distance = spreadGeometry.distance;
    let spreadMax = this.getSpreadMax(distance, spreadGeometry.spread, i);
    if (spreadMax < 3) {
      return e;
    }
    if (i.indirect) {
      for (let index = 0; index < 4; index++) {
        const difference =
          spreadGeometry.distance * spreadGeometry.distance - spreadMax * spreadMax;
        if (difference <= 0) {
          return e;
        }
        distance = Math.sqrt(difference);
        const spreadMax2 = this.getSpreadMax(distance, spreadGeometry.spread, i);
        if (spreadMax2 === spreadMax) {
          break;
        }
        spreadMax = spreadMax2;
      }
    }
    if (!Number.isFinite(distance) || distance <= 0) {
      return e;
    }
    const atan2Result = Math.atan2(spreadMax, distance);
    const combinedValue = spreadGeometry.angleRadians + atan2Result;
    return {
      ...e,
      x: Math.round(spreadGeometry.originX + Math.cos(combinedValue) * distance),
      y: Math.round(spreadGeometry.originY + Math.sin(combinedValue) * distance),
      spreadCorrection: {
        angle: (180 * atan2Result) / Math.PI,
        distance: spreadGeometry.distance,
      },
    };
  }
  getProjectileTiming(t, e, i) {
    const maxResult = Math.max(
      0,
      Math.trunc(Math.hypot(Number(t.x) - Number(i.x), Number(t.y) - Number(i.y))),
    );
    const quotient = (Math.max(1, Number(e.speed) || 0) * de.tickDurationMs) / 1000;
    const maxResult2 = Math.max(1, Math.ceil(maxResult / quotient));
    const product = maxResult2 * de.tickDurationMs;
    const maxResult3 = Math.max(0, Number(e.triggerWithDelayMs) || 0);
    const maxResult4 = Math.max(0, Number(e.preExplosionTimeMs) || 0);
    return {
      travelTicks: maxResult2,
      travelMs: product,
      triggerWithDelayMs: maxResult3,
      preExplosionTimeMs: maxResult4,
      touchdownDelayMs: this.battle.skillSpawnDelayMs + product,
      triggerDelayAfterTouchdownMs: Math.max(0, maxResult3 - product),
      detonationDelayMs: Math.max(
        de.tickDurationMs,
        this.battle.skillSpawnDelayMs + Math.max(product, maxResult3) + maxResult4,
      ),
    };
  }
  predictJumpTiming(t) {
    if (!t) {
      return null;
    }
    const numberResult = Number(t.pathLength ?? t.intendedPathLength);
    const numberResult2 = Number(t.pushbackSpeed);
    if (!Number.isFinite(numberResult) || !Number.isFinite(numberResult2) || numberResult2 <= 0) {
      return null;
    }
    const numberResult3 = Number(t.landingMovementTicks);
    if (!Number.isFinite(numberResult3) || numberResult3 <= 0) {
      return null;
    }
    const maxResult = Math.max(0, numberResult3 - 1);
    const product = maxResult * de.tickDurationMs;
    return {
      durationTicks: maxResult,
      durationMs: product,
      modelDurationMs: product,
      durationSource: "server-self-pushback-tick-model",
      movementTicks: numberResult3,
      basePushbackSpeed: t.basePushbackSpeed,
      pushbackSpeed: numberResult2,
      uniquePropertyValue1: t.uniquePropertyValue1,
      pathLength: numberResult,
      resolvedPathLength: Number(t.pathLength),
    };
  }
}

var freezeResult = Object.freeze({
  WAIT_DIRECTION: "wait-direction",
  PRELOAD: "preload",
  WAIT_TAKEOFF: "wait-takeoff",
  AIRBORNE: "airborne",
  LAND_RETRY: "land-retry",
});

var freezeResult2 = Object.freeze({
  INITIAL: "initial",
  PRELOAD: "preload",
  LANDING: "landing",
});

class t58 {
  static readyMessageSize;
  static readyStateOffset;
  static homePageOffset;
  static mainUIVisibleOffset;
  constructor(world, settings, statistics) {
    this.world = world;
    this.settings = settings;
    this.statistics = statistics;
    this.lastUpdateTime = null;
    this.lastReadyTime = null;
    this.lastSwitchTime = null;
    this.characterData = {};
    this.nativeStrings = {};
    return;
  }
  static {
    this.readyMessageSize = 200;
    this.readyStateOffset = 144;
    this.homePageOffset = 2376;
    this.mainUIVisibleOffset = 2483;
  }
  update() {
    if (!this.settings.autoReady && !this.settings.allowSwitch) {
      return;
    }
    const lastUpdateTime = Date.now();
    if (
      this.lastUpdateTime !== null &&
      lastUpdateTime - this.lastUpdateTime < this.settings.readyCooldown
    ) {
      return;
    }
    this.lastUpdateTime = lastUpdateTime;
    const ceResult = this.#Ce();
    if (
      ceResult !== null &&
      (!this.settings.allowSwitch || this.#Ne(ceResult, lastUpdateTime)) &&
      this.settings.autoReady
    ) {
      this.#xe(ceResult, true, lastUpdateTime);
    }
    return;
  }
  #Ce() {
    const homeMode_getInstanceResult = globalThis.natives.HomeMode_getInstance();
    if (homeMode_getInstanceResult.isNull()) {
      return null;
    }
    const homeMode_getHomeScreenResult = globalThis.natives.HomeMode_getHomeScreen(
      homeMode_getInstanceResult,
    );
    const teamManager_getInstanceResult = globalThis.natives.TeamManager_getInstance();
    if (
      homeMode_getHomeScreenResult.isNull() ||
      teamManager_getInstanceResult.isNull() ||
      homeMode_getHomeScreenResult.add(t58.mainUIVisibleOffset).readU8() === 0
    ) {
      return null;
    }
    const pointer = homeMode_getHomeScreenResult.add(t58.homePageOffset).readPointer();
    if (pointer.isNull()) {
      return null;
    }
    return {
      home: homeMode_getInstanceResult,
      screen: homeMode_getHomeScreenResult,
      page: pointer,
      team: teamManager_getInstanceResult,
    };
  }
  #Ne(t, lastSwitchTime) {
    const aeResult = this.#Ae(t.home);
    if (aeResult === null) {
      return false;
    }
    this.statistics.update(aeResult);
    if (
      this.lastSwitchTime !== null &&
      lastSwitchTime - this.lastSwitchTime < this.settings.switchCooldown
    ) {
      return false;
    }
    const s = aeResult.brawlers[aeResult.selectedName];
    if (this.settings.switchMode === "single" && s && this.#ke(s)) {
      return true;
    }
    const filterResult = Object.values(aeResult.brawlers).filter((t) => this.#ke(t));
    filterResult.sort((t, e) => {
      if (this.settings.trophyMode === "highest") {
        return e.trophies - t.trophies;
      }
      return t.trophies - e.trophies;
    });
    if (filterResult.length === 0) {
      return false;
    }
    const n = filterResult[0];
    if (n.name === aeResult.selectedName) {
      return true;
    }
    if (globalThis.natives.TeamManager_isPlayerReady(t.team) !== 0) {
      if (this.settings.autoReady) {
        this.#xe(t, false, lastSwitchTime);
      }
      return false;
    }
    const mallocResult = globalThis.pointers.malloc(48);
    if (!mallocResult.isNull()) {
      mallocResult.writeByteArray(new ArrayBuffer(48));
      globalThis.natives.LogicSelectCharacterCommand_ctor(mallocResult, n.instance, 0);
      globalThis.natives.HomeMode_addCommand(t.home, mallocResult);
      this.lastSwitchTime = lastSwitchTime;
    }
    return false;
  }
  #ke(t) {
    return (
      t.unlocked &&
      t.trophies >= this.settings.trophyGoal[0] &&
      t.trophies < this.settings.trophyGoal[1] &&
      t.powerLevel >= this.settings.powerLevels[0] &&
      t.powerLevel <= this.settings.powerLevels[1]
    );
  }
  #Ae(t) {
    const homeMode_getPlayerAvatarResult = globalThis.natives.HomeMode_getPlayerAvatar(t);
    const homeMode_getPlayerDataResult = globalThis.natives.HomeMode_getPlayerData(t);
    if (homeMode_getPlayerAvatarResult.isNull() || homeMode_getPlayerDataResult.isNull()) {
      return null;
    }
    const logicDailyData_getSelectedCharacterResult =
      globalThis.natives.LogicDailyData_getSelectedCharacter(homeMode_getPlayerDataResult, 0);
    if (logicDailyData_getSelectedCharacterResult.isNull()) {
      return null;
    }
    const peResult = this.#Pe(
      globalThis.natives.LogicData_getName(logicDailyData_getSelectedCharacterResult),
    );
    const record = {};
    for (const t2 of this.settings.brawlerNames) {
      const _eResult = this.#_e(t2);
      if (!_eResult.isNull()) {
        const s2 =
          globalThis.natives.LogicClientAvatar_isHeroOrItemUnlocked(
            homeMode_getPlayerAvatarResult,
            _eResult,
          ) !== 0;
        if (s2) {
          const logicClientAvatar_getHeroLevelResult =
            globalThis.natives.LogicClientAvatar_getHeroLevel(
              homeMode_getPlayerAvatarResult,
              _eResult,
            );
          const logicClientAvatar_getHeroScoreResult =
            globalThis.natives.LogicClientAvatar_getHeroScore(
              homeMode_getPlayerAvatarResult,
              _eResult,
            );
          record[t2] = {
            name: t2,
            instance: _eResult,
            unlocked: s2,
            powerLevel: logicClientAvatar_getHeroLevelResult,
            trophies: logicClientAvatar_getHeroScoreResult,
          };
        }
      }
    }
    return {
      selectedName: peResult,
      brawlers: record,
      totalTrophies: globalThis.natives.LogicClientAvatar_getScore(homeMode_getPlayerAvatarResult),
    };
  }
  #_e(text2) {
    if (!Object.prototype.hasOwnProperty.call(this.characterData, text2)) {
      const pointer = Memory.allocUtf8String(text2);
      const unescapeResult = unescape(encodeURIComponent(text2));
      const memoryBuffer = Memory.alloc(16);
      memoryBuffer.writeU32(text2.length);
      memoryBuffer.add(4).writeU32(unescapeResult.length);
      unescapeResult.length > 7
        ? memoryBuffer.add(8).writePointer(pointer)
        : memoryBuffer.add(8).writeUtf8String(text2);
      this.nativeStrings[text2] = {
        string: memoryBuffer,
        content: pointer,
      };
      this.characterData[text2] = globalThis.natives.LogicDataTables_getCharacterByName(
        memoryBuffer,
        0,
      );
    }
    return this.characterData[text2];
  }
  #Pe(t) {
    if (t.isNull()) {
      return "";
    }
    const s32 = t.add(4).readS32();
    if (s32 <= 0 || s32 > 4096) {
      return "";
    }
    const i = s32 < 8 ? t.add(8) : t.add(8).readPointer();
    if (i.isNull()) {
      return "";
    }
    return i.readUtf8String(s32);
  }
  #xe(e, i, lastReadyTime) {
    if (
      this.lastReadyTime !== null &&
      lastReadyTime - this.lastReadyTime < this.settings.readyCooldown
    ) {
      return;
    }
    if (i && e.team.readPointer().isNull()) {
      const currentEvent = ma.getCurrentEvent(e.page);
      if (!currentEvent.isNull()) {
        globalThis.natives.TeamManager_createTeam(
          e.team,
          0,
          currentEvent.readU32(),
          currentEvent.add(4).readU32(),
          ptr(0),
        );
        this.lastReadyTime = lastReadyTime;
      }
      return;
    }
    if ((globalThis.natives.TeamManager_isPlayerReady(e.team) !== 0) === i) {
      return;
    }
    const pointer = globalThis.offsets.MessageManager_instance.readPointer();
    if (pointer.isNull()) {
      return;
    }
    const readyMessageSize = t58.readyMessageSize;
    const mallocResult = globalThis.pointers.malloc(readyMessageSize);
    if (mallocResult.isNull()) {
      return;
    }
    mallocResult.writeByteArray(new ArrayBuffer(readyMessageSize));
    globalThis.natives.TeamSetMemberReadyMessage_ctor(mallocResult);
    mallocResult.add(t58.readyStateOffset).writeU8(Number(i));
    const pointer2 = pointer
      .readPointer()
      .add(3 * Process.pointerSize)
      .readPointer();
    new NativeFunction(pointer2, "long", ["pointer", "pointer"])(pointer, mallocResult);
    this.lastReadyTime = lastReadyTime;
    return;
  }
}

var fa = t58;
