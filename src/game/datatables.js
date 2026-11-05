/**
 * game/datatables.js
 *
 * LogicDataTables / CSV wrappers (game data lookups by id and name).
 *
 * Symbols: _t, It, Bt, Ft, Dt, Rt, Et, Ot, Ut, Xt, qt, Kt
 * Source: bundle lines 5574-6368 (14 statements)
 */


var _t = class t4 {
  constructor(text2 = "", i = null) {
    this.ptr = i || globalThis.pointers.malloc(16);
    t4.stringConstructor(this.ptr, Memory.allocUtf8String(text2));
    return;
  }
  static fromPtr(ptr2) {
    const createResult = Object.create(t4.prototype);
    createResult.ptr = ptr2;
    return createResult;
  }
  static get stringConstructor() {
    this._stringConstructor ||= new NativeFunction(globalThis.offsets.SCString_ctor, "pointer", [
      "pointer",
      "pointer",
    ]);
    return this._stringConstructor;
  }
  static get stringDestructor() {
    this._stringDestructor ||= new NativeFunction(globalThis.offsets.SCString_dtor, "void", [
      "pointer",
    ]);
    return this._stringDestructor;
  }
  get contents() {
    if (!this.ptr || this.ptr.isNull()) {
      return "";
    }
    const int = this.ptr.add(4).readInt();
    return (
      (int >= 8
        ? this.ptr.add(8).readPointer().readUtf8String(int)
        : this.ptr.add(8).readUtf8String(int)) || ""
    );
  }
  destruct() {
    t4.stringDestructor(this.ptr);
    globalThis.pointers.free(this.ptr);
    return;
  }
};

var It = _t;

var Bt = class t5 {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  static get getColumnIndexByNameNative() {
    this._getColumnIndexByNameNative ||= new NativeFunction(
      globalThis.offsets.CSVTable_getColumnIndexByName,
      "int",
      ["pointer", "pointer"],
    );
    return this._getColumnIndexByNameNative;
  }
  static get getRowByNameNative() {
    this._getRowByNameNative ||= new NativeFunction(
      globalThis.offsets.CSVTable_getRowByName,
      "pointer",
      ["pointer", "pointer"],
    );
    return this._getRowByNameNative;
  }
  getRowAt(t) {
    return new Lt(
      this.ptr
        .add(72)
        .readPointer()
        .add(8 * t)
        .readPointer(),
    );
  }
  getRowByName(e) {
    const i = new It(e);
    const rowByNameNative = t5.getRowByNameNative(this.ptr, i.ptr);
    i.destruct();
    return rowByNameNative;
  }
  getColumnIndexByName(text2) {
    return t5.getColumnIndexByNameNative(this.ptr, Memory.allocUtf8String(text2));
  }
  getRowCount() {
    return this.ptr.add(84).readS32();
  }
};

var Ft = Bt;

var Dt = class t6 {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  static get getValueAtNative() {
    this._getValueAtNative ||= new NativeFunction(globalThis.offsets.CSVRow_getValueAt, "pointer", [
      "pointer",
      "int",
      "int",
    ]);
    return this._getValueAtNative;
  }
  static get getIntegerValueAtNative() {
    this._getIntegerValueAtNative ||= new NativeFunction(
      globalThis.offsets.CSVRow_getIntegerValueAt,
      "int",
      ["pointer", "int", "int"],
    );
    return this._getIntegerValueAtNative;
  }
  static get getBooleanValueAtNative() {
    this._getBooleanValueAtNative ||= new NativeFunction(
      globalThis.offsets.CSVRow_getBooleanValueAt,
      "bool",
      ["pointer", "int", "int"],
    );
    return this._getBooleanValueAtNative;
  }
  static get getArraySizeAtNative() {
    this._getArraySizeAtNative ||= new NativeFunction(
      globalThis.offsets.CSVRow_getArraySizeAt,
      "int",
      ["pointer", "int"],
    );
    return this._getArraySizeAtNative;
  }
  get table() {
    return new Ft(this.ptr.readPointer());
  }
  get dataTable() {
    return new Pt(this.ptr.add(8).readPointer());
  }
  getName() {
    return this.getValueAt(0);
  }
  getValueAt(e, i = 0) {
    return It.fromPtr(t6.getValueAtNative(this.ptr, e, i));
  }
  getBooleanValueAt(e, i = 0) {
    return Boolean(t6.getBooleanValueAtNative(this.ptr, e, i));
  }
  getIntegerValueAt(e, i = 0) {
    return t6.getIntegerValueAtNative(this.ptr, e, i);
  }
  getValue(t, e = 0) {
    const columnIndexByName = this.table.getColumnIndexByName(t);
    if (columnIndexByName < 0) {
      return new It("");
    }
    return this.getValueAt(columnIndexByName, e);
  }
  getBooleanValue(t, e = 0) {
    const columnIndexByName = this.table.getColumnIndexByName(t);
    return !(columnIndexByName < 0) && this.getBooleanValueAt(columnIndexByName, e);
  }
  getIntegerValue(t, e = 0) {
    const columnIndexByName = this.table.getColumnIndexByName(t);
    if (columnIndexByName < 0) {
      return 0;
    }
    return this.getIntegerValueAt(columnIndexByName, e);
  }
  getArraySizeAt(e) {
    return t6.getArraySizeAtNative(this.ptr, e);
  }
};

