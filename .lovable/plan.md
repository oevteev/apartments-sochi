
# План: Добавление robots="none" на служебные страницы

## Задача

Запретить индексацию страниц PrivacyPolicy, Statistics, Contacts и About поисковыми системами, добавив:
```html
<meta name="robots" content="none"/>
```

---

## Изменения

### 1. Файл: `src/components/SEO.tsx`

Добавить новый опциональный проп `noIndex` для управления индексацией:

```typescript
interface SEOProps {
  title: string;
  description: string;
  // ... существующие пропы
  noIndex?: boolean;  // НОВЫЙ ПРОП
}
```

Изменить рендеринг мета-тега robots:

```tsx
// Строка 72 - заменить
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

// На условный рендеринг
{noIndex ? (
  <meta name="robots" content="none" />
) : (
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
)}
```

---

### 2. Файл: `src/pages/PrivacyPolicy.tsx`

Добавить проп `noIndex` в компонент SEO:

```tsx
<SEO
  title="Политика конфиденциальности"
  description="..."
  noIndex  // ДОБАВИТЬ
/>
```

---

### 3. Файл: `src/pages/Statistics.tsx`

Добавить проп `noIndex` в оба места использования SEO (строки 106 и 118):

```tsx
<SEO title="Статистика" description="..." noIndex />
```

---

### 4. Файл: `src/pages/Contacts.tsx`

Добавить проп `noIndex`:

```tsx
<SEO 
  title="Контакты" 
  description="..."
  noIndex  // ДОБАВИТЬ
/>
```

---

### 5. Файл: `src/pages/About.tsx`

Добавить проп `noIndex`:

```tsx
<SEO
  title="О нас"
  description="..."
  noIndex  // ДОБАВИТЬ
/>
```

---

## Результат

После изменений указанные страницы будут содержать:
```html
<meta name="robots" content="none"/>
```

Это запретит поисковым системам:
- Индексировать страницу (`noindex`)
- Переходить по ссылкам на странице (`nofollow`)

Остальные страницы продолжат индексироваться нормально.

---

## Технические детали

| Файл | Тип изменения | Строки |
|------|---------------|--------|
| `src/components/SEO.tsx` | Добавить проп + условный рендеринг | 3-15, 72 |
| `src/pages/PrivacyPolicy.tsx` | Добавить `noIndex` | 7-10 |
| `src/pages/Statistics.tsx` | Добавить `noIndex` (2 места) | 106, 118 |
| `src/pages/Contacts.tsx` | Добавить `noIndex` | 204-207 |
| `src/pages/About.tsx` | Добавить `noIndex` | 12-15 |
