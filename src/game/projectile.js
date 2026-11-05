/**
 * game/projectile.js
 *
 * Projectile wrappers and decode hook: spawn prediction, trajectory, landing estimates.
 *
 * Symbols: jt, Gt, t9, Vt, Ht, Yt, Wt, entries, t25, Me, Ce, Ne, xe, Ae, t27, ke
 * Source: bundle lines 5930-10074 (16 statements)
 */


var jt = class t8 extends Et {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  static fromName(t) {
    const dataByName = $t.getDataByName(t, 6);
    if (dataByName.ptr.isNull()) {
      return null;
    }
    return dataByName;
  }
  get parentForSkin() {
    return new t8(this.ptr.add(104).readPointer());
  }
  get parent() {
    const parentForSkin = this.parentForSkin;
    if (parentForSkin.ptr.isNull()) {
      return this;
    }
    return parentForSkin;
  }
  get projectileLogicData() {
    return $t.getDataByName(this.getValue("LogicProjectile").contents, 125);
  }
  get indirect() {
    return this.projectileLogicData.getBooleanValue("Indirect");
  }
  get uniqueProperty() {
    return this.projectileLogicData.getIntegerValue("UniqueProperty");
  }
  get specialVisualState() {
    return this.getBooleanValue("SpecialVisualState");
  }
  get specialTrailEffect() {
    return this.getValue("SpecialTrailEffect");
  }
  get triggerWithDelayMs() {
    return this.projectileLogicData.getIntegerValue("TriggerWithDelayMs");
  }
  get targetedToSourceEffect() {
    return this.getValue("TargetedToSourceEffect");
  }
  get rendering() {
    return this.getValue("Rendering").contents;
  }
  get isDoNotRotateClip() {
    return this.rendering === "DoNotRotateClip";
  }
  get preExplosionTimeMs() {
    return this.projectileLogicData.getIntegerValue("PreExplosionTimeMs");
  }
  get ignoreLevelBorder() {
    return this.projectileLogicData.getBooleanValue("IgnoreLevelBorder");
  }
  get ignoreCloseWalls() {
    return this.projectileLogicData.getBooleanValue("IgnoreCloseWalls");
  }
  get travelType() {
    return this.projectileLogicData.getIntegerValue("TravelType");
  }
  get speed() {
    return this.projectileLogicData.getIntegerValue("Speed");
  }
  get constantFlyTime() {
    return this.projectileLogicData.getBooleanValue("ConstantFlyTime");
  }
  get gravity() {
    return this.projectileLogicData.getIntegerValue("Gravity");
  }
  get effectiveGravity() {
    return this.gravityForRendering;
  }
  get gravityForRendering() {
    return globalThis.natives.LogicProjectileData_getGravityForRendering(this.ptr);
  }
  get bouncePercent() {
    return this.projectileLogicData.getIntegerValue("BouncePercent");
  }
  get minimumDistanceForSpread() {
    return this.projectileLogicData.getIntegerValue("MinDistanceForSpread");
  }
  get lifetime() {
    return globalThis.natives.LogicItemData_getLifetime(this.ptr);
  }
  get boomerangType() {
    return this.projectileLogicData.getIntegerValue("BoomerangType");
  }
  get earlyTicks() {
    return this.projectileLogicData.getIntegerValue("EarlyTicks");
  }
  get radius() {
    return this.projectileLogicData.getIntegerValue("Radius");
  }
  get piercesCharacters() {
    return this.projectileLogicData.getBooleanValue("PiercesCharacters");
  }
  get piercesEnvironment() {
    return this.projectileLogicData.getBooleanValue("PiercesEnvironment");
  }
  get piercesEnvironmentLikeButter() {
    return this.projectileLogicData.getBooleanValue("PiercesEnvironmentLikeButter");
  }
  get passesEnvironment() {
    return this.projectileLogicData.getBooleanValue("PassesEnvironment");
  }
  get passesThroughEnvironment() {
    return this.piercesEnvironment || this.piercesEnvironmentLikeButter || this.passesEnvironment;
  }
  get damagePercentStart() {
    const integerValue = this.projectileLogicData.getIntegerValue("DamagePercentStart");
    if (integerValue == 0) {
      return 100;
    }
    return integerValue;
  }
  get damagePercentEnd() {
    const integerValue = this.projectileLogicData.getIntegerValue("DamagePercentEnd");
    if (integerValue == 0) {
      return 100;
    }
    return integerValue;
  }
  get spawnAreaEffect() {
    return new Ut(this.ptr.add(376).readPointer());
  }
  get spawnAreaEffect2() {
    return new Ut(this.ptr.add(384).readPointer());
  }
};

var Gt = jt;

