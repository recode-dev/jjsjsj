/**
 * overlays/trophy.js
 *
 * Trophy overlay (team / brawler trophies).
 *
 * Symbols: TrophyOverlay
 * Source: bundle lines 27898-28153 (1 statements)
 */


class TrophyOverlay {
  constructor() {
    this.state = false;
    this.config = {
      teams: {
        me: true,
        enemy: true,
      },
      trophies: {
        total: true,
        brawler: true,
      },
    };
    this.battleGeneration = -1;
    this.api = null;
    this.playerData = new Map();
    this.pendingTags = new Set();
    this.requestQueue = [];
    this.nextRequestAt = 0;
    this.displays = new Map();
    this.visualCharacters = new Map();
    this.#G();
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
      this.battleGeneration = -1;
      this.pendingTags.clear();
      this.requestQueue = [];
      this.displays.clear();
      this.visualCharacters.clear();
      return;
    }
    if (this.battleGeneration !== de.generation) {
      this.battleGeneration = de.generation;
      this.pendingTags.clear();
      this.requestQueue = [];
      this.displays.clear();
      this.visualCharacters.clear();
    }
    for (const t of this.displays.values()) {
      t.textClip.visible = this.state;
      t.icon.visible = this.state;
    }
    if (!this.state) {
      return;
    }
    de.setPlayers();
    const me2 = new de().me;
    if (!me2) {
      return;
    }
    const team = me2.team;
    const uniqueValues = new Set();
    const uniqueValues2 = new Set();
    for (const t3 of new de().players) {
      if (
        !t3.hasBotDisplayName &&
        !(t3.team === team ? !this.config.teams.me : !this.config.teams.enemy)
      ) {
        const tag = t3.tag;
        if (tag) {
          if (!this.playerData.has(tag) && !this.pendingTags.has(tag)) {
            this.pendingTags.add(tag);
            this.requestQueue.push(tag);
          }
          const characterPointerForPlayer = de.getCharacterPointerForPlayer(t3.playerIndex);
          if (characterPointerForPlayer && !characterPointerForPlayer.isNull()) {
            const text2 = characterPointerForPlayer.toString();
            uniqueValues2.add(text2);
            const getResult = this.visualCharacters.get(text2);
            if (getResult && !getResult.isNull()) {
              const pointer = getResult.add(Se.LogicPointerOffset).readPointer();
              if (pointer.isNull() || !pointer.equals(characterPointerForPlayer)) {
                this.visualCharacters.delete(text2);
              } else {
                const c = new Se(characterPointerForPlayer, getResult);
                const getResult2 = this.playerData.get(tag);
                if (
                  getResult2 &&
                  (!this.config.trophies.total || Number.isFinite(Number(getResult2.trophies)))
                ) {
                  let d = null;
                  var9: {
                    var8: {
                      if (this.config.trophies.brawler) {
                        const data = c.data;
                        if (data && !data.isNull()) {
                          const globalID = new Et(data).globalID;
                          const findResult = getResult2.brawlers?.find(
                            (t) => Number(t.id) === globalID,
                          );
                          if (findResult) {
                            d = findResult.trophies ?? 0;
                            break var8;
                          }
                        }
                        break var9;
                      }
                    }
                    const items = [];
                    if (this.config.trophies.total) {
                      items.push(getResult2.trophies);
                    }
                    if (this.config.trophies.brawler) {
                      items.push(d);
                    }
                    if (items.length !== 0) {
                      uniqueValues.add(text2);
                      const g = items.join(" / ");
                      let getResult3 = this.displays.get(text2);
                      if (!getResult3) {
                        getResult3 = this.#De(c, g);
                        if (getResult3) {
                          this.displays.set(text2, getResult3);
                        }
                      }
                      if (getResult3.value !== g) {
                        getResult3.text.text = g;
                        getResult3.value = g;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    for (const t5 of this.displays.keys()) {
      if (!uniqueValues.has(t5)) {
        const getResult4 = this.displays.get(t5);
        getResult4.textClip.visible = false;
        getResult4.icon.visible = false;
        this.displays.delete(t5);
      }
    }
    for (const t6 of this.visualCharacters.keys()) {
      if (!uniqueValues2.has(t6)) {
        this.visualCharacters.delete(t6);
      }
    }
    this.#Qt();
    return;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.Character_updateHealthBar, {
      onEnter(e) {
        if (!re.isState(re.states.BATTLE)) {
          return;
        }
        const i = e[0];
        if (!i || i.isNull()) {
          return;
        }
        const pointer = i.add(Se.LogicPointerOffset).readPointer();
        if (!pointer.isNull()) {
          this.visualCharacters.set(pointer.toString(), i);
        }
        return;
      },
    });
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
      if (this.state && battleGeneration === de.generation && re.isState(re.states.BATTLE)) {
        try {
          this.api ??= new qs();
          this.playerData.set(shiftResult, this.api.getPlayerData(shiftResult));
        } catch (e2) {
          this.playerData.set(shiftResult, null);
        } finally {
          this.pendingTags.delete(shiftResult);
        }
      }
      this.pendingTags.delete(shiftResult);
      return;
    }, 0);
    return;
  }
  #De(t, text2) {
    const playerMovieClip = t.PlayerMovieClip;
    if (!playerMovieClip || playerMovieClip.isNull()) {
      return null;
    }
    const playerNameTextField = t.playerNameTextField;
    if (!playerNameTextField) {
      return null;
    }
    const movieClip = ti.getMovieClip("sc/ui.sc", "damage_number");
    if (!movieClip || movieClip.instance.isNull()) {
      return null;
    }
    const textFieldByName = movieClip.getTextFieldByName("txt");
    if (!textFieldByName || textFieldByName.instance.isNull()) {
      return null;
    }
    textFieldByName.text = text2;
    textFieldByName.fontSize = 15;
    textFieldByName.align = 2;
    const movieClip2 = ti.getMovieClip("sc/ui.sc", "leaderboard_band_item");
    if (!movieClip2 || movieClip2.instance.isNull()) {
      return null;
    }
    const childByName = movieClip2.getChildByName("trophies");
    if (childByName.instance.isNull()) {
      return null;
    }
    const childByName2 = childByName.getChildByName("trophy_icon");
    if (childByName2.instance.isNull()) {
      return null;
    }
    const c = new ve(playerMovieClip);
    const { x: x3, y: y3 } = playerNameTextField;
    movieClip.colorTransform = {
      r: 255,
      g: 255,
      b: 84,
    };
    movieClip.pos = {
      x: x3 + 20,
      y: y3,
    };
    c.addChild(movieClip);
    childByName2.scaleX = 0.125;
    childByName2.scaleY = 0.125;
    childByName2.pos = {
      x: x3 - textFieldByName.width / 2 + 10,
      y: y3 - 10,
    };
    c.addChild(childByName2);
    movieClip.visible = this.state;
    childByName2.visible = this.state;
    return {
      text: textFieldByName,
      textClip: movieClip,
      icon: childByName2,
      value: text2,
    };
  }
}
