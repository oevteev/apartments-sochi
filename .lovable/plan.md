
# План: Установка счётчика Яндекс.Метрика

## Задача

Добавить код счётчика Яндекс.Метрика (ID: 106405655) на сайт для отслеживания посещаемости, вебвизора и кликмапы.

---

## Изменения

### Файл: `index.html`

Добавить код счётчика в секцию `<head>` перед закрывающим тегом `</head>`:

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106405655', 'ym');
    ym(106405655, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/106405655" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
```

---

## Расположение в файле

```text
<head>
  ...
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="https://mc.yandex.ru" />  ← добавить
  ...
  <!-- Critical CSS -->
  <style>...</style>
  
  <!-- Yandex.Metrika counter -->   ← добавить перед </head>
  <script>...</script>
  <noscript>...</noscript>
  <!-- /Yandex.Metrika counter -->
</head>
```

---

## Дополнительная оптимизация

Добавить DNS prefetch для ускорения загрузки скрипта метрики:

```html
<link rel="dns-prefetch" href="https://mc.yandex.ru" />
```

---

## Включённые функции метрики

| Функция | Значение | Описание |
|---------|----------|----------|
| `ssr` | true | Поддержка Server-Side Rendering |
| `webvisor` | true | Запись действий посетителей |
| `clickmap` | true | Карта кликов |
| `ecommerce` | "dataLayer" | E-commerce аналитика |
| `accurateTrackBounce` | true | Точный показатель отказов |
| `trackLinks` | true | Отслеживание переходов |

---

## Результат

После установки:
1. Яндекс.Метрика начнёт собирать статистику посещений
2. Вебвизор будет записывать сессии пользователей
3. Будет доступна карта кликов и скроллинга
4. Данные появятся в панели Метрики через несколько минут