class t9 extends Et {
  static rangeAdd2Offset;
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  static {
    this.rangeAdd2Offset = 516;
  }
  get rangeAdd2() {
    return this.ptr.add(t9.rangeAdd2Offset).readU8();
  }
  get behaviorType() {
    return this.getValue("BehaviorType");
  }
  get canMoveAtSameTime() {
    return this.getBooleanValue("CanMoveAtSameTime");
  }
  get activeTime() {
    return this.getIntegerValue("ActiveTime");
  }
  get castingTime() {
    return this.getIntegerValue("CastingTime");
  }
  get castingRange() {
    return this.getIntegerValue("CastingRange");
  }
  get damage() {
    return this.getIntegerValue("Damage");
  }
  get damageModifier() {
    return this.getIntegerValue("DamageModifier");
  }
  get msBetweenAttacks() {
    return this.getIntegerValue("MsBetweenAttacks");
  }
  get cooldown() {
    return this.getIntegerValue("Cooldown");
  }
  get spread() {
    return this.getIntegerValue("Spread");
  }
  get attackPattern() {
    return this.getIntegerValue("AttackPattern");
  }
  get numOfBulletsInOneAttack() {
    return this.getIntegerValue("NumBulletsInOneAttack");
  }
  get chargedShotCount() {
    return this.getIntegerValue("ChargedShotCount");
  }
  get executeFirstAttackImmediately() {
    return this.getBooleanValue("ExecuteFirstAttackImmediately");
  }
  get projectileNames() {
    return this.getValue("Projectiles")
      .contents.split(/[;:]/)
      .map((text2) => text2.trim())
      .filter(Boolean);
  }
  get projectiles() {
    return this.projectileNames.map((t) => $t.getDataByName(t, 6));
  }
  get maxCharge() {
    return this.getIntegerValue("MaxCharge");
  }
  get overchargedVersion() {
    const contents = this.getValue("OverchargedVersion").contents;
    if (contents == "") {
      return null;
    }
    return $t.getDataByName(contents, 20);
  }
  get skillChangeType() {
    return this.getIntegerValue("SkillChangeType");
  }
  get rechargeTime() {
    return this.getIntegerValue("RechargeTime");
  }
  get multiShot() {
    return this.getBooleanValue("MultiShot");
  }
  get chargeSpeed() {
    return this.getIntegerValue("ChargeSpeed");
  }
  get chargesUpAttack() {
    return this.behaviorType.contents == "Weapon" && this.chargeSpeed > 0;
  }
  get chargeUpTimeMs() {
    if (this.chargesUpAttack) {
      return this.chargeSpeed;
    }
    return 0;
  }
  get chargeType() {
    return this.getIntegerValue("ChargeType");
  }
}

var Vt = t9;

var Ht = Vt;

class Yt extends Et {
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  get throwSkillName() {
    return this.getValue("ThrowSkill").contents;
  }
  get throwSkillUltiName() {
    return this.getValue("ThrowSkillUlti").contents;
  }
  get throwSkill() {
    return this.#t(this.throwSkillName);
  }
  get throwSkillUlti() {
    return this.#t(this.throwSkillUltiName);
  }
  get throwDistanceSubTiles() {
    return this.getIntegerValue("ThrowDistanceSubTiles");
  }
  get throwDistanceUltiSubTiles() {
    return this.getIntegerValue("ThrowDistanceUltiSubTiles");
  }
  get throwForce() {
    return this.getIntegerValue("ThrowForce");
  }
  get throwForceUlti() {
    return this.getIntegerValue("ThrowForceUlti");
  }
  get useArc() {
    return this.getIntegerValue("UseArc");
  }
  get bouncing() {
    return this.getIntegerValue("Bouncing");
  }
  #t(t) {
    if (!t) {
      return null;
    }
    const dataByName = $t.getDataByName(t, 20);
    if (dataByName.ptr.isNull()) {
      return null;
    }
    return dataByName;
  }
}

var Wt = Yt;

var entries = new Map([
  [6, Gt],
  [17, Ut],
  [20, Ht],
  [60, Wt],
  [125, Gt],
  [150, Ut],
]);

