/**
 * game/character.js
 *
 * Character wrappers: health bar, collisions, visual model, movement flags.
 *
 * Symbols: t24, Te, t49, outlineColor, ta, ea, ca, ha, da, ga, pa, t57, ma
 * Source: bundle lines 8618-27442 (14 statements)
 */


class t24 extends Jt {
  static teamFindings;
  static accessoryOffset;
  static hasCarryableOffset;
  static AmmoMovieClipOffset;
  static PlayerMovieClipOffset;
  static LogicPointerOffset;
  static FadeCounterOffset;
  static spawnShieldOffset;
  static interruptedOffset;
  static characterTypeOffset;
  constructor(t, visualCharacter = null) {
    super(t);
    this.speedPtr = null;
    this.teamPtr = null;
    this.visualCharacter = visualCharacter;
    this.battle = new de();
    this.teamKey = t.toString();
    return this;
  }
  static {
    this.teamFindings = new Map();
    this.accessoryOffset = 464;
    this.hasCarryableOffset = 700;
    this.AmmoMovieClipOffset = 2888;
    this.PlayerMovieClipOffset = 1424;
    this.LogicPointerOffset = 16;
    this.FadeCounterOffset = 72;
    this.spawnShieldOffset = 412;
    this.interruptedOffset = 810;
    this.characterTypeOffset = 772;
  }
  get PlayerMovieClip() {
    const e = this.visualCharacter || this.ptr;
    if (!e || e.isNull()) {
      return ptr(0);
    }
    return e.add(t24.PlayerMovieClipOffset).readPointer();
  }
  get ammoClipVisible() {
    if (!this.visualCharacter || this.visualCharacter.isNull()) {
      return null;
    }
    const pointer = this.visualCharacter.add(t24.AmmoMovieClipOffset).readPointer();
    if (pointer.isNull()) {
      return null;
    }
    return pointer.add(8).readU8() !== 0;
  }
  set ammoClipVisible(e) {
    if (!this.visualCharacter || this.visualCharacter.isNull()) {
      return;
    }
    const pointer = this.visualCharacter.add(t24.AmmoMovieClipOffset).readPointer();
    if (!pointer.isNull()) {
      pointer.add(8).writeU8(e ? 1 : 0);
    }
    return;
  }
  get health() {
    return {
      current: this.ptr.add(196).readS32(),
      max: this.ptr.add(200).readS32(),
    };
  }
  get spawnShield() {
    return this.ptr.add(t24.spawnShieldOffset).readU8() !== 0;
  }
  get interrupted() {
    return this.ptr.add(t24.interruptedOffset).readU8() !== 0;
  }
  get isPet() {
    return globalThis.natives.LogicCharacterClient_isPet(this.ptr) !== 0;
  }
  get characterType() {
    const data = this.data;
    if (data.isNull()) {
      return -1;
    }
    return data.add(t24.characterTypeOffset).readS32();
  }
  get isItem() {
    return this.characterType === 17;
  }
  get isCocooned() {
    return this.uniqueProperty === 20;
  }
  setFadeCounter(e) {
    this.ptr.add(t24.FadeCounterOffset).writeS32(e);
    return;
  }
  get data() {
    return globalThis.natives.LogicCharacterClient_getCharacterData(this.ptr);
  }
  get name() {
    const data = this.data;
    if (!data || data.isNull()) {
      return null;
    }
    return new Et(data).name;
  }
  get playerNameTextField() {
    const playerMovieClip = this.PlayerMovieClip;
    if (playerMovieClip.isNull()) {
      return null;
    }
    const textFieldByName = new ve(playerMovieClip).getTextFieldByName("player_name");
    if (textFieldByName.instance.isNull()) {
      return null;
    }
    return textFieldByName;
  }
  get uniqueProperty() {
    const data = this.data;
    if (!data || data.isNull()) {
      return 0;
    }
    return data.add(860).readS32();
  }
  get uniquePropertyValue1() {
    const data = this.data;
    if (!data || data.isNull()) {
      return 0;
    }
    return new Et(data).getIntegerValue("UniquePropertyValue1");
  }
  hasUniqueProperty(t) {
    return this.uniqueProperty === t;
  }
  get level() {
    const data = this.data;
    if (!data || data.isNull()) {
      return 1;
    }
    const integerValue = new Et(data).getIntegerValue("Hitpoints");
    const {
      health: { max: max },
    } = this;
    if (integerValue <= 0 || max <= 0) {
      return 1;
    }
    return 1 + (max - integerValue) / (integerValue / 10);
  }
  canWalkOnWater() {
    return globalThis.natives.LogicCharacterClient_canWalkOnWater(this.ptr) !== 0;
  }
  canMoveThroughWalls() {
    return globalThis.natives.LogicCharacterClient_canMoveThroughWalls(this.ptr) !== 0;
  }
  get pushbackPathFinderSize() {
    return globalThis.natives.LogicCharacterServer_getSizeSubTilesForPathfinding(this.ptr);
  }
  get radius() {
    if (!this.ptr || this.ptr.isNull()) {
      return 0;
    }
    const data = this.data;
    if (!data || data.isNull()) {
      return 0;
    }
    return globalThis.natives.LogicCharacterData_getCollisionRadius(data);
  }
  get basicSkillClient() {
    if (!this.ptr || this.ptr.isNull()) {
      return ptr(0);
    }
    return globalThis.natives.LogicCharacterClient_getWeaponSkillClient(this.ptr);
  }
  get superSkillClient() {
    if (!this.ptr || this.ptr.isNull()) {
      return ptr(0);
    }
    return globalThis.natives.LogicCharacterClientOwn_getUltiSkillClient(this.ptr);
  }
  get gadgetSkillClient() {
    if (!this.ptr || this.ptr.isNull()) {
      return ptr(0);
    }
    return globalThis.natives.LogicCharacterClient_getSkillByEquipType(this.ptr, 5);
  }
  get hyperActive() {
    return this.ptr.add(814).readU8() !== 0;
  }
  get projectileStartRadius() {
    return globalThis.natives.LogicCharacterData_getProjectileStartRadius(this.data);
  }
  get twoWeaponAttackEffectOffset() {
    const data = this.data;
    if (!data || data.isNull()) {
      return 0;
    }
    return new Et(data).getIntegerValue("TwoWeaponAttackEffectOffset");
  }
  get speed() {
    return this.ptr.add(588).readInt();
  }
  get team() {
    return this.ptr.add(64).readInt();
  }
  get playerIndex() {
    return this.ptr.add(60).readS32();
  }
  get player() {
    de.setPlayers();
    const t = de.playerPointers[this.playerIndex];
    if (!t || t.isNull()) {
      return null;
    }
    return t;
  }
  get accessory() {
    const player = this.player;
    if (!player || player.isNull()) {
      return null;
    }
    const pointer = player.add(t24.accessoryOffset).readPointer();
    if (!pointer || pointer.isNull()) {
      return null;
    }
    return new ue(pointer);
  }
  get hasCarryable() {
    return this.ptr.add(t24.hasCarryableOffset).readU8() !== 0;
  }
  canCastSkill(t) {
    if (!t || t.isNull()) {
      return false;
    }
    const e = new ne(t);
    const player = this.player;
    return player
      ? globalThis.natives.LogicCharacterClient_canCastSkill(this.ptr, e.data, player) !== 0
      : !!player;
  }
  get angle() {
    const buffer = new ArrayBuffer(4);
    const float32Values = new Float32Array(buffer);
    const uint32Values = new Uint32Array(buffer);
    const character_getAngleResult = globalThis.natives.Character_getAngle(this.ptr);
    float32Values[0] = character_getAngleResult;
    return uint32Values[0];
  }
  toString() {
    console.log(
      "".concat(
        this.name,
        " Team: ",
        this.team,
        " (",
        this.x,
        ", ",
        this.y,
        ") Angle: ",
        this.angle,
        "º Radius: ",
        this.radius,
        " Speed ",
        this.speed,
        " Health: ",
        this.health.current,
        "/",
        this.health.max,
        " HasCarryable: ",
        this.hasCarryable,
      ),
    );
    return;
  }
}

