/**
 * overlays/ammo.js
 *
 * Ammo overlay.
 *
 * Symbols: AmmoOverlay
 * Source: bundle lines 26459-26538 (1 statements)
 */


class AmmoOverlay {
  constructor() {
    this.state = false;
    this.visualCharacters = new Map();
    this.clipStates = new Map();
    this.#G();
    return;
  }
  toggle() {
    return this.setEnabled(!this.state);
  }
  setEnabled(t) {
    this.state = Boolean(t);
    return this.state;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.Character_updateHealthBar, {
      onEnter(t) {
        this.character = t[0];
        return;
      },
      onLeave() {
        const character = this.character;
        if (!character || character.isNull()) {
          return;
        }
        const pointer = character.add(16).readPointer();
        if (pointer.isNull()) {
          return;
        }
        const text2 = pointer.toString();
        let getResult = this.visualCharacters.get(text2);
        if (!getResult || getResult.visualCharacter.toString() !== character.toString()) {
          getResult = new Se(pointer, character);
          if (sa()) {
            this.visualCharacters.set(text2, getResult);
          }
        }
        const ammoClipVisible = getResult.ammoClipVisible;
        if (ammoClipVisible !== null) {
          if (!this.state || !sa()) {
            return this.restoreClip(text2, getResult);
          }
          if (!this.clipStates.has(text2)) {
            this.clipStates.set(text2, ammoClipVisible);
          }
          getResult.ammoClipVisible = true;
        }
        return;
      },
    });
    return;
  }
  restoreClip(t, e) {
    if (this.clipStates.has(t) && e.ammoClipVisible !== null) {
      e.ammoClipVisible = this.clipStates.get(t);
      this.clipStates.delete(t);
    }
    return;
  }
  update() {
    if (!this.state || !sa()) {
      this.visualCharacters.clear();
      return;
    }
    const uniqueValues = new Set();
    for (const e of de.getCharacterPointers()) {
      if (e && !e.isNull()) {
        uniqueValues.add(e.toString());
      }
    }
    for (const e2 of this.visualCharacters.keys()) {
      if (!uniqueValues.has(e2)) {
        this.visualCharacters.delete(e2);
        this.clipStates.delete(e2);
      }
    }
    return;
  }
}