class t25 extends Jt {
  static patched;
  static generation;
  static seenGids;
  static latestGlobalId;
  static decodedListeners;
  static firstMotionListeners;
  static pendingAngles;
  static pendingMotionAngles;
  static inferredAngles;
  static startPositions;
  static landingSamples;
  static landingEstimates;
  static landingTrackingPointers;
  static landingSampleLimit;
  static minimumLandingProgressSpan;
  static landingPositionThreshold;
  static updateProgressByPointer;
  static effectiveCastingRangeCache;
  static shooterCharacterCache;
  static shooterLevelCache;
  static landingListeners;
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  static {
    this.patched = false;
    this.generation = -1;
    this.seenGids = new Set();
    this.latestGlobalId = null;
    this.decodedListeners = new Set();
    this.firstMotionListeners = new Set();
    this.pendingAngles = new Map();
    this.pendingMotionAngles = new Map();
    this.inferredAngles = new Map();
    this.startPositions = new Map();
    this.landingSamples = new Map();
    this.landingEstimates = new Map();
    this.landingTrackingPointers = new Set();
    this.landingSampleLimit = 2;
    this.minimumLandingProgressSpan = 16;
    this.landingPositionThreshold = 20;
    this.updateProgressByPointer = new Map();
    this.effectiveCastingRangeCache = new Map();
    this.shooterCharacterCache = new Map();
    this.shooterLevelCache = new Map();
    this.landingListeners = new Set();
  }
  static landingKey(t) {
    return "".concat(de.generation, ":", t.globalID);
  }
  static rememberProgress(t, e) {
    if (Number.isFinite(e)) {
      this.updateProgressByPointer.delete(t);
      this.updateProgressByPointer.set(t, e);
      if (this.updateProgressByPointer.size > 512) {
        this.updateProgressByPointer.delete(this.updateProgressByPointer.keys().next().value);
      }
    }
    return;
  }
  #o(t, e) {
    const quotient = Math.min(1000, t) / 1000;
    const difference = 1 - e / 1000;
    if (e <= 0 || quotient <= difference) {
      return quotient;
    }
    return (quotient + difference) / 2;
  }
  static landingFromTwoSamples(t, e) {
    const sliceResult = t.slice(-2);
    if (sliceResult.length !== 2) {
      return null;
    }
    let [s, a] = sliceResult;
    const deltaTick = a.tick - s.tick;
    const deltaX = a.x - s.x;
    const deltaY = a.y - s.y;
    const deltaProgress = a.progress - s.progress;
    const maxResult = Math.max(0, Number(e.data.bouncePercent));
    const minResult = Math.min(1000, 10 * maxResult);
    if (a.progress >= 1000) {
      return {
        position: {
          x: a.x,
          y: a.y,
        },
        source: "terminal-progress",
        sampleProgress: a.progress,
        firstSampleTick: s.tick,
        lastSampleTick: a.tick,
        landingProgress: 1000,
        pathLength: 0,
        flightTimeMs: 0,
      };
    }
    if (
      deltaProgress < this.minimumLandingProgressSpan ||
      !Number.isFinite(deltaTick) ||
      deltaTick <= 0 ||
      !Number.isFinite(maxResult) ||
      ![s.x, s.y, s.progress, s.tick, a.x, a.y, a.progress, a.tick].every(Number.isFinite)
    ) {
      return null;
    }
    const quotient = deltaProgress / deltaTick;
    const product = 0.75 * quotient;
    const minResult2 = Math.min(1000, s.progress - product);
    const minResult3 = Math.min(1000, a.progress - product);
    const oResult = this.#o(minResult2, minResult);
    const oResult2 = this.#o(minResult3, minResult);
    const oResult3 = this.#o(1000, minResult);
    const difference = oResult2 - oResult;
    if (difference <= 0) {
      return null;
    }
    const quotient2 = deltaX / difference;
    const quotient3 = deltaY / difference;
    const difference2 = s.x - quotient2 * oResult;
    const difference3 = s.y - quotient3 * oResult;
    const combinedValue = difference2 + quotient2 * oResult3;
    const combinedValue2 = difference3 + quotient3 * oResult3;
    const difference4 = 1000 - minResult;
    const oResult4 = this.#o(difference4, minResult);
    const A =
      minResult > 0
        ? {
            x: Math.round(difference2 + quotient2 * oResult4),
            y: Math.round(difference3 + quotient3 * oResult4),
          }
        : null;
    const hypotResult = Math.hypot(combinedValue - a.x, combinedValue2 - a.y);
    const P = quotient > 0 ? ((1000 - minResult3) / quotient) * 50 : null;
    if (Number.isFinite(combinedValue) && Number.isFinite(combinedValue2) && P === null) {
      return {
        position: {
          x: Math.round(combinedValue),
          y: Math.round(combinedValue2),
        },
        source: minResult > 0 ? "two-sample-server-bounce" : "two-sample-server-linear",
        sampleProgress: a.progress,
        firstSampleTick: s.tick,
        lastSampleTick: a.tick,
        serverProgress: minResult3,
        progressPerTick: quotient,
        landingProgress: 1000,
        pathLength: hypotResult,
        flightTimeMs: P,
        bounceProgress: minResult > 0 ? difference4 : null,
        bouncePosition: A,
      };
    }
    if (!Number.isFinite(P) || P <= 0 || P > 30000) {
      return null;
    }
    return {
      position: {
        x: Math.round(combinedValue),
        y: Math.round(combinedValue2),
      },
      source: minResult > 0 ? "two-sample-server-bounce" : "two-sample-server-linear",
      sampleProgress: a.progress,
      firstSampleTick: s.tick,
      lastSampleTick: a.tick,
      serverProgress: minResult3,
      progressPerTick: quotient,
      landingProgress: 1000,
      pathLength: hypotResult,
      flightTimeMs: P,
      bounceProgress: minResult > 0 ? difference4 : null,
      bouncePosition: A,
    };
  }
  static appendLandingSample(t, e) {
    t.push(e);
    if (t.length > this.landingSampleLimit) {
      t.shift();
    }
    return;
  }
  static stopLandingTracking(t) {
    for (const e of t?.pointerKeys ?? []) {
      this.landingTrackingPointers.delete(e);
      this.updateProgressByPointer.delete(e);
    }
    return;
  }
  static resetTracking() {
    if (this.generation !== de.generation) {
      this.generation = de.generation;
      this.seenGids.clear();
      this.latestGlobalId = null;
      this.pendingAngles.clear();
      this.pendingMotionAngles.clear();
      this.inferredAngles.clear();
      this.startPositions.clear();
      this.landingSamples.clear();
      this.landingEstimates.clear();
      this.landingTrackingPointers.clear();
      this.updateProgressByPointer.clear();
      this.effectiveCastingRangeCache.clear();
      this.shooterCharacterCache.clear();
      this.shooterLevelCache.clear();
    }
    return;
  }
  static onDecoded(t) {
    this.decodedListeners.add(t);
    return () => this.decodedListeners.delete(t);
  }
  static onFirstMotion(t) {
    this.firstMotionListeners.add(t);
    return () => this.firstMotionListeners.delete(t);
  }
  static onLandingEstimate(t) {
    this.landingListeners.add(t);
    return () => this.landingListeners.delete(t);
  }
  static publishDecoded(t) {
    for (const e of this.decodedListeners) {
      e(t);
    }
    return;
  }
  static resolvePendingAngle(t) {
    const text2 = t.ptr.toString();
    const getResult = this.pendingAngles.get(text2);
    const getResult2 = this.landingSamples.get(this.landingKey(t));
    const decodeSamples = getResult2?.decodeSamples;
    const n =
      decodeSamples?.length >= 2
        ? decodeSamples[1].progress > decodeSamples[0].progress
          ? decodeSamples
          : getResult2?.samples
        : getResult2?.samples;
    const r = n?.length >= 2 && n[n.length - 1].progress > n[n.length - 2].progress;
    const o = r ? n[n.length - 2] : getResult;
    const l = r
      ? n[n.length - 1]
      : getResult && {
          x: t.x,
          y: t.y,
          progress: t.progress,
        };
    if (!o || !l) {
      return false;
    }
    if (o.progress !== undefined && l.progress <= o.progress) {
      return false;
    }
    const deltaX = l.x - o.x;
    const deltaY = l.y - o.y;
    if (deltaX === 0 && deltaY === 0) {
      return false;
    }
    const remainder = ((180 * Math.atan2(deltaY, deltaX)) / Math.PI + 360) % 360;
    const getResult3 = this.inferredAngles.get(text2);
    this.inferredAngles.set(text2, remainder);
    this.pendingAngles.delete(text2);
    this.updateLandingEstimate(t);
    if (getResult || getResult3 === undefined) {
      this.publishDecoded(t);
    }
    return true;
  }
  static updateLandingEstimate(t) {
    const landingKeyResult = this.landingKey(t);
    const getResult = this.landingSamples.get(landingKeyResult);
    if (getResult?.lockedLandingEstimate) {
      return;
    }
    const s =
      getResult?.samples?.length >= 2 ? this.landingFromTwoSamples(getResult.samples, t) : null;
    const a = Number(t.data.bouncePercent) > 0 ? t.targetPosition : null;
    const lockedLandingEstimate = a
      ? {
          position: a,
          source: "decoded-target",
          sampleProgress: Number(t.progress),
          pathLength: null,
          flightTimeMs: null,
        }
      : s;
    if (!lockedLandingEstimate) {
      return;
    }
    const getResult2 = this.landingEstimates.get(landingKeyResult);
    if (getResult) {
      getResult.lockedLandingEstimate = lockedLandingEstimate;
      this.stopLandingTracking(getResult);
    }
    const o = getResult?.publishedLandingPosition ?? getResult2?.position;
    const l =
      o &&
      Math.hypot(lockedLandingEstimate.position.x - o.x, lockedLandingEstimate.position.y - o.y);
    this.landingEstimates.set(landingKeyResult, lockedLandingEstimate);
    if (!o || !(l < this.landingPositionThreshold)) {
      if (getResult) {
        getResult.publishedLandingPosition = {
          x: lockedLandingEstimate.position.x,
          y: lockedLandingEstimate.position.y,
        };
      }
      for (const e2 of this.landingListeners) {
        e2(t, lockedLandingEstimate);
      }
    }
    return;
  }
  static observeLanding(t, e = "update") {
    if (!t.data.indirect) {
      return;
    }
    const landingKeyResult = this.landingKey(t);
    const text2 = t.ptr.toString();
    const getResult = this.landingSamples.get(landingKeyResult);
    if (getResult?.lockedLandingEstimate || getResult?.samples.length >= this.landingSampleLimit) {
      getResult.pointerKeys.add(text2);
      this.stopLandingTracking(getResult);
      return;
    }
    const record = {
      x: Number(t.x),
      y: Number(t.y),
      progress: Number(t.progress),
      tick: de.tick,
    };
    if (![record.x, record.y, record.progress].every(Number.isFinite)) {
      return;
    }
    this.rememberProgress(text2, record.progress);
    if (record.progress >= 1000) {
      return;
    }
    const getResult2 = this.landingSamples.get(landingKeyResult);
    if (getResult2) {
      getResult2.pointerKeys.add(text2);
      if (record.progress <= getResult2.lastProgress) {
        return;
      }
      const t2 = getResult2.samples[getResult2.samples.length - 1];
      getResult2.lastProgress = record.progress;
      if (e === "decode") {
        this.appendLandingSample(getResult2.decodeSamples, record);
      }
      if (!t2 || record.progress > t2.progress) {
        this.appendLandingSample(getResult2.samples, record);
      }
    } else {
      this.landingSamples.set(landingKeyResult, {
        samples: [record],
        decodeSamples: e === "decode" ? [record] : [],
        lastProgress: record.progress,
        pointerKey: text2,
        pointerKeys: new Set([text2]),
      });
    }
    this.landingTrackingPointers.add(text2);
    const getResult3 = this.landingSamples.get(landingKeyResult);
    if (e === "decode" && getResult3.decodeSamples.length >= 2) {
      this.resolvePendingAngle(t);
    }
    if (e === "update" || e === "decode") {
      this.updateLandingEstimate(t);
    }
    if (this.landingSamples.size > 256) {
      const value = this.landingSamples.keys().next().value;
      const getResult4 = this.landingSamples.get(value);
      for (const t4 of getResult4?.pointerKeys ?? []) {
        this.landingTrackingPointers.delete(t4);
        this.updateProgressByPointer.delete(t4);
      }
      this.landingSamples.delete(value);
      this.landingEstimates.delete(value);
    }
    if (this.landingEstimates.size > 128) {
      const value2 = this.landingEstimates.keys().next().value;
      this.landingEstimates.delete(value2);
      const getResult5 = this.landingSamples.get(value2);
      for (const t6 of getResult5?.pointerKeys ?? []) {
        this.landingTrackingPointers.delete(t6);
        this.updateProgressByPointer.delete(t6);
      }
      this.landingSamples.delete(value2);
    }
    return;
  }
  static ctor(t) {
    return globalThis.natives.LogicProjectileClient_ctor(t);
  }
  static get decodeNative() {
    this._decodeNative ||= new NativeFunction(
      globalThis.offsets.LogicProjectileClient_decode,
      "void",
      ["pointer", "pointer", "int", "bool"],
    );
    return this._decodeNative;
  }
  static decode(t, e, i, s) {
    return this.decodeNative(t, e, i, s);
  }
  static hook() {
    if (this.patched) {
      return;
    }
    this.patched = true;
    Interceptor.attach(globalThis.offsets.LogicProjectileClient_decode, {
      onEnter(t) {
        if (!re.isState(re.states.BATTLE)) {
          this.ignore = true;
          return;
        }
        this.instance = t[0];
        this.resetTracking();
        const gid = Jt.getGlobalID(this.instance).toString();
        const numberResult = Number(gid);
        if (Number.isFinite(numberResult)) {
          this.latestGlobalId =
            this.latestGlobalId === null
              ? numberResult
              : Math.max(this.latestGlobalId, numberResult);
        }
        this.gid = gid;
        if (this.seenGids.has(gid)) {
          this.ignore = true;
          this.repeatedDecode = true;
          return;
        }
        this.seenGids.add(gid);
        return;
      },
      onLeave() {
        if (this.ignore) {
          if (this.repeatedDecode) {
            const text2 = this.instance.toString();
            const hasResult = this.updateProgressByPointer.has(text2);
            const hasResult2 = this.pendingAngles.has(text2);
            if (hasResult) {
              const s32 = this.instance.add(504).readS32();
              if (this.updateProgressByPointer.get(text2) === s32 && !hasResult2) {
                return;
              }
              this.rememberProgress(text2, s32);
              this.observeLanding(new t25(this.instance), "decode");
              return;
            }
            if (hasResult2) {
              this.resolvePendingAngle(new t25(this.instance));
            }
          }
          return;
        }
        const i2 = new t25(this.instance);
        const text3 = this.instance.toString();
        this.pendingAngles.delete(text3);
        this.pendingMotionAngles.delete(text3);
        this.inferredAngles.delete(text3);
        this.startPositions.set(this.instance.toString(), {
          x: i2.x,
          y: i2.y,
        });
        if (i2.data.indirect) {
          const landingKeyResult = this.landingKey(i2);
          this.landingSamples.delete(landingKeyResult);
          this.landingEstimates.delete(landingKeyResult);
          this.observeLanding(i2, "decode");
        }
        if (i2.angle === null) {
          this.pendingAngles.set(this.instance.toString(), {
            x: i2.x,
            y: i2.y,
            progress: i2.progress,
          });
          return;
        }
        const data = i2.data;
        const projectileLogicData = data.projectileLogicData;
        if (
          !data.indirect &&
          Number(data.travelType) === 0 &&
          Number(data.boomerangType) === 0 &&
          !projectileLogicData.getBooleanValue("IsBeam") &&
          !projectileLogicData.getBooleanValue("IsBouncing") &&
          !projectileLogicData.getBooleanValue("IsHomingMissile") &&
          !projectileLogicData.getBooleanValue("IsFriendlyHomingMissile")
        ) {
          this.pendingMotionAngles.set(this.instance.toString(), {
            x: i2.x,
            y: i2.y,
          });
        }
        this.publishDecoded(i2);
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.Projectile_update, {
      onEnter(t) {
        this.logicProjectile = t[0].add(16).readPointer();
        return;
      },
      onLeave() {
        const logicProjectile = this.logicProjectile;
        if (logicProjectile.isNull()) {
          return;
        }
        const text2 = logicProjectile.toString();
        const hasResult = this.landingTrackingPointers.has(text2);
        const hasResult2 = this.pendingAngles.has(text2);
        const hasResult3 = this.pendingMotionAngles.has(text2);
        if (!hasResult && !hasResult2 && !hasResult3) {
          return;
        }
        if (hasResult) {
          const s32 = logicProjectile.add(504).readS32();
          if (this.updateProgressByPointer.get(text2) === s32 && !hasResult2 && !hasResult3) {
            return;
          }
          this.rememberProgress(text2, s32);
        }
        const o = new t25(logicProjectile);
        this.observeLanding(o);
        if (this.pendingAngles.get(text2)) {
          this.resolvePendingAngle(o);
          return;
        }
        const getResult = this.pendingMotionAngles.get(text2);
        if (!getResult) {
          return;
        }
        const record = {
          x: o.x,
          y: o.y,
        };
        const deltaX = record.x - getResult.x;
        const deltaY = record.y - getResult.y;
        if (deltaX === 0 && deltaY === 0) {
          return;
        }
        const remainder = ((180 * Math.atan2(deltaY, deltaX)) / Math.PI + 360) % 360;
        this.inferredAngles.set(text2, remainder);
        this.pendingMotionAngles.delete(text2);
        for (const t2 of this.firstMotionListeners) {
          t2(o, {
            angle: remainder,
            start: getResult,
            current: record,
          });
        }
        return;
      },
    });
    return;
  }
  get data() {
    return Gt.fromPtr(this.ptr.add(16).readPointer());
  }
  get skillData() {
    return this.data.parent;
  }
  get shooter() {
    return this.ptr.add(60).readS32();
  }
  get state() {
    return this.ptr.add(488).readS32();
  }
  get damage() {
    return Kt.getDamage(this.skillName);
  }
  get disregardsPowerLevel() {
    return Kt.disregardsPowerLevel(this.skillName);
  }
  getTotalDamage() {
    const damage = this.damage;
    if (damage <= 0) {
      return 0;
    }
    if (this.disregardsPowerLevel) {
      return damage;
    }
    const shooter = this.shooter;
    if (shooter < 0) {
      return damage;
    }
    const generation = de.generation;
    let getResult = t25.shooterLevelCache.get(shooter);
    if (!getResult || getResult.generation !== generation) {
      const characterPointerForPlayer = de.getCharacterPointerForPlayer(shooter);
      if (characterPointerForPlayer.isNull()) {
        return damage;
      }
      getResult = {
        generation: generation,
        value: new Se(characterPointerForPlayer).level,
      };
      t25.shooterLevelCache.set(shooter, getResult);
    }
    return damage * (1 + 0.10000000000000001 * (getResult.value - 1));
  }
  get gravity() {
    return this.data.gravity;
  }
  get effectiveGravity() {
    return this.data.effectiveGravity;
  }
  get lifetime() {
    return this.flightTimeMs;
  }
  get ignoresWalls() {
    return this.data.ptr.add(264).readU8() !== 0;
  }
  get skillName() {
    return this.skillData.name;
  }
  get team() {
    return this.ptr.add(64).readU32();
  }
  get angle() {
    if (this.data.isDoNotRotateClip) {
      const getResult = t25.startPositions.get(this.ptr.toString());
      if (getResult) {
        const deltaX = this.x - getResult.x;
        const deltaY = this.y - getResult.y;
        if (deltaX === 0 && deltaY === 0) {
          return null;
        }
        return ((180 * Math.atan2(deltaY, deltaX)) / Math.PI + 360) % 360;
      }
    }
    const getResult2 = t25.inferredAngles.get(this.ptr.toString());
    if (getResult2 !== undefined) {
      return getResult2;
    }
    const s32 = this.ptr.add(532).readS32();
    if (s32 > 0 && s32 < 360) {
      return s32;
    }
    return null;
  }
  get landingAngle() {
    const getResult = t25.inferredAngles.get(this.ptr.toString());
    if (getResult !== undefined) {
      return getResult;
    }
    if (this.data.isDoNotRotateClip) {
      return null;
    }
    return this.angle;
  }
  get progress() {
    return this.ptr.add(504).readS32();
  }
  get targetPosition() {
    if (!this.data.indirect || this.ptr.add(509).readU8() === 0) {
      return null;
    }
    const s32 = this.ptr.add(552).readS32();
    const s322 = this.ptr.add(556).readS32();
    if (s32 === 0 && s322 === 0) {
      return null;
    }
    return {
      x: s32,
      y: s322,
    };
  }
  get landing() {
    return this.landingDetails?.position ?? null;
  }
  get landingDetails() {
    if (this.data.indirect && t25.landingEstimates.get(t25.landingKey(this)) == null) {
      return null;
    }
    return;
  }
  get flightTimeMs() {
    if (!this.data.indirect) {
      return null;
    }
    const landingDetails = this.landingDetails;
    return landingDetails?.flightTimeMs ?? null;
  }
  get effectiveCastingRangeDetails() {
    const concatResult = "".concat(de.generation, ":", this.globalID);
    const nowResult = Date.now();
    const getResult = t25.effectiveCastingRangeCache.get(concatResult);
    if (getResult && (getResult.complete || nowResult - getResult.at < 100)) {
      return getResult.details;
    }
    const lResult = this.#l();
    if (t25.effectiveCastingRangeCache.size >= 256) {
      t25.effectiveCastingRangeCache.delete(t25.effectiveCastingRangeCache.keys().next().value);
    }
    t25.effectiveCastingRangeCache.set(concatResult, {
      at: nowResult,
      complete: Number.isFinite(Number(lResult?.total)),
      details: lResult,
    });
    return lResult;
  }
  #l() {
    const getResult = Kt.get(this.skillName);
    const shooter = this.shooter;
    const instance = de.instance?.instance;
    if (!getResult?.ptr || getResult.ptr.isNull()) {
      return {
        fallback: "skill-not-mapped",
      };
    }
    if (shooter < 0) {
      return {
        fallback: "shooter-unavailable",
      };
    }
    if (!instance || instance.isNull()) {
      return {
        fallback: "logic-battle-unavailable",
      };
    }
    de.setPlayers();
    const a = de.playerPointers[shooter];
    if (!a || a.isNull()) {
      return {
        fallback: "player-slot-".concat(shooter, "-unavailable"),
      };
    }
    const tick = de.tick;
    const getResult2 = t25.shooterCharacterCache.get(shooter);
    let o = Number.isFinite(tick) ? (getResult2?.tick === tick ? getResult2.pointer : null) : null;
    if (!o || o.isNull()) {
      o = de.getCharacterPointerForPlayer(shooter);
      if (!o.isNull() && Number.isFinite(tick)) {
        t25.shooterCharacterCache.set(shooter, {
          tick: tick,
          pointer: o,
        });
      }
    }
    if (o.isNull()) {
      return {
        fallback: "shooter-character-unavailable",
      };
    }
    const l = new Se(o);
    const u32 = instance.add(292).readU32();
    const logicBattleModeClient_hasEventModifierResult =
      globalThis.natives.LogicBattleModeClient_hasEventModifier(instance, 35);
    const logicGamePlayUtil_getRangeAddTilesResult =
      globalThis.natives.LogicGamePlayUtil_getRangeAddTiles(
        ptr(0),
        o,
        a,
        u32,
        getResult.ptr.add(516).readU32(),
        logicBattleModeClient_hasEventModifierResult ? 1 : 0,
        0,
      );
    const logicGamePlayUtil_getHoldRangeAddLogicResult =
      globalThis.natives.LogicGamePlayUtil_getHoldRangeAddLogic(ptr(0), o, a);
    const logicGamePlayUtil_getEffectiveWeaponRangeResult =
      globalThis.natives.LogicGamePlayUtil_getEffectiveWeaponRange(
        getResult.ptr,
        logicGamePlayUtil_getRangeAddTilesResult,
        o,
        instance,
      );
    return {
      rangeAddTiles: logicGamePlayUtil_getRangeAddTilesResult,
      holdRangeAddLogic: logicGamePlayUtil_getHoldRangeAddLogicResult,
      effectiveWeaponRange: logicGamePlayUtil_getEffectiveWeaponRangeResult,
      projectileStartRadius: l.projectileStartRadius,
      shooterPosition: {
        x: l.x,
        y: l.y,
      },
      total:
        logicGamePlayUtil_getEffectiveWeaponRangeResult +
        (logicGamePlayUtil_getHoldRangeAddLogicResult % 100),
    };
  }
  get effectiveCastingRange() {
    return this.effectiveCastingRangeDetails?.total ?? null;
  }
  get castingRange() {
    const effectiveCastingRangeDetails = this.effectiveCastingRangeDetails;
    if (effectiveCastingRangeDetails?.total !== undefined) {
      return effectiveCastingRangeDetails.total;
    }
    const skillName = this.skillName;
    const getResult = Kt.get(skillName);
    if (getResult) {
      return 100 * getResult.getIntegerValue("CastingRange");
    }
    return Kt.getAreaEffectRange(skillName) ?? 0;
  }
  get range() {
    const getResult = Kt.get(this.skillName);
    if (getResult) {
      return getResult.getIntegerValue("CastingRange");
    }
    return null;
  }
  get spread() {
    const getResult = Kt.get(this.skillName);
    if (getResult) {
      return getResult.getIntegerValue("Spread");
    }
    return 0;
  }
  get spawnPredictions() {
    const items = [];
    for (const e of [this.data.spawnAreaEffect, this.data.spawnAreaEffect2]) {
      if (!e.ptr.isNull() && !(e.count <= 0)) {
        const bulletData = e.bulletData;
        if (bulletData) {
          const { count: count, angleStep: angleStep } = e;
          const items2 = [];
          for (let index = 0; index < count; index++) {
            items2.push(e.spread === 0 ? index * angleStep : e.spread + index * angleStep);
          }
          items.push({
            areaEffect: e.name,
            projectilePositionAtDecode: {
              x: this.x,
              y: this.y,
            },
            child: bulletData.name,
            count: count,
            angles: items2,
            spawnOffset: e.spawnOffset,
            range: e.travelRange,
          });
        }
      }
    }
    return items;
  }
  toString() {
    const {
      data: { spawnAreaEffect: spawnAreaEffect, spawnAreaEffect2: spawnAreaEffect2 },
      effectiveCastingRangeDetails: effectiveCastingRangeDetails,
    } = this;
    const s = effectiveCastingRangeDetails?.total ?? this.castingRange;
    return "".concat(
      this.skillName,
      ": gid: ",
      this.globalID,
      ", team: ",
      this.team,
      ", shooter: ",
      this.shooter,
      ", ",
      this.angle,
      "º speed: ",
      this.data.speed,
      " (",
      this.x,
      ", ",
      this.y,
      ") radius: ",
      this.data.radius,
      "  Spread: ",
      this.spread,
      " effectiveRange: ",
      s,
      " ignoreEnvironment: ",
      this.ignoresWalls,
      " delta: ",
      this.progress,
      " lifetime: ",
      this.lifetime,
      " spawnAreaEffect: (",
      spawnAreaEffect.ptr.isNull() ? null : spawnAreaEffect.toString(),
      ") spawnAreaEffect2: (",
      spawnAreaEffect2.ptr.isNull() ? null : spawnAreaEffect2.toString(),
      ")",
    );
  }
}

