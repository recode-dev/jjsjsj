/**
 * features/dynajump.js
 *
 * Dyna jump controller (rocket-jump automation).
 *
 * Symbols: DynaJumpController
 * Source: bundle lines 23470-24727 (1 statements)
 */


class DynaJumpController {
  constructor() {
    this.state = false;
    this.config = {
      stickRadius: 130 / 3,
      useUlti: true,
      requireUlti: false,
      minimumAmmoRequired: 0,
      minimumBlastOffset: 75,
      shootEarly: 0,
      landingTolerance: 20,
      retryEveryTicks: 1,
      fallbackJumpDurationMs: 703,
      fallbackTakeoffOffsetMs: -50,
      preloadRetryLeadTicks: 1,
      missedDetonationGraceMs: 180,
      takeoffMatchWindowMs: 220,
    };
    this.battle = new de();
    this.prediction = new Hs(this.battle);
    this.attack = new Es();
    this.stick = null;
    this.toggleSwitcher = null;
    this.appliedStickRadius = null;
    this.profileCache = new Map();
    this.generation = de.generation;
    this.phase = freezeResult.WAIT_DIRECTION;
    this.sequenceStarted = false;
    this.wasAirborne = false;
    this.currentJump = null;
    this.jumpQueue = [];
    this.castIntent = null;
    this.volleySequence = 0;
    this.lastAttemptTick = -1 / 0;
    this.shotAttemptInProgress = false;
    this.lastPlanFailure = null;
    this.observedAirborneDurations = [];
    this.observedTakeoffOffsets = [];
    this.observedLandingRetryLatencies = [];
    this.observedSpawnConfirmDelays = [];
    this.spawnProbe = null;
    this.nativeAttempt = null;
    this.nativeQueuedSkillDataOffset = 3872;
    this.lastBattleScreenPtr = null;
    this.unconfirmedVolleys = [];
    this.jumpAllTest = null;
    Interceptor.attach(globalThis.offsets.BattleScreen_tryToActivateSkill, {
      onEnter(e) {
        this.lastBattleScreenPtr = e[0];
        const nativeAttempt = this.nativeAttempt;
        if (nativeAttempt) {
          nativeAttempt.screenPtr = e[0];
          nativeAttempt.nativeMatched = this.shotAttemptInProgress;
        }
        return;
      },
      onLeave(e) {
        const nativeAttempt = this.nativeAttempt;
        if (nativeAttempt?.nativeMatched) {
          nativeAttempt.nativeReturnValue = e.toInt32();
          if (nativeAttempt.nativeReturnValue === 0 && nativeAttempt.skillDataPointer) {
            const itResult = this.#it(nativeAttempt.screenPtr, nativeAttempt.skillDataPointer);
            if (itResult) {
              nativeAttempt.queuedSkillDataPointer = itResult.toString();
            }
          }
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.BattleScreen_updateSkill, {
      onEnter(e) {
        this.lastBattleScreenPtr = e[0];
        this.#st(Date.now(), e[0]);
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.LogicBattleModeClient_update, {
      onEnter() {
        this.#at();
        return;
      },
    });
    Ce.onDecoded((e) => {
      this.#nt(e);
      return;
    });
    return;
  }
  toggle() {
    return this.setEnabled(!this.state);
  }
  setEnabled(t) {
    this.state = !!t;
    if (!this.state) {
      this.jumpAllTest = null;
      this.#rt(true);
      this.stick?.setVisible(false);
    }
    return this.state;
  }
  get me() {
    return this.battle.me;
  }
  get control() {
    if (this.jumpAllTest) {
      return {
        active: true,
        ...this.jumpAllTest.direction,
        strength: 1,
      };
    }
    if (!this.stick || this.stick.touchId === null || this.stick.radius <= 0) {
      return {
        active: false,
        x: 0,
        y: 0,
        strength: 0,
      };
    }
    const quotient = (this.stick.thumbX - this.stick.centerX) / this.stick.radius;
    const quotient2 = (this.stick.thumbY - this.stick.centerY) / this.stick.radius;
    const minResult = Math.min(1, Math.hypot(quotient, quotient2));
    const maxResult = Math.max(0, Math.min(0.98999999999999999, 15 / this.stick.radius));
    if (minResult <= maxResult) {
      return {
        active: false,
        x: 0,
        y: 0,
        strength: 0,
      };
    }
    return {
      active: true,
      x: quotient / minResult,
      y: quotient2 / minResult,
      strength: (minResult - maxResult) / (1 - maxResult),
    };
  }
  get currentSkill() {
    return this.#ot();
  }
  get projectileProfile() {
    return this.#lt(this.currentSkill);
  }
  jumpAll() {
    const me2 = this.me;
    return me2 && me2.hasDynaJumpStarPower && !this.jumpAllTest
      ? this.#ot()
        ? ((this.jumpAllTest = {
            direction: {
              x: 0,
              y: -1,
            },
            shotsFired: 0,
            landedJumps: 0,
            usedUlti: false,
          }),
          (this.state = true),
          this.#rt(false),
          true)
        : !!this.#ot()
      : !!me2 && !!me2.hasDynaJumpStarPower && !this.jumpAllTest;
  }
  #rt(t = false) {
    this.#ct();
    this.wasAirborne = false;
    this.shotAttemptInProgress = false;
    this.lastBattleScreenPtr = null;
    if (t) {
      this.profileCache.clear();
      this.observedAirborneDurations.length = 0;
      this.observedTakeoffOffsets.length = 0;
      this.observedLandingRetryLatencies.length = 0;
      this.observedSpawnConfirmDelays.length = 0;
    }
    return;
  }
  #ct() {
    this.phase = freezeResult.WAIT_DIRECTION;
    this.sequenceStarted = false;
    this.currentJump = null;
    this.jumpQueue.length = 0;
    this.castIntent = null;
    this.lastAttemptTick = -1 / 0;
    this.nativeAttempt = null;
    this.spawnProbe = null;
    this.unconfirmedVolleys.length = 0;
    return;
  }
  #ht() {
    if (!this.stick) {
      this.stick = new Vs(undefined, "virtuastick_jump_stick", "gui.sc");
      this.stick.setPosition(ii.screenWidth - 100, ii.screenHeight / 2);
      this.#dt();
    }
    return;
  }
  #dt() {
    if (!this.stick) {
      return;
    }
    const appliedStickRadius = Math.max(1, Number(this.config.stickRadius) || 130);
    this.stick.setRadius(appliedStickRadius);
    this.appliedStickRadius = appliedStickRadius;
    return;
  }
  #ut(t, e) {
    const ultiSkillClient = t?.ultiSkillClient;
    return (
      !!ultiSkillClient &&
      !ultiSkillClient.isNull() &&
      !!e &&
      !e.isNull() &&
      e.toString() === ultiSkillClient.toString()
    );
  }
  #ot() {
    const me2 = this.me;
    if (!me2) {
      return null;
    }
    const ultiSkillClient = me2.ultiSkillClient;
    const i = this.config.useUlti
      ? me2.isUltiReady
        ? ultiSkillClient
          ? !ultiSkillClient.isNull() && me2.hasAmmoToActivate(ultiSkillClient)
          : !!ultiSkillClient
        : !!me2.isUltiReady
      : !!this.config.useUlti;
    if (this.config.requireUlti && !this.sequenceStarted && !i) {
      return null;
    }
    const nextSkillClient = me2.nextSkillClient;
    if (
      !nextSkillClient ||
      nextSkillClient.isNull() ||
      (ultiSkillClient &&
        !ultiSkillClient.isNull() &&
        nextSkillClient.toString() === ultiSkillClient.toString()) ||
      !me2.hasAmmoToActivate(nextSkillClient)
    ) {
      if (i) {
        return ultiSkillClient;
      }
      return null;
    }
    return nextSkillClient;
  }
  #lt(t) {
    const me2 = this.me;
    if (!me2 || !t || t.isNull()) {
      return null;
    }
    const concatResult = "".concat(de.generation, ":", t.toString());
    if (this.profileCache.has(concatResult)) {
      return this.profileCache.get(concatResult);
    }
    const data = new ne(t).data;
    if (!data || data.isNull()) {
      this.profileCache.set(concatResult, null);
      return null;
    }
    const a = new Ht(data);
    const n = a.projectiles ?? [];
    const mapResult = n.map((t) => new Gt(t.ptr));
    const filterResult = n.map((t) => t.name).filter(Boolean);
    const findResult = mapResult.find((t) => t?.ptr && !t.ptr.isNull());
    if (!findResult) {
      this.profileCache.set(concatResult, null);
      return null;
    }
    const c =
      mapResult
        .filter((t) => t?.ptr && !t.ptr.isNull())
        .flatMap((t) => [t.spawnAreaEffect, t.spawnAreaEffect2])
        .find(
          (t) => t && !t.ptr.isNull() && Number(t.radius) > 0 && Number(t.pushbackStrengthSelf) > 0,
        ) ?? null;
    const record = {
      skillName: a.name,
      isUlti: this.#ut(me2, t),
      projectileNames: filterResult,
      spread: Number(a.spread) || 0,
      projectilesPerAttack: Math.max(1, Number(a.numOfBulletsInOneAttack) || 1),
      castingRange: 100 * Math.max(0, Number(a.castingRange) || 0),
      indirect: findResult.indirect,
      constantFlyTime: findResult.constantFlyTime,
      minimumDistanceForSpread: findResult.minimumDistanceForSpread,
      triggerWithDelayMs: findResult.triggerWithDelayMs,
      preExplosionTimeMs: findResult.preExplosionTimeMs,
      speed: findResult.speed,
      jumpEffect: c,
    };
    this.profileCache.set(concatResult, record);
    return record;
  }
  #gt() {
    const maxResult = Math.max(1, Number(this.config.fallbackJumpDurationMs) || 703);
    const sortResult = this.observedAirborneDurations
      .filter((e) => Number.isFinite(e) && e >= 500 && e <= 900 && Math.abs(e - maxResult) <= 40)
      .slice(-9)
      .sort((t, e) => t - e);
    if (sortResult.length < 3) {
      return maxResult;
    }
    const floorResult = Math.floor(sortResult.length / 2);
    if (sortResult.length % 2) {
      return sortResult[floorResult];
    }
    return (sortResult[floorResult - 1] + sortResult[floorResult]) / 2;
  }
  #pt() {
    const sortResult = this.observedTakeoffOffsets
      .filter((t) => Number.isFinite(t) && t >= -150 && t <= 80)
      .slice(-9)
      .sort((t, e) => t - e);
    const maxResult = Math.max(1, Number(de.tickDurationMs) || 1);
    const i = -Math.min(25, maxResult / 2);
    if (!sortResult.length) {
      return i;
    }
    if (sortResult.length === 1) {
      return (sortResult[0] + i) / 2;
    }
    const floorResult = Math.floor(sortResult.length / 2);
    if (sortResult.length % 2) {
      return sortResult[floorResult];
    }
    return (sortResult[floorResult - 1] + sortResult[floorResult]) / 2;
  }
  #mt() {
    const sortResult = this.observedLandingRetryLatencies
      .filter((t) => Number.isFinite(t) && t >= 0 && t <= 500)
      .slice(-7)
      .sort((t, e) => t - e);
    if (sortResult.length) {
      return sortResult[Math.floor(sortResult.length / 2)];
    }
    return (
      Math.max(2, Math.trunc(Number(this.config.retryEveryTicks) || 1)) *
      Math.max(1, Number(de.tickDurationMs) || 1)
    );
  }
  #ft(t) {
    const numberResult = Number(t);
    if (Number.isFinite(numberResult) && numberResult >= 0 && numberResult <= 500) {
      this.observedSpawnConfirmDelays.push(numberResult);
      if (this.observedSpawnConfirmDelays.length > 9) {
        this.observedSpawnConfirmDelays.shift();
      }
    }
    return;
  }
  #bt() {
    const sortResult = this.observedSpawnConfirmDelays
      .filter((t) => Number.isFinite(t) && t >= 0 && t <= 500)
      .slice(-7)
      .sort((t, e) => t - e);
    if (sortResult.length) {
      return sortResult[Math.floor(sortResult.length / 2)];
    }
    return (
      Math.max(0, Number(this.battle.skillSpawnDelayMs) || 0) +
      Math.max(1, Number(de.tickDurationMs) || 1) / 2
    );
  }
  #yt() {
    const sortResult = this.observedSpawnConfirmDelays
      .filter((t) => Number.isFinite(t) && t >= 0 && t <= 500)
      .slice(-9)
      .sort((t, e) => t - e);
    const maxResult = Math.max(1, Number(de.tickDurationMs) || 1);
    const maxResult2 = Math.max(8, 0.14999999999999999 * maxResult);
    const s = sortResult.length
      ? sortResult[Math.max(0, Math.ceil(0.90000000000000002 * sortResult.length) - 1)]
      : 0;
    const combinedValue = Math.max(0, Number(this.battle.skillSpawnDelayMs) || 0) + maxResult / 2;
    return Math.max(150, s + maxResult2, combinedValue + maxResult2);
  }
  #vt(t) {
    if (t && Number.isFinite(t.detonationAt)) {
      return t.detonationAt + this.#pt();
    }
    return null;
  }
  #wt(t) {
    const vtResult = this.#vt(t);
    if (!Number.isFinite(vtResult) || !Number.isFinite(t?.jumpDurationMs)) {
      return null;
    }
    const maxResult = Math.max(0, Number(this.config.shootEarly) || 0);
    return vtResult + t.jumpDurationMs + maxResult;
  }
  #St(t, e) {
    if (
      !t ||
      !Number.isFinite(t.detonationAt) ||
      !Number.isFinite(t.jumpDurationMs) ||
      !Number.isFinite(e)
    ) {
      return null;
    }
    const vtResult = this.#vt(t);
    const wtResult = this.#wt(t);
    if (!Number.isFinite(vtResult) || !Number.isFinite(wtResult)) {
      return null;
    }
    const ptResult = this.#pt();
    const mtResult = this.#mt();
    const ytResult = this.#yt();
    const maxResult = Math.max(0, Number(this.#bt()) || 0);
    const maxResult2 = Math.max(ytResult, maxResult + 8);
    const difference = e + ptResult - t.jumpDurationMs - maxResult2;
    if (!Number.isFinite(difference) || difference < 80) {
      return {
        possible: false,
        sourceTakeoffAt: vtResult,
        sourceLandingAt: wtResult,
        maxSteadyGapMs: difference,
        retryLatencyMs: mtResult,
        spawnSafetyLeadMs: ytResult,
        spawnScheduleLeadMs: maxResult2,
      };
    }
    const maxResult3 = Math.max(100, Math.min(250, difference));
    const combinedValue = wtResult + maxResult3;
    const difference2 = combinedValue - ptResult;
    return {
      possible: true,
      sourceTakeoffAt: vtResult,
      sourceLandingAt: wtResult,
      latestSafeAcceptAt: null,
      safeSourceTakeoffAt: null,
      safeTakeoffOffsetMs: null,
      idealAcceptAt: difference2 - e,
      spamStartAt: wtResult,
      desiredDetonationAt: difference2,
      desiredTakeoffAt: combinedValue,
      desiredGroundGapMs: maxResult3,
      targetGroundGapMs: maxResult3,
      maxFeasibleGroundGapMs: difference,
      retryLatencyMs: mtResult,
      spawnSafetyLeadMs: ytResult,
      spawnScheduleLeadMs: maxResult2,
    };
  }
  #Tt(t) {
    const predictJumpTimingResult = this.prediction.predictJumpTiming(t);
    const numberResult = Number(predictJumpTimingResult?.durationMs);
    if (Number.isFinite(numberResult) && numberResult > 0) {
      return {
        durationMs: numberResult,
        durationTicks: Number.isFinite(Number(predictJumpTimingResult?.durationTicks))
          ? Number(predictJumpTimingResult.durationTicks)
          : null,
        source: predictJumpTimingResult?.durationSource ?? "prediction",
        raw: predictJumpTimingResult,
      };
    }
    const gtResult = this.#gt();
    const maxResult = Math.max(1, Number(de.tickDurationMs) || 1);
    return {
      durationMs: gtResult,
      durationTicks: Math.max(1, Math.round(gtResult / maxResult)),
      source: this.observedAirborneDurations.length ? "observed-median" : "configured-fallback",
      raw: predictJumpTimingResult,
    };
  }
  #Mt(t, e, i) {
    const jumpEffect = i.jumpEffect;
    if (!jumpEffect || jumpEffect.ptr.isNull()) {
      return null;
    }
    const me2 = this.me;
    if (!me2 || !e) {
      return null;
    }
    const record = {
      x: Number(e.x),
      y: Number(e.y),
    };
    const record3 = {
      x: Number(t.x),
      y: Number(t.y),
    };
    if (![record.x, record.y, record3.x, record3.y].every(Number.isFinite)) {
      return null;
    }
    const combinedValue =
      Math.max(0, Number(jumpEffect.radius) || 0) + Math.max(0, Number(me2.radius) || 0);
    if (Math.hypot(record.x - record3.x, record.y - record3.y) > combinedValue) {
      return null;
    }
    const predictSelfPushbackLandingResult = de.tileMap?.predictSelfPushbackLanding(
      record3,
      record,
      jumpEffect,
      me2,
    );
    if (predictSelfPushbackLandingResult) {
      return {
        explosionPosition: record,
        landingPosition: {
          x: Number(predictSelfPushbackLandingResult.x),
          y: Number(predictSelfPushbackLandingResult.y),
        },
        effect: jumpEffect,
      };
    }
    return null;
  }
  #Ct(t, record = {}) {
    this.lastPlanFailure = {
      reason: t,
      ...record,
    };
    return null;
  }
  #Nt({
    skill: skill,
    profile: profile,
    control: control,
    castOrigin: castOrigin,
    playerAtImpact: playerAtImpact,
    desiredDetonationAt: desiredDetonationAt = null,
  }) {
    var desiredDetonationAt2 = desiredDetonationAt;
    var playerAtImpact2 = playerAtImpact;
    var castOrigin2 = castOrigin;
    var control2 = control;
    var profile2 = profile;
    var skill2 = skill;
    this.lastPlanFailure = null;
    const me2 = this.me;
    if (!me2) {
      return this.#Ct("no-player");
    }
    if (!skill2 || skill2.isNull()) {
      return this.#Ct("invalid-skill");
    }
    if (!profile2) {
      return this.#Ct("no-profile");
    }
    if (!control2?.active || !(Number(control2.strength) > 0)) {
      return this.#Ct("no-direction");
    }
    const record = {
      x: Number(castOrigin2.x),
      y: Number(castOrigin2.y),
    };
    const record3 = {
      x: Number(playerAtImpact2.x),
      y: Number(playerAtImpact2.y),
    };
    if (![record.x, record.y, record3.x, record3.y].every(Number.isFinite)) {
      return this.#Ct("invalid-origin", {
        origin: record,
        impactPlayer: record3,
      });
    }
    const aimPoint = this.prediction.getAimPoint(
      me2,
      control2,
      profile2,
      this.config.minimumBlastOffset,
      record3,
    );
    if (!aimPoint) {
      return this.#Ct("no-aim-point", {
        impactPlayer: record3,
      });
    }
    const record4 = {
      x: Number(aimPoint.x),
      y: Number(aimPoint.y),
    };
    if (![record4.x, record4.y].every(Number.isFinite)) {
      return this.#Ct("invalid-aim-point", {
        requestedAimPoint: aimPoint,
      });
    }
    const compensateFirstProjectileSpreadResult = this.prediction.compensateFirstProjectileSpread(
      me2,
      record4,
      profile2,
      record,
    );
    if (!compensateFirstProjectileSpreadResult) {
      return this.#Ct("spread-compensation-failed", {
        aim: record4,
        origin: record,
      });
    }
    const record8 = {
      x: Number(compensateFirstProjectileSpreadResult.x),
      y: Number(compensateFirstProjectileSpreadResult.y),
    };
    if (![record8.x, record8.y].every(Number.isFinite)) {
      return this.#Ct("invalid-cast-target", {
        compensated: compensateFirstProjectileSpreadResult,
      });
    }
    const hypotResult = Math.hypot(record8.x - record.x, record8.y - record.y);
    if (hypotResult > profile2.castingRange) {
      return this.#Ct("out-of-range", {
        distance: hypotResult,
        castingRange: profile2.castingRange,
        origin: record,
        target: record8,
        aim: record4,
      });
    }
    const projectileTiming = this.prediction.getProjectileTiming(record8, profile2, record);
    const numberResult = Number(projectileTiming?.detonationDelayMs);
    if (!Number.isFinite(numberResult)) {
      return this.#Ct("invalid-projectile-timing", {
        target: record8,
        origin: record,
      });
    }
    const mtResult = this.#Mt(record3, record4, profile2);
    const b = mtResult ? this.#Tt(mtResult.landingPosition) : null;
    const y = Number.isFinite(desiredDetonationAt2)
      ? desiredDetonationAt2 - numberResult
      : Date.now();
    return {
      skill: skill2,
      skillKey: skill2.toString(),
      profile: profile2,
      control: {
        x: control2.x,
        y: control2.y,
        strength: control2.strength,
      },
      castOrigin: record,
      playerAtImpact: record3,
      requestedAimPoint: record4,
      target: record8,
      targetDistance: hypotResult,
      detonationDelayMs: numberResult,
      desiredDetonationAt: desiredDetonationAt2,
      fireAt: y,
      predictedExplosion: mtResult?.explosionPosition ?? record4,
      predictedLanding: mtResult?.landingPosition ?? null,
      jumpDurationMs: b ? Number(b.durationMs) : null,
      jumpDurationTicks: b
        ? Number.isFinite(Number(b.durationTicks))
          ? Number(b.durationTicks)
          : null
        : null,
      jumpDurationSource: b?.source ?? null,
      jumpTiming: b?.raw ?? null,
    };
  }
  #xt(t, e) {
    const mtResult = this.#Mt(e, t.requestedAimPoint, t.profile);
    if (!mtResult) {
      return false;
    }
    const ttResult = this.#Tt(mtResult.landingPosition);
    t.playerAtImpact = {
      x: Number(e.x),
      y: Number(e.y),
    };
    t.predictedExplosion = mtResult.explosionPosition;
    t.predictedLanding = mtResult.landingPosition;
    t.jumpDurationMs = Number(ttResult.durationMs);
    t.jumpDurationTicks = Number.isFinite(Number(ttResult.durationTicks))
      ? Number(ttResult.durationTicks)
      : null;
    t.jumpDurationSource = ttResult.source;
    t.jumpTiming = ttResult.raw;
    return true;
  }
  #At(t, e = null) {
    return {
      kind: t,
      sourceVolleyId: e?.id ?? null,
      createdAt: Date.now(),
      createdTick: de.tick,
      attempts: 0,
      rejectedAttempts: 0,
      lastAttemptAt: null,
    };
  }
  #kt(t) {
    if (t) {
      switch (t.sourceVolleyId) {
        case null:
          return null;
        default:
          if (this.jumpQueue.find((e) => e.id === t.sourceVolleyId) == null) {
            return null;
          }
          break;
      }
      return;
    }
    return null;
  }
  #Pt(t, e, i, s) {
    const me2 = this.me;
    if (!me2) {
      return null;
    }
    if (t.kind === freezeResult2.INITIAL) {
      const record = {
        x: Number(me2.x),
        y: Number(me2.y),
      };
      return this.#Nt({
        skill: i,
        profile: s,
        control: e,
        castOrigin: record,
        playerAtImpact: record,
      });
    }
    const ktResult = this.#kt(t);
    if (!ktResult) {
      return this.#Ct("missing-source-volley", {
        sourceVolleyId: t.sourceVolleyId,
      });
    }
    if (!ktResult.predictedLanding) {
      const e2 =
        t.kind === freezeResult2.PRELOAD
          ? {
              x: Number(me2.x),
              y: Number(me2.y),
            }
          : ktResult.playerAtImpact;
      if (!e2 || !this.#xt(ktResult, e2)) {
        return this.#Ct("source-landing-unavailable", {
          sourceVolleyId: ktResult.id,
          sourceAimPoint: ktResult.requestedAimPoint,
          sourceImpact: e2,
        });
      }
    }
    if (!Number.isFinite(ktResult.jumpDurationMs) || ktResult.jumpDurationMs <= 0) {
      const ttResult = this.#Tt(ktResult.predictedLanding);
      ktResult.jumpDurationMs = ttResult.durationMs;
      ktResult.jumpDurationTicks = ttResult.durationTicks;
      ktResult.jumpDurationSource = ttResult.source;
      ktResult.jumpTiming = ttResult.raw;
    }
    const record3 = {
      x: Number(me2.x),
      y: Number(me2.y),
    };
    const record4 = {
      x: Number(ktResult.predictedLanding.x),
      y: Number(ktResult.predictedLanding.y),
    };
    const ntResult = this.#Nt({
      skill: i,
      profile: s,
      control: e,
      castOrigin: record3,
      playerAtImpact: record4,
    });
    if (!ntResult) {
      return null;
    }
    const stResult = this.#St(ktResult, ntResult.detonationDelayMs);
    if (stResult) {
      if (stResult.possible) {
        ntResult.desiredDetonationAt = stResult.desiredDetonationAt;
        ntResult.idealAcceptAt = stResult.idealAcceptAt;
        ntResult.spamStartAt = stResult.spamStartAt;
        ntResult.latestSafeAcceptAt = stResult.latestSafeAcceptAt;
        ntResult.safeSourceTakeoffAt = stResult.safeSourceTakeoffAt;
        ntResult.safeTakeoffOffsetMs = stResult.safeTakeoffOffsetMs;
        ntResult.desiredGroundGapMs = stResult.desiredGroundGapMs;
        ntResult.targetGroundGapMs = stResult.targetGroundGapMs;
        ntResult.maxFeasibleGroundGapMs = stResult.maxFeasibleGroundGapMs;
        ntResult.retryLatencyMs = stResult.retryLatencyMs;
        ntResult.spawnSafetyLeadMs = stResult.spawnSafetyLeadMs;
        ntResult.spawnScheduleLeadMs = stResult.spawnScheduleLeadMs;
        t.kind === freezeResult2.PRELOAD
          ? ((ntResult.fireAt = stResult.idealAcceptAt),
            (ntResult.spamStartAt = null),
            (ntResult.timingMode = "scheduled-preload"))
          : ktResult.isUlti
            ? ((ntResult.fireAt = stResult.idealAcceptAt),
              (ntResult.spamStartAt = stResult.idealAcceptAt),
              (ntResult.timingMode = "scheduled-after-ulti"))
            : ((ntResult.fireAt = 0),
              (ntResult.spamStartAt = 0),
              (ntResult.timingMode = "updateSkill-landing-spam"));
        return ntResult;
      }
      return this.#Ct("successor-window-impossible", {
        sourceVolleyId: ktResult.id,
        sourceTakeoffAt: stResult.sourceTakeoffAt,
        sourceLandingAt: stResult.sourceLandingAt,
        latestSafeAcceptAt: stResult.latestSafeAcceptAt,
        maxFeasibleGroundGapMs: stResult.maxFeasibleGroundGapMs,
        targetGroundGapMs: stResult.targetGroundGapMs,
      });
    }
    return this.#Ct("source-timing-unavailable", {
      sourceVolleyId: ktResult.id,
    });
  }
  #_t() {
    const maxResult = Math.max(0, Number(this.config.missedDetonationGraceMs) || 0);
    return Math.max(maxResult, 3 * Math.max(1, Number(de.tickDurationMs) || 1));
  }
  #It(t, e = "queued-push-missed") {
    if (this.currentJump || !this.jumpQueue.length) {
      return false;
    }
    const i = this.jumpQueue[0];
    return (
      !!Number.isFinite(i?.detonationAt) && !(t <= i.detonationAt + this.#_t()) && !(this.#ct(), 0)
    );
  }
  #it(t, e = null) {
    const i = t ?? this.lastBattleScreenPtr;
    if (!i) {
      return null;
    }
    const pointer = i.add(this.nativeQueuedSkillDataOffset).readPointer();
    if (!pointer || pointer.isNull()) {
      return null;
    }
    const a = e ? String(e) : null;
    if (a && pointer.toString() !== a) {
      return null;
    }
    return pointer;
  }
  #Bt(t, e = null) {
    if (!t?.skillDataPointer) {
      return false;
    }
    if (t.queuedSkillDataPointer) {
      return String(t.queuedSkillDataPointer) === String(t.skillDataPointer);
    }
    const screenPtr = t.screenPtr ?? e ?? this.lastBattleScreenPtr;
    const itResult = this.#it(screenPtr, t.skillDataPointer);
    return itResult
      ? ((t.screenPtr = screenPtr), (t.queuedSkillDataPointer = itResult.toString()), true)
      : !!itResult;
  }
  #Ft(t = Date.now(), e = null) {
    const { me: me2, castIntent: castIntent } = this;
    if (!me2 || !castIntent || this.shotAttemptInProgress) {
      return false;
    }
    if (Number(me2.z) !== 0) {
      return false;
    }
    const control = this.control;
    if (!control.active || control.strength <= 0) {
      return false;
    }
    const otResult = this.#ot();
    if (!otResult || otResult.isNull()) {
      return false;
    }
    const ltResult = this.#lt(otResult);
    if (!ltResult) {
      return false;
    }
    const ktResult = this.#kt(castIntent);
    if (castIntent.kind !== freezeResult2.INITIAL && !ktResult) {
      this.castIntent = null;
      return false;
    }
    const ptResult = this.#Pt(castIntent, control, otResult, ltResult);
    if (!ptResult) {
      return false;
    }
    if (castIntent.kind !== freezeResult2.INITIAL) {
      const maxResult = Math.max(1, Number(de.tickDurationMs) || 1);
      const vtResult = this.#vt(ktResult);
      const s2 = Number.isFinite(vtResult) ? vtResult + Math.max(80, 2 * maxResult) : null;
      if (Number.isFinite(s2) && t > s2) {
        this.#ct();
        return false;
      }
      if (t < ptResult.fireAt) {
        return false;
      }
    }
    this.lastAttemptTick = de.tick;
    if (!Number.isFinite(castIntent.firstAttemptAt)) {
      castIntent.firstAttemptAt = t;
    }
    castIntent.attempts = (castIntent.attempts || 0) + 1;
    castIntent.lastAttemptAt = t;
    const data = new ne(otResult).data;
    const h = data ? (!data.isNull() ? data.toString() : null) : null;
    const gidFloor = Number.isFinite(Number(Ce.latestGlobalId)) ? Number(Ce.latestGlobalId) : -1;
    const nativeAttempt = {
      skillPointer: otResult.toString(),
      skillDataPointer: h,
      targetX: 0 | ptResult.target.x,
      targetY: 0 | ptResult.target.y,
      screenPtr: e ?? this.lastBattleScreenPtr,
      nativeMatched: false,
      nativeReturnValue: null,
      queuedSkillDataPointer: null,
    };
    this.nativeAttempt = nativeAttempt;
    this.shotAttemptInProgress = true;
    const g = !!this.attack.tryToActivateSkill(otResult, ptResult.target.x, ptResult.target.y);
    this.shotAttemptInProgress = false;
    const activationQueuedByNative =
      !g && this.#Bt(nativeAttempt, nativeAttempt.screenPtr ?? e ?? this.lastBattleScreenPtr);
    this.nativeAttempt = null;
    if (!g && !activationQueuedByNative) {
      castIntent.rejectedAttempts = (castIntent.rejectedAttempts || 0) + 1;
      return false;
    }
    ptResult.activationQueuedByNative = activationQueuedByNative;
    ptResult.gidFloor = gidFloor;
    const dtResult = this.#Dt(castIntent, ptResult, t, {
      queuedByNative: activationQueuedByNative,
      gidFloor: gidFloor,
      skillDataPointer: h,
    });
    if (dtResult) {
      this.unconfirmedVolleys.push(dtResult);
      if (this.unconfirmedVolleys.length > 8) {
        this.unconfirmedVolleys.shift();
      }
    }
    return true;
  }
  #nt(t) {
    const me2 = this.me;
    if (!me2 || !me2.hasDynaJumpStarPower || t.shooter !== me2.playerIndex) {
      return;
    }
    const numberResult = Number(t.globalID);
    if (!Number.isFinite(numberResult)) {
      return;
    }
    const spawnConfirmedAt = Date.now();
    this.unconfirmedVolleys = this.unconfirmedVolleys.filter(
      (t) => !t.spawnConfirmed && spawnConfirmedAt - t.firedAt <= 2500,
    );
    const findResult = this.unconfirmedVolleys.find(
      (e) =>
        !e.spawnConfirmed &&
        e.projectileNames?.includes(t.skillName) &&
        numberResult > Number(e.gidFloor ?? -1),
    );
    if (findResult) {
      findResult.spawnConfirmed = true;
      findResult.spawnConfirmedAt = spawnConfirmedAt;
      findResult.spawnConfirmDelayMs = spawnConfirmedAt - findResult.firedAt;
      findResult.projectileGid = String(t.globalID);
      this.#ft(findResult.spawnConfirmDelayMs);
      this.unconfirmedVolleys = this.unconfirmedVolleys.filter((t) => t !== findResult);
    }
    return;
  }
  #Dt(t, e, i, record = {}) {
    const record3 = {
      id: ++this.volleySequence,
      sourceVolleyId: t.sourceVolleyId,
      kind: t.kind,
      firedAt: i,
      firedTick: de.tick,
      skillKey: e.skillKey,
      skillName: e.profile.skillName,
      isUlti: e.profile.isUlti,
      profile: e.profile,
      control: e.control,
      castOrigin: e.castOrigin,
      playerAtImpact: e.playerAtImpact,
      requestedAimPoint: e.requestedAimPoint,
      target: e.target,
      targetDistance: e.targetDistance,
      detonationDelayMs: e.detonationDelayMs,
      detonationAt: i + e.detonationDelayMs,
      desiredDetonationAt: e.desiredDetonationAt,
      predictedExplosion: e.predictedExplosion,
      predictedLanding: e.predictedLanding,
      jumpDurationMs: e.jumpDurationMs,
      jumpDurationTicks: e.jumpDurationTicks,
      jumpDurationSource: e.jumpDurationSource,
      jumpTiming: e.jumpTiming,
      timingMode: e.timingMode ?? null,
      idealAcceptAt: Number.isFinite(e.idealAcceptAt) ? e.idealAcceptAt : null,
      spamStartAt: Number.isFinite(e.spamStartAt) ? e.spamStartAt : null,
      latestSafeAcceptAt: Number.isFinite(e.latestSafeAcceptAt) ? e.latestSafeAcceptAt : null,
      safeSourceTakeoffAt: Number.isFinite(e.safeSourceTakeoffAt) ? e.safeSourceTakeoffAt : null,
      safeTakeoffOffsetMs: Number.isFinite(e.safeTakeoffOffsetMs) ? e.safeTakeoffOffsetMs : null,
      desiredGroundGapMs: Number.isFinite(e.desiredGroundGapMs) ? e.desiredGroundGapMs : null,
      targetGroundGapMs: Number.isFinite(e.targetGroundGapMs) ? e.targetGroundGapMs : null,
      maxFeasibleGroundGapMs: Number.isFinite(e.maxFeasibleGroundGapMs)
        ? e.maxFeasibleGroundGapMs
        : null,
      balancedGroundGapMs: null,
      cycleSlackMs: null,
      retryLatencyMs: Number.isFinite(e.retryLatencyMs) ? e.retryLatencyMs : null,
      spawnSafetyLeadMs: Number.isFinite(e.spawnSafetyLeadMs) ? e.spawnSafetyLeadMs : null,
      spawnScheduleLeadMs: Number.isFinite(e.spawnScheduleLeadMs) ? e.spawnScheduleLeadMs : null,
      activationAttempts: t.attempts || 1,
      activationRejections: t.rejectedAttempts || 0,
      spawnConfirmedAt: Number.isFinite(e.spawnConfirmedAt) ? e.spawnConfirmedAt : null,
      spawnConfirmDelayMs: Number.isFinite(e.spawnConfirmDelayMs) ? e.spawnConfirmDelayMs : null,
      projectileGid: e.projectileGid ?? null,
      provisionalNoDecode: !!e.provisionalNoDecode,
      activationPromotionSource: e.activationPromotionSource ?? null,
      queuedByNative: !!record.queuedByNative,
      gidFloor: Number.isFinite(Number(record.gidFloor)) ? Number(record.gidFloor) : -1,
      projectileNames: e.profile.projectileNames ?? [],
      spawnConfirmed: false,
      skillDataPointer: record.skillDataPointer ?? null,
    };
    this.jumpQueue.push(record3);
    this.sequenceStarted = true;
    if (t.kind === freezeResult2.LANDING) {
      const maxResult = Math.max(0, i - Number(t.firstAttemptAt ?? i));
      if (Number.isFinite(maxResult) && maxResult <= 500) {
        this.observedLandingRetryLatencies.push(maxResult);
        if (this.observedLandingRetryLatencies.length > 9) {
          this.observedLandingRetryLatencies.shift();
        }
      }
    }
    this.castIntent = null;
    if (this.jumpAllTest) {
      ++this.jumpAllTest.shotsFired;
      if (record3.isUlti) {
        this.jumpAllTest.usedUlti = true;
      }
    }
    t.kind !== freezeResult2.INITIAL || record3.isUlti
      ? (this.phase = freezeResult.WAIT_TAKEOFF)
      : ((this.castIntent = this.#At(freezeResult2.PRELOAD, record3)),
        (this.phase = freezeResult.PRELOAD));
    return record3;
  }
  #Lt(t) {
    if (!this.jumpQueue.length) {
      this.castIntent = null;
      this.phase = freezeResult.AIRBORNE;
      return;
    }
    const e = this.jumpQueue[0];
    const i =
      e?.playerAtImpact ??
      (this.me
        ? {
            x: Number(this.me.x),
            y: Number(this.me.y),
          }
        : null);
    const s = Number.isFinite(e?.detonationAt) ? t - e.detonationAt : 1 / 0;
    const maxResult = Math.max(80, Number(this.config.takeoffMatchWindowMs) || 220);
    if (!Number.isFinite(s) || Math.abs(s) > maxResult) {
      this.#ct();
      this.phase = freezeResult.AIRBORNE;
      return;
    }
    const shiftResult = this.jumpQueue.shift();
    if (s >= -150 && s <= 80) {
      this.observedTakeoffOffsets.push(s);
      if (this.observedTakeoffOffsets.length > 9) {
        this.observedTakeoffOffsets.shift();
      }
    }
    this.currentJump = {
      volley: shiftResult,
      takeoffAt: t,
      takeoffTick: de.tick,
      takeoffPosition: i,
    };
    this.castIntent = null;
    this.phase = freezeResult.AIRBORNE;
    return;
  }
  #Rt(t) {
    const me2 = this.me;
    if (!me2) {
      return;
    }
    const currentJump = this.currentJump;
    const record = {
      x: Number(me2.x),
      y: Number(me2.y),
    };
    if (currentJump?.volley) {
      const {
        volley: { predictedLanding: predictedLanding },
      } = currentJump;
      const a = predictedLanding
        ? Math.hypot(record.x - predictedLanding.x, record.y - predictedLanding.y)
        : null;
      const difference = t - currentJump.takeoffAt;
      const maxResult = Math.max(30, Number(this.config.landingTolerance) || 20);
      if (
        Number.isFinite(difference) &&
        difference >= 500 &&
        difference <= 900 &&
        Number.isFinite(a) &&
        a <= maxResult &&
        Math.abs(difference - (Number(this.config.fallbackJumpDurationMs) || 703)) <= 40
      ) {
        this.observedAirborneDurations.push(difference);
        if (this.observedAirborneDurations.length > 9) {
          this.observedAirborneDurations.shift();
        }
      }
      if (this.jumpAllTest) {
        this.jumpAllTest.landedJumps++;
      }
    }
    this.currentJump = null;
    const a2 = this.jumpQueue[0] ?? null;
    if (!a2) {
      this.#ct();
      if (this.jumpAllTest && !this.#ot()) {
        this.jumpAllTest = null;
      }
      return;
    }
    if (
      (a2.isUlti || a2.spawnConfirmed || !(t - a2.firedAt > 300)) &&
      !Number.isFinite(a2.detonationAt)
    ) {
      if (this.#xt(a2, record)) {
        this.castIntent = this.#At(freezeResult2.LANDING, a2);
        this.phase = freezeResult.LAND_RETRY;
        this.lastAttemptTick = -1 / 0;
        return;
      }
      this.#ct();
      return;
    }
    if (t > a2.detonationAt + this.#_t()) {
      this.#ct();
      return;
    }
    if (this.#xt(a2, record)) {
      this.castIntent = this.#At(freezeResult2.LANDING, a2);
      this.phase = freezeResult.LAND_RETRY;
      this.lastAttemptTick = -1 / 0;
      return;
    }
    this.#ct();
    return;
  }
  #Et() {
    const me2 = this.me;
    if (!me2 || Number(me2.z) !== 0 || this.currentJump || !this.jumpQueue.length) {
      return;
    }
    const e = this.jumpQueue[0];
    this.#xt(e, {
      x: Number(me2.x),
      y: Number(me2.y),
    });
    return;
  }
  #Ot(nowResult = Date.now()) {
    const me2 = this.me;
    if (!me2) {
      return false;
    }
    const wasAirborne = Number(me2.z) !== 0;
    return (
      wasAirborne !== this.wasAirborne &&
      (wasAirborne ? this.#Lt(nowResult) : this.#Rt(nowResult),
      (this.wasAirborne = wasAirborne),
      true)
    );
  }
  #Ut(t, e) {
    this.#Ot(t);
    if (Number(e.z) !== 0) {
      return null;
    }
    this.#It(t);
    this.#Et();
    const control = this.control;
    if (
      control.active &&
      control.strength > 0 &&
      this.phase === freezeResult.WAIT_DIRECTION &&
      !this.castIntent &&
      this.#ot()
    ) {
      this.castIntent = this.#At(freezeResult2.INITIAL);
    }
    return control;
  }
  #st(t, e) {
    if (!this.state || de.resetting || !re.isState(re.states.BATTLE)) {
      return;
    }
    const me2 = this.me;
    if (!me2 || !me2.hasDynaJumpStarPower) {
      return;
    }
    const utResult = this.#Ut(t, me2);
    if (utResult && utResult.active && utResult.strength > 0 && this.castIntent) {
      this.#Ft(t, e);
    }
    return;
  }
  #at() {
    if (!this.state || de.resetting || !re.isState(re.states.BATTLE)) {
      return;
    }
    const me2 = this.me;
    if (me2 && me2.hasDynaJumpStarPower) {
      this.#Ut(Date.now(), me2);
    }
    return;
  }
  update() {
    if (this.toggleSwitcher && this.toggleSwitcher.isActive !== this.state) {
      this.state ? this.toggleSwitcher.activate() : this.toggleSwitcher.deactivate();
    }
    if (this.generation !== de.generation) {
      this.generation = de.generation;
      this.#rt(true);
      this.jumpAllTest = null;
    }
    const isState = re.isState(re.states.BATTLE);
    if (!this.state || !isState || de.resetting) {
      this.stick?.setVisible(false);
      this.#rt(true);
      return;
    }
    const me2 = this.me;
    if (!me2 || !me2.hasDynaJumpStarPower) {
      this.stick?.setVisible(false);
      this.#rt(true);
      return;
    }
    this.#ht();
    if (this.appliedStickRadius !== this.config.stickRadius) {
      this.#dt();
    }
    this.stick.setVisible(true);
    const utResult = this.#Ut(Date.now(), me2);
    if (
      utResult &&
      (!utResult.active || utResult.strength <= 0) &&
      !this.jumpQueue.length &&
      !this.currentJump
    ) {
      this.#ct();
    }
    return;
  }
}
