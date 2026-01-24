
# План: Исключение страниц noIndex из sitemap.xml

## Проблема

Скрипт `generate-sitemap.js` генерирует sitemap при сборке и включает страницы `/about`, `/contacts`, `/privacy-policy`, которые должны быть исключены из индексации.

## Решение

Удалить из массива `routesConfig` в файле `generate-sitemap.js` страницы, которые не должны индексироваться:
- `/about`
- `/contacts`
- `/privacy-policy`

## Изменения

### Файл: `generate-sitemap.js`

Заменить конфигурацию маршрутов (строки 20-30):

**Было:**
```javascript
const routesConfig = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/catalog', priority: 0.9, changefreq: 'daily' },
  { path: '/apartments', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/reviews', priority: 0.7, changefreq: 'weekly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/contacts', priority: 0.7, changefreq: 'monthly' },
  { path: '/management', priority: 0.6, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
];
```

**Станет:**
```javascript
// Routes configuration with SEO priorities
// Excludes: NotFound, Statistics, About, Contacts, PrivacyPolicy (noIndex pages)
const routesConfig = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/catalog', priority: 0.9, changefreq: 'daily' },
  { path: '/apartments', priority: 0.8, changefreq: 'weekly' },
  { path: '/reviews', priority: 0.7, changefreq: 'weekly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/management', priority: 0.6, changefreq: 'monthly' },
];
```

## Дополнительно

Можно удалить устаревший файл `public/sitemap.xml`, так как он всё равно перезаписывается при сборке.

## Результат

После пересборки и публикации sitemap.xml будет содержать только 6 страниц:
- `/`
- `/catalog`
- `/apartments`
- `/reviews`
- `/faq`
- `/management`

Страницы `/about`, `/contacts`, `/privacy-policy` будут полностью исключены из sitemap, что соответствует их настройке `noIndex`.