Se = t24;

class Te extends Se {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  get dynaJumpStarPowerValue() {
    const player = this.player;
    if (player) {
      return globalThis.natives.LogicPlayer_getCardValueForPassive(player, 16, 1);
    }
    return null;
  }
  get hasDynaJumpStarPower() {
    return this.dynaJumpStarPowerValue === 972;
  }
  get nextSkillClient() {
    return globalThis.natives.LogicCharacterClientOwn_getNextSkillClient(this.ptr, this.player);
  }
  get ultiSkillClient() {
    return globalThis.natives.LogicCharacterClientOwn_getUltiSkillClient(this.ptr);
  }
  set bonusSkillButtonActive(t) {
    globalThis.natives.LogicCharacterClientOwn_setBonusSkillButtonActiveClient(this.ptr, t ? 1 : 0);
    return;
  }
  get bonusSkillClient() {
    this.bonusSkillButtonActive = true;
    const nextSkillClient = this.nextSkillClient;
    this.bonusSkillButtonActive = false;
    return nextSkillClient;
  }
  hasAmmoToActivate(t) {
    return globalThis.natives.LogicSkillClient_hasAmmoToActivate(t, this.player, this.ptr) !== 0;
  }
  get hyperReady() {
    return this.ptr.add(813).readU8() !== 0;
  }
  get hyperActive() {
    return this.ptr.add(814).readU8() !== 0;
  }
  get hasHypercharge() {
    return !globalThis.natives.LogicPlayer_getUpgrades(this.player).add(48).readPointer().isNull();
  }
  get isUltiReady() {
    return (
      globalThis.natives.LogicBattleModeClient_isUltiReadyForClient(
        globalThis.natives.BattleMode_getInstance().add(40).readPointer(),
        this.ptr,
      ) !== 0
    );
  }
  get isBonusSkillReady() {
    return (
      globalThis.natives.LogicBattleModeClient_isBonusSkillReadyForClient(
        globalThis.natives.BattleMode_getInstance().add(40).readPointer(),
        this.ptr,
      ) !== 0
    );
  }
}

