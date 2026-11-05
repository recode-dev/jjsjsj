/**
 * game/battle.js
 *
 * BattleScreen / BattleMode wrappers: match state, HUD, end popup, event modifiers.
 *
 * Symbols: le, t17, de, t18, ue, Pe, _e, Ie, t28, Be, Fe, Je, Qe, t34, li, t50, Ls, Rs, t51, Es
 * Source: bundle lines 7421-22505 (21 statements)
 */


class le {
  static InnerMask;
  static OuterMask;
  static TypeWords;
  static RoundConstants;
  static InitialState;
  static rotr;
  constructor() {
    return;
  }
  static {
    this.InnerMask = [124, 77, 26, 171, 215, 197, 96, 190, 242, 227, 88, 57, 148, 133, 33, 15];
    this.OuterMask = [22, 39, 112, 193, 189, 175, 10, 212, 152, 137, 50, 83, 254, 239, 75, 101];
    this.TypeWords = [
      3536302499, 3097949668, 1329474844, 2373741402, 723128222, 1868451132, 2912717690, 740102078,
      2070568782, 263101836, 2767446737, 1211573781, 2356898393, 470789789, 1515142701, 2660072555,
      756812719, 3064329443, 1346975783, 2676849771, 773655727, 3081172451, 1076377879,
    ];
    this.RoundConstants = [
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
      3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
      3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
      666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
      2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
      1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
      3329325298,
    ];
    this.InitialState = [
      1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225,
    ];
    this.rotr = (t, e) => (t >>> e) | (t << (32 - e));
  }
  static byteSwap32(t) {
    return (((255 & t) << 24) | ((65280 & t) << 8) | ((t >>> 8) & 65280) | (t >>> 24)) >>> 0;
  }
  static compress(t, e) {
    const uint32Values = new Uint32Array(64);
    uint32Values.set(e);
    for (let index = 16; index < 64; index++) {
      const e2 =
        this.rotr(uint32Values[index - 15], 7) ^
        this.rotr(uint32Values[index - 15], 18) ^
        (uint32Values[index - 15] >>> 3);
      const s =
        this.rotr(uint32Values[index - 2], 17) ^
        this.rotr(uint32Values[index - 2], 19) ^
        (uint32Values[index - 2] >>> 10);
      uint32Values[index] = (uint32Values[index - 16] + e2 + uint32Values[index - 7] + s) >>> 0;
    }
    let [s2, a, n, r, o, l, c, h] = t;
    for (let index2 = 0; index2 < 64; index2++) {
      const e3 = this.rotr(o, 6) ^ this.rotr(o, 11) ^ this.rotr(o, 25);
      const d =
        (h + e3 + ((o & l) ^ (~o & c)) + this.RoundConstants[index2] + uint32Values[index2]) >>> 0;
      const u = this.rotr(s2, 2) ^ this.rotr(s2, 13) ^ this.rotr(s2, 22);
      const g = (s2 & a) ^ (s2 & n) ^ (a & n);
      h = c;
      c = l;
      l = o;
      o = (r + d) >>> 0;
      r = n;
      n = a;
      a = s2;
      s2 = (d + ((u + g) >>> 0)) >>> 0;
    }
    return t.map((t, e) => (t + [s2, a, n, r, o, l, c, h][e]) >>> 0);
  }
  static padBlock(t, e) {
    const uint32Values = new Uint32Array(16);
    uint32Values.set(t);
    uint32Values[t.length] = 2147483648;
    uint32Values[14] = Math.floor(e / 4294967296);
    uint32Values[15] = e >>> 0;
    return uint32Values;
  }
  static maskWords(t, e) {
    const uint32Values = new Uint32Array(4);
    for (let index = 0; index < 4; index++) {
      uint32Values[index] =
        (((t[4 * index] ^ e[4 * index]) << 24) |
          ((t[4 * index + 1] ^ e[4 * index + 1]) << 16) |
          ((t[4 * index + 2] ^ e[4 * index + 2]) << 8) |
          (t[4 * index + 3] ^ e[4 * index + 3])) >>>
        0;
    }
    return uint32Values;
  }
  static calculate(t, bytes = new Uint8Array(16)) {
    const u32 = t.add(8).readU32();
    const uint32Values = new Uint32Array([
      this.byteSwap32(u32),
      this.byteSwap32(t.add(12).readU32()),
      this.byteSwap32(t.add(16).readU32()),
      this.byteSwap32(t.add(4).readU32()),
    ]);
    const uint32Values2 = new Uint32Array(16);
    uint32Values2.set(this.maskWords(this.InnerMask, bytes));
    uint32Values2.fill(909522486, 4);
    const compressResult = this.compress(this.InitialState.slice(), uint32Values2);
    const padBlockResult = this.padBlock(
      new Uint32Array([
        uint32Values[0],
        uint32Values[1],
        uint32Values[2],
        uint32Values[3],
        this.TypeWords[u32] ?? 3735928559,
      ]),
      672,
    );
    const compressResult2 = this.compress(compressResult, padBlockResult);
    const uint32Values3 = new Uint32Array(16);
    uint32Values3.set(this.maskWords(this.OuterMask, bytes));
    uint32Values3.fill(1549556828, 4);
    const compressResult3 = this.compress(this.InitialState.slice(), uint32Values3);
    const padBlockResult2 = this.padBlock(new Uint32Array(compressResult2), 768);
    const compressResult4 = this.compress(compressResult3, padBlockResult2);
    let u = ((compressResult4[0] >>> 24) | (((compressResult4[0] >>> 16) & 127) << 8)) >>> 0;
    if (u <= 1) {
      u = 1;
    }
    return u;
  }
  static sign(t) {
    const battleMode_getInstanceResult = globalThis.natives.BattleMode_getInstance();
    if (
      !battleMode_getInstanceResult ||
      battleMode_getInstanceResult.isNull() ||
      battleMode_getInstanceResult.add(112).readU8() !== 1
    ) {
      return false;
    }
    const bytes = new Uint8Array(battleMode_getInstanceResult.add(96).readByteArray(16));
    t.add(52).writeU32(this.calculate(t, bytes));
    return true;
  }
}

