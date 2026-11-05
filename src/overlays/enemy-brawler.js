/**
 * overlays/enemy-brawler.js
 *
 * Enemy brawler overlay.
 *
 * Symbols: EnemyBrawlerOverlay
 * Source: bundle lines 26539-26564 (1 statements)
 */


class EnemyBrawlerOverlay {
  constructor() {
    this.state = true;
    this.#G();
    return;
  }
  toggle() {
    this.state = !this.state;
    return this.state;
  }
  setEnabled(t) {
    this.state = Boolean(t);
    return this.state;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.TeamMemberItem_setMember, {
      onEnter(e) {
        if (this.state) {
          e[6] = ptr(1);
        }
        return;
      },
    });
    return;
  }
}
