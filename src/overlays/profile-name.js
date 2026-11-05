/**
 * overlays/profile-name.js
 *
 * Profile name overlay.
 *
 * Symbols: ProfileNameOverlay
 * Source: bundle lines 25019-25163 (1 statements)
 */


class ProfileNameOverlay {
  constructor() {
    this.state = false;
    this.battleGeneration = -1;
    this.api = null;
    this.namesByTag = new Map();
    this.pendingTags = new Set();
    this.requestQueue = [];
    this.appliedNames = new Map();
    this.nextRequestAt = 0;
    return;
  }
  setEnabled(t) {
    this.state = Boolean(t);
    return this.state;
  }
  toggle() {
    return this.setEnabled(!this.state);
  }
  update() {
    if (!re.isState(re.states.BATTLE)) {
      this.#qt();
      this.battleGeneration = -1;
      return;
    }
    if (this.battleGeneration !== de.generation) {
      this.#qt();
      this.battleGeneration = de.generation;
    }
    if (!this.state && this.appliedNames.size === 0) {
      return;
    }
    const filterResult = de
      .getCharacterPointers()
      .map((t) => new Se(t))
      .filter((t) => t.playerIndex >= 0);
    if (!this.state) {
      this.#Kt(filterResult);
      this.#qt();
      return;
    }
    de.setPlayers();
    const e = new de();
    const me2 = e.me;
    if (!me2) {
      return;
    }
    const filterResult2 = e.players.filter((t) => t.team !== me2.team && !t.hasBotDisplayName);
    if (filterResult2.length > 0 && filterResult2.every((t) => t.name.trim().length === 0)) {
      for (const t2 of filterResult2) {
        this.#Jt(t2);
      }
      this.#Qt();
      this.#Zt(filterResult, filterResult2);
      return;
    }
    this.#Kt(filterResult);
    return;
  }
  #Jt(t) {
    const tag = t.tag;
    if (tag && !this.namesByTag.has(tag) && !this.pendingTags.has(tag)) {
      this.pendingTags.add(tag);
      this.requestQueue.push(tag);
    }
    return;
  }
  #Qt() {
    if (!this.requestQueue.length || Date.now() < this.nextRequestAt) {
      return;
    }
    const shiftResult = this.requestQueue.shift();
    this.nextRequestAt = Date.now() + 350;
    const battleGeneration = this.battleGeneration;
    setTimeout(() => {
      if (!this.state || !re.isState(re.states.BATTLE) || battleGeneration !== de.generation) {
        this.pendingTags.delete(shiftResult);
        return;
      }
      this.api ??= new qs();
      const playerData = this.api.getPlayerData(shiftResult);
      const s = playerData?.name ?? playerData?.player?.name ?? playerData?.data?.name ?? null;
      this.namesByTag.set(shiftResult, typeof s == "string" ? s : null);
      this.pendingTags.delete(shiftResult);
      return;
    }, 0);
    return;
  }
  #Zt(t, e) {
    const entries2 = new Map();
    for (const t2 of e) {
      const getResult = this.namesByTag.get(t2.tag);
      if (getResult) {
        entries2.set(t2.playerIndex, getResult);
      }
    }
    const uniqueValues = new Set();
    for (const e3 of t) {
      const text2 = e3.ptr.toString();
      uniqueValues.add(text2);
      const text3 = entries2.get(e3.playerIndex);
      if (text3) {
        const playerNameTextField = e3.playerNameTextField;
        if (playerNameTextField) {
          let getResult2 = this.appliedNames.get(text2);
          if (!getResult2) {
            getResult2 = {
              original: playerNameTextField.text,
            };
            this.appliedNames.set(text2, getResult2);
          }
          if (playerNameTextField.text !== text3) {
            playerNameTextField.text = text3;
          }
        }
      }
    }
    for (const t4 of this.appliedNames.keys()) {
      if (!uniqueValues.has(t4)) {
        this.appliedNames.delete(t4);
      }
    }
    return;
  }
  #Kt(t) {
    const entries2 = new Map(t.map((t) => [t.ptr.toString(), t]));
    for (let [t2, i] of this.appliedNames) {
      const getResult = entries2.get(t2);
      const playerNameTextField = getResult?.playerNameTextField;
      if (playerNameTextField && playerNameTextField.text !== i.original) {
        playerNameTextField.text = i.original;
      }
    }
    this.appliedNames.clear();
    return;
  }
  #qt() {
    this.namesByTag.clear();
    this.pendingTags.clear();
    this.requestQueue = [];
    this.appliedNames.clear();
    this.nextRequestAt = 0;
    return;
  }
}
