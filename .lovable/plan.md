
# План: Исправление ошибки сборки Яндекс.Метрики

## Проблема

Ошибка сборки:
```
[vite:build-html] Unable to parse HTML; parse5 error code disallowed-content-in-noscript-in-head
```

**Причина**: Тег `<noscript>` с элементом `<div>` внутри находится в секции `<head>`. По стандарту HTML5, в `<head>` тег `<noscript>` может содержать только `<link>`, `<style>` и `<meta>` элементы. Элемент `<div>` запрещён.

---

## Решение

Перенести `<noscript>` часть счётчика Яндекс.Метрики из `<head>` в начало `<body>`.

---

## Изменения в файле `index.html`

### 1. Удалить из `<head>` (строка 129):
```html
<noscript><div><img src="https://mc.yandex.ru/watch/106405655" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```

### 2. Добавить в начало `<body>`:
```html
<body>
  <noscript><div><img src="https://mc.yandex.ru/watch/106405655" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <div id="root"><!--app-html--></div>
  ...
</body>
```

---

## Итоговая структура

```text
<head>
  ...
  <!-- Yandex.Metrika counter -->
  <script type="text/javascript">
      (function(m,e,t,r,i,k,a){...})(window, document,'script',...);
      ym(106405655, 'init', {...});
  </script>
  <!-- /Yandex.Metrika counter -->
</head>

<body>
  <noscript><div><img src="https://mc.yandex.ru/watch/106405655" ... /></div></noscript>
  <div id="root"><!--app-html--></div>
  ...
</body>
```

---

## Результат

После исправления:
1. Сборка пройдёт успешно
2. Сайт можно будет опубликовать
3. Счётчик Яндекс.Метрики начнёт собирать данные
