/**
 * features/aim.js
 *
 * Aimbot: projectile capsule predictor, aim-assist and aim visibility controllers.
 *
 * Symbols: Ee, Oe, ze, Xe, Fs, AimAssistController, AimVisibilityController, t53, qs
 * Source: bundle lines 11620-25018 (9 statements)
 */


class Ee {
  constructor(math, config) {
    this.math = math;
    this.config = config;
    this.controllerPostDeltaExtension = 1100;
    this.controllerVolleyWaitMs = 50;
    this.capsules = new Map();
    this.controllerVolleys = [];
    this.predictedSubprojectileParents = new Map();
    return;
  }
  reset() {
    this.capsules.clear();
    this.predictedSubprojectileParents.clear();
    for (const t of this.controllerVolleys) {
      clearTimeout(t.timeout);
    }
    this.controllerVolleys.length = 0;
    return;
  }
  add(t, e) {
    let n;
    let r;
    let o;
    let l;
    let c;
    let h;
    let d;
    let u;
    let g;
    let p;
    let y;
    let angle;
    let endX;
    let endY;
    let projectileRadius;
    let remainingRange;
    let speed;
    let trace;
    let trajectoryRange;
    let x;
    const nowResult = Date.now();
    if (this.#d(t, nowResult)) {
      return true;
    }
    const stringResult = String(t.globalID);
    const uResult = this.#u(t);
    if (!uResult) {
      this.#g(stringResult);
      this.predictedSubprojectileParents.delete(stringResult);
      return false;
    }
    ({
      speed: n,
      projectileRadius: r,
      x: o,
      y: l,
      angle: c,
      endX: h,
      endY: d,
      remainingRange: u,
      trajectoryRange: g,
      trace: p,
    } = uResult);
    const combinedValue = Number(this.config.safetyMargin) + Number(e);
    if (![n, r, o, l, c, combinedValue].every(Number.isFinite)) {
      return false;
    }
    const f = uResult.flightTimeMs ?? (u / n) * 1000;
    const b = uResult.groundContact === true;
    y = Math.max(0, Number(t.data.triggerWithDelayMs) || 0);
    const pResult = this.#p(t, h, d, nowResult, f, y);
    if (b) {
      const combinedValue2 = nowResult + f + y;
      pResult.push({
        x: h,
        y: d,
        radius: r,
        startsAt: combinedValue2,
        expiresAt: combinedValue2 + 50,
      });
    }
    const record = {
      gid: stringResult,
      skillName: t.skillName,
      team: Number(t.team),
      shooter: Number(t.shooter),
      progress: Number(t.progress),
      rangeSource: uResult.rangeSource,
      ignoresWalls: Boolean(t.ignoresWalls),
      sourceProjectile: t,
      controllerPath:
        Number(t.data.travelType) === 6
          ? {
              ready: false,
            }
          : null,
      playerRadius: e,
      x: o,
      y: l,
      endX: h,
      endY: d,
      angle: c,
      range: u,
      trajectoryRange: g,
      controllerAimRange: uResult.controllerAimRange,
      groundContact: b,
      pathLength: b ? 0 : u,
      travelledDistance: 0,
      segments: b
        ? []
        : [
            {
              x: o,
              y: l,
              endX: h,
              endY: d,
              angle: c,
              length: u,
              startDistance: 0,
            },
          ],
      speed: n,
      projectileRadius: r,
      margin: combinedValue,
      areas: pResult,
      trace: p,
      decodedAt: nowResult,
      updatedAt: nowResult,
      expiresAt: nowResult + f,
      pointer: b ? null : this.math.capsuleFromValues(o, l, c, u, r, combinedValue, n),
    };
    record.pathPointers = record.pointer ? [record.pointer] : [];
    this.capsules.set(stringResult, record);
    this.#m(t, record, nowResult, f, y);
    if (Number(t.data.travelType) === 6) {
      this.#f(record, nowResult);
    }
    return true;
  }
  #g(t) {
    for (let [e, i] of this.capsules) {
      if (i.predictedSubprojectile?.parentGid === t) {
        this.capsules.delete(e);
      }
    }
    return;
  }
  #d(t, e) {
    const skillName = t.skillName;
    const numberResult = Number(t.team);
    const numberResult2 = Number(t.shooter);
    const numberResult3 = Number(t.x);
    const numberResult4 = Number(t.y);
    const numberResult5 = Number(t.angle);
    const maxResult = Math.max(0, Math.min(1000, Number(t.progress) || 0));
    if (![numberResult, numberResult3, numberResult4, maxResult].every(Number.isFinite)) {
      return false;
    }
    let c = null;
    let quotient = 1 / 0;
    let d = null;
    let quotient2 = 1 / 0;
    for (const t2 of this.capsules.values()) {
      const predictedSubprojectile = t2.predictedSubprojectile;
      if (
        predictedSubprojectile &&
        !predictedSubprojectile.consumed &&
        predictedSubprojectile.skillName === skillName &&
        predictedSubprojectile.team === numberResult &&
        (!Number.isFinite(numberResult2) ||
          !Number.isFinite(predictedSubprojectile.shooter) ||
          numberResult2 === predictedSubprojectile.shooter) &&
        !(e < predictedSubprojectile.startsAt - 500) &&
        !(e > predictedSubprojectile.expiresAt) &&
        (!Number.isFinite(numberResult5) ||
          !(Math.abs(((numberResult5 - predictedSubprojectile.angle + 540) % 360) - 180) > 4))
      ) {
        const absResult = Math.abs(e - predictedSubprojectile.startsAt);
        if (absResult < quotient) {
          quotient = absResult;
          c = predictedSubprojectile;
        }
        const combinedValue =
          predictedSubprojectile.startX +
          (predictedSubprojectile.directionX * predictedSubprojectile.pathLength * maxResult) /
            1000;
        const combinedValue2 =
          predictedSubprojectile.startY +
          (predictedSubprojectile.directionY * predictedSubprojectile.pathLength * maxResult) /
            1000;
        const hypotResult = Math.hypot(
          numberResult3 - combinedValue,
          numberResult4 - combinedValue2,
        );
        if (!(hypotResult > 60)) {
          const combinedValue3 = absResult + hypotResult;
          if (combinedValue3 < quotient2) {
            quotient2 = combinedValue3;
            d = predictedSubprojectile;
          }
        }
      }
    }
    if (d) {
      d.consumed = true;
      return true;
    }
    if (c) {
      this.#g(c.parentGid);
      this.predictedSubprojectileParents.delete(c.parentGid);
    }
    return false;
  }
  #m(t, e, i, s, a) {
    const { endX: endX2, endY: endY2 } = e;
    const combinedValue = i + s + a;
    const numberResult = Number(t.shooter);
    const numberResult2 = Number(t.team);
    const stringResult = String(t.globalID);
    const getResult = this.predictedSubprojectileParents.get(stringResult);
    if (
      !getResult ||
      !(Math.hypot(getResult.x - endX2, getResult.y - endY2) < 20) ||
      !(Math.abs(getResult.impactAt - combinedValue) < 150)
    ) {
      this.#g(stringResult);
      this.predictedSubprojectileParents.set(stringResult, {
        x: endX2,
        y: endY2,
        impactAt: combinedValue,
      });
      for (let index = 0; index < 2; index++) {
        const a2 = index === 0 ? t.data.spawnAreaEffect : t.data.spawnAreaEffect2;
        if (!a2.ptr.isNull() && !(a2.count <= 0)) {
          const bulletData = a2.bulletData;
          if (bulletData && !bulletData.ptr.isNull()) {
            const u = new Gt(bulletData.ptr);
            const name = bulletData.name;
            const numberResult3 = Number(u.speed);
            const numberResult4 = Number(u.radius);
            const numberResult5 = Number(a2.totalRange);
            const numberResult6 = Number(a2.projectileStartOffset);
            if (
              name &&
              [numberResult3, numberResult4, numberResult5].every(Number.isFinite) &&
              Number.isFinite(numberResult6) &&
              !(numberResult3 <= 0) &&
              !(numberResult5 <= numberResult6)
            ) {
              const numberResult7 = Number(a2.count);
              const numberResult8 = Number(a2.spread);
              const numberResult9 = Number(a2.angleStep);
              if (
                [numberResult7, numberResult8, numberResult9].every(Number.isFinite) &&
                !(numberResult7 <= 0)
              ) {
                for (let index2 = 0; index2 < numberResult7; index2++) {
                  const d3 =
                    numberResult8 === 0
                      ? index2 * numberResult9
                      : numberResult8 + index2 * numberResult9;
                  const quotient = (d3 * Math.PI) / 180;
                  const cosResult = Math.cos(quotient);
                  const sinResult = Math.sin(quotient);
                  const combinedValue2 = endX2 + cosResult * numberResult6;
                  const combinedValue3 = endY2 + sinResult * numberResult6;
                  const combinedValue4 = endX2 + cosResult * numberResult5;
                  const combinedValue5 = endY2 + sinResult * numberResult5;
                  const record = {
                    data: u,
                    skillName: name,
                    radius: numberResult4,
                    ignoresWalls: false,
                  };
                  const traceProjectileEnvironmentResult = de.tileMap?.traceProjectileEnvironment(
                    record,
                    combinedValue2,
                    combinedValue3,
                    combinedValue4,
                    combinedValue5,
                  );
                  const P = traceProjectileEnvironmentResult?.endX ?? combinedValue4;
                  const _ = traceProjectileEnvironmentResult?.endY ?? combinedValue5;
                  const hypotResult = Math.hypot(P - combinedValue2, _ - combinedValue3);
                  if (!(hypotResult <= 0.01)) {
                    const combinedValue6 = stringResult + ":sub:" + index + ":" + index2;
                    const capsuleFromValuesResult = this.math.capsuleFromValues(
                      combinedValue2,
                      combinedValue3,
                      d3,
                      hypotResult,
                      numberResult4,
                      e.margin,
                      numberResult3,
                    );
                    const quotient2 = Math.max(0, combinedValue - i) / 1000;
                    capsuleFromValuesResult.add(24).writeFloat(quotient2);
                    capsuleFromValuesResult
                      .add(28)
                      .writeFloat(quotient2 + hypotResult / numberResult3);
                    const record3 = {
                      parentGid: stringResult,
                      skillName: name,
                      team: numberResult2,
                      shooter: numberResult,
                      startsAt: combinedValue,
                      expiresAt: combinedValue + (hypotResult / numberResult3) * 1000,
                      startX: combinedValue2,
                      startY: combinedValue3,
                      angle: d3,
                      directionX: cosResult,
                      directionY: sinResult,
                      pathLength: hypotResult,
                      consumed: false,
                    };
                    this.capsules.set(combinedValue6, {
                      gid: combinedValue6,
                      skillName: name,
                      team: numberResult2,
                      shooter: numberResult,
                      sourceProjectile: t,
                      predictedSubprojectile: record3,
                      playerRadius: e.playerRadius,
                      x: combinedValue2,
                      y: combinedValue3,
                      endX: P,
                      endY: _,
                      angle: d3,
                      range: hypotResult,
                      trajectoryRange: hypotResult,
                      groundContact: false,
                      pathLength: hypotResult,
                      travelledDistance: 0,
                      segments: [
                        {
                          x: combinedValue2,
                          y: combinedValue3,
                          endX: P,
                          endY: _,
                          angle: d3,
                          length: hypotResult,
                          startDistance: 0,
                        },
                      ],
                      speed: numberResult3,
                      projectileRadius: numberResult4,
                      margin: e.margin,
                      areas: [],
                      trace: traceProjectileEnvironmentResult,
                      decodedAt: i,
                      updatedAt: i,
                      startsAt: combinedValue,
                      expiresAt: record3.expiresAt,
                      pointer: capsuleFromValuesResult,
                      pathPointers: [capsuleFromValuesResult],
                    });
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
  #f(t, e) {
    const sourceProjectile = t.sourceProjectile;
    const s = sourceProjectile.shooter >= 0 ? String(sourceProjectile.shooter) : null;
    const numberResult = Number(sourceProjectile.team);
    const absResult = Math.abs(Number(sourceProjectile.spread));
    if (!Number.isFinite(absResult) || absResult <= 0) {
      t.controllerPath.ready = true;
      return;
    }
    this.controllerVolleys = this.controllerVolleys.filter(
      (t) => !t.finalized && e - t.createdAt <= this.controllerVolleyWaitMs && t.shots.length < 3,
    );
    const record = {
      capsule: t,
      x: t.x,
      y: t.y,
      angle: t.angle,
      spread: absResult,
      progress: Math.max(0, Math.min(1000, Number(sourceProjectile.progress))),
      remainingToAimpoint: this.#b(
        Math.max(0, Math.min(1000, Number(sourceProjectile.progress))),
        t.controllerAimRange,
      ),
    };
    const findResult = [...this.controllerVolleys]
      .reverse()
      .find(
        (n) =>
          n.team === numberResult &&
          n.skillName === sourceProjectile.skillName &&
          (!n.shooterKey || !s || n.shooterKey === s) &&
          e - n.createdAt <= this.controllerVolleyWaitMs &&
          n.shots[0].progress === record.progress &&
          Math.hypot(n.originX - t.x, n.originY - t.y) <= 250,
      );
    if (findResult) {
      findResult.shots.push(record);
    } else {
      const record3 = {
        team: numberResult,
        shooterKey: s,
        skillName: sourceProjectile.skillName,
        createdAt: e,
        originX: t.x,
        originY: t.y,
        shots: [record],
        finalized: false,
        timeout: null,
      };
      record3.timeout = setTimeout(() => this.#y(record3), this.controllerVolleyWaitMs);
      this.controllerVolleys.push(record3);
    }
    const l = findResult ?? this.controllerVolleys[this.controllerVolleys.length - 1];
    if (l.shots.length >= 3) {
      this.#y(l);
    }
    return;
  }
  #y(t) {
    if (!t.finalized) {
      t.finalized = true;
      clearTimeout(t.timeout);
      this.#v(t);
      this.controllerVolleys = this.controllerVolleys.filter((e) => e !== t);
    }
    return;
  }
  #v(t) {
    const sortResult = [...t.shots].sort((t, e) => Number(t.capsule.gid) - Number(e.capsule.gid));
    const length = sortResult.length;
    const s = sortResult[Math.floor(length / 2)];
    const quotient = sortResult[0].spread / 2;
    const angle2 = s.angle;
    const quotient2 = (angle2 * Math.PI) / 180;
    const o = s.progress >= 1000 ? 0 : s.remainingToAimpoint;
    const combinedValue = s.x + Math.cos(quotient2) * o;
    const combinedValue2 = s.y + Math.sin(quotient2) * o;
    for (let index = 0; index < length; index++) {
      const s2 = sortResult[index];
      const { capsule: capsule, progress: progress } = s2;
      const d = length === 3 ? index - 1 : 0;
      const product = quotient * d;
      const x3 = progress >= 1000 ? combinedValue : s2.x;
      const y3 = progress >= 1000 ? combinedValue2 : s2.y;
      const hypotResult = Math.hypot(combinedValue - x3, combinedValue2 - y3);
      const f = hypotResult > 0 ? (combinedValue - x3) / hypotResult : Math.cos(quotient2);
      const b = hypotResult > 0 ? (combinedValue2 - y3) / hypotResult : Math.sin(quotient2);
      const quotient3 = (product * Math.PI) / 180;
      const cosResult = Math.cos(quotient3);
      const sinResult = Math.sin(quotient3);
      const difference = f * cosResult - b * sinResult;
      const combinedValue3 = f * sinResult + b * cosResult;
      const items = [];
      let C = null;
      let N = progress >= 1000 ? s2.angle : angle2;
      var3: {
        var2: {
          if (progress < 1000) {
            switch (d) {
              case 0:
                break var2;
              default:
                if (Math.abs(cosResult) > 0.001) {
                  const quotient4 = (0.5 * hypotResult) / cosResult;
                  const combinedValue4 = x3 + difference * quotient4;
                  const combinedValue5 = y3 + combinedValue3 * quotient4;
                  const hypotResult2 = Math.hypot(combinedValue4 - x3, combinedValue5 - y3);
                  const hypotResult3 = Math.hypot(
                    combinedValue - combinedValue4,
                    combinedValue2 - combinedValue5,
                  );
                  N =
                    ((180 *
                      Math.atan2(combinedValue2 - combinedValue5, combinedValue - combinedValue4)) /
                      Math.PI +
                      360) %
                    360;
                  C = {
                    x: combinedValue4,
                    y: combinedValue5,
                  };
                  items.push(
                    {
                      x: x3,
                      y: y3,
                      endX: combinedValue4,
                      endY: combinedValue5,
                      angle: ((180 * Math.atan2(combinedValue3, difference)) / Math.PI + 360) % 360,
                      length: hypotResult2,
                      startDistance: 0,
                    },
                    {
                      x: combinedValue4,
                      y: combinedValue5,
                      endX: combinedValue,
                      endY: combinedValue2,
                      angle: N,
                      length: hypotResult3,
                      startDistance: hypotResult2,
                    },
                  );
                } else {
                  break var2;
                }
                break;
            }
            break var3;
          }
        }
        if (progress < 1000) {
          items.push({
            x: x3,
            y: y3,
            endX: combinedValue,
            endY: combinedValue2,
            angle: angle2,
            length: hypotResult,
            startDistance: 0,
          });
        }
      }
      const quotient5 = (N * Math.PI) / 180;
      const reduceResult = items.reduce((t, e) => t + e.length, 0);
      items.push({
        x: combinedValue,
        y: combinedValue2,
        endX: combinedValue + Math.cos(quotient5) * this.controllerPostDeltaExtension,
        endY: combinedValue2 + Math.sin(quotient5) * this.controllerPostDeltaExtension,
        angle: N,
        length: this.controllerPostDeltaExtension,
        startDistance: reduceResult,
      });
      capsule.x = x3;
      capsule.y = y3;
      capsule.segments = this.#w(capsule.sourceProjectile, items);
      capsule.pathLength = capsule.segments.reduce((t, e) => t + e.length, 0);
      capsule.range = capsule.pathLength;
      capsule.angle = capsule.segments[0]?.angle ?? N;
      capsule.endX =
        (capsule.segments.at(-1) == null ? undefined : capsule.segments.at(-1).endX) ??
        combinedValue;
      capsule.endY =
        (capsule.segments.at(-1) == null ? undefined : capsule.segments.at(-1).endY) ??
        combinedValue2;
      capsule.trace = capsule.segments.trace ?? capsule.trace;
      capsule.controllerPath = {
        ready: true,
        bends: C ? [C] : [],
        expectedBendDeltas: C ? [progress + 0.5 * (1000 - progress)] : [],
        initialAngle: capsule.segments[0]?.angle ?? N,
        middleAngle: angle2,
        outgoingAngle: N,
      };
      const k = Date.now();
      capsule.travelledDistance = Math.min(
        capsule.pathLength,
        (capsule.speed * Math.max(0, k - capsule.decodedAt)) / 1000,
      );
      const sResult = this.#S(capsule, capsule.travelledDistance);
      capsule.x = sResult.x;
      capsule.y = sResult.y;
      capsule.updatedAt = k;
      this.#T(capsule);
      capsule.expiresAt = capsule.updatedAt + (capsule.range / capsule.speed) * 1000;
      for (const t4 of capsule.areas) {
        t4.x = capsule.endX;
        t4.y = capsule.endY;
        t4.expiresAt = capsule.expiresAt;
        t4.startsAt = k;
      }
    }
    return;
  }
  #b(t, e) {
    return (e * (1000 - t)) / 1000;
  }
  #w(t, e) {
    let startDistance;
    const items = [];
    let trace2 = null;
    for (const a of e) {
      const traceProjectileEnvironmentResult = de.tileMap?.traceProjectileEnvironment(
        t,
        a.x,
        a.y,
        a.endX,
        a.endY,
      );
      trace2 = traceProjectileEnvironmentResult ?? trace2;
      const n = traceProjectileEnvironmentResult?.endX ?? a.endX;
      const r = traceProjectileEnvironmentResult?.endY ?? a.endY;
      const hypotResult = Math.hypot(n - a.x, r - a.y);
      if (hypotResult > 0.01) {
        items.push({
          ...a,
          endX: n,
          endY: r,
          length: hypotResult,
          angle: ((180 * Math.atan2(r - a.y, n - a.x)) / Math.PI + 360) % 360,
        });
      }
      if (
        traceProjectileEnvironmentResult &&
        traceProjectileEnvironmentResult.stopReason !== "range"
      ) {
        items.trace = trace2;
        startDistance = 0;
        for (const t2 of items) {
          t2.startDistance = startDistance;
          startDistance += t2.length;
        }
        return items;
      }
    }
    items.trace = trace2;
    startDistance = 0;
    for (const t2 of items) {
      t2.startDistance = startDistance;
      startDistance += t2.length;
    }
    return items;
  }
  #S(t, e) {
    for (const i of t.segments) {
      if (e <= i.startDistance + i.length) {
        const maxResult = Math.max(0, e - i.startDistance);
        const s = i.length > 0 ? maxResult / i.length : 0;
        return {
          x: i.x + (i.endX - i.x) * s,
          y: i.y + (i.endY - i.y) * s,
        };
      }
    }
    return {
      x: t.endX,
      y: t.endY,
    };
  }
  #T(t) {
    const pathPointers = t.pathPointers ?? [];
    let length = 0;
    const range = Math.max(0, t.pathLength - t.travelledDistance);
    for (const s2 of t.segments) {
      if (!(s2.startDistance + s2.length - t.travelledDistance <= 0.01)) {
        const sResult = this.#S(t, Math.max(t.travelledDistance, s2.startDistance));
        const maxResult = Math.max(t.travelledDistance, s2.startDistance);
        const combinedValue = s2.startDistance + s2.length;
        const sResult2 = this.#S(t, combinedValue);
        const hypotResult = Math.hypot(sResult2.x - sResult.x, sResult2.y - sResult.y);
        if (!(hypotResult <= 0.01)) {
          const capsuleFromValuesResult = this.math.capsuleFromValues(
            sResult.x,
            sResult.y,
            ((180 * Math.atan2(sResult2.y - sResult.y, sResult2.x - sResult.x)) / Math.PI + 360) %
              360,
            hypotResult,
            t.projectileRadius,
            t.margin,
            t.speed,
            pathPointers[length],
          );
          capsuleFromValuesResult
            .add(24)
            .writeFloat(Math.max(0, maxResult - t.travelledDistance) / t.speed);
          capsuleFromValuesResult
            .add(28)
            .writeFloat(Math.max(0, combinedValue - t.travelledDistance) / t.speed);
          pathPointers[length++] = capsuleFromValuesResult;
        }
      }
    }
    pathPointers.length = length;
    t.pathPointers = pathPointers;
    t.pointer = pathPointers[0] ?? null;
    t.range = range;
    return;
  }
  #u(t) {
    const data = t.data;
    const numberResult = Number(data.speed);
    const numberResult2 = Number(data.travelType);
    const numberResult3 = Number(data.radius);
    const numberResult4 = Number(t.x);
    const numberResult5 = Number(t.y);
    if (data.indirect) {
      const landing = t.landing;
      const s2 =
        landing &&
        de.tileMap?.clipProjectileToBorder(t, numberResult4, numberResult5, landing.x, landing.y);
      const o = s2?.clipped
        ? {
            x: s2.endX,
            y: s2.endY,
          }
        : landing;
      if (
        !o ||
        ![numberResult, numberResult3, numberResult4, numberResult5, o.x, o.y].every(
          Number.isFinite,
        )
      ) {
        return null;
      }
      const difference = o.x - numberResult4;
      const difference2 = o.y - numberResult5;
      const hypotResult = Math.hypot(difference, difference2);
      const flightTimeMs = t.flightTimeMs;
      if ((hypotResult <= 0.01 && flightTimeMs !== 0) || numberResult <= 0) {
        return null;
      }
      return {
        speed: numberResult,
        projectileRadius: numberResult3,
        x: numberResult4,
        y: numberResult5,
        angle: ((180 * Math.atan2(difference2, difference)) / Math.PI + 360) % 360,
        endX: o.x,
        endY: o.y,
        remainingRange: hypotResult,
        trajectoryRange: hypotResult,
        flightTimeMs: flightTimeMs,
        controllerAimRange: null,
        trace: s2?.clipped
          ? {
              endX: o.x,
              endY: o.y,
              stopReason: "border",
              collision: null,
            }
          : null,
        groundContact: true,
      };
    }
    const getResult = Kt.get(t.skillName);
    const product = 100 * Number(getResult?.castingRange);
    const c2 =
      [data.spawnAreaEffect, data.spawnAreaEffect2].some((t) => {
        const bulletData = t.bulletData;
        return t.count > 0 && bulletData && !bulletData.ptr.isNull();
      }) &&
      Number.isFinite(product) &&
      product > 0;
    const h2 = c2 ? null : t.effectiveCastingRangeDetails;
    const d2 = !c2 && h2?.total !== undefined;
    const u = c2 ? product : Number(h2?.total ?? t.castingRange);
    const maxResult = Math.max(0, Math.min(1000, Number(t.progress)));
    const numberResult6 = Number(t.angle);
    if (
      ![
        numberResult,
        u,
        numberResult3,
        maxResult,
        numberResult4,
        numberResult5,
        numberResult6,
      ].every(Number.isFinite)
    ) {
      return null;
    }
    const numberResult7 = Number(h2?.projectileStartRadius ?? 0);
    const f = d2
      ? Math.max(
          0,
          ...[data.spawnAreaEffect, data.spawnAreaEffect2]
            .map((t) => Number(t.radius))
            .filter(Number.isFinite),
        )
      : 0;
    const b = u > 0 ? (d2 || c2 ? (f > 0 ? u - f : u + numberResult7) : u + numberResult3) : 0;
    const maxResult2 = Math.max(0, u);
    let v = b > 0 ? (b * (1000 - maxResult)) / 1000 : 0;
    if (numberResult2 === 6 && maxResult >= 1000) {
      v = this.controllerPostDeltaExtension;
    }
    if (v <= 0 || numberResult <= 0) {
      return null;
    }
    const quotient = (numberResult6 * Math.PI) / 180;
    let combinedValue = numberResult4 + Math.cos(quotient) * v;
    let combinedValue2 = numberResult5 + Math.sin(quotient) * v;
    const traceProjectileEnvironmentResult = de.tileMap?.traceProjectileEnvironment(
      t,
      numberResult4,
      numberResult5,
      combinedValue,
      combinedValue2,
    );
    if (traceProjectileEnvironmentResult) {
      combinedValue = traceProjectileEnvironmentResult.endX;
      combinedValue2 = traceProjectileEnvironmentResult.endY;
      v = Math.hypot(combinedValue - numberResult4, combinedValue2 - numberResult5);
    }
    if (v <= 0.01) {
      return null;
    }
    return {
      speed: numberResult,
      projectileRadius: numberResult3,
      x: numberResult4,
      y: numberResult5,
      angle: numberResult6,
      endX: combinedValue,
      endY: combinedValue2,
      remainingRange: v,
      trajectoryRange: b,
      controllerAimRange: maxResult2,
      trace: traceProjectileEnvironmentResult,
      rangeSource: c2 ? "skill-csv-range" : "effective-weapon-range",
    };
  }
  refresh(t) {
    const stringResult = String(t);
    const getResult = this.capsules.get(stringResult);
    if (!getResult) {
      return false;
    }
    const addResult = this.add(getResult.sourceProjectile, getResult.playerRadius);
    if (!addResult) {
      this.capsules.delete(stringResult);
    }
    return addResult;
  }
  update(updatedAt = Date.now()) {
    for (const e of [...this.controllerVolleys]) {
      if (updatedAt - e.createdAt >= this.controllerVolleyWaitMs) {
        this.#y(e);
      }
    }
    for (let [e2, i] of this.capsules) {
      if (!i.controllerPath || i.controllerPath.ready) {
        if (i.predictedSubprojectile) {
          if (updatedAt >= i.expiresAt) {
            this.capsules.delete(e2);
          } else {
            const quotient = Math.max(0, updatedAt - i.startsAt) / 1000;
            i.travelledDistance = Math.min(i.pathLength, quotient * i.speed);
            const sResult = this.#S(i, i.travelledDistance);
            i.x = sResult.x;
            i.y = sResult.y;
            i.range = Math.max(0, i.pathLength - i.travelledDistance);
            if (i.range <= 0.01) {
              this.capsules.delete(e2);
            } else {
              const sResult2 = this.#S(i, i.pathLength);
              const remainder =
                ((180 * Math.atan2(sResult2.y - sResult.y, sResult2.x - sResult.x)) / Math.PI +
                  360) %
                360;
              const pointer = this.math.capsuleFromValues(
                sResult.x,
                sResult.y,
                remainder,
                i.range,
                i.projectileRadius,
                i.margin,
                i.speed,
                i.pointer,
              );
              const quotient2 = Math.max(0, i.startsAt - updatedAt) / 1000;
              pointer.add(24).writeFloat(quotient2);
              pointer.add(28).writeFloat(quotient2 + i.range / i.speed);
              i.pointer = pointer;
              i.pathPointers = [pointer];
              i.updatedAt = updatedAt;
            }
          }
        } else {
          const quotient3 = Math.max(0, updatedAt - i.updatedAt) / 1000;
          const a2 = i.speed > 0 ? quotient3 * i.speed : 0;
          if (a2 > 0) {
            i.travelledDistance = Math.min(i.pathLength, i.travelledDistance + a2);
          }
          if (i.travelledDistance > 0) {
            const sResult3 = this.#S(i, i.travelledDistance);
            i.x = sResult3.x;
            i.y = sResult3.y;
          }
          i.updatedAt = updatedAt;
          if (i.speed > 0) {
            this.#T(i);
          }
          i.expiresAt = updatedAt + (i.range / i.speed) * 1000;
          const someResult = i.areas.some((e) => e.expiresAt > updatedAt);
          if ((i.range <= 0 || i.speed <= 0 || i.expiresAt <= updatedAt) && !someResult) {
            this.capsules.delete(e2);
            continue;
          }
          if (i.range <= 0 || i.speed <= 0) {
            i.pathPointers = [];
            i.pointer = null;
          }
          i.areas = i.areas.filter((e) => e.expiresAt > updatedAt);
          const areaPointers = i.areaPointers ?? [];
          for (let index = 0; index < i.areas.length; index++) {
            const s3 = i.areas[index];
            areaPointers[index] = this.math.circleFromValues(
              s3.x,
              s3.y,
              s3.radius,
              i.margin,
              Math.max(0, s3.startsAt - updatedAt) / 1000,
              Math.max(0, s3.expiresAt - updatedAt) / 1000,
              areaPointers[index],
            );
          }
          areaPointers.length = i.areas.length;
          i.areaPointers = areaPointers;
        }
      }
    }
    return;
  }
  all() {
    this.update();
    return [...this.capsules.values()];
  }
  pointers() {
    return this.all().flatMap((t) => {
      if (t.controllerPath && !t.controllerPath.ready) {
        return [];
      }
      return [...(t.pathPointers ?? (t.pointer ? [t.pointer] : [])), ...(t.areaPointers ?? [])];
    });
  }
  #p(t, e, i, s, a, n) {
    const items = [];
    const combinedValue = s + a + n;
    for (const s2 of [t.data.spawnAreaEffect, t.data.spawnAreaEffect2]) {
      if (!s2.ptr.isNull()) {
        const numberResult = Number(s2.radius);
        if (Number.isFinite(numberResult) && !(numberResult <= 0)) {
          const numberResult2 = Number(s2.timeMs);
          items.push({
            x: e,
            y: i,
            radius: numberResult,
            startsAt: combinedValue,
            expiresAt:
              combinedValue + Math.max(50, Number.isFinite(numberResult2) ? numberResult2 : 50),
          });
        }
      }
    }
    return items;
  }
}

