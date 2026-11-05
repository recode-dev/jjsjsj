/**
 * app/feature-registry.js
 *
 * Feature registry wiring controllers to the menu.
 *
 * Symbols: FeatureRegistry, t62, Ia, Ba, t63, Fa
 * Source: bundle lines 28761-29062 (8 statements)
 */


class FeatureRegistry {
  static dodge;
  static aimbot;
  static hideAim;
  static killaura;
  static holdToShoot;
  static fpsLogger;
  static fpsLimit;
  static pingShower;
  static ip;
  static positionLogger;
  static screenShake;
  static xray;
  static themeChanger;
  static outlineColor;
  static camera;
  static esp;
  static config;
  static dynajump;
  static restart;
  static unhideNames;
  static extendBallTrajectory;
  static autogoal;
  static showAmmo;
  static showEnemyBrawler;
  static antiAFK;
  static autoFarm;
  static hideSpectate;
  static antiFade;
  static showTrophies;
  static musicPlayer;
  constructor() {
    return;
  }
  static {
    this.dodge = null;
    this.aimbot = null;
    this.hideAim = null;
    this.killaura = null;
    this.holdToShoot = null;
    this.fpsLogger = null;
    this.fpsLimit = null;
    this.pingShower = null;
    this.ip = null;
    this.positionLogger = null;
    this.screenShake = null;
    this.xray = null;
    this.themeChanger = null;
    this.outlineColor = null;
    this.camera = null;
    this.esp = null;
    this.config = null;
    this.dynajump = null;
    this.restart = null;
    this.unhideNames = null;
    this.extendBallTrajectory = null;
    this.autogoal = null;
    this.showAmmo = null;
    this.showEnemyBrawler = null;
    this.antiAFK = null;
    this.autoFarm = null;
    this.hideSpectate = null;
    this.antiFade = null;
    this.showTrophies = null;
    this.musicPlayer = null;
  }
  static init() {
    this.config = new Bs();
    this.config.readOrCreateConfig();
    this.dodge ||= new DodgeController();
    this.aimbot ||= new AimAssistController();
    this.autogoal ||= new GoalAssistControllerAlias();
    this.hideAim ||= new AimVisibilityController();
    this.killaura ||= new AutoSkillController();
    this.holdToShoot ||= new HoldToShootController();
    this.dynajump ||= new DynaJumpController();
    this.restart ||= new RestartController();
    this.unhideNames ||= new ProfileNameOverlay();
    this.extendBallTrajectory ||= new BallTrajectoryOverlayAlias();
    this.fpsLogger ||= new FpsOverlay();
    this.fpsLimit ||= new FrameRateController();
    this.pingShower ||= new PingOverlay();
    this.ip ||= new ServerAddressOverlayAlias(this.pingShower, this.fpsLogger);
    this.positionLogger ||= new PositionOverlay(this.fpsLogger);
    this.screenShake ||= new CameraShakeController();
    if (!this.xray) {
      this.xray = xray;
      this.xray.patch();
    }
    this.themeChanger ||= new ThemeControllerAlias();
    if (!this.outlineColor) {
      this.outlineColor = outlineColor;
      this.outlineColor.patch();
    }
    this.camera ||= new CameraController();
    this.esp ||= new EntityOverlayController();
    this.showAmmo ||= new AmmoOverlay();
    this.showEnemyBrawler ||= new EnemyBrawlerOverlay();
    this.autoFarm ||= new AutoFarmController(this.aimbot);
    this.antiAFK ||= new InactivityController();
    this.hideSpectate ||= new SpectatorStatusController();
    this.antiFade ||= new FadeController();
    this.showTrophies ||= new TrophyOverlay();
    this.musicPlayer ||= new MusicPlayer();
    this.config.load();
    ws.updateObjects.add(FeatureRegistry);
    return;
  }
  static toggleDodge() {
    this.dodge.toggle();
    return this.dodge.state;
  }
  static toggleAimbot() {
    this.aimbot.toggle();
    return this.aimbot.state;
  }
  static toggleAutogoal() {
    return this.autogoal.toggle();
  }
  static toggleShowAmmo() {
    return this.showAmmo.toggle();
  }
  static toggleKillaura() {
    this.killaura.toggle();
    return this.killaura.state;
  }
  static toggleHoldToShoot() {
    this.holdToShoot.toggle();
    return this.holdToShoot.state;
  }
  static toggleDynaJump() {
    return this.dynajump.toggle();
  }
  static restartGame() {
    return this.restart.restart();
  }
  static toggleFps() {
    this.fpsLogger.toggle();
    return this.fpsLogger.state;
  }
  static togglePosition() {
    this.positionLogger.toggle();
    return this.positionLogger.state;
  }
  static getScreenShake() {
    return this.screenShake;
  }
  static getXray() {
    return this.xray;
  }
  static getThemeChanger() {
    return this.themeChanger;
  }
  static getOutlineColor() {
    return this.outlineColor;
  }
  static getCamera() {
    return this.camera;
  }
  static setOutlineColor(t, e, i, s = 255) {
    this.outlineColor.setColor(t, e, i, s);
    return;
  }
  static setBlueOutline() {
    this.setOutlineColor(135, 206, 235, 255);
    return;
  }
  static setCameraMode(mode) {
    this.camera.mode = mode;
    return this.camera.mode;
  }
  static changeTheme(t) {
    return this.themeChanger.changeTheme(t);
  }
  static getThemes() {
    return ThemeControllerAlias.themes;
  }
  static update() {
    if (this.config.loaded) {
      this.config.update();
    }
    ka.update();
    this.fpsLogger.update();
    this.fpsLimit.update();
    this.pingShower.update();
    this.ip.update();
    this.positionLogger.update();
    this.themeChanger.update();
    this.hideAim.update();
    this.unhideNames.update();
    this.extendBallTrajectory.update();
    this.autogoal.update();
    this.dynajump.update();
    this.showAmmo.update();
    this.showTrophies.update();
    this.musicPlayer.update();
    this.autoFarm.update();
    this.esp.update();
    return;
  }
}