class t49 {
  static r;
  static g;
  static b;
  static a;
  static patched;
  static enabled;
  constructor() {
    return;
  }
  static {
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 255;
    this.patched = false;
    this.enabled = false;
  }
  static setColor(r4, g4, b2, a4 = 255) {
    this.r = r4;
    this.g = g4;
    this.b = b2;
    this.a = a4;
    return;
  }
  static setBattleColor(t) {
    const addResult = t.add(2784).readPointer().add(9);
    addResult.writeU8(this.r);
    addResult.add(1).writeU8(this.g);
    addResult.add(2).writeU8(this.b);
    addResult.add(3).writeU8(this.a);
    return;
  }
  static setLobbyColor(t) {
    t.add(624).writeFloat(this.r / 255);
    t.add(628).writeFloat(this.g / 255);
    t.add(632).writeFloat(this.b / 255);
    t.add(636).writeFloat(this.a / 255);
    return;
  }
  static updateBattle(t) {
    let pointer = t.add(672).readPointer();
    const pointer2 = t.add(680).readPointer();
    while (!pointer.equals(pointer2)) {
      this.setBattleColor(pointer.add(24).readPointer());
      pointer = pointer.add(48);
    }
    return;
  }
  static toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  static patch() {
    if (!this.patched) {
      this.patched = true;
      Interceptor.attach(globalThis.offsets.EnvironmentRenderer_render, {
        onEnter(e) {
          if (t49.enabled) {
            t49.updateBattle(e[0]);
          }
          return;
        },
      });
      Interceptor.attach(globalThis.offsets.SceneCharacter_outlineColor, {
        onEnter() {
          if (t49.enabled) {
            t49.setLobbyColor(this.context.x9);
          }
          return;
        },
      });
    }
    return;
  }
}

var outlineColor = t49;

