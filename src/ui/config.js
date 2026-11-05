/**
 * ui/config.js
 *
 * Config loading/saving and coercion helpers used by the menu and features.
 *
 * Symbols: Vi, Hi, $i, Bs
 * Source: bundle lines 2450-21853 (4 statements)
 */


function Vi(t) {
  const transitions = t?.transitions;
  if (!transitions || transitions.tabs || transitions.categories) {
    return t;
  }
  return {
    ...t,
    transitions: {
      tabs: {
        enabled: transitions.enabled,
        duration: transitions.duration,
        distance: transitions.tabDistance,
      },
      categories: {
        enabled: transitions.enabled,
        duration: transitions.duration,
        distance: transitions.categoryDistance,
      },
    },
  };
}

function Hi(t, e) {
  const record = {};
  for (const s of Object.keys(t)) {
    const a = e?.[s];
    typeof t[s] == "object"
      ? (record[s] = Hi(t[s], a))
      : (record[s] = typeof a == typeof t[s] ? a : t[s]);
  }
  return record;
}

function $i(t, e, i) {
  const s = i ? -e : e;
  switch (t.mode) {
    case "down":
      return {
        x: 0,
        y: t.distance,
      };
    case "horizontal":
      return {
        x: s * t.distance,
        y: 0,
      };
    case "vertical":
      return {
        x: 0,
        y: s * t.distance,
      };
    default:
      return {
        x: 0,
        y: 0,
      };
  }
}

