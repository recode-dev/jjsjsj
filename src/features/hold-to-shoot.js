/**
 * features/hold-to-shoot.js
 *
 * Hold-to-shoot controller.
 *
 * Symbols: HoldToShootController
 * Source: bundle lines 22890-23059 (1 statements)
 */


class HoldToShootController {
  constructor() {
    this.state = false;
    this.config = {
      timeToAim: 300,
      onAim: true,
      checkRange: false,
      cancelOnRelease: true,
      safetyTilesMargin: 2,
    };
    this.battle = new de();
    this.shootStick = new Pe();
    this.ultiStick = new _e();
    this.handlers = new Os();
    this.attack = new Es();
    this.holdStartedAt = new Map();
    this.nextAttackAt = {
      normal: 0,
      ulti: 0,
    };
    this.#G();
    return;
  }
  toggle() {
    this.state = !this.state;
    return;
  }
  get me() {
    return this.battle.me;
  }
  get #et() {
    const items = [];
    if (this.shootStick.active) {
      items.push({
        type: "normal",
        skill: this.me.nextSkillClient,
        stick: this.shootStick,
      });
    }
    if (this.ultiStick.active) {
      items.push({
        type: "ulti",
        skill: this.me.ultiSkillClient,
        stick: this.ultiStick,
      });
    }
    return items;
  }
  #tt() {
    const me2 = this.me;
    if (!me2) {
      return;
    }
    const et2 = this.#et;
    const uniqueValues = new Set(
      et2.map((arg1) => {
        var type = arg1.type;
        return type;
      }),
    );
    for (const t2 of this.holdStartedAt.keys()) {
      if (!uniqueValues.has(t2)) {
        this.holdStartedAt.delete(t2);
      }
    }
    if (et2.length !== 0) {
      for (const { type: type2, skill: skill, stick: stick } of et2) {
        const active2 = stick.active;
        const nowResult = Date.now();
        if (!(nowResult < this.nextAttackAt[type2])) {
          if (!this.holdStartedAt.has(type2)) {
            this.holdStartedAt.set(type2, nowResult);
          }
          if (!(nowResult - this.holdStartedAt.get(type2) < this.config.timeToAim)) {
            const r = this.config.onAim && Math.hypot(stick.x, stick.y) > stick.deadzone;
            if (!me2.hasCarryable || r) {
              const {
                config: { safetyTilesMargin: safetyTilesMargin },
              } = this;
              if (
                this.handlers.canUse(
                  type2,
                  this.config.checkRange || safetyTilesMargin > 0,
                  me2,
                  safetyTilesMargin,
                )
              ) {
                let l;
                var10: {
                  var9: {
                    if (r) {
                      const battleScreen_convertToControlSchemeResult =
                        globalThis.natives.BattleScreen_convertToControlScheme(
                          de.screenPointer,
                          me2.ptr,
                          new ne(skill).data,
                        );
                      const i3 =
                        0 | battleScreen_convertToControlSchemeResult.and(4294967295).toNumber();
                      const a2 =
                        0 |
                        battleScreen_convertToControlSchemeResult
                          .shr(32)
                          .and(4294967295)
                          .toNumber();
                      l = this.attack.activateSkill(skill, i3, a2, false);
                    } else {
                      if (_a.aimbot?.state === true) {
                        const closestTargetForAutoshoot =
                          this.battle.getClosestTargetForAutoshoot(skill);
                        if (closestTargetForAutoshoot) {
                          const predictResult = _a.aimbot.prediction.predict(
                            skill,
                            closestTargetForAutoshoot,
                          );
                          if (
                            predictResult &&
                            this.handlers.isAimbotTargetValid(
                              skill,
                              predictResult,
                              closestTargetForAutoshoot,
                              me2,
                              this.config.checkRange || safetyTilesMargin > 0,
                              safetyTilesMargin,
                            )
                          ) {
                            l = this.attack.activateSkill(
                              skill,
                              Math.trunc(predictResult.x),
                              Math.trunc(predictResult.y),
                              false,
                            );
                            break var9;
                          }
                        }
                      } else {
                        l = this.attack.activateSkill(skill, 0, 0, true);
                        break var9;
                      }
                      break var10;
                    }
                  }
                  if (l) {
                    if (this.config.cancelOnRelease && active2) {
                      this.attack.markRelease(type2, stick.screen);
                    }
                    const activeTime = new ne(skill).activeTime;
                    this.nextAttackAt[type2] = Date.now() + activeTime;
                  }
                }
              }
            }
          }
        }
      }
    }
    return;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.CombatHUD_updatePlayerControls, {
      onLeave() {
        if (this.state && !_a.killaura.state) {
          this.#tt();
        }
        return;
      },
    });
    return;
  }
}