class t17 {
  static tickOffset;
  static logicOffset;
  static playerArrayOffset;
  static playerCountOffset;
  static ownPlayerIndexOffset;
  static ownPlayerTeamOffset;
  static ownCharacterGlobalIDOffset;
  static controlledCharacterGlobalIDOffset;
  static gameOverOffset;
  static logicDataTablesOffset;
  static objectManagerOffset;
  static screenGameStartedOffset;
  static screenTargetXOffset;
  static screenTargetYOffset;
  static tickDurationMs;
  static inactiveTimeOffset;
  static id;
  static round;
  static generation;
  static screen;
  static screenPointer;
  static resetting;
  static playerPointers;
  static characterTypeGetters;
  static instance;
  static _tileMap;
  constructor() {
    if (t17.instance) {
      return t17.instance;
    }
    t17.instance = this;
    this.instance = null;
    Interceptor.attach(globalThis.offsets.LogicBattleModeClient_update, {
      onEnter(t) {
        this.instance = t[0];
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.BattleScreen_update, {
      onEnter(e) {
        t17.screenPointer = e[0];
        const screen = e[0].toString();
        if (t17.screen !== screen) {
          t17.screen = screen;
          ++t17.id;
          t17.round = 0;
          t17.resetting = false;
          ++t17.generation;
          t17.playerPointers = [];
          t17._tileMap = null;
        }
        if (!t17._tileMap) {
          const gameScreen_getLogicBattleResult = globalThis.natives.GameScreen_getLogicBattle(
            e[0],
          );
          if (gameScreen_getLogicBattleResult.isNull()) {
            return;
          }
          const logicBattleModeClient_getTileMapResult =
            globalThis.natives.LogicBattleModeClient_getTileMap(gameScreen_getLogicBattleResult);
          if (!logicBattleModeClient_getTileMapResult.isNull()) {
            t17._tileMap = new ie(logicBattleModeClient_getTileMapResult);
          }
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.GameStateManager_changeToState, {
      onEnter() {
        t17.screenPointer = null;
        t17.screen = null;
        t17._tileMap = null;
        t17.playerPointers = [];
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.LogicBattleModeClient_isGameOverOrRoundResetting, {
      onLeave(e) {
        const resetting = e.toInt32() !== 0;
        if (!t17.resetting && resetting) {
          ++t17.round;
          t17.generation++;
        }
        t17.resetting = resetting;
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.LogicTile_setData, {
      onEnter(t) {
        this.tilePtr = t[0];
        return;
      },
      onLeave() {
        if (re.isState(re.states.BATTLE) && t17._tileMap) {
          t17._tileMap.updateTile(this.tilePtr);
        }
        return;
      },
    });
    return;
  }
  static {
    this.tickOffset = 72;
    this.logicOffset = 40;
    this.playerArrayOffset = 0;
    this.playerCountOffset = 12;
    this.ownPlayerIndexOffset = 224;
    this.ownPlayerTeamOffset = 228;
    this.ownCharacterGlobalIDOffset = 256;
    this.controlledCharacterGlobalIDOffset = 260;
    this.gameOverOffset = 284;
    this.logicDataTablesOffset = 292;
    this.objectManagerOffset = 40;
    this.screenGameStartedOffset = 3998;
    this.screenTargetXOffset = 4012;
    this.screenTargetYOffset = 4016;
    this.tickDurationMs = 50;
    this.inactiveTimeOffset = 4000;
    this.id = 0;
    this.round = 0;
    this.generation = 0;
    this.screen = null;
    this.screenPointer = null;
    this.resetting = false;
    this.playerPointers = [];
    this.characterTypeGetters = new Map();
    this.instance = null;
    this._tileMap = null;
  }
  get battleMode() {
    return globalThis.natives.BattleMode_getInstance();
  }
  get logicBattle() {
    const battleMode = this.battleMode;
    if (battleMode.isNull()) {
      return ptr(0);
    }
    return battleMode.add(t17.logicOffset).readPointer();
  }
  get logicPlayers() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return ptr(0);
    }
    return logicBattle2.add(t17.playerArrayOffset).readPointer();
  }
  get playerCount() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return 0;
    }
    return logicBattle2.add(t17.playerCountOffset).readS32();
  }
  get ownPlayerIndex() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return -1;
    }
    return logicBattle2.add(t17.ownPlayerIndexOffset).readS32();
  }
  get ownPlayerTeam() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return -1;
    }
    return logicBattle2.add(t17.ownPlayerTeamOffset).readS32();
  }
  get characterGlobalID() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return 0;
    }
    return (
      logicBattle2.add(t17.controlledCharacterGlobalIDOffset).readS32() ||
      logicBattle2.add(t17.ownCharacterGlobalIDOffset).readS32()
    );
  }
  get gameOverValue() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return 0;
    }
    return logicBattle2.add(t17.gameOverOffset).readS32();
  }
  get logicDataTablesAvailable() {
    const logicBattle2 = this.logicBattle;
    return !logicBattle2.isNull() && logicBattle2.add(t17.logicDataTablesOffset).readU8() !== 0;
  }
  get objectManager() {
    const logicBattle2 = this.logicBattle;
    if (logicBattle2.isNull()) {
      return ptr(0);
    }
    return logicBattle2.add(t17.objectManagerOffset).readPointer();
  }
  get gameStarted() {
    const screenPointer = t17.screenPointer;
    return Boolean(
      screenPointer &&
        !screenPointer.isNull() &&
        screenPointer.add(t17.screenGameStartedOffset).readU8() !== 0,
    );
  }
  get goal() {
    const screenPointer = t17.screenPointer;
    if (!screenPointer || screenPointer.isNull()) {
      return null;
    }
    return [
      screenPointer.add(t17.screenTargetXOffset).readS32(),
      screenPointer.add(t17.screenTargetYOffset).readS32(),
    ];
  }
  static get battleMode() {
    return globalThis.natives.BattleMode_getInstance();
  }
  static get tick() {
    const instance = t17.instance?.instance;
    if (!instance || instance.isNull()) {
      return null;
    }
    return instance.add(t17.tickOffset).readS32();
  }
  get tick() {
    return t17.tick;
  }
  get totalTime() {
    return 0;
  }
  get currentTime() {
    return 0;
  }
  get timeLeft() {
    return Math.max(0, this.totalTime - this.currentTime);
  }
  get tileMap() {
    if (!this.instance || this.instance.isNull()) {
      return ptr(0);
    }
    return globalThis.natives.LogicBattleModeClient_getTileMap(this.instance);
  }
  get ping() {
    return new he().ping;
  }
  get skillSpawnDelayMs() {
    const numberResult = Number(this.ping);
    return (Number.isFinite(numberResult) ? Math.max(0, numberResult) : 0) + 2 * t17.tickDurationMs;
  }
  static get tileMap() {
    return t17._tileMap;
  }
  static refreshAccessoryRangeIndicator(e) {
    const screenPointer = t17.screenPointer;
    if (re.isState(re.states.BATTLE) && screenPointer && !screenPointer.isNull()) {
      globalThis.natives.BattleScreen_refreshAccessoryRangeIndicator(screenPointer, e ? 1 : 0);
    }
    return;
  }
  isPlayfieldMirrored() {
    return globalThis.offsets.CombatHUD_mirrorPlayfield.readU8() !== 0;
  }
  isMirror() {
    return this.isPlayfieldMirrored();
  }
  get players() {
    return t17.playerPointers.filter((t) => t && !t.isNull()).map((t, e) => new Qt(t, e));
  }
  static setPlayers() {
    if (this.battleMode.isNull()) {
      t17.playerPointers = [];
      return;
    }
    const pointer = this.battleMode.add(40).readPointer();
    if (pointer.isNull()) {
      t17.playerPointers = [];
      return;
    }
    const pointer2 = pointer.readPointer();
    const s32 = pointer.add(12).readS32();
    t17.playerPointers = [];
    if (!pointer2.isNull() && !(s32 <= 0) && !(s32 > 32)) {
      for (let index = 0; index < s32; index++) {
        const pointer3 = pointer2.add(index * Process.pointerSize).readPointer();
        t17.playerPointers[index] = pointer3;
      }
    }
    return;
  }
  static getCharacterPointerForPlayer(e) {
    if (!Number.isInteger(e) || e < 0) {
      return ptr(0);
    }
    const instance = t17.instance?.instance;
    if (!instance || instance.isNull()) {
      return ptr(0);
    }
    const pointer = instance.add(40).readPointer();
    if (pointer.isNull()) {
      return ptr(0);
    }
    const pointer2 = pointer.readPointer();
    const s32 = pointer.add(12).readS32();
    if (pointer2.isNull() || s32 <= 0 || s32 > 512) {
      return ptr(0);
    }
    for (let index = 0; index < s32; index++) {
      const pointer3 = pointer2.add(index * Process.pointerSize).readPointer();
      if (!pointer3.isNull()) {
        const pointer4 = pointer3.readPointer().add(40).readPointer();
        const text2 = pointer4.toString();
        let getResult = t17.characterTypeGetters.get(text2);
        if (!getResult) {
          getResult = new NativeFunction(pointer4, "int", ["pointer"]);
          t17.characterTypeGetters.set(text2, getResult);
        }
        if (getResult(pointer3) === 0 && pointer3.add(60).readS32() === e) {
          return pointer3;
        }
      }
    }
    return ptr(0);
  }
  static getCharacterPointers() {
    const instance = t17.instance?.instance;
    if (!instance || instance.isNull()) {
      return [];
    }
    const pointer = instance.add(40).readPointer();
    if (pointer.isNull()) {
      return [];
    }
    const pointer2 = pointer.readPointer();
    const s32 = pointer.add(12).readS32();
    if (pointer2.isNull() || s32 <= 0 || s32 > 512) {
      return [];
    }
    const items = [];
    for (let index = 0; index < s32; index++) {
      const pointer3 = pointer2.add(index * Process.pointerSize).readPointer();
      if (!pointer3.isNull()) {
        const pointer4 = pointer3.readPointer().add(40).readPointer();
        const text2 = pointer4.toString();
        let getResult = t17.characterTypeGetters.get(text2);
        if (!getResult) {
          getResult = new NativeFunction(pointer4, "int", ["pointer"]);
          t17.characterTypeGetters.set(text2, getResult);
        }
        if (getResult(pointer3) === 0) {
          items.push(pointer3);
        }
      }
    }
    return items;
  }
  get me() {
    if (!re.isState(re.states.BATTLE)) {
      this.instance = null;
      return null;
    }
    const battleMode = this.battleMode;
    if (!battleMode || battleMode.isNull()) {
      this.instance = null;
      return null;
    }
    const instance = battleMode.add(40).readPointer();
    if (!instance || instance.isNull()) {
      this.instance = null;
      return null;
    }
    this.instance = instance;
    const logicBattleModeClient_getOwnCharacterResult =
      globalThis.natives.LogicBattleModeClient_getOwnCharacter(instance);
    if (
      !logicBattleModeClient_getOwnCharacterResult ||
      logicBattleModeClient_getOwnCharacterResult.isNull()
    ) {
      return null;
    }
    return new Te(logicBattleModeClient_getOwnCharacterResult);
  }
  setClientPredictionMoveTo(t, e, i = true) {
    globalThis.natives.LogicBattleModeClient_setClientPredictionMoveTo(
      this.instance,
      t,
      e,
      i ? 1 : 0,
    );
    return true;
  }
  resetInactiveTime() {
    const screenPointer = t17.screenPointer;
    return (
      !!screenPointer &&
      !screenPointer.isNull() &&
      !(screenPointer.add(t17.inactiveTimeOffset).writeFloat(0), 0)
    );
  }
  getClosestTargetForAutoshoot(e) {
    const me2 = this.me;
    if (!me2 || !e) {
      return null;
    }
    const data = new ne(e).data;
    const logicGameObjectClient_getCurrentTeamIndexResult =
      globalThis.natives.LogicGameObjectClient_getCurrentTeamIndex(me2.ptr, this.instance);
    const battleScreen_getClosestTargetForAutoshootResult =
      globalThis.natives.BattleScreen_getClosestTargetForAutoshoot(
        t17.screenPointer,
        me2.ptr,
        99999,
        0,
        0,
        data,
        0,
        0,
        logicGameObjectClient_getCurrentTeamIndexResult,
      );
    if (battleScreen_getClosestTargetForAutoshootResult.isNull()) {
      return null;
    }
    return new Se(battleScreen_getClosestTargetForAutoshootResult);
  }
  isUltiReady(t) {
    const logicBattle2 = this.logicBattle;
    return logicBattle2 && t
      ? globalThis.natives.LogicBattleModeClient_isUltiReadyForClient(logicBattle2, t.ptr) !== 0
      : !!logicBattle2 && !!t;
  }
  isBonusSkillReady(t) {
    const logicBattle2 = this.logicBattle;
    return logicBattle2 && t
      ? globalThis.natives.LogicBattleModeClient_isBonusSkillReadyForClient(logicBattle2, t.ptr) !==
          0
      : !!logicBattle2 && !!t;
  }
}

