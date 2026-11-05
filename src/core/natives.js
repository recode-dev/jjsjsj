/**
 * core/natives.js
 *
 * NativeFunction bindings built from the offset table (signatures for the game engine ABI).
 *
 * Symbols: pt
 * Source: bundle lines 1504-2269 (1 statements)
 */


function pt(t) {
  const e = gt(t);
  return {
    wendelstein_renderSprite: new NativeFunction(e.wendelstein_renderSprite, "void", [
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "int",
      "int",
    ]),
    AttackRadiusSprite_ctor: new NativeFunction(e.AttackRadiusSprite_ctor, "void", [
      "pointer",
      "float",
      "float",
      "float",
      "float",
      "float",
    ]),
    AttackRadiusSprite_set: new NativeFunction(e.AttackRadiusSprite_set, "void", [
      "pointer",
      "float",
      "float",
      "float",
      "float",
      "float",
    ]),
    PathSprite_ctor: new NativeFunction(e.PathSprite_ctor, "pointer", [
      "pointer",
      "pointer",
      "int",
      "float",
    ]),
    PathSprite_updateShape: new NativeFunction(e.PathSprite_updateShape, "pointer", [
      "pointer",
      "pointer",
      "float",
      "float",
      "float",
    ]),
    PathSprite_dtor: new NativeFunction(e.PathSprite_dtor, "void", ["pointer"]),
    FramerateManager_setSegment: new NativeFunction(e.FramerateManager_setSegment, "void", [
      "pointer",
      "int",
    ]),
    GameScreen_getLogicBattle: new NativeFunction(e.GameScreen_getLogicBattle, "pointer", [
      "pointer",
    ]),
    BattleScreen_tryToActivateSkillOtherPlayer: new NativeFunction(
      e.BattleScreen_tryToActivateSkillOtherPlayer,
      "int",
      ["pointer", "pointer", "pointer", "int", "int", "bool", "int"],
    ),
    BattleScreen_tryToActivateSkill: new NativeFunction(e.BattleScreen_tryToActivateSkill, "int", [
      "pointer",
      "pointer",
      "pointer",
      "int",
      "int",
      "bool",
      "int",
    ]),
    BattleScreen_activateSkill: new NativeFunction(e.BattleScreen_activateSkill, "int", [
      "pointer",
      "int",
      "int",
      "pointer",
      "pointer",
      "bool",
      "int",
    ]),
    BattleScreen_handleTouchCancelled: new NativeFunction(
      e.BattleScreen_handleTouchCancelled,
      "int64",
      ["pointer", "uint"],
    ),
    BattleScreen_canActivateSkill: new NativeFunction(e.BattleScreen_canActivateSkill, "int", [
      "pointer",
      "pointer",
      "pointer",
    ]),
    BattleScreen_handleAutoShoot: new NativeFunction(e.BattleScreen_handleAutoShoot, "int", [
      "pointer",
      "pointer",
    ]),
    BattleScreen_handleAutoShootOtherPlayer: new NativeFunction(
      e.BattleScreen_handleAutoShootOtherPlayer,
      "int",
      ["pointer", "pointer"],
    ),
    BattleScreen_getClosestTargetForAutoshoot: new NativeFunction(
      e.BattleScreen_getClosestTargetForAutoshoot,
      "pointer",
      ["pointer", "pointer", "int", "bool", "bool", "pointer", "bool", "bool", "int"],
    ),
    BattleScreen_getShootStickBgX: new NativeFunction(e.BattleScreen_getShootStickBgX, "float", [
      "pointer",
    ]),
    BattleScreen_getShootStickBgY: new NativeFunction(e.BattleScreen_getShootStickBgY, "float", [
      "pointer",
    ]),
    BattleScreen_getShootStickX: new NativeFunction(e.BattleScreen_getShootStickX, "float", [
      "pointer",
    ]),
    BattleScreen_getShootStickY: new NativeFunction(e.BattleScreen_getShootStickY, "float", [
      "pointer",
    ]),
    BattleScreen_getUltiStickBgX: new NativeFunction(e.BattleScreen_getUltiStickBgX, "float", [
      "pointer",
    ]),
    BattleScreen_getUltiStickBgY: new NativeFunction(e.BattleScreen_getUltiStickBgY, "float", [
      "pointer",
    ]),
    BattleScreen_getUltiStickX: new NativeFunction(e.BattleScreen_getUltiStickX, "float", [
      "pointer",
    ]),
    BattleScreen_getUltiStickY: new NativeFunction(e.BattleScreen_getUltiStickY, "float", [
      "pointer",
    ]),
    BattleScreen_isShootStickActive: new NativeFunction(e.BattleScreen_isShootStickActive, "uint", [
      "pointer",
    ]),
    BattleScreen_isUltiStickActive: new NativeFunction(e.BattleScreen_isUltiStickActive, "uint", [
      "pointer",
    ]),
    BattleScreen_isBonusSkillStickActive: new NativeFunction(
      e.BattleScreen_isBonusSkillStickActive,
      "uint",
      ["pointer"],
    ),
    BattleScreen_getCombatHUD: new NativeFunction(e.BattleScreen_getCombatHUD, "pointer", [
      "pointer",
    ]),
    BattleScreen_getBonusSkillStickBgX: new NativeFunction(
      e.BattleScreen_getBonusSkillStickBgX,
      "float",
      ["pointer"],
    ),
    BattleScreen_getBonusSkillStickBgY: new NativeFunction(
      e.BattleScreen_getBonusSkillStickBgY,
      "float",
      ["pointer"],
    ),
    BattleScreen_getBonusSkillStickX: new NativeFunction(
      e.BattleScreen_getBonusSkillStickX,
      "float",
      ["pointer"],
    ),
    BattleScreen_getBonusSkillStickY: new NativeFunction(
      e.BattleScreen_getBonusSkillStickY,
      "float",
      ["pointer"],
    ),
    BattleScreen_convertToControlScheme: new NativeFunction(
      e.BattleScreen_convertToControlScheme,
      "uint64",
      ["pointer", "pointer", "pointer"],
    ),
    BattleScreen_calculateNewMovePosition: new NativeFunction(
      e.BattleScreen_calculateNewMovePosition,
      ["int", "int"],
      ["pointer", "pointer", "pointer", "int", "float", "float"],
    ),
    LogicGameObjectClient_getX: new NativeFunction(e.LogicGameObjectClient_getX, "int", [
      "pointer",
    ]),
    LogicGameObjectClient_getY: new NativeFunction(e.LogicGameObjectClient_getY, "int", [
      "pointer",
    ]),
    LogicGameObjectClient_getZ: new NativeFunction(e.LogicGameObjectClient_getZ, "int", [
      "pointer",
    ]),
    GameObject_getTeam: new NativeFunction(e.GameObject_getTeam, "int", ["pointer"]),
    LogicGameObjectClient_getData: new NativeFunction(e.LogicGameObjectClient_getData, "pointer", [
      "pointer",
    ]),
    LogicGameObjectClient_getCurrentTeamIndex: new NativeFunction(
      e.LogicGameObjectClient_getCurrentTeamIndex,
      "int",
      ["pointer", "pointer"],
    ),
    LogicGameObjectManagerClient_findGameObject: new NativeFunction(
      e.LogicGameObjectManagerClient_findGameObject,
      "pointer",
      ["pointer", "int", "int"],
    ),
    LogicCharacterClient_getControlledProjectile: new NativeFunction(
      e.LogicCharacterClient_getControlledProjectile,
      "pointer",
      ["pointer", "pointer"],
    ),
    LogicCharacterClient_isAttached: new NativeFunction(e.LogicCharacterClient_isAttached, "int", [
      "pointer",
    ]),
    LogicCharacterClient_isPet: new NativeFunction(e.LogicCharacterClient_isPet, "int", [
      "pointer",
    ]),
    LogicCharacterClient_isImmuneAndBulletsGoThrough: new NativeFunction(
      e.LogicCharacterClient_isImmuneAndBulletsGoThrough,
      "int",
      ["pointer"],
    ),
    LogicTileMap_isPlayerLineOfSightClear: new NativeFunction(
      e.LogicTileMap_isPlayerLineOfSightClear,
      "int",
      ["pointer", "int", "int", "int", "int"],
    ),
    BattleEndPopup_proceedToNextState: new NativeFunction(
      e.BattleEndPopup_proceedToNextState,
      "void",
      ["pointer", "int"],
    ),
    HomeMode_getInstance: new NativeFunction(e.HomeMode_getInstance, "pointer", []),
    HomeMode_getHomeScreen: new NativeFunction(e.HomeMode_getHomeScreen, "pointer", ["pointer"]),
    TeamManager_getInstance: new NativeFunction(e.TeamManager_getInstance, "pointer", []),
    TeamManager_isPlayerReady: new NativeFunction(e.TeamManager_isPlayerReady, "int", ["pointer"]),
    TeamManager_createTeam: new NativeFunction(e.TeamManager_createTeam, "void", [
      "pointer",
      "uint",
      "uint",
      "uint",
      "pointer",
    ]),
    TeamSetMemberReadyMessage_ctor: new NativeFunction(e.TeamSetMemberReadyMessage_ctor, "void", [
      "pointer",
    ]),
    HomeMode_getPlayerAvatar: new NativeFunction(e.HomeMode_getPlayerAvatar, "pointer", [
      "pointer",
    ]),
    HomeMode_getPlayerData: new NativeFunction(e.HomeMode_getPlayerData, "pointer", ["pointer"]),
    LogicDailyData_getSelectedCharacter: new NativeFunction(
      e.LogicDailyData_getSelectedCharacter,
      "pointer",
      ["pointer", "int"],
    ),
    LogicData_getName: new NativeFunction(e.LogicData_getName, "pointer", ["pointer"]),
    LogicDataTables_getCharacterByName: new NativeFunction(
      e.LogicDataTables_getCharacterByName,
      "pointer",
      ["pointer", "int"],
    ),
    LogicClientAvatar_isHeroOrItemUnlocked: new NativeFunction(
      e.LogicClientAvatar_isHeroOrItemUnlocked,
      "int",
      ["pointer", "pointer"],
    ),
    LogicClientAvatar_getHeroLevel: new NativeFunction(e.LogicClientAvatar_getHeroLevel, "int", [
      "pointer",
      "pointer",
    ]),
    LogicClientAvatar_getHeroScore: new NativeFunction(e.LogicClientAvatar_getHeroScore, "int", [
      "pointer",
      "pointer",
    ]),
    LogicClientAvatar_getScore: new NativeFunction(e.LogicClientAvatar_getScore, "int", [
      "pointer",
    ]),
    LogicSelectCharacterCommand_ctor: new NativeFunction(
      e.LogicSelectCharacterCommand_ctor,
      "void",
      ["pointer", "pointer", "int"],
    ),
    HomeMode_addCommand: new NativeFunction(e.HomeMode_addCommand, "void", ["pointer", "pointer"]),
    LogicGameObjectManagerClient_findCharacter: new NativeFunction(
      e.LogicGameObjectManagerClient_findCharacter,
      "pointer",
      ["pointer", "int"],
    ),
    LogicBattleModeClient_hasEventModifier: new NativeFunction(
      e.LogicBattleModeClient_hasEventModifier,
      "bool",
      ["pointer", "int"],
    ),
    LogicBattleModeClient_isGameOverOrRoundResetting: new NativeFunction(
      e.LogicBattleModeClient_isGameOverOrRoundResetting,
      "int",
      ["pointer"],
    ),
    LogicBattleModeClient_getTileMap: new NativeFunction(
      e.LogicBattleModeClient_getTileMap,
      "pointer",
      ["pointer"],
    ),
    LogicBattleModeClient_getOwnCharacter: new NativeFunction(
      e.LogicBattleModeClient_getOwnCharacter,
      "pointer",
      ["pointer"],
    ),
    LogicBattleModeClient_getOwnPlayerTeam: new NativeFunction(
      e.LogicBattleModeClient_getOwnPlayerTeam,
      "uint32",
      ["pointer"],
    ),
    LogicBattleModeClient_setClientPredictionMoveTo: new NativeFunction(
      e.LogicBattleModeClient_setClientPredictionMoveTo,
      "pointer",
      ["pointer", "int", "int", "bool"],
    ),
    LogicBattleModeClient_isUltiReadyForClient: new NativeFunction(
      e.LogicBattleModeClient_isUltiReadyForClient,
      "int",
      ["pointer", "pointer"],
    ),
    LogicBattleModeClient_isBonusSkillReadyForClient: new NativeFunction(
      e.LogicBattleModeClient_isBonusSkillReadyForClient,
      "int",
      ["pointer", "pointer"],
    ),
    LogicProjectileClient_decode: new NativeFunction(e.LogicProjectileClient_decode, "void", [
      "pointer",
      "pointer",
      "int",
      "bool",
    ]),
    Character_getAngle: new NativeFunction(e.Character_getAngle, "float", ["pointer"]),
    LogicCharacterClient_getCharacterData: new NativeFunction(
      e.LogicCharacterClient_getCharacterData,
      "pointer",
      ["pointer"],
    ),
    LogicCharacterClient_getCarryable: new NativeFunction(
      e.LogicCharacterClient_getCarryable,
      "pointer",
      ["pointer", "pointer"],
    ),
    LogicCharacterServer_getSizeSubTilesForPathfinding: new NativeFunction(
      e.LogicCharacterServer_getSizeSubTilesForPathfinding,
      "int",
      ["pointer"],
    ),
    LogicCharacterClient_canMoveThroughWalls: new NativeFunction(
      e.LogicCharacterClient_canMoveThroughWalls,
      "int",
      ["pointer"],
    ),
    LogicCharacterClient_canWalkOnWater: new NativeFunction(
      e.LogicCharacterClient_canWalkOnWater,
      "int",
      ["pointer"],
    ),
    LogicCharacterData_getCollisionRadius: new NativeFunction(
      e.LogicCharacterData_getCollisionRadius,
      "uint32",
      ["pointer"],
    ),
    LogicCharacterData_getCarryableData: new NativeFunction(
      e.LogicCharacterData_getCarryableData,
      "pointer",
      ["pointer"],
    ),
    LogicCharacterData_getProjectileStartRadius: new NativeFunction(
      e.LogicCharacterData_getProjectileStartRadius,
      "int",
      ["pointer"],
    ),
    LogicCharacterData_getSpeed: new NativeFunction(e.LogicCharacterData_getSpeed, "uint32", [
      "pointer",
    ]),
    LogicGamePlayUtil_getRangeAddTiles: new NativeFunction(
      e.LogicGamePlayUtil_getRangeAddTiles,
      "uint",
      ["pointer", "pointer", "pointer", "uint", "int", "int", "int"],
    ),
    LogicGamePlayUtil_getHoldRangeAddLogic: new NativeFunction(
      e.LogicGamePlayUtil_getHoldRangeAddLogic,
      "int",
      ["pointer", "pointer", "pointer"],
    ),
    LogicGamePlayUtil_getEffectiveWeaponRange: new NativeFunction(
      e.LogicGamePlayUtil_getEffectiveWeaponRange,
      "uint",
      ["pointer", "uint", "pointer", "pointer"],
    ),
    LogicGamePlayUtil_lineSegmentIntersectsRectangle: new NativeFunction(
      e.LogicGamePlayUtil_lineSegmentIntersectsRectangle,
      "int",
      ["int", "int", "int", "int", "int", "int", "int", "int", "pointer"],
    ),
    LogicGamePlayUtil_getClosestWorldCollision: new NativeFunction(
      e.LogicGamePlayUtil_getClosestWorldCollision,
      "uint",
      ["int", "int", "int", "int", "pointer", "pointer", "int", "int", "int", "int"],
    ),
    LogicGamePlayUtil_getClosestLevelBorderCollision: new NativeFunction(
      e.LogicGamePlayUtil_getClosestLevelBorderCollision,
      "uint",
      ["int", "int", "int", "int", "pointer", "int", "pointer"],
    ),
    LogicGamePlayUtil_getClosestAnyCollision: new NativeFunction(
      e.LogicGamePlayUtil_getClosestAnyCollision,
      "uint",
      ["int", "int", "int", "int", "pointer", "pointer", "int", "int", "int", "int"],
    ),
    LogicGamePlayUtil_getDamageForTile: new NativeFunction(
      e.LogicGamePlayUtil_getDamageForTile,
      "uint",
      ["pointer", "uint", "uint"],
    ),
    LogicProjectileServer_handleCollisions: new NativeFunction(
      e.LogicProjectileServer_handleCollisions,
      "int",
      ["pointer"],
    ),
    LogicProjectileServer_isTileIntersection: new NativeFunction(
      e.LogicProjectileServer_isTileIntersection,
      "int",
      ["int", "int", "int", "int", "pointer", "int", "int", "pointer"],
    ),
    LogicTraitController_getValue: new NativeFunction(e.LogicTraitController_getValue, "int", [
      "pointer",
      "pointer",
      "int",
    ]),
    LogicTraitController_getValueWithContext: new NativeFunction(
      e.LogicTraitController_getValueWithContext,
      "int",
      ["pointer", "pointer", "int", "pointer"],
    ),
    LogicCharacterClient_canCastSkill: new NativeFunction(
      e.LogicCharacterClient_canCastSkill,
      "int",
      ["pointer", "pointer", "pointer"],
    ),
    LogicCharacterClient_getWeaponSkillClient: new NativeFunction(
      e.LogicCharacterClient_getWeaponSkillClient,
      "pointer",
      ["pointer"],
    ),
    LogicCharacterClient_getSkillByEquipType: new NativeFunction(
      e.LogicCharacterClient_getSkillByEquipType,
      "pointer",
      ["pointer", "int"],
    ),
    LogicCharacterClientOwn_getNextSkillClient: new NativeFunction(
      e.LogicCharacterClientOwn_getNextSkillClient,
      "pointer",
      ["pointer", "pointer"],
    ),
    LogicCharacterClientOwn_getUltiSkillClient: new NativeFunction(
      e.LogicCharacterClientOwn_getUltiSkillClient,
      "pointer",
      ["pointer"],
    ),
    LogicCharacterClientOwn_setUltiButtonActiveClient: new NativeFunction(
      e.LogicCharacterClientOwn_setUltiButtonActiveClient,
      "void",
      ["pointer", "int"],
    ),
    LogicCharacterClientOwn_setBonusSkillButtonActiveClient: new NativeFunction(
      e.LogicCharacterClientOwn_setBonusSkillButtonActiveClient,
      "void",
      ["pointer", "int"],
    ),
    LogicCharacterClientOwn_getBonusSkillModeOnClient: new NativeFunction(
      e.LogicCharacterClientOwn_getBonusSkillModeOnClient,
      "int",
      ["pointer"],
    ),
    LogicCharacterClientOwn_getUltiModeOnClient: new NativeFunction(
      e.LogicCharacterClientOwn_getUltiModeOnClient,
      "int",
      ["pointer"],
    ),
    LogicCharacterClientOwn_setAttackStartedClient: new NativeFunction(
      e.LogicCharacterClientOwn_setAttackStartedClient,
      "int64",
      ["pointer", "pointer", "int", "int"],
    ),
    LogicSkillClient_canActivate: new NativeFunction(e.LogicSkillClient_canActivate, "int", [
      "pointer",
      "pointer",
      "pointer",
    ]),
    LogicSkillClient_hasAmmoToActivate: new NativeFunction(
      e.LogicSkillClient_hasAmmoToActivate,
      "int",
      ["pointer", "pointer", "pointer"],
    ),
    LogicSkillData_getCastingRangeSubtiles: new NativeFunction(
      e.LogicSkillData_getCastingRangeSubtiles,
      "int",
      ["pointer"],
    ),
    LogicSkillData_getMaxCastingRangeSubtiles: new NativeFunction(
      e.LogicSkillData_getMaxCastingRangeSubtiles,
      "int",
      ["pointer"],
    ),
    LogicSkillClient_getData: new NativeFunction(e.LogicSkillClient_getData, "pointer", [
      "pointer",
      "int",
    ]),
    LogicPlayer_getUpgrades: new NativeFunction(e.LogicPlayer_getUpgrades, "pointer", ["pointer"]),
    LogicPlayer_getCardValueForPassive: new NativeFunction(
      e.LogicPlayer_getCardValueForPassive,
      "int",
      ["pointer", "int", "int"],
    ),
    LogicPlayer_hasBotDisplayName: new NativeFunction(e.LogicPlayer_hasBotDisplayName, "int", [
      "pointer",
    ]),
    CombatHUD_bonusSkillButtonActivated: new NativeFunction(
      e.CombatHUD_bonusSkillButtonActivated,
      "void",
      ["pointer", "int"],
    ),
    BattleScreen_refreshAccessoryRangeIndicator: new NativeFunction(
      e.BattleScreen_refreshAccessoryRangeIndicator,
      "void",
      ["pointer", "int"],
    ),
    BattleMode_getInstance: new NativeFunction(e.BattleMode_getInstance, "pointer", []),
    ClientInputManager_addInput: new NativeFunction(e.ClientInputManager_addInput, "void", [
      "pointer",
      "pointer",
    ]),
    ClientInputManager_update: new NativeFunction(e.ClientInputManager_update, "void", [
      "pointer",
      "double",
      "float",
    ]),
    ClientInputManager_ctor: new NativeFunction(e.ClientInputManager_ctor, "pointer", ["pointer"]),
    ClientInput_ctor: new NativeFunction(e.ClientInput_ctor, "pointer", ["pointer", "int"]),
    ClientInput_copyCtor: new NativeFunction(e.ClientInput_copyCtor, "pointer", [
      "pointer",
      "pointer",
    ]),
    ClientInputMessage_ctor: new NativeFunction(e.ClientInputMessage_ctor, "pointer", ["pointer"]),
    ClientInputMessage_addInput: new NativeFunction(e.ClientInputMessage_addInput, "void", [
      "pointer",
      "pointer",
    ]),
    LogicGameObjectClient_getGlobalID: new NativeFunction(
      e.LogicGameObjectClient_getGlobalID,
      "int",
      ["pointer"],
    ),
    LogicProjectileData_getRadius: new NativeFunction(e.LogicProjectileData_getRadius, "int", [
      "pointer",
    ]),
    LogicProjectileData_getGravityForRendering: new NativeFunction(
      e.LogicProjectileData_getGravityForRendering,
      "int",
      ["pointer"],
    ),
    LogicProjectileClient_getInitialZSpeed: new NativeFunction(
      e.LogicProjectileClient_getInitialZSpeed,
      "int",
      ["int", "int", "int", "int"],
    ),
    LogicItemData_getLifetime: new NativeFunction(e.LogicItemData_getLifetime, "uint", ["pointer"]),
    EccDigest_getResult: new NativeFunction(e.EccDigest_getResult, "uint", []),
    Stage_addChild: new NativeFunction(e.Stage_addChild, "pointer", ["pointer", "pointer"]),
    Sprite_Sprite: new NativeFunction(e.Sprite_Sprite, "pointer", ["pointer", "int"]),
    Sprite_addChild: new NativeFunction(e.Sprite_addChild, "pointer", ["pointer", "pointer"]),
    Sprite_addChildAt: new NativeFunction(e.Sprite_addChildAt, "void", [
      "pointer",
      "pointer",
      "int",
    ]),
    Sprite_removeChildAt: new NativeFunction(e.Sprite_removeChildAt, "int64", ["pointer", "int"]),
    DisplayObject_setPixelSnappedXY: new NativeFunction(e.DisplayObject_setPixelSnappedXY, "void", [
      "pointer",
      "float",
      "float",
    ]),
    ScrollArea_ScrollArea: new NativeFunction(e.ScrollArea_ScrollArea, "void", [
      "pointer",
      "int",
      "float",
      "float",
    ]),
    ScrollArea_scrollTo: new NativeFunction(e.ScrollArea_scrollTo, "void", [
      "pointer",
      "float",
      "float",
      "float",
      "float",
    ]),
    ScrollArea_removeAllContent: new NativeFunction(e.ScrollArea_removeAllContent, "void", [
      "pointer",
    ]),
    MovieClip_getChildByName: new NativeFunction(e.MovieClip_getChildByName, "pointer", [
      "pointer",
      "pointer",
    ]),
    MovieClip_getTextFieldByName: new NativeFunction(e.MovieClip_getTextFieldByName, "pointer", [
      "pointer",
      "pointer",
    ]),
    MovieClip_gotoAndStopFrameIndex: new NativeFunction(e.MovieClip_gotoAndStopFrameIndex, "void", [
      "pointer",
      "int",
    ]),
    MovieClip_gotoAndPlayToFrameIndexAnyDirection: new NativeFunction(
      e.MovieClip_gotoAndPlayToFrameIndexAnyDirection,
      "void",
      ["pointer", "int", "int"],
    ),
    GUI_showFloaterTextAtDefaultPos: new NativeFunction(e.GUI_showFloaterTextAtDefaultPos, "void", [
      "pointer",
      "pointer",
      "int",
      "int",
      "float",
    ]),
    Application_copyString: new NativeFunction(e.Application_copyString, "void", ["pointer"]),
    TextField_setText: new NativeFunction(e.TextField_setText, "void", ["pointer", "pointer"]),
    TextField_setMultiline: new NativeFunction(e.TextField_setMultiline, "void", [
      "pointer",
      "bool",
    ]),
    GameButton_GameButton: new NativeFunction(e.GameButton_GameButton, "void", ["pointer"]),
    DropGUIContainer_DropGUIContainer: new NativeFunction(
      e.DropGUIContainer_DropGUIContainer,
      "void",
      ["pointer", "pointer"],
    ),
    GameStateManager_changeToState: new NativeFunction(e.GameStateManager_changeToState, "void", [
      "pointer",
    ]),
    Screen_getHeight: new NativeFunction(e.Screen_getHeight, "uint", []),
    Screen_getDpiClass: new NativeFunction(e.Screen_getDpiClass, "uint", []),
    RenderSystem_getShakeX: new NativeFunction(e.RenderSystem_getShakeX, "float", ["pointer"]),
    RenderSystem_getShakeY: new NativeFunction(e.RenderSystem_getShakeY, "float", ["pointer"]),
    HomeScreen_layoutBackground: new NativeFunction(e.HomeScreen_layoutBackground, "void", [
      "pointer",
    ]),
    GameSliderComponent_GameSliderComponent: new NativeFunction(
      e.GameSliderComponent_GameSliderComponent,
      "void",
      ["pointer", "pointer", "pointer", "uint32", "bool"],
    ),
    SceneRendererFactory_createHeroSprite: new NativeFunction(
      e.SceneRendererFactory_createHeroSprite,
      "pointer",
      [
        "int",
        "pointer",
        "pointer",
        "pointer",
        "int",
        "uint8",
        "int",
        "int",
        "float",
        "float",
        "uint8",
      ],
    ),
    SceneRenderer_update: new NativeFunction(e.SceneRenderer_update, "void", [
      "pointer",
      "float",
      "int",
      "int",
    ]),
    SceneCharacter_setDefaultAnimation: new NativeFunction(
      e.SceneCharacter_setDefaultAnimation,
      "void",
      ["pointer", "int", "float"],
    ),
    SceneCharacter_updateFace: new NativeFunction(e.SceneCharacter_updateFace, "void", [
      "pointer",
      "pointer",
      "float",
    ]),
    LogicTileMap_getTile: new NativeFunction(e.LogicTileMap_getTile, "pointer", [
      "pointer",
      "int",
      "int",
    ]),
    LogicTileMap_logicToPathFinderTile: new NativeFunction(
      e.LogicTileMap_logicToPathFinderTile,
      "int",
      ["int"],
    ),
    LogicTileMap_isPassablePathFinder: new NativeFunction(
      e.LogicTileMap_isPassablePathFinder,
      "int",
      ["pointer", "int", "int", "int", "int", "int"],
    ),
    LogicTileData_isWater: new NativeFunction(e.LogicTileData_isWater, "int", ["pointer"]),
    LogicTileData_getCollisionMargin: new NativeFunction(
      e.LogicTileData_getCollisionMargin,
      "int",
      ["pointer"],
    ),
    LogicTileData_blocksMovement: new NativeFunction(e.LogicTileData_blocksMovement, "int", [
      "pointer",
    ]),
    LogicTileData_blocksProjectiles: new NativeFunction(e.LogicTileData_blocksProjectiles, "int", [
      "pointer",
    ]),
    LogicTileData_isDestructibleWithPiercing: new NativeFunction(
      e.LogicTileData_isDestructibleWithPiercing,
      "int",
      ["pointer"],
    ),
    LogicTileData_isDestructibleAny: new NativeFunction(e.LogicTileData_isDestructibleAny, "int", [
      "pointer",
    ]),
    LogicTileData_isDamageable: new NativeFunction(e.LogicTileData_isDamageable, "int", [
      "pointer",
    ]),
    LogicTileData_isDestructibleOvertime: new NativeFunction(
      e.LogicTileData_isDestructibleOvertime,
      "int",
      ["pointer"],
    ),
    TextInput_setMaxTextLength: new NativeFunction(e.TextInput_setMaxTextLength, "void", [
      "pointer",
      "uint",
    ]),
    GameInputField_GameInputField: new NativeFunction(e.GameInputField_GameInputField, "void", [
      "pointer",
      "pointer",
      "pointer",
    ]),
    SoundSystem_getInstance: new NativeFunction(e.SoundSystem_getInstance, "pointer", []),
    SoundSystem_loadSound: new NativeFunction(e.SoundSystem_loadSound, "uint", [
      "pointer",
      "pointer",
    ]),
    SoundSystem_unloadSound: new NativeFunction(e.SoundSystem_unloadSound, "void", [
      "pointer",
      "uint",
    ]),
    SoundSystem_playSound: new NativeFunction(e.SoundSystem_playSound, "uint", [
      "pointer",
      "uint",
      "int",
      "float",
    ]),
    SoundSystem_stopChannel: new NativeFunction(e.SoundSystem_stopChannel, "int", [
      "pointer",
      "int",
    ]),
    SoundSystem_getSoundLength: new NativeFunction(e.SoundSystem_getSoundLength, "float", [
      "pointer",
      "uint",
    ]),
    FMOD_System_getChannel: new NativeFunction(e.FMOD_System_getChannel, "int", [
      "pointer",
      "int",
      "pointer",
    ]),
    FMOD_System_createChannelGroup: new NativeFunction(e.FMOD_System_createChannelGroup, "int", [
      "pointer",
      "pointer",
      "pointer",
    ]),
    FMOD_Channel_setChannelGroup: new NativeFunction(e.FMOD_Channel_setChannelGroup, "int", [
      "pointer",
      "pointer",
    ]),
    FMOD_Channel_setPosition: new NativeFunction(e.FMOD_Channel_setPosition, "int", [
      "pointer",
      "uint",
      "uint",
    ]),
    FMOD_ChannelControl_setPaused: new NativeFunction(e.FMOD_ChannelControl_setPaused, "int", [
      "pointer",
      "int",
    ]),
  };
}
