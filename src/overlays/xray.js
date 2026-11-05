/**
 * overlays/xray.js
 *
 * X-ray overlay.
 *
 * Symbols: xray
 * Source: bundle lines 15617-15708 (1 statements)
 */


class xray {
  static players;
  static rosterVersion;
  static selectionVersion;
  static selectedPlayerIndex;
  static enabled;
  static patched;
  static _battle;
  constructor() {
    return;
  }
  static {
    this.players = [];
    this.rosterVersion = 0;
    this.selectionVersion = 0;
    this.selectedPlayerIndex = -1;
    this.enabled = false;
    this.patched = false;
    this._battle = null;
  }
  static get battle() {
    this._battle ||= new de();
    return this._battle;
  }
  static patch() {
    this.patched = true;
    return;
  }
  static processInput(t) {
    if (
      this.enabled &&
      this.selectedPlayerIndex >= 0 &&
      t &&
      !t.isNull() &&
      t.add(8).readS32() === 0 &&
      t.add(24).readU8() !== 0
    ) {
      t.add(20).writeS32(1000000 + this.selectedPlayerIndex);
      t.add(24).writeU8(1);
      t.add(25).writeU8(1);
    }
    return;
  }
  static getLabel(t) {
    return "".concat(
      t.name,
      " (#",
      t.tag,
      ")",
      this.enabled ? (this.selectedPlayerIndex === t.playerIndex ? ": ON" : "") : "",
    );
  }
  static select(selectedPlayerIndex) {
    return (
      !(selectedPlayerIndex < 0) &&
      !(selectedPlayerIndex >= 64) &&
      !((this.selectedPlayerIndex = selectedPlayerIndex), ++this.selectionVersion, 0)
    );
  }
  static disable() {
    this.enabled = false;
    this.selectedPlayerIndex = -1;
    ++this.selectionVersion;
    return;
  }
  static show() {
    this.refreshRoster();
    if (!this.players.some((t) => t.playerIndex === this.selectedPlayerIndex)) {
      this.selectedPlayerIndex = -1;
    }
    ++this.selectionVersion;
    return;
  }
  static refreshRoster() {
    de.setPlayers();
    const {
      battle: { players: players },
    } = this;
    return (
      (players.length !== this.players.length ||
        !!players.some(
          (t, e) => !this.players[e] || this.players[e].ptr.toString() !== t.ptr.toString(),
        )) &&
      !((this.players = players),
      this.players.some((t) => t.playerIndex === this.selectedPlayerIndex) ||
        (this.selectedPlayerIndex = -1),
      ++this.rosterVersion,
      ++this.selectionVersion,
      0)
    );
  }
}