var de = t17;

class t18 {
  static typeOffset;
  static activeOffset;
  static supportedTypes;
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  static {
    this.typeOffset = 36;
    this.activeOffset = 60;
    this.supportedTypes = new Set([23, 59]);
  }
  get isNull() {
    return !this.ptr || this.ptr.isNull();
  }
  get type() {
    if (this.isNull) {
      return null;
    }
    return this.ptr.add(t18.typeOffset).readU8();
  }
  get active() {
    return !this.isNull && this.ptr.add(t18.activeOffset).readU8() !== 0;
  }
  set active(e) {
    if (!this.isNull) {
      this.ptr.add(t18.activeOffset).writeU8(e ? 1 : 0);
    }
    return;
  }
  get isSupported() {
    return t18.supportedTypes.has(this.type);
  }
}

var ue = t18;

class Pe extends Ae {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  get rawX() {
    return globalThis.natives.BattleScreen_getShootStickX(this.screen);
  }
  set rawX(t) {
    this.screen
      .add(globalThis.utils.getNativeFieldOffset("BattleScreen_getShootStickX"))
      .writeFloat(Number(t));
    return;
  }
  get rawY() {
    return globalThis.natives.BattleScreen_getShootStickY(this.screen);
  }
  set rawY(t) {
    this.screen
      .add(globalThis.utils.getNativeFieldOffset("BattleScreen_getShootStickY"))
      .writeFloat(Number(t));
    return;
  }
  get centerX() {
    return globalThis.natives.BattleScreen_getShootStickBgX(this.screen);
  }
  get centerY() {
    return globalThis.natives.BattleScreen_getShootStickBgY(this.screen);
  }
  get x() {
    return this.rawX - this.centerX;
  }
  set x(t) {
    this.rawX = this.centerX + Number(t);
    return;
  }
  get y() {
    return this.rawY - this.centerY;
  }
  set y(t) {
    this.rawY = this.centerY + Number(t);
    return;
  }
  get xy() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  set xy(t) {
    this.rawX = this.centerX + Number(t.x);
    this.rawY = this.centerY + Number(t.y);
    return;
  }
  get active() {
    return globalThis.natives.BattleScreen_isShootStickActive(this.screen) !== 0;
  }
  set active(t) {
    this.screen
      .add(globalThis.utils.getNativeFieldOffset("BattleScreen_isShootStickActive"))
      .writeU8(t ? 1 : 0);
    return;
  }
  get held() {
    return this.movementFlags !== 0 && Math.hypot(this.x, this.y) > this.deadzone;
  }
  get state() {
    return {
      held: this.held,
      active: this.active,
      x: this.x,
      y: this.y,
    };
  }
  hold() {
    this.active = true;
    return this.state;
  }
  release() {
    this.active = false;
    this.xy = {
      x: 0,
      y: 0,
    };
    return this.state;
  }
}

