/**
 * game/tilemap.js
 *
 * Tile map access: tiles, passability, line of sight, ricochet/bounce tracing.
 *
 * Symbols: Zt, te, ee, t14, ie, se
 * Source: bundle lines 6489-7330 (6 statements)
 */


var Zt = class t13 {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  static blocksMovement(t) {
    return globalThis.natives.LogicTileData_blocksMovement(t);
  }
  static blocksProjectiles(t) {
    return globalThis.natives.LogicTileData_blocksProjectiles(t);
  }
  static isDestructibleWithPiercing(t) {
    return globalThis.natives.LogicTileData_isDestructibleWithPiercing(t);
  }
  static isDestructibleAny(t) {
    return globalThis.natives.LogicTileData_isDestructibleAny(t);
  }
  static isDamageable(t) {
    return globalThis.natives.LogicTileData_isDamageable(t);
  }
  static getCollisionMargin(t) {
    return globalThis.natives.LogicTileData_getCollisionMargin(t);
  }
  get blocksMovement() {
    return Boolean(t13.blocksMovement(this.ptr));
  }
  get blocksProjectiles() {
    return Boolean(t13.blocksProjectiles(this.ptr));
  }
  get isDestructibleWithPiercing() {
    return Boolean(t13.isDestructibleWithPiercing(this.ptr));
  }
  get isDestructibleAny() {
    return Boolean(t13.isDestructibleAny(this.ptr));
  }
  get isDamageable() {
    return Boolean(t13.isDamageable(this.ptr));
  }
  get collisionMargin() {
    return t13.getCollisionMargin(this.ptr);
  }
};

var te = Zt;

class ee {
  constructor(ptr2, x3, y3) {
    this.ptr = ptr2;
    this.x = x3;
    this.y = y3;
    this.blocksMovement = false;
    this.specialMoveBlocked = false;
    this.blocksProjectiles = false;
    this.isDestructibleWithPiercing = false;
    this.isDestructibleAny = false;
    this.isDamageable = false;
    this.destroyableWithAny = false;
    this.collisionMargin = 0;
    this.water = false;
    this.wall = false;
    this.update();
    return;
  }
  update() {
    const pointer = this.ptr.readPointer();
    if (pointer.isNull()) {
      this.blocksMovement = false;
      this.specialMoveBlocked = this.ptr.add(120).readU8() !== 0;
      this.blocksProjectiles = false;
      this.isDestructibleWithPiercing = false;
      this.isDestructibleAny = false;
      this.isDamageable = false;
      this.destroyableWithAny = false;
      this.collisionMargin = 0;
      this.water = false;
      this.wall = false;
      return;
    }
    const e = new te(pointer);
    this.blocksMovement = e.blocksMovement;
    this.specialMoveBlocked = this.ptr.add(120).readU8() !== 0;
    this.blocksProjectiles = e.blocksProjectiles;
    this.isDestructibleWithPiercing = e.isDestructibleWithPiercing;
    this.isDestructibleAny = e.isDestructibleAny;
    this.isDamageable = e.isDamageable;
    this.destroyableWithAny = e.isDestructibleAny;
    this.collisionMargin = e.collisionMargin;
    this.water = globalThis.natives.LogicTileData_isWater(this.ptr) !== 0;
    this.wall = this.blocksProjectiles;
    return;
  }
  get health() {
    return this.ptr.add(104).readS32();
  }
  get destructionFlag() {
    return this.ptr.add(120).readU8() !== 0;
  }
  getAscii() {
    if (this.water) {
      return "~";
    }
    if (this.blocksProjectiles) {
      return "#";
    }
    if (this.blocksMovement) {
      return "X";
    }
    return ".";
  }
}

