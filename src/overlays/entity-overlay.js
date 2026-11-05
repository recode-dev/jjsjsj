/**
 * overlays/entity-overlay.js
 *
 * Entity overlay controller (ESP).
 *
 * Symbols: EntityOverlayController, Is
 * Source: bundle lines 20928-21077 (2 statements)
 */


class EntityOverlayController {
  constructor() {
    this.state = false;
    this.renderer = new xs();
    this.tracerRenderer = new As(this.renderer);
    this.hitboxRenderer = new ks(this.renderer);
    this.rangeRenderer = new Ps(this.renderer);
    this.battle = new de();
    this.characters = [];
    this.config = {
      tracers: false,
      maxTracers: 11,
      tracerThickness: 14,
      tracerColors: {
        ownTeam: {
          r: 0,
          g: 0,
          b: 255,
        },
        enemy: {
          r: 255,
          g: 0,
          b: 0,
        },
      },
      hitboxes: true,
      hitboxColor: {
        r: 255,
        g: 255,
        b: 255,
      },
      range: false,
      rangeColors: {
        basic: {
          r: 255,
          g: 0,
          b: 0,
        },
        super: {
          r: 255,
          g: 255,
          b: 0,
        },
        gadget: {
          r: 0,
          g: 255,
          b: 0,
        },
      },
    };
    return;
  }
  toggle() {
    this.state = !this.state;
    this.renderer.setEnabled(this.state);
    return this.state;
  }
  update() {
    if (!this.state) {
      return;
    }
    if (!this.renderer.enabled) {
      this.renderer.setEnabled(true);
    }
    if (!re.isState(re.states.BATTLE)) {
      this.renderer.clear();
      this.characters = [];
      return;
    }
    const characterPointers = de.getCharacterPointers();
    const entries2 = new Map(this.characters.map((t) => [t.ptr.toString(), t]));
    const characters = [];
    for (const s of characterPointers) {
      const text2 = s.toString();
      let getResult = entries2.get(text2);
      getResult ||= new Se(s);
      if (getResult.playerIndex >= 0) {
        characters.push(getResult);
      }
    }
    this.characters = characters;
    if (this.characters.length === 0) {
      this.renderer.clear();
      return;
    }
    const {
      characters: characters2,
      battle: { me: me2 },
    } = this;
    if (this.config.tracers) {
      const maxResult = Math.max(1, Math.floor(Number(this.config.maxTracers) || 1));
      const e2 = me2 ? characters2.filter((t) => !t.ptr.equals(me2.ptr)) : characters2;
      const i2 = me2
        ? e2
            .map((t) => {
              const deltaX = t.x - me2.x;
              const deltaY = t.y - me2.y;
              return {
                character: t,
                distanceSquared: deltaX * deltaX + deltaY * deltaY,
              };
            })
            .sort((t, e) => t.distanceSquared - e.distanceSquared)
            .map((t) => t.character)
        : e2;
      const n = maxResult >= 11 ? i2 : i2.slice(0, maxResult);
      this.tracerRenderer.update(
        n,
        me2,
        {
          ownTeam: [
            this.config.tracerColors.ownTeam.r,
            this.config.tracerColors.ownTeam.g,
            this.config.tracerColors.ownTeam.b,
            255,
          ],
          enemy: [
            this.config.tracerColors.enemy.r,
            this.config.tracerColors.enemy.g,
            this.config.tracerColors.enemy.b,
            255,
          ],
        },
        this.config.tracerThickness,
      );
    } else {
      this.tracerRenderer.removeStale();
    }
    this.config.hitboxes
      ? this.hitboxRenderer.update(characters2, this.config.hitboxColor)
      : this.hitboxRenderer.removeStale();
    if (this.config.range) {
      this.rangeRenderer.update(characters2, this.config.rangeColors);
      return;
    }
    this.rangeRenderer.removeStale();
    return;
  }
}

class Is {
  constructor() {
    return;
  }
  static getUpdatePath() {
    return globalThis.offsets.update_path.readSCStr();
  }
  static isFileExist(t) {
    return globalThis.pointers.access(t.ptr(), 0) === 0;
  }
}
