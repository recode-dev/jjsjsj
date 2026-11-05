/**
 * game/player.js
 *
 * Player / avatar wrappers: score, hero level, loadout, selected character.
 *
 * Symbols: t12, Qt
 * Source: bundle lines 6422-6488 (2 statements)
 */


class t12 {
  static tagChars;
  static idOffset;
  static playerIndexOffset;
  static teamOffset;
  static battleIntroDetailsOffset;
  constructor(ptr2, index = -1) {
    this.ptr = ptr2;
    this.index = index;
    return;
  }
  static {
    this.tagChars = "0289PYLQGRJCUV";
    this.idOffset = 64;
    this.playerIndexOffset = 72;
    this.teamOffset = 76;
    this.battleIntroDetailsOffset = 624;
  }
  readString(t) {
    if (!t || t.isNull()) {
      return "";
    }
    const u32 = t.add(4).readU32();
    if (u32 === 0 || u32 > 256) {
      return "";
    }
    const i = u32 >= 8 ? t.add(8).readPointer() : t.add(8);
    if (i.isNull()) {
      return "";
    }
    return i.readUtf8String(u32) ?? "";
  }
  get name() {
    const pointer = this.ptr.add(t12.battleIntroDetailsOffset).readPointer();
    if (pointer.isNull()) {
      return "";
    }
    const pointer2 = pointer.readPointer();
    if (pointer2.isNull()) {
      return "";
    }
    return this.readString(pointer2);
  }
  get tag() {
    const addResult = this.ptr.add(t12.idOffset);
    const u32 = addResult.readU32();
    const u322 = addResult.add(4).readU32();
    let a = (BigInt(u322) << (0x80n >> 4n)) | BigInt(255 & u32);
    let n = "";
    while (a > 0) {
      const numberResult = Number(a % BigInt(t12.tagChars.length));
      n = t12.tagChars[numberResult] + n;
      a /= BigInt(t12.tagChars.length);
    }
    return n;
  }
  get playerIndex() {
    return this.ptr.add(t12.playerIndexOffset).readS32();
  }
  get team() {
    return this.ptr.add(t12.teamOffset).readS32();
  }
  get hasBotDisplayName() {
    return globalThis.natives.LogicPlayer_hasBotDisplayName(this.ptr) !== 0;
  }
}

var Qt = t12;
