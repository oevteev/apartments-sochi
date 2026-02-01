
# План: Исправление работы формы "Быстрая связь" при выборе MAX

## Проблема

При выборе иконки MAX (или Telegram при повторном открытии) форма "Быстрая связь" не отправляет запрос. Кнопка "Отправить" может быть заблокирована или captcha не выполняется.

## Причина

В хуке `useSmartCaptcha` есть несколько проблем:

1. **`initAttemptedRef.current`** устанавливается в `true` при первой инициализации и никогда не сбрасывается
2. При закрытии модального окна выполняется cleanup, который уничтожает виджет (`destroy`)
3. При повторном открытии `containerRef` указывает на новый DOM-элемент, но инициализация не происходит из-за `initAttemptedRef.current === true`
4. Условие `isReady` возвращает `false`, так как `widgetIdRef.current === null` после cleanup
5. Кнопка остаётся заблокированной (`disabled={!isCaptchaReady}`)

## Решение

Исправить хук `useSmartCaptcha`, чтобы он корректно переинициализировал виджет при смене контейнера.

### Файл: `src/hooks/useSmartCaptcha.ts`

**Изменения:**

1. Сбрасывать `initAttemptedRef` при изменении `containerRef`
2. Добавить проверку, что контейнер существует в DOM перед инициализацией
3. Убрать cleanup, который уничтожает виджет (или сделать его условным)

```typescript
// Добавить отслеживание контейнера
const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);

// Изменить containerRef на callback ref
const containerRef = useCallback((node: HTMLDivElement | null) => {
  if (node !== null) {
    setContainerElement(node);
  }
}, []);

// В useEffect для инициализации - убрать initAttemptedRef
// или сбрасывать его при смене containerElement
useEffect(() => {
  if (!isReady || !containerElement || !window.smartCaptcha || !clientKey) {
    return;
  }

  // Уничтожить предыдущий виджет если есть
  if (widgetIdRef.current !== null) {
    try {
      window.smartCaptcha.destroy(widgetIdRef.current);
    } catch (e) {
      // ignore
    }
    widgetIdRef.current = null;
  }

  // Рендерить новый виджет
  try {
    widgetIdRef.current = window.smartCaptcha.render(containerElement, {
      sitekey: clientKey,
      invisible: true,
      hl: "ru",
      callback: (token: string) => {
        setIsLoading(false);
        if (callbackRef.current) {
          callbackRef.current(token);
          callbackRef.current = null;
        }
        options.onSuccess?.(token);
      },
    });
  } catch (e) {
    console.error("SmartCaptcha render error:", e);
    options.onError?.();
  }
}, [isReady, clientKey, containerElement]); // Добавить containerElement в зависимости
```

4. Убрать cleanup из useEffect для скрипта (или переместить в отдельный useEffect)

## Альтернативное решение (проще)

Поднять `QuickContactModal` выше по дереву компонентов, чтобы он не пересоздавался при каждом открытии меню. Модальное окно уже использует `open/onOpenChange`, поэтому его можно вынести в родительский компонент.

Но это не решит проблему полностью, если пользователь закроет и снова откроет форму.

## Рекомендуемое решение

Исправить `useSmartCaptcha`, чтобы он корректно работал при пересоздании контейнера:

1. Использовать callback ref вместо useRef для контейнера
2. Переинициализировать виджет при каждом появлении нового контейнера
3. Убрать или исправить cleanup логику

---

## Технические детали

### Файл: `src/hooks/useSmartCaptcha.ts`

Полный список изменений:
- Строка 39: изменить `containerRef` на callback ref
- Строка 45: добавить `containerElement` state
- Строки 110-139: переписать useEffect для инициализации
- Строки 97-106: убрать преждевременный cleanup
- Строка 184: исправить условие `isReady`
