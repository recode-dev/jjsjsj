# rythm agent — split by modules

Исходник агента (Frida, Android arm64), разбитый по функциям вместо одного файла на ~31 000 строк.
Один файл = одна фича / один слой движка. Ничего не переписано «по смыслу»: каждый модуль — это
цельные top-level statements исходного бандла, перенесённые как есть.

## Структура

```
src/
  core/        загрузчик AOT-модулей, offsets, natives, pointers, SCString, bootstrap, хук libg.so
  vendor/      Buffer-полифилл, NaCl (box/sign/hash) — сторонний код
  security/    attestation, подписи, integrity
  net/         http, бинарный протокол, heartbeat
  game/        обёртки движка: battle, character, projectile, tilemap, datatables,
               entities, player, skills, input, render, sound, state, gameplay-math
  ui/          меню, конфиг, темы, камера, виджеты
  overlays/    fps, ping, position, server-address, ammo, trophy, profile-name,
               ball-trajectory, enemy-brawler, entity-overlay (esp), xray, anti-fade
  features/    aim, dodge, dodge-movement, autoskill, hold-to-shoot, dynajump,
               goal-assist, autofarm, restart, inactivity, spectator, music
  app/         entry, реестр фич, asset manager, очередь сообщений
  test/        тестовый харнесс
dist/          собранный одним файлом агент (генерируется)
build.js       сборка src -> dist
```

Полная таблица «модуль → файл → символы → строки исходника»: [MANIFEST.md](MANIFEST.md).

## Сборка

```bash
node build.js          # dist/rythm-agent.js
```

Порядок загрузки зашит в [src/manifest.json](src/manifest.json) — это топологический порядок
по «жадным» зависимостям (`class X extends Y`, `new X()` и вызовы на верхнем уровне).
Внутри одного файла statements всегда идут в исходном порядке.

## Ключевые точки

| Что | Где |
|---|---|
| Точка входа (ловим `libg.so`, поднимаем рантайм) | `src/app/entry.js`, `src/core/module-hook.js` |
| Смещения и сигнатуры натива | `src/core/offsets.js`, `src/core/natives.js` |
| Загрузка ELF-модуля в память (`memfd_create` + `android_dlopen_ext`) | `src/core/loader.js` |
| Аимбот (предикт капсул снарядов) | `src/features/aim.js` |
| Автододж | `src/features/dodge.js`, `src/features/dodge-movement.js` |
| Меню мода | `src/ui/menu.js` |
| Конфиг фич | `src/ui/config.js`, `src/app/feature-registry.js` |
| ESP / оверлеи | `src/overlays/*.js` |

## Замечания

- Модули `src/**` — **не** ES-модули, а фрагменты одного скрипта: они делят глобалы
  (`var e; var i; var text;`) и объекты `globalThis.offsets / natives / pointers`.
  Поэтому собирать их нужно конкатенацией (`build.js`), а не `import`.
- Часть имён осталась минифицированной (`t45`, `Bs`, `Le`, …) — они сохранены как в оригинале,
  чтобы не порвать ссылки; осмысленные имена (`DodgeController`, `AimAssistController`, `HttpClient`, …)
  на месте.
- Разбиение проверено на потерю строк: набор строк `src/**` полностью совпадает с исходным
  бандлом (30 925 строк, 0 потерянных и 0 добавленных), синтаксис каждого файла и `dist` проходит `node --check`.

## Дисклеймер

Код предназначен исключительно для исследования безопасности и отладки собственных сборок.
Ответственность за использование — на пользователе.
