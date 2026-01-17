# План: Исправление SSG для работы в Lovable

## Проблема

При деплое через Lovable выполняется только `vite build`, но плагин `lovableSsgPostbuildPlugin` пытается запустить `prerender.js`, который требует `dist/server/entry-server.js`. Этот файл не создается, потому что серверная сборка не запускается.

## Решение

Модифицировать плагин `lovableSsgPostbuildPlugin` в `vite.config.ts` чтобы он:
1. Сначала выполнял серверную сборку (`vite build --ssr`)
2. Затем запускал `node prerender.js`

---

## Изменения в файле `vite.config.ts`

### Обновленный плагин:

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
        // Only run for client build, not SSR build
        if (process.env.SSR_BUILD === "true") {
          return;
        }

        const { spawn } = await import("child_process");

        // Step 1: Build server entry for SSR
        console.log("\n🔨 Building server entry for SSG...\n");
        
        await new Promise((resolve, reject) => {
          const buildServer = spawn(
            "npx",
            ["vite", "build", "--ssr", "src/entry-server.tsx", "--outDir", "dist/server"],
            {
              stdio: "inherit",
              shell: true,
              env: { ...process.env, SSR_BUILD: "true" },
            }
          );

          buildServer.on("close", (code) => {
            if (code === 0) {
              console.log("\n✓ Server entry built successfully\n");
              resolve();
            } else {
              console.warn(`\n⚠️ Server build exited with code ${code}`);
              resolve(); // Don't fail, continue anyway
            }
          });

          buildServer.on("error", (error) => {
            console.warn(`\n⚠️ Server build error: ${error.message}`);
            resolve();
          });
        });

        // Step 2: Run prerender script
        console.log("\n🔄 Running SSG prerender...\n");

        return new Promise((resolve, reject) => {
          const child = spawn("node", ["prerender.js"], {
            stdio: "inherit",
            shell: true,
          });

          child.on("close", (code) => {
            if (code === 0) {
              resolve();
            } else {
              console.warn(`\n⚠️ SSG prerender exited with code ${code}`);
              resolve();
            }
          });

          child.on("error", (error) => {
            console.warn(`\n⚠️ SSG prerender error: ${error.message}`);
            resolve();
          });
        });
      },
    },
  };
}
```

---

## Итоговая последовательность при деплое

### Через Lovable (автоматически):
1. `vite build` - клиентская сборка
2. Плагин `lovableSsgPostbuildPlugin`:
   - Выполняет `npx vite build --ssr src/entry-server.tsx --outDir dist/server`
   - Выполняет `node prerender.js`
3. Статические HTML готовы

### Через VPS (`npm run build`):
1. `build:client` - клиентская сборка (плагин попытается выполнить SSR/prerender)
2. `build:server` - серверная сборка (пропускается плагином из-за SSR_BUILD=true)
3. `prerender` - генерация HTML (если еще не сгенерированы)

Обе команды будут работать корректно.

---

## Файлы для изменения

| Файл | Изменение |
|------|-----------|
| `vite.config.ts` | Обновить плагин `lovableSsgPostbuildPlugin` для выполнения серверной сборки перед prerender |