class t14 {
  static centerScale;
  constructor(ptr2) {
    this.ptr = ptr2;
    this.tiles = [];
    this.width = 0;
    this.height = 0;
    this._movementGrid = null;
    this._resolveSize();
    this._load();
    return;
  }
  static {
    this.centerScale = 150;
  }
  _resolveSize() {
    for (let width = 0; width < 256; width++) {
      if (globalThis.natives.LogicTileMap_getTile(this.ptr, width, 0).isNull()) {
        this.width = width;
        break;
      }
    }
    for (let height = 0; height < 256; height++) {
      if (globalThis.natives.LogicTileMap_getTile(this.ptr, 0, height).isNull()) {
        this.height = height;
        return;
      }
    }
    return;
  }
  _load() {
    this.tiles = Array.from(
      {
        length: this.height,
      },
      () => Array(this.width),
    );
    for (let index = 0; index < this.height; index++) {
      for (let index2 = 0; index2 < this.width; index2++) {
        const logicTileMap_getTileResult = globalThis.natives.LogicTileMap_getTile(
          this.ptr,
          index2,
          index,
        );
        if (!logicTileMap_getTileResult.isNull()) {
          this.tiles[index][index2] = new ee(logicTileMap_getTileResult, index2, index);
        }
      }
    }
    return;
  }
  getTile(t, e) {
    if (!(t < 0) && !(e < 0) && !(t >= this.width) && !(e >= this.height)) {
      return this.tiles[e][t];
    }
    return;
  }
  getTileFromLogic(t, e) {
    return this.getTile(Math.floor(t / 300), Math.floor(e / 300));
  }
  get center() {
    return [this.width * t14.centerScale, this.height * t14.centerScale];
  }
  findTileByPtr(t) {
    for (let index = 0; index < this.height; index++) {
      for (let index2 = 0; index2 < this.width; index2++) {
        const s = this.tiles[index][index2];
        if (s !== undefined && s.ptr.equals(t)) {
          return s;
        }
      }
    }
    return;
  }
  updateTile(t) {
    const tileByPtr = this.findTileByPtr(t);
    if (tileByPtr !== undefined) {
      tileByPtr.update();
      if (this._movementGrid) {
        this._movementGrid
          .add(tileByPtr.y * this.width + tileByPtr.x)
          .writeU8(tileByPtr.blocksMovement || tileByPtr.specialMoveBlocked ? 0 : 1);
      }
      return tileByPtr;
    }
    return;
  }
  get movementGrid() {
    if (!this._movementGrid) {
      this._movementGrid = Memory.alloc(this.width * this.height);
      for (let index = 0; index < this.height; index++) {
        for (let index2 = 0; index2 < this.width; index2++) {
          const tile = this.getTile(index2, index);
          this._movementGrid
            .add(index * this.width + index2)
            .writeU8(!tile || tile.blocksMovement || tile.specialMoveBlocked ? 0 : 1);
        }
      }
    }
    return this._movementGrid;
  }
  isMovementBlocked(t, e) {
    const tile = this.getTile(t, e);
    return tile === undefined || tile.blocksMovement || tile.specialMoveBlocked;
  }
  isProjectileBlocked(t, e) {
    const tile = this.getTile(t, e);
    return tile === undefined || tile.blocksProjectiles;
  }
  #e(t, e) {
    const logicTileMap_getTileResult = globalThis.natives.LogicTileMap_getTile(this.ptr, t, e);
    if (logicTileMap_getTileResult.isNull()) {
      return null;
    }
    const tile = this.getTile(t, e);
    if (tile?.ptr.equals(logicTileMap_getTileResult)) {
      return tile;
    }
    return new ee(logicTileMap_getTileResult, t, e);
  }
  #i(t) {
    return Math.trunc(globalThis.natives.LogicTileMap_logicToPathFinderTile(t) / 3);
  }
  #s(t) {
    return Math.trunc(globalThis.natives.LogicTileMap_logicToPathFinderTile(t));
  }
  predictSelfPushbackLanding(t, e, i, s) {
    if (!t || !e || !i) {
      return null;
    }
    const numberResult = Number(t.x);
    const numberResult2 = Number(t.y);
    const numberResult3 = Number(e.x);
    const numberResult4 = Number(e.y);
    const absResult = Math.abs(Number(i.pushbackStrengthSelf));
    const hypotResult = Math.hypot(numberResult - numberResult3, numberResult2 - numberResult4);
    if (
      ![numberResult, numberResult2, numberResult3, numberResult4, absResult, hypotResult].every(
        Number.isFinite,
      ) ||
      absResult <= 0 ||
      hypotResult === 0
    ) {
      return null;
    }
    const h = (Number(s?.radius) || 0) >= 150 ? Math.trunc(absResult / 2) : absResult;
    const product = 6 * h;
    if (product <= 0) {
      return null;
    }
    const truncResult = Math.trunc(numberResult - numberResult3);
    const truncResult2 = Math.trunc(numberResult2 - numberResult4);
    const floorResult = Math.floor(Math.hypot(truncResult, truncResult2));
    if (floorResult <= 0) {
      return null;
    }
    const record = {
      x: numberResult + Math.trunc((truncResult * product) / floorResult),
      y: numberResult2 + Math.trunc((truncResult2 * product) / floorResult),
    };
    const f =
      this.resolvePushbackTarget(
        {
          x: numberResult,
          y: numberResult2,
        },
        record,
        s,
      ) ?? record;
    const difference = Number(f.x) - numberResult;
    const difference2 = Number(f.y) - numberResult2;
    const truncResult3 = Math.trunc(Math.hypot(difference, difference2));
    const w = (s?.hasUniqueProperty(23) && Number(s.uniquePropertyValue1)) || 0;
    const product2 = 6 * h;
    const truncResult4 = Math.trunc((product2 * (w + 100)) / 100);
    return {
      ...f,
      intendedPathLength: Math.hypot(record.x - numberResult, record.y - numberResult2),
      pathLength: Math.trunc(Number(f.pathLength ?? truncResult3)),
      landingMovementTicks:
        truncResult4 > 0 ? Math.max(1, Math.trunc((20 * truncResult3) / truncResult4)) : 0,
      effectiveStrength: h,
      basePushbackSpeed: product2,
      pushbackSpeed: truncResult4,
      uniquePropertyValue1: w,
      snappedToPassableCell: f.snappedToPassableCell ?? false,
      clampedToMapBorder: f.clampedToMapBorder ?? false,
    };
  }
  resolvePushbackTarget(t, e, i) {
    if (!t || !e || this.width <= 0 || this.height <= 0) {
      return null;
    }
    const truncResult = Math.trunc(Number(t.x));
    const truncResult2 = Math.trunc(Number(t.y));
    const truncResult3 = Math.trunc(Number(e.x));
    const truncResult4 = Math.trunc(Number(e.y));
    if (![truncResult, truncResult2, truncResult3, truncResult4].every(Number.isFinite)) {
      return null;
    }
    const memoryBuffer = Memory.alloc(8);
    const l =
      globalThis.natives.LogicGamePlayUtil_getClosestLevelBorderCollision(
        truncResult,
        truncResult2,
        truncResult3,
        truncResult4,
        this.ptr,
        1,
        memoryBuffer,
      ) !== 0;
    const c = l ? memoryBuffer.readS32() : truncResult3;
    const h = l ? memoryBuffer.add(4).readS32() : truncResult4;
    const d = i?.canWalkOnWater?.() ? 1 : 0;
    const maxResult = Math.max(1, Number(i?.pushbackPathFinderSize) || 1);
    const sResult = this.#s(c);
    const sResult2 = this.#s(h);
    const sResult3 = this.#s(truncResult);
    const sResult4 = this.#s(truncResult2);
    const b = (t, e) =>
      globalThis.natives.LogicTileMap_isPassablePathFinder(this.ptr, maxResult, t, e, d, 0) !== 0;
    if (b(sResult, sResult2)) {
      return {
        x: c,
        y: h,
        pathLength: Math.hypot(c - truncResult, h - truncResult2),
        snappedToPassableCell: false,
        clampedToMapBorder: l,
        hitWorldCollision: l,
        collisionType: l ? 1 : 0,
      };
    }
    const combinedValue = Math.floor(Math.hypot(sResult - sResult3, sResult2 - sResult4)) + 2;
    const difference = this.ptr.add(212).readS32() - 1;
    const difference2 = this.ptr.add(216).readS32() - 1;
    let S = null;
    let pOSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    for (
      let index = Math.max(0, sResult - combinedValue);
      index <= Math.min(difference, sResult + combinedValue);
      index++
    ) {
      for (
        let index2 = Math.max(0, sResult2 - combinedValue);
        index2 <= Math.min(difference2, sResult2 + combinedValue);
        index2++
      ) {
        if (b(index, index2)) {
          const combinedValue2 = (index - sResult) ** 2 + (index2 - sResult2) ** 2;
          if (combinedValue2 < pOSITIVE_INFINITY) {
            pOSITIVE_INFINITY = combinedValue2;
            S = {
              tileX: index,
              tileY: index2,
            };
          }
        }
      }
    }
    const M = S
      ? {
          x: 100 * S.tileX + 50,
          y: 100 * S.tileY + 50,
        }
      : {
          x: 100 * sResult3 + 50,
          y: 100 * sResult4 + 50,
        };
    return {
      ...M,
      pathLength: Math.hypot(M.x - truncResult, M.y - truncResult2),
      snappedToPassableCell: true,
      clampedToMapBorder: l,
      hitWorldCollision: true,
      collisionType: l ? 1 : 2,
    };
  }
  clipProjectileToBorder(t, e, i, s, a) {
    if (t?.data?.ignoreLevelBorder) {
      return {
        endX: s,
        endY: a,
        clipped: false,
      };
    }
    const difference = 300 * this.width - 2;
    const difference2 = 300 * this.height - 2;
    let o = 1;
    s < 1
      ? s !== e
        ? (o = Math.min(o, (1 - e) / (s - e)))
        : s > difference && s !== e && (o = Math.min(o, (difference - e) / (s - e)))
      : s > difference && s !== e && (o = Math.min(o, (difference - e) / (s - e)));
    a < 1
      ? a !== i
        ? (o = Math.min(o, (1 - i) / (a - i)))
        : a > difference2 && a !== i && (o = Math.min(o, (difference2 - i) / (a - i)))
      : a > difference2 && a !== i && (o = Math.min(o, (difference2 - i) / (a - i)));
    if (o >= 1) {
      return {
        endX: s,
        endY: a,
        clipped: false,
      };
    }
    return {
      endX: Math.round(e + (s - e) * o),
      endY: Math.round(i + (a - i) * o),
      clipped: true,
    };
  }
  traceRicochetPath(t, e, i, s = 3) {
    if (
      !t ||
      !e ||
      this.width <= 0 ||
      this.height <= 0 ||
      ![t.x, t.y, e.x, e.y, i].every(Number.isFinite) ||
      i <= 0
    ) {
      return [];
    }
    const hypotResult = Math.hypot(e.x, e.y);
    if (hypotResult < 1) {
      return [];
    }
    let { x: x3, y: y3 } = t;
    let quotient = e.x / hypotResult;
    let quotient2 = e.y / hypotResult;
    let c = i;
    let h = 0;
    const items = [];
    let record = {
      x: x3,
      y: y3,
    };
    const record3 = {
      radius: 0,
      data: {},
    };
    const record4 = {
      destroyed: new Set(),
      passedThrough: new Set(),
      health: new Map(),
    };
    while (c > 1) {
      const combinedValue = x3 + quotient * c;
      const combinedValue2 = y3 + quotient2 * c;
      const clipProjectileToBorderResult = this.clipProjectileToBorder(
        record3,
        x3,
        y3,
        combinedValue,
        combinedValue2,
      );
      const hypotResult2 = Math.hypot(
        clipProjectileToBorderResult.endX - x3,
        clipProjectileToBorderResult.endY - y3,
      );
      const aResult = this.#a(
        record3,
        x3,
        y3,
        clipProjectileToBorderResult.endX,
        clipProjectileToBorderResult.endY,
        record4,
      );
      const b = aResult ? Math.hypot(aResult.x - x3, aResult.y - y3) : 1 / 0;
      if (aResult) {
        if (b <= hypotResult2) {
          const concatResult = "".concat(aResult.tileX, ":", aResult.tileY);
          if (b <= 1 && h > 0) {
            record4.passedThrough.add(concatResult);
            x3 += 1 * quotient;
            y3 += 1 * quotient2;
            c -= 1;
            continue;
          }
          if (b > 1) {
            items.push([
              {
                x: record.x,
                y: record.y,
                z: t.z ?? 0,
              },
              {
                x: aResult.x,
                y: aResult.y,
                z: t.z ?? 0,
              },
            ]);
          }
          c -= b;
          if (h >= s) {
            break;
          }
          record4.passedThrough.clear();
          const nResult = this.#n(aResult.tile, record4);
          const sortResult = [
            {
              axis: "x",
              distance: Math.abs(aResult.x - nResult.left),
            },
            {
              axis: "x",
              distance: Math.abs(aResult.x - nResult.right),
            },
            {
              axis: "y",
              distance: Math.abs(aResult.y - nResult.top),
            },
            {
              axis: "y",
              distance: Math.abs(aResult.y - nResult.bottom),
            },
          ].sort((t, e) => t.distance - e.distance);
          const g2 = sortResult[0];
          (sortResult[1].distance - g2.distance <= 2
            ? Math.abs(quotient) >= Math.abs(quotient2)
              ? "x"
              : "y"
            : g2.axis) === "x"
            ? (quotient = -quotient)
            : (quotient2 = -quotient2);
          record = {
            x: aResult.x,
            y: aResult.y,
          };
          x3 = aResult.x + 1 * quotient;
          y3 = aResult.y + 1 * quotient2;
          c -= 1;
          record4.passedThrough.add(concatResult);
          h++;
        }
      } else if (clipProjectileToBorderResult.clipped) {
        if (hypotResult2 > 1) {
          items.push([
            {
              x: record.x,
              y: record.y,
              z: t.z ?? 0,
            },
            {
              x: clipProjectileToBorderResult.endX,
              y: clipProjectileToBorderResult.endY,
              z: t.z ?? 0,
            },
          ]);
        }
        c -= hypotResult2;
        if (h >= s) {
          break;
        }
        const difference = 300 * this.width - 2;
        const difference2 = 300 * this.height - 2;
        if (
          Math.abs(clipProjectileToBorderResult.endX - 1) < 2 ||
          Math.abs(clipProjectileToBorderResult.endX - difference) < 2
        ) {
          quotient = -quotient;
        }
        if (
          Math.abs(clipProjectileToBorderResult.endY - 1) < 2 ||
          Math.abs(clipProjectileToBorderResult.endY - difference2) < 2
        ) {
          quotient2 = -quotient2;
        }
        record = {
          x: clipProjectileToBorderResult.endX,
          y: clipProjectileToBorderResult.endY,
        };
        x3 = clipProjectileToBorderResult.endX + 1 * quotient;
        y3 = clipProjectileToBorderResult.endY + 1 * quotient2;
        c -= 1;
        h++;
      } else {
        items.push([
          {
            x: record.x,
            y: record.y,
            z: t.z ?? 0,
          },
          {
            x: combinedValue,
            y: combinedValue2,
            z: t.z ?? 0,
          },
        ]);
        break;
      }
    }
    return items;
  }
  #n(t, e) {
    const { x: x3, y: y3 } = t;
    const a = Number(t.collisionMargin) || 0;
    let combinedValue = 300 * x3 + a;
    let combinedValue2 = combinedValue - 2 * a + 300;
    let combinedValue3 = 300 * y3 + a;
    let combinedValue4 = combinedValue3 - 2 * a + 300;
    const c = (t, i) => {
      const eResult = this.#e(t, i);
      return (
        eResult !== null && !e.destroyed.has("".concat(t, ":", i)) && eResult.blocksProjectiles
      );
    };
    if (!c(x3 - 1, y3)) {
      combinedValue = 300 * x3 - 1;
    }
    if (c(x3 + 1, y3)) {
      combinedValue2 += a + 1;
    }
    if (!c(x3, y3 - 1)) {
      combinedValue3 = 300 * y3 - 1;
    }
    if (c(x3, y3 + 1)) {
      combinedValue4 += a + 1;
    }
    return {
      left: combinedValue,
      top: combinedValue3,
      right: combinedValue2,
      bottom: combinedValue4,
    };
  }
  #a(t, e, i, s, a, n) {
    const r = Number(t?.radius ?? t?.data?.radius) || 0;
    const combinedValue = Math.floor((r + 150) / 300) + 1;
    const maxResult = Math.max(0, this.#i(Math.min(e, s)) - combinedValue);
    const minResult = Math.min(this.width - 1, this.#i(Math.max(e, s)) + combinedValue);
    const maxResult2 = Math.max(0, this.#i(Math.min(i, a)) - combinedValue);
    const minResult2 = Math.min(this.height - 1, this.#i(Math.max(i, a)) + combinedValue);
    const memoryBuffer = Memory.alloc(8);
    let g = null;
    for (let index = maxResult2; index <= minResult2; index++) {
      for (let index2 = maxResult; index2 <= minResult; index2++) {
        const eResult = this.#e(index2, index);
        const concatResult = "".concat(index2, ":", index);
        if (
          eResult?.blocksProjectiles &&
          !n.destroyed.has(concatResult) &&
          !n.passedThrough.has(concatResult) &&
          globalThis.natives.LogicProjectileServer_isTileIntersection(
            e,
            i,
            s,
            a,
            this.ptr,
            index2,
            index,
            eResult.ptr,
          )
        ) {
          const nResult = this.#n(eResult, n);
          if (
            globalThis.natives.LogicGamePlayUtil_lineSegmentIntersectsRectangle(
              e,
              i,
              s,
              a,
              nResult.left,
              nResult.top,
              nResult.right,
              nResult.bottom,
              memoryBuffer,
            )
          ) {
            const s32 = memoryBuffer.readS32();
            const s322 = memoryBuffer.add(4).readS32();
            const difference = s32 - e;
            const difference2 = s322 - i;
            const combinedValue2 = difference * difference + difference2 * difference2;
            if (!g || combinedValue2 < g.distanceSquared) {
              g = {
                x: s32,
                y: s322,
                tileX: index2,
                tileY: index,
                tile: eResult,
                distanceSquared: combinedValue2,
              };
            }
          }
        }
      }
    }
    return g;
  }
  #r(t, e) {
    const getResult = Kt.get(t.skillName);
    const maxResult = Math.max(0, Number(getResult?.damage) || 0);
    return Math.floor(
      (maxResult * (e.piercing || e.likeButter || e.passesEnvironment ? 50 : 100)) / 100,
    );
  }
  traceProjectileEnvironment(t, e, i, s, a) {
    let t2;
    const clipProjectileToBorderResult = this.clipProjectileToBorder(t, e, i, s, a);
    const roundResult = Math.round(clipProjectileToBorderResult.endX);
    const roundResult2 = Math.round(clipProjectileToBorderResult.endY);
    if (t?.ignoresWalls || t?.data?.passesThroughEnvironment) {
      return {
        endX: roundResult,
        endY: roundResult2,
        stopReason: clipProjectileToBorderResult.clipped ? "border" : "range",
        collision: null,
      };
    }
    const record = {
      destroyed: new Set(),
      passedThrough: new Set(),
      health: new Map(),
    };
    const record3 = {
      piercing: t.data.piercesEnvironment,
      likeButter: t.data.piercesEnvironmentLikeButter,
      passesEnvironment: t.data.passesEnvironment,
    };
    const rResult = this.#r(t, record3);
    const { piercing: piercing, likeButter: likeButter } = record3;
    let roundResult3 = Math.round(e);
    let roundResult4 = Math.round(i);
    let m = null;
    while (true) {
      const aResult = this.#a(t, roundResult3, roundResult4, roundResult, roundResult2, record);
      if (!aResult) {
        break;
      }
      const concatResult = "".concat(aResult.tileX, ":", aResult.tileY);
      const s2 = record.health.has(concatResult)
        ? record.health.get(concatResult)
        : aResult.tile.health;
      if (
        (!piercing || !aResult.tile.isDestructibleWithPiercing) &&
        !aResult.tile.destroyableWithAny
      ) {
        if (!likeButter) {
          if (aResult.tile.isDamageable && s2 >= 0 && rResult > 0) {
            t2 = Math.max(0, s2 - rResult);
            record.health.set(concatResult, t2);
            if (t2 === 0) {
              record.destroyed.add(concatResult);
            }
            return {
              endX: aResult.x,
              endY: aResult.y,
              stopReason: "damageable-wall",
              collision: {
                ...aResult,
                action: t2 === 0 ? "destroy-stop" : "damage-stop",
              },
            };
          }
          return {
            endX: aResult.x,
            endY: aResult.y,
            stopReason: "wall",
            collision: {
              ...aResult,
              action: "stop",
            },
          };
        }
      } else {
        if (
          aResult.tile.blocksProjectiles ||
          aResult.tile.blocksMovement ||
          aResult.tile.destructionFlag
        ) {
          record.destroyed.add(concatResult);
          m = {
            ...aResult,
            action: "destroy-continue",
          };
          continue;
        }
        if (!likeButter) {
          if (aResult.tile.isDamageable && s2 >= 0 && rResult > 0) {
            t2 = Math.max(0, s2 - rResult);
            record.health.set(concatResult, t2);
            if (t2 === 0) {
              record.destroyed.add(concatResult);
            }
            return {
              endX: aResult.x,
              endY: aResult.y,
              stopReason: "damageable-wall",
              collision: {
                ...aResult,
                action: t2 === 0 ? "destroy-stop" : "damage-stop",
              },
            };
          }
          return {
            endX: aResult.x,
            endY: aResult.y,
            stopReason: "wall",
            collision: {
              ...aResult,
              action: "stop",
            },
          };
        }
      }
      record.passedThrough.add(concatResult);
    }
    return {
      endX: roundResult,
      endY: roundResult2,
      stopReason: clipProjectileToBorderResult.clipped ? "border" : "range",
      collision: m,
    };
  }
  isWater(t, e) {
    const tile = this.getTile(t, e);
    return tile !== undefined && tile.water;
  }
  printAscii() {
    let concatResult = "\nMap ".concat(this.width, "x", this.height, "\n\n");
    for (let index = 0; index < this.height; index++) {
      let i = "";
      for (let index2 = 0; index2 < this.width; index2++) {
        const s = this.tiles[index][index2];
        i += s === undefined ? "?" : s.getAscii();
      }
      concatResult += i + "\n";
    }
    concatResult += "\n# wall\n~ water\nX movement blocker\n. free\n";
    console.log(concatResult);
    return;
  }
}

var ie = t14;

var se = ie;