class Bs {
  constructor() {
    this.loaded = false;
    this.config = {
      dodge: {
        enabled: false,
        config: {
          mode: "static",
          static: {
            directions: 72,
            safetyMargin: 50,
            predictor: true,
            predictorLookup: 300,
          },
          continuous: {
            safetyMargin: 20,
            predictor: true,
            predictorLookup: 300,
            allowedCharacters: [],
            minDistance: 0,
            chance: 100,
            reactionMin: 0,
            reactionMax: 0,
            returnDelay: 100,
            changeDelay: 0,
          },
        },
        ignore: {
          maxSpread: 80,
          minRange: 6,
          ignoreUndodgeable: false,
          ignoreThrowers: false,
        },
      },
      aimbot: {
        enabled: false,
        strength: 0,
        speedDetection: "hybrid",
        aimWhenNeeded: true,
        allowWhenAiming: false,
      },
      hideAim: {
        enabled: false,
        config: {
          basic: false,
          ulti: true,
          gadget: true,
          hideActiveGadget: false,
        },
      },
      killaura: {
        enabled: false,
        minHealth: 0,
        hold: false,
        checkRange: false,
        cancelOnRelease: true,
        hyperWaitForUlti: true,
        safetyTilesMargin: 0,
        useNormal: true,
        useGadget: false,
        useUlti: true,
        useHyper: false,
      },
      holdToShoot: {
        enabled: false,
        config: {
          checkRange: false,
          cancelOnRelease: true,
          safetyTilesMargin: 2,
          onAim: true,
          timeToAim: 300,
        },
      },
      dynajump: {
        enabled: false,
        config: {
          stickRadius: 130 / 3,
          useUlti: true,
          requireUlti: false,
          minimumAmmoRequired: 0,
          minimumStickStrength: 0.12,
          minimumBlastOffset: 75,
          shootEarly: 50,
        },
      },
      FPSLogger: false,
      pingShower: {
        enabled: false,
        indicatorEnabled: false,
        rainbow: false,
      },
      ip: {
        enabled: false,
        allowCopy: true,
        rainbow: false,
      },
      unhideNames: {
        enabled: false,
      },
      showEnemyBrawler: {
        enabled: true,
      },
      antiAFK: {
        enabled: true,
      },
      autoFarm: {
        enabled: false,
        autoReady: true,
        autoExit: true,
        autoAttackBasic: true,
        allowSwitch: true,
        switchMode: "dynamic",
        trophyMode: "lowest",
        trophyGoal: [0, 500],
        powerLevels: [1, 11],
      },
      hideSpectate: {
        enabled: false,
      },
      antiFade: {
        enabled: false,
      },
      showTrophies: {
        enabled: false,
        teams: {
          me: true,
          enemy: true,
        },
        trophies: {
          total: true,
          brawler: true,
        },
      },
      showMaxFPS: false,
      rainbowFPS: false,
      fpsLimit: {
        enabled: false,
        limit: 120,
      },
      outline: {
        enabled: false,
        r: 255,
        g: 255,
        b: 255,
        a: 255,
      },
      esp: {
        enabled: false,
        config: {
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
        },
      },
      extendBallTrajectory: {
        enabled: false,
      },
      autoGoal: {
        enabled: false,
      },
      showAmmo: {
        enabled: false,
      },
      musicPlayer: {
        playlists: [
          {
            name: "default",
            tracks: [],
          },
        ],
        selectedPlaylist: "default",
        nextPlaylistNumber: 2,
        selectedTrackPath: null,
      },
      showPlayerPosition: false,
      rainbowPlayerPosition: false,
      playerPositionUpdateMode: "frame",
      playerPositionUpdatesPerSecond: 10,
      noScreenShake: false,
      themeChanger: {
        selectedTheme: null,
      },
      menu: Wi.serialize(),
    };
    this.configPath = Is.getUpdatePath() + "/RythmConfig";
    this.lastSavedJson = null;
    return;
  }
  readOrCreateConfig() {
    if (Is.isFileExist(this.configPath)) {
      const jsonText = File.readAllText(this.configPath);
      const parsedValue = JSON.parse(jsonText);
      const i =
        typeof parsedValue.dodge == "object"
          ? parsedValue.dodge !== null
            ? parsedValue.dodge
            : {}
          : {};
      const s = typeof i.config == "object" ? (i.config !== null ? i.config : {}) : {};
      const a = typeof i.ignore == "object" ? (i.ignore !== null ? i.ignore : {}) : {};
      if (a.minRange === undefined && a.range !== undefined) {
        a.minRange = a.range;
      }
      delete a.range;
      const record = {
        ...s.static,
      };
      const record3 = {
        ...s.continuous,
      };
      for (const t2 of ["directions", "safetyMargin", "predictor", "predictorLookup"]) {
        if (s[t2] !== undefined) {
          record[t2] ??= s[t2];
        }
        if (s[t2] !== undefined && t2 !== "directions") {
          record3[t2] ??= s[t2];
        }
      }
      if (record3.safetyMargin === undefined || record3.safetyMargin === 50) {
        record3.safetyMargin = 20;
      }
      for (const t3 of ["ignoreUndodgeable", "ignoreThrowers"]) {
        if (s[t3] !== undefined && a[t3] === undefined) {
          a[t3] = s[t3];
        }
      }
      this.config = {
        ...this.config,
        ...parsedValue,
        dodge: {
          ...this.config.dodge,
          ...(typeof parsedValue.dodge == "object"
            ? parsedValue.dodge !== null
              ? parsedValue.dodge
              : {}
            : {}),
          enabled:
            typeof parsedValue.dodge == "boolean"
              ? parsedValue.dodge
              : typeof parsedValue.dodge?.enabled == "boolean"
                ? parsedValue.dodge.enabled
                : this.config.dodge.enabled,
          config: {
            ...this.config.dodge.config,
            mode: s.mode ?? this.config.dodge.config.mode,
            static: {
              ...this.config.dodge.config.static,
              ...record,
            },
            continuous: {
              ...this.config.dodge.config.continuous,
              ...record3,
            },
          },
          ignore: {
            ...this.config.dodge.ignore,
            ...a,
          },
        },
        aimbot: {
          ...this.config.aimbot,
          ...parsedValue.aimbot,
          allowWhenAiming:
            parsedValue.aimbot?.allowWhenAiming ??
            parsedValue.aimbot?.allowOnAim ??
            this.config.aimbot.allowWhenAiming,
        },
        hideAim: {
          ...this.config.hideAim,
          ...(typeof parsedValue.hideAim == "object"
            ? parsedValue.hideAim !== null
              ? parsedValue.hideAim
              : {}
            : {}),
          config: {
            ...this.config.hideAim.config,
            ...(typeof parsedValue.hideAim?.config == "object"
              ? parsedValue.hideAim.config !== null
                ? parsedValue.hideAim.config
                : {}
              : {}),
          },
        },
        killaura: {
          ...this.config.killaura,
          ...parsedValue.killaura,
        },
        holdToShoot: {
          ...this.config.holdToShoot,
          ...(typeof parsedValue.holdToShoot == "object"
            ? parsedValue.holdToShoot !== null
              ? parsedValue.holdToShoot
              : {}
            : {}),
          config: {
            ...this.config.holdToShoot.config,
            ...(typeof parsedValue.holdToShoot?.config == "object"
              ? parsedValue.holdToShoot.config !== null
                ? parsedValue.holdToShoot.config
                : {}
              : {}),
          },
        },
        dynajump: {
          ...this.config.dynajump,
          ...(typeof parsedValue.dynajump == "object"
            ? parsedValue.dynajump !== null
              ? parsedValue.dynajump
              : {}
            : {}),
          config: {
            ...this.config.dynajump.config,
            ...(typeof parsedValue.dynajump?.config == "object"
              ? parsedValue.dynajump.config !== null
                ? parsedValue.dynajump.config
                : {}
              : {}),
          },
        },
        fpsLimit: {
          ...this.config.fpsLimit,
          ...(typeof parsedValue.fpsLimit == "object"
            ? parsedValue.fpsLimit !== null
              ? parsedValue.fpsLimit
              : {}
            : {}),
        },
        pingShower: {
          ...this.config.pingShower,
          ...(typeof parsedValue.pingShower == "object"
            ? parsedValue.pingShower !== null
              ? parsedValue.pingShower
              : {}
            : {}),
        },
        ip: {
          ...this.config.ip,
          ...(typeof parsedValue.ip == "object"
            ? parsedValue.ip !== null
              ? parsedValue.ip
              : {}
            : {}),
        },
        unhideNames: {
          ...this.config.unhideNames,
          ...(typeof parsedValue.unhideNames == "object"
            ? parsedValue.unhideNames !== null
              ? parsedValue.unhideNames
              : {}
            : {}),
        },
        showEnemyBrawler: {
          ...this.config.showEnemyBrawler,
          ...(typeof parsedValue.showEnemyBrawler == "object"
            ? parsedValue.showEnemyBrawler !== null
              ? parsedValue.showEnemyBrawler
              : {}
            : {}),
        },
        antiAFK: {
          ...this.config.antiAFK,
          ...(typeof parsedValue.antiAFK == "object"
            ? parsedValue.antiAFK !== null
              ? parsedValue.antiAFK
              : {}
            : {}),
        },
        autoFarm: {
          ...this.config.autoFarm,
          ...(typeof parsedValue.autoFarm == "object"
            ? parsedValue.autoFarm !== null
              ? parsedValue.autoFarm
              : {}
            : {}),
        },
        hideSpectate: {
          ...this.config.hideSpectate,
          ...(typeof parsedValue.hideSpectate == "object"
            ? parsedValue.hideSpectate !== null
              ? parsedValue.hideSpectate
              : {}
            : {}),
        },
        antiFade: {
          ...this.config.antiFade,
          ...(typeof parsedValue.antiFade == "object"
            ? parsedValue.antiFade !== null
              ? parsedValue.antiFade
              : {}
            : {}),
        },
        showTrophies: {
          ...this.config.showTrophies,
          ...(typeof parsedValue.showTrophies == "object"
            ? parsedValue.showTrophies !== null
              ? parsedValue.showTrophies
              : {}
            : {}),
          teams: {
            ...this.config.showTrophies.teams,
            ...(typeof parsedValue.showTrophies?.teams == "object"
              ? parsedValue.showTrophies.teams !== null
                ? parsedValue.showTrophies.teams
                : {}
              : {}),
          },
          trophies: {
            ...this.config.showTrophies.trophies,
            ...(typeof parsedValue.showTrophies?.trophies == "object"
              ? parsedValue.showTrophies.trophies !== null
                ? parsedValue.showTrophies.trophies
                : {}
              : {}),
          },
        },
        outline: {
          ...this.config.outline,
          ...parsedValue.outline,
        },
        esp: {
          ...this.config.esp,
          ...(typeof parsedValue.esp == "object"
            ? parsedValue.esp !== null
              ? parsedValue.esp
              : {}
            : {}),
          config: {
            ...this.config.esp.config,
            ...(typeof parsedValue.esp?.config == "object"
              ? parsedValue.esp.config !== null
                ? parsedValue.esp.config
                : {}
              : {}),
            tracerColors: {
              ...this.config.esp.config.tracerColors,
              ...parsedValue.esp?.config?.tracerColors,
              ownTeam: {
                ...this.config.esp.config.tracerColors.ownTeam,
                ...(parsedValue.esp?.config?.tracerColors?.ownTeam ??
                  parsedValue.esp?.config?.tracerColor ??
                  {}),
              },
              enemy: {
                ...this.config.esp.config.tracerColors.enemy,
                ...(parsedValue.esp?.config?.tracerColors?.enemy ??
                  parsedValue.esp?.config?.tracerColor ??
                  {}),
              },
            },
            rangeColors: {
              ...this.config.esp.config.rangeColors,
              ...parsedValue.esp?.config?.rangeColors,
              basic: {
                ...this.config.esp.config.rangeColors.basic,
                ...(parsedValue.esp?.config?.rangeColors?.basic ??
                  parsedValue.esp?.config?.rangeColor ??
                  {}),
              },
              super: {
                ...this.config.esp.config.rangeColors.super,
                ...(parsedValue.esp?.config?.rangeColors?.super ??
                  parsedValue.esp?.config?.rangeColor ??
                  {}),
              },
              gadget: {
                ...this.config.esp.config.rangeColors.gadget,
                ...(parsedValue.esp?.config?.rangeColors?.gadget ??
                  parsedValue.esp?.config?.rangeColor ??
                  {}),
              },
            },
          },
        },
        extendBallTrajectory: {
          ...this.config.extendBallTrajectory,
          ...(typeof parsedValue.extendBallTrajectory == "object"
            ? parsedValue.extendBallTrajectory !== null
              ? parsedValue.extendBallTrajectory
              : {}
            : {}),
        },
        autoGoal: {
          ...this.config.autoGoal,
          ...(typeof parsedValue.autoGoal == "object"
            ? parsedValue.autoGoal !== null
              ? parsedValue.autoGoal
              : {}
            : {}),
        },
        showAmmo: {
          enabled: (parsedValue.showAmmo ?? parsedValue.showEnemyAmmo)?.enabled === true,
        },
        musicPlayer: {
          ...this.config.musicPlayer,
          ...(typeof parsedValue.musicPlayer == "object"
            ? parsedValue.musicPlayer !== null
              ? parsedValue.musicPlayer
              : {}
            : {}),
        },
        themeChanger: {
          ...this.config.themeChanger,
          ...parsedValue.themeChanger,
        },
      };
      delete this.config.esp.config.tracerColor;
      delete this.config.esp.config.rangeColor;
      delete this.config.killaura.wallCheck;
      delete this.config.aimbot.allowOnAim;
      delete this.config.dynajump.config.movement;
      this.config.killaura.safetyTilesMargin =
        Math.round(
          2 * Math.min(5, Math.max(0, Number(this.config.killaura.safetyTilesMargin) || 0)),
        ) / 2;
      this.config.holdToShoot.config.safetyTilesMargin =
        Math.round(
          2 *
            Math.min(5, Math.max(0, Number(this.config.holdToShoot.config.safetyTilesMargin) || 0)),
        ) / 2;
      delete this.config.dodge.config.static.predictorDistance;
      delete this.config.dodge.config.continuous.predictorDistance;
      this.lastSavedJson = JSON.stringify(this.config);
      if (this.lastSavedJson !== jsonText) {
        File.writeAllText(this.configPath, this.lastSavedJson);
      }
    } else {
      File.writeAllText(this.configPath, JSON.stringify(this.config));
    }
    this.loaded = true;
    return;
  }
  load() {
    Pa.dodge.state = this.config.dodge.enabled;
    Object.assign(Pa.dodge.config, this.config.dodge.config);
    Object.assign(Pa.dodge.config.static, this.config.dodge.config.static);
    Object.assign(Pa.dodge.config.continuous, this.config.dodge.config.continuous);
    Pa.dodge.setMode(this.config.dodge.config.mode);
    Object.assign(Pa.dodge.ignore, this.config.dodge.ignore);
    Pa.aimbot.state = this.config.aimbot.enabled;
    Pa.aimbot.config.strength = this.config.aimbot.strength;
    Pa.aimbot.config.speedDetection = this.config.aimbot.speedDetection;
    Pa.aimbot.config.aimWhenNeeded = this.config.aimbot.aimWhenNeeded;
    Pa.aimbot.config.allowWhenAiming = this.config.aimbot.allowWhenAiming;
    Pa.hideAim.state = this.config.hideAim.enabled;
    Object.assign(Pa.hideAim.config, this.config.hideAim.config);
    Pa.killaura.state = this.config.killaura.enabled;
    Pa.killaura.config.minHealth = this.config.killaura.minHealth;
    Pa.killaura.config.hold = this.config.killaura.hold;
    Pa.killaura.config.checkRange = this.config.killaura.checkRange;
    Pa.killaura.config.cancelOnRelease = this.config.killaura.cancelOnRelease;
    Pa.killaura.config.hyperWaitForUlti = this.config.killaura.hyperWaitForUlti;
    Pa.killaura.config.safetyTilesMargin = this.config.killaura.safetyTilesMargin;
    Pa.killaura.config.useNormal = this.config.killaura.useNormal;
    Pa.killaura.config.useGadget = this.config.killaura.useGadget;
    Pa.killaura.config.useUlti = this.config.killaura.useUlti;
    Pa.killaura.config.useHyper = this.config.killaura.useHyper;
    Pa.holdToShoot.state = this.config.holdToShoot.enabled;
    Object.assign(Pa.holdToShoot.config, this.config.holdToShoot.config);
    Pa.dynajump.state = this.config.dynajump.enabled;
    Object.assign(Pa.dynajump.config, this.config.dynajump.config);
    Pa.fpsLogger.state = this.config.FPSLogger;
    Pa.fpsLogger.showMaxFPS = this.config.showMaxFPS;
    Pa.fpsLogger.rainbow = this.config.rainbowFPS;
    Pa.pingShower.state = this.config.pingShower.enabled;
    Pa.pingShower.indicatorEnabled = this.config.pingShower.indicatorEnabled;
    Pa.pingShower.rainbow = this.config.pingShower.rainbow;
    Pa.ip.state = this.config.ip.enabled;
    Pa.ip.allowCopy = this.config.ip.allowCopy;
    Pa.ip.rainbow = this.config.ip.rainbow;
    Pa.unhideNames.state = this.config.unhideNames.enabled;
    Pa.showEnemyBrawler.setEnabled(this.config.showEnemyBrawler.enabled);
    Pa.antiAFK.setEnabled(this.config.antiAFK.enabled);
    Pa.autoFarm.setOptions(this.config.autoFarm);
    Pa.hideSpectate.setEnabled(this.config.hideSpectate.enabled);
    Pa.antiFade.setEnabled(this.config.antiFade.enabled);
    Pa.showTrophies.setEnabled(this.config.showTrophies.enabled);
    Object.assign(Pa.showTrophies.config.teams, this.config.showTrophies.teams);
    Object.assign(Pa.showTrophies.config.trophies, this.config.showTrophies.trophies);
    Pa.fpsLimit.state = this.config.fpsLimit.enabled;
    Pa.fpsLimit.limit = this.config.fpsLimit.limit;
    Pa.outlineColor.enabled = this.config.outline.enabled;
    Pa.outlineColor.r = this.config.outline.r;
    Pa.outlineColor.g = this.config.outline.g;
    Pa.outlineColor.b = this.config.outline.b;
    Pa.outlineColor.a = this.config.outline.a;
    Pa.esp.state = this.config.esp.enabled;
    Object.assign(Pa.esp.config, this.config.esp.config);
    Pa.extendBallTrajectory.setEnabled(this.config.extendBallTrajectory.enabled);
    Pa.autogoal.setEnabled(this.config.autoGoal.enabled);
    Pa.showAmmo.setEnabled(this.config.showAmmo.enabled);
    Pa.musicPlayer.loadConfig(this.config.musicPlayer);
    Pa.positionLogger.state = this.config.showPlayerPosition;
    Pa.positionLogger.rainbow = this.config.rainbowPlayerPosition;
    Pa.positionLogger.updateMode =
      this.config.playerPositionUpdateMode === "custom" ? "custom" : "frame";
    Pa.positionLogger.updatesPerSecond = Math.round(
      Math.min(20, Math.max(1, Number(this.config.playerPositionUpdatesPerSecond) || 10)),
    );
    Pa.screenShake.enable = this.config.noScreenShake;
    Pa.themeChanger.selectedTheme = this.config.themeChanger.selectedTheme;
    Wi.load(this.config.menu);
    return;
  }
  update() {
    this.config.dodge = {
      enabled: Pa.dodge.state,
      config: {
        mode: Pa.dodge.config.mode,
        static: {
          ...Pa.dodge.config.static,
        },
        continuous: {
          ...Pa.dodge.config.continuous,
        },
      },
      ignore: {
        ...Pa.dodge.ignore,
      },
    };
    this.config.aimbot = {
      enabled: Pa.aimbot.state,
      strength: Pa.aimbot.config.strength,
      speedDetection: Pa.aimbot.config.speedDetection,
      aimWhenNeeded: Pa.aimbot.config.aimWhenNeeded,
      allowWhenAiming: Pa.aimbot.config.allowWhenAiming,
    };
    this.config.hideAim = {
      enabled: Pa.hideAim.state,
      config: {
        ...Pa.hideAim.config,
      },
    };
    this.config.killaura = {
      enabled: Pa.killaura.state,
      minHealth: Pa.killaura.config.minHealth,
      hold: Pa.killaura.config.hold,
      checkRange: Pa.killaura.config.checkRange,
      cancelOnRelease: Pa.killaura.config.cancelOnRelease,
      hyperWaitForUlti: Pa.killaura.config.hyperWaitForUlti,
      safetyTilesMargin: Pa.killaura.config.safetyTilesMargin,
      useNormal: Pa.killaura.config.useNormal,
      useGadget: Pa.killaura.config.useGadget,
      useUlti: Pa.killaura.config.useUlti,
      useHyper: Pa.killaura.config.useHyper,
    };
    this.config.holdToShoot = {
      enabled: Pa.holdToShoot.state,
      config: {
        ...Pa.holdToShoot.config,
      },
    };
    this.config.dynajump = {
      enabled: Pa.dynajump.state,
      config: {
        ...Pa.dynajump.config,
      },
    };
    this.config.FPSLogger = Pa.fpsLogger.state;
    this.config.showMaxFPS = Pa.fpsLogger.showMaxFPS;
    this.config.rainbowFPS = Pa.fpsLogger.rainbow;
    this.config.pingShower = {
      enabled: Pa.pingShower.state,
      indicatorEnabled: Pa.pingShower.indicatorEnabled,
      rainbow: Pa.pingShower.rainbow,
    };
    this.config.ip = {
      enabled: Pa.ip.state,
      allowCopy: Pa.ip.allowCopy,
      rainbow: Pa.ip.rainbow,
    };
    this.config.unhideNames = {
      enabled: Pa.unhideNames.state,
    };
    this.config.showEnemyBrawler = {
      enabled: Pa.showEnemyBrawler.state,
    };
    this.config.antiAFK = {
      enabled: Pa.antiAFK.state,
    };
    this.config.autoFarm = Pa.autoFarm.getStatus().settings;
    this.config.autoFarm.enabled = Pa.autoFarm.state;
    this.config.hideSpectate = {
      enabled: Pa.hideSpectate.state,
    };
    this.config.antiFade = {
      enabled: Pa.antiFade.state,
    };
    this.config.showTrophies = {
      enabled: Pa.showTrophies.state,
      teams: {
        ...Pa.showTrophies.config.teams,
      },
      trophies: {
        ...Pa.showTrophies.config.trophies,
      },
    };
    this.config.fpsLimit = {
      enabled: Pa.fpsLimit.state,
      limit: Pa.fpsLimit.limit,
    };
    this.config.outline = {
      enabled: Pa.outlineColor.enabled,
      r: Pa.outlineColor.r,
      g: Pa.outlineColor.g,
      b: Pa.outlineColor.b,
      a: Pa.outlineColor.a,
    };
    this.config.esp = {
      enabled: Pa.esp.state,
      config: {
        ...Pa.esp.config,
      },
    };
    this.config.extendBallTrajectory = {
      enabled: Pa.extendBallTrajectory.state,
    };
    this.config.autoGoal = {
      enabled: Pa.autogoal.state,
    };
    this.config.showAmmo = {
      enabled: Pa.showAmmo.state,
    };
    this.config.musicPlayer = Pa.musicPlayer.getConfig();
    this.config.showPlayerPosition = Pa.positionLogger.state;
    this.config.rainbowPlayerPosition = Pa.positionLogger.rainbow;
    this.config.playerPositionUpdateMode = Pa.positionLogger.updateMode;
    this.config.playerPositionUpdatesPerSecond = Pa.positionLogger.updatesPerSecond;
    this.config.noScreenShake = Pa.screenShake.enable;
    this.config.themeChanger.selectedTheme = Pa.themeChanger.selectedTheme;
    this.config.menu = Wi.serialize();
    const lastSavedJson = JSON.stringify(this.config);
    if (lastSavedJson !== this.lastSavedJson) {
      const fileInstance = new File(this.configPath, "w");
      fileInstance.write(lastSavedJson);
      fileInstance.close();
      this.lastSavedJson = lastSavedJson;
    }
    return;
  }
}