var Oe = Ee;

class ze extends Oe {
  constructor(t, e, continuousMath) {
    super(t, e);
    this.continuousMath = continuousMath;
    this.lastBuiltTick = null;
    this.pathRevision = 0;
    this.spawnTicks = new Map();
    this.ownerNames = new Map();
    this.ownerPowerLevels = new Map();
    this.ownerCacheGeneration = -1;
    return this;
  }
  reset() {
    super.reset.call(this);
    this.lastBuiltTick = null;
    ++this.pathRevision;
    this.spawnTicks.clear();
    this.ownerNames.clear();
    this.ownerPowerLevels.clear();
    this.ownerCacheGeneration = -1;
    return;
  }
  add(t, e, i = null) {
    const stringResult = String(t.globalID);
    const hasResult = this.capsules.has(stringResult);
    if (!hasResult) {
      this.spawnTicks.set(stringResult, this.#k());
    }
    if (!super.add.call(this, t, e)) {
      if (!hasResult) {
        this.spawnTicks.delete(stringResult);
      }
      return false;
    }
    const lastBuiltTick = this.#k();
    for (const e2 of this.capsules.values()) {
      if (
        e2.gid === String(t.globalID) ||
        e2.predictedSubprojectile?.parentGid === String(t.globalID)
      ) {
        this.#P(e2, t, lastBuiltTick, i);
      }
    }
    this.#_(lastBuiltTick);
    this.lastBuiltTick = lastBuiltTick;
    return true;
  }
  update(nowResult = Date.now()) {
    const lastBuiltTick = this.#k(nowResult);
    if (lastBuiltTick !== this.lastBuiltTick) {
      super.update.call(this, nowResult);
      for (const t2 of this.spawnTicks.keys()) {
        if (!this.capsules.has(t2)) {
          this.spawnTicks.delete(t2);
        }
      }
      for (const t3 of this.capsules.values()) {
        if (!t3.continuous) {
          this.#P(t3, t3.sourceProjectile, lastBuiltTick);
        }
      }
      this.#_(lastBuiltTick);
      this.lastBuiltTick = lastBuiltTick;
    }
    return;
  }
  updateAndGetCapsules(nowResult = Date.now()) {
    this.update(nowResult);
    return this.capsules;
  }
  #k(nowResult = Date.now()) {
    const numberResult = Number(de.tick);
    if (Number.isFinite(numberResult)) {
      return numberResult;
    }
    return Math.floor(nowResult / 50);
  }
  #I(t) {
    return t?.state ?? 0;
  }
  #B(t, e) {
    if (t.predictedSubprojectile) {
      return Gt.fromName(t.skillName);
    }
    return e?.data ?? null;
  }
  #P(t, e, i, s = null) {
    const bResult = this.#B(t, e);
    const n = t.predictedSubprojectile ? Kt.getDamage(t.skillName) : Number(e?.damage);
    const r = t.predictedSubprojectile
      ? this.capsules.get(t.predictedSubprojectile.parentGid) == null
        ? undefined
        : this.capsules.get(t.predictedSubprojectile.parentGid).continuous
      : null;
    const numberResult = Number(t.shooter);
    const l = r?.damageMultiplier ?? this.#F(numberResult);
    const product = (Number.isFinite(n) ? (n > 0 ? n : 1) : 1) * l;
    let h = false;
    let d = false;
    let u = false;
    d = !t.predictedSubprojectile && Boolean(bResult?.indirect);
    u = Boolean(bResult?.passesEnvironment);
    h = Boolean(bResult?.projectileLogicData?.getBooleanValue("DamageOnlyWithOneProj"));
    const numberResult2 = Number(t.startsAt ?? t.decodedAt);
    const p = Number.isFinite(numberResult2)
      ? Math.max(0, Math.ceil((numberResult2 - Date.now()) / 50))
      : 0;
    const m = t.predictedSubprojectile ? i + p : (this.spawnTicks.get(t.gid) ?? i);
    const continuous = t.continuous;
    let b = continuous?.ownerName ?? r?.ownerName ?? null;
    let y = continuous?.dodgeAllowed ?? r?.dodgeAllowed;
    let v = continuous?.allowedTick ?? r?.allowedTick;
    if (y === undefined) {
      b = this.#D(numberResult);
      const e2 = Array.isArray(this.config.allowedCharacters) ? this.config.allowedCharacters : [];
      const i2 = b !== null;
      const a2 = e2.length === 0 || (b !== null && e2.includes(b));
      const product2 = 300 * Math.max(0, Number(this.config.minDistance) || 0);
      const numberResult3 = Number(s?.x);
      const numberResult4 = Number(s?.y);
      const hypotResult = Math.hypot(numberResult3 - Number(t.x), numberResult4 - Number(t.y));
      const h2 = product2 === 0 || (Number.isFinite(hypotResult) && hypotResult > product2);
      const maxResult = Math.max(0, Math.min(100, Number(this.config.chance ?? 100)));
      y = i2 && a2 && h2 && 100 * Math.random() < maxResult;
      const maxResult2 = Math.max(0, Math.round(Number(this.config.reactionMin) / 50) || 0);
      const maxResult3 = Math.max(
        maxResult2,
        Math.round(Number(this.config.reactionMax) / 50) || 0,
      );
      v = m + maxResult2 + Math.floor(Math.random() * (maxResult3 - maxResult2 + 1));
    }
    t.continuous = {
      gid: t.gid,
      skillName: t.skillName,
      team: Number(t.team),
      shooter: numberResult,
      ownerName: b,
      startTick: m,
      allowedTick: v,
      state: t.predictedSubprojectile ? 0 : this.#I(e),
      radius: Number(t.projectileRadius) || 0,
      areaEffectRadius: Math.max(0, ...(t.areas ?? []).map((t) => Number(t.radius) || 0)),
      damage: product,
      damageMultiplier: l,
      damageOnlyWithOneProj: h,
      indirect: d,
      passesEnvironment: u,
      dodgeAllowed: y,
      groupKey: "".concat(numberResult, ":", m),
      ignoreExtraRadius: t.skillName === "MinigunDudeProjectile",
      tickOffset: 0,
      tickCount: 0,
      builtTick: null,
      controllerReady: true,
    };
    return;
  }
  #D(t) {
    if (!Number.isInteger(t) || t < 0) {
      return null;
    }
    this.#L();
    if (this.ownerNames.has(t)) {
      return this.ownerNames.get(t);
    }
    let e = null;
    de.setPlayers();
    const characterPointerForPlayer = de.getCharacterPointerForPlayer(t);
    if (!characterPointerForPlayer.isNull()) {
      e = new Se(characterPointerForPlayer).name || null;
    }
    this.ownerNames.set(t, e);
    return e;
  }
  #F(t) {
    if (!Number.isInteger(t) || t < 0) {
      return 1;
    }
    this.#L();
    if (this.ownerPowerLevels.has(t)) {
      return this.ownerPowerLevels.get(t);
    }
    const characterPointerForPlayer = de.getCharacterPointerForPlayer(t);
    const i = characterPointerForPlayer.isNull()
      ? 1
      : Number(new Se(characterPointerForPlayer).level);
    const combinedValue = 1 + 0.10000000000000001 * ((Number.isFinite(i) ? Math.max(1, i) : 1) - 1);
    this.ownerPowerLevels.set(t, combinedValue);
    return combinedValue;
  }
  #L() {
    if (this.ownerCacheGeneration !== de.generation) {
      this.ownerNames.clear();
      this.ownerPowerLevels.clear();
      this.ownerCacheGeneration = de.generation;
    }
    return;
  }
  #_(lastBuiltTick) {
    for (const t of this.capsules.values()) {
      const continuous = t.continuous;
      if (continuous) {
        continuous.state = t.predictedSubprojectile ? 0 : this.#I(t.sourceProjectile);
      }
    }
    this.continuousMath.buildTickPaths(this.capsules, lastBuiltTick);
    ++this.pathRevision;
    this.lastBuiltTick = lastBuiltTick;
    return;
  }
}

