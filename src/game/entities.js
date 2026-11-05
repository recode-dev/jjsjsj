/**
 * game/entities.js
 *
 * Game object wrappers and object manager lookups.
 *
 * Symbols: t11, Jt
 * Source: bundle lines 6369-6421 (2 statements)
 */


class t11 {
  static indexOffset;
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  static {
    this.indexOffset = 60;
  }
  static getX(t) {
    return globalThis.natives.LogicGameObjectClient_getX(t);
  }
  static getY(t) {
    return globalThis.natives.LogicGameObjectClient_getY(t);
  }
  static getZ(t) {
    return globalThis.natives.LogicGameObjectClient_getZ(t);
  }
  static getData(t) {
    return globalThis.natives.LogicGameObjectClient_getData(t);
  }
  static getTeam(t) {
    return globalThis.natives.GameObject_getTeam(t);
  }
  static getTeamIndex(t, e) {
    return globalThis.natives.LogicGameObjectClient_getCurrentTeamIndex(t, e);
  }
  static getGlobalID(t) {
    return globalThis.natives.LogicGameObjectClient_getGlobalID(t);
  }
  get x() {
    return t11.getX(this.ptr);
  }
  get y() {
    return t11.getY(this.ptr);
  }
  get z() {
    return t11.getZ(this.ptr);
  }
  get data() {
    return t11.getData(this.ptr);
  }
  get team() {
    return t11.getTeam(this.ptr);
  }
  get globalID() {
    return t11.getGlobalID(this.ptr);
  }
  get index() {
    return this.ptr.add(t11.indexOffset).readS32();
  }
}

var Jt = t11;