var Me = t25;

var Ce = Me;

var Ne = class t26 {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  get type() {
    return t26.getMessageType(this.ptr);
  }
  static getMessageType(pointer) {
    if (!pointer || pointer.isNull()) {
      return 0;
    }
    const pointer2 = pointer.readPointer();
    if (pointer2.isNull()) {
      return 0;
    }
    const pointer3 = pointer2.add(5 * Process.pointerSize).readPointer();
    if (pointer3.isNull()) {
      return 0;
    }
    return new NativeFunction(pointer3, "int", [])();
  }
  destruct() {
    return t26.destruct(this.ptr);
  }
  static destruct(pointer) {
    return new NativeFunction(
      pointer
        .readPointer()
        .add(7 * Process.pointerSize)
        .readPointer(),
      "void",
      ["pointer"],
    )(pointer);
  }
  destructor() {
    return t26.destructor(this.ptr);
  }
  static destructor(pointer) {
    return new NativeFunction(
      pointer.readPointer().add(Process.pointerSize).readPointer(),
      "void",
      ["pointer"],
    )(pointer);
  }
  encode() {
    return t26.encode(this.ptr);
  }
  static encode(pointer) {
    return new NativeFunction(
      pointer
        .readPointer()
        .add(2 * Process.pointerSize)
        .readPointer(),
      "void",
      ["pointer"],
    )(pointer);
  }
  decode() {
    return t26.decode(this.ptr);
  }
  static decode(pointer) {
    return new NativeFunction(
      pointer
        .readPointer()
        .add(3 * Process.pointerSize)
        .readPointer(),
      "void",
      ["pointer"],
    )(pointer);
  }
  isServerToClientMessage() {
    return t26.isServerToClientMessage(this.ptr);
  }
  static isServerToClientMessage(e) {
    const messageType = t26.getMessageType(e);
    return (messageType >= 20000 && messageType < 30000) || messageType === 40000;
  }
  get messageVersion() {
    return t26.getMessageVersion(this.ptr);
  }
  static getMessageVersion(t) {
    return t.add(136).readS32();
  }
  set messageVersion(e) {
    t26.setMessageVersion(this.ptr, e);
    return;
  }
  static setMessageVersion(t, e) {
    t.add(136).writeS32(e);
    return;
  }
};