class ta extends Jt {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  get characterData() {
    const data = Jt.getData(this.ptr);
    if (data.isNull()) {
      return null;
    }
    return data;
  }
  get dataPointer() {
    const characterData = this.characterData;
    if (!characterData) {
      return null;
    }
    const logicCharacterData_getCarryableDataResult =
      globalThis.natives.LogicCharacterData_getCarryableData(characterData);
    if (logicCharacterData_getCarryableDataResult.isNull()) {
      return null;
    }
    return logicCharacterData_getCarryableDataResult;
  }
  get data() {
    const dataPointer = this.dataPointer;
    if (dataPointer) {
      return new Wt(dataPointer);
    }
    return null;
  }
  get collisionRadius() {
    const characterData = this.characterData;
    if (!characterData || characterData.isNull()) {
      return 0;
    }
    return globalThis.natives.LogicCharacterData_getCollisionRadius(characterData);
  }
  get throwDistance() {
    return this.data?.throwDistanceSubTiles ?? 0;
  }
  get throwUltiDistance() {
    return this.data?.throwDistanceUltiSubTiles ?? 0;
  }
}

class ea {
  constructor() {
    return;
  }
  static getHeldBy(t) {
    if (!t?.ptr || t.ptr.isNull() || !t.hasCarryable) {
      return null;
    }
    const instance = de.instance?.instance;
    if (!instance || instance.isNull()) {
      return null;
    }
    const logicCharacterClient_getCarryableResult =
      globalThis.natives.LogicCharacterClient_getCarryable(t.ptr, instance);
    if (logicCharacterClient_getCarryableResult.isNull()) {
      return null;
    }
    return new ta(logicCharacterClient_getCarryableResult);
  }
}

