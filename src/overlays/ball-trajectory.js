/**
 * overlays/ball-trajectory.js
 *
 * Ball trajectory overlay and path sprite rendering.
 *
 * Symbols: Cs, Ns, BallTrajectoryOverlay, BallTrajectoryOverlayAlias
 * Source: bundle lines 20503-25519 (5 statements)
 */


class Cs {
  constructor(t, width = 1, color = [255, 255, 255, 255]) {
    this.size = 300;
    this.renderSlot = 2;
    this.width = width;
    this.color = color;
    this.instance = globalThis.pointers.malloc(this.size);
    this.data = ptr(0);
    this.pointCapacity = 0;
    this.vector = globalThis.pointers.malloc(3 * Process.pointerSize);
    this.writePoints(t);
    this.updateVector();
    globalThis.natives.PathSprite_ctor(this.instance, this.vector, 0, this.width);
    this.setColor(this.color);
    this.setVisible(true);
    const pointer = this.instance
      .readPointer()
      .add(Process.pointerSize * this.renderSlot)
      .readPointer();
    this.renderNative = new NativeFunction(pointer, "int", [
      "pointer",
      "pointer",
      "uint64",
      "int",
      "float",
    ]);
    return;
  }
  update(t, width = this.width, color = this.color, s = 0) {
    this.writePoints(t);
    this.updateVector();
    this.width = width;
    globalThis.natives.PathSprite_updateShape(this.instance, this.vector, this.width, s, -1);
    this.setColor(color);
    return;
  }
  writePoints(t) {
    if (Array.isArray(t) && !(t.length < 2)) {
      if (t.length > this.pointCapacity) {
        if (!this.data.isNull()) {
          globalThis.pointers.free(this.data);
        }
        this.pointCapacity = t.length;
        this.data = globalThis.pointers.malloc(12 * this.pointCapacity);
      }
      for (let index = 0; index < t.length; index++) {
        const addResult = this.data.add(12 * index);
        addResult.writeFloat(t[index].x);
        addResult.add(4).writeFloat(t[index].y);
        addResult.add(8).writeFloat(t[index].z ?? 0);
      }
      this.pointCount = t.length;
    }
    return;
  }
  updateVector() {
    const pointer = this.data.add(12 * this.pointCount);
    this.vector.writePointer(this.data);
    this.vector.add(Process.pointerSize).writePointer(pointer);
    this.vector.add(2 * Process.pointerSize).writePointer(pointer);
    return;
  }
  setVisible(t) {
    this.instance.add(8).writeU8(t ? 1 : 0);
    return;
  }
  setColor(color) {
    this.color = color;
    this.instance.add(9).writeU8(color[0]);
    this.instance.add(10).writeU8(color[1]);
    this.instance.add(11).writeU8(color[2]);
    this.instance.add(12).writeU8(color[3] ?? 255);
    return;
  }
  render(t, e, i = 0) {
    if (this.instance.add(8).readU8() !== 0) {
      this.renderNative(this.instance, t, e, 1, i);
    }
    return;
  }
  destroy() {
    globalThis.natives.PathSprite_dtor(this.instance);
    globalThis.pointers.free(this.instance);
    globalThis.pointers.free(this.vector);
    if (!this.data.isNull()) {
      globalThis.pointers.free(this.data);
    }
    return;
  }
}

class Ns {
  constructor(radius2, e) {
    this.radius = radius2;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.visible = true;
    this.instance = globalThis.pointers.malloc(250);
    globalThis.natives.AttackRadiusSprite_ctor(this.instance, 0, radius2 / 6, 1, 0, 0);
    this.setColor(e);
    return;
  }
  update(x3, y3, z2, radius2 = this.radius, color = this.color) {
    this.x = x3;
    this.y = y3;
    this.z = z2;
    if (radius2 !== this.radius) {
      this.radius = radius2;
      globalThis.natives.AttackRadiusSprite_set(this.instance, 0, radius2 / 6, 1, 0, 0);
    }
    if (color !== this.color) {
      this.setColor(color);
    }
    this.visible = true;
    return;
  }
  setColor(color) {
    this.color = color;
    this.instance.add(9).writeU8(color[0]);
    this.instance.add(10).writeU8(color[1]);
    this.instance.add(11).writeU8(color[2]);
    this.instance.add(12).writeU8(color[3] ?? 255);
    return;
  }
  setVisible(t) {
    this.visible = !!t;
    return;
  }
}