var Xe = ze;

class Fs {
  constructor(aimbot) {
    this.aimbot = aimbot;
    this.samples = new Map();
    this.sampleGeneration = -1;
    this.ownMovement = null;
    this.inputDelayMs = 100;
    this.#W();
    return;
  }
  #z() {
    const numberResult = Number(this.aimbot.battle.ping);
    return (
      ((Number.isFinite(numberResult) ? Math.max(0, numberResult) : 0) + this.inputDelayMs) / 1000
    );
  }
  #W() {
    Interceptor.attach(globalThis.offsets.BattleScreen_update, {
      onEnter() {
        if (!this.aimbot.state || !re.isState(re.states.BATTLE)) {
          return;
        }
        const {
          aimbot: { battle: battle2 },
        } = this;
        const me2 = battle2.me;
        if (!me2) {
          return;
        }
        this.observeOwnMovement(me2);
        const uniqueValues = new Set();
        for (const a of [me2.nextSkillClient, me2.ultiSkillClient]) {
          if (a && !a.isNull()) {
            const closestTargetForAutoshoot = battle2.getClosestTargetForAutoshoot(a);
            if (closestTargetForAutoshoot) {
              const text2 = closestTargetForAutoshoot.ptr.toString();
              if (!uniqueValues.has(text2)) {
                uniqueValues.add(text2);
                this.observe(closestTargetForAutoshoot);
              }
            }
          }
        }
        return;
      },
    });
    return;
  }
  observe(t) {
    const {
      aimbot: {
        battle: {
          constructor: { generation: generation },
        },
      },
    } = this;
    if (generation !== this.sampleGeneration) {
      this.samples.clear();
      this.sampleGeneration = generation;
    }
    const text2 = t.ptr.toString();
    const nowResult = Date.now();
    const { x: x3, y: y3 } = t;
    const getResult = this.samples.get(text2);
    let o = 0;
    let l = 0;
    let c = false;
    let x4 = x3;
    let y4 = y3;
    let nowResult2 = nowResult;
    let nowResult3 = nowResult;
    if (getResult) {
      const quotient = (nowResult - getResult.sampleTime) / 1000;
      const difference = x3 - getResult.x;
      const difference2 = y3 - getResult.y;
      quotient > 0
        ? quotient <= 0.5
          ? Math.hypot(difference, difference2) >= 1
            ? ((o = difference / quotient),
              (l = difference2 / quotient),
              (c = true),
              (nowResult3 = nowResult))
            : nowResult - getResult.lastMovedAt <= 250 &&
              ((x4 = getResult.x),
              (y4 = getResult.y),
              (nowResult2 = getResult.sampleTime),
              (nowResult3 = getResult.lastMovedAt),
              (o = getResult.vx),
              (l = getResult.vy),
              (c = getResult.moving))
          : nowResult - getResult.lastMovedAt <= 250 &&
            ((x4 = getResult.x),
            (y4 = getResult.y),
            (nowResult2 = getResult.sampleTime),
            (nowResult3 = getResult.lastMovedAt),
            (o = getResult.vx),
            (l = getResult.vy),
            (c = getResult.moving))
        : nowResult - getResult.lastMovedAt <= 250 &&
          ((x4 = getResult.x),
          (y4 = getResult.y),
          (nowResult2 = getResult.sampleTime),
          (nowResult3 = getResult.lastMovedAt),
          (o = getResult.vx),
          (l = getResult.vy),
          (c = getResult.moving));
    }
    this.samples.set(text2, {
      x: x4,
      y: y4,
      sampleTime: nowResult2,
      lastMovedAt: nowResult3,
      vx: o,
      vy: l,
      moving: c,
    });
    if (this.samples.size > 64) {
      const value = this.samples.keys().next().value;
      this.samples.delete(value);
    }
    return;
  }
  observeOwnMovement(t) {
    const {
      aimbot: {
        battle: {
          constructor: { generation: generation },
        },
      },
    } = this;
    if (generation !== this.sampleGeneration) {
      this.samples.clear();
      this.sampleGeneration = generation;
      this.ownMovement = null;
    }
    const nowResult = Date.now();
    const numberResult = Number(t.x);
    const numberResult2 = Number(t.y);
    if (![numberResult, numberResult2].every(Number.isFinite)) {
      return;
    }
    const ownMovement = this.ownMovement;
    let r = 0;
    let o = 0;
    let nowResult2 = nowResult;
    if (ownMovement) {
      const quotient = (nowResult - ownMovement.sampleTime) / 1000;
      const difference = numberResult - ownMovement.x;
      const difference2 = numberResult2 - ownMovement.y;
      if (quotient > 0) {
        if (quotient <= 0.5 && Math.hypot(difference, difference2) >= 1) {
          r = difference / quotient;
          o = difference2 / quotient;
          nowResult2 = nowResult;
          const product = 1.5 * Math.max(0, Number(t.speed) || 0);
          const hypotResult = Math.hypot(r, o);
          if (product > 0 && hypotResult > product) {
            const quotient2 = product / hypotResult;
            r *= quotient2;
            o *= quotient2;
          }
        }
      } else if (nowResult - ownMovement.lastMovedAt <= 150) {
        r = ownMovement.vx;
        o = ownMovement.vy;
        nowResult2 = ownMovement.lastMovedAt;
      }
    }
    this.ownMovement = {
      x: numberResult,
      y: numberResult2,
      sampleTime: nowResult,
      lastMovedAt: nowResult2,
      vx: r,
      vy: o,
    };
    return;
  }
  getOwnPositionAfterDelay(t, e) {
    const numberResult = Number(t.x);
    const numberResult2 = Number(t.y);
    const ownMovement = this.ownMovement;
    if (
      ![numberResult, numberResult2, e].every(Number.isFinite) ||
      !ownMovement ||
      Date.now() - ownMovement.lastMovedAt > 150
    ) {
      return {
        x: numberResult,
        y: numberResult2,
      };
    }
    const maxResult = Math.max(0, e);
    let product = ownMovement.vx * maxResult;
    let product2 = ownMovement.vy * maxResult;
    const product3 = Math.max(0, Number(t.speed) || 0) * maxResult * 1.5;
    const hypotResult = Math.hypot(product, product2);
    if (hypotResult > product3 && hypotResult > 0) {
      const quotient = product3 / hypotResult;
      product *= quotient;
      product2 *= quotient;
    }
    return {
      x: numberResult + product,
      y: numberResult2 + product2,
    };
  }
  isAutoshootUndodgeable(t, e) {
    if (!t || !e) {
      return false;
    }
    const {
      aimbot: {
        battle: { me: me2 },
      },
    } = this;
    if (!me2) {
      return false;
    }
    const s = new Ht(new ne(t).data).projectiles[0];
    if (!s) {
      return false;
    }
    const numberResult = Number(s.speed);
    if (!Number.isFinite(numberResult) || numberResult <= 0) {
      return false;
    }
    const zResult = this.#z();
    const ownPositionAfterDelay = this.getOwnPositionAfterDelay(me2, zResult);
    const getResult = this.samples.get(e.ptr.toString());
    const l = getResult?.moving ? getResult.vx : 0;
    const c = getResult?.moving ? getResult.vy : 0;
    const combinedValue = e.x + l * zResult;
    const combinedValue2 = e.y + c * zResult;
    const hypotResult = Math.hypot(
      combinedValue - ownPositionAfterDelay.x,
      combinedValue2 - ownPositionAfterDelay.y,
    );
    const quotient =
      Math.max(0, hypotResult - (Number(me2.projectileStartRadius) || 0)) / numberResult;
    return (
      Math.max(0, Number(e.speed) || 0) * (zResult + quotient) <=
      Math.max(0, Number(e.radius) || 0) + Math.max(0, Number(s.radius) || 0)
    );
  }
  predict(t, closestTargetForAutoshoot = this.aimbot.battle.getClosestTargetForAutoshoot(t)) {
    let o;
    let l;
    let c;
    let h;
    let u;
    let g;
    let y;
    let x;
    let angle;
    let radius;
    if (!closestTargetForAutoshoot) {
      return null;
    }
    const {
      aimbot: {
        battle: { me: me2 },
      },
    } = this;
    if (!me2) {
      return null;
    }
    this.observe(closestTargetForAutoshoot);
    const s = new Ht(new ne(t).data).projectiles[0];
    if (!s) {
      return null;
    }
    const speed2 = s.speed;
    const n = s.radius ?? 0;
    if (speed2 <= 0) {
      return null;
    }
    const zResult = this.#z();
    ({ x: o, y: l, angle: c, radius: h } = closestTargetForAutoshoot);
    const ownPositionAfterDelay = this.getOwnPositionAfterDelay(me2, zResult);
    ({ x: u, y: g } = ownPositionAfterDelay);
    if (
      this.aimbot.config.aimWhenNeeded &&
      this.isAutoshootUndodgeable(t, closestTargetForAutoshoot)
    ) {
      return {
        x: o,
        y: l,
        time: 0,
        delay: 0,
        strength: this.aimbot.config.strength,
        characterAtImpact: {
          x: o,
          y: l,
        },
        velocity: {
          x: 0,
          y: 0,
        },
        offset: 0,
        source: "current-target-undodgeable",
      };
    }
    const getResult = this.samples.get(closestTargetForAutoshoot.ptr.toString());
    const quotient = (c * Math.PI) / 180;
    const cosResult = Math.cos(quotient);
    const sinResult = Math.sin(quotient);
    y = 0;
    let v = 0;
    const w = this.aimbot.config.speedDetection || "hybrid";
    const speed3 = closestTargetForAutoshoot.speed;
    const T = getResult?.moving === true;
    const M = getResult?.vx ?? 0;
    const C = getResult?.vy ?? 0;
    if (w === "data") {
      y = cosResult * speed3;
      v = sinResult * speed3;
    } else if (w === "interval") {
      y = T ? M : 0;
      v = T ? C : 0;
    } else if (T) {
      const hypotResult = Math.hypot(M, C);
      y = (M / hypotResult) * speed3;
      v = (C / hypotResult) * speed3;
    }
    const product = (h + n) * (Math.max(-100, Math.min(100, this.aimbot.config.strength)) / 100);
    x = o + cosResult * product + y * zResult - u;
    const difference = l + sinResult * product + v * zResult - g;
    const difference2 = y * y + v * v - speed2 * speed2;
    const product2 = 2 * (x * y + difference * v);
    const combinedValue = x * x + difference * difference;
    let I;
    if (Math.abs(difference2) < 9.9999999999999995e-7) {
      if (Math.abs(product2) < 9.9999999999999995e-7) {
        return null;
      }
      I = -combinedValue / product2;
      if (I < 0) {
        return null;
      }
    } else {
      const difference3 = product2 * product2 - 4 * difference2 * combinedValue;
      if (difference3 < 0) {
        return null;
      }
      const sqrtResult = Math.sqrt(difference3);
      const quotient2 = (-product2 - sqrtResult) / (2 * difference2);
      const quotient3 = (-product2 + sqrtResult) / (2 * difference2);
      I = 1 / 0;
      if (quotient2 >= 0) {
        I = quotient2;
      }
      if (quotient3 >= 0 && quotient3 < I) {
        I = quotient3;
      }
      if (!Number.isFinite(I)) {
        return null;
      }
    }
    const combinedValue2 = zResult + I;
    const combinedValue3 = o + y * combinedValue2;
    const combinedValue4 = l + v * combinedValue2;
    return {
      x: combinedValue3 + cosResult * product,
      y: combinedValue4 + sinResult * product,
      time: I,
      delay: zResult,
      strength: this.aimbot.config.strength,
      characterAtImpact: {
        x: combinedValue3,
        y: combinedValue4,
      },
      shooterAtLaunch: ownPositionAfterDelay,
      velocity: {
        x: y,
        y: v,
      },
      offset: product,
    };
  }
}