class ca {
  constructor(settings) {
    this.settings = settings;
    this.battle = new de();
    return;
  }
  getSnapshot() {
    let a;
    let battle;
    let i;
    let logicBattle;
    let logicPlayers;
    let n;
    let objectManager;
    let ownPlayerIndex;
    let playerCount;
    let r;
    let s;
    let t;
    let tileMap;
    ({
      battle: { logicBattle: t },
    } = this);
    const screenPointer = de.screenPointer;
    if (t.isNull() || !screenPointer || screenPointer.isNull()) {
      return null;
    }
    ({
      battle: { ownPlayerIndex: i, playerCount: s },
    } = this);
    if (i < 0 || i >= s || s > 128 || this.battle.gameOverValue !== -1) {
      return null;
    }
    ({
      battle: { objectManager: a, tileMap: n, logicPlayers: r },
    } = this);
    if (a.isNull() || n.isNull() || r.isNull()) {
      return null;
    }
    const pointer = r.add(i * Process.pointerSize).readPointer();
    const logicGameObjectManagerClient_findGameObjectResult =
      globalThis.natives.LogicGameObjectManagerClient_findGameObject(
        a,
        this.battle.characterGlobalID,
        -1,
      );
    if (pointer.isNull() || logicGameObjectManagerClient_findGameObjectResult.isNull()) {
      return null;
    }
    const record = {
      logic: t,
      screen: screenPointer,
      manager: a,
      tileMap: n,
      players: r,
      player: pointer,
      playerCount: s,
      ownPlayerIndex: i,
      character: logicGameObjectManagerClient_findGameObjectResult,
      tick: this.battle.tick,
      ownTeam: this.battle.ownPlayerTeam,
      friendlyFire: Boolean(globalThis.natives.LogicBattleModeClient_hasEventModifier(t, 45)),
    };
    record.own = this.getCharacter(logicGameObjectManagerClient_findGameObjectResult, record);
    if (record.own === null || record.own.health <= 0) {
      return null;
    }
    record.position = record.own.position.slice(0, 2);
    record.goal = this.battle.goal;
    return record;
  }
  getCharacters(t) {
    const items = [];
    const i = new la(t.manager);
    for (const s of i.getObjects(this.settings.maximumObjects)) {
      if (!s.isNull() && Math.floor(new Se(s).globalID / 1000000) === 1) {
        const character = this.getCharacter(s, t);
        if (character !== null && (character.isItem || character.health > 0)) {
          items.push(character);
        }
      }
    }
    return items;
  }
  getCharacter(t, e) {
    const i = new Se(t);
    const data = i.data;
    if (data.isNull()) {
      return null;
    }
    const index = i.index;
    const items = [i.x, i.y, i.z];
    const equalsResult = t.equals(e.character);
    let team = i.team;
    if (index >= 0 && index < e.playerCount) {
      const pointer = e.players.add(index * Process.pointerSize).readPointer();
      if (!pointer.isNull()) {
        team = new Qt(pointer, index).team;
      }
    }
    const {
      globalID: globalID,
      health: { current: current },
    } = i;
    const maxResult = Math.max(1, i.health.max);
    const { isItem: isItem, isCocooned: isCocooned } = i;
    return {
      instance: t,
      data: data,
      globalId: globalID,
      playerIndex: index,
      position: items,
      health: current,
      maximumHealth: maxResult,
      isOwn: equalsResult,
      isOwnTeam: !e.friendlyFire && team === e.ownTeam,
      isPlayer: index >= 0 && !i.isPet,
      isItem: isItem,
      isCocooned: isCocooned,
      inAir: items[2] < 0 || items[2] > 150,
      hasSpawnShield: i.spawnShield,
      hasCarryable: i.hasCarryable,
      hyperActive: i.hyperActive,
    };
  }
  isMovementAllowed(t) {
    return (
      this.battle.gameStarted &&
      !new Se(t.character).interrupted &&
      !t.own.isCocooned &&
      globalThis.natives.LogicCharacterClient_isAttached(t.character) === 0 &&
      globalThis.natives.LogicCharacterClient_getControlledProjectile(t.character, t.logic).isNull()
    );
  }
  getSkill(t) {
    const basicSkillClient = new Se(t.instance).basicSkillClient;
    if (basicSkillClient.isNull()) {
      return null;
    }
    const data = new ae(basicSkillClient).getData(t.hyperActive);
    if (data.isNull()) {
      return null;
    }
    return {
      instance: basicSkillClient,
      data: data,
    };
  }
  getWeaponRange(t, e) {
    const numberResult = Number(this.battle.logicDataTablesAvailable);
    const rangeAdd2 = new Ht(e.data).rangeAdd2;
    const numberResult2 = Number(
      Boolean(globalThis.natives.LogicBattleModeClient_hasEventModifier(t.logic, 35)),
    );
    const logicGamePlayUtil_getRangeAddTilesResult =
      globalThis.natives.LogicGamePlayUtil_getRangeAddTiles(
        ptr(0),
        t.character,
        t.player,
        numberResult,
        rangeAdd2,
        numberResult2,
        0,
      );
    return Math.max(
      0,
      globalThis.natives.LogicGamePlayUtil_getEffectiveWeaponRange(
        e.data,
        logicGamePlayUtil_getRangeAddTilesResult,
        t.character,
        t.logic,
      ),
    );
  }
  isLineClear(t, e, i) {
    return (
      globalThis.natives.LogicTileMap_isPlayerLineOfSightClear(
        t.tileMap,
        Math.round(e[0]),
        Math.round(e[1]),
        Math.round(i[0]),
        Math.round(i[1]),
      ) !== 0
    );
  }
  getMapCenter(t) {
    const tileMap2 = de.tileMap;
    if (tileMap2) {
      return tileMap2.center;
    }
    return [0, 0];
  }
}