class BallTrajectoryOverlay {
  static extensionPathOffset;
  static otherPathOffsets;
  static pathVisibleOffset;
  static pathColorOffset;
  static rangePerSubtile;
  static doubledRange;
  static doubledRangeSubtiles;
  static minimumExtension;
  static maxNativePoints;
  static maxWallBounces;
  static vector3Size;
  static trajectoryWidth;
  static aimReleaseGraceMs;
  constructor() {
    this.state = false;
    this.lastAimActiveAt = 0;
    this.battleGeneration = -1;
    this.trajectoryByThread = new Map();
    this.pathCapacity =
      BallTrajectoryOverlay.maxNativePoints + BallTrajectoryOverlay.maxWallBounces + 2;
    this.pathData = globalThis.pointers.malloc(
      this.pathCapacity * BallTrajectoryOverlay.vector3Size,
    );
    this.pathVector = globalThis.pointers.malloc(3 * Process.pointerSize);
    this.#G();
    return;
  }
  static {
    this.extensionPathOffset = 2840;
    this.otherPathOffsets = [2832, 2848];
    this.pathVisibleOffset = 8;
    this.pathColorOffset = 9;
    this.rangePerSubtile = 100;
    this.doubledRange = 9600;
    this.doubledRangeSubtiles = 48;
    this.minimumExtension = 60;
    this.maxNativePoints = 1024;
    this.maxWallBounces = 3;
    this.vector3Size = 12;
    this.trajectoryWidth = 100;
    this.aimReleaseGraceMs = 200;
  }
  toggle() {
    this.state = !this.state;
    return this.state;
  }
  setEnabled(t) {
    this.state = Boolean(t);
    return this.state;
  }
  update() {
    if (this.state) {
      if (re.isState(re.states.BATTLE)) {
        if (this.battleGeneration !== de.generation) {
          this.battleGeneration = de.generation;
        }
        return;
      }
      this.lastAimActiveAt = 0;
      this.battleGeneration = -1;
      this.trajectoryByThread.clear();
      return;
    }
    return;
  }
  #te() {
    const screenPointer = de.screenPointer;
    const me2 = de.instance?.me;
    if (
      me2?.hasCarryable &&
      screenPointer &&
      !screenPointer.isNull() &&
      (globalThis.natives.BattleScreen_isShootStickActive(screenPointer) !== 0 ||
        globalThis.natives.BattleScreen_isUltiStickActive(screenPointer) !== 0)
    ) {
      this.lastAimActiveAt = Date.now();
      return true;
    }
    return Date.now() - this.lastAimActiveAt < BallTrajectoryOverlay.aimReleaseGraceMs;
  }
  #ee(e) {
    for (const i of BallTrajectoryOverlay.otherPathOffsets) {
      const pointer = e.add(i).readPointer();
      if (!pointer.isNull()) {
        pointer.add(BallTrajectoryOverlay.pathVisibleOffset).writeU8(0);
      }
    }
    return;
  }
  #ie(e) {
    e.add(BallTrajectoryOverlay.pathColorOffset).writeU8(255);
    e.add(BallTrajectoryOverlay.pathColorOffset + 1).writeU8(255);
    e.add(BallTrajectoryOverlay.pathColorOffset + 2).writeU8(255);
    e.add(BallTrajectoryOverlay.pathColorOffset + 3).writeU8(255);
    return;
  }
  #se(e) {
    if (!e || e.length < 2 || e.length > this.pathCapacity) {
      return false;
    }
    for (let index = 0; index < e.length; index++) {
      const addResult = this.pathData.add(index * BallTrajectoryOverlay.vector3Size);
      addResult.writeFloat(e[index].x);
      addResult.add(4).writeFloat(e[index].y);
      addResult.add(8).writeFloat(e[index].z ?? 0);
    }
    const pointer = this.pathData.add(e.length * BallTrajectoryOverlay.vector3Size);
    this.pathVector.writePointer(this.pathData);
    this.pathVector.add(Process.pointerSize).writePointer(pointer);
    this.pathVector.add(2 * Process.pointerSize).writePointer(pointer);
    return true;
  }
  #G() {
    Interceptor.attach(globalThis.offsets.BattleScreen_updateTrajectorySprite, {
      onEnter: (t) => {
        if (!this.state) {
          return;
        }
        if (!re.isState(re.states.BATTLE)) {
          return;
        }
        const currentThreadId = Process.getCurrentThreadId();
        if (this.battleGeneration !== de.generation) {
          this.battleGeneration = de.generation;
        }
        this.trajectoryByThread.set(currentThreadId, {
          generation: de.generation,
          screen: t[0],
          ballRange: 0,
          extendedPath: null,
          pathShapeReplaced: false,
        });
        return;
      },
      onLeave: () => {
        const currentThreadId = Process.getCurrentThreadId();
        const getResult = this.trajectoryByThread.get(currentThreadId);
        this.trajectoryByThread.delete(currentThreadId);
        if (!getResult || !this.state || getResult.generation !== de.generation) {
          return;
        }
        if (!this.#te()) {
          return;
        }
        const extendedPath = getResult.extendedPath;
        if (!extendedPath) {
          return;
        }
        const pointer = getResult.screen
          .add(BallTrajectoryOverlay.extensionPathOffset)
          .readPointer();
        if (!pointer.isNull() && this.#se(extendedPath)) {
          if (!getResult.pathShapeReplaced) {
            globalThis.natives.PathSprite_updateShape(
              pointer,
              this.pathVector,
              BallTrajectoryOverlay.trajectoryWidth,
              BallTrajectoryOverlay.trajectoryWidth,
              -1,
            );
          }
          this.#ie(pointer);
          pointer.add(BallTrajectoryOverlay.pathVisibleOffset).writeU8(1);
          this.#ee(getResult.screen);
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.PathSprite_updateShape, {
      onEnter: function (i) {
        if (!this.state || !re.isState(re.states.BATTLE)) {
          return;
        }
        const getResult = this.trajectoryByThread.get(Process.getCurrentThreadId());
        if (!getResult || getResult.generation !== de.generation || !this.#te()) {
          return;
        }
        if (getResult.screen.isNull()) {
          return;
        }
        const pointer = getResult.screen
          .add(BallTrajectoryOverlay.extensionPathOffset)
          .readPointer();
        if (pointer.isNull() || !i[0].equals(pointer)) {
          return;
        }
        const extendedPath = getResult.extendedPath;
        if (this.#se(extendedPath)) {
          this.context.x1 = this.pathVector;
          this.context.s0 = BallTrajectoryOverlay.trajectoryWidth;
          this.context.s1 = BallTrajectoryOverlay.trajectoryWidth;
          getResult.pathShapeReplaced = true;
        }
        return;
      },
    });
    Interceptor.attach(globalThis.offsets.BattleScreen_calculateProjectilePath, {
      onEnter: function () {
        let a;
        let context;
        let r;
        let x1;
        let x2;
        this.trajectory = null;
        this.output = ptr(0);
        if (!this.state) {
          return;
        }
        if (this.context.x3.toInt32() !== 0) {
          return;
        }
        const currentThreadId = Process.getCurrentThreadId();
        const trajectory = this.trajectoryByThread.get(currentThreadId);
        if (!trajectory) {
          return;
        }
        ({
          context: { x1: a },
        } = this);
        if (a.isNull()) {
          return;
        }
        const n = new Se(a);
        if (!n.hasCarryable) {
          return;
        }
        ({
          context: { x2: r },
        } = this);
        if (r.isNull()) {
          return;
        }
        const logicSkillData_getCastingRangeSubtilesResult =
          globalThis.natives.LogicSkillData_getCastingRangeSubtiles(r);
        if (logicSkillData_getCastingRangeSubtilesResult <= 0) {
          return;
        }
        const l =
          logicSkillData_getCastingRangeSubtilesResult ===
          BallTrajectoryOverlay.doubledRangeSubtiles
            ? BallTrajectoryOverlay.doubledRange
            : logicSkillData_getCastingRangeSubtilesResult * BallTrajectoryOverlay.rangePerSubtile;
        const maxResult = Math.max(0, Number(n.radius) || 0);
        this.trajectory = trajectory;
        trajectory.ballRange = Math.max(0, l - maxResult);
        this.output = this.context.x8;
        return;
      },
      onLeave: function () {
        if (!this.trajectory || this.output.isNull()) {
          return;
        }
        const aeResult = this.#ae(this.output);
        if (aeResult && aeResult.length >= 2) {
          const neResult = this.#ne(aeResult, this.trajectory.ballRange);
          if (neResult.length) {
            const extendedPath = aeResult.concat(neResult.slice(1));
            if (extendedPath.length <= this.pathCapacity) {
              this.trajectory.extendedPath = extendedPath;
            }
          }
        }
        return;
      },
    });
    return;
  }
  #ae(pointer) {
    if (!pointer || pointer.isNull()) {
      return null;
    }
    const pointer2 = pointer.readPointer();
    const pointer3 = pointer.add(Process.pointerSize).readPointer();
    if (pointer2.isNull() || pointer3.isNull()) {
      return null;
    }
    const toInt32Result = pointer3.sub(pointer2).toInt32();
    if (
      toInt32Result < 2 * BallTrajectoryOverlay.vector3Size ||
      toInt32Result % BallTrajectoryOverlay.vector3Size !== 0 ||
      toInt32Result > BallTrajectoryOverlay.maxNativePoints * BallTrajectoryOverlay.vector3Size
    ) {
      return null;
    }
    const items = [];
    const quotient = toInt32Result / BallTrajectoryOverlay.vector3Size;
    for (let index = 0; index < quotient; index++) {
      const addResult = pointer2.add(index * BallTrajectoryOverlay.vector3Size);
      const record = {
        x: addResult.readFloat(),
        y: addResult.add(4).readFloat(),
        z: addResult.add(8).readFloat(),
      };
      if (
        ![record.x, record.y, record.z].every(Number.isFinite) ||
        Math.abs(record.x) > 100000 ||
        Math.abs(record.y) > 100000
      ) {
        return null;
      }
      items.push(record);
    }
    return items;
  }
  #ne(e, i) {
    if (!e || e.length < 2 || !Number.isFinite(i) || i <= 0) {
      return [];
    }
    let s = 0;
    for (let index = 1; index < e.length; index++) {
      s += Math.hypot(e[index].x - e[index - 1].x, e[index].y - e[index - 1].y);
    }
    const minResult = Math.min(i - s, 0.5 * i);
    if (minResult < BallTrajectoryOverlay.minimumExtension) {
      return [];
    }
    const n = e[e.length - 1];
    const r = e[e.length - 2];
    const deltaX = n.x - r.x;
    const deltaY = n.y - r.y;
    const hypotResult = Math.hypot(deltaX, deltaY);
    if (hypotResult < 1) {
      return [];
    }
    const record = {
      x: deltaX / hypotResult,
      y: deltaY / hypotResult,
    };
    const record3 = {
      x: n.x,
      y: n.y,
      z: n.z,
    };
    const tileMap2 = de.tileMap;
    if (!tileMap2) {
      return [];
    }
    const traceRicochetPathResult = tileMap2.traceRicochetPath(
      record3,
      record,
      minResult,
      BallTrajectoryOverlay.maxWallBounces,
    );
    if (!traceRicochetPathResult.length) {
      return [];
    }
    const items = [traceRicochetPathResult[0][0], traceRicochetPathResult[0][1]];
    for (let index2 = 1; index2 < traceRicochetPathResult.length; index2++) {
      items.push(traceRicochetPathResult[index2][1]);
    }
    return items;
  }
}

var BallTrajectoryOverlayAlias = BallTrajectoryOverlay;

var undefinedValue4 = undefined;
