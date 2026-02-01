
## Цель
Сделать так, чтобы форма «Быстрая связь» снова отправляла заявку, а кнопка «Отправить» становилась доступной (не была постоянно disabled).

---

## Что сейчас происходит (по коду)
Кнопка «Отправить» в `QuickContactModal` заблокирована, пока `isCaptchaReady === false`:

- `QuickContactModal.tsx`:
  - `disabled={isSubmitting || !isCaptchaReady}`
  - контейнер капчи: `<div ref={containerRef} className="hidden" />`

Проблема в том, что `isCaptchaReady` часто не становится `true`, потому что капча не «рендерится» корректно или тут же уничтожается.

---

## Причины (2 ключевые)
### 1) Контейнер SmartCaptcha скрыт через `display: none`
В `QuickContactModal.tsx` контейнер капчи имеет `className="hidden"` (Tailwind = `display:none`).
Многие виджеты (включая капчи) не могут корректно инициализироваться внутри `display:none`, поэтому `render(...)` может падать/не создавать рабочий widgetId, а `isReady` остаётся false → кнопка disabled.

### 2) `useSmartCaptcha` переинициализирует/ломает виджет слишком часто
В текущем `useSmartCaptcha.ts` есть две архитектурные проблемы:
- `options` находится в зависимостях эффекта инициализации:
  - `useSmartCaptcha(options = {})` при каждом ререндере компонента получает новый объект `{}` → зависимость меняется → эффект заново “destroy+render” даже без реальной причины.
- Cleanup-эффект привязан к `containerElement`:
  - `useEffect(() => return destroy, [containerElement])`
  - при любых сменах ref/перемонтировании (а в dev/strict режимах это бывает часто) виджет может быть уничтожен сразу после рендера.

Итог: `widgetRendered` может “сбрасываться” → `isReady` становится false → кнопка недоступна.

---

## Изменения, которые нужно внести

### A) Починить контейнер капчи в QuickContactModal (убрать `hidden`)
Файл: `src/components/QuickContactModal.tsx`

Заменить:
- `<div ref={containerRef} className="hidden" />`

На вариант “невидим, но в DOM и не display:none”, например:
- `className="sr-only"` (скрыт визуально, но элемент существует и измерим)
или
- `className="absolute -left-[9999px] -top-[9999px] w-px h-px overflow-hidden"`

Цель: чтобы SmartCaptcha мог нормально отрендериться, а `isCaptchaReady` стал true.

---

### B) Исправить `useSmartCaptcha`, чтобы он не пересоздавал виджет на каждый ререндер
Файл: `src/hooks/useSmartCaptcha.ts`

1) Убрать `options` из dependency array эффекта инициализации виджета
Сейчас:
- `useEffect(..., [isReady, clientKey, containerElement, options])`

Сделать:
- `useEffect(..., [isReady, clientKey, containerElement])`

2) Чтобы коллбеки `onSuccess/onError` не “терялись”, хранить их в `useRef`
- завести `optionsRef`
- в отдельном `useEffect` обновлять `optionsRef.current = options`
- в callback капчи использовать `optionsRef.current.onSuccess?.(...)`

3) Упростить cleanup: уничтожать виджет только при размонтировании хука
Сейчас cleanup завязан на `containerElement`, что может приводить к уничтожению в неожиданные моменты.
Сделать cleanup-эффект с пустыми зависимостями `[]`, который при unmount уничтожит текущий `widgetIdRef.current`.

4) Поведение при `containerRef(null)`
Когда ref становится `null` (модалка закрылась), аккуратно:
- `setWidgetRendered(false)`
- (опционально) `widgetIdRef.current = null` после destroy (если решим destroy делать сразу на закрытии; но безопаснее — destroy на unmount/следующую инициализацию)

---

## Проверка (что именно протестировать)
1) Открыть меню внизу справа → выбрать Telegram → открыть «Быстрая связь»
   - кнопка «Отправить» должна стать активной через короткое время (после готовности капчи)
   - отправка должна пройти успешно
2) Закрыть модалку → снова открыть → выбрать MAX → открыть «Быстрая связь»
   - кнопка «Отправить» снова активна
   - отправка проходит успешно (как и для Telegram)
3) 3–4 раза подряд: открыть/закрыть модалку, чередуя Telegram/MAX
   - кнопка не “залипает” disabled
4) Проверить на мобильном (особенно iOS Safari/Android Chrome), что кнопка активируется стабильно.

---

## Риски и как их учтём
- Если SmartCaptcha требует видимости контейнера (не просто “не display:none”, а реально в видимой области), тогда `sr-only` может оказаться недостаточным.
  - В этом случае используем вариант “offscreen absolute”, но без `display:none`.
- Если появятся ошибки `SmartCaptcha render error`, добавим более подробный `console.error` с контекстом (clientKey, наличие containerElement) для диагностики.

---

## Файлы, которые будут изменены
- `src/components/QuickContactModal.tsx` (замена `hidden` контейнера капчи на корректный способ скрытия)
- `src/hooks/useSmartCaptcha.ts` (стабилизация инициализации, корректный cleanup, устранение зависимости от `options`)

