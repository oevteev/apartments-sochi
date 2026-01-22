import { Helmet } from "react-helmet-async";

const DOMAIN = "https://arendaapartmentssochi.ru";

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ВашСочи",
  alternateName: "VashSochi",
  url: DOMAIN,
  logo: `${DOMAIN}/logo.png`,
  description:
    "Посуточная аренда квартир с видом на море в Сочи. Прямое бронирование. Удаленное заселение, бесплатная парковка, поддержка 24/7.",
  foundingDate: "2021",
  founder: {
    "@type": "Person",
    name: "Олег Евтеев",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-995-228-28-74",
    contactType: "customer service",
    availableLanguage: ["Russian"],
  },
  sameAs: ["https://t.me/vashsochi"],
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${DOMAIN}/#localbusiness`,
  name: "ВашСочи — Апартаменты посуточно",
  image: [`${DOMAIN}/og-image.jpg`],
  url: DOMAIN,
  telephone: "+7-995-228-28-74",
  email: "arendaapartmentsochi@ya.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Навагинская",
    addressLocality: "Сочи",
    addressRegion: "Краснодарский край",
    postalCode: "354000",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.5855,
    longitude: 39.7231,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "₽₽",
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
  currenciesAccepted: "RUB",
  areaServed: {
    "@type": "City",
    name: "Сочи",
  },
  serviceType: "Краткосрочная аренда апартаментов",
  description:
    "Посуточная аренда квартир с видом на море в Сочи. Прямое бронирование. Удаленное заселение, бесплатная парковка, поддержка 24/7.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Кондиционер", value: true },
    { "@type": "LocationFeatureSpecification", name: "Парковка", value: true },
    { "@type": "LocationFeatureSpecification", name: "Вид на море", value: true },
  ],
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  name: "ВашСочи — Посуточная аренда в Сочи",
  url: DOMAIN,
  publisher: {
    "@id": `${DOMAIN}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${DOMAIN}/catalog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "ru-RU",
};

// Apartment listings для каталога
const apartmentListingsData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Апартаменты в Сочи",
  description: "Каталог апартаментов для посуточной аренды в Сочи",
  url: `${DOMAIN}/catalog`,
  numberOfItems: 22,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Apartment",
        "@id": `${DOMAIN}/apartments#1`,
        name: "Апартаменты с видом на море",
        description: "Уютные апартаменты с панорамным видом на Чёрное море. Идеально для романтического отдыха.",
        image: `${DOMAIN}/apartments/apart-1.jpg`,
        url: `${DOMAIN}/apartments`,
        numberOfRooms: 1,
        floorSize: {
          "@type": "QuantitativeValue",
          value: 45,
          unitCode: "MTK",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Кондиционер", value: true },
          { "@type": "LocationFeatureSpecification", name: "Балкон с видом на море", value: true },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Сочи",
          addressRegion: "Краснодарский край",
          addressCountry: "RU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.5855,
          longitude: 39.7231,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Apartment",
        "@id": `${DOMAIN}/apartments#2`,
        name: "Семейные апартаменты",
        description: "Просторные апартаменты для семейного отдыха. Две спальни, полностью оборудованная кухня.",
        image: `${DOMAIN}/apartments/apart-2.jpg`,
        url: `${DOMAIN}/apartments`,
        numberOfRooms: 2,
        floorSize: {
          "@type": "QuantitativeValue",
          value: 65,
          unitCode: "MTK",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Кондиционер", value: true },
          { "@type": "LocationFeatureSpecification", name: "Детская кроватка", value: true },
          { "@type": "LocationFeatureSpecification", name: "Стиральная машина", value: true },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Сочи",
          addressRegion: "Краснодарский край",
          addressCountry: "RU",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Apartment",
        "@id": `${DOMAIN}/apartments#3`,
        name: "Премиум апартаменты",
        description: "Люксовые апартаменты премиум-класса с джакузи и террасой. Для особых случаев.",
        image: `${DOMAIN}/apartments/apart-3.jpg`,
        url: `${DOMAIN}/apartments`,
        numberOfRooms: 2,
        floorSize: {
          "@type": "QuantitativeValue",
          value: 80,
          unitCode: "MTK",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Кондиционер", value: true },
          { "@type": "LocationFeatureSpecification", name: "Джакузи", value: true },
          { "@type": "LocationFeatureSpecification", name: "Терраса", value: true },
          { "@type": "LocationFeatureSpecification", name: "Панорамные окна", value: true },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Сочи",
          addressRegion: "Краснодарский край",
          addressCountry: "RU",
        },
      },
    },
  ],
};

// Breadcrumb структура для главной страницы
const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: DOMAIN,
    },
  ],
};

// FAQ структура
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Как забронировать апартаменты в Сочи?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Вы можете забронировать апартаменты через наш сайт, выбрав подходящий вариант в каталоге и заполнив форму бронирования, или связаться с нами по телефону +7-995-228-28-74 или в Telegram.",
      },
    },
    {
      "@type": "Question",
      name: "Какие способы оплаты вы принимаете?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мы принимаем оплату наличными, банковскими картами и переводом на расчётный счёт. Предоплата составляет 30% от стоимости проживания.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли заселиться с домашними животными?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, в некоторых наших апартаментах разрешено проживание с домашними животными. Уточняйте эту возможность при бронировании.",
      },
    },
    {
      "@type": "Question",
      name: "Во сколько заезд и выезд?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стандартное время заезда — 14:00, выезда — 12:00. По предварительной договорённости возможен ранний заезд или поздний выезд.",
      },
    },
  ],
};

const StructuredData = () => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessData)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(apartmentListingsData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      <script type="application/ld+json">{JSON.stringify(faqData)}</script>
    </Helmet>
  );
};

export default StructuredData;