Pa = FeatureRegistry;

_a = Pa;

class t62 {
  static instance;
  static patched;
  static state;
  constructor() {
    return;
  }
  static {
    this.instance = new t62();
    this.patched = false;
    this.state = {
      isBattling: false,
    };
  }
  get ptr() {
    return globalThis.offsets.MessageManager_instance.readPointer();
  }
  static get receiveMessage() {
    this._receiveMessage ||= new NativeFunction(
      globalThis.offsets.MessageManager_receiveMessage,
      "int",
      ["pointer", "pointer"],
    );
    return this._receiveMessage;
  }
  static patch() {
    if (!this.patched) {
      this.patched = true;
      Interceptor.attach(this.receiveMessage, {
        onEnter(e) {
          let var1 = new xe(e[1]).type;
          switch (var1) {
            case 10100:
              Ct.patch();
              return;
            case 20559:
              de.setPlayers();
              t62.state.isBattling = true;
              Pa.getXray().show();
              Ce.hook();
              return;
            case 20104:
              if (!vs.isStarted) {
                vs.start();
              }
              if (vs.isStarted && vs.instance.shouldRestartGui) {
                vs.instance.startGUI();
              }
            default:
              return;
          }
        },
      });
    }
    return;
  }
}

var Ia = t62;

var Ba = Ia;

class t63 {
  static instance;
  static patched;
  constructor() {
    return;
  }
  static {
    this.instance = new t63();
    this.patched = false;
  }
  get ptr() {
    return Ba.instance.ptr.add(112).readPointer();
  }
  static get send() {
    this._send ||= new NativeFunction(globalThis.offsets.Messaging_send, "int", [
      "pointer",
      "pointer",
    ]);
    return this._send;
  }
  static patch() {
    if (!this.patched) {
      this.patched = true;
      Ba.patch();
      Interceptor.attach(this.send, {
        onEnter(t) {
          let e = 0;
          e = new xe(t[1]).type;
          if (e === 10100) {
            Ct.patch();
            Ba.patch();
          }
          return;
        },
      });
    }
    return;
  }
}

var Fa = t63;