class ha {
  constructor(settings) {
    this.settings = settings;
    this.reset();
    return;
  }
  reset() {
    this.battleIdentity = null;
    this.lastTick = null;
    this.histories = {};
    this.lastMoveTick = null;
    this.lastStopTick = null;
    this.lastAngle = null;
    this.stopped = false;
    this.randomOffset = [0, 0];
    this.randomOffsetTick = null;
    this.lastAttackTick = null;
    return;
  }
  update(t, e) {
    const battleIdentity = t.logic.toString();
    if (
      battleIdentity !== this.battleIdentity ||
      (this.lastTick !== null && t.tick < this.lastTick)
    ) {
      this.reset();
      this.battleIdentity = battleIdentity;
    }
    if (this.lastTick === t.tick) {
      return false;
    }
    this.lastTick = t.tick;
    const record = {};
    loop1: for (const i2 of e) {
      const stringResult = String(i2.globalId);
      record[stringResult] = true;
      const a = this.histories[stringResult] ?? [];
      a.push({
        tick: t.tick,
        position: [...i2.position],
      });
      while (a.length > 0) {
        if (a[0].tick < t.tick - this.settings.movementHistoryTicks) {
          a.shift();
        } else {
          this.histories[stringResult] = a;
          i2.movementDistance = this.#pe(a);
          continue loop1;
        }
      }
      this.histories[stringResult] = a;
      i2.movementDistance = this.#pe(a);
    }
    for (const t2 of Object.keys(this.histories)) {
      record[t2] || delete this.histories[t2];
    }
    if (this.randomOffsetTick === null || t.tick - this.randomOffsetTick > 10) {
      this.randomOffset = [500 * Math.random() - 250, 500 * Math.random() - 250];
      this.randomOffsetTick = t.tick;
    }
    return true;
  }
  #pe(t) {
    let e = 0;
    for (let index = 1; index < t.length; index += 1) {
      const position = t[index - 1].position;
      const position2 = t[index].position;
      e += Math.hypot(position2[0] - position[0], position2[1] - position[1]);
    }
    return e;
  }
}

class da {
  constructor(settings) {
    this.settings = settings;
    return;
  }
  select(t, e) {
    const filterResult = e.filter(
      (t) =>
        !t.isOwn &&
        t.isOwnTeam &&
        t.isPlayer &&
        !t.isItem &&
        !t.inAir &&
        !t.isCocooned &&
        t.movementDistance > this.settings.activeTeammateDistance,
    );
    const filterResult2 = e.filter(
      (t) =>
        !t.isOwn &&
        !t.isOwnTeam &&
        t.isPlayer &&
        !t.isItem &&
        !t.inAir &&
        !t.isCocooned &&
        !t.hasSpawnShield,
    );
    const meResult = this.#me(t.position, filterResult2);
    const n = meResult === null ? null : this.#me(meResult.position, filterResult);
    const filterResult3 = e.filter((t) => t.isItem);
    const o =
      t.own.hasCarryable || e.some((t) => t.hasCarryable)
        ? null
        : this.#me(t.position, filterResult3);
    return {
      teammate: this.#fe(t.position, filterResult),
      enemy: meResult,
      carrier: o,
      nearestTeammate: n,
    };
  }
  #me(t, e) {
    let i = null;
    let quotient = 1 / 0;
    for (const a of e) {
      const hypotResult = Math.hypot(a.position[0] - t[0], a.position[1] - t[1]);
      if (hypotResult < quotient) {
        quotient = hypotResult;
        i = a;
      }
    }
    return i;
  }
  #fe(t, e) {
    if (e.length === 0) {
      return null;
    }
    const sortResult = [...e].sort((t, e) => e.movementDistance - t.movementDistance);
    if (
      sortResult.length === 1 ||
      sortResult[0].movementDistance >= 1.5 * sortResult[1].movementDistance
    ) {
      return sortResult[0];
    }
    return this.#me(t, e);
  }
}