class _e extends Ae {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  get rawX() {
    return globalThis.natives.BattleScreen_getUltiStickX(this.screen);
  }
  set rawX(t) {
    this.screen
      .add(globalThis.utils.getNativeFieldOffset("BattleScreen_getUltiStickX"))
      .writeFloat(Number(t));
    return;
  }
  get rawY() {
    return globalThis.natives.BattleScreen_getUltiStickY(this.screen);
  }
  set rawY(t) {
    this.screen
      .add(globalThis.utils.getNativeFieldOffset("BattleScreen_getUltiStickY"))
      .writeFloat(Number(t));
    return;
  }
  get centerX() {
    return globalThis.natives.BattleScreen_getUltiStickBgX(this.screen);
  }
  get centerY() {
    return globalThis.natives.BattleScreen_getUltiStickBgY(this.screen);
  }
  get x() {
    return this.rawX - this.centerX;
  }
  set x(t) {
    this.rawX = this.centerX + Number(t);
    return;
  }
  get y() {
    return this.rawY - this.centerY;
  }
  set y(t) {
    this.rawY = this.centerY + Number(t);
    return;
  }
  get xy() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  set xy(t) {
    this.rawX = this.centerX + Number(t.x);
    this.rawY = this.centerY + Number(t.y);
    return;
  }
  get active() {
    return globalThis.natives.BattleScreen_isUltiStickActive(this.screen) !== 0;
  }
  set active(t) {
    this.screen
      .add(globalThis.utils.getNativeFieldOffset("BattleScreen_isUltiStickActive"))
      .writeU8(t ? 1 : 0);
    return;
  }
  get held() {
    return Math.hypot(this.x, this.y) > this.deadzone;
  }
  get state() {
    return {
      held: this.held,
      active: this.active,
      x: this.x,
      y: this.y,
    };
  }
  hold() {
    this.active = true;
    return this.state;
  }
  release() {
    this.active = false;
    this.xy = {
      x: 0,
      y: 0,
    };
    return this.state;
  }
}

