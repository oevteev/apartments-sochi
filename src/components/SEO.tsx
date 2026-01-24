import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const DOMAIN = "https://arendaapartmentssochi.ru";

const SEO = ({
  title,
  description,
  image = `${DOMAIN}/og-image.jpg`,
  url,
  type = "website",
  imageWidth = 1200,
  imageHeight = 630,
  keywords = "апартаменты Сочи, аренда квартиры Сочи, посуточная аренда в Сочи, жилье в Сочи, отдых в Сочи",
  author = "Аренда Апартаментов Сочи",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: SEOProps) => {
  const siteName = "Аренда квартир с видом на море в Сочи";
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonicalUrl = url || (typeof window !== "undefined" && window.location ? window.location.href : DOMAIN);
  const absoluteImageUrl = image.startsWith("http") ? image : `${DOMAIN}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@arendaSochi" />
      <meta name="twitter:creator" content="@arendaSochi" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Additional SEO */}
      {noIndex ? (
        <meta name="robots" content="none" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Yandex specific */}
      <meta name="yandex-verification" content="f61260ac039fdd4a" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <meta name="language" content="Russian" />
      <meta name="geo.region" content="RU-KDA" />
      <meta name="geo.placename" content="Сочи" />
      <meta name="geo.position" content="43.5855;39.7231" />
      <meta name="ICBM" content="43.5855, 39.7231" />

      {/* Mobile & App */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
    </Helmet>
  );
};

export default SEO;