class ga {
  constructor(world, state, settings, aimbot = null) {
    this.world = world;
    this.state = state;
    this.settings = settings;
    this.aimbot = aimbot;
    this.battle = new de();
    this.attack = new Es();
    return;
  }
  update(t, e) {
    if (!this.world.isMovementAllowed(t)) {
      return;
    }
    const skill = this.world.getSkill(t.own);
    if (skill === null) {
      return;
    }
    const yeResult = this.#ye(t.position, t.goal);
    if (t.own.hasCarryable) {
      if (yeResult <= 2400 && this.world.isLineClear(t, t.position, t.goal)) {
        this.#Me(t, skill, t.goal);
        return;
      }
      const teammate = e.teammate;
      if (
        teammate !== null &&
        this.#ye(teammate.position, t.goal) < yeResult &&
        this.#ye(t.position, teammate.position) < 3000 &&
        this.world.isLineClear(t, t.position, teammate.position)
      ) {
        this.#Me(t, skill, teammate.position);
        return;
      }
      const enemy = e.enemy;
      if (
        enemy !== null &&
        yeResult > 1800 &&
        this.#ye(t.position, enemy.position) < 1800 &&
        this.world.isLineClear(t, t.position, enemy.position)
      ) {
        this.#Me(t, skill, enemy.position, enemy);
      }
      return;
    }
    const enemy2 = e.enemy;
    if (
      this.settings.autoAttackBasic &&
      enemy2 !== null &&
      globalThis.natives.LogicCharacterClient_isImmuneAndBulletsGoThrough(enemy2.instance) === 0 &&
      this.#ye(t.position, enemy2.position) <= this.world.getWeaponRange(t, skill) &&
      this.world.isLineClear(t, t.position, enemy2.position)
    ) {
      this.#Me(t, skill, enemy2.position, enemy2);
    }
    return;
  }
  #Me(t, e, i, s = null) {
    if (
      this.state.lastAttackTick !== null &&
      t.tick - this.state.lastAttackTick < this.settings.attackCooldownTicks
    ) {
      return false;
    }
    this.battle.instance = t.logic;
    const {
      battle: { me: me2 },
    } = this;
    if (!me2 || !me2.canCastSkill(e.instance)) {
      return false;
    }
    let n = i;
    if (this.aimbot?.state && s !== null) {
      const predictResult = this.aimbot.prediction.predict(e.instance, new Se(s.instance));
      if (predictResult !== null) {
        n = [predictResult.x, predictResult.y];
      }
    }
    const tryToActivateSkillResult = this.attack.tryToActivateSkill(
      e.instance,
      Math.round(n[0]),
      Math.round(n[1]),
    );
    if (tryToActivateSkillResult) {
      this.state.lastAttackTick = t.tick;
    }
    return tryToActivateSkillResult;
  }
  #ye(t, e) {
    return Math.hypot(t[0] - e[0], t[1] - e[1]);
  }
}

class pa {
  constructor() {
    this.startedAt = null;
    this.startTotalTrophies = null;
    this.currentTotalTrophies = null;
    this.currentBrawler = null;
    this.currentBrawlerTrophies = null;
    this.wins = 0;
    this.losses = 0;
    this.trophyGain = 0;
    this.trophyLoss = 0;
    this.streak = 0;
    return;
  }
  update(t) {
    if (this.startTotalTrophies === null) {
      this.startedAt = Date.now();
      this.startTotalTrophies = t.totalTrophies;
    }
    if (this.currentTotalTrophies !== null) {
      const difference = t.totalTrophies - this.currentTotalTrophies;
      difference > 0
        ? ((this.wins += 1), (this.trophyGain += difference), (this.streak += 1))
        : difference < 0 &&
          ((this.losses += 1), (this.trophyLoss -= difference), (this.streak = 0));
    }
    this.currentTotalTrophies = t.totalTrophies;
    this.currentBrawler = t.selectedName;
    this.currentBrawlerTrophies = t.brawlers[t.selectedName]?.trophies ?? null;
    return;
  }
  getStatus() {
    const t = this.startedAt === null ? 0 : Math.max(0, Date.now() - this.startedAt);
    const combinedValue = this.wins + this.losses;
    const difference = this.trophyGain - this.trophyLoss;
    const s = t > 0 ? (3600000 * difference) / t : 0;
    return {
      elapsedMilliseconds: t,
      startTotalTrophies: this.startTotalTrophies,
      currentTotalTrophies: this.currentTotalTrophies,
      currentBrawler: this.currentBrawler,
      currentBrawlerTrophies: this.currentBrawlerTrophies,
      wins: this.wins,
      losses: this.losses,
      streak: this.streak,
      gamesPlayed: combinedValue,
      trophyGain: this.trophyGain,
      trophyLoss: this.trophyLoss,
      netTrophies: difference,
      trophiesPerHour: s,
    };
  }
}

class t57 {
  static currentEventOffset;
  constructor() {
    return;
  }
  static {
    this.currentEventOffset = 1040;
  }
  static getCurrentEvent(e) {
    return e.add(t57.currentEventOffset).readPointer();
  }
}

var ma = t57;