var Ie = ke;

class t28 {
  static lookaheadDistance;
  static destinationTolerance;
  static sendInterval;
  constructor({ installHooks: installHooks = true } = {}) {
    var installHooks2 = installHooks;
    this.battle = new de();
    this.moveStick = new ke(this.battle);
    this.moving = false;
    this.finalX = 0;
    this.finalY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.lastSendAt = 0;
    this.resolveMove = null;
    if (installHooks2) {
      Interceptor.attach(globalThis.offsets.BattleScreen_updateMovement, {
        onEnter: (t) => {
          this.moveStick.screen = t[0];
          if (this.moving) {
            this.update();
          }
          return;
        },
      });
    }
    return;
  }
  static {
    this.lookaheadDistance = 600;
    this.destinationTolerance = 24;
    this.sendInterval = 50;
  }
  sendTarget(t, e, i = true, s = false) {
    const sendMoveResult = new he().sendMove(t, e, 2);
    if (sendMoveResult) {
      this.battle.setClientPredictionMoveTo(t, e, i);
      if (s) {
        this.battle.resetInactiveTime();
      }
      return sendMoveResult;
    }
    return null;
  }
  update() {
    const {
      battle: { me: me2 },
    } = this;
    if (!me2) {
      this.finish(false);
      return;
    }
    const difference = this.finalX - me2.x;
    const difference2 = this.finalY - me2.y;
    const hypotResult = Math.hypot(difference, difference2);
    const {
      moveStick: { held: held },
    } = this;
    const combinedValue = difference * this.directionX + difference2 * this.directionY;
    if (held && combinedValue <= 0) {
      this.moveStick.invalidateMovement();
      this.finish(true);
      return;
    }
    if (!held && hypotResult <= t28.destinationTolerance) {
      this.moveStick.clearState();
      this.finish(true);
      return;
    }
    held
      ? (this.moveStick.screen.add(ke.movementStateOffset).writeFloat(1),
        this.moveStick.screen.add(ke.movementFlagsOffset).writeU16(257))
      : this.moveStick.screen.add(ke.movementFlagsOffset).writeU16(0);
    const quotient =
      (held ? t28.lookaheadDistance : Math.min(t28.lookaheadDistance, hypotResult)) / hypotResult;
    const roundResult = Math.round(me2.x + difference * quotient);
    const roundResult2 = Math.round(me2.y + difference2 * quotient);
    const lastSendAt = Date.now();
    if (lastSendAt - this.lastSendAt >= t28.sendInterval) {
      this.sendTarget(roundResult, roundResult2);
      this.lastSendAt = lastSendAt;
    }
    return;
  }
  moveTo(t, e) {
    return this.startMovement(Math.round(t), Math.round(e));
  }
  moveBy(t, e) {
    const {
      battle: { me: me2 },
    } = this;
    if (me2) {
      return this.startMovement(Math.round(me2.x + t), Math.round(me2.y + e));
    }
    return Promise.resolve(false);
  }
  moveByChunks(t, e) {
    return this.moveBy(t, e);
  }
  startMovement(finalX, finalY) {
    if (this.resolveMove) {
      this.resolveMove(false);
    }
    const {
      battle: { me: me2 },
    } = this;
    if (!me2) {
      return Promise.resolve(false);
    }
    this.finalX = finalX;
    this.finalY = finalY;
    const difference = finalX - me2.x;
    const difference2 = finalY - me2.y;
    const hypotResult = Math.hypot(difference, difference2);
    this.directionX = difference / hypotResult;
    this.directionY = difference2 / hypotResult;
    this.lastSendAt = 0;
    this.moving = true;
    return new Promise((resolveMove) => {
      this.resolveMove = resolveMove;
      return;
    });
  }
  finish(t) {
    this.moving = false;
    this.lastSendAt = 0;
    const resolveMove = this.resolveMove;
    this.resolveMove = null;
    if (resolveMove) {
      resolveMove(t);
    }
    return;
  }
  cancel() {
    if (this.moving) {
      try {
        const {
          battle: { me: me2 },
        } = this;
        if (me2) {
          const roundResult = Math.round(me2.x);
          const roundResult2 = Math.round(me2.y);
          new he().sendMove(roundResult, roundResult2, 2);
          this.battle.setClientPredictionMoveTo(roundResult, roundResult2, false);
        }
      } catch (t2) {}
    }
    this.finish(false);
    return;
  }
}

