/**
 * ui/theme.js
 *
 * Theme controller (colour themes for the menu/UI).
 *
 * Symbols: ThemeController, ThemeControllerAlias
 * Source: bundle lines 20229-20388 (2 statements)
 */


class ThemeController {
  static themes;
  constructor() {
    this.defaultTheme = null;
    this.selectedTheme = null;
    this.background = null;
    this.applying = false;
    return;
  }
  static {
    this.themes = [
      {
        name: "BASIC",
        key: "basic",
        index: 0,
      },
      {
        name: "WINDSTOCK 2",
        key: "windstock2",
        index: 177,
      },
      {
        name: "WINDSTOCK",
        key: "windstock",
        index: 178,
      },
      {
        name: "BACK TO SCHOOL",
        key: "backtoschool",
        index: 179,
      },
      {
        name: "COSMO",
        key: "cosmo",
        index: 180,
      },
      {
        name: "BRAWLOWEEN 26",
        key: "brawloween26",
        index: 181,
      },
      {
        name: "VINCE",
        key: "vince",
        index: 182,
      },
      {
        name: "DUOLINGO",
        key: "duolingo",
        index: 183,
      },
    ];
  }
  get homeScreen() {
    return re.instance.add(72).readPointer().add(40).readPointer();
  }
  get homeSprite() {
    const pointer = globalThis.offsets.GameMain_instance.readPointer();
    return new fe(pointer.add(104).readPointer());
  }
  static isHomeState() {
    return re.isState(re.states.HOME);
  }
  getTheme(e) {
    if (!e) {
      return null;
    }
    const toLowerCaseResult = e.toLowerCase();
    return ThemeController.themes.find((t) => t.key === toLowerCaseResult) ?? null;
  }
  getThemeByIndex(e) {
    return ThemeController.themes.find((t) => t.index === e) ?? null;
  }
  getThemeData(t) {
    return Xt.getDataById(41000000 + t.index);
  }
  get currentTheme() {
    return this.getTheme(this.selectedTheme);
  }
  isThemeActive(t) {
    const currentTheme = this.currentTheme;
    return currentTheme ? t.key === currentTheme.key : !!currentTheme;
  }
  applyTheme(t, e) {
    if (this.applying || !e) {
      return false;
    }
    this.applying = true;
    try {
      const themeData = this.getThemeData(e);
      const value = themeData.getValue("FileName");
      const value2 = themeData.getValue("ExportName");
      ws.loadAsset(value.contents);
      const movieClip = ti.getMovieClip(value.contents, value2.contents);
      const homeSprite = this.homeSprite;
      const addResult = t.add(2352);
      const addResult2 = t.add(2472);
      const pointer = addResult.readPointer();
      if (!pointer.isNull()) {
        homeSprite.removeChild(pointer);
      }
      addResult2.writePointer(themeData.ptr);
      addResult.writePointer(movieClip.instance);
      globalThis.natives.HomeScreen_layoutBackground(t);
      homeSprite.addChildAt(movieClip, 0);
      this.background = movieClip.instance;
      return true;
    } finally {
      this.applying = false;
    }
  }
  changeTheme(e, i = false) {
    const theme = this.getTheme(e);
    return theme
      ? (i || (this.selectedTheme = theme.key),
        !ThemeController.isHomeState() || this.applyTheme(this.homeScreen, theme))
      : !!theme;
  }
  setDefaultTheme() {
    this.selectedTheme = null;
    if (this.defaultTheme) {
      this.changeTheme(this.defaultTheme.key, true);
    }
    return;
  }
  detectDefaultTheme(t) {
    const pointer = t.add(2472).readPointer();
    const i = new Et(pointer);
    const instanceID = At.getInstanceID(i.globalID);
    this.defaultTheme = this.getThemeByIndex(instanceID);
    return;
  }
  update() {
    const currentTheme = this.currentTheme;
    if (!currentTheme || this.applying) {
      return;
    }
    if (!ThemeController.isHomeState()) {
      this.background = null;
      return;
    }
    const homeScreen = this.homeScreen;
    if (homeScreen.isNull()) {
      return;
    }
    if (!this.defaultTheme) {
      this.detectDefaultTheme(homeScreen);
    }
    const themeData = this.getThemeData(currentTheme);
    const pointer = homeScreen.add(2472).readPointer();
    const pointer2 = homeScreen.add(2352).readPointer();
    const r = !pointer.equals(themeData.ptr);
    const o = !this.background || !pointer2.equals(this.background);
    if (r || o) {
      this.applyTheme(homeScreen, currentTheme);
    }
    return;
  }
}

var ThemeControllerAlias = ThemeController;
