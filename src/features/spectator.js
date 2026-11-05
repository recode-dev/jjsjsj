/**
 * features/spectator.js
 *
 * Spectator status controller.
 *
 * Symbols: SpectatorStatusController
 * Source: bundle lines 27823-27860 (1 statements)
 */


class SpectatorStatusController {
  constructor() {
    this.state = false;
    this.statuses = new Map();
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
  #Fe(t, e) {
    Interceptor.attach(t, {
      onEnter(t) {
        const toInt32Result = t[1].toInt32();
        if (this.state && toInt32Result === 1) {
          t[1] = ptr(this.statuses.get(e) ?? 3);
          return;
        }
        if (toInt32Result !== 4) {
          this.statuses.set(e, toInt32Result);
          return;
        }
        t[1] = ptr(this.statuses.get(e) ?? 3);
        return;
      },
    });
    return;
  }
  #G() {
    this.#Fe(globalThis.offsets.PlayerStatusMessage_ctor, "PlayerStatus");
    this.#Fe(globalThis.offsets.TeamMemberStatusMessage_ctor, "TeamMemberStatus");
    return;
  }
}