Lt = Dt;

class Rt {
  constructor(ptr2 = NULL) {
    this.ptr = ptr2;
    return;
  }
  static fromPtr(ptr2) {
    const createResult = Object.create(this.prototype);
    createResult.ptr = ptr2;
    return createResult;
  }
  get type() {
    return this.ptr.add(16).readPointer().add(80).readS32();
  }
  get globalID() {
    return this.ptr.add(32).readInt();
  }
  get row() {
    return new Lt(this.ptr.add(8).readPointer());
  }
  get name() {
    return this.row.getName().contents;
  }
  getValue(t, e = 0) {
    return this.row.getValue(t, e);
  }
  getIntegerValue(t, e = 0) {
    return this.row.getIntegerValue(t, e);
  }
  getBooleanValue(t, e = 0) {
    return this.row.getBooleanValue(t, e);
  }
}

var Et = Rt;

var Ot = class t7 extends Et {
  constructor(t) {
    super(t);
    this.defaultProjectileStartRadius = 200;
    return this;
  }
  get data() {
    if (this.ptr.isNull()) {
      return this;
    }
    const parentForSkin = this.parentForSkin;
    if (parentForSkin.ptr.isNull()) {
      return this;
    }
    return parentForSkin;
  }
  get areaEffectLogicData() {
    return $t.getDataByName(this.getValue("Logic").contents, 150);
  }
  get customValue() {
    return this.areaEffectLogicData.getIntegerValue("CustomValue");
  }
  get effectType() {
    return this.areaEffectLogicData.getValue("Type");
  }
  get playbackType() {
    return this.getIntegerValue("PlaybackType");
  }
  get rotationType() {
    return this.getIntegerValue("RotationType");
  }
  get count() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.ptr.add(356).readS32();
  }
  get timeMs() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.getIntegerValue("TimeMs");
  }
  get spread() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.areaEffectLogicData.getIntegerValue("BulletAngleOffset");
  }
  get spread2() {
    return 0;
  }
  get angleStep() {
    if (this.count <= 1) {
      return 0;
    }
    if (this.spread === 0) {
      return 360 / this.count;
    }
    return this.spread / (this.count - 1);
  }
  get bulletExplosionBulletDistance() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.ptr.add(364).readS32();
  }
  get damage() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.areaEffectLogicData.getIntegerValue("Damage");
  }
  get pushbackStrengthSelf() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.areaEffectLogicData.getIntegerValue("PushbackStrengthSelf");
  }
  get pushbackDeadzone() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.areaEffectLogicData.getIntegerValue("PushbackDeadzone");
  }
  get parentForSkin() {
    return new t7(this.ptr.add(128).readPointer());
  }
  get radius() {
    if (this.ptr.isNull()) {
      return 0;
    }
    const areaEffectLogicData = this.areaEffectLogicData;
    if (!areaEffectLogicData || areaEffectLogicData.ptr.isNull()) {
      return 0;
    }
    const parseIntResult = Number.parseInt(areaEffectLogicData.getValue("Radius").contents, 10);
    if (Number.isFinite(parseIntResult)) {
      return parseIntResult;
    }
    return 0;
  }
  get spawnDistanceRaw() {
    if (this.ptr.isNull()) {
      return 0;
    }
    return this.areaEffectLogicData.getIntegerValue("BulletExplosionBulletOffset");
  }
  get spawnOffset() {
    return this.spawnDistanceRaw;
  }
  get projectileStartOffset() {
    if (this.spawnOffset >= 1) {
      return this.spawnOffset;
    }
    return this.defaultProjectileStartRadius;
  }
  get bulletDistanceSubtiles() {
    return this.bulletExplosionBulletDistance;
  }
  get totalRange() {
    return 100 * this.bulletDistanceSubtiles;
  }
  get travelRange() {
    return this.totalRange - this.projectileStartOffset;
  }
  get bulletData() {
    if (this.ptr.isNull()) {
      return null;
    }
    const contents = this.areaEffectLogicData.getValue("BulletExplosionBullet").contents;
    if (contents) {
      return $t.getDataByName(contents, 6);
    }
    return null;
  }
  toString() {
    const t = this.bulletData ? this.bulletData.name : "none";
    return "LogicAreaEffectData(name: ".concat(
      this.name,
      ", radius: ",
      this.radius,
      ", count: ",
      this.count,
      ", spread: ",
      this.spread,
      ", damage: ",
      this.damage,
      ", spawnOffset: ",
      this.spawnOffset,
      ", totalRange: ",
      this.totalRange,
      ", bullet: ",
      t,
      ")",
    );
  }
};

