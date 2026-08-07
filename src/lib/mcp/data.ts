// Публичные данные сайта, используемые MCP-инструментами.

export const CONTACTS = {
  phone: "+7(995)228-28-74",
  email: "ArendaApartmentSochi@ya.ru",
  address: "г. Сочи, Россия",
  workingHours: "9:00 - 19:00 (мск.)",
  website: "https://booking-sochi.lovable.app",
  telegram: "https://t.me/ArendaApartmentSochi",
};

export const APARTMENTS = [
  {
    id: "yuzhnoe-more-1-46",
    title: "Апартаменты 46 м², ЖК «Южное море», корпус 1",
    area: 46,
    complex: "ЖК «Южное море», корпус 1",
    city: "Сочи",
    video: "https://www.youtube.com/watch?v=OyPPxZljnn8",
  },
  {
    id: "yuzhnoe-more-1-45-a",
    title: "Апартаменты 45 м², ЖК «Южное море», корпус 1",
    area: 45,
    complex: "ЖК «Южное море», корпус 1",
    city: "Сочи",
    video: "https://www.youtube.com/watch?v=bbqdhV1IZ9E",
  },
  {
    id: "yuzhnoe-more-1-45-b",
    title: "Апартаменты 45 м², ЖК «Южное море», корпус 1",
    area: 45,
    complex: "ЖК «Южное море», корпус 1",
    city: "Сочи",
    video: "https://www.youtube.com/watch?v=Xz3mTWyJFXE",
  },
  {
    id: "yuzhnoe-more-1-45-c",
    title: "Апартаменты 45 м², ЖК «Южное море», корпус 1",
    area: 45,
    complex: "ЖК «Южное море», корпус 1",
    city: "Сочи",
    video: "https://www.youtube.com/watch?v=tJ1Bq4YLydo",
  },
  {
    id: "yuzhnoe-more-2-49",
    title: "Апартаменты 49 м², ЖК «Южное море», корпус 2",
    area: 49,
    complex: "ЖК «Южное море», корпус 2",
    city: "Сочи",
    video: "https://www.youtube.com/watch?v=OyPPxZljnn8&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM",
  },
] as const;

export const BOOKING_PLATFORMS = [
  { name: "Avito", url: "https://www.avito.ru/brands/i10778160" },
  {
    name: "Суточно.ру",
    url: "https://sutochno.ru/front/searchapp/detail/1734459?host_id=5448483&host_device=PC&guest_id=5448483",
  },
  { name: "Островок", url: "https://ostrovok.ru/hotel/russia/sochi/mid13111434/v_zhk_yuzhnoye_more_flat/" },
  { name: "Циан", url: "https://cian.ru/rent/flat/300248141/" },
  { name: "Яндекс Путешествия", url: "https://travel.yandex.ru/hotels/sochi/deluxe-apartment-na-esaulenko-45m2" },
  { name: "Отелло", url: "https://otello.ru/" },
];

export const POLICIES = [
  {
    topic: "booking",
    title: "Бронирование",
    items: [
      "Забронировать можно через каталог на сайте, по телефону +7(995)228-28-74 или в Telegram.",
      "Отмена за 2 недели до заезда — возврат 100%. За неделю — индивидуально. Менее чем за 7 дней — бронь невозвратная.",
      "Договор оформляется с управляющей компанией (ИП), без посредников.",
    ],
  },
  {
    topic: "checkin",
    title: "Заселение и выезд",
    items: [
      "Заезд после 14:00, выезд до 12:00.",
      "Ранний заезд и поздний выезд — по договорённости и за доплату.",
      "Для заселения нужен паспорт РФ; иностранным гражданам — загранпаспорт и миграционная карта.",
      "Все квартиры оборудованы smart-замками, гость получает видеоинструкцию по заселению.",
    ],
  },
  {
    topic: "payment",
    title: "Оплата",
    items: [
      "Предоплата 20% от стоимости проживания вносится при бронировании.",
      "Страховой депозит 6 000 ₽ возвращается в день выезда при сохранности имущества.",
    ],
  },
];

export const PAGES = [
  { path: "/", title: "Главная" },
  { path: "/catalog", title: "Каталог апартаментов и онлайн-бронирование" },
  { path: "/apartments", title: "Фотогалерея и видеообзоры апартаментов" },
  { path: "/about", title: "О нас" },
  { path: "/reviews", title: "Отзывы гостей" },
  { path: "/faq", title: "Частые вопросы" },
  { path: "/management", title: "Управление недвижимостью" },
  { path: "/contacts", title: "Контакты" },
];
