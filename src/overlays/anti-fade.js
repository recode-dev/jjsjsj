/**
 * overlays/anti-fade.js
 *
 * Anti-fade controller (keeps visuals/HP bars visible).
 *
 * Symbols: FadeController
 * Source: bundle lines 27861-27897 (1 statements)
 */


class FadeController {
  constructor() {
    this.state = false;
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
  #G() {
    Interceptor.attach(globalThis.offsets.Character_updateHealthBar, {
      onEnter(t) {
        this.visualCharacter = t[0];
        return;
      },
      onLeave() {
        if (!this.state || !re.isState(re.states.BATTLE)) {
          return;
        }
        const visualCharacter = this.visualCharacter;
        if (!visualCharacter || visualCharacter.isNull()) {
          return;
        }
        const pointer = visualCharacter.add(Se.LogicPointerOffset).readPointer();
        if (!pointer.isNull()) {
          new Se(pointer).setFadeCounter(10);
        }
        return;
      },
    });
    return;
  }
}
