/**
 * game/skills.js
 *
 * Skill & trait wrappers: casting range, activation checks, ammo.
 *
 * Symbols: ae, ne, Ps, ua
 * Source: bundle lines 7331-27284 (4 statements)
 */


class ae {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  get data() {
    return this.ptr.readPointer();
  }
  getData(t = false) {
    return globalThis.natives.LogicSkillClient_getData(this.ptr, t ? 1 : 0);
  }
  get ammoCount() {
    if (!this.ptr || this.ptr.isNull()) {
      return 0;
    }
    return Math.max(0, Math.floor(this.ptr.add(28).readS32() / 1000));
  }
  get cooldown() {
    if (!this.ptr || this.ptr.isNull()) {
      return 0;
    }
    const data = this.data;
    if (!data || data.isNull()) {
      return 0;
    }
    return new Ht(data).cooldown;
  }
  get activeTime() {
    if (!this.ptr || this.ptr.isNull()) {
      return 0;
    }
    const data = this.data;
    if (!data || data.isNull()) {
      return 0;
    }
    return new Ht(data).activeTime;
  }
}

var ne = ae;

class Ps {
  constructor(renderer) {
    this.renderer = renderer;
    this.skills = [
      ["Basic", "basicSkillClient", "basic"],
      ["Super", "superSkillClient", "super"],
      ["Gadget", "gadgetSkillClient", "gadget"],
    ];
    return;
  }
  update(t, e) {
    const uniqueValues = new Set();
    for (const s of t) {
      if (!(s.health.current <= 0)) {
        for (let [t2, a, n] of this.skills) {
          const r = s[a];
          if (r && !r.isNull()) {
            const data = new ne(r).getData(s.hyperActive);
            if (data && !data.isNull()) {
              const combinedValue =
                100 * globalThis.natives.LogicSkillData_getCastingRangeSubtiles(data) +
                (Number(s.projectileStartRadius) || 0);
              if (Number.isFinite(combinedValue) && !(combinedValue <= 0)) {
                const concatResult = "esp:range:".concat(t2, ":", s.globalID);
                const h = e[n];
                this.renderer.updateCircle(concatResult, s.x, s.y, s.z, combinedValue, [
                  h.r,
                  h.g,
                  h.b,
                  55,
                ]);
                uniqueValues.add(concatResult);
              }
            }
          }
        }
      }
    }
    this.removeStale(uniqueValues);
    return;
  }
  removeStale(uniqueValues = new Set()) {
    for (const e of [...this.renderer.paths.keys(), ...this.renderer.circles.keys()]) {
      if (e.startsWith("esp:range:") && !uniqueValues.has(e)) {
        this.renderer.remove(e);
      }
    }
    return;
  }
}