var xe = Ne;

class Ae {
  constructor() {
    this._screen = null;
    return;
  }
  get screen() {
    return this._screen || de.screenPointer;
  }
  set screen(_screen) {
    this._screen = _screen;
    return;
  }
  get deadzone() {
    const screen = this.screen;
    if (!screen || screen.isNull()) {
      return 0;
    }
    return screen.add(4040).readFloat();
  }
  set deadzone(t) {
    const screen = this.screen;
    if (screen && !screen.isNull()) {
      screen.add(4040).writeFloat(Number(t));
    }
    return;
  }
}

class t27 extends Ae {
  static xOffset;
  static yOffset;
  static baseXOffset;
  static baseYOffset;
  static movementModeOffset;
  static movementAngleOffset;
  static movementAngleScaleOffset;
  static movementActiveOffset;
  static movementStateOffset;
  static movementFlagsOffset;
  constructor() {
    var var1 = arguments;
    super(...var1);
    return this;
  }
  static {
    this.xOffset = 2624;
    this.yOffset = 2628;
    this.baseXOffset = 2632;
    this.baseYOffset = 2636;
    this.movementModeOffset = 2348;
    this.movementAngleOffset = 2420;
    this.movementAngleScaleOffset = 2424;
    this.movementActiveOffset = 3960;
    this.movementStateOffset = 3956;
    this.movementFlagsOffset = 3967;
  }
  get rawX() {
    return this.screen.add(t27.xOffset).readFloat();
  }
  set rawX(e) {
    this.screen.add(t27.xOffset).writeFloat(Number(e));
    return;
  }
  get rawY() {
    return this.screen.add(t27.yOffset).readFloat();
  }
  set rawY(e) {
    this.screen.add(t27.yOffset).writeFloat(Number(e));
    return;
  }
  get centerX() {
    return this.screen.add(t27.baseXOffset).readFloat();
  }
  get centerY() {
    return this.screen.add(t27.baseYOffset).readFloat();
  }
  get x() {
    return this.rawX - this.centerX;
  }
  set x(t) {
    this.rawX = this.centerX + Number(t);
    return;
  }
  get y() {
    return this.rawY - this.centerY;
  }
  set y(t) {
    this.rawY = this.centerY + Number(t);
    return;
  }
  get xy() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  get movementMode() {
    return this.screen.add(t27.movementModeOffset).readU32();
  }
  get movementAngle() {
    return this.screen.add(t27.movementAngleOffset).readFloat();
  }
  get movementAngleScale() {
    return this.screen.add(t27.movementAngleScaleOffset).readFloat();
  }
  set xy(t) {
    this.rawX = this.centerX + Number(t.x);
    this.rawY = this.centerY + Number(t.y);
    return;
  }
  get held() {
    return this.movementFlags !== 0 && Math.hypot(this.x, this.y) > this.deadzone;
  }
  get movementState() {
    return this.screen.add(t27.movementStateOffset).readFloat();
  }
  get movementFlags() {
    return this.screen.add(t27.movementFlagsOffset).readU16();
  }
  get state() {
    return {
      held: this.held,
      movement: this.movementState,
      flags: this.movementFlags,
    };
  }
  invalidateMovement() {
    this.screen.add(t27.movementStateOffset).writeFloat(0);
    return;
  }
  hold() {
    this.screen.add(t27.movementActiveOffset).writeU8(1);
    this.invalidateMovement();
    return this.state;
  }
  release() {
    this.screen.add(t27.movementActiveOffset).writeU8(0);
    this.xy = {
      x: 0,
      y: 0,
    };
    this.invalidateMovement();
    return this.state;
  }
  clearState() {
    this.screen.add(t27.movementStateOffset).writeFloat(0);
    this.screen.add(t27.movementFlagsOffset).writeU16(0);
    return;
  }
}

var ke = t27;
