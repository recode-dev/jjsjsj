/**
 * features/autoskill.js
 *
 * Auto skill controller (normal / gadget / hyper / ulti).
 *
 * Symbols: AutoSkillController
 * Source: bundle lines 22660-22889 (1 statements)
 */


class AutoSkillController {
  constructor() {
    this.state = false;
    this.config = {
      minHealth: 0,
      hold: false,
      checkRange: false,
      cancelOnRelease: true,
      hyperWaitForUlti: true,
      safetyTilesMargin: 0,
      useNormal: true,
      useGadget: false,
      useUlti: false,
      useHyper: false,
    };
    this.battle = new de();
    this.shared = new Os(this.battle);
    this.shootStick = new Pe();
    this.ultiStick = new _e();
    this.attack = new Es();
    this.nextAttackAt = {
      normal: 0,
      gadget: 0,
      ulti: 0,
      hyper: 0,
    };
    this.currentSkills = {};
    this.pendingHyperUltiAt = 0;
    this.#G();
    return;
  }
  get me() {
    return this.battle.me;
  }
  get aimbotEnabled() {
    return _a.aimbot?.state === true;
  }
  toggle() {
    this.state = !this.state;
    if (!this.state) {
      this.pendingHyperUltiAt = 0;
    }
    return;
  }
  #$(t, e = false) {
    if (Date.now() < this.nextAttackAt[t]) {
      return false;
    }
    const {
      config: { safetyTilesMargin: safetyTilesMargin },
    } = this;
    const canUse = this.shared.canUse(
      t,
      e || this.config.checkRange || safetyTilesMargin > 0,
      this.me,
      safetyTilesMargin,
    );
    this.currentSkills[t] = canUse ? this.shared.getSkill(t, this.me) : null;
    return canUse;
  }
  #q(t, e, i = false) {
    if (!e) {
      return false;
    }
    const s = t === "normal" ? this.shootStick : t === "ulti" ? this.ultiStick : null;
    if (this.config.cancelOnRelease && i && s) {
      this.attack.markRelease(t, s.screen);
    }
    const a = this.currentSkills[t];
    const activeTime = new ne(a).activeTime;
    this.nextAttackAt[t] = Date.now() + activeTime;
    return true;
  }
  #K(t, e = false) {
    const skill = this.shared.getSkill(t, this.me);
    if (!skill) {
      return null;
    }
    const closestTargetForAutoshoot = this.battle.getClosestTargetForAutoshoot(skill);
    if (!closestTargetForAutoshoot) {
      return null;
    }
    const me2 = this.me;
    const predictResult = _a.aimbot.prediction.predict(skill, closestTargetForAutoshoot);
    if (
      predictResult &&
      this.shared.isAimbotTargetValid(
        skill,
        predictResult,
        closestTargetForAutoshoot,
        me2,
        e || this.config.checkRange || this.config.safetyTilesMargin > 0,
        this.config.safetyTilesMargin,
      )
    ) {
      return {
        x: Math.trunc(predictResult.x),
        y: Math.trunc(predictResult.y),
      };
    }
    return null;
  }
  #J(t, e = false) {
    const kResult = this.#K(t, e);
    if (!kResult) {
      return false;
    }
    switch (t) {
      case "ulti":
        return this.attack.shootUlti(kResult.x, kResult.y, false);
      case "gadget":
        return this.attack.shootGadget(kResult.x, kResult.y, false);
      case "normal":
        return this.attack.shoot(kResult.x, kResult.y, false);
      default:
        return false;
    }
  }
  #Q() {
    if (!this.#$("ulti", true)) {
      return null;
    }
    if (this.aimbotEnabled) {
      const kResult = this.#K("ulti", true);
      if (kResult) {
        return {
          aim: kResult,
        };
      }
      return null;
    }
    return {
      aim: null,
    };
  }
  #Z(t, e) {
    if (!t) {
      return false;
    }
    const i = t.aim
      ? this.attack.shootUlti(t.aim.x, t.aim.y, false)
      : this.attack.shootUlti(0, 0, true);
    return this.#q("ulti", i, e);
  }
  #tt() {
    let active;
    let shootStick;
    let t3;
    let t5;
    let ultiStick;
    const t = this.config.hyperWaitForUlti && this.config.useUlti;
    if (!this.config.useHyper || !t) {
      this.pendingHyperUltiAt = 0;
    }
    let e = false;
    let i = false;
    if (this.pendingHyperUltiAt) {
      if (this.me.hyperActive) {
        const qResult = this.#Q();
        if (this.#Z(qResult, this.ultiStick.active)) {
          this.pendingHyperUltiAt = 0;
          return;
        }
        e = true;
      } else {
        if (Date.now() - this.pendingHyperUltiAt < 1000) {
          return;
        }
        this.pendingHyperUltiAt = 0;
      }
    }
    if (this.config.useHyper && this.#$("hyper")) {
      if (!t || this.#Q()) {
        if (this.attack.activateHyperCharge()) {
          this.nextAttackAt.hyper = Date.now() + 250;
          if (t) {
            this.pendingHyperUltiAt = Date.now();
          }
          return;
        }
      } else {
        i = true;
      }
    }
    if (this.config.useUlti && !e && !i && this.#$("ulti")) {
      ({
        ultiStick: { active: t3 },
      } = this);
      const e2 = this.aimbotEnabled ? this.#J("ulti") : this.attack.shootUlti(0, 0, true);
      if (this.#q("ulti", e2, t3)) {
        return;
      }
    }
    if (this.config.useGadget && this.#$("gadget")) {
      const t4 = this.aimbotEnabled ? this.#J("gadget") : this.attack.shootGadget(0, 0, true);
      if (this.#q("gadget", t4)) {
        return;
      }
    }
    if (this.config.useNormal && this.#$("normal")) {
      ({
        shootStick: { active: t5 },
      } = this);
      const e3 = this.aimbotEnabled ? this.#J("normal") : this.attack.shoot(0, 0, true);
      this.#q("normal", e3, t5);
    }
    return;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.LogicBattleModeClient_update, {
      onEnter() {
        if (!this.state) {
          return;
        }
        const me2 = this.me;
        if (me2) {
          if (me2.hasCarryable) {
            this.pendingHyperUltiAt = 0;
            return;
          }
          if (!this.config.useHyper) {
            this.pendingHyperUltiAt = 0;
          }
        }
        return;
      },
    });
    return;
  }
}
