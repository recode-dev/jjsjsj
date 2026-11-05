# MANIFEST

Каждый модуль — набор цельных top-level statements исходного бандла.

| Модуль | Файл | Операторов | Строк | Исходные строки | Символы |
|---|---|---:|---:|---|---|
| `core/globals` | [`src/core/globals.js`](src/core/globals.js) | 3 | 3 | 1–3 | `e`, `i`, `text` |
| `core/loader` | [`src/core/loader.js`](src/core/loader.js) | 1 | 105 | 5–109 | `loadEmbeddedNativeModule` |
| `vendor/buffer` | [`src/vendor/buffer.js`](src/vendor/buffer.js) | 150 | 1992 | 111–5350 | `a`, `n`, `r`, `o`, `l`, `c`, `h`, `d`, `p`, `m`, `f`, `b`, `y`, `v` … |
| `core/offsets` | [`src/core/offsets.js`](src/core/offsets.js) | 2 | 298 | 1219–2330 | `gt`, `ft` |
| `core/natives` | [`src/core/natives.js`](src/core/natives.js) | 1 | 766 | 1504–2269 | `pt` |
| `core/pointers` | [`src/core/pointers.js`](src/core/pointers.js) | 2 | 51 | 2271–2378 | `mt`, `yt` |
| `core/scstring` | [`src/core/scstring.js`](src/core/scstring.js) | 1 | 40 | 2332–2371 | `bt` |
| `core/bootstrap` | [`src/core/bootstrap.js`](src/core/bootstrap.js) | 3 | 83 | 2380–20228 | `vt`, `t47` |
| `core/module-hook` | [`src/core/module-hook.js`](src/core/module-hook.js) | 1 | 53 | 2396–2448 | `wt` |
| `ui/config` | [`src/ui/config.js`](src/ui/config.js) | 4 | 832 | 2450–21853 | `Vi`, `Hi`, `$i`, `Bs` |
| `net/http` | [`src/net/http.js`](src/net/http.js) | 2 | 70 | 17498–17567 | `HttpResponseBuffer`, `HttpClient` |
| `game/sound` | [`src/game/sound.js`](src/game/sound.js) | 3 | 220 | 28154–28373 | `t59`, `Sa`, `Ta` |
| `features/music` | [`src/features/music.js`](src/features/music.js) | 4 | 374 | 2509–28692 | `Ma`, `Ca`, `Na`, `MusicPlayer` |
| `vendor/crypto` | [`src/vendor/crypto.js`](src/vendor/crypto.js) | 148 | 2696 | 2565–30386 | `tn`, `en`, `sn`, `an`, `nn`, `rn`, `on`, `ln`, `hn`, `dn`, `un`, `gn`, `pn`, `mn` … |
| `security/attestation` | [`src/security/attestation.js`](src/security/attestation.js) | 12 | 223 | 5351–5573 | `St`, `Tt`, `AttestationTokenClient`, `AttestationTokenClientAlias`, `Ct`, `Nt`, `xt`, `At`, `kt`, `Pt` |
| `game/datatables` | [`src/game/datatables.js`](src/game/datatables.js) | 14 | 506 | 5574–6368 | `_t`, `It`, `Bt`, `Ft`, `Dt`, `Rt`, `Et`, `Ot`, `Ut`, `Xt`, `qt`, `Kt` |
| `game/entities` | [`src/game/entities.js`](src/game/entities.js) | 2 | 53 | 6369–6421 | `t11`, `Jt` |
| `game/projectile` | [`src/game/projectile.js`](src/game/projectile.js) | 16 | 1415 | 5930–10074 | `jt`, `Gt`, `t9`, `Vt`, `Ht`, `Yt`, `Wt`, `entries`, `t25`, `Me`, `Ce`, `Ne`, `xe`, `Ae` … |
| `game/player` | [`src/game/player.js`](src/game/player.js) | 2 | 67 | 6422–6488 | `t12`, `Qt` |
| `game/tilemap` | [`src/game/tilemap.js`](src/game/tilemap.js) | 6 | 842 | 6489–7330 | `Zt`, `te`, `ee`, `t14`, `ie`, `se` |
| `game/skills` | [`src/game/skills.js`](src/game/skills.js) | 4 | 244 | 7331–27284 | `ae`, `ne`, `Ps`, `ua` |
| `game/state` | [`src/game/state.js`](src/game/state.js) | 11 | 717 | 7370–27698 | `t15`, `re`, `oe`, `t52`, `Gs`, `Vs`, `Hs`, `t58`, `fa` |
| `game/input` | [`src/game/input.js`](src/game/input.js) | 5 | 145 | 7559–17364 | `ce`, `he`, `cs`, `hs`, `ds` |
| `game/battle` | [`src/game/battle.js`](src/game/battle.js) | 21 | 1327 | 7421–22505 | `le`, `t17`, `de`, `t18`, `ue`, `Pe`, `_e`, `Ie`, `t28`, `Be`, `Fe`, `Je`, `Qe`, `t34` … |
| `overlays/ball-trajectory` | [`src/overlays/ball-trajectory.js`](src/overlays/ball-trajectory.js) | 5 | 485 | 20503–25519 | `Cs`, `Ns`, `BallTrajectoryOverlay`, `BallTrajectoryOverlayAlias` |
| `game/render` | [`src/game/render.js`](src/game/render.js) | 67 | 2517 | 8133–20877 | `ge`, `pe`, `t20`, `me`, `fe`, `be`, `ye`, `ve`, `we`, `ti`, `ei`, `ii`, `si`, `hi` … |
| `features/inactivity` | [`src/features/inactivity.js`](src/features/inactivity.js) | 4 | 234 | 26565–26798 | `InactivityController`, `oa`, `t56`, `la` |
| `game/character` | [`src/game/character.js`](src/game/character.js) | 14 | 963 | 8618–27442 | `t24`, `Te`, `t49`, `outlineColor`, `ta`, `ea`, `ca`, `ha`, `da`, `ga`, `pa`, `t57`, `ma` |
| `features/dodge-movement` | [`src/features/dodge-movement.js`](src/features/dodge-movement.js) | 2 | 1214 | 10406–11619 | `Le`, `Re` |
| `features/aim` | [`src/features/aim.js`](src/features/aim.js) | 9 | 1876 | 11620–25018 | `Ee`, `Oe`, `ze`, `Xe`, `Fs`, `AimAssistController`, `AimVisibilityController`, `t53`, `qs` |
| `features/dodge` | [`src/features/dodge.js`](src/features/dodge.js) | 13 | 1906 | 12575–14804 | `t29`, `Ue`, `je`, `Ge`, `Ve`, `e2`, `Ye`, `We`, `$e`, `qe`, `Ke`, `DodgeController` |
| `overlays/fps` | [`src/overlays/fps.js`](src/overlays/fps.js) | 6 | 277 | 14868–15144 | `t32`, `ai`, `ni`, `FpsOverlay`, `FrameRateController` |
| `overlays/ping` | [`src/overlays/ping.js`](src/overlays/ping.js) | 1 | 73 | 15191–15263 | `PingOverlay` |
| `overlays/server-address` | [`src/overlays/server-address.js`](src/overlays/server-address.js) | 2 | 111 | 15376–15486 | `ServerAddressOverlay`, `ServerAddressOverlayAlias` |
| `overlays/position` | [`src/overlays/position.js`](src/overlays/position.js) | 1 | 90 | 15487–15576 | `PositionOverlay` |
| `ui/camera` | [`src/ui/camera.js`](src/ui/camera.js) | 2 | 77 | 15577–20502 | `CameraShakeController`, `CameraController` |
| `overlays/xray` | [`src/overlays/xray.js`](src/overlays/xray.js) | 1 | 92 | 15617–15708 | `xray` |
| `ui/widgets` | [`src/ui/widgets.js`](src/ui/widgets.js) | 5 | 201 | 17365–28760 | `SmallPopupWidget`, `SmallPopupWidgetAlias`, `t60`, `Aa`, `ka` |
| `ui/menu` | [`src/ui/menu.js`](src/ui/menu.js) | 4 | 2469 | 17568–20036 | `t45`, `ms`, `fs`, `bs` |
| `test/harness` | [`src/test/harness.js`](src/test/harness.js) | 3 | 124 | 20037–20160 | `TestCase`, `t46`, `vs` |
| `ui/theme` | [`src/ui/theme.js`](src/ui/theme.js) | 2 | 160 | 20229–20388 | `ThemeController`, `ThemeControllerAlias` |
| `overlays/entity-overlay` | [`src/overlays/entity-overlay.js`](src/overlays/entity-overlay.js) | 2 | 150 | 20928–21077 | `EntityOverlayController`, `Is` |
| `game/gameplay-math` | [`src/game/gameplay-math.js`](src/game/gameplay-math.js) | 1 | 154 | 22506–22659 | `Os` |
| `features/autoskill` | [`src/features/autoskill.js`](src/features/autoskill.js) | 1 | 230 | 22660–22889 | `AutoSkillController` |
| `features/hold-to-shoot` | [`src/features/hold-to-shoot.js`](src/features/hold-to-shoot.js) | 1 | 170 | 22890–23059 | `HoldToShootController` |
| `features/dynajump` | [`src/features/dynajump.js`](src/features/dynajump.js) | 1 | 1258 | 23470–24727 | `DynaJumpController` |
| `features/restart` | [`src/features/restart.js`](src/features/restart.js) | 1 | 8 | 24728–24735 | `RestartController` |
| `overlays/profile-name` | [`src/overlays/profile-name.js`](src/overlays/profile-name.js) | 1 | 145 | 25019–25163 | `ProfileNameOverlay` |
| `features/goal-assist` | [`src/features/goal-assist.js`](src/features/goal-assist.js) | 5 | 873 | 25520–26458 | `e3`, `Zs`, `GoalAssistController`, `GoalAssistControllerAlias`, `sa` |
| `overlays/ammo` | [`src/overlays/ammo.js`](src/overlays/ammo.js) | 1 | 80 | 26459–26538 | `AmmoOverlay` |
| `overlays/enemy-brawler` | [`src/overlays/enemy-brawler.js`](src/overlays/enemy-brawler.js) | 1 | 26 | 26539–26564 | `EnemyBrawlerOverlay` |
| `features/autofarm` | [`src/features/autofarm.js`](src/features/autofarm.js) | 1 | 124 | 27699–27822 | `AutoFarmController` |
| `features/spectator` | [`src/features/spectator.js`](src/features/spectator.js) | 1 | 38 | 27823–27860 | `SpectatorStatusController` |
| `overlays/anti-fade` | [`src/overlays/anti-fade.js`](src/overlays/anti-fade.js) | 1 | 37 | 27861–27897 | `FadeController` |
| `overlays/trophy` | [`src/overlays/trophy.js`](src/overlays/trophy.js) | 1 | 256 | 27898–28153 | `TrophyOverlay` |
| `app/feature-registry` | [`src/app/feature-registry.js`](src/app/feature-registry.js) | 8 | 302 | 28761–29062 | `FeatureRegistry`, `t62`, `Ia`, `Ba`, `t63`, `Fa` |
| `app/asset-manager` | [`src/app/asset-manager.js`](src/app/asset-manager.js) | 2 | 49 | 29063–29111 | `AssetManager`, `AssetManagerAlias` |
| `app/remote-queue` | [`src/app/remote-queue.js`](src/app/remote-queue.js) | 5 | 321 | 29162–29482 | `RemoteMessageQueue`, `Ea`, `Oa`, `Ua`, `ja` |
| `net/protocol` | [`src/net/protocol.js`](src/net/protocol.js) | 3 | 274 | 30387–30660 | `_r`, `Ir`, `Br` |
| `net/heartbeat` | [`src/net/heartbeat.js`](src/net/heartbeat.js) | 3 | 163 | 30661–30823 | `HeartbeatController`, `HeartbeatControllerAlias`, `HeartbeatControllerAlias2` |
| `app/entry` | [`src/app/entry.js`](src/app/entry.js) | 10 | 276 | 29112–31049 | `La`, `t68`, `Lr`, `Rr`, `t69`, `Er`, `t70`, `Or`, `Ur` |

Итого: 61 модулей, 609 top-level statements, 30925 строк кода.