var Ut = Ot;

var Xt = class t10 {
  constructor() {
    return;
  }
  static get getDataByIdNative() {
    this._getDataByIdNative ||= new NativeFunction(
      globalThis.offsets.LogicDataTables_getDataById,
      "pointer",
      ["int"],
    );
    return this._getDataByIdNative;
  }
  static get getDataByNameNative() {
    this._getDataByNameNative ||= new NativeFunction(
      globalThis.offsets.LogicDataTables_getDataByName,
      "pointer",
      ["pointer", "int"],
    );
    return this._getDataByNameNative;
  }
  static get getTableNative() {
    this._getTableNative ||= new NativeFunction(
      globalThis.offsets.LogicDataTables_getTable,
      "pointer",
      ["int"],
    );
    return this._getTableNative;
  }
  static getDataById(e) {
    const dataByIdNative = t10.getDataByIdNative(e);
    if (dataByIdNative.isNull()) {
      return new Et(dataByIdNative);
    }
    const s32 = dataByIdNative.add(16).readPointer().add(80).readS32();
    return new (entries.get(s32) || Et)(dataByIdNative);
  }
  static getDataByName(e, i) {
    const s = new It(e);
    const dataByNameNative = t10.getDataByNameNative(s.ptr, i);
    s.destruct();
    return new (entries.get(i) || Et)(dataByNameNative);
  }
  static getTable(t) {
    return new Pt(this.getTableNative(t));
  }
  static get globals() {
    return globalThis.offsets.LogicDataTables_globals.readPointer();
  }
};

$t = Xt;

class qt {
  static map;
  static exactMap;
  static areaEffectRanges;
  static damageOverrides;
  constructor() {
    return;
  }
  static {
    this.map = new Map();
    this.exactMap = new Map();
    this.areaEffectRanges = new Map();
    this.damageOverrides = new Map([
      [
        "CoopRangedEnemyProjectile",
        {
          damage: 500,
          disregardPowerLevel: true,
        },
      ],
    ]);
  }
  static reset() {
    this.map.clear();
    this.exactMap.clear();
    this.areaEffectRanges.clear();
    return;
  }
  static init() {
    const table = $t.getTable(20);
    for (let index = 0; index < table.length; index++) {
      const dataById = $t.getDataById(At.createGlobalID(20, index));
      const projectileNames = dataById.projectileNames;
      for (const e2 of projectileNames) {
        if (!this.map.has(e2)) {
          this.map.set(e2, dataById);
        }
        if (projectileNames.length === 1 && !this.exactMap.has(e2)) {
          this.exactMap.set(e2, dataById);
        }
        const dataByName = $t.getDataByName(e2, 6);
        for (const t3 of [dataByName.spawnAreaEffect, dataByName.spawnAreaEffect2]) {
          if (!t3.ptr.isNull()) {
            const bulletData = t3.bulletData;
            if (bulletData) {
              this.areaEffectRanges.set(bulletData.name, t3.travelRange);
            }
          }
        }
      }
    }
    return;
  }
  static get(t) {
    if (this.map.size == 0) {
      this.init();
    }
    return this.exactMap.get(t) ?? this.map.get(t);
  }
  static getDamage(t) {
    const replaceResult = String(t ?? "").replace("Overcharged", "");
    const getResult = this.damageOverrides.get(replaceResult);
    if (getResult?.damage !== undefined) {
      return Number(getResult.damage);
    }
    const getResult2 = this.get(replaceResult);
    const numberResult = Number(getResult2?.damage);
    const numberResult2 = Number(getResult2?.damageModifier);
    const r = getResult2?.projectileNames ?? [];
    const index = r.findIndex((t) => /ChargedProjectile$/.test(t));
    const indexOfResult = r.indexOf(replaceResult);
    const c =
      index >= 0
        ? indexOfResult === index
          ? numberResult2 > 0
            ? (numberResult * numberResult2) / 100
            : numberResult
          : numberResult
        : numberResult;
    if (Number.isFinite(c) && c > 0) {
      return c;
    }
    return 0;
  }
  static disregardsPowerLevel(t) {
    const replaceResult = String(t ?? "").replace("Overcharged", "");
    return (
      (this.damageOverrides.get(replaceResult) == null
        ? undefined
        : this.damageOverrides.get(replaceResult).disregardPowerLevel) === true
    );
  }
  static getAreaEffectRange(t) {
    if (this.map.size == 0) {
      this.init();
    }
    return this.areaEffectRanges.get(t);
  }
}

var Kt = qt;
