/**
 * game/gameplay-math.js
 *
 * Geometry and collision helpers (line-segment/rectangle intersection, damage, range).
 *
 * Symbols: Os
 * Source: bundle lines 22506-22659 (1 statements)
 */


class Os {
  constructor(battle2 = new de()) {
    this.battle = battle2;
    return;
  }
  getSkill(t, me2 = this.battle.me) {
    if (!me2) {
      return null;
    }
    switch (t) {
      case "hyper":
      default:
        return null;
      case "ulti":
        return me2.ultiSkillClient;
      case "gadget":
        return me2.bonusSkillClient;
      case "normal":
        return me2.nextSkillClient;
    }
  }
  canCastSkill(t, me2 = this.battle.me) {
    return me2 ? (t ? !t.isNull() && me2.canCastSkill(t) : !!t) : !!me2;
  }
  isTargetInRange(t, me2 = this.battle.me, i = 0) {
    if (!t || !me2) {
      return false;
    }
    const closestTargetForAutoshoot = this.battle.getClosestTargetForAutoshoot(t);
    if (!closestTargetForAutoshoot) {
      return false;
    }
    const a = new Ht(new ne(t).data);
    const product = 100 * Math.min(5, Math.max(0, Number(i) || 0));
    const maxResult = Math.max(0, 100 * a.castingRange - product);
    if (!Number.isFinite(maxResult) || maxResult <= 0) {
      return false;
    }
    const hypotResult = Math.hypot(
      closestTargetForAutoshoot.x - me2.x,
      closestTargetForAutoshoot.y - me2.y,
    );
    return (
      Number.isFinite(hypotResult) && hypotResult <= maxResult + closestTargetForAutoshoot.radius
    );
  }
  hasWallClearTarget(t, me2 = this.battle.me) {
    return t && me2 ? this.battle.getClosestTargetForAutoshoot(t) !== null : !!t && !!me2;
  }
  isAimbotTargetValid(t, e, i, me2 = this.battle.me, a = false, n = 0) {
    if (!t || !e || !i || !me2) {
      return false;
    }
    const r = new Ht(new ne(t).data);
    const o = r.projectiles[0];
    if (!o?.ptr || o.ptr.isNull()) {
      return false;
    }
    const l = new Gt(o.ptr);
    const c = Number(me2.projectileStartRadius) || 0;
    const difference = Number(e.x) - me2.x;
    const difference2 = Number(e.y) - me2.y;
    const hypotResult = Math.hypot(difference, difference2);
    if (!Number.isFinite(hypotResult)) {
      return false;
    }
    if (a) {
      const instance = de.instance?.instance;
      const playerIndex = me2.playerIndex;
      if (!instance || instance.isNull() || !Number.isInteger(playerIndex) || playerIndex < 0) {
        return false;
      }
      de.setPlayers();
      const a2 = de.playerPointers[playerIndex];
      if (!a2 || a2.isNull()) {
        return false;
      }
      const logicBattleModeClient_hasEventModifierResult =
        globalThis.natives.LogicBattleModeClient_hasEventModifier(instance, 35);
      const logicGamePlayUtil_getRangeAddTilesResult =
        globalThis.natives.LogicGamePlayUtil_getRangeAddTiles(
          ptr(0),
          me2.ptr,
          a2,
          instance.add(292).readU32(),
          r.ptr.add(516).readU32(),
          logicBattleModeClient_hasEventModifierResult ? 1 : 0,
          0,
        );
      const logicGamePlayUtil_getHoldRangeAddLogicResult =
        globalThis.natives.LogicGamePlayUtil_getHoldRangeAddLogic(ptr(0), me2.ptr, a2);
      const difference3 =
        globalThis.natives.LogicGamePlayUtil_getEffectiveWeaponRange(
          r.ptr,
          logicGamePlayUtil_getRangeAddTilesResult,
          me2.ptr,
          instance,
        ) +
        (logicGamePlayUtil_getHoldRangeAddLogicResult % 100) -
        100 * Math.min(5, Math.max(0, Number(n) || 0));
      if (!Number.isFinite(difference3) || difference3 <= 0) {
        return false;
      }
      if (hypotResult > difference3 + c + i.radius) {
        return false;
      }
    }
    const tileMap2 = de.tileMap;
    if (!tileMap2 || hypotResult <= 0) {
      return false;
    }
    const quotient = difference / hypotResult;
    const quotient2 = difference2 / hypotResult;
    const combinedValue = me2.x + quotient * c;
    const combinedValue2 = me2.y + quotient2 * c;
    const projectileLogicData = l.projectileLogicData;
    const record = {
      data: l,
      radius: l.radius,
      skillName: l.parent.name,
      ignoresWalls: projectileLogicData.ptr.add(264).readU8() !== 0,
    };
    return (
      tileMap2.traceProjectileEnvironment(record, combinedValue, combinedValue2, e.x, e.y)
        .stopReason === "range"
    );
  }
  canUse(t, e = false, me2 = this.battle.me, s = 0) {
    if (!me2) {
      return false;
    }
    if (t === "hyper") {
      return me2.hyperReady && !me2.hyperActive;
    }
    const skill = this.getSkill(t, me2);
    if (!skill) {
      return false;
    }
    switch (t) {
      case "ulti":
        n = me2.isUltiReady && this.canCastSkill(skill, me2);
        break;
      case "gadget":
        n = me2.isBonusSkillReady && this.canCastSkill(skill, me2);
        break;
      case "normal":
        n = this.canCastSkill(skill, me2);
        break;
      default:
        break;
    }
    return false;
  }
}
