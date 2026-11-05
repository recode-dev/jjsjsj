/**
 * features/autofarm.js
 *
 * Auto farm controller.
 *
 * Symbols: AutoFarmController
 * Source: bundle lines 27699-27822 (1 statements)
 */


class AutoFarmController {
  constructor(t = null) {
    this.state = false;
    this.settings = new oa();
    this.world = new ca(this.settings);
    this.battleState = new ha(this.settings);
    this.selector = new da(this.settings);
    this.inputMovement = new Fe({
      installHooks: false,
    });
    this.movement = new ua(this.world, this.inputMovement, this.battleState);
    this.combat = new ga(this.world, this.battleState, this.settings, t);
    this.statistics = new pa();
    this.home = new fa(this.world, this.settings, this.statistics);
    this.pauseRequested = false;
    this.exitInProgress = false;
    this.#G();
    return;
  }
  setEnabled(t) {
    const e = Boolean(t);
    this.pauseRequested = this.state && !e;
    this.state = e;
    this.settings.enabled = e;
    if (!e) {
      this.battleState.reset();
    }
    return this.state;
  }
  toggle() {
    return this.setEnabled(!this.state);
  }
  setOptions(record = {}) {
    if (this.settings.update(record)) {
      if (Object.prototype.hasOwnProperty.call(record, "enabled")) {
        this.setEnabled(record.enabled);
      }
      return this.getStatus();
    }
    return this.getStatus();
  }
  getStatus() {
    return {
      enabled: this.state,
      settings: {
        autoReady: this.settings.autoReady,
        autoExit: this.settings.autoExit,
        autoAttackBasic: this.settings.autoAttackBasic,
        allowSwitch: this.settings.allowSwitch,
        switchMode: this.settings.switchMode,
        trophyMode: this.settings.trophyMode,
        trophyGoal: [...this.settings.trophyGoal],
        powerLevels: [...this.settings.powerLevels],
      },
      statistics: this.statistics.getStatus(),
    };
  }
  update() {
    if (this.pauseRequested) {
      const snapshot = this.world.getSnapshot();
      if (snapshot !== null && this.world.isMovementAllowed(snapshot)) {
        this.inputMovement.battle.instance = snapshot.logic;
        this.inputMovement.sendTarget(snapshot.position[0], snapshot.position[1], false, true);
      }
      this.pauseRequested = false;
    }
    if (this.state && this.world.battle.battleMode.isNull()) {
      this.battleState.reset();
      this.home.update();
    }
    return;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.BattleScreen_updateSkill, {
      onLeave() {
        this.#Ie();
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.BattleEndPopup_ctor, {
      onEnter(t) {
        this.popupPointer = t[0];
        return;
      },
      onLeave() {
        this.#Be(this.popupPointer);
        return;
      },
    });
    return;
  }
  #Ie() {
    if (!this.state) {
      return;
    }
    const snapshot = this.world.getSnapshot();
    if (snapshot === null) {
      return;
    }
    if (
      this.battleState.battleIdentity === snapshot.logic.toString() &&
      this.battleState.lastTick === snapshot.tick
    ) {
      return;
    }
    const characters = this.world.getCharacters(snapshot);
    if (!this.battleState.update(snapshot, characters)) {
      return;
    }
    const selectResult = this.selector.select(snapshot, characters);
    this.movement.update(snapshot, selectResult);
    this.combat.update(snapshot, selectResult);
    return;
  }
  #Be(t) {
    if (this.state && this.settings.autoExit && !this.exitInProgress && t && !t.isNull()) {
      this.exitInProgress = true;
      globalThis.natives.BattleEndPopup_proceedToNextState(t, 1);
      globalThis.natives.BattleEndPopup_proceedToNextState(t, 3);
      this.exitInProgress = false;
    }
    return;
  }
}