var Be = t28;

var Fe = Be;

var undefinedValue = undefined;

class Je {
  constructor(movement) {
    this.movement = movement;
    this.target = null;
    this.updateMovementDepth = 0;
    this.frameCalculationMade = false;
    this.suppressOverride = false;
    Interceptor.attach(globalThis.offsets.BattleScreen_updateMovement, {
      onEnter() {
        ++this.updateMovementDepth;
        this.frameCalculationMade = false;
        return;
      },
      onLeave() {
        this.updateMovementDepth = Math.max(0, this.updateMovementDepth - 1);
        if (this.updateMovementDepth || this.frameCalculationMade || !this.target) {
          return;
        }
        const { target: target, movement: movement2 } = this;
        if (
          !movement2.moving ||
          Math.hypot(movement2.finalX - target.x, movement2.finalY - target.y) > 24
        ) {
          movement2.moveTo(target.x, target.y);
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.BattleScreen_calculateNewMovePosition, {
      onEnter(t) {
        this.character = t[1];
        const me2 = new de().me;
        this.isCurrentCharacter = Boolean(me2 && this.character.compare(me2.ptr) === 0);
        this.shouldPatch =
          this.updateMovementDepth > 0 &&
          !this.suppressOverride &&
          Boolean(this.target) &&
          this.isCurrentCharacter;
        if (this.updateMovementDepth > 0 && !this.suppressOverride && this.isCurrentCharacter) {
          this.frameCalculationMade = true;
        }
        return;
      },
      onLeave(t) {
        if (this.shouldPatch && this.target) {
          t.replace(Ke(this.target.x, this.target.y));
        }
        return;
      },
    });
    return;
  }
  get moveStick() {
    return this.movement?.moveStick ?? null;
  }
  get moving() {
    return this.movement?.moving ?? false;
  }
  setTarget(t) {
    if (!t || !Number.isFinite(t.x) || !Number.isFinite(t.y)) {
      if (!this.target) {
        return;
      }
      this.target = null;
      if (this.movement?.moving) {
        this.movement.finish(false);
      }
      return;
    }
    const target = {
      x: Math.round(t.x),
      y: Math.round(t.y),
    };
    if (this.target && Math.hypot(this.target.x - target.x, this.target.y - target.y) <= 1) {
      return;
    }
    const booleanResult = Boolean(
      this.target &&
        this.movement?.moving &&
        Math.hypot(this.target.x - target.x, this.target.y - target.y) > 24,
    );
    this.target = target;
    if (booleanResult) {
      this.movement.moveTo(target.x, target.y);
    }
    return;
  }
  moveTo(t, e) {
    this.setTarget({
      x: t,
      y: e,
    });
    return Promise.resolve(Boolean(this.target));
  }
  withOverrideSuppressed(t) {
    this.suppressOverride = true;
    try {
      return t();
    } finally {
      this.suppressOverride = false;
    }
  }
  cancel() {
    this.target = null;
    if (this.movement == null) {
      return;
    }
    this.movement.finish(false);
    return;
  }
}

var Qe = Je;

class t34 {
  static combatHudOffset;
  constructor() {
    return;
  }
  static {
    this.combatHudOffset = 1024;
  }
  get battleScreen() {
    if (!re.isState(re.states.BATTLE)) {
      return null;
    }
    const screenPointer = de.screenPointer;
    if (!screenPointer || screenPointer.isNull()) {
      return null;
    }
    return screenPointer;
  }
  get combatHud() {
    if (!re.isState(re.states.BATTLE)) {
      return ptr(0);
    }
    const battleScreen = this.battleScreen;
    if (!battleScreen) {
      return ptr(0);
    }
    const battleScreen_getCombatHUDResult =
      globalThis.natives.BattleScreen_getCombatHUD(battleScreen);
    if (!battleScreen_getCombatHUDResult || battleScreen_getCombatHUDResult.isNull()) {
      return ptr(0);
    }
    return battleScreen_getCombatHUDResult;
  }
  setConnectionIndicatorVisible(e, i) {
    if (!i || i.isNull()) {
      return null;
    }
    const pointer = i.add(t34.combatHudOffset).readPointer();
    if (!pointer || pointer.isNull()) {
      return null;
    }
    new ge(pointer).visible = Boolean(e);
    return true;
  }
}

var li = t34;

class t50 {
  static subscribers;
  static interceptors;
  static installed;
  static pressReplacement;
  static originalHandleTouchPressed;
  static xOffset;
  static yOffset;
  static idOffset;
  constructor() {
    return;
  }
  static {
    this.subscribers = new Set();
    this.interceptors = [];
    this.installed = false;
    this.pressReplacement = null;
    this.originalHandleTouchPressed = null;
    this.xOffset = 52;
    this.yOffset = 56;
    this.idOffset = 80;
  }
  static subscribe(e) {
    t50.install();
    t50.subscribers.add(e);
    return () => t50.subscribers.delete(e);
  }
  static install() {
    if (t50.installed) {
      return;
    }
    t50.pressReplacement = new NativeCallback(
      (e, i) => {
        if (e.isNull() || i.isNull()) {
          return t50.originalHandleTouchPressed(e, i);
        }
        const event = t50.readEvent(e, i);
        for (const e2 of t50.subscribers) {
          if (e2.onPress?.(event)) {
            return 0;
          }
        }
        return t50.originalHandleTouchPressed(e, i);
      },
      "int64",
      ["pointer", "pointer"],
    );
    const replaceFastResult = Interceptor.replaceFast(
      globalThis.offsets.BattleScreen_handleTouchPressed,
      t50.pressReplacement,
    );
    t50.originalHandleTouchPressed = new NativeFunction(replaceFastResult, "int64", [
      "pointer",
      "pointer",
    ]);
    t50.attach(globalThis.offsets.BattleScreen_handleTouchMoved, "onMove");
    t50.attach(globalThis.offsets.BattleScreen_handleTouchReleased, "onRelease");
    t50.attach(globalThis.offsets.BattleScreen_handleTouchCancelled, "onCancel", true);
    t50.installed = true;
    return;
  }
  static attach(e, i, s = false) {
    t50.interceptors.push(
      Interceptor.attach(e, {
        onEnter(e) {
          if (!s && (e[0].isNull() || e[1].isNull())) {
            return;
          }
          const a = s
            ? {
                screen: e[0],
                id: e[1].toInt32(),
              }
            : t50.readEvent(e[0], e[1]);
          for (const e2 of t50.subscribers) {
            e2[i]?.(a);
          }
          return;
        },
      }),
    );
    return;
  }
  static readEvent(e, i) {
    return {
      screen: e,
      pointer: i,
      id: i.add(t50.idOffset).readS32(),
      x: i.add(t50.xOffset).readFloat(),
      y: i.add(t50.yOffset).readFloat(),
    };
  }
}

var Ls = t50;

var Rs = (t) => {
  if (t === 2) {
    return "ulti";
  }
  if (t === 3) {
    return "gadget";
  }
  return "normal";
};

class t51 {
  static releaseSubscription;
  static pendingReleases;
  static releaseScreenKey;
  constructor() {
    this.battle = new de();
    this.#X();
    return;
  }
  static {
    this.releaseSubscription = null;
    this.pendingReleases = new Map();
    this.releaseScreenKey = null;
  }
  #X() {
    t51.releaseSubscription ||= Ls.subscribe({
      onRelease: ({ screen: screen, id: id }) => t51.handleTouchReleased(screen, id),
    });
    return;
  }
  static handleTouchReleased(e, i) {
    if (e.isNull()) {
      return;
    }
    const text2 = e.toString();
    const getResult = t51.pendingReleases.get(text2);
    if (!getResult) {
      return;
    }
    const n = Rs(e.add(3980).readS32());
    let r = false;
    for (let [t, e2] of getResult) {
      if (e2.touchIds.delete(i)) {
        if (t === n) {
          r = true;
        }
        if (e2.touchIds.size === 0) {
          getResult.delete(t);
        }
      }
    }
    if (getResult.size === 0) {
      t51.pendingReleases.delete(text2);
    }
    if (r) {
      globalThis.natives.BattleScreen_handleTouchCancelled(e, i);
    }
    return;
  }
  get me() {
    return this.battle.me;
  }
  markRelease(e, i) {
    if ((e !== "normal" && e !== "ulti") || !i || i.isNull()) {
      return false;
    }
    const releaseScreenKey = i.toString();
    if (t51.releaseScreenKey !== releaseScreenKey) {
      t51.pendingReleases.clear();
      t51.releaseScreenKey = releaseScreenKey;
    }
    const uniqueValues = new Set();
    for (const t of [3976, 3984]) {
      const s32 = i.add(t).readS32();
      if (s32 !== -1) {
        uniqueValues.add(s32);
      }
    }
    if (uniqueValues.size === 0) {
      return false;
    }
    let getResult = t51.pendingReleases.get(releaseScreenKey);
    if (!getResult) {
      getResult = new Map();
      t51.pendingReleases.set(releaseScreenKey, getResult);
    }
    getResult.set(e, {
      touchIds: uniqueValues,
    });
    return true;
  }
  activateSkill(t, e, i, s = false) {
    const a = s ? this.battle.getClosestTargetForAutoshoot(t) : null;
    return !s || a
      ? globalThis.natives.BattleScreen_activateSkill(
          de.screenPointer,
          0 | (s ? a.x : e),
          0 | (s ? a.y : i),
          this.me.ptr,
          t,
          s ? 1 : 0,
          0,
        ) !== 0
      : !s || !!a;
  }
  tryToActivateSkill(t, e, i) {
    const me2 = this.me;
    return me2 && t && !t.isNull()
      ? globalThis.natives.BattleScreen_tryToActivateSkill(
          de.screenPointer,
          me2.ptr,
          t,
          0 | e,
          0 | i,
          0,
          0,
        ) !== 0
      : !!me2 && !!t && !t.isNull();
  }
  shoot(t, e, i = false) {
    return this.activateSkill(this.me.nextSkillClient, t, e, i);
  }
  shootUlti(t, e, i = false) {
    return this.activateSkill(this.me.ultiSkillClient, t, e, i);
  }
  shootGadget(t, e, i = false) {
    return this.activateSkill(this.me.bonusSkillClient, t, e, i);
  }
  activateHyperCharge() {
    return new he().sendHyper();
  }
}

var Es = t51;
