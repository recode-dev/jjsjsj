/**
 * features/inactivity.js
 *
 * Inactivity (AFK) controller.
 *
 * Symbols: InactivityController, oa, t56, la
 * Source: bundle lines 26565-26798 (4 statements)
 */


class InactivityController {
  constructor() {
    this.state = true;
    this.movement = new Fe();
    this.#G();
    return;
  }
  setEnabled(t) {
    this.state = Boolean(t);
    return this.state;
  }
  toggle() {
    return this.setEnabled(!this.state);
  }
  #G() {
    Interceptor.attach(globalThis.offsets.BattleScreen_isAFK, {
      onLeave(e) {
        if (!this.state || e.toInt32() === 0) {
          return;
        }
        const i = new de();
        const me2 = i.me;
        const roundResult = Math.round(me2.x);
        const roundResult2 = Math.round(me2.y);
        this.movement.sendTarget(roundResult, roundResult2);
        i.resetInactiveTime();
        e.replace(0);
        return;
      },
    });
    return;
  }
}

class oa {
  constructor() {
    this.enabled = false;
    this.autoReady = true;
    this.autoExit = true;
    this.autoAttackBasic = true;
    this.allowSwitch = true;
    this.switchMode = "dynamic";
    this.trophyMode = "lowest";
    this.trophyGoal = [0, 500];
    this.powerLevels = [1, 11];
    this.readyCooldown = 250;
    this.switchCooldown = 1000;
    this.attackCooldownTicks = 3;
    this.movementHistoryTicks = 250;
    this.activeTeammateDistance = 900;
    this.maximumObjects = 4096;
    this.brawlerNames = [
      "ShotgunGirl",
      "Shaman",
      "Gunslinger",
      "BullDude",
      "RocketGirl",
      "Luchador",
      "Barkeep",
      "DeadMariachi",
      "Rosa",
      "Mechanic",
      "TntDude",
      "ClusterBombDude",
      "Arcade",
      "TrickshotDude",
      "BarrelBot",
      "ArtilleryDude",
      "Whirlwind",
      "Driller",
      "SoulCollector",
      "BowDude",
      "Mummy",
      "Roller",
      "Sniper",
      "MinigunDude",
      "HammerDude",
      "Baseball",
      "BeeSniper",
      "Controller",
      "Enrager",
      "AssaultShotgun",
      "CrossBomber",
      "CannonGirl",
      "Blower",
      "Percenter",
      "ElectroSniper",
      "Knight",
      "Duplicator",
      "WeaponThrower",
      "Beamer",
      "Maisie",
      "FishTank",
      "Cooker",
      "Twins",
      "InsectMan",
      "Painter",
      "Ghost",
      "Meeple",
      "Domain",
      "Rock",
      "Undertaker",
      "BlackHole",
      "HookDude",
      "Speedy",
      "SpawnerDude",
      "Wally",
      "SnakeOil",
      "StickyBomb",
      "IceDude",
      "Ruffs",
      "RopeDude",
      "KickerDude",
      "Flea",
      "JetpackGirl",
      "Silencer",
      "ShieldTank",
      "DoorMan",
      "Splitter",
      "Puppeteer",
      "Reviver",
      "Conductor",
      "Cocooner",
      "Leaper",
      "AxeJuggler",
      "Ambusher",
      "Crab",
      "Digger",
      "Voodoo",
      "Skater",
      "Morningstar",
      "Chronomancer",
      "Alternator",
      "Stalker",
      "Dancer",
      "Fury",
      "Daredevil",
      "Mender",
      "Redirecter",
      "Gladiator",
      "MagicalGirl",
      "FutureGirl",
      "Cactus",
      "Crow",
      "Ninja",
      "Sandstorm",
      "FireDude",
      "MechaDude",
      "PowerLeveler",
      "Jester",
      "Duelist",
      "Attacher",
      "DragonRider",
      "Samurai",
      "Bulletstorm",
      "KatanaKid",
      "Geisha",
      "Shadowdemon",
    ];
    return;
  }
  update(record = {}) {
    const record3 = {};
    let i = true;
    for (const s of Object.keys(record)) {
      Object.prototype.hasOwnProperty.call(this, s)
        ? ((record3[s] = this[s]), (this[s] = record[s]))
        : (i = false);
    }
    for (const t2 of ["trophyGoal", "powerLevels"]) {
      const e2 = this[t2];
      if (!Array.isArray(e2) || e2.length !== 2 || !e2.every(Number.isFinite) || e2[0] > e2[1]) {
        i = false;
      }
    }
    for (const t3 of [
      "readyCooldown",
      "switchCooldown",
      "attackCooldownTicks",
      "movementHistoryTicks",
      "activeTeammateDistance",
      "maximumObjects",
    ]) {
      if (!Number.isSafeInteger(this[t3]) || this[t3] < 0) {
        i = false;
      }
    }
    for (const t4 of ["enabled", "autoReady", "autoExit", "autoAttackBasic", "allowSwitch"]) {
      if (typeof this[t4] != "boolean") {
        i = false;
      }
    }
    if (
      !["single", "dynamic"].includes(this.switchMode) ||
      !["lowest", "highest"].includes(this.trophyMode)
    ) {
      i = false;
    }
    if (!i) {
      for (let [t5, i2] of Object.entries(record3)) {
        this[t5] = i2;
      }
    }
    return i;
  }
}

class t56 {
  static objectArrayOffset;
  static objectCountOffset;
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  static {
    this.objectArrayOffset = 0;
    this.objectCountOffset = 12;
  }
  get count() {
    return this.ptr.add(t56.objectCountOffset).readS32();
  }
  getObjects(e = 4096) {
    const count = this.count;
    const pointer = this.ptr.add(t56.objectArrayOffset).readPointer();
    if (pointer.isNull() || count <= 0 || count > e) {
      return [];
    }
    return Array.from(
      {
        length: count,
      },
      (t, e) => pointer.add(e * Process.pointerSize).readPointer(),
    );
  }
}

var la = t56;