class AimAssistController {
  constructor() {
    this.state = false;
    this.config = {
      strength: 0,
      speedDetection: "hybrid",
      aimWhenNeeded: true,
      allowWhenAiming: false,
    };
    this.battle = new de();
    this.prediction = new Fs(this);
    this.#G();
    return;
  }
  toggle() {
    this.state = !this.state;
    return;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.BattleScreen_activateSkill, {
      onEnter(e) {
        if (!this.state) {
          return;
        }
        if (!(1 & e[5].toInt32()) && !this.config.allowWhenAiming) {
          return;
        }
        if (new ne(e[4]).data.isNull()) {
          return;
        }
        const predictResult = this.prediction.predict(e[4]);
        if (!predictResult) {
          return;
        }
        const s = 0 | Math.trunc(predictResult.x);
        const a = 0 | Math.trunc(predictResult.y);
        e[5] = ptr(0);
        e[1] = ptr(s);
        e[2] = ptr(a);
        return;
      },
    });
    return;
  }
}

class AimVisibilityController {
  constructor() {
    this.state = false;
    this.skillContexts = new Map();
    this.lastScreen = null;
    this.pendingAccessoryInput = null;
    this.accessoryGhostActive = false;
    this.accessoryWasActive = false;
    this.hooksInstalled = false;
    this.originalAddInput = null;
    this.addInputReplacement = null;
    this.inputTypes = Object.freeze({
      ultiEnable: 5,
      trajectoryAim: 7,
      gadget: 8,
      attack: 0,
      aim: 16,
      gadgetAim: 19,
      gadgetAimDisable: 20,
    });
    this.inputTypeOffset = 8;
    this.aimSelectorOffset = 56;
    this.config = {
      basic: false,
      ulti: true,
      gadget: true,
      hideActiveGadget: false,
    };
    this.#G();
    return;
  }
  toggle() {
    return this.setEnabled(!this.state);
  }
  setEnabled(t) {
    this.state = Boolean(t);
    if (!this.state) {
      this.#jt();
    }
    return this.state;
  }
  setHideActiveGadget(t) {
    this.config.hideActiveGadget = Boolean(t);
    if (!this.config.hideActiveGadget) {
      this.#jt();
    }
    return this.config.hideActiveGadget;
  }
  update() {
    if (this.state && this.config.hideActiveGadget) {
      this.#Gt(this.pendingAccessoryInput !== null);
      return;
    }
    this.#jt();
    return;
  }
  #G() {
    if (this.hooksInstalled) {
      return;
    }
    Interceptor.attach(globalThis.offsets.BattleScreen_updateSkill, {
      onEnter(e) {
        const i = e[0];
        const lastScreen = i.isNull() ? null : i.toString();
        if (this.lastScreen !== lastScreen) {
          this.#jt();
          this.lastScreen = lastScreen;
        }
        const skillContextThreadId = Process.getCurrentThreadId();
        this.skillContextThreadId = skillContextThreadId;
        this.hadPreviousSkillContext = this.skillContexts.has(skillContextThreadId);
        this.previousSkillContext = this.skillContexts.get(skillContextThreadId);
        if (this.state && !i.isNull()) {
          this.skillContexts.set(skillContextThreadId, this.#Vt(i));
          return;
        }
        this.skillContexts.delete(skillContextThreadId);
        return;
      },
      onLeave() {
        if (this.hadPreviousSkillContext) {
          this.skillContexts.set(this.skillContextThreadId, this.previousSkillContext);
          return;
        }
        this.skillContexts.delete(this.skillContextThreadId);
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.LogicBattleModeClient_update, {
      onLeave() {
        if (this.state && this.config.hideActiveGadget) {
          this.#Ht();
        }
        return;
      },
    });
    this.addInputReplacement = new NativeCallback((e, i) => this.#Yt(e, i), "void", [
      "pointer",
      "pointer",
    ]);
    const replaceFastResult = Interceptor.replaceFast(
      globalThis.offsets.ClientInputManager_addInput,
      this.addInputReplacement,
    );
    this.originalAddInput = new NativeFunction(replaceFastResult, "void", ["pointer", "pointer"]);
    this.hooksInstalled = true;
    return;
  }
  #Yt(t, e) {
    let a;
    if (t.isNull() || e.isNull()) {
      return this.originalAddInput(t, e);
    }
    const s32 = e.add(this.inputTypeOffset).readS32();
    xray.processInput(e);
    const wtResult = this.#Wt(s32);
    if (this.state && this.config.hideActiveGadget) {
      if (s32 === this.inputTypes.gadget) {
        const me2 = new de().me;
        const accessory = me2?.accessory;
        if (me2 && !me2.hasCarryable && accessory && !accessory.isNull && accessory.isSupported) {
          this.#zt(e, accessory.active);
          return;
        }
      }
      if (s32 === this.inputTypes.attack && this.pendingAccessoryInput) {
        const pendingAccessoryInput = this.pendingAccessoryInput;
        this.pendingAccessoryInput = null;
        this.originalAddInput(t, pendingAccessoryInput);
        const originalAddInputResult = this.originalAddInput(t, e);
        this.#Gt(false);
        this.accessoryWasActive = false;
        return originalAddInputResult;
      }
    }
    if (this.state && this.config.ulti && s32 === this.inputTypes.ultiEnable) {
      globalThis.pointers.free(e);
      return;
    }
    switch (s32) {
      case this.inputTypes.aim:
      case this.inputTypes.trajectoryAim:
        a = s32 === this.inputTypes.trajectoryAim;
        if (
          this.state &&
          a &&
          (s32 !== this.inputTypes.trajectoryAim || wtResult) &&
          (s32 === this.inputTypes.gadgetAim ? this.config.gadget : this.#Xt(e, wtResult))
        ) {
          globalThis.pointers.free(e);
          return;
        }
        return this.originalAddInput(t, e);
    }
    a = s32 === this.inputTypes.gadgetAim;
    if (
      this.state &&
      a &&
      (s32 !== this.inputTypes.trajectoryAim || wtResult) &&
      (s32 === this.inputTypes.gadgetAim ? this.config.gadget : this.#Xt(e, wtResult))
    ) {
      globalThis.pointers.free(e);
      return;
    }
    return this.originalAddInput(t, e);
  }
  #Wt(t) {
    const getResult = this.skillContexts.get(Process.getCurrentThreadId());
    if (
      !getResult &&
      [
        this.inputTypes.aim,
        this.inputTypes.trajectoryAim,
        this.inputTypes.gadget,
        this.inputTypes.gadgetAim,
      ].includes(t)
    ) {
      return this.#$t();
    }
    return;
  }
  #Xt(t, e) {
    let i = e;
    i ||= this.#$t();
    if (i && (i.basic || i.ulti || i.gadget)) {
      return !i.ulti && ((i.basic && this.config.basic) || (i.gadget && this.config.gadget));
    }
    const s32 = t.add(this.aimSelectorOffset).readS32();
    if (s32 === 0) {
      return this.config.basic;
    }
    if (s32 !== 1 && s32 === 3) {
      return this.config.gadget;
    }
    return;
  }
  #$t() {
    const screenPointer = de.screenPointer;
    if (screenPointer && !screenPointer.isNull()) {
      return this.#Vt(screenPointer);
    }
    return null;
  }
  #Vt(t) {
    return {
      basic: globalThis.natives.BattleScreen_isShootStickActive(t) !== 0,
      ulti: globalThis.natives.BattleScreen_isUltiStickActive(t) !== 0,
      gadget: globalThis.natives.BattleScreen_isBonusSkillStickActive(t) !== 0,
    };
  }
  #zt(pendingAccessoryInput, e) {
    this.pendingAccessoryInput
      ? globalThis.pointers.free(this.pendingAccessoryInput)
      : (this.accessoryWasActive = Boolean(e));
    this.pendingAccessoryInput = pendingAccessoryInput;
    this.#Gt(true);
    return;
  }
  #Gt(t) {
    const me2 = new de().me;
    const accessory = me2?.accessory;
    if (accessory && !accessory.isNull && accessory.isSupported) {
      if (t) {
        if (this.accessoryGhostActive) {
          return;
        }
        accessory.active = true;
        this.accessoryGhostActive = true;
        return;
      }
      if (this.accessoryGhostActive) {
        accessory.active = this.accessoryWasActive;
        this.accessoryGhostActive = false;
      }
      return;
    }
    if (!t) {
      this.accessoryGhostActive = false;
    }
    return;
  }
  #Ht() {
    if (!this.pendingAccessoryInput || !this.accessoryGhostActive) {
      return;
    }
    const accessory = new de().me?.accessory;
    if (accessory && !accessory.isNull && accessory.isSupported) {
      accessory.active ||= true;
    }
    return;
  }
  #jt() {
    if (this.pendingAccessoryInput) {
      globalThis.pointers.free(this.pendingAccessoryInput);
      this.pendingAccessoryInput = null;
    }
    this.#Gt(false);
    this.accessoryWasActive = false;
    return;
  }
}

class t53 {
  static baseUrl;
  constructor() {
    this.ApiKey =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYzYWNhMmIwLWU5MTctNDAzZi1iNmJmLTE0MWM5NDJhMGJiMyIsImlhdCI6MTc4ODE4Nzc2MSwic3ViIjoiZGV2ZWxvcGVyLzYwYjE5YWZjLWYwMjQtY2FmYi04OWMyLTFjZjIyODBiOWIzYSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.oXaTfFbONWeky739ZmX8s2hKnkcjSFN7R6k_BrAoK7XqpX1paL7Ndoth77aNdCN7JGo3yUr1j9ylTICfVbBnmw";
    this.client = new HttpClient();
    return;
  }
  static {
    this.baseUrl = "https://bsproxy.royaleapi.dev/v1";
  }
  getPlayerData(e) {
    const replaceResult = String(e).replace(/^#/, "");
    const concatResult = "".concat(t53.baseUrl, "/players/%23", encodeURIComponent(replaceResult));
    const responseBytes = this.client.GET(concatResult, [
      "Authorization: Bearer ".concat(this.ApiKey),
      "Accept: application/json",
    ]);
    return JSON.parse(responseBytes.toString("utf8"));
  }
}

var qs = t53;
