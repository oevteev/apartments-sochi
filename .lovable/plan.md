# План: Исправление зависания "Saving changes"

## Проблема

Плагин `lovableSsgPostbuildPlugin` запускается при каждой сборке, включая превью-режим в Lovable. Это вызывает:
- Рекурсивный вызов Vite (SSR-сборка из closeBundle хука)
- Длительное ожидание завершения prerender.js
- Зависание интерфейса "Saving changes"

## Решение

Отключить SSG-плагин для превью-сборок и оставить его только для production-билда.

---

## Изменения в файле `vite.config.ts`

### Вариант 1: Проверка режима сборки (рекомендуется)

```typescript
function lovableSsgPostbuildPlugin(): Plugin {
  return {
    name: "lovable-ssg-postbuild",
    apply: "build",
    enforce: "post",
    closeBundle: {
      sequential: true,
      order: "post",
      async handler() {
        // Skip SSG in SSR build
        if (process.env.SSR_BUILD === "true") {
          return;
        }

        // Skip SSG in Lovable preview builds (CI environment)
        // SSG should only run during explicit production builds
        if (process.env.CI || process.env.LOVABLE_BUILD) {
          console.log("\n⏭️ Skipping SSG in CI/preview build\n");
          return;
        }

        // Rest of the SSG logic...
      },
    },
  };
}
```

### Вариант 2: Полное удаление плагина из Vite (надежнее)

Удалить `lovableSsgPostbuildPlugin()` из plugins массива и использовать только npm scripts для SSG:

```typescript
// В vite.config.ts - убрать lovableSsgPostbuildPlugin() из plugins
plugins: [
  react(),
  mode === "development" && componentTagger(),
  // lovableSsgPostbuildPlugin() - УДАЛИТЬ
].filter(Boolean),
```

Для VPS деплоя использовать существующие npm scripts:
```bash
npm run build:client && npm run build:server && npm run prerender
```

---

## Рекомендация

**Вариант 2 надежнее**, потому что:
- Плагин не будет мешать Lovable превью
- SSG будет выполняться только при явном запуске `npm run build` на VPS
- Нет риска рекурсивных вызовов Vite

---

## Итог изменений

| Файл | Изменение |
|------|-----------|
| `vite.config.ts` | Удалить `lovableSsgPostbuildPlugin()` из plugins массива |

После этого изменения:
- В Lovable: превью будет работать быстро, без SSG
- На VPS: выполните `npm run build` для полной SSG-сборки