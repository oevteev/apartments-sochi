import { Helmet } from "react-helmet-async";

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ВашСочи",
  alternateName: "VashSochi",
  url: "https://arendaapartmentssochi.ru",
  logo: "https://arendaapartmentssochi.ru/logo.png",
  description: "Аренда апартаментов посуточно в Сочи. Комфортное жильё для отдыха у моря.",
  foundingDate: "2018",
  founder: {
    "@type": "Person",
    name: "Олег Евтеев",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-918-000-00-00",
    contactType: "customer service",
    availableLanguage: ["Russian"],
  },
  sameAs: ["https://t.me/vashsochi"],
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "ВашСочи — Апартаменты посуточно",
  image: "https://arendaapartmentssochi.ru/og-image.jpg",
  url: "https://vashsochi.ru",
  telephone: "+7-918-000-00-00",
  email: "info@vashsochi.ru",
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
  description: "Аренда апартаментов посуточно в Сочи. Уютные квартиры рядом с морем для комфортного отдыха.",
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ВашСочи",
  url: "https://arendaapartmentssochi.ru",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://arendaapartmentssochi.ru/catalog?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const StructuredData = () => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessData)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
    </Helmet>
  );
};

export default StructuredData;