class ua {
  constructor(world, movement, state) {
    this.world = world;
    this.movement = movement;
    this.state = state;
    return;
  }
  update(t, e) {
    let e2;
    let i2;
    if (!this.world.isMovementAllowed(t)) {
      this.state.lastAngle = null;
      return;
    }
    if (this.state.lastStopTick !== null && t.tick - this.state.lastStopTick <= 10) {
      return;
    }
    const own = t.own;
    const {
      teammate: teammate,
      enemy: enemy,
      carrier: carrier,
      nearestTeammate: nearestTeammate,
    } = e;
    if (own.hasCarryable) {
      this.#be(t, t.goal, 100);
      return;
    }
    if (carrier !== null && enemy === null) {
      this.#be(t, carrier.position, 50);
      return;
    }
    if (enemy === null) {
      this.#be(
        t,
        teammate === null ? this.world.getMapCenter(t) : teammate.position,
        teammate === null ? 300 : 600,
      );
      return;
    }
    const skill = this.world.getSkill(own);
    const l = skill === null ? 0 : this.world.getWeaponRange(t, skill);
    const c = l < 1500;
    const quotient = own.health / own.maximumHealth;
    const quotient2 = enemy.health / enemy.maximumHealth;
    const yeResult = this.#ye(t.position, enemy.position);
    const g = !own.hasSpawnShield && this.world.isLineClear(t, enemy.position, t.position);
    if (quotient2 > 0.29999999999999999 && !c && g && yeResult < 0.84999999999999998 * l) {
      this.#ve(t, enemy.position, l - yeResult);
      return;
    }
    if (teammate !== null && nearestTeammate === null) {
      if (quotient > 0.5 && !c && g && yeResult < 0.84999999999999998 * l) {
        this.#ve(t, enemy.position, l - yeResult);
        return;
      }
      if (quotient > 0.5 && c && g) {
        e2 = this.world.getSkill(enemy);
        i2 =
          e2 === null
            ? 0
            : 100 * globalThis.natives.LogicSkillData_getCastingRangeSubtiles(e2.data);
        if (yeResult < i2) {
          this.#ve(t, enemy.position, i2 - yeResult);
          return;
        }
      }
      quotient < 0.5
        ? quotient2 > 0.5
          ? this.#be(t, teammate.position)
          : this.#be(
              t,
              quotient > 0.5 ? (c ? enemy.position : teammate.position) : teammate.position,
            )
        : this.#be(
            t,
            quotient > 0.5 ? (c ? enemy.position : teammate.position) : teammate.position,
          );
      return;
    }
    if (this.#ye(nearestTeammate.position, enemy.position) < 3000) {
      this.#be(t, enemy.position);
      return;
    }
    if (quotient > 0.5 && !c && g && yeResult < 0.84999999999999998 * l) {
      this.#ve(t, enemy.position, l - yeResult);
      return;
    }
    if (quotient > 0.5 && c && g) {
      e2 = this.world.getSkill(enemy);
      i2 =
        e2 === null ? 0 : 100 * globalThis.natives.LogicSkillData_getCastingRangeSubtiles(e2.data);
      if (yeResult < i2) {
        this.#ve(t, enemy.position, i2 - yeResult);
        return;
      }
    }
    quotient < 0.5
      ? quotient2 > 0.5
        ? this.#be(t, teammate.position)
        : this.#be(t, quotient > 0.5 ? (c ? enemy.position : teammate.position) : teammate.position)
      : this.#be(t, quotient > 0.5 ? (c ? enemy.position : teammate.position) : teammate.position);
    return;
  }
  #be(t, e, i = 600) {
    const yeResult = this.#ye(t.position, e);
    const items = [e[0] + this.state.randomOffset[0], e[1] + this.state.randomOffset[1]];
    const quotient =
      (180 * Math.atan2(items[1] - t.position[1], items[0] - t.position[0])) / Math.PI;
    if (yeResult < i) {
      if (!this.state.stopped) {
        this.state.stopped = true;
        this.state.lastStopTick = t.tick;
        this.state.lastMoveTick = t.tick;
        this.#we(t, this.#Se(t.position, this.state.lastAngle ?? quotient, 150), false);
      }
      return;
    }
    const r =
      this.state.lastAngle === null ? 180 : Math.abs(this.#Te(quotient, this.state.lastAngle));
    if (this.state.lastMoveTick !== null && t.tick - this.state.lastMoveTick < 5 && r < 30) {
      return;
    }
    const combinedValue = 15 + 75 * Math.random();
    const l = this.state.lastAngle === null ? 0 : this.#Te(quotient, this.state.lastAngle);
    const lastAngle =
      this.state.lastAngle === null || Math.abs(l) <= combinedValue
        ? quotient
        : this.state.lastAngle + Math.sign(l) * combinedValue;
    this.state.stopped = false;
    this.state.lastMoveTick = t.tick;
    this.state.lastAngle = lastAngle;
    this.#we(t, this.#Se(t.position, lastAngle, 600));
    return;
  }
  #we(t, e, i = true) {
    this.movement.battle.instance = t.logic;
    return this.movement.sendTarget(Math.round(e[0]), Math.round(e[1]), i, true);
  }
  #ve(t, e, i) {
    const quotient = (180 * Math.atan2(t.position[1] - e[1], t.position[0] - e[0])) / Math.PI;
    this.#be(t, this.#Se(t.position, quotient, i));
    return;
  }
  #Se(t, e, i) {
    const quotient = (e * Math.PI) / 180;
    return [t[0] + Math.cos(quotient) * i, t[1] + Math.sin(quotient) * i];
  }
  #Te(t, e) {
    return ((((t - e + 180) % 360) + 360) % 360) - 180;
  }
  #ye(t, e) {
    return Math.hypot(t[0] - e[0], t[1] - e[1]);
  }
}